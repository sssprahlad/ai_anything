const db = require('../config/database');

module.exports = {
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.get(query, [email], callback);
    },
    createUser: (userData, callback) => {
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.run(query, [userData.email, userData.password], callback);
    }
};

