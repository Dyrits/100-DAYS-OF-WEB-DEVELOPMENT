const bcrypt = require("bcrypt");

const database = require("../data/database");
const { exists } = require("../services/tools/validation");


class User {
    constructor(email, password, name, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = { street, postal, city };
    }

    async save() {
        delete this.validity;
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        await database.schema.collection("users").insertOne(this);
    }

    static async find(email) { return await database.schema.collection("users").findOne({email}); }

    #verify = {
        email: (confirmation) => exists(this.email, confirmation) && this.email === confirmation &&this. email.includes("@"),
        password: () => exists(this.password) && this.password.trim().length >= 6,
        information: () => exists(this.name, this.address.street, this.address.postal, this.address.city),
        uniqueness: async () => {
            const user = await database.schema.collection("users").findOne({ email: this.email });
            return !user;
        }
    }

    async #check(password) { return await bcrypt.compare(this.password, password); }

    validate = {
        signup: async (confirmation) => this.#verify.email(confirmation) && this.#verify.password() && this.#verify.information() && this.#verify.uniqueness(),
        signin: async (password) => this.#check(password)
    }
}

module.exports = User;