const Product = require('../models/Product');
const Order = require('../models/Order');

module.exports = {
    render: {
        products: async (request, response, next) => {
            try {
                const products = await Product.find.all();
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
                const product = await Product.find.identifier(id);
                response.render("administration/products/update", { product });
            } catch (error) { next(error); }
        },
        orders: async (request, response) => {
            const orders = await Order.find.all();
            response.render("administration/orders/orders", {orders});
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
                response.status(204).json({ message: "The product has been successfully deleted." });
            } catch (error) { next(error); }
        }
    },
    $orders: {
        update: async ({ params, body }, response, next) => {
            try {
                const { status } = body;
                const { id } = params;
                await Order.update(id, status);
                response.status(200).json({ message: "The order has been successfully updated.", status });
            } catch (error) { next(error); }
        }
    }
}