class Cart {
    constructor(items = []) {
        this.items = items;
        this.quantity = items.reduce((total, item) => total + item.quantity, 0) || 0;
        this.total = items.reduce((total, item) => total + item.total, 0) || 0;
    }

    manage = {
        add: product => {
            const index = this.items.findIndex(item => item.product.id === product.id);
            const item = this.items[index] || { product, quantity: 0, total: 0 };
            item.quantity ++;
            this.quantity ++;
            item.total += product.price;
            this.total += product.price;
            this.items[index] ? this.items[index] = item : this.items.push(item);
        },
        remove: (product) => {}
    }
}

module.exports = Cart;