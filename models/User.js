const bcrypt = require("bcrypt");

const database = require("../data/database");

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

    static async find(email) { return await database.schema.collection("users").findOne({email}); }
    static mock = () => ({ email: null, confirmation: null, password: null, name: null, street: null, postal: null, city: null })
}

module.exports = User;