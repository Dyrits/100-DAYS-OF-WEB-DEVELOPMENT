const database = require("../data/database");
const {ObjectId} = require("mongodb");

class Order {
    constructor (cart, user, status = "pending") {
        this.cart = cart;
        this.user = user;
        this.status = status;
        this.date = new Date();
    }

    get localDateString () {
        return this.date.toLocaleDateString({
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    async save (id) {
        if (id) { await database.schema.collection("orders").updateOne({ _id: ObjectId(id) }, { $set: this }); }
        else { await database.schema.collection("orders").insertOne(this); }
    }
}

module.exports = Order;