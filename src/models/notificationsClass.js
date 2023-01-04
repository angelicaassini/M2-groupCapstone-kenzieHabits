export default class Notifications {
    //SUCESS MSG ERROR
    static showSucessToast = (message) => {
        document.querySelector("#message__sucess").innerText = message
        document.querySelector("#sucess").style.display = "flex"
        setTimeout(() => {
            document.querySelector("#sucess").animate([
                { opacity: "0.9" },
                { opacity: "0.6" },
                { opacity: "0.3" },
                { opacity: "0.1" },
                { opacity: "0.0" },
            ], {
                duration: 4000,
                iteration: 1
            })
        }, 2000);
        setTimeout(() => {
            document.querySelector("#sucess").style.display = "none"
        }, 6000);

    }
    //ERROR TOAST MESSAGE
    static showErrorToast = (message) => {
        document.querySelector(".message__wrong").innerText = message
        document.querySelector("#error").style.display = "flex"
        setTimeout(() => {
            document.querySelector("#error").animate([
                { opacity: "0.9" },
                { opacity: "0.6" },
                { opacity: "0.3" },
                { opacity: "0.1" },
                { opacity: "0.0" },
            ], {
                duration: 4000,
                iteration: 1
            })
        }, 2000);
        setTimeout(() => {
            document.querySelector("#error").style.display = "none"
        }, 6000);
    }
    //  CHECK BOX VALIDATION
    static doneTask = (e) => {
        const task__item = e
        task__item.classList.add("done")
        const task__title = task__item.querySelector(".task__title")
        task__title.classList.add("done_text")
    }
    //  CHECK BOX VALIDATION 
    static undoneTask = (e) => {
        const task__item = e
        task__item.classList.remove("done")
        const task__title = task__item.querySelector(".task__title")
        task__title.classList.remove("done_text")
    }

}