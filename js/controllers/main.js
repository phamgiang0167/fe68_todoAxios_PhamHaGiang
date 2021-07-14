
var getTasks = function () {
    taskService.getListTask()
        .then((tasks)=>{
            renderListTask(tasks.data)
        })
        .catch((err) => {
            isLoading = true
            checkLoading("Một vài lỗi đã xảy ra", "load")
            setTimeout(()=>{
                console.log(err)
                isLoading = false
                checkLoading("Lỗi: " + err.response.status, "fail")
                getTasks()
            }, 1000)
        })
};

var postTask = async function () {
    //show loading
    isLoading = true
    checkLoading("Đang thêm task...", "load")
    
    //validate input
    let taskName = getEle('newTask').value
    validateInput(taskName)
        .then(() => {
            /**is valid */
            //tạo một đối tượng task
            let task = new Task(taskName, 'todo')

            //post a task
            taskService.addTask(task)
                .then((task) =>{
                    getEle('newTask').value = ''
                    isLoading = false
                    checkLoading("Thêm task thành công!", "success")
                    addTaskUI(task.data)
                })
                .catch((err) => {
                    console.log(err)
                    isLoading = false
                    checkLoading("lỗi: " + err.response.status, "fail")
                })
        })
        .catch((err)=>{
            /**is invalid */
            isLoading = false
            checkLoading(err, 'fail') 
        })
}


var deleteToDo = function (id) {
    isLoading = true
    checkLoading("Đang xóa task...")
    taskService.deleteTask(id)
        .then(()=>{
            isLoading = false
            checkLoading("Đã xóa task thành công!", 'success')
            getTasks()
        })
        .catch((err) => {
            console.log(err)
            isLoading = false
            checkLoading("Lỗi: " + err.response.status, "fail")
        })
}

var changeStatus = function (id){
    isLoading = true
    checkLoading("Đang cập nhật lại task...")
    taskService.getTaskById(id)
        .then((task) =>{
            let newTask
            if(task.data.status == "todo"){
                newTask = new Task(task.data.content, 'complete')
            }else{
                newTask = new Task(task.data.content, 'todo')
            }
            taskService.updateTask(id, newTask)
                .then(()=>{
                    isLoading = false
                    checkLoading("Cập nhật task thành công!", 'success')
                    getTasks()
                })
                .catch((err) => {
                    console.log(err)
                    isLoading = false
                    checkLoading("Lỗi: " + err.response.status, 'fail')
                })
        })
        .catch((err) => {
            console.log(err)
            isLoading = false
            checkLoading("Lỗi: " + err.response.status, "fail")
        })
}
getEle('addItem').addEventListener('click', postTask)
getTasks()
