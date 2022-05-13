const User = require('../models/user');

module.exports = {
    signup: async (request, response) => {
        const { email, confirmation, password } = request.body
        const validity = {
            email: email && confirmation && email === confirmation && email.includes("@"),
            password: password && password.trim().length > 5,
            uniqueness: !(await User.find.byEmail(email))
        }
        if (!validity.email || !validity.password || !validity.uniqueness) {
            request.session.signup = { email, confirmation, password,
                error: true,
                message: !validity.uniqueness ? "User already exists!" : "Invalid input! Please check your data."
            };
            request.session.save(() => { response.redirect("/signup") });
        } else {
            const user = new User(email, password);
            await user.save();
            response.redirect("/login");
        }
    },
    login: async (request, response) => {
        const { email, password } = request.body;
        const user = await User.find.byEmail(email);
        const validity = user && await bcrypt.compare(password, user.password);
        if (!validity) {
            request.session.login = { email, password, error: true, message: "Could not log you in! Please check your credentials!" };
        } else {
            request.session.user = { id: user._id, email };
            request.session.authenticated = true;
        }
        request.session.save(() => { response.redirect(validity ? "/" : "/login") });
    },
    logout: (request, response) => {
        request.session.destroy(() => { response.redirect("/") });
    }
}