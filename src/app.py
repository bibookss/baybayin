from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import base64
import os
import cv2
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def preprocess_image(base64_image_data):
    image_bytes = base64.b64decode(base64_image_data)
    image = cv2.imdecode(np.fromstring(image_bytes, np.uint8), cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (28, 28))
    image = np.array([image])  

    return image

def predict_with_model(image):
    model = tf.keras.models.load_model('./model/baybayin_model.h5')
    label_word = ['de_di', 'pe_pi', 'to_tu', 'p', 'l', 'ra', 'ke_ki', 'lo_lu', 'd', 'po_pu', 'bo_bu', 'ha', 'ye_yi', 'ne_ni', 'n', 'nge_ngi', 'r', 'ng', 'ya', 'ta', 'la', 'w', 'ko_ku', 'da_ra', 'be_bi', 'me_mi', 'sa', 'ba', 'b', 'k', 'ma', 're_ri', 'm', 'nga', 'mo_mu', 't', 'se_si', 'do_du', 'o_u', 'no_nu', 'go_gu', 'he_hi', 'na', 'te_ti', 'le_li', 'ro_ru', 'ga', 'ngo_ngu', 'pa', 'wo_wu', 'wa', 'y', 'a', 'so_su', 'h', 'e_i', 'yo_yu', 'we_wi', 'ge_gi', 'g', 'ka', 'ho_hu', 's']

    predictions = model.predict(image)

    # Get top 3 predictions
    top_3 = tf.math.top_k(predictions, 3)
    top_3_indices = top_3.indices.numpy()[0]
    top_3_probabilities = top_3.values.numpy()[0]

    # Make probabilities as percentage string
    top_3_probabilities = [str(round(probability * 100, 2)) + "%" for probability in top_3_probabilities]
    top_3_classes = [label_word[index] for index in top_3_indices]

    result = zip(top_3_classes, top_3_probabilities)

    print("Top 3 classes: ", top_3_classes)
    print("Top 3 probabilities: ", top_3_probabilities)

    return {"result": list(result)}

@app.post("/api/predict")
async def predict(imageData: dict):
    try:
        base64_image_data = imageData.get("imageData")
        if not base64_image_data:
            raise HTTPException(status_code=400, detail="Image data not provided")

        # Preprocess image
        image = preprocess_image(base64_image_data)

        # Predict
        prediction = predict_with_model(image)

        return JSONResponse(content={"prediction": prediction["result"]}, status_code=200)

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

app.mount('/', StaticFiles(directory='static', html=True), name='static')
