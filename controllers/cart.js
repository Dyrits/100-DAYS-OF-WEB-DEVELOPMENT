const Product = require('../models/product');

module.exports = {
    render: {
        cart: (request, response) => { response.render("customers/cart/cart"); }
    },
    add: async ({ body, session }, response, next) => {
        const { cart } = response.locals;
        try {
            const { id } = body;
            const product = await Product.find(id);
            cart.add(product);
            session.cart = cart;
            const { quantity } = cart;
            response.status(201).json({ message: "The product has been successfully added to the cart.", quantity });
        } catch (error) { next(error); }
    },
    update: async ({ body, session }, response, next) => {
        const { cart } = response.locals;
        try {
            const { id, quantity } = body;
            const total = cart.update(id, quantity);
            session.cart = cart;
            response.status(200).json({
                message: "The product has been successfully updated.",
                cart: { total: cart.total, quantity: cart.quantity },
                total
            });
        } catch (error) { next(error); }
    }
}