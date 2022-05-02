const path = require("path");
const express = require("express");

const database = require("./data/database");

const routes = {
  blog: require("./routes/blog")
}

const app = express();

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static("public")); // Serve static files (e.g. CSS files)

app.use(routes.blog);

app.use( (error, request, response, next) => {
  console.log(error);
  response.status(500).render("500");
});

database.connect().then(() => {
  database.schema && app.listen(3000, () => {
    console.info("The server started on port 3000.");
  });
});
