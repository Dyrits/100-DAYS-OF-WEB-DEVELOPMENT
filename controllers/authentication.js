const User = require("../models/User");
const service = require("../services/authentication");

module.exports = {
    render: {
        signup: (request, response) => { response.render("customers/authentication/sign-up"); },
        signin: (request, response) => { response.render("customers/authentication/sign-in"); }
    },
    signup: async ({ body }, response, next) => {
        try {
            const { email, confirmation, password, name, street, postal, city } = body;
            const user = new User(email, password, name, street, postal, city);
            const valid = await user.validate.signup(confirmation);
            valid ? user.save().then(() => response.redirect("/sign-in")) : response.redirect("/sign-up");
        } catch (error) { next(error); }
    },
    signin: async ({ body, session }, response, next) => {
        try {
            const { email, password } = body;
            const user= new User(email, password);
            const db$user = await User.find(email);
            const valid = db$user && await user.validate.signin(db$user.password);
            valid ? service.session.create(session, db$user, () => response.redirect("/")) : response.redirect("/sign-in");
        } catch (error) { next(error); }
    },
    signout: ({ session }, response) => {
        service.session.destroy(session, () => response.redirect("/"));
    }
}