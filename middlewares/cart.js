const Cart = require("../models/Cart");

module.exports = ({ session }, response, next) => {
    response.locals.cart = session.cart ? new Cart(session.cart.items) : new Cart();
    next();
}