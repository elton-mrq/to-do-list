const button = document.querySelector(".button-add-task");
const input  = document.querySelector(".input-task");
const listTasks = document.querySelector(".list-tasks");

let mylist = [];

//FUNÇÕES
function addNewTasks(){
    mylist.push({
        task: input.value,
        end: false
    });
    
    showTasks();

    input.value = '';
}

function showTasks(){

    let newLi = '';

    mylist.forEach((item, index) => {

        newLi += `
            <li class="task ${item.end && 'done'}">
                <img src="img/checked-16x16.png" alt="Tarefa concluída" onclick="endTask(${index})">
                <p>${item.task}</p>
                <img src="img/trash-16x16.png" alt="Tarefa concluída" onclick="deleteItem(${index})">
            </li>
        `

    });

    listTasks.innerHTML = newLi;

    //ADICIONA A LISTA NO LOCALSTORAGE
    localStorage.setItem('list', JSON.stringify(mylist))
     
}

function endTask(index){
    mylist[index].end = !mylist[index].end;
    showTasks();
}

function deleteItem(index){
    mylist.splice(index, 1);
    showTasks();
}

function reloadTasks(){
    const tasksLocalStorage = localStorage.getItem('list');
    
    if(tasksLocalStorage){
        mylist = JSON.parse(tasksLocalStorage);
    }    

    showTasks();
}

//AO REINICIAR A APLICACAO
reloadTasks();

//EVENTOS
button.addEventListener('click', addNewTasks);