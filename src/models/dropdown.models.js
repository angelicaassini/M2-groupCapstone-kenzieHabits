export default class DropDownMenu {
    static openMenu(){ 
        const img  = document.querySelector(".profile__image")
        const menu = document.querySelector(".navbar__menu")
        img.addEventListener("click" , () => {
            menu.classList.toggle("active-d")
        })
    }

    static logout() {
        const logoutButton = document.querySelector(".logoutButton")
        logoutButton.addEventListener("click", () => {
            window.location.href = "../../index.html"
            localStorage.clear()
        })
    }

    static editProfile() {
        const btnEdit = document.querySelector(".btn__edit")
        btnEdit.addEventListener("click", () => {
            const modal = document.querySelector(".blur__modal--edit")

            modal.classList.remove("disabled")
            modal.style.opacity = 0
            setTimeout(() => {
                modal.animate([
                    {opacity : "0.1"},
                    {opacity: "0.3"},
                    {opacity: "0.5"},
                    {opacity: "0.7"},
                    {opacity: "0.9"},
                ],{
                    duration: 500,
                })
                setTimeout(() => {
                    modal.style.opacity = 1
                }, 500);  
            },12);
            modal.classList.remove("disabled")
        })
    }
}
