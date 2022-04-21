const express = require('express');
const PATH = require('path');
const FS = require('fs');
const UUID = require('uuid');

const $restaurants = require("./services/restaurants");

const app = express();

const views = { directory: PATH.join(__dirname, 'views'), };

app.set("views", views.directory);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(PATH.join(__dirname, "public")));

app.get('/', (request, response) => {
  response.render("index");
});

app.post("/recommend", ({ body }, response) => {
  $restaurants.save( {...body, id: UUID.v4()});
  response.redirect("/confirm");
});

app.get("/restaurants", (request, response) => {
  const restaurants = $restaurants.findAll();
  response.render("restaurants", { restaurants });
});

app.get("/restaurants/:id", (request, response) => {
  const restaurant = $restaurants.find(request.params.id);
  response.render(restaurant ? "restaurant" : "404", restaurant ? { restaurant } : {});
});

app.get("/:file", ({ params }, response) => {
  params.file === "index" ? response.redirect("/") : response.render(params.file, (error, html) => {
    error ? response.status(404).render("404") : response.send(html);
  });
});

app.use((request, response) => {
  response.status(404).render("404");
});

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).render("500");
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});

