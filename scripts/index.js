const remainder = document.querySelector('#remainder');

document.querySelector("#name").oninput = function() {
    const actions = { 11: ["remove", "warning"], 10: ["add", "warning"], 1: ["remove", "error"], 0: ["add", "error"] };
    const key = (remainder.innerText = 60 - this.value.length);
    if (key in actions) {
        const [action, className] = actions[key];
        [this, remainder].forEach(({ classList }) => classList[action](className))
    }
};