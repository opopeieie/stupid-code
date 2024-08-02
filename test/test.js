// Get the canvas element and its context
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Set up canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set up drawing settings
let drawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

console.log(6);
console.warn(6);
console.error(6);

function draw(e) {
    if (!drawing) return; // Stop the function when not drawing

    // Set up stroke style and line properties
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineWidth = hue % 100;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Start the drawing path
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // Update lastX and lastY to the current position
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // Update hue value for color cycle
    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    // Change line width direction
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }

    // Increment or decrement line width
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

// Event listeners for mouse down, move, and up/out actions
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

// Button to clear the canvas
const clearButton = document.createElement('button');
clearButton.textContent = 'Clear Canvas';
document.body.appendChild(clearButton);

clearButton.style.position = 'absolute';
clearButton.style.top = '10px';
clearButton.style.left = '10px';
clearButton.style.padding = '10px 20px';
clearButton.style.fontSize = '16px';
clearButton.style.backgroundColor = '#ff0000';
clearButton.style.color = '#ffffff';
clearButton.style.border = 'none';
clearButton.style.borderRadius = '5px';
clearButton.style.cursor = 'pointer';

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Resize the canvas when the window is resized
window.addEventListener('resize', () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.putImageData(imageData, 0, 0);
});

// Randomly change the background color of the canvas every few seconds
setInterval(() => {
    canvas.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 95%)`;
}, 5000);

// Add instructions to the canvas
ctx.font = '24px Arial';
ctx.fillStyle = '#333333';
ctx.fillText('Click and drag to draw. Click "Clear Canvas" to reset.', 50, 50);

// Create a button to toggle the drawing mode (draw/erase)
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Draw/Erase';
document.body.appendChild(toggleButton);

toggleButton.style.position = 'absolute';
toggleButton.style.top = '10px';
toggleButton.style.right = '10px';
toggleButton.style.padding = '10px 20px';
toggleButton.style.fontSize = '16px';
toggleButton.style.backgroundColor = '#0000ff';
toggleButton.style.color = '#ffffff';
toggleButton.style.border = 'none';
toggleButton.style.borderRadius = '5px';
toggleButton.style.cursor = 'pointer';

let erasing = false;

toggleButton.addEventListener('click', () => {
    erasing = !erasing;
    if (erasing) {
        ctx.globalCompositeOperation = 'destination-out';
        toggleButton.textContent = 'Switch to Draw Mode';
    } else {
        ctx.globalCompositeOperation = 'source-over';
        toggleButton.textContent = 'Switch to Erase Mode';
    }
});

// Create a button to change the brush size
const brushSizeButton = document.createElement('button');
brushSizeButton.textContent = 'Change Brush Size';
document.body.appendChild(brushSizeButton);

brushSizeButton.style.position = 'absolute';
brushSizeButton.style.top = '50px';
brushSizeButton.style.left = '10px';
brushSizeButton.style.padding = '10px 20px';
brushSizeButton.style.fontSize = '16px';
brushSizeButton.style.backgroundColor = '#00ff00';
brushSizeButton.style.color = '#ffffff';
brushSizeButton.style.border = 'none';
brushSizeButton.style.borderRadius = '5px';
brushSizeButton.style.cursor = 'pointer';

brushSizeButton.addEventListener('click', () => {
    ctx.lineWidth = Math.floor(Math.random() * 50) + 1;
});

// Add instructions to toggle the drawing mode
ctx.fillText('Click "Toggle Draw/Erase" to switch modes.', 50, 80);

// Add a button to save the drawing
const saveButton = document.createElement('button');
saveButton.textContent = 'Save Drawing';
document.body.appendChild(saveButton);

saveButton.style.position = 'absolute';
saveButton.style.top = '90px';
saveButton.style.left = '10px';
saveButton.style.padding = '10px 20px';
saveButton.style.fontSize = '16px';
saveButton.style.backgroundColor = '#ff00ff';
saveButton.style.color = '#ffffff';
saveButton.style.border = 'none';
saveButton.style.borderRadius = '5px';
saveButton.style.cursor = 'pointer';

saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'my_drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});
