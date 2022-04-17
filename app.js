const http = require("http");

const server = http.createServer(run);
const port = 3000;

server.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});

function run(request, response) {
    const query = {};
    query.time = request.url === "/current-time";
    const h1 = `<h1>${query.time ? new Date().toISOString() : "Hello World!"}</h1>`;
    response.end(h1);
}