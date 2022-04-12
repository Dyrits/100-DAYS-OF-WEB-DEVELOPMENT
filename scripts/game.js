function getIcon(player) {
    const icon = document.createElement('img');
    icon.classList.add("markers");
    icon.src = `icons/${player.icon}.png`;
    return icon;
}

function placeIcon() {
    const icon = getIcon(players.current);
    this.appendChild(icon);
    this.classList.add("disabled");
    players.switchPlayer();
    displayPlayerName();
}

function displayPlayerName() { document.querySelector("#active-player").innerHTML = players.current.name; }