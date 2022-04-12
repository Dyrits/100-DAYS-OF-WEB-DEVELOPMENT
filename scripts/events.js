window.addEventListener("load", function() {
    document.querySelectorAll(".settings").forEach(button => {
        button.addEventListener("click", openModal);
    });

    document.querySelectorAll("#game-board li").forEach(square => {
        square.addEventListener("click", placeIcon, {once: true});
    });

    document.querySelector("#cancel").addEventListener("click", closeModal);
    document.querySelector("#edit-player").addEventListener("submit", savePlayer);
});