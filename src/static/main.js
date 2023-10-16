// main.js
import { initializeCanvas, clearCanvas, isCanvasBlank } from './scripts/canvas.js';
import { sendImageForPrediction } from './scripts/api.js';
import { Game } from './scripts/game.js';

document.addEventListener('DOMContentLoaded', () => {
    const drawingCanvas = initializeCanvas();
    const submitButton = document.getElementById('submitButton');
    const clearButton = document.getElementById('clearButton');
    const correctButton = document.getElementById('correctButton');
    const tryAgainButton = document.getElementById('tryAgainButton');
    const nextButton = document.getElementById('nextButton');
    const predictionResult = document.getElementById('predictionResult');
    const newGameButton = document.getElementById('newGameButton');

    let game = new Game();
    
    function updateButtonState() {
        console.log('Updating button state...');
        console.log('Is canvas blank:', isCanvasBlank(drawingCanvas));
        if (!isCanvasBlank(drawingCanvas)) {
            submitButton.classList.remove('disabled');
            submitButton.setAttribute('aria-disabled', 'false');
        } else {
            if (!submitButton.classList.contains('disabled')) {
                submitButton.classList.add('disabled');
                submitButton.setAttribute('aria-disabled', 'true');
            }
        }
    }

    // Update button state if canvas is not blank
    drawingCanvas.addEventListener('touchmove', updateButtonState);

    submitButton.addEventListener('click', () => {
        const imageData = drawingCanvas.toDataURL('image/png');
        const base64ImageData = imageData.replace(/^data:image\/png;base64,/, '');
        sendImageForPrediction(base64ImageData)
            .then(data => {
                // Hide the clear and submit buttons
                clearButton.style.display = 'none';
                submitButton.style.display = 'none';
                
                // Unhide try again button
                tryAgainButton.style.display = 'inline-block';

                // Unhide the prediction result
                predictionResult.style.display = 'block';
                console.log('Prediction result:', data);
                let answers = data.prediction;

                let predictionClassRows = document.getElementsByClassName('prediction-class'); 
                let probabilityRows = document.getElementsByClassName('probability');
                for (let i = 0; i < predictionClassRows.length; i++) {
                    predictionClassRows[i].innerHTML = answers[i][0];
                    probabilityRows[i].innerHTML = answers[i][1];
                }

                if (game.checkAnswer(answers)) {
                    console.log('You written correctly!');
                    
                    // Make try again button inaccessible
                    tryAgainButton.style.display = 'none';

                    // Make next button accessible
                    nextButton.classList.remove('disabled');

                    if (game.isGameWon()) {
                        console.log('You won!');
                        
                        // Hide the try again and next button
                        tryAgainButton.style.display = 'none';
                        nextButton.style.display = 'none';

                        // Display the new game button
                        newGameButton.style.display = 'inline-block';
                    } 
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
        predictionResult.style.display = 'none';

        console.log('Clearing canvas...');
        updateButtonState();
        console.log('Canvas cleared.');
    });

    tryAgainButton.addEventListener('click', () => {
        clearCanvas(drawingCanvas);
        // Display the clear and submit buttons
        clearButton.style.display = 'inline-block';
        submitButton.style.display = 'inline-block';

        // Hide the prediction result
        predictionResult.style.display = 'none';
    });

    nextButton.addEventListener('click', () => {
        clearCanvas(drawingCanvas);
        // Display the clear and submit buttons
        clearButton.style.display = 'inline-block';
        submitButton.style.display = 'inline-block';

        // Hide the prediction result
        predictionResult.style.display = 'none';

        // Make next button inaccessible
        nextButton.classList.add('disabled');

        // Get the next character
        game.getNextCharacter();
    });

    newGameButton.addEventListener('click', () => {
        game = new Game();

        clearCanvas(drawingCanvas);

        // Display the clear and submit buttons
        clearButton.style.display = 'inline-block';
        submitButton.style.display = 'inline-block';

        // Hide the prediction result
        predictionResult.style.display = 'none';

        // Hide the new game button
        newGameButton.style.display = 'none';

        // Unhide next button
        nextButton.style.display = 'inline-block';
    });
});
