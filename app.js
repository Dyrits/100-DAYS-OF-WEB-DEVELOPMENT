const path = require('path');

const express = require('express');

const database = require('./data/database');

const routes = {
  demo: require("./routes/demo")
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(routes.demo);

app.use( (error, request, response, next) => {
  console.log(error);
  response.status(500).render("500");
});

database.connect().then(() => {
  database.schema && app.listen(process.env.PORT || 3000, () => {
    console.info(`The server started on port ${process.env.PORT || 3000}.`);
  });
});
