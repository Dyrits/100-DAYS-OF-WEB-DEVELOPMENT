const Order = require("../models/Order");
const User = require("../models/User");

module.exports = {
    render: {
        orders: async (request, response, next) => {
            try {
                const { id } = response.locals.user;
                const orders = await Order.find.user(id);
                response.render("customers/orders/orders", { orders });
            } catch (error) { next(error); }
        },
    },
    create: async ({ session }, response, next) => {
        try {
            const { cart } = response.locals;
            const { id } = response.locals.user;
            const user = await User.find.identifier(id);
            const order = new Order(cart, user);
            await order.save();
            session.cart = null;
            response.redirect("/orders");
        } catch (error) { next(error); }
    },
}