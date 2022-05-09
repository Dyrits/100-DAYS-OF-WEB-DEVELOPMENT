const service = require("../services/demonstration");

module.exports = {
    $users: {
        signup: async ({ body, session }, response) => {
            const success = await service.users.save(body, session);
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
            const authenticated = session.user?.authenticated
            response.render("welcome", { authenticated });
        },
        signup: async ({ session }, response) => {
            const authenticated = session.user?.authenticated
            let data = { email: null, confirmation: null, password: null, message: null, error: false };
            data = session.error || data;
            authenticated ? response.redirect("/") : response.render("signup", { authenticated, data });
        },
        login: async ({ session }, response) => {
            const authenticated = session.user?.authenticated;
            authenticated ? response.redirect("/") : response.render("login", { authenticated });
        },
        admin: async ({ session }, response) => {
            const authenticated = session.user?.authenticated
            response.render(authenticated ? "admin" : "401", { authenticated });
        }
    }
}