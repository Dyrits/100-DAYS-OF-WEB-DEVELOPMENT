const Product = require('../models/Product');

class Cart {
    constructor (items = []) {
        this.items = items;
        this.quantity = items.reduce((total, item) => total + item.quantity, 0) || 0;
        this.total = items.reduce((total, item) => total + item.total, 0) || 0;
    }

    add (product) {
        const index = this.items.findIndex(item => item.product.id === product.id);
        const item = this.items[index] || { product, quantity: 0, total: 0 };
        item.quantity ++;
        this.quantity ++;
        item.total += product.price;
        this.total += product.price;
        this.items[index] ? this.items[index] = item : this.items.push(item);
    };

    update = {
        quantity: (id, quantity) => {
            if (!isNaN(quantity)) {
                quantity = Number(quantity) < 0 ? 0 : Number(quantity);
                const index = this.items.findIndex(item => item.product.id === id);
                const item = this.items[index];
                this.quantity = this.quantity - item.quantity + quantity;
                this.total = this.total - item.total + item.product.price * quantity;
                item.total = item.product.price * quantity;
                quantity ? item.quantity = quantity : this.items.splice(index, 1);
                return item.total;
            }
        },
        prices: async () => {
            const identifiers = this.items.map(item => item.product.id);
            const products = await Product.find.identifiers(identifiers);
            this.items = this.items.reduce((items, item) => {
                const product = products.find(product => product.id === item.product.id);
                if (product) {
                    item.product = product;
                    item.total = item.product.price * item.quantity;
                    items.push(item);
                }
                return items;
            }, []);
            this.total = this.items.reduce((total, item) => total + item.total, 0);
            this.quantity = this.items.reduce((total, item) => total + item.quantity, 0);
        }
    }
}

module.exports = Cart;