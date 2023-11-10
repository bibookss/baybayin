export function sendImageForPrediction(base64ImageData) {
    console.log('Sending image for prediction...');
    const url = `http://0.0.0.0:3000/api/predict`; 
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

export async function getRandomWord() {
    console.log('Getting random word...');
    const url = `http://0.0.0.0:3000/api/words`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => console.error('Error:', error));
}

export function sendImageForCollection(base64ImageData, character) {
    console.log('Sending image for collection...');
    const url = `http://${ip}:3000/api/collect`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData: base64ImageData, character: character }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => console.error('Error:', error));
}
