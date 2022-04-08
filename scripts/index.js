const remainder = document.querySelector('#remainder');

document.querySelector("#name").oninput = function() {
  const actions = { 10: "add", 11: "remove"};
  const key = (remainder.innerText = 60 - this.value.length);
  key in actions && [this, remainder].forEach(element => element.classList[actions[key]]?.("warning"));
};