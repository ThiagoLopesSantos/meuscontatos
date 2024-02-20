const form = document.getElementById('form-contato');
const nomes = [];
const ddd = [];
const telefones = [];

let linhas = '';


form.addEventListener('submit', function(e){
    e.preventDefault();
    adicionarLinha();
    atualizaTabela();
    atualizaContador();
});


function adicionarLinha(){
    const inputNome = document.getElementById('name');
    const inputDdd = document.getElementById('ddd');
    const inputTelefone = document.getElementById('cell');

    if(telefones.includes(inputTelefone.value)) {
        alert(`Este número (${inputDdd.value}) ${inputTelefone.value} já foi inserido`);
    }else {
        if(nomes.includes(inputNome.value)) {
            alert(`O nome de contato (${inputNome.value}) já está na lista. Favor adicione um complemento.`);
        }else {
            nomes.push(inputNome.value);
            ddd.push(inputDdd.value);
            telefones.push(inputTelefone.value);
        
            let linha = `<tr>`;
            linha += `<td><input class="checkbox" type="checkbox"></td>`;
            linha +=  `<td>${inputNome.value}</td>`;
            linha +=  `<td>(${inputDdd.value})${inputTelefone.value}</td>`;
            linha +=  `</tr>`;
        
            linhas += linha;

            // Incrementando o contador de contatos
            atualizaContador();
        }
        
    }

    
    //LIMPANDO O FORMULÁRIO
    inputNome.value = '';
    inputDdd.value = '';
    inputTelefone.value = '';
}

//Atualizando a tabela de contatos para o cliente
function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

//Fzendo a contagem de contatos cadastrados
function atualizaContador(){
    const contador = document.getElementById('contador');
    const button = document.getElementById('excluir-contatos');
    contador.textContent = nomes.length;

    if (contador.textContent > 0) {
        button.style.display = "inline-block";
    }else {
        button.style.display = "none";
    }
}


//Excluir contatos selecionados no checkbox
document.getElementById('excluir-contatos').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    checkboxes.forEach(function(checkbox) {
        const index = Array.from(checkbox.closest('tr').parentNode.children).indexOf(checkbox.closest('tr')) - 1;
        nomes.splice(index, 1);
        ddd.splice(index, 1);
        telefones.splice(index, 1);
    });
    atualizaTabela();
    atualizaContador();
});
