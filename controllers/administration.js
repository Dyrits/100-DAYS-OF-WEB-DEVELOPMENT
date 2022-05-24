const Product = require('../models/product');

module.exports = {
    render: {
        products: async (request, response, next) => {
            try {
                const products = await Product.findAll();
                response.render("administration/products/products", { products });
            } catch (error) { next(error); }
        },
        create: (request, response) => {
            const product = Product.mock();
            response.render("administration/products/create", {  product });
        },
        update: async ({ params }, response, next) => {
            try {
                const { id } = params;
                const product = await Product.find(id);
                response.render("administration/products/update", { product });
            } catch (error) { next(error); }
        },
        orders: (request, response) => {
            response.render("administration/orders");
        }
    },
    $products: {
        create: async ({ body, file }, response, next) => {
            try {
                const { title, summary, price, description } = body;
                const image = file.filename;
                const product = new Product(title, file, summary, price, description);
                await product.save();
                response.redirect("/administration/products");
            } catch (error) { next(error); }
        },
        update: async ({ body, params, file }, response, next) => {
            try {
                const { title, summary, price, description } = body;
                const product = new Product(title, file, summary, price, description);
                const { id } = params;
                await product.save(id);
                response.redirect("/administration/products");
            } catch (error) { next(error); }
        },
        delete: async ({ params }, response, next) => {
            try {
                const { id } = params;
                await Product.delete(id);
                response.json({ message: "The product has been successfully deleted." });
            } catch (error) { next(error); }
        }
    }
}