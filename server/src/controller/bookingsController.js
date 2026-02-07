const bookingsModel = require('../models/bookingsModel');

exports.booking = async (req, res) => {
    console.log(req.body);
    const { saloon_id, user_id, saloon_name, booking_date, booking_time, customer_name, age, customer_phone } = req.body;
    if (!saloon_id || !user_id || !saloon_name || !booking_date || !booking_time || !customer_name || !age || !customer_phone) {
        return res.status(400).json({ status: 400, message: 'All fields are required' });
    }

    try {
        bookingsModel.bookingsDetails(req.body, (err, booking) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ status: 200, message: 'Booking created successfully', booking });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = bookingsModel.getBookings(req.params.id, (err, bookings) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ status: 200, message: 'Bookings fetched successfully', bookings });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.myBookings = async (req, res) => {
    const userId = req.params.id;
    try {
        bookingsModel.myBookings(userId, (err, myBookingsList) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ status: 200, message: 'MyBookings fetched successfully', myBookingsList });
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const bookingData = req.body;
        console.log(bookingData);

        bookingsModel.updateBooking(bookingId, bookingData, (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ status: 200, message: 'Booking updated successfully', result });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        bookingsModel.deleteBooking(bookingId, (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ status: 200, message: 'Booking deleted successfully', result });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   