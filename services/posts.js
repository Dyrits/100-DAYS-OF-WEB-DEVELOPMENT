const database = require("../data/database");

const {ObjectId} = require("mongodb");

module.exports = {
    findById: async (id) => await database.schema.collection("posts").findOne({ _id: new ObjectId(id) }),
    findAll : async () => await database.schema.collection("posts").find({}).toArray(),
    save: async (post) => await database.schema.collection("posts").insertOne(post),
    update: async (id, post) => await database.schema.collection("posts").updateOne({ _id: new ObjectId(id) }, { $set: post }),
    delete: async (id) => await database.schema.collection("posts").deleteOne({ _id: new ObjectId(id) }),
}