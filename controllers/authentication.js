const User = require("../models/User");
const authentication = require("../services/authentication");
const flash = require("../services/flash");

const { validation } = authentication;

module.exports = {
    render: {
        signup: ({ session }, response) => {
            const data = flash.get(session, "signup") || User.mock();
            response.render("customers/authentication/sign-up", { data });
        },
        signin: ({ session }, response) => {
            const data = flash.get(session, "signin") || User.mock();
            response.render("customers/authentication/sign-in", { data });
        }
    },
    signup: async ({ body, session }, response, next) => {
        try {
            const { email, confirmation, password, name, street, postal, city } = body;
            const user = new User(email, password, name, street, postal, city);
            const { validity, error } = await validation.signup(user, confirmation);
            if (validity) { user.save().then(() => response.redirect("/sign-in")) }
            else { flash.set(session, "signup", { error, ...body }, () => { response.redirect("/sign-up"); }); }
        } catch (error) { next(error); }
    },
    signin: async ({ body, session }, response, next) => {
        try {
            const { email, password } = body;
            const user= new User(email, password);
            const db$user = await User.find.email(email);
            const { validity, error } = db$user ? await validation.signin(user, db$user) : { validity: false, error: "User not found!" };
            if (validity) { authentication.session.create(session, db$user, () => response.redirect("/")) }
            else { flash.set(session, "signin", { error, email, password }, () => { response.redirect("/sign-in"); }); }
        } catch (error) { next(error); }
    },
    signout: ({ session }, response) => {
        authentication.session.destroy(session, () => response.redirect("/"));
    }
}