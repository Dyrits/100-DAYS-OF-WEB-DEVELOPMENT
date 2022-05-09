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
        },
        logout: async({ session }, response) => {
            await session.destroy();
            response.redirect("/");
        }
    },
    render: {
        welcome: async ({ session }, response) => {
            const authenticated = session.user;
            response.render("welcome", { authenticated });
        },
        signup: async ({ session }, response) => {
            const authenticated = session.user;
            authenticated ? response.redirect("/") : response.render("signup", { authenticated });
        },
        login: async ({ session }, response) => {
            const authenticated = session.user;
            authenticated ? response.redirect("/") : response.render("login", { authenticated });
        },
        admin: async ({ session }, response) => {
            const authenticated = session.user;
            response.render(authenticated ? "admin" : "401", { authenticated });
        }
    }
}