var taskService = new TaskService()
var isLoading = false
function getEle(id) {
    return document.getElementById(id);
}
function getEleByClass(className){
    return document.getElementsByClassName(className)
}
var renderListTask = function (listTask) {
    let listTodo = ''
    let listCompleted = ''
    listTask.reverse().forEach(function (task) {
        if(task.status == 'todo'){
            listTodo += renderTask(task)
        }else{
            listCompleted += renderTask(task)
        }
    });
    getEle('todo').innerHTML = listTodo;
    getEle('completed').innerHTML = listCompleted;
};

var addTaskUI = function (task){
    let listDOM = getEle(task.status)
    listDOM.insertAdjacentHTML('afterbegin', renderTask(task))
}

var validateInput = async function(value){
    let listTask = await taskService.getListTask()
    let contentExisted = listTask.data.map((task) => {
      return task.content
    })

    if (value.trim() == "") {
      return new Promise((resolve, reject) => {
        return reject("Bạn chưa điền task")
      })
    }

    if (contentExisted.includes(value.trim())) {
      return new Promise((resolve, reject) => {
        return reject("Task này đã tồn tại")
      })
    }
}

function renderTask(task){
    return `
        <li>
            <span>${task.content}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteToDo(${task.id})">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" onclick="changeStatus(${task.id})">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </li>
    `
}

function checkLoading(text, status){
    if(isLoading){
        getEleByClass("loader")[0].style.display = "block"
        getEleByClass("loader__content")[0].innerHTML = text
        getEleByClass("loader__spin")[0].style.display = "block"
        getEleByClass("loader__success")[0].style.display = "none"
        getEleByClass("loader__fail")[0].style.display = "none"
    }else{
        if(status == "success"){
            getEleByClass("loader__success")[0].style.display = "block"
            getEleByClass("loader__fail")[0].style.display = "none"
        }else{
            getEleByClass("loader__success")[0].style.display = "none"
            getEleByClass("loader__fail")[0].style.display = "block"
        }
        getEleByClass("loader__content")[0].innerHTML = text
        getEleByClass("loader__spin")[0].style.display = "none"
        setTimeout(()=>{
            getEleByClass("loader")[0].style.display = "none"
        }, 2000)   
    }
}
