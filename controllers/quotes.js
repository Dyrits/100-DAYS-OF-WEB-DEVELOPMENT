const Quote = require("../models/Quote");

module.exports = {
    get: {
        random: async function (request, response, next) {
            const quote = await Quote.get.random();
            response.json({ quote });
        }
    }
}