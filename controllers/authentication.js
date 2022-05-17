const bcrypt = require("bcrypt");

module.exports = {
    render: {
        signup: (request, response) => {
            response.render("customers/authentication/sign-up");
        },
        signin: (request, response) => {
        }
    },
    signup: async (request, response) => {
    }
}