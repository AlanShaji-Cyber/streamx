const db = require("../config/db");

const createUser = (username, email, password, role, callback) => {
    const sql =
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(sql, [username, email, password, role], callback);
};

module.exports = {
    createUser,
};