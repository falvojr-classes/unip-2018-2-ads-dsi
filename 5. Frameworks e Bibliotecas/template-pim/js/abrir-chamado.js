const btnAbrirChamado = document.getElementById('btnAbrirChamado');
const txtTitulo = document.getElementById('txtTitulo');
const txtDescricao = document.getElementById('txtDescricao');

btnAbrirChamado.addEventListener('click', () => {
    const chamado = {
        titulo: txtTitulo.value,
        descricao: txtDescricao.value
    }
    abrirChamado(chamado);
})

async function abrirChamado(chamado) {
    try {
        const username = 'falvojr@gmail.com';
        const password = '12345678';
        const response = await fetch('http://localhost:8080/api/chamados', {  
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password)
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
