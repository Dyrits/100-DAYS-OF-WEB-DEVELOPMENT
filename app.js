const PATH = require("path");
const express = require("express");
const session = require("express-session");

const database = require("./data/database");

const configurations = {
  session: require("./configurations/session")
}

const middlewares = {
  authentication: require("./middlewares/authentication"),
  authorization: require("./middlewares/authorization"),
  csrf: require("csurf"),
  error: require("./middlewares/error")
}

const routes = {
  index: require("./routes/index"),
  authentication: require("./routes/authentication"),
  products: require("./routes/products"),
}

const store = configurations.session.store(session);

const app = express();

app.set("view engine", "ejs");
app.set("views", PATH.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session(configurations.session.options(store)));
app.use(middlewares.csrf());

app.use(middlewares.authentication);
app.use(middlewares.authorization.csrf);

app.use(routes.index);
app.use(routes.authentication);
app.use(routes.products);

app.use(middlewares.error);

database.connect().then(() => {
  database.schema && app.listen(process.env.PORT || 3000, () => {
    console.info(`The server started on port ${process.env.PORT || 3000}.`);
  });
});