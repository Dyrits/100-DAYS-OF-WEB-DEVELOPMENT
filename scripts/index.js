const remainder = document.querySelector('#remainder');

document.querySelector("#name").oninput = function() {
    const methods = { 10: "add", 11: "remove"};
    const key = remainder.innerText = 60 - this.value.length;
    [this, remainder].forEach(({ classList }) => classList[methods[key]]?.("warning"));
};