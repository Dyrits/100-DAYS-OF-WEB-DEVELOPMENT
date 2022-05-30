require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const URLs = {
    success: process.env.NODE_ENV === "production" ? `${process.env.APP_URL}/orders/success` : "http://localhost:3000/orders/success",
    cancel: process.env.NODE_ENV === "production" ? `${process.env.APP_URL}/orders/failure` : "http://localhost:3000/orders/failure",
}

module.exports = {
    checkout: async (cart) => await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cart.items.map(item => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: { name: item.product.title },
                    unit_amount: item.product.price.toFixed(2) * 100,
                },
                quantity: item.quantity,
            }
        }),
        mode: "payment",
        success_url: URLs.success,
        cancel_url: URLs.cancel,
    })
}


