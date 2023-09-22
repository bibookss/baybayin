export function initializeCanvas() {
    const drawingCanvas = document.getElementById('drawingCanvas');
    const context = drawingCanvas.getContext('2d');
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

    return drawingCanvas;
}

export function clearCanvas(canvas) {
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
}
