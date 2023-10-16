// main.js
import { initializeCanvas, clearCanvas } from './scripts/canvas.js';
import { sendImageForPrediction } from './scripts/api.js';
import { Game } from './scripts/game.js';

document.addEventListener('DOMContentLoaded', () => {
    const drawingCanvas = initializeCanvas();
    const submitButton = document.getElementById('submitButton');
    const clearButton = document.getElementById('clearButton');
    const predictionResult = document.getElementById('predictionResult');
    const word = document.getElementById('word');

    let answer;
    const game = new Game();
    word.innerHTML = game.word;

    submitButton.addEventListener('click', () => {
        const imageData = drawingCanvas.toDataURL('image/png');
        const base64ImageData = imageData.replace(/^data:image\/png;base64,/, '');
        sendImageForPrediction(base64ImageData)
            .then(data => {
                predictionResult.innerHTML = `Predicted character: ${data.prediction}`;
                answer = data.prediction;

                if (game.checkLetter(answer)) {
                    console.log('You written correctly!');
                } else {
                    console.log('You written incorrectly!');
                }
            })
            .catch(error => {
                console.error('Prediction error:', error);
                predictionResult.innerHTML = 'Error getting predictions.';
            });
    });

    clearButton.addEventListener('click', () => {
        clearCanvas(drawingCanvas);
        predictionResult.innerHTML = '';
    });
});
