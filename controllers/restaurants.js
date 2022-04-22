const UUID = require("uuid");

const $restaurants = require("../services/restaurants");

module.exports = {
    restaurants: {
        get: function({ query }, response) {
            const restaurants = $restaurants.findAll();
            const order = query.order || "ascending";
            restaurants.sort((restaurant$1, restaurant$2) => restaurant$1.name.localeCompare(restaurant$2.name));
            order === "descending" && restaurants.reverse();
            response.render("restaurants", { restaurants, order: order === "ascending" ? "descending" : "ascending" });
        },
        post: function({ body }, response) {
            $restaurants.save( {...body, id: UUID.v4()});
            response.redirect("/confirm");
        }
    },
    restaurant: {
        get: function({ params }, response) {
            const restaurant = $restaurants.find(params.id);
            response.render(restaurant ? "restaurant" : "404", restaurant ? { restaurant } : {});
        }
    }
}