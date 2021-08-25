const buttonLogin = document.getElementById("button-login");
const email = document.getElementById("email");
const senha = document.getElementById("senha");



/* Função butão de login */
buttonLogin.addEventListener('click', btnLogin);
function btnLogin () {
    let valorEmail = email.value;
    let valorSenha = senha.value;
    if ( valorEmail === 'tryber@teste.com' && valorSenha === '123456') {
        alert("Olá, Tryber!");
    } else {
        alert("Email ou senha inválidos.");
    }
    
}
