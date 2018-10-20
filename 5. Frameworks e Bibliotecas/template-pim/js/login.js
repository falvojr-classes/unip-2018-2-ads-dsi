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
        const response = await fetch('http://localhost:8081/api/usuarios/eu', {  
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicToken
            }
        });
        if (response.ok) {
            const usuarioLogado = await response.json();
            alert(usuarioLogado.nome + ' autenticado com sucesso!');
            // TODO: Armazenar o Basic Token...
        } else {
            alert('Erro inesperado!');
        }
    } catch(error) {
        alert(error);          
    }
}
