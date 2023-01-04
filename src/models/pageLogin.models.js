import Requisicoes from "../controller/requisicoes.controller.js"

export default class PageLogin {

    static createContainerLogin() {
        const body = document.querySelector("body")
        const divContainer = document.createElement("div")

        const divContainerLeft = document.createElement("div")
        const h1 = document.createElement("h1")
        const h2 = document.createElement("h2")
        const p = document.createElement("p")

        const divContainerRight = document.createElement("div")
        const form = document.createElement("form")
        const h3 = document.createElement("h3")
        const divFormEmail = document.createElement("div")
        const pLogin = document.createElement("p")
        const inputEmail = document.createElement("input")

        const divFormPassword = document.createElement("div")
        const pPassword = document.createElement("p")
        const inputPassword = document.createElement("input")
        const button = document.createElement("button")

        divContainer.classList.add("container")
        divContainerLeft.classList.add("container__left")
        h1.classList.add("title")
        divContainerRight.classList.add("container__right")
        form.classList.add("login__form")
        divFormEmail.classList.add("form__user--input")
        divFormEmail.classList.add("user__login")
        divFormPassword.classList.add("form__user--input")
        divFormPassword.classList.add("user__password")

        form.action = "#"
        h1.innerText = "KenzieHabit"
        h2.innerText = "If you are going to use a passage of Lorem Ipsum"
        p.innerText = "you need to be sure there isn't anything"
        h3.innerText = "Login"
        pLogin.innerText = "Usuário"
        pPassword.innerText = "Senha"
        button.innerText = "Entrar"

        button.type = "submit"
        button.id = "btn__login"

        inputEmail.id = "email"
        inputEmail.required = true
        inputEmail.type = "email"
        inputEmail.placeholder = "Digitar meu email"
        inputEmail.name = "email"

        inputPassword.id = "password"
        inputPassword.required = true
        inputPassword.type = "password"
        inputPassword.placeholder = "Digitar minha senha"
        inputPassword.name = "password"

        divContainerLeft.append(h1, h2, p)

        divFormPassword.append(pPassword, inputPassword)
        divFormEmail.append(pLogin, inputEmail)
        form.append(h3, divFormEmail, divFormPassword, button)
        divContainerRight.appendChild(form)

        divContainer.append(divContainerLeft, divContainerRight)

        body.appendChild(divContainer)

        return body
    }

    static valueInputLogin() {
        const inputEmail = document.getElementById("email")
        const inputPassword = document.getElementById("password")
        const btnLogin = document.getElementById("btn__login")

        btnLogin.addEventListener("click", async (event) => {
            event.preventDefault()
            await Requisicoes.login({
                email: inputEmail.value,
                password: inputPassword.value
            })
        })
    }
}


