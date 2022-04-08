const remainder = document.querySelector('#remainder');
const methods = {
    10: ({ classList }) => classList.add("warning"),
    11: ({ classList }) => classList.remove("warning"),
    0: ({ classList }) => classList.add("error"),
    1: ({ classList }) => classList.remove("error")
};

document.querySelector("#name").oninput = function() {
    const key = (remainder.innerText = 60 - this.value.length);
    key in methods && [this, remainder].forEach(methods[key]);
};