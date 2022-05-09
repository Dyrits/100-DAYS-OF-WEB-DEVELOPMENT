const service = require("../services/demonstration");

module.exports = {
    $users: {
        signup: async ({ body }, response) => {
            const success = await service.users.save(body);
            success ? response.redirect("/login") : response.redirect("/signup");
        },
        login: async ({ session, body }, response) => {
            await service.users.authenticate(body, session);
            const success = session.user?.authenticated;
            success ? response.redirect("/admin") : response.redirect("/login");
        }
    },
    render: {
        welcome: async (request, response) => {
            response.render("welcome");
        },
        signup: async (request, response) => {
            response.render("signup");
        },
        login: async (request, response) => {
            response.render("login");
        },
        admin: async ({ session }, response) => {
            session.user?.authenticated ? response.render("admin") : response.render("401");
        }
    }
}