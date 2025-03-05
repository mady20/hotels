const express = require('express');
const router = express.Router();

const { getBookings,
    addBooking,
    searchBookings,
    getBooking,
    updateBooking,
    deleteBooking, } = require('../controllers/bookingController');

// Routes for bookings
router.route('/')
    .get(getBookings) // Get all bookings
    .post(addBooking); // Add a new booking

router.route('/search')
    .post(searchBookings); // Search bookings

router.route('/:id')
    .get(getBooking) // Get a specific booking
    .put(updateBooking) // Update a specific booking
    .delete(deleteBooking); // Delete a specific booking



module.exports = router;