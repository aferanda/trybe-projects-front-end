const input = document.getElementById('texto-tarefa');
const buttonAdd = document.getElementById('criar-tarefa');
const buttonRemoveSelected = document.getElementById('remover-selecionado');
const buttonMoveUp = document.getElementById('mover-cima');
const buttonMoveDown = document.getElementById('mover-baixo');
const buttonClearList = document.getElementById('apaga-tudo');
const buttonRemoveCompleted = document.getElementById('remover-finalizados');
const buttonSaveList = document.getElementById('salvar-tarefas');
const listTasks = document.getElementById('lista-tarefas');
const arrayList = document.getElementsByTagName('li');

// Requisito 7 e 8
function changeBgColor(event) {
  for (let index = 0; index < arrayList.length; index += 1) {
    arrayList[index].style.backgroundColor = '';
  }
  const eventClicked = event.target;
  eventClicked.style.backgroundColor = 'rgb(128, 128, 128)';
}

// Requisito 9
function completed(event) {
  const eventClicked = event.target;
  if (eventClicked.className === 'completed') {
    eventClicked.classList.remove('completed');
  } else {
    eventClicked.classList.add('completed');
  }
}

// Requisitos 5 e 6
function addTasks() {
  const li = document.createElement('li');
  li.innerText = input.value;
  li.addEventListener('click', changeBgColor);
  li.addEventListener('dblclick', completed);
  listTasks.appendChild(li);
  input.value = '';
}

// Requisito 10
function clearList() {
  listTasks.innerHTML = '';
}

// Requisito 11
function clearCompleted() {
  let classCompleted = document.querySelector('.completed');
  while (classCompleted) {
    classCompleted.remove();
    classCompleted = document.querySelector('.completed');
  }
}

// Requisito 12
function saveList() {
  const listTasksHTML = listTasks.innerHTML;
  localStorage.setItem('listTasksSave', listTasksHTML);
}

window.onload = () => {
  listTasks.innerHTML = localStorage.getItem('listTasksSave');
};

// Requisito 13
function moveUp() {
  for (let index = 0; index < arrayList.length; index += 1) {
    if (arrayList[index].style.backgroundColor !== '' && index > 0) {
      listTasks.insertBefore(arrayList[index], arrayList[index].previousSibling);
      return;
    }
  }
}
function moveDown() {
  for (let index = 0; index < arrayList.length; index += 1) {
    if (arrayList[index].style.backgroundColor !== '' && index < (arrayList.length - 1)) {
      listTasks.insertBefore(arrayList[index], arrayList[index + 1].nextSibling);
      return;
    }
  }
}

// Requisito 14
function removeSelected() {
  for (let index = 0; index < arrayList.length; index += 1) {
    if (arrayList[index].style.backgroundColor !== '') {
      arrayList[index].remove();
    }
  }
}

// Escutadores buttons
buttonAdd.addEventListener('click', addTasks);
buttonClearList.addEventListener('click', clearList);
buttonRemoveCompleted.addEventListener('click', clearCompleted);
buttonSaveList.addEventListener('click', saveList);
buttonMoveUp.addEventListener('click', moveUp);
buttonMoveDown.addEventListener('click', moveDown);
buttonRemoveSelected.addEventListener('click', removeSelected);
