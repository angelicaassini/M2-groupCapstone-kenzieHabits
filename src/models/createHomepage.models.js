import Requisicoes from "../controller/requisicoes.controller.js"
import UpdateHabitModal from "./updateHabit.modal.js"
export default class CreateHomepage {


    static createContainerTasks() {

        const main = document.querySelector("main")

        const divMain = document.createElement("div")
        const p = document.createElement("p")

        const divButtons = document.createElement("div")
        const taskAll = document.createElement("button")
        const taskCompleted = document.createElement("button")
        const taskCreate = document.createElement("button")

        const divTable = document.createElement("div")

        const divTaskTitle = document.createElement("div")
        const divTitleLeft = document.createElement("div")
        const taskStatus = document.createElement("p")
        const taskTitleName = document.createElement("p")
        const taskDescription = document.createElement("p")
        const taskCategory = document.createElement("p")
        const taskEdit = document.createElement("p")

        const divListTasks = document.createElement("div")

        divMain.classList.add("main__tasks-title")
        p.innerText = "Tarefas"

        divButtons.classList.add("tasks_filter-buttons")
        taskAll.classList.add("task")
        taskAll.innerText = "Todos"
        taskCompleted.classList.add("task")
        taskCompleted.innerText = "Concluídos"
        taskCreate.classList.add("task")
        taskCreate.classList.add("active")
        taskCreate.innerText = "Criar"

        divTable.classList.add("table__tasks")

        divTaskTitle.classList.add("table_task_title")
        divTitleLeft.classList.add("task__title-left")
        taskStatus.classList.add("task__status-left")
        taskStatus.innerText = "Status"
        taskTitleName.classList.add("task__titleName-left")
        taskTitleName.innerText = "Título"
        taskDescription.classList.add("task__description-left")
        taskDescription.innerText = "Descrição"
        taskCategory.classList.add("task__category")
        taskCategory.innerText = "Categoria"
        taskEdit.classList.add("task__edit")
        taskEdit.innerText = "Editar"

        divListTasks.classList.add("task__itens")

        divButtons.append(taskAll, taskCompleted, taskCreate)
        divMain.append(p, divButtons)

        divTitleLeft.append(taskStatus, taskTitleName, taskDescription, taskCategory, taskEdit)
        divTaskTitle.appendChild(divTitleLeft)
        divTable.appendChild(divTaskTitle)

        main.append(divMain, divTable)

        return main
    }

    static async createListTasks() {
        const request = await Requisicoes.readAll()
        const main = document.querySelector("main")
        const divTable = document.querySelector(".table__tasks")
        const divListTasks = document.createElement("div")
        divListTasks.classList.add("task__itens")
        const button = document.createElement("button")
        button.classList.add("more__itens")
        button.innerText = "Carregar mais"
        

        request.forEach((list) => {
            const divTaskItem = document.createElement("div")
            const input = document.createElement("input")
            const pTaskTitle = document.createElement("p")
            const pTaskDescription = document.createElement("p")
            const spanCategory = document.createElement("span")
            const spanEdit = document.createElement("span")

            divTaskItem.classList.add("task__item")
            divTaskItem.id = list.habit_id
            input.type = "checkbox"
            input.name = ""
            input.id = "check"
            input.checked = list.habit_status
            pTaskTitle.classList.add("task__title")
            pTaskTitle.innerText = list.habit_title
            pTaskDescription.classList.add("task_description")
            pTaskDescription.innerText = list.habit_description
            spanCategory.classList.add("task_category")
            spanCategory.innerText = list.habit_category
            spanEdit.classList.add("task_edit--elipsis")
            spanEdit.innerHTML = "<i class='uil uil-ellipsis-h'></i>"
           
            divTaskItem.append(input, pTaskTitle, pTaskDescription, spanCategory, spanEdit)
            divListTasks.appendChild(divTaskItem)
            
        })

        divTable.appendChild(divListTasks)
        main.append(divTable, button)
        CreateHomepage.redirectOpenModal()
        UpdateHabitModal.checkCompleteRequest()
        UpdateHabitModal.checkBoxComplete()
        CreateHomepage.filterTask()
        return main
    }
    static redirectOpenModal () {
        const editTask =  document.querySelectorAll(".task_edit--elipsis")
        editTask.forEach((item) => {
            item.addEventListener("click",(e)=> {
                UpdateHabitModal.updateHabitConstructor(e)
            })
        })
    }

    static profileHeader() {
        let userName = JSON.parse(localStorage.getItem("@username"))
        let userImage = JSON.parse(localStorage.getItem("@userimage"))
        document.querySelector(".img__perfil").src = userImage
        document.querySelector(".user_img").src = userImage
        document.querySelector(".user__name").innerText = userName
    }
    static async filterTask(){
        document.querySelector(".tasks_filter-buttons").addEventListener("click", async(e)=>{
            if(e.target.innerText == "Todos")
                {
                document.querySelector(".task__itens").remove()
                document.querySelector(".more__itens").remove()
               await CreateHomepage.createListTasks()
            }
            else if(e.target.innerText == "Concluídos"){
                const checkboxId = document.querySelectorAll("#check")
                checkboxId.forEach((item)=>{
                    if(!item.checked){
                        item.parentNode.remove()
                    }
                })
                
            }
        })
    }
}