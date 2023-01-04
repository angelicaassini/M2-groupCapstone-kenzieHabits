import Requisicoes from "../controller/requisicoes.controller.js"
import UpdateHabitModal from "./updateHabit.modal.js"

import CreateHomepage from "./createHomepage.models.js"

export default class Delete {
    static deleteHabit= () => { 

        const div = document.querySelector(".modal__edit")
        const blurBackgroundModal = document.createElement("div")
        const formModalContainer  = document.createElement("div")
        const divModal            = document.createElement("div")
        const tagH1               = document.createElement("h1")
        const closeModal          = document.createElement("span")
        const tagI                = document.createElement("i")
        const formModal           = document.createElement("form")
        const pName1              = document.createElement("p")
        const pName2              = document.createElement("p")
        const divButtons          = document.createElement("div")
        
        const buttonCancel = document.createElement("button")
        const buttonDelete = document.createElement("button")
        
        formModalContainer.classList.add("modal__container-del")
        divModal.classList.add("header__div-del")
        closeModal.classList.add("header__div-span-del")
        tagI.classList.add("uil", "uil-times")
        formModal.classList.add("input__modal-container-del")
        pName1.classList.add("name1-del")
        pName2.classList.add("name2-del")
        divButtons.classList.add("buttons-del")
        buttonCancel.classList.add("cancel-del")
        buttonDelete.classList.add("delete-del")
        blurBackgroundModal.classList.add("blur__background-modal-del")
        blurBackgroundModal.classList.add("disabled")
        
        tagH1.innerText = "Excluir hábito"
        
        pName1.innerText  = "Certeza que deseja excluir este hábito?"
        pName2.innerText  = "Após executar essa ação não será possível desfazer"
                     
        buttonCancel.innerText = "Cancelar"

        buttonDelete.innerText = "sim, excluir este hábito"

        closeModal.addEventListener("click",() => {
            setTimeout(() => {
                document.querySelector(".blur__background-modal-del").animate([
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
                    document.querySelector(".blur__background-modal-del").classList.add("disabled")
                }, 150);
            },12);
        })

        buttonCancel.addEventListener("click",(e) => {
            e.preventDefault()
            document.querySelector(".blur__background-modal-del").style.opacity = 1
            setTimeout(() => {
                document.querySelector(".blur__background-modal-del").animate([
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
                    document.querySelector(".blur__background-modal-del").classList.add("disabled")
                }, 150);
            },12);            
        })

        buttonDelete.addEventListener("click", async (event) => {
            if(event.target.type == "button"){
                event.preventDefault()
                const habitId =  event.target.id
                await Requisicoes.deleteHabit(habitId)
                await Requisicoes.readAll()
            }
        })

        closeModal.appendChild(tagI)
        divModal.append(tagH1, closeModal)
        
        divButtons.append(buttonCancel, buttonDelete)
        formModal.append(pName1, pName2,  divButtons)
        
        formModalContainer.append(divModal, formModal)
        blurBackgroundModal.appendChild(formModalContainer)
        div.append(blurBackgroundModal)

        Delete.openDel()
    }

    static openDel() {
        const blurBackgroundModal = document.querySelector(".blur__background-modal-del")
        blurBackgroundModal.classList = "blur__background-modal-del"
        Delete.deletePostHabit()
    }

    static deletePostHabit(){
        document.querySelector(".delete-del").addEventListener("click", async (e) => {
            e.preventDefault()
            await Requisicoes.deleteHabit(UpdateHabitModal.idPub)
            document.querySelector(".blur__background-modal-del").classList.add("disabled")
            document.querySelector(".task__itens").remove()
            document.querySelector(".more__itens").remove()
            CreateHomepage.createListTasks()
        })
    }

}