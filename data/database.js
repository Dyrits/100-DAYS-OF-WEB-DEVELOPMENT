const MySQL = require("mysql2/promise");

module.exports = MySQL.createPool({
    host: "localhost",
    user: "root",
    password: "root-password",
    database: "blog"
});