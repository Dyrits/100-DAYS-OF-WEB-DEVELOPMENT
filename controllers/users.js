const users = require("../services/users");

const bcrypt = require("bcrypt");

module.exports = {
    signup: async (request, response) => {
        const { email, confirmation, password } = request.body
        const validation = {
            email: email && confirmation && email === confirmation && email.includes("@"),
            password: password && password.trim().length > 5,
            uniqueness: !(await users.findByEmail(email))
        }
        if (!validation.email || !validation.password || !validation.uniqueness) {
            request.session.signup = { email, confirmation, password,
                error: true,
                message: !validation.uniqueness ? "User already exists!" : "Invalid input! Please check your data."
            };
            request.session.save(() => { response.redirect("/signup") });
        } else {
            const user = { email, password: await bcrypt.hash(password, 12) };
            await users.save(user);
            response.redirect("/login");
        }
    },
    login: async (request, response) => {
        const { email, password } = request.body;
        const user = await users.findByEmail(email);
        const validation = { password: await bcrypt.compare(password, user.password) };
        if (!user || !validation.password) {
            request.session.login = { email, password, error: true, message: "Could not log you in! Please check your credentials!" };
            request.session.save(() => { response.redirect("/login") });
        } else {
            request.session.user = { id: user._id, email };
            request.session.authenticated = true;
            request.session.save(() => { response.redirect("/") });
        }
    },
    logout: (request, response) => {
        request.session.destroy(() => { response.redirect("/") });
    }
}