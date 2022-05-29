const database = require("../data/database");
const { ObjectId } = require("mongodb");

class Order {
    constructor (cart, user, status = "pending") {
        this.cart = cart;
        this.user = user;
        this.status = status;
        this.date = new Date();
    }

    async save () { await database.schema.collection("orders").insertOne(this); }

    static async update (id, status) { await database.schema.collection("orders").updateOne({ _id: ObjectId(id) }, { $set: { status } }); }

    static find = {
        identifier: async (id) => {
            const order = await database.schema.collection("orders").findOne({ _id: ObjectId(id) });
            order.id = order._id.toString();
            return order;
        },
        user: async (id) => {
            const orders = await database.schema.collection("orders").find({ "user._id": ObjectId(id) }).sort({ _id: -1 }).toArray();
            return orders.map(order => ({...order, id: order._id.toString()}));
        },
        all: async () => {
            const orders = await database.schema.collection("orders").find({}).sort({ _id: -1 }).toArray();
            return orders.map(order => ({...order, id: order._id.toString()}));
        }
    }
}

module.exports = Order;