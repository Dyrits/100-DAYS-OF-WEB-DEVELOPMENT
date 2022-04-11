refreshConfiguration(false);

document.querySelectorAll(".settings").forEach(button => {
    button.addEventListener("click", openModal);
});

document.querySelector("#cancel").addEventListener("click", closeModal);
document.querySelector("#confirm").addEventListener("click", savePlayer);