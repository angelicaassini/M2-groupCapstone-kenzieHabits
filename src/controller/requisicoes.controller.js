import CreateHabit from "../models/createhabit.models.js"
import CreateHomepage from "../models/createHomepage.models.js"
import Notifications from "../models/notificationsClass.js"

export default class Requisicoes {

    static async login(loginData) {
        const baseUrl = "https://habits-kenzie.herokuapp.com/api/userLogin"

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        }

        return await fetch(baseUrl, options)
        .then((res) => 
            
        res.json()
            
        )
        .then((res) => {
            localStorage.setItem("@userimage", JSON.stringify(res.response.usr_image))
            localStorage.setItem("@username", JSON.stringify(res.response.usr_name))
            if(document.querySelector(".form__user--input") != null){
                localStorage.setItem("@senha_user", JSON.stringify(document.querySelector("#password").value))
                localStorage.setItem("@email_user", JSON.stringify(document.querySelector("#email").value))
            }
            
            
           
            localStorage.setItem("token", JSON.stringify(res.token))
            
            if (res.token !== undefined) {
                window.location.href = "./src/pages/homepage.pages.html"
            }
            else{
                return Notifications.showErrorToast("Usuário ou senha inválidos")
            }
           

        })
            .catch(err =>{
                
               return Notifications.showErrorToast(err)
            })
    }

    static async updateProfile(dataUpdate) {
        const token = JSON.parse(localStorage.getItem("token"))
        const baseUrl = "https://habits-kenzie.herokuapp.com/api/user/profile"
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataUpdate)
        }

        const response = await fetch(baseUrl, options)
            .then((res) => {
                if (res.ok === false) {
                    CreateHabit.error("A URL não é válida!")
                    return new Error()
                } else {
                    CreateHabit.sucess("Imagem alterada com sucesso!")
                    document.querySelector(".blur__modal--edit").classList.add("disabled")
                    return res.json()
                }
            })
            .catch((err) => {
                // TO-DO: toast ou pop-up erro
                
            })
        return response
    }

    static async createHabit(dataHabit) {
        const token = JSON.parse(localStorage.getItem("token"))
        const baseUrl = "https://habits-kenzie.herokuapp.com/api/habits"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataHabit)
        }

        const response = await fetch(baseUrl, options)
            .then((res) => {
                if (res.ok === false) {
                    return new Error()
                } else {
                    return res.json()
                }
            })
            .then((res) => {
                CreateHomepage.createListTasks()
            })

            .catch((err) => {
                // TO-DO: toast ou pop-up erro
            })
        return response
    }

    static async readAll() {
        const token = JSON.parse(localStorage.getItem("token"))
        const baseUrl = "https://habits-kenzie.herokuapp.com/api/habits"
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const response = await fetch(baseUrl, options)
            .then((res) => {
                if (res.ok === false) {
                    return new Error()
                } else {
                    return res.json()
                }
            })
            .catch((err) => {
                // TO-DO: toast ou pop-up erro
            })
        return response
    }

    static async readCategory(category) {
        const token = JSON.parse(localStorage.getItem("token"))
        const baseUrl = `https://habits-kenzie.herokuapp.com/api/habits/category/${category}`
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const response = await fetch(baseUrl, options)
            .then((res) => {
                if (res.status === false) {
                    return new Error()
                } else {
                    return res.json()
                }
            })
            .catch((err) => {
                // TO-DO: toast ou pop-up erro
            })
        return response
    }

    static async updateHabit(dataUpdateHabit, habitId) {
        const token = JSON.parse(localStorage.getItem("token"))
        const baseUrl = `https://habits-kenzie.herokuapp.com/api/habits/${habitId}`
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataUpdateHabit)
        }
        const response = await fetch(baseUrl, options)
            .then((res) => {
                if (res.status === false) {
                    return new Error()
                } else {
                    return res.json()
                }
            })
            .catch((err) => {
                // TO-DO: toast ou pop-up erro
            })
        return response
    }

    static async completeHabit(habitId) {
        const token = JSON.parse(localStorage.getItem("token"))
        const baseUrl = `https://habits-kenzie.herokuapp.com/api/habits/complete/${habitId}`
        const options = {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const response = await fetch(baseUrl, options)
            .then((res) => {
                if (res.status === false) {
                    return new Error()
                } else {
                    return res.json()
                }
            }).then((res)=>{
                console.log(res)
                Notifications.showSucessToast(res.message)
            })
            .catch((err) => {
                // TO-DO: toast ou pop-up erro
            })

        return response
    }

    static async deleteHabit(habitId) {
        const token = JSON.parse(localStorage.getItem("token"))
        const baseUrl = `https://habits-kenzie.herokuapp.com/api/habits/${habitId}`
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const response = await fetch(baseUrl, options)
            .then((res) => {
                if (res.status === false) {
                    return new Error()
                } else {
                    return res.json()
                }
            })
            .catch((err) => {
                // TO-DO: toast ou pop-up erro
            })

        return response
    }

    static async getUser(loginData) {
        const baseUrl = "https://habits-kenzie.herokuapp.com/api/userLogin"

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        }

        return await fetch(baseUrl, options)
        .then((res) => 
            
        res.json()
            
        )
        .then((res) => {
            localStorage.setItem("@userimage", JSON.stringify(res.response.usr_image))
            CreateHomepage.profileHeader()
        })
    }
}



