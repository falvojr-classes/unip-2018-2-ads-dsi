const btnEntrar = document.getElementById('btnEntrar');
const txtEmail = document.getElementById('txtEmail');
const txtSenha = document.getElementById('txtSenha');

btnEntrar.addEventListener('click', () => {
    const email = txtEmail.value;
    const senha = txtSenha.value;
    entrar(email, senha);
})

async function entrar(email, senha) {
    try {
        const basicToken = 'Basic ' + btoa(email + ':' + senha);
        const response = await fetch('http://localhost:8080/api/usuarios/eu', {  
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicToken
            }
        });
        if (response.ok) {
            alert('Autenticado com sucesso!');
            // TODO: Aramazenar o Basic Token...
        } else {
            alert('Erro inesperado!');
        }
    } catch(error) {
        alert(error);          
    }
}
