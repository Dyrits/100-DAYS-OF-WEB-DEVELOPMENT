const database = require("../data/database");
const bcrypt = require("bcrypt");

const { verify, check } = require("./tools/verification");

module.exports = {
    session: {
        create(session, user, action) {
            console.log(user);
            session.user = { id: user._id.toString() };
            session.authenticated = true;
            session.administrator = user.administrator;
            session.save(action);
        },
        destroy(session, action) {
            session.user = null;
            session.authenticated = false;
            session.administrator = false;
            session.save(action);
        }
    },
    validation: {
        signup: async (user, confirmation) => {
            if (!verify.email(user, confirmation)) return { validity: false, error: "Invalid email and/or confirmation!" };
            if (!verify.password(user)) return { validity: false, error: "Invalid password!" };
            if (!verify.information(user)) return { validity: false, error: "Invalid name, street, postal code or city!" };
            if (!(await verify.uniqueness(user.email))) return { validity: false, error: "An user with this email already exists!" };
            return { validity: true };
        },
        signin: async (user, db$user) => {
            if (!await check.password(user.password, db$user.password)) return { validity: false, error: "Invalid password!" };
            return { validity: true };
        }
    }
}