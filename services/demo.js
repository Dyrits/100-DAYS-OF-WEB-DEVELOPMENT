const database = require('../data/database.js');
const { ObjectId } = require('mongodb');

module.exports ={
    users: {
        save: async (body) => {
            const data = {
                email: body.email,
                confirmation: body["confirm-email"],
                password: body.password,
            };
            const { confirmation, ...user } = data;
            await database.schema.collection("users").insertOne(user);
        }
    }
}