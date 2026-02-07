const db = require('../config/database');

module.exports = {

    bookingsDetails: (booking, callback) => {
        const query = 'INSERT INTO bookings (saloon_id, user_id, saloon_name, booking_date, booking_time, customer_name, age, customer_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(query, [booking.saloon_id, booking.user_id, booking.saloon_name, booking.booking_date, booking.booking_time, booking.customer_name, booking.age, booking.customer_phone], callback);
    },
    getBookings: (id, callback) => {
        const query = 'SELECT * FROM bookings WHERE saloon_id = ?';
        db.all(query, [id], callback);
    },
    myBookings: (userId, callback) => {
        const query = 'SELECT * FROM bookings WHERE user_id = ?';
        db.all(query, [userId], callback);
    },
    updateBooking: (id, bookingData, callback) => {
        const query = 'UPDATE bookings SET saloon_name = ?, booking_date = ?, booking_time = ?, customer_name = ?, age = ?, customer_phone = ? WHERE id = ?';
        db.run(query, [bookingData.saloon_name, bookingData.booking_date, bookingData.booking_time, bookingData.customer_name, bookingData.age, bookingData.customer_phone, id], callback);
    },
    deleteBooking: (id, callback) => {
        const query = 'DELETE FROM bookings WHERE id = ?';
        db.run(query, [id], callback);
    }

};