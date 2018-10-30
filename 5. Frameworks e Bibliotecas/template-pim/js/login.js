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
            const usuarioLogado = await response.json();

            // Armazena Token e Usuario logado localmente
            localStorage.setItem("token", basicToken);
            localStorage.setItem("usuario", JSON.stringify(usuarioLogado))
            
            if(usuarioLogado.funcionario) {
                location.href = "listar-chamados.html";
            } else {
                location.href = "abrir-chamado.html";
            }
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');         
    }
}
