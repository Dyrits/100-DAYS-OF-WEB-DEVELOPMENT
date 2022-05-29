const { ObjectId } = require("mongodb");

const database = require("../data/database");

const url = "/assets/products/images";

class Product {
    constructor (title, file, summary, price, description) {
        this.title = title;
        if (file) {
            this.image = {
                name: file.filename,
                path: `${file.destination}/${file.filename}`,
                url: `${url}/${file.filename}`
            };
        }
        this.summary = summary;
        this.price = Number(price);
        this.description = description;
    }

    async save (id) {
        if (id) { await database.schema.collection("products").updateOne({ _id: ObjectId(id) }, { $set: this }); }
        else { await database.schema.collection("products").insertOne(this); }
    }

    static find = {
        identifier: async (id) => {
            try {
                const product = await database.schema.collection("products").findOne({ _id: ObjectId(id) });
                if (!product) { throw new Error("Could not find a product with the provided identifier!"); }
                product.id = product._id.toString();
                return product;
            } catch(error) {
                error.status = 404;
                throw error;
            }
        },
        identifiers: async (identifiers) => {
            const products = await database.schema.collection("products").find({ _id: { $in: identifiers.map(id => ObjectId(id)) } }).toArray();
            return products.map(product => ({...product, id: product._id.toString()}));
        },
        all: async () => {
            const products = await database.schema.collection("products").find({}).toArray();
            return products.map(product => ({...product, id: product._id.toString()}));
        }
    }

    static async delete (id) { await database.schema.collection("products").deleteOne({ _id: ObjectId(id) }); }

    static mock = () => ({ title: null, image: null, summary: null, price: null, description: null })
}

module.exports = Product;