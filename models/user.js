const bcrypt = require("bcrypt");

const database = require("../data/database");

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static find = {
        byEmail: async email => await database.schema.collection("users").findOne({email})
    }

    async save() {
        this.password = await bcrypt.hash(this.password, 12);
        await database.schema.collection("users").insertOne(this);
    }
}

module.exports = User;