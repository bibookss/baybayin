export function initializeCanvas(id) {
    console.log('Initializing canvas...');
    const drawingCanvas = document.getElementById(id);
    const context = drawingCanvas.getContext('2d');
    let drawing = false;

    context.fillStyle = 'white';
    context.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    // Set the imageSmoothingEnabled property to true
    context.imageSmoothingEnabled = true;

    // Set the willReadFrequently attribute to true
    drawingCanvas.willReadFrequently = true;

    // Mouse events
    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mouseup', stopDrawing);
    drawingCanvas.addEventListener('mousemove', draw);

    // Touch events
    drawingCanvas.addEventListener('touchstart', startDrawing);
    drawingCanvas.addEventListener('touchend', stopDrawing);
    drawingCanvas.addEventListener('touchmove', draw);

    function startDrawing(e) {
        drawing = true;
        context.beginPath();
        
        const { x, y } = getCoordinates(e);
        context.moveTo(x, y);
    }

    function stopDrawing() {
        drawing = false;
    }

    function draw(e) {
        e.preventDefault(); // Prevent the default behavior (scrolling)
    
        if (!drawing) return;
    
        const { x, y } = getCoordinates(e);
    
        context.lineWidth = 10;
        context.lineCap = 'round';
        context.strokeStyle = 'black';
    
        context.lineTo(x, y);
        context.stroke();
    }

    function getCoordinates(e) {
        let x, y;
        if (e.touches && e.touches.length > 0) {
            x = e.touches[0].clientX - drawingCanvas.getBoundingClientRect().left;
            y = e.touches[0].clientY - drawingCanvas.getBoundingClientRect().top;
        } else {
            x = e.clientX - drawingCanvas.getBoundingClientRect().left;
            y = e.clientY - drawingCanvas.getBoundingClientRect().top;
        }
        return { x, y };
    }

    return drawingCanvas;
}

export function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );

    return !pixelBuffer.some(color => (color & 0x00ffffff) !== 0x00ffffff);
}

export function clearCanvas(canvas) {
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
}
