const database = require("../data/database");

class Quote {
    static get = {
        random: async () => {
            const quotes = await database.schema.collection("quotes").find({}).toArray();
            return quotes[Math.floor(Math.random() * quotes.length)];
        }

    }
}

module.exports = Quote;