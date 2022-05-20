const database = require("../../data/database");
const bcrypt = require("bcrypt");

const  exists = (...strings) => strings.every(string => string && string.trim().length);

module.exports = {
    verify: {
        email: (user, confirmation) => exists(user.email, confirmation) && user.email === confirmation &&user. email.includes("@"),
        password: (user) => exists(user.password) && user.password.trim().length >= 6,
        information: (user) => exists(user.name, user.address.street, user.address.postal, user.address.city),
        uniqueness: async (email) => {
            const user = await database.schema.collection("users").findOne({ email });
            return !user;
        }
    },
    check: {
        password: async (password, db$password) => await bcrypt.compare(password, db$password)
    }
}