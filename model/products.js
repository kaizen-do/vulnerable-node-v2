var config = require("../config"),
    pgp = require('pg-promise')(),
    db = pgp(config.db.connectionString);

function list_products() {
    
    var q = "SELECT * FROM products;";

    return db.many(q);
}

function getProduct(product_id) {

    return db.one('SELECT * FROM products WHERE id = $1', [product_id]);
}

function search(query) {

    return db.many('SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1', ['%' + query + '%']);

}

function purchase(cart) {

    return db.one('INSERT INTO purchases(mail, product_name, user_name, product_id, address, phone, ship_date, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [cart.mail, cart.product_name, cart.username, cart.product_id, cart.address, cart.ship_date, cart.phone, cart.price]);

}

function get_purcharsed(username) {

    return db.many('SELECT * FROM purchases WHERE user_name = $1', [username]);

}

var actions = {
    "list": list_products,
    "getProduct": getProduct,
    "search": search,
    "purchase": purchase,
    "getPurchased": get_purcharsed
}

module.exports = actions;
