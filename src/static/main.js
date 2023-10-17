import { initializeCanvas, clearCanvas, isCanvasBlank } from './scripts/canvas.js';
import { sendImageForPrediction, sendImageForCollection } from './scripts/api.js';
import { Game } from './scripts/game.js';
import { Contribute } from './scripts/contribute.js';

document.addEventListener('DOMContentLoaded', () => {
    const drawingCanvas = initializeCanvas('drawingCanvas');
    const drawingCanvasContribute = initializeCanvas('drawingCanvasContribute');
    const submitButton = document.getElementById('submitButton');
    const clearButton = document.getElementById('clearButton');
    const tryAgainButton = document.getElementById('tryAgainButton');
    const nextButton = document.getElementById('nextButton');
    const predictionResult = document.getElementById('predictionResult');
    const newGameButton = document.getElementById('newGameButton');
    const clearButtonContribute = document.getElementById('clearButtonContribute');
    const submitButtonContribute = document.getElementById('submitButtonContribute');

    let game = new Game();
    let contribute = new Contribute();
    
    function updateButtonState() {
        if (!isCanvasBlank(drawingCanvas)) {
            submitButton.classList.remove('disabled');
            submitButton.setAttribute('aria-disabled', 'false');
        } else {
            if (!submitButton.classList.contains('disabled')) {
                submitButton.classList.add('disabled');
                submitButton.setAttribute('aria-disabled', 'true');
            }
        }
            
        if (!isCanvasBlank(drawingCanvasContribute)) {
            submitButtonContribute.classList.remove('disabled');
            submitButtonContribute.setAttribute('aria-disabled', 'false');
        } else {
            if (!submitButtonContribute.classList.contains('disabled')) {
                submitButtonContribute.classList.add('disabled');
                submitButtonContribute.setAttribute('aria-disabled', 'true');
            }
        }
    }

    // Update button state if canvas is not blank
    drawingCanvas.addEventListener('touchmove', updateButtonState);
    drawingCanvasContribute.addEventListener('touchmove', updateButtonState);

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
                    // Replace underscores with commas
                    let parsedAns = answers[i][0].replace(/_/g, ', ');
                    predictionClassRows[i].innerHTML = parsedAns;
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

        // Update button state
        updateButtonState();
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

    clearButtonContribute.addEventListener('click', () => {
        clearCanvas(drawingCanvasContribute);
    });

    submitButtonContribute.addEventListener('click', () => {
        console.log('Submitting image for contribution...');

        const imageData = drawingCanvasContribute.toDataURL('image/png');
        const base64ImageData = imageData.replace(/^data:image\/png;base64,/, '');
        let character = document.getElementById('character').innerHTML;
        character = character.replace(/, /g, '_');

        console.log('Submitting for:', character);
        sendImageForCollection(base64ImageData, character).then(data => {
            console.log('Contribution result:', data);

            // Clear the canvas
            clearCanvas(drawingCanvasContribute);

            // Get the next character
            contribute.getCharacter();
        }).catch(error => {
            console.error('Contribution error:', error);
        });
    });
});
