const database = require("../data/database");

const url = "/assets/products/images";

class Product {
    constructor(title, file, summary, price, description) {
        this.title = title;
        this.image = {
            name: file.filename,
            path: `${file.destination}/${file.filename}`,
            url: `${url}/${file.filename}`
        }
        this.summary = summary;
        this.price = Number(price);
        this.description = description;
    }

    async save() { await database.schema.collection("products").insertOne(this); }

    static async findAll() {
        const products = await database.schema.collection("products").find({}).toArray();
        return products.map(product => ({...product, id: product._id.toString()}));
    }
}

module.exports = Product;