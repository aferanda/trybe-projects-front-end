const buttonLogin = document.getElementById('button-login');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const agreed = document.getElementById('agreement');
const buttonSubmit = document.getElementById('submit-btn');
const count = document.getElementById('counter');
const form = document.getElementById('evaluation-form');
const inputName = document.getElementById('input-name');
const inputLastName = document.getElementById('input-lastname');
const inputEmail = document.getElementById('input-email');
const inputHouse = document.getElementById('house');
const inputFamily = document.getElementsByName('family');
const inputSubjects = document.getElementsByClassName('subject');
const inputRate = document.getElementsByName('rate');
const textArea = document.getElementById('textarea');

/* Função botão de login */
function btnLogin() {
  const valorEmail = email.value;
  const valorSenha = senha.value;
  if (valorEmail === 'tryber@teste.com' && valorSenha === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

/* Função habilita botão */
function habilitaBtn() {
  if (agreed.checked) {
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.disabled = true;
  }
}

function countChars() {
  let restante = 500;
  const inputLength = textArea.value.length;
  if (inputLength > 0) {
    restante -= inputLength;
  }
  count.innerText = `${restante} Restantes`;
}

function fullName() {
  const inputFullName = `Nome: ${inputName.value} ${inputLastName.value}`;
  return inputFullName;
}

function emailForm() {
  const emailValue = `Email: ${inputEmail.value}`;
  return emailValue;
}

function houseForm() {
  const houseValue = `Casa: ${inputHouse.value}`;
  return houseValue;
}

function familyForm() {
  let familyValue;
  for (let index = 0; index < inputFamily.length; index += 1) {
    if (inputFamily[index].checked) {
      familyValue = `Família: ${inputFamily[index].value}`;
    }
  }
  return familyValue;
}

function subjectsForm() {
  let subjectValue = 'Matérias: ';
  for (let index = 0; index < inputSubjects.length; index += 1) {
    if (inputSubjects[index].checked) {
      subjectValue += `${inputSubjects[index].value}`;
      subjectValue += ', ';
    }
  }
  return subjectValue;
}

function rateForm() {
  let rateValue = '';
  for (let index = 0; index < inputRate.length; index += 1) {
    if (inputRate[index].checked) {
      rateValue = `Avaliação: ${inputRate[index].value}`;
    }
  }
  return rateValue;
}

function textAreaForm() {
  const textAreaValue = `Observações: ${textArea.value}`;
  return textAreaValue;
}

function forms() {
  const allFunctions = [fullName(),
    emailForm(),
    houseForm(),
    familyForm(),
    subjectsForm(),
    rateForm(),
    textAreaForm(),
  ];
  const div = document.createElement('div');
  for (let index = 0; index < allFunctions.length; index += 1) {
    const paragraph = document.createElement('p');
    paragraph.innerText = allFunctions[index];
    div.appendChild(paragraph);
  }
  form.innerHTML = '';
  form.appendChild(div);
}

buttonLogin.addEventListener('click', btnLogin);
agreed.addEventListener('change', habilitaBtn);
textArea.addEventListener('keyup', countChars);
buttonSubmit.addEventListener('click', forms);
