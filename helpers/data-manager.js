const FS = require('fs');
const PATH = require('path');

const directory = PATH.join(__dirname, '../.data');

const write = (file, content) => {
    const path = PATH.join(__dirname, directory, file);
    const data = FS.readFileSync(path);
    const restaurants = JSON.parse(data);
    restaurants.push(content);
    FS.writeFileSync(path, JSON.stringify(restaurants));
}

module.exports = { write };