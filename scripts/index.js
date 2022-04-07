const remainder = document.querySelector('#remainder');

document.querySelector("#name").oninput = function() {
    const method = { 10: "add", 11: "remove"};
    remainder.innerText = 60 - this.value.length;
    [this, remainder].forEach(({ classList }) => classList[method[remainder.innerText]]?.("warning"));
};