const express = require("express");

const database = require("./data/database");

const app = express();

const routes = {
    quotes: require("./routes/quotes"),
    todos: require("./routes/todos")
}

app.use("/quotes", routes.quotes);
app.use("/todos", routes.todos);

app.use((error, request, response, next) => {
    response.status(500).json({ message: error.message || "Something went wrong!" });
});

database.connect().then(() => {
    database.schema && app.listen(process.env.PORT || 3000, () => {
        console.info(`The server started on port ${process.env.PORT || 3000}.`);
    });
});