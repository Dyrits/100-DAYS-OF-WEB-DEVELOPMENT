const players = {
    "#1": { name: localStorage.getItem("#1") || "(Unknown) #1", icon: "X", _next: "#2" },
    "#2": { name: localStorage.getItem("#2") || "(Unknown) #2", icon: "O", _next: "#1" },
    _current: "#1",
    get current() { return this[this._current];},
    switchPlayer () { this._current = this.current._next;},
}

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
    const start = document.querySelector("#start");
    start.disabled = false;
    start.style.cursor = "pointer";
    start.classList.add("vibrate");
    start.classList.add("heartbeat");
}

function disableStartButton() {
    const start = document.querySelector("#start");
    start.disabled = true;
    start.style.cursor = "not-allowed";
    start.classList.remove("vibrate");
    start.classList.remove("heartbeat");

}

function refreshConfiguration(isModalOpen = false) {
    displayPlayersNames();
    displayPlayerName();
    !localStorage.getItem("#1") || !localStorage.getItem("#2") ? disableStartButton() : enableStartButton();
    isModalOpen && closeModal();
}
