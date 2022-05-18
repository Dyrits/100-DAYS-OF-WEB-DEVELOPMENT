const database = require("../data/database");
const bcrypt = require("bcrypt");

class User {
    constructor(email, password, name, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = { street, postal, city };
    }

    async save() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        await database.schema.collection("users").insertOne(this);
    }

    static async find(email) {
        return await database.schema.collection("users").findOne({email});
    }
}

module.exports = User;