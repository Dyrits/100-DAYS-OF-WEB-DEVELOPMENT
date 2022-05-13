const database = require("../data/database.js");

module.exports = {
    save: async (user) => await database.schema.collection("users").insertOne(user),
    findByEmail: async (email) => await database.schema.collection("users").findOne({ email }),
};