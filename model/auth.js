var config = require("../config"),
    pgp = require('pg-promise')();

function do_auth(username, password) {
    var db = pgp(config.db.connectionString);

    return db.one('SELECT * FROM users WHERE name = $1 AND password = $2', [username, password]);
}

module.exports = do_auth;