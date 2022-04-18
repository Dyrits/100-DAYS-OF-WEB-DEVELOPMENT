const FS = require('fs');
const PATH = require('path');

const express = require('express');

const app = express();

const port = 3000;

const file = {};
file.path = PATH.join(__dirname, ".data", "users.json");

app.use(express.urlencoded({ extended: false }));

app.get("/current-time", (request, response) => {
    response.send(`<h1>${new Date().toISOString()}</h1>`);
});

app.get("/", (request, response) => {
    response.send(`
        <form method="POST" action="/save-user">
            <label for="username">Username:</label>
            <input type="text" name="username" id="username">
            <input type="submit" value="Submit">
        </form>
    `);
});

app.post("/save-user", ({ body }, response) => {
    const { username } = body;
    const users = JSON.parse(FS.readFileSync(file.path, "utf8")) || [];
    users.push(username);
    FS.writeFileSync(file.path, JSON.stringify(users));
    response.send(`<h1>Username "${username}" saved in ${file.path}!</h1>`);
});

app.get("/json/users", (request, response) => {
    const users = JSON.parse(FS.readFileSync(file.path, "utf8")) || [];
    response.send(users);
});

app.get("/users", (request, response) => {
    const users = JSON.parse(FS.readFileSync(file.path, "utf8")) || [];
    let html = "<ul>";
    for (const user of users) { html += `<li>${user}</li>`;}
    html += "</ul>";
    response.send(html);
});

app.listen(3000, () => {
    console.log(`The server is running on port ${port}.`);
});
