import Requisicoes from "../controller/requisicoes.controller.js"

export default class CreateHabit{
    static create = () => {
        const body = document.querySelector("body")
        const divBlur = document.createElement("div")

        const divContainer = document.createElement("div")
        
        const divHeader = document.createElement("div")
        const h1 = document.createElement("h1")
        const span = document.createElement("span")
        const i = document.createElement("i")

        const form = document.createElement("form")
        const pTitle = document.createElement("p")
        const input = document.createElement("input")
        const pDescription = document.createElement("p")
        const textArea = document.createElement("textarea")
        const pCategory = document.createElement("p")
        
        const select = document.createElement("select")
        const optionDisabled = document.createElement("option")
        const optionHome = document.createElement("option")
        const optionStudy = document.createElement("option")
        const optionLeisure = document.createElement("option")
        const optionWork = document.createElement("option")
        const optionHealth = document.createElement("option")

        const button = document.createElement("button")

        divBlur.classList.add("blur__background-modal")
        divBlur.classList.add("disabled")
        divContainer.classList = "modal__container"
        divHeader.classList = "header__div"
        i.classList = "uil uil-times"
        form.classList = "input__modal-container"
        pTitle.classList = "input__name"
        pDescription.classList = "input__name"
        pCategory.classList = "input__name"
        optionDisabled.classList = "disable"

        button.classList.add("button__edit")

        h1.innerText = "Criar habito"
        pTitle.innerText = "Título"
        pDescription.innerText = "Descrição"
        pCategory.innerText = "Categoria"
        optionDisabled.innerText = "Selecionar categoria"
        optionHome.innerText = " Casa"
        optionStudy.innerText = " Estudo"
        optionLeisure.innerText = " Lazer"
        optionWork.innerText = " Trabalho"
        optionHealth.innerText = " Saúde"
        button.innerText = "Inserir"
        
        input.type = "text"
        input.placeholder = "Digitar título"
        input.setAttribute("required", "")

        textArea.placeholder = "Digitar descrição"
        textArea.setAttribute("required", "")

        optionHome.value = "casa"
        optionStudy.value = "estudos"
        optionLeisure.value = "lazer"
        optionWork.value = "trabalho"
        optionHealth.value = "saude"

        button.type = "submit"

        span.append(i)
        select.append(optionDisabled, optionHome, optionStudy, optionLeisure, optionWork, optionHealth)
        divHeader.append(h1, span)
        form.append(pTitle, input, pDescription, textArea, pCategory, select, button)
        divContainer.append(divHeader, form)
        divBlur.append(divContainer)
        const header = document.querySelector("header")
        body.insertBefore(divBlur, header)
        form.addEventListener("change",() => {
            button.classList.add("active__Button")
        })

        CreateHabit.closeModal()
        CreateHabit.buttonCreate()
        CreateHabit.valid()
        CreateHabit.validExit()
        
    }

    static buttonCreate =() => {
        const buttonCreate = document.querySelector(".active") 
        buttonCreate.addEventListener("click", () => {
        document.querySelector(".blur__background-modal").classList.remove("disabled")
        document.querySelector(".blur__background-modal").style.opacity = 0
        setTimeout(() => {
            document.querySelector(".blur__background-modal").animate([
                {opacity : "0.1"},
                {opacity: "0.3"},
                {opacity: "0.5"},
                {opacity: "0.7"},
                {opacity: "0.9"},
            ],{
                duration: 500,
            })
            setTimeout(() => {
            document.querySelector(".blur__background-modal").style.opacity = 1
            }, 500);  
        },12);
        
        const input = document.querySelector(".input__modal-container input")
        const textArea = document.querySelector(".input__modal-container textarea")
        const select = document.querySelector(".input__modal-container select") 

        input.value = ""
        textArea.value = ""
        select.value = "Selecionar categoria"
        })
    }

    static closeModalAll = () => {
        document.querySelector(".blur__background-modal").classList.add("disabled")
    }

    static closeModal = () => {

        
        const closeModal = document.querySelector(".header__div span")
        closeModal.addEventListener("click",() => {
            document.querySelector(".blur__background-modal").style.opacity = 1
            setTimeout(() => {
                document.querySelector(".blur__background-modal").animate([
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
                    document.querySelector(".blur__background-modal").classList.add("disabled")
                }, 150);
            },12);

            document.querySelector(".button__edit").classList.remove("active__Button")
        })
    }

    static valid = () => {
        const select = document.querySelector("select")
        select.addEventListener("change", () => {
            const disable = document.querySelector(".disable")
            disable.disabled = true
        })
    }

    static validExit = () => {
        const form = document.querySelector(".input__modal-container")
        const input = document.querySelector(".input__modal-container input")
        const textArea = document.querySelector(".input__modal-container textarea")
        const select = document.querySelector(".input__modal-container select")  

        form.addEventListener('submit', (event) =>{
            if(select.value === "Selecionar categoria") {
            CreateHabit.error("Selecione uma categoria")
            }else{
            CreateHabit.sucess("Criado com Sucesso")
            CreateHabit.closeModalAll()
            CreateHabit.data()
            }
        event.preventDefault()
        })
    }

    static sucess = (message) => {
        document.querySelector("#sucess").style.display = "flex"
        document.querySelector("#message__sucess").innerText = message
        setTimeout(() => {
            document.querySelector("#sucess").animate([
                {opacity : "0.9"},
                {opacity: "0.6"},
                {opacity: "0.3"},
                {opacity: "0.1"},
                {opacity: "0.0"},
            ],{
                duration: 4000,
                iteration: 1
            })
        }, 2000);
        setTimeout(() => {
            document.querySelector("#sucess").style.display = "none"
        }, 6000);
        document.querySelector(".button__edit").classList.remove("active__Button")
    }

    static error = (message) => {
        document.querySelector("#error").style.display = "flex"
        document.querySelector("#message__wrong").innerText = message
        setTimeout(() => {
            document.querySelector("#error").animate([
                {opacity : "0.9"},
                {opacity: "0.6"},
                {opacity: "0.3"},
                {opacity: "0.1"},
                {opacity: "0.0"},
            ],{
                duration: 4000,
                iteration: 1
            })
        }, 2000);
        setTimeout(() => {
            document.querySelector("#error").style.display = "none"
        }, 6000);
    }

    static async data(){
        const input = document.querySelector(".input__modal-container input")
        const textArea = document.querySelector(".input__modal-container textarea")
        const select = document.querySelector(".input__modal-container select")  

        const dataBase = {
            habit_title: input.value,
            habit_description: textArea.value,
            habit_category: select.value
        }
        document.querySelector(".task__itens").remove()
        document.querySelector(".more__itens").remove()
        await Requisicoes.createHabit(dataBase)
    }
}