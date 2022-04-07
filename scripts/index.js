const remainder = document.querySelector('#remainder');

document.querySelector("#name").oninput = function() {
    [this, remainder].forEach(element => element.classList[{ 10: "add", 11: "remove"}[remainder.innerText = 60 - this.value.length]]?.("warning"));
};