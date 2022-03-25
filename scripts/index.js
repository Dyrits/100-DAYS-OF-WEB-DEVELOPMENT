window.onresize = () => {
    window.matchMedia( "(min-width: 48rem)").matches && (window.location.hash = "");
};

document.querySelector("#menu-button").onclick = ($event) => {
    $event.preventDefault();
    window.location.hash = window.location.hash === "#drawer" ? "" : "#drawer";
}