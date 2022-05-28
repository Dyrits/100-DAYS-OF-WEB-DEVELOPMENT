const Order = require("../models/Order");
const User = require("../models/User");

module.exports = {
    render: {
        order: (request, response) => { response.render("customers/orders/orders"); }
    },
    create: async ({ session }, response, next) => {
        try {
            const { cart } = response.locals;
            const { id } = response.locals.user;
            const user = await User.find.id(id);
            const order = new Order(cart, user);
            await order.save();
            session.cart = null;
            response.redirect("/orders");
        } catch (error) { next(error); }
    }
}