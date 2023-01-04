import Requisicoes from "../controller/requisicoes.controller.js"
import Delete from "../models/deletehabit.models.js";
import CreateHomepage from "./createHomepage.models.js";
import Notifications from "./notificationsClass.js"

/*DOM CONSTRUCTOR FOR MODAL*/
export default class UpdateHabitModal {
    /* FOR BUILD MODAL */
    static updateHabitConstructor = (event) => {
        document.querySelector(".modal__edit").innerHTML = ''
        const modalBackgroundBlur = document.createElement("div")
        const updateHabitModal = document.createElement("div")
        const modalTitle = document.createElement("div")
        const editHabit = document.createElement("form")

        modalBackgroundBlur.classList.add("updateHabit_modal-bg-blur")
        modalTitle.classList.add("modal__title")
        updateHabitModal.classList.add("updateHabit__modal")
        editHabit.classList.add("edit__habit")

        /* ITENS INSIDE MODALTITLE CONST */
        const modalTitleName = document.createElement("p")
        const modalIconSpan = document.createElement("span")
        const modalIconClose = document.createElement("i")

        modalTitleName.innerText = "Editar hábito"
        modalIconClose.setAttribute("class", "uil uil-times")
        modalIconSpan.appendChild(modalIconClose)
        modalTitle.append(modalTitleName, modalIconSpan)

        /* ITENS INSIDE EDIT HABIT */
        const taskNameSection = document.createElement("section")
        const taskDescriptionSection = document.createElement("section")
        const taskCategorySection = document.createElement("section")
        const taskStatusSection = document.createElement("section")
        const taskButtonsSection = document.createElement("section")

        taskButtonsSection.setAttribute("class", "updateHabit_modal-b")

        taskStatusSection.classList.add("modal__status-habit")
        /* ITENS INSIDE TASKNAMESECTION CONST */
        const habitName = document.createElement("p")
        const habitNameInput = document.createElement("input")

        habitName.innerText = "Título"
        habitNameInput.id = "updateHabit_title"

        taskNameSection.append(habitName, habitNameInput)

        /* ITENS INSIDE TASKDESCRIPTIONSECTION CONST */
        const habitDescriptonTitle = document.createElement("p")
        const habitDescriptonInput = document.createElement("textarea")

        habitDescriptonTitle.innerText = "Descrição"
        habitDescriptonInput.id = "updateHabit_description"

        taskDescriptionSection.append(habitDescriptonTitle, habitDescriptonInput)

        /* ITENS INSIDE TASKCATEGORYSECTION CONST */
        const habitCategoryTitle = document.createElement("p")
        const habitSelectCategory = document.createElement("select")
        const optionDisabled = document.createElement("option")
        const optionHome = document.createElement("option")
        const optionStudy = document.createElement("option")
        const optionLeisure = document.createElement("option")
        const optionWork = document.createElement("option")
        const optionHealth = document.createElement("option")

        habitSelectCategory.id = "updateHabit_category"
        optionHome.value = "casa"
        optionStudy.value = "estudos"
        optionLeisure.value = "lazer"
        optionWork.value = "trabalho"
        optionHealth.value = "saude"

        optionDisabled.setAttribute("disabled", "")


        optionDisabled.innerText = "Escolha sua Categoria"
        optionHome.innerText = `  Casa`
        optionStudy.innerText = " Estudo"
        optionLeisure.innerText = " Lazer"
        optionWork.innerText = " Trabalho"
        optionHealth.innerText = " Saúde"

        habitSelectCategory.append(optionDisabled, optionHome, optionStudy, optionLeisure, optionWork, optionHealth)
        taskCategorySection.append(habitCategoryTitle, habitSelectCategory)

        /* ITENS INSIDE TASKSTATUSSECTION CONST */
        const statusTitle = document.createElement("p")
        const statusCheck = document.createElement("input")

        statusTitle.classList.add("status__modal-name")
        statusCheck.id = "check__status"
        statusCheck.type = "checkbox"

        statusTitle.innerText = "Status"

        taskStatusSection.append(statusTitle, statusCheck)

        /* ITENS INSIDE TASKBUTTONSSECTION CONST */
        const eraseButton = document.createElement("button")
        const saveButton = document.createElement("button")
        eraseButton.id = "erase_habit"
        saveButton.classList.add("save_changes")
        saveButton.addEventListener("click", UpdateHabitModal.catchData)
        eraseButton.innerText = "Excluir"
        saveButton.innerText = "Salvar Alterações"

        taskButtonsSection.append(eraseButton, saveButton)



        /* APENDS INSIDE MODALBLUR */
        editHabit.append(taskNameSection, taskDescriptionSection,
            taskCategorySection, taskStatusSection, taskButtonsSection)

        updateHabitModal.append(modalTitle, editHabit)
        modalBackgroundBlur.appendChild(updateHabitModal)

        const header = document.querySelector("header")
        document.querySelector(".modal__edit").appendChild(modalBackgroundBlur)
        UpdateHabitModal.openDelete()

        UpdateHabitModal.openModal(event)




    }
    /* FOR CATCH THE TEXT INFORMATION OF TASK THAT WAS CLICKED */

    static idPub

