const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

const database = require("../data/database.js");

const validate = {
    email: (email, confirmation) => email?.includes("@") && confirmation && email === confirmation,
    password: password => password && password?.trim().length >= 6,
    uniqueness: async email => {
        const user = await service.users.findOne({ email });
        return !user
    }
};

const service = {
    users: {
        get: async (email) => await database.schema.collection("users").findOne({ email }),
        save: async (body) => {
            const { email, password } = body;
            const confirmation = body["confirm-email"];
            if (!validate.email(email, confirmation) || !validate.password(password) || !await validate.uniqueness(email)) { return false; }
            const user = {  email, password: await bcrypt.hash(body.password, 12) };
            const { acknowledged } = await database.schema.collection("users").insertOne(user);
            return acknowledged;
        },
        authenticate : async (body) => {
            const { email, password } = body;
            const user = await service.users.get(email);
            return user && await bcrypt.compare(password, user.password);
        }
    }
};

module.exports = service;