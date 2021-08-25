const buttonLogin = document.getElementById('button-login');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const agreed = document.getElementById("agreement");
const button = document.getElementById("submit-btn");

/* Função butão de login */
function btnLogin() {
  const valorEmail = email.value;
  const valorSenha = senha.value;
  if (valorEmail === 'tryber@teste.com' && valorSenha === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

buttonLogin.addEventListener('click', btnLogin);



button.disabled = true;

function habilitaBtn() {
  if (agreed.value === "") {
    button.disabled = true; 
  } else {
    button.disabled = false;
  }
}

agreed.addEventListener("change", habilitaBtn);