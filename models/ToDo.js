const { ObjectId } = require("mongodb");

const database = require("../data/database");

class ToDo {
    constructor(text) {
        this.text = text;
    }

    static get = {
        all: async () => { return await database.schema.collection("todos").find({}).toArray(); },
        id: async(id) => { return await database.schema.collection("todos").findOne({ _id: ObjectId(id) }); }
    }

    async save(id) {
        if (id) { return await database.schema.collection("todos").updateOne({ _id: ObjectId(id) }, { $set: { text: this.text} }); }
        return await database.schema.collection("todos").insertOne(this);
    }

    static async delete(id) {
        return await database.schema.collection("todos").deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = ToDo;