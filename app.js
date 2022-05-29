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
  error: require("./middlewares/error"),
  cart: require("./middlewares/cart")
}

const routes = {
  index: require("./routes/index"),
  authentication: require("./routes/authentication"),
  products: require("./routes/products"),
  administration: require("./routes/administration"),
  cart: require("./routes/cart"),
  orders: require("./routes/orders")
}

const store = configurations.session.store(session);

const app = express();

app.set("view engine", "ejs");
app.set("views", PATH.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/assets/products", express.static("data/products"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session(configurations.session.options(store)));
app.use(middlewares.csrf());

app.use(middlewares.cart);

app.use(middlewares.authentication);
app.use(middlewares.authorization.csrf);

app.use(routes.index);
app.use(routes.authentication);
app.use(routes.products);
app.use("/cart", routes.cart);
app.use("/orders", middlewares.authorization.authentication, routes.orders);
app.use("/administration", middlewares.authorization.administration, routes.administration);

app.use(middlewares.error);

app.use("*", (request, response) => response.redirect("/errors/404"));

database.connect().then(() => {
  database.schema && app.listen(process.env.PORT || 3000, () => {
    console.info(`The server started on port ${process.env.PORT || 3000}.`);
  });
});