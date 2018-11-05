const btnAcao = document.getElementById('btnAcao');
const txtTitulo = document.getElementById('txtTitulo');
const txtDescricao = document.getElementById('txtDescricao');
const saudacao = document.getElementById('saudacao');
const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

inicializar();

async function inicializar() {
    const tipoUsuario = usuarioLogado.funcionario ? 'F' : 'C';
    saudacao.innerHTML =  `Usuario: ${usuarioLogado.nome} (${tipoUsuario})`;

    var chamado = await buscarChamado();

    const ehEdicao = chamado != null;
    if (ehEdicao) {
        txtTitulo.value = chamado.titulo;
        txtDescricao.value = chamado.descricao;
        txtTitulo.disabled = true;
        txtDescricao.disabled = true;

        if (chamado.status == 'ABERTO') {
            btnAcao.innerHTML = 'INICIAR';
        } else if (chamado.status == 'EM_ANDAMENTO') {
            btnAcao.innerHTML = 'FINALIZAR';
        } else {
            btnAcao.style.display = 'none'; 
        }

        chamado.funcionario = {
            id: usuarioLogado.id
        }
    } else {
        btnAcao.innerHTML = 'ABRIR';
        
        chamado = {
            cliente: {
                id: usuarioLogado.id
            }
        }
    }

    btnAcao.addEventListener('click', () => {
        chamado.titulo = txtTitulo.value;
        chamado.descricao = txtDescricao.value;

        salvarChamado(chamado);
    })
}

async function salvarChamado(chamado) {
    try {
        const ehEdicao = chamado.id > 0;
        var url;
        if (ehEdicao) {
            url = `http://localhost:8080/api/chamados/${chamado.id}`;
        } else {
            url = 'http://localhost:8080/api/chamados';
        }
        
        const response = await fetch(url, {  
            method: ehEdicao ? 'PUT' : 'POST',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(chamado)
        });
        if (response.ok) {
            alert('Chamado salvo com sucesso!');
            inicializar();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');    
    }
}

async function buscarChamado() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id != null) {
            const url = `http://localhost:8080/api/chamados/${id}`;
            const response = await fetch(url, {  
                method: 'GET',  
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            });
            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.json();
                alert(error.message);
            }
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');    
    }
    return null;
}