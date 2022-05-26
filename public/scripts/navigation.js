const width = () => window.innerWidth / parseFloat(getComputedStyle(document.body).fontSize);

document.querySelector("#hamburger").addEventListener("click", () => {
    document.querySelector("#mobile-navigation").classList.toggle("flex");
});

window.onresize = () => {
   width() > 48 && document.querySelector("#mobile-navigation").classList.remove("flex");
}