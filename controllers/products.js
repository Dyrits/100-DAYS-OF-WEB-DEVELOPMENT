const Product = require('../models/Product');

module.exports = {
    render: {
        products: async ({ session }, response, next) => {
            if (session.administrator) { return response.redirect("/administration/products"); }
            try {
                const products = await Product.findAll();
                response.render("customers/products/products", {products});
            } catch (error) { next(error); }
        },
        product: async({ session, params }, response, next) => {
            const { id } = params;
            if (session.administrator) { return response.redirect(`/administration/products/${id}`); }
            try {
                const product = await Product.find(id);
                response.render("customers/products/product", { product} );
            } catch (error) { next(error); }
        }
    },
}