const User = require("../models/User");

const verify = {
    email: (email, confirmation) => email && confirmation && email === confirmation && email.includes("@"),
    password: (password) => password && password.trim().length > 5,
    uniqueness: async (email) => {
        const user = await User.find(email);
        return !user;
    }
}

const validate = {
    signup : async (email, confirmation, password) =>
        verify.email(email, confirmation) && verify.password(password) && verify.uniqueness(email),
}

module.exports = {
    render: {
        signup: (request, response) => { response.render("customers/authentication/sign-up"); },
        signin: (request, response) => { response.render("customers/authentication/sign-in"); }
    },
    signup: async ({ body }, response) => {
        const { email, confirmation, password, name, street, postal, city } = body;
        const user = new User(email, password, name, street, postal, city);
        const valid = await validate.signup(email, confirmation, password);
        valid ? user.save().then(() => response.redirect("/sign-in")) : response.redirect("/sign-up");
    }
}