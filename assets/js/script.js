const form = document.getElementById('form-contato');
const nomes = [];
const ddd = [];
const telefones = [];

let linhas = [];


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
        
            linhas.push(linha);

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

    const checkboxes = document.querySelectorAll('tbody tr input[type="checkbox"]:checked');

    checkboxes.forEach(function (checkbox) {
        const tr = checkbox.closest('tr');
        const index = Array.from(tr.parentNode.children).indexOf(tr);

        // Obter valores dos campos antes de remover
        const nomeRemovido = nomes[index];
        const dddRemovido = ddd[index];
        const telefoneRemovido = telefones[index];


        // Remover elementos dos arrays
        nomes.splice(index, 1);
        ddd.splice(index, 1);
        telefones.splice(index, 1);

        // Agora você pode usar nomeRemovido, dddRemovido e telefoneRemovido conforme necessário
        console.log('Nome Removido:', nomeRemovido);
        console.log('DDD Removido:', dddRemovido);
        console.log('Telefone Removido:', telefoneRemovido);

        removerLinha(nomeRemovido, dddRemovido, telefoneRemovido);

    });
    atualizaTabela();
    atualizaContador();
});

function removerLinha(nome, ddd, telefone) {
    linhas = linhas.filter(item => !item.includes(nome) || !item.includes(ddd) || !item.includes(telefone));
}
