window.addEventListener("load", function() {
    document.querySelectorAll(".settings").forEach(button => {
        button.addEventListener("click", openModal);
    });

    document.querySelector("#cancel").addEventListener("click", closeModal);
    document.querySelector("#edit-player").addEventListener("submit", savePlayer);
    document.querySelector("#start").addEventListener("click", startGame);
});