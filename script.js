const buttonLogin = document.getElementById('button-login');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const agreed = document.getElementById('agreement');
const button = document.getElementById('submit-btn');
const textArea = document.getElementById('textarea');
const count = document.getElementById('counter');

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
    button.disabled = false;
  } else {
    button.disabled = true;
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

buttonLogin.addEventListener('click', btnLogin);
agreed.addEventListener('change', habilitaBtn);
textArea.addEventListener('keyup', countChars);
