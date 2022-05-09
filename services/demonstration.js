const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

const database = require("../data/database.js");

const validate = {
    _email: (email, confirmation) => email?.includes("@") && confirmation && email === confirmation,
    _password: password => password && password?.trim().length >= 6,
    _uniqueness: async email => {
        const user = await service.users.get({ email });
        return !user
    },
    user: async (body, session) => {
        const { email, password } = body;
        const confirmation = body["confirm-email"];
        if (!validate._email(email, confirmation) || !validate._password(password) || !await validate._uniqueness(email)) {
            session.error = {email, confirmation, password, message: "Invalid email or password!", error: true };
        } else { session.error = null; }
        await session.save();
    }
};

const service = {
    users: {
        get: async (email) => await database.schema.collection("users").findOne({ email }),
        save: async (body, session) => {
            await validate.user(body, session);
            if (session.error) { return false; }
            const user = { email: body.email, password: await bcrypt.hash(body.password, 12) };
            const { acknowledged } = await database.schema.collection("users").insertOne(user);
            return acknowledged;
        },
        authenticate : async (body, session) => {
            const { email, password } = body;
            const user = await service.users.get(email);
            const authenticated = user && await bcrypt.compare(password, user.password);
            session.user = {email, id: user.id, authenticated};
            authenticated && await session.save();
        }
    }
};

module.exports = service;