export function sendImageForPrediction(base64ImageData) {
    console.log('Sending image for prediction...');
    // Make sure to change the IP to match the development endpoint.
    // const ip = '192.168.2.117' 
    const ip = '192.168.1.2'
    const url = `http://${ip}:3000/api/predict`; 
    return fetch(url, {
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
