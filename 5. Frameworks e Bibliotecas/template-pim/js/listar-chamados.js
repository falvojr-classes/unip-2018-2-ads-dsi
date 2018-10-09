buscarChamados();

async function buscarChamados() {
    try {
        const username = 'falvojr@gmail.com';
        const password = '12345678';
        const basicToken = 'Basic ' + btoa(username + ':' + password);
        const response = await fetch('http://localhost:8080/api/chamados', {  
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicToken
            }
        });
        if (response.ok) {
            const chamados = await response.json();
            alert(chamados);
        } else {
            alert('Erro inesperado!');
        }
    } catch(error) {
        alert(error);          
    }
}
