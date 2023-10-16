export function sendImageForPrediction(base64ImageData) {
    console.log('Sending image for prediction...');
    console.log(base64ImageData);
    return fetch('http://localhost:3000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData: base64ImageData }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}
