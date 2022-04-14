function startGame() {
    document.querySelector("#game").style.display = "block";
    resetGame();
    toggleDisplay(true);
    displayName();
}

function resetGame() {
    game.board = [["", "", ""], ["", "", ""], ["", "", ""]];
    game.round = 1;
    document.querySelectorAll("#game-board li").forEach(square => {
        square.hasChildNodes() && square.removeChild(square.firstChild);
        square.addEventListener("click", placeIcon);
    });
    ["draw", "win"].forEach(status => { document.querySelector(`#result-${status}`).style.display = "none"; });
}

function terminateGame(isDraw = false) {
    document.querySelectorAll("#game-board li").forEach(square => {
        square.removeEventListener("click", placeIcon,);
    });
    toggleDisplay(false)
    displayOutcome(isDraw);
    players.switchPlayer();
}

function toggleDisplay(isActive) {
    document.querySelector("#start").classList[isActive ? "remove" : "add"]("heartbeat");
    document.querySelector("#game-over").style.display = isActive ? "none" : "block";
    document.querySelectorAll("#game-board li").forEach(square => {
        square.classList[isActive ? "remove" : "add"]("disabled");
    });
    toggleSettingsButtons(!isActive);
}

function displayOutcome(isDraw) {
    document.querySelector(isDraw  ? "#result-draw" : "#result-win").style.display = "block";
    if (!isDraw) { document.querySelector("#winner").innerHTML = players.current.name; }
}

function getIcon(player) {
    const icon = document.createElement('img');
    icon.classList.add("markers");
    icon.src = `icons/${player.icon}.png`;
    return icon;
}

function placeIcon() {
    displayIcon(this);
    if (isWinning(this.dataset)) { terminateGame(); }
    else if (++game.round === 10) { terminateGame(true); }
    else {
        players.switchPlayer();
        displayName();
    }
}

function displayIcon(square) {
    const icon = getIcon(players.current);
    square.appendChild(icon);
    square.classList.add("disabled");
}

function displayName() { document.querySelector("#active-player").innerHTML = players.current.name; }

function isWinning({ row, column }) {
    game.board[row][column] = players.current.icon;
    return checkRows() || checkColumns() || checkDiagonals();
}

function checkRows() {
    for (let row = 0; row < game.board.length; row++) {
        if (game.board[row].every(square => square === players.current.icon)) { return true; }
    }
    return false;
}

function checkColumns() {
    for (let column = 0; column < game.board.length; column++) {
        if (game.board.every(row => row[column] === players.current.icon)) { return true;}
    }
    return false;
}

function checkDiagonals() {
    const { board } = game;
    const { icon } = players.current;
    return (board[0][0] === icon && board[1][1] === icon && board[2][2] === icon)
        || (board[0][2] === icon && board[1][1] === icon && board[2][0] === icon);
}