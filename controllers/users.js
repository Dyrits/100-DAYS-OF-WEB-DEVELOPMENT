const service = require("../services/users");

module.exports = {
    $users: {
        post: ({ body, file }, response) => {
                response.redirect("/");
            }
    },
    render: {
        profiles: (request, response) => {
            response.render("profiles");
        },
        create: (request, response) => {
            response.render("new-user");
        }
    }
}
