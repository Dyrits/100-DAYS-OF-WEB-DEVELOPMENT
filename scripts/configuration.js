function openModal() {
    document.querySelector("#modal").style.display = "block";
    document.querySelector("#backdrop").style.display = "block";
    document.querySelector("#player-number").innerHTML = this.dataset.player;
}

function savePlayer($event) {
    $event.preventDefault();
    const number = document.querySelector("#player-number").innerHTML;
    const playerName = document.querySelector("#player-name").value;
    localStorage.setItem(number, playerName);
    players[number].name = playerName || `(Unknown) ${number}`;
    refreshConfiguration(true);
}

function closeModal($event) {
    $event && $event.preventDefault();
    document.querySelector("#player-name").value = String();
    document.querySelector("#modal").style.display = "none";
    document.querySelector("#backdrop").style.display = "none";
}

function displayPlayersNames() {
    ["#1", "#2"].forEach(number => {
        document.getElementById(`player-${number}-name`).innerHTML = players[number].name;
    });
}

function enableStartButton() {
    if (!localStorage.getItem("#1") || !localStorage.getItem("#2")) { disableStartButton(); }
    else {
        const start = document.querySelector("#start");
        start.disabled = false;
        start.style.cursor = "pointer";
        start.classList.add("vibrate");
        start.classList.add("heartbeat");
    }
}

function disableStartButton() {
    const start = document.querySelector("#start");
    start.disabled = true;
    start.style.cursor = "not-allowed";
    start.classList.remove("vibrate");
    start.classList.remove("heartbeat");
}

function refreshConfiguration(isModalOpen) {
    displayPlayersNames()
    enableStartButton();
    isModalOpen && closeModal();
}
