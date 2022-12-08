const keyLocalTaskList = 'k_t_l'
const taskLists = localStorage.getItem(keyLocalTaskList)
  ? JSON.parse(localStorage.getItem(keyLocalTaskList))
  : [];
const eleInputTaskName = document.querySelector('.input-TaskName');
const eleInputTaskDescription = document.querySelector('.input-TaskDescription');
const eleSelectPrionty = document.querySelector('.select-Prionty');
const eleTable = document.querySelector('.js-result');
const elebtnSubmit = document.querySelector('.btn-Submit');
const elebtnReset = document.querySelector('.btn-Reset');
const eleLeftForm = document.querySelector('.menu-content');

const handleAddTask = ()=>{
    const task = {
        id: new Date().getTime(),
        taskName: eleInputTaskName.value,
        taskDescription: eleInputTaskDescription.value,
        prionty: eleSelectPrionty.value,
        createAt: new Date(),
        inDone: false,
    }
  taskLists.push(task);
  localStorage.setItem(keyLocalTaskList, JSON.stringify(taskLists))
  handleReRenderTaskList()
  handleResetForm()
    }

const handleResetForm = (event) => {
      event.preventDefault()
      eleLeftForm.reset();
    }
      
const handleMakeDoneTask = (dataIndex) => {
      const existtedIndex = taskLists.findIndex(taskItem => taskItem.id === dataIndex)
      const currentTask = taskLists[existtedIndex]
      taskLists[existtedIndex] = {
        ...currentTask,
        isDone: true,
      }
      localStorage.setItem(keyLocalTaskList,JSON.stringify(taskLists))
      handleReRenderTaskList()
      }
      
const handleDeleteTask = (dataIndex) => {
  const existtedIndex = taskLists.findIndex(taskItem => taskItem.id === dataIndex)
      taskLists.splice(existtedIndex,1)
      localStorage.setItem(keyLocalTaskList,JSON.stringify(taskLists))
      handleReRenderTaskList()
      }

     
const handleReRenderTaskList = ()=>{
        let html=''
        let today = new Date
        let newDay = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear()
        taskLists.forEach(task => {
            html += `
                <tr class=${task.isDone ? 'done-task' : ''}>
                    <td>${task.taskName}</td>
                    <td>${newDay}</td>
                    <td>${task.taskDescription}</td>
                    <td>${task.prionty}</td>
                    <td>
                        <button data-index-Done=${task.id}>Done</button>
                        <button class="Delete" data-index=${task.id}>Delete</button>
                    </td>
                </tr>`
        })
        eleTable.innerHTML= html;
        // Xoa
        document.querySelectorAll("[data-index]").forEach((elebtn)=>{
          elebtn.addEventListener('click',()=>{
            const dataIndex = Number((elebtn.getAttribute("data-index")))
            handleDeleteTask(dataIndex)
            
        })

      })
      // Done
      document.querySelectorAll("[data-index-Done]").forEach((elebtnDone)=>{
        elebtnDone.addEventListener('click',()=>{
          const dataIndex = Number((elebtnDone.getAttribute("data-index-Done")))
          handleMakeDoneTask(dataIndex)
      })

      })
    }
function main(){
  handleReRenderTaskList()

    elebtnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    handleAddTask()
  })

  elebtnReset.addEventListener('click', handleResetForm)

}

main()