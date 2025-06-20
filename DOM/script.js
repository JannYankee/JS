// Додавання блоків
const palette = document.querySelectorAll('.color');
const blocksContainer = document.getElementById('blocksContainer');
const addBtn = document.getElementById('addBlockBtn');
let selectedColor = null;

palette.forEach(color => {
  color.addEventListener('click', () => {
    selectedColor = color.style.background;
  });
});

addBtn.addEventListener('click', () => {
  if (selectedColor) {
    addBlock(selectedColor);
    saveBlocks();
  }
});

function addBlock(color) {
  const block = document.createElement('div');
  block.className = 'block';
  block.style.background = color;
  block.addEventListener('click', () => {
    block.remove();
    saveBlocks();
  });
  blocksContainer.appendChild(block);
}

function saveBlocks() {
  const saved = Array.from(blocksContainer.children).map(b => b.style.background);
  localStorage.setItem('blocks', JSON.stringify(saved));
}

function loadBlocks() {
  const saved = JSON.parse(localStorage.getItem('blocks'));
  if (saved) saved.forEach(color => addBlock(color));
}

loadBlocks();

// Світлофор
const lights = document.querySelectorAll('.light');
const nextBtn = document.getElementById('nextBtn');
let current = parseInt(localStorage.getItem('lightIndex')) || 0;

function updateTrafficLight() {
  lights.forEach((light, i) => {
    light.classList.toggle('active', i === current);
  });
  localStorage.setItem('lightIndex', current);
}

nextBtn.addEventListener('click', () => {
  current = (current + 1) % 3;
  updateTrafficLight();
});

updateTrafficLight();
