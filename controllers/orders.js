const Order = require("../models/Order");
const User = require("../models/User");
const stripe = require("../services/stripe");

module.exports = {
    render: {
        orders: async (request, response, next) => {
            try {
                const { id } = response.locals.user;
                const orders = await Order.find.user(id);
                response.render("customers/orders/orders", { orders });
            } catch (error) { next(error); }
        },
        success: async (request, response, next) => { response.render("customers/orders/success"); },
        failure: async (request, response, next) => { response.render("customers/orders/failure"); }
    },
    create: async ({ session }, response, next) => {
        try {
            const { cart } = response.locals;
            const { id } = response.locals.user;
            const user = await User.find.identifier(id);
            const order = new Order(cart, user);
            await order.save();
            session.cart = null;
            const checkout = await stripe.checkout(cart);
            response.redirect(303, checkout.url);
        } catch (error) { next(error); }
    },
}