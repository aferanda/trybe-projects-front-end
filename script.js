const buttonLogin = document.getElementById('button-login');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const agreed = document.getElementById('agreement');
const button = document.getElementById('submit-btn');
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
button.disabled = true;
function habilitaBtn() {
  if (agreed.value === '') {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function countChars(event) {
  let maxChars = 500;
  let inputLength = textArea.value.length + 1;
  let restante = 0;
  if (inputLength > 0) {
    restante = maxChars - inputLength;
  }
  //console.log(inputLength);
  console.log(restante);
}

buttonLogin.addEventListener('click', btnLogin);
agreed.addEventListener('change', habilitaBtn);
textArea.addEventListener('keypress', countChars);
