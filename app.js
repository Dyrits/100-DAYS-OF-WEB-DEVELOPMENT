const express = require('express');
const PATH = require('path');

const app = express();

const views = {
  directory: PATH.join(__dirname, 'views'),
  get (file) { return PATH.join(this.directory, `${file}.html`); }
};

app.get('/', (request, response) => {
  response.sendFile(views.get('index'));
});

app.get("/:file", ({ params }, response) => {
  params.file === "index" ? response.redirect("/") : response.sendFile(views.get(params.file));
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});