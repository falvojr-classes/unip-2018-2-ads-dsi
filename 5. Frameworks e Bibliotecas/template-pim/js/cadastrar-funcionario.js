const txtNome = document.getElementById('txtNome');
const txtMatricula = document.getElementById('txtMatricula');
const txtEmail = document.getElementById('txtEmail');
const txtSenha = document.getElementById('txtSenha');
const txtConfirmarSenha = document.getElementById('txtConfirmarSenha');
const btnCadastrar = document.getElementById('btnCadastrar');

btnCadastrar.addEventListener('click', () => {
    if(txtSenha.value != txtConfirmarSenha.value) {
        alert("As senhas devem ser iguais!");
    } else {
        const funcionario = {
            email: txtEmail.value,
            matricula: txtMatricula.value,
            nome: txtNome.value,
            senha: txtSenha.value
        }
        cadastrar(funcionario);
    }
});

async function cadastrar(funcionario) {
    try {
        const response = await fetch('http://localhost:8080/api/funcionarios', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });
        if (response.ok) {
            alert('Funcionario cadastrado com sucesso!');
        } else {
            alert('Erro inesperado!');
        }
    } catch(error) {
        alert(error);          
    }
}