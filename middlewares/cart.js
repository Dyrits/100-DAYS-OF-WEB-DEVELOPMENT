const Cart = require("../models/Cart");

module.exports = async ({session}, response, next) => {
    const cart = session.cart ? new Cart(session.cart.items) : new Cart();
    await cart.update.prices();
    response.locals.cart = cart;
    next();
}