const database = require('../data/database.js');

module.exports = {
    users: {
        findAll: async () => await database.schema.collection("users").find().toArray(),
        save: async ({ username }, file) =>{
            await database.schema.collection("users").insertOne({
                name: username,
                image: file.path
            });
        }
    }
}
