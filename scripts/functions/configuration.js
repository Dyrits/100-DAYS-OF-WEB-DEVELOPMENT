function openModal() {
    toggleStartButton(false);
    document.querySelector("#modal").style.display = "block";
    document.querySelector("#backdrop").style.display = "block";
    document.querySelector("#player-number").innerHTML = this.dataset.player;
}

function closeModal($event) {
    $event && $event.preventDefault();
    document.querySelector("#player-name").value = String();
    document.querySelector("#modal").style.display = "none";
    document.querySelector("#backdrop").style.display = "none";
    refreshConfiguration(false)
}

function savePlayer($event) {
    $event.preventDefault();
    const number = document.querySelector("#player-number").innerHTML;
    const name = document.querySelector("#player-name").value.trim();
    updateName(number, name);
    refreshConfiguration(true);
}

function updateName(number, name) {
    localStorage.setItem(number, name);
    players[number].name = name || `(Unknown) ${number}`;
}

function displayNames() {
    ["#1", "#2"].forEach(number => {
        document.getElementById(`player-${number}-name`).innerHTML = players[number].name;
    });
}

function toggleStartButton(isEnabled) {
    const start = document.querySelector("#start");
    start.disabled = !isEnabled;
    start.style.cursor = isEnabled ? "pointer" : "not-allowed";
    start.classList[isEnabled ? "add" : "remove"]("vibrate");
    start.classList[isEnabled ? "add" : "remove"]("heartbeat");
    document.querySelector("#warning").style.display = isEnabled ? "none" : "block";
}

function toggleSettingsButtons(isEnabled) {
    document.querySelectorAll(".settings").forEach(function (element) {
        element.classList[isEnabled ? "remove" : "add"]("inactive");
        element.disabled = !isEnabled;
    });
}

function refreshConfiguration(isModalOpen = false) {
    displayNames();
    displayName();
    !localStorage.getItem("#1") || !localStorage.getItem("#2") ? toggleStartButton(false) : toggleStartButton(true);
    isModalOpen && closeModal();
}