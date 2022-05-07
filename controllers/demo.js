const service = require("../services/demo");

module.exports = {
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
        admin: async (request, response) => {
            response.render("admin");
        }
    }
}