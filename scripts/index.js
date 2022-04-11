const players = {
    "#1": {
        name: localStorage.getItem("#1") || "(Unknown) #1",
        icon: "X"
    } ,
    "#2": {
        name: localStorage.getItem("#2") || "(Unknown) #2",
        icon: "O"
    }
}

refreshConfiguration(false);

document.querySelectorAll(".settings").forEach(button => {
    button.addEventListener("click", openModal);
});

document.querySelector("#cancel").addEventListener("click", closeModal);
document.querySelector("#confirm").addEventListener("click", savePlayer);