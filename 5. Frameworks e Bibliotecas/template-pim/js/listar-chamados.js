const body = document.getElementById('corpo');

buscarChamados();

async function buscarChamados() {
    try {
        const response = await fetch('http://localhost:8080/api/chamados', {  
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        });
        if (response.ok) {
            const chamados = await response.json();
            
            for (i = 0; i < chamados.length; i++) {
                const chamado = chamados[i];

                const linha = document.createElement('div');
                linha.classList.add('row');

                const colunaTitulo = criarColunaTextual(chamado.titulo, 'col-2');
                const colunaDescricao = criarColunaTextual(chamado.descricao, 'col-6');
                const colunaStatus = criarColunaTextual(chamado.status, 'col-2');
                const colunaInicio = criarColunaTextual(chamado.abertura, 'col-2');

                linha.appendChild(colunaTitulo);
                linha.appendChild(colunaDescricao);
                linha.appendChild(colunaStatus);
                linha.appendChild(colunaInicio);

                body.appendChild(linha);
            }
            
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');     
    }

    function criarColunaTextual(value, cssClass) {
        const coluna = document.createElement('div');
        coluna.classList.add(cssClass);
        coluna.innerHTML = value;
        return coluna;
    }
}
