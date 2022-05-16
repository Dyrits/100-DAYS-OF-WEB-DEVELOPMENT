const bcrypt = require("bcrypt");

module.exports = {
    render: {
        signup: async (request, response) => {
            response.render("customers/authentication/sign-up");
        },
        signin: async (request, response) => {
        }
    }

}