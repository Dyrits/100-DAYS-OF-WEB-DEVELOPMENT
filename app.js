const PATH = require("path");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const database = require("./data/database");

const routes = {
  blog: require("./routes/blog-demonstration")
}

const app = express();

const store = new MongoDBStore({
  uri: database.uri,
  databaseName: "blog-demonstration",
  collection: "sessions"
});

app.set("view engine", "ejs");
app.set("views", PATH.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET || "LOCAL_SECRET",
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7}
}));
app.use(csrf());

app.use(async function({ session }, response, next) {
  const { user } = session;
  const { authenticated } = session;
  if (!user || !authenticated) { return next(); }
  response.locals.authenticated = authenticated;
  next();
});

app.use(routes.blog);

app.use(function(error, request, response, next) {
  response.render('500');
})

database.connect().then(() => {
  database.schema && app.listen(process.env.PORT || 3000, () => {
    console.info(`The server started on port ${process.env.PORT || 3000}.`);
  });
});