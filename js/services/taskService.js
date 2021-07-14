var url = "https://60e24f285a5596001730f345.mockapi.io"
function TaskService() {
  this.getListTask = function () {
    return axios({
      url: url + "/tasks",
      method: 'GET',
    });
  };

  this.addTask = async function (task) {
    return axios({
      url: url + "/tasks",
      method: 'POST',
      data: task,
    });
  };

  this.deleteTask = function (id) {
    return axios({
      url: url + `/tasks/${id}`,
      method: 'DELETE',
    })
  }

  this.getTaskById = function (id) {
    return axios({
      url: url + `/tasks/${id}`,
      method: 'GET',
    })
  }

  this.updateTask = function (id, task) {
    return axios({
      url: url + `/tasks/${id}`,
      method: 'PUT',
      data: task
    })
  }
}
