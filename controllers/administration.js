module.exports = {
    render: {
        products: (request, response) => {
            response.render("administration/products/products");
        },
        create: (request, response) => {
            response.render("administration/products/create");
        },
        orders: (request, response) => {
            response.render("administration/orders");
        }
    },
    $products: {
        create: (request, response) => {}
    }
}