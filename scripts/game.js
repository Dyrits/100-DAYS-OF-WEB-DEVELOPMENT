const getIcon = (player) => {
    const icon = document.createElement('img');
    icon.classList.add("markers");
    icon.src = `icons/${player.icon}.png`;
    return icon;
}