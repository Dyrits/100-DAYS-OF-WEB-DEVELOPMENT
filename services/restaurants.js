const manager = require("../utilities/data-manager");

module.exports = {
    save(restaurant) { manager.write("restaurants.json", restaurant); },
    findAll() { return manager.read("restaurants.json"); },
    find(id) { return this.findAll().find(restaurant => restaurant.id === id);}
};