const service = require("../services/demonstration");

const data = {
  get: (session, key) => {
      let data = { email: null, confirmation: null, password: null, message: null, error: false };
      return session[key] || data;
  }
}

module.exports = {
    $users: {
        signup: async ({ body, session }, response) => {
            const success = await service.users.save(body, session);
            success ? response.redirect("/login") : response.redirect("/signup");
        },
        login: async ({ session, body }, response) => {
            await service.users.authenticate(body, session);
            const success = session.user?.authenticated;
            success ? response.redirect("/profile") : response.redirect("/login");
        },
        logout: async({ session }, response) => {
            await session.destroy();
            response.redirect("/");
        }
    },
    render: {
        welcome: async ({ session }, response) => {
            response.render("welcome");
        },
        signup: async ({ session }, response) => {
            response.locals.authenticated ? response.redirect("/") :
                response.render("signup", { data: data.get(session, "signup") });
        },
        login: async ({ session }, response) => {
            response.locals.authenticated ? response.redirect("/") :
                response.render("login", { data: data.get(session, "login") });
        },
        admin: async (request, response) => {
            const { authenticated, authorized } = response.locals;
            response.status(authorized ? 200 : authenticated ? 403 : 401).render(authorized ? "admin" : authenticated ? "403" : "401", { authenticated });
        },
        profile: async (request, response) => {
            response.render(response.locals.authenticated ? "profile" : "401");
        }
    }
}