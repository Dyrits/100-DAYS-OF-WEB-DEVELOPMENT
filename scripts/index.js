document.querySelectorAll("input[type=number]").forEach(input => input.addEventListener("input", function() {
    document.querySelector(`#${this.parentElement.parentElement.id} button`).disabled = false;
}, { once: true }));

document.querySelector("#calculator button").onclick = () => {
    const input = document.querySelector("#user-number");
    let number = input.value;
    while(!number || isNaN(number)) { number = prompt("Please enter a valid number:"); }
    input.value = number;
    const output =  document.querySelector("#calculated-sum");
    output.classList.add("visible");
    output.innerHTML = `${number * (Math.abs(number) + 1) / 2}`;
}

document.querySelector("#highlight-links button").onclick = function() {
    const links = document.querySelectorAll("a");
    links.forEach(link => link.classList.add("highlight"));
    this.disabled = true;
}

document.querySelector("#user-data button").onclick = function() {
    const ul = document.querySelector("#output-user-data");
    for(let [information, value] of Object.entries(userData)) {
        const li = document.createElement("li");
        li.innerHTML = `${information}: ${value}`;
        ul.appendChild(li);
    }
    this.disabled = true;
}

const displayRoll = (roll) => {
    const ul = document.querySelector("#dice-rolls");
    const li = document.createElement("li");
    li.innerHTML = `#${("0" + (ul.children.length + 1)).slice(-2)}: You rolled ${roll}.`;
    ul.appendChild(li);
}

const cleanDisplay = () => {
    const ul = document.querySelector("#dice-rolls");
    while(ul.firstChild) { ul.removeChild(ul.firstChild); }
}

const roll = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    displayRoll(roll);
    return roll;
}

document.querySelector("#statistics button").onclick = () => {
    cleanDisplay();
    const input = document.querySelector("#user-target-number");
    let guess = input.value;
    while (!guess || isNaN(guess) || guess > 6 || guess < 1) { guess = prompt("Please enter a number between 1 and 6:"); }
    document.querySelector("#output-target-number").innerHTML = (input.value = guess);
    const rolls = document.querySelector("#output-total-rolls");
    rolls.innerHTML = `${1}`;
    while (roll() !== parseInt(guess)) { rolls.innerHTML++;}
}