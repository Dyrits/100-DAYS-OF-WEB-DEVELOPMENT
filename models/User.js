const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const database = require("../data/database");

class User {
    constructor (email, password, name, street, postal, city, administrator = false) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = { street, postal, city };
        this.administrator = administrator;
    }

    async save () {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        await database.schema.collection("users").insertOne(this);
    }

    static find = {
        email: async (email) => await database.schema.collection("users").findOne({email}),
        identifier: async (id) => await database.schema.collection("users").findOne({_id: ObjectId(id)}, { projection: { password: false } })
    }

    static mock = () => ({ email: null, confirmation: null, password: null, name: null, street: null, postal: null, city: null })
}

module.exports = User;