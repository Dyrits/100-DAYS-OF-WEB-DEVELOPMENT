const PATH = require("path");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const database = require("./data/database");

const routes = {
  demonstration: require("./routes/demonstration")
}

const app = express();

const store = new MongoDBStore({
  uri: database.uri,
  database: "demonstration",
  collection: "sessions"
});

app.set("view engine", "ejs");
app.set("views", PATH.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET || "0CEACCAE7EBB2FA08B3D6E99FC197978",
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(routes.demonstration);

app.use( (error, request, response, next) => {
  console.log(error);
  response.status(500).render("500");
});

database.connect().then(() => {
  database.schema && app.listen(process.env.PORT || 3000, () => {
    console.info(`The server started on port ${process.env.PORT || 3000}.`);
  });
});
