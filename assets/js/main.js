const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

function criaBtn(){
    const btn = document.createElement('button');
    return btn;
}

inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function criaBtnApagar(li){
    li.innerText += ' ';
    const btn = criaBtn();
    btn.innerText = 'Apagar';
    btn.setAttribute('class', 'apagar');
    li.appendChild(btn);
}

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    criaBtnApagar(li);
    limpaInput();
    salvarTarefa();
}

btnTarefa.addEventListener('click',function(){
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click',function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefa();
    }
})

function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);

}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listadeTarefas = JSON.parse(tarefas);
    for (let tarefa of listadeTarefas){
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();