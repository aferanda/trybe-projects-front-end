// Requisito 12
function randomPalette() {
  const randomNumber = Math.floor(Math.random() * 255);
  return randomNumber;
}

// Requisito 2 e 3
function createPalette() {
  const colors = ['black'];
  for (let index = 0; index < 3; index += 1) {
    colors.push(`rgb(${randomPalette()}, ${randomPalette()}, ${randomPalette()})`);
  }
  const divFather = document.getElementById('color-palette');
  for (let index = 0; index < 4; index += 1) {
    const divChild = document.createElement('div');
    divChild.className = 'color';
    divChild.style.backgroundColor = colors[index];
    divFather.appendChild(divChild);
  }
}

createPalette();

// Requisito 4 e 5
let framesInput = 5; // Número de quadros-pixels
function createFrame() {
  const divFather = document.createElement('div');
  const result = framesInput * 42;
  divFather.id = 'pixel-board';
  divFather.style.width = `${result}px`;
  divFather.style.height = `${result}px`;
  document.body.appendChild(divFather);
  for (let index = 0; index < (framesInput ** 2); index += 1) {
    const divChild = document.createElement('div');
    divChild.className = 'pixel';
    divChild.style.backgroundColor = 'white';
    divFather.appendChild(divChild);
  }
}

createFrame();

// Requisito 6
let colorSelected = document.querySelector('.color');
colorSelected.classList.add('selected');

// Requisito 7
const arrayColor = document.getElementsByClassName('color');
const divsPalette = [];
for (let index = 0; index < arrayColor.length; index += 1) {
  divsPalette.push(arrayColor[index]);
}
function selectColor() {
  document.body.addEventListener('click', (event) => {
    if (!(divsPalette.includes(event.target))) {
      return;
    }
    colorSelected.classList.remove('selected');
    event.target.classList.add('selected');
    colorSelected = event.target;
  });
}

selectColor();

// Requisito 8
const arrayPixels = document.getElementsByClassName('pixel');
const pixelBox = [];
function pixelColor() {
  for (let index = 0; index < arrayPixels.length; index += 1) {
    pixelBox.push(arrayPixels[index]);
    arrayPixels[index].addEventListener('click', (event) => {
      const evento = event.target;
      evento.style.backgroundColor = colorSelected.style.backgroundColor;
    })
  }
}

pixelColor();

// Requisito 9
const pixelBoard = document.querySelector('#pixel-board');
function createButton() {
  const button = document.createElement('button');
  button.id = 'clear-board';
  button.innerText = 'Limpar';
  document.body.insertBefore(button, pixelBoard);

  button.addEventListener('click', () => {
    for (let index = 0; index < pixelBox.length; index += 1) {
      pixelBox[index].style.backgroundColor = 'white';
    }
  });
}

createButton();

// Requisito 10 e 11
const div = document.createElement('div');
div.id = 'input-button';
document.body.insertBefore(div, pixelBoard);

const input = document.createElement('input');
input.id = 'board-size';
input.placeholder = 'Digite aqui'; // Item 3
input.type = 'number';
input.min = '1';
div.appendChild(input);

const button = document.createElement('button');
button.id = 'generate-board'; // Item 3
button.innerText = 'VQV'; // Item 5
div.appendChild(button);

function setInput() {
  button.addEventListener('click', () => {
    let numberOfInput = input.value;
    if (numberOfInput === '') {
      alert('Board inválido!');
      return; // Item 8
    }
    if (numberOfInput < 5) {
      numberOfInput = 5;
    }
    if (numberOfInput > 50) {
      numberOfInput = 50;
    }
    framesInput = numberOfInput;
    document.body.removeChild(pixelBoard);
    createFrame();
    pixelColor();
  });
}

setInput();
