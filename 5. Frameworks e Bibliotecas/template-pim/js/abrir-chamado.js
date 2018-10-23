const btnAbrirChamado = document.getElementById('btnAbrirChamado');
const txtTitulo = document.getElementById('txtTitulo');
const txtDescricao = document.getElementById('txtDescricao');
const saudacao = document.getElementById('saudacao');
const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

saudacao.innerHTML =  `Ola ${usuarioLogado.nome}!`;

btnAbrirChamado.addEventListener('click', () => {
    const chamado = {
        idUsuario: usuarioLogado.id,
        titulo: txtTitulo.value,
        descricao: txtDescricao.value
    }
    abrirChamado(chamado);
})

async function abrirChamado(chamado) {
    try {
        const response = await fetch('http://localhost:8080/api/chamados', {  
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(chamado)
        });
        if (response.ok) {
            alert('Chamado aberto com sucesso!');
        } else {
            alert('Erro inesperado!');
        }
    } catch(error) {
        alert(error);          
    }
}
