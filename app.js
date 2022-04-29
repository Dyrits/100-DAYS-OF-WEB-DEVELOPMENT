const PATH = require('path');

const express = require('express');

const app = express();

const routes = {
  blog: require('./routes/blog')
};

app.set('view engine', 'ejs');
app.set('views', PATH.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes.blog);

app.use( (error, request, response, next) => {
  console.error(error);
  response.status(500).render('500');
});

app.listen(3000,  () => {
  console.log('Server is running on port 3000.');
});
