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
            // TODO Criar a lista de chamados no HTML (dinamicamente)
        } else {
            alert('Erro inesperado!');
        }
    } catch(error) {
        alert(error);          
    }
}
