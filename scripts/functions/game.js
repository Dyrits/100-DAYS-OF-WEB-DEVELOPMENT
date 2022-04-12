function getIcon(player) {
    const icon = document.createElement('img');
    icon.classList.add("markers");
    icon.src = `icons/${player.icon}.png`;
    return icon;
}

function placeIcon() {
    displayIcon(this);
    players.switchPlayer();
    displayName();
}

function displayIcon(square) {
    const icon = getIcon(players.current);
    square.appendChild(icon);
    square.classList.add("disabled");
}

function displayName() { document.querySelector("#active-player").innerHTML = players.current.name; }