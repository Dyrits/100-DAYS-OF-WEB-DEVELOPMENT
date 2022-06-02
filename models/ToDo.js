const { ObjectId } = require("mongodb");

const database = require("../data/database");

class ToDo {
    constructor(text) {
        this.text = text;
    }

    static get = {
        all: async () => { return await database.schema.collection("todos").find({}).toArray(); }
    }

    async save(id) {
        if (id) { return await database.schema.collection("quotes").updateOne({ _id: ObjectId(id) }, { $set: { text: this.text } }); }
        return await database.schema.collection("todos").insertOne(this);
    }

    static async delete(id) {
        return await database.schema.collection("todos").deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = ToDo;