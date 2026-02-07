const db = require('../config/database');

module.exports = {
    getAllSaloons: (callback) => {
        const query = 'SELECT * FROM saloons';
        db.all(query, callback);
    },

    getSaloonsById: (id, callback) => {
        const query = 'SELECT * FROM saloons WHERE id = ?';
        db.get(query, [id], callback);
    },

    createSaloon: (saloonData, callback) => {
        const query = 'INSERT INTO saloons (name, address, phone, email, description, timings, rating, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(query, [saloonData.name, saloonData.address, saloonData.phone, saloonData.email, saloonData.description, saloonData.timings, saloonData.rating, saloonData.created_at, saloonData.updated_at], callback);
    },
    
    updateSaloon: (id, saloonData, callback) => {
        const query = 'UPDATE saloons SET name = ?, address = ?, phone = ?, email = ?, description = ?, timings = ?, rating = ?, updated_at = ? WHERE id = ?';
        db.run(query, [saloonData.name, saloonData.address, saloonData.phone, saloonData.email, saloonData.description, saloonData.timings, saloonData.rating, saloonData.updated_at, id], callback);
    },

    deleteSaloon: (id, callback) => {
        const query = 'DELETE FROM saloons WHERE id = ?';
        db.run(query, [id], callback);
    }
};

