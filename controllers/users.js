const service = require("../services/users");

module.exports = {
    $users: {
        post: async ({body, file}, response) => {
            await service.users.save(body, file);
            response.redirect("/");
        }
    },
    render: {
        profiles: async (request, response) => {
            const users = await service.users.findAll();
            response.render("profiles", { users });
        },
        create: (request, response) => {
            response.render("new-user");
        }
    }
}
