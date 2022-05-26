const Product = require('../models/product');

module.exports = {
    add: async ({ body, session }, response, next) => {
        const { cart } = response.locals;
        try {
            const { id } = body;
            const product = await Product.find(id);
            cart.manage.add(product);
            session.cart = cart;
            const { quantity } = cart;
            response.status(201).json({ message: "The product has been successfully added to the cart.", quantity });
        } catch (error) { next(error); }
    }
}