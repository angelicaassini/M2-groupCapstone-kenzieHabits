import Requisicoes from "../controller/requisicoes.controller.js"

export default class EditProfile {
    static editProfileHabit= () => { 

        const body = document.querySelector("body")
        const header = document.querySelector("header")
        const blurBackgroundModal = document.createElement("div")
        const modalContainer  = document.createElement("div")
        const divModal            = document.createElement("div")
        const tagH1               = document.createElement("h1")
        const closeModal          = document.createElement("span")
        const tagI                = document.createElement("i")
        const formModal           = document.createElement("form")
        const tagName              = document.createElement("p")
        const tagInput              = document.createElement("input")
        const urlImage              = document.createElement("p")    
        const tagInput2 = document.createElement("input")
        const button = document.createElement("button")
       
        
        modalContainer.classList.add("modal__container--edit")
        divModal.classList.add("header__div--edit")
        closeModal.classList.add("header__div-span")
        tagI.classList.add("uil", "uil-times")
        formModal.classList.add("input__modal-container--edit")
        tagName.classList.add("input__p--edit")
        tagInput.classList.add("input__name--edit")
        urlImage.classList.add("input__p--edit")
        tagInput2.classList.add("input__url--edit")
        blurBackgroundModal.classList.add("blur__modal--edit")
        blurBackgroundModal.classList.add("disabled")

        button.classList.add("button__edit")
        
        tagH1.innerText = "Editar perfil"
        
        tagName.innerText  = "Nome"
        tagInput.placeholder  = "Digite seu nome"
        tagInput.type = "text"

        tagInput.value = "Grupo2 Caique"
        urlImage.innerText = "URL da imagem do perfil"
        tagInput2.placeholder =  "Digite uma URL" 
        tagInput2.type = "text"
        tagInput2.value = ""      
        button.innerText = "Salvar alterações"
        button.type = "submit"
        tagInput.required = true
        tagInput2.required = true

        closeModal.addEventListener("click",() => {

            
            document.querySelector(".blur__modal--edit").style.opacity = 1
            setTimeout(() => {
                document.querySelector(".blur__modal--edit").animate([
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
                    document.querySelector(".blur__modal--edit").classList.add("disabled")
                }, 150);
            },12);
 
            tagInput2.value = ""
            button.classList.remove("active__Button")
        })

        formModal.addEventListener('submit', (event) =>{    
            if(event.target.type !== "submit") {
                EditProfile.data()
                tagInput2.value = ""
                button.classList.remove("active__Button")
            }
            event.preventDefault()
        })


        formModal.addEventListener("change",() => {
            button.classList.add("active__Button")
        })
    

        closeModal.appendChild(tagI)
        divModal.append(tagH1, closeModal)
        
        formModal.append(tagName, tagInput, urlImage, tagInput2, button)
        
        modalContainer.append(divModal, formModal)
        blurBackgroundModal.appendChild(modalContainer)
        body.insertBefore(blurBackgroundModal, header)
    }
    
    static async data() {
        const data = {
            email: JSON.parse(localStorage.getItem("@email_user")),
            password:  JSON.parse(localStorage.getItem("@senha_user"))
        }
        const url = document.querySelector(".input__url--edit")
        
        const newUrl = await Requisicoes.updateProfile({
            usr_image: url.value
        })
        Requisicoes.getUser(data)
    }
}