const database = require("../data/database");
const { ObjectId } = require("mongodb");

class Post {
    constructor(title, content, id) {
        this.title = title;
        this.content = content;
        this.id = new ObjectId(id);
    }

    static find = {
        all: async () => await database.schema.collection("posts").find({}).toArray(),
        byId: async id => database.schema.collection("posts").findOne({ _id: new ObjectId(id) })
    }

    static async findById(id) {
        return await database.schema.collection("posts").findOne({_id: new ObjectId(id)});
    }

    static async findAll() {
        return await database.schema.collection("posts").find({}).toArray();
    }

    static async delete(id) {
        await database.schema.collection("posts").deleteOne({ _id: id });
    }

    async save() {
        await database.schema.collection("posts").insertOne({ title: this.title, content: this.content });
    }

    async update() {
        await database.schema.collection("posts").updateOne({ _id: this.id }, { $set: this });
    }

    async delete() {
        await database.schema.collection("posts").deleteOne({ _id: this.id });
    }
}

module.exports = Post;