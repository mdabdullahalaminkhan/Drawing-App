const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

let size = 30;
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Touch events for mobile
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

increaseBtn.addEventListener('click', increaseSize);
decreaseBtn.addEventListener('click', decreaseSize);
colorEl.addEventListener('change', updateColor);
clearEl.addEventListener('click', clearCanvas);

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function draw(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  ctx.lineWidth = size * 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;

  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function increaseSize() {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen();
}

function decreaseSize() {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
}

function updateColor(e) {
  color = e.target.value;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}