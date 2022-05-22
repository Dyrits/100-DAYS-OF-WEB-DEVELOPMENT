const Product = require('../models/product');

module.exports = {
    render: {
        products: async (request, response, next) => {
            try {
                const products = await Product.findAll();
                response.render("administration/products/products", {products});
            } catch (error) {
                next(error);
            }
        },
        create: (request, response) => {
            response.render("administration/products/create");
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
        }
    }
}