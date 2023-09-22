from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import tensorflow as tf
import base64
import uvicorn
import os
import cv2
import numpy as np

app = FastAPI()

def preprocess_image(base64_image_data):
    image_bytes = base64.b64decode(base64_image_data)
    image = cv2.imdecode(np.fromstring(image_bytes, np.uint8), cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (28, 28))
    image = np.array([image])  

def predict_with_model(image):
    model = tf.keras.models.load_model('./model/baybayin_model.h5')
    label_word = ['de_di', 'pe_pi', 'to_tu', 'p', 'l', 'ra', 'ke_ki', 'lo_lu', 'd', 'po_pu', 'bo_bu', 'ha', 'ye_yi', 'ne_ni', 'n', 'nge_ngi', 'r', 'ng', 'ya', 'ta', 'la', 'w', 'ko_ku', 'da_ra', 'be_bi', 'me_mi', 'sa', 'ba', 'b', 'k', 'ma', 're_ri', 'm', 'nga', 'mo_mu', 't', 'se_si', 'do_du', 'o_u', 'no_nu', 'go_gu', 'he_hi', 'na', 'te_ti', 'le_li', 'ro_ru', 'ga', 'ngo_ngu', 'pa', 'wo_wu', 'wa', 'y', 'a', 'so_su', 'h', 'e_i', 'yo_yu', 'we_wi', 'ge_gi', 'g', 'ka', 'ho_hu', 's']

    predictions = model.predict(image)
    predicted_class = tf.argmax(predictions[0]).numpy()
    probability = predictions[0][predicted_class]
    predicted_letter = label_word[predicted_class]

    return {"class_id": predicted_class, "probability": float(probability), "letter": predicted_letter}

app.mount('/static', StaticFiles(directory='static', html=True), name='static')

@app.post("/predict")
async def predict(imageData: dict):
    try:
        base64_image_data = imageData.get("imageData")
        if not base64_image_data:
            raise HTTPException(status_code=400, detail="Image data not provided")

        # Preprocess image
        image = preprocess_image(base64_image_data)

        prediction = predict_with_model(image)

        return JSONResponse(content={"prediction": prediction["letter"]}, status_code=200)

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)
