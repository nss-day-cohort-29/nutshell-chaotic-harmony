//food.js
import TasksFetch from "./TasksFetch"
import TasksEditForm from "./TasksEditForm"
import TasksList from "./TasksList"

const TasksCreateObject = {
  
   taskBuilder(taskItem) {

    let taskArticle = document.createElement("article")
    taskArticle.setAttribute("id", `task--${taskItem.id}`)
    taskArticle.setAttribute("class", "listItemContainer")

    let editTaskNameBtn = document.createElement("button");
    editTaskNameBtn.textContent = taskItem.task;
    console.log(editTaskNameBtn.textContent);

    editTaskNameBtn.addEventListener("click", () => {
      let articleId = event.target.parentNode.id;
      let taskId = articleId.split("--")[1]
      TasksFetch.getTask(taskId)
      .then(response => {
        console.log(response)
        TasksEditForm.createAndAppendForm(articleId, response)
      })
    })

    let taskDueDate = document.createElement("label");
    taskDueDate.textContent = taskItem.dueDate.toString() + "  ";
    taskDueDate.setAttribute("class", "listItem")
    console.log(taskDueDate);

    let checkedOff = document.getElementById("gotItDone")
    let taskComplete = document.createElement("input");
    taskComplete.setAttribute("type", "checkbox");
    taskComplete.setAttribute("name", "complete");
    taskComplete.setAttribute("class", "listItem");
    taskComplete.setAttribute("id", "gotItDone");
    taskComplete.value = taskItem.complete;
    
    taskComplete.addEventListener("click", () => {
      let articleId = event.target.parentNode.id;
      let taskId = articleId.split("--")[1]
      
      TasksFetch.getTask(taskId)
      .then(response => {
        console.log(response)
        if (checkedOff != "unchecked") {
          alert("You did it! - The taskId = " + taskId)
        }
        let taskToEdit = {
          complete: "checked",
      }
    
    TasksFetch.putExistingTask(taskId, taskToEdit)
      .then(response => {
      TasksList.createDomList()
      })
    })
})  
      

  taskArticle.appendChild(taskDueDate);
  taskArticle.appendChild(taskComplete);
  taskArticle.appendChild(editTaskNameBtn);

  return taskArticle;
   }   
  }

  export default TasksCreateObject