    static editModalHabit = (e) => {
        const identifier = e.target.parentNode
        const identifierParent = identifier.parentNode
        UpdateHabitModal.idPub = identifierParent.id
        document.querySelector("#updateHabit_title").value = identifierParent.querySelector(".task__title").innerText
        document.querySelector("#updateHabit_description").value = identifierParent.querySelector(".task_description").innerText
        const dropDown_category = document.querySelector(".edit__habit section select")
        const text = identifierParent.querySelector(".task_category")

        const textValue = text.innerText.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
        for (let i = 0; i < dropDown_category.options.length; i++) {
            if (dropDown_category.options[i].value === textValue) {
                dropDown_category.selectedIndex = i;
            }
        }
        document.querySelector("#check__status").checked = identifierParent.querySelector("#check").checked
        UpdateHabitModal.checkBoxClick(identifierParent)
        const saveUpdatesChange = document.querySelector(".updateHabit__modal form")
        saveUpdatesChange.addEventListener("change", () => {
            const button = document.querySelector(".save_changes").classList.add("active__Button")
        })

    }

    /* FOR LISTENER CLOSE MODAL EVENT */
    static redirectModal = () => {
        document.querySelector(".modal__title span").addEventListener("click", UpdateHabitModal.closeModal)
    }

    /*FOR LISTENTER OPEN MODAL EVENT*/



    /*FOR CLOSE MODAL */
    static closeModal = () => {
        document.querySelector(".updateHabit_modal-bg-blur").style.opacity = 1
        setTimeout(() => {
            document.querySelector(".updateHabit_modal-bg-blur").animate([
                {opacity : "0.9"},
                {opacity: "0.7"},
                {opacity: "0.5"},
                {opacity: "0.3"},
                {opacity: "0.1"},
            ],{
                duration:150,
            },
            )
            setTimeout(() => {
                document.querySelector(".updateHabit_modal-bg-blur").style.display = "none"
            }, 150);
        },12);

    }

    /*FOR OPEN MODAL */
    static openModal = (e) => {
        document.querySelector(".updateHabit_modal-bg-blur").style.display = "flex"

        document.querySelector(".updateHabit_modal-bg-blur").style.opacity = 0
        setTimeout(() => {
            document.querySelector(".updateHabit_modal-bg-blur").animate([
                {opacity : "0.1"},
                {opacity: "0.3"},
                {opacity: "0.5"},
                {opacity: "0.7"},
                {opacity: "0.9"},
            ],{
                duration: 500,
            })
          setTimeout(() => {
            document.querySelector(".updateHabit_modal-bg-blur").style.opacity = 1
          }, 500);  
        },12);

        UpdateHabitModal.editModalHabit(e)
        UpdateHabitModal.redirectModal()
    }
    /* FOR CATCH DATA AND SEND TO API */
    static async catchData(e) {
        e.preventDefault()
        const dados = {
            habit_title: document.querySelector("#updateHabit_title").value,
            habit_description: document.querySelector("#updateHabit_description").value,
            habit_category: document.querySelector("#updateHabit_category").value
        }
        await Requisicoes.updateHabit(dados, UpdateHabitModal.idPub)
        document.querySelector(".task__itens").remove()
        document.querySelector(".more__itens").remove()

        CreateHomepage.createListTasks()

        /* ADD IF/ELSE HERE */
        UpdateHabitModal.closeModal()

        Notifications.showSucessToast("Alterações feitas com sucesso")
    }

    static openDelete() {
        document.querySelector("#erase_habit").addEventListener("click", (e) => {
            e.preventDefault()

            setTimeout(() => {
                document.querySelector(".blur__background-modal-del").animate([
                    {opacity : "0.1"},
                    {opacity: "0.3"},
                    {opacity: "0.5"},
                    {opacity: "0.7"},
                    {opacity: "0.9"},
                ],{
                    duration: 500,
                })
                setTimeout(() => {
                document.querySelector(".blur__background-modal-del").style.opacity = 1
                }, 500);  
            },12);
            UpdateHabitModal.closeModal()
            Delete.deleteHabit()
        })


    }


    /* FOR CHECK IF THE CHECKBOX OF THE TASK EDIT WAS CLICKED */
    static checkBoxClick = (target) => {
        document.querySelector("#check__status").addEventListener("click", () => {
            target.querySelector("#check").checked = document.querySelector("#check__status").checked

            document.querySelector(".save_changes").addEventListener("click", (e) => {
                if (document.querySelector("#check__status").checked) {
                    Requisicoes.completeHabit(target.id)
                }
            })
            if (target.querySelector("#check").checked) {
                Notifications.doneTask(target)

            }
            else {
                Notifications.undoneTask(target)
            }
        })

    }

    static async checkCompleteRequest() {
        const checked_item = document.querySelectorAll("#check")
        for (let i = 0; i < checked_item.length; i++) {
            if (checked_item[i].checked) {
                Notifications.doneTask(checked_item[i].parentElement)
            }
            else {

                Notifications.undoneTask(checked_item[i].parentElement)
            }
        }
    }

    static async checkBoxComplete() {
        const allCheckBox = document.querySelectorAll("#check")
        for (let i = 0; i < allCheckBox.length; i++) {
            allCheckBox[i].addEventListener("click", () => {
                if (allCheckBox[i].checked) {
                    Notifications.doneTask(allCheckBox[i].parentElement)
                    Requisicoes.completeHabit(allCheckBox[i].parentElement.id)
                } else {
                    Notifications.undoneTask(allCheckBox[i].parentElement)
                }
            })

        }

    }
}
