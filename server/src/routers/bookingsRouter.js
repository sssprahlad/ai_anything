const express = require('express');
const router = express.Router();
const bookingsController = require('../controller/bookingsController');

router.post('/saloons/:id/bookings', bookingsController.booking);
router.get('/saloons/:id/bookings', bookingsController.getBookings);
router.get('/my-bookings/:id/user', bookingsController.myBookings);
router.patch('/my-bookings/:id', bookingsController.updateBooking);
router.delete('/my-bookings/:id', bookingsController.deleteBooking);


module.exports = router;