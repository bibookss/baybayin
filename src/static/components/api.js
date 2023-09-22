export function sendImageForPrediction(base64ImageData) {
    return fetch('http://localhost:3000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData: base64ImageData }),
    })
    .then(response => response.json());
}
