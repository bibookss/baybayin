document.addEventListener('DOMContentLoaded', () => {
    const drawingCanvas = document.getElementById('drawingCanvas');
    const context = drawingCanvas.getContext('2d');
    const predictButton = document.getElementById('predictButton');
    const clearButton = document.getElementById('clearButton');
    const predictionResult = document.getElementById('predictionResult');

    let drawing = false;

    context.fillStyle = 'white';
    context.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    drawingCanvas.addEventListener('mousedown', (e) => {
        drawing = true;
        context.beginPath();
        
        const x = e.clientX - drawingCanvas.getBoundingClientRect().left;
        const y = e.clientY - drawingCanvas.getBoundingClientRect().top;
        context.moveTo(x, y);
    });
    
    drawingCanvas.addEventListener('mouseup', () => {
        drawing = false;
    });
    
    drawingCanvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
    
        const x = e.clientX - drawingCanvas.getBoundingClientRect().left;
        const y = e.clientY - drawingCanvas.getBoundingClientRect().top;
    
        context.lineWidth = 10;
        context.lineCap = 'round';
        context.strokeStyle = 'black';

    
        context.lineTo(x, y);
        context.stroke();
    });

    predictButton.addEventListener('click', () => {
        const imageData = drawingCanvas.toDataURL('image/png');
        console.log('Image data:', imageData);
        const base64ImageData = imageData.replace(/^data:image\/png;base64,/, ''); // Remove the data URL prefix
        sendImageForPrediction(base64ImageData);
    });

    clearButton.addEventListener('click', () => {
        clearCanvas();
    });

    function sendImageForPrediction(base64ImageData) {
        console.log('Sending image data:', base64ImageData);
        fetch('http://localhost:3000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageData: base64ImageData }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Prediction result:', data);
            
            predictionResult.innerHTML = `Predicted character: ${data.prediction}`;
        })
        .catch(error => {
            console.error('Prediction error:', error);
            predictionResult.innerHTML = 'Error getting predictions.';
        });
    }

    function clearCanvas() {
        context.fillStyle = 'white';
        context.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        predictionResult.innerHTML = '';
    }
});
