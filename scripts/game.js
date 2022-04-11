const getIcon = (player) => {
    const icon = document.createElement('img');
    icon.classList.add("markers");
    icon.src = `icons/${player.icon}.png`;
    return icon;
}

document.querySelectorAll("#game-board li").forEach(square => {
    square.addEventListener("click", (e) => {
        const icon = getIcon(players.current);
        square.appendChild(icon);
        square.classList.add("disabled");
        players.switchPlayer();
        displayPlayerName();
}, {once: true}); });

function displayPlayerName() { document.querySelector("#active-player").innerHTML = players.current.name; }