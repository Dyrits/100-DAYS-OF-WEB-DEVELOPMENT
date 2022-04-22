const express = require('express');
const PATH = require('path');

const app = express();

const views = { directory: PATH.join(__dirname, 'views'), };

app.set("views", views.directory);
app.set("view engine", "ejs");

const routers= {
    default: require('./routes'),
    restaurants: require("./routes/restaurants")
};

app.use(express.urlencoded({ extended: false }));

app.use(express.static(PATH.join(__dirname, "public")));

app.use("/restaurants", routers.restaurants);
app.use("/", routers.default);

app.use((request, response) => {
  response.status(404).render("404");
});

app.use((error, request, response, next) => {
  response.status(500).render("500");
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});

