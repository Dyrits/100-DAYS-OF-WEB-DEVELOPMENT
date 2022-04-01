const person = {
    name: localStorage.getItem("name"),
    display() { document.querySelector("#name").innerHTML = `You are identified as ${this.name}.`; },
    setName($name) {
        this.name = $name;
        localStorage.setItem("name", $name);
    },
}

while (!person.name ) { person.setName(prompt("What's your name?")); }
person.display();