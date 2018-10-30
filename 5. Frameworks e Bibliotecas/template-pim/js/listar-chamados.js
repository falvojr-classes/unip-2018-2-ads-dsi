const body = document.getElementsByTagName('body')[0];

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

            for(i = 0; i < chamados.length; i++) {
                const chamado = chamados[i];

                const row = document.createElement('div');
                row.classList.add('row');

                const titulo = criarColunaTextual(chamado.titulo, 'col-2');
                const cliente = criarColunaTextual(chamado.cliente.nome, 'col-3');
                var funcionario;
                if (chamado.funcionario) {
                    funcionario = criarColunaTextual(chamado.funcionario.nome, 'col-3');
                } else {
                    funcionario = criarColunaTextual('', 'col-3'); 
                }
                const status = criarColunaTextual(chamado.status, 'col-2');
                const inicio = criarColunaTextual(chamado.inicio, 'col-2');

                row.appendChild(titulo);
                row.appendChild(cliente);
                row.appendChild(funcionario);
                row.appendChild(status);
                row.appendChild(inicio);

                body.appendChild(row);
            }
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch(error) {
        alert('Ocorreu um erro inesperado!');     
    }

    function criarColunaTextual(valor, classeCss) {
        const coluna = document.createElement('div');
        coluna.classList.add(classeCss);
        coluna.innerHTML = valor;
        return coluna;
    }
}
