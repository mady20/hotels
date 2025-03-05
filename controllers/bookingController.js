const asyncHandler = require("express-async-handler");
const { readUsersData, writeUsersData } = require('../utils/utils');

// Helper function to get all bookings from all users
const getAllBookings = (users) => {
    return users.flatMap((user) => user.bookings || []);
};

// Search bookings
const searchBookings = asyncHandler(async (req, res) => {
    const users = readUsersData();
    const { query } = req.body;

    const bookings = getAllBookings(users);
    const filteredBookings = bookings.filter((booking) => {
        return Object.keys(query).every((key) => booking[key] === query[key]);
    });

    res.json(filteredBookings);
});

// Get all bookings
const getBookings = asyncHandler(async (req, res) => {
    const users = readUsersData();
    const user = users.find((user) => user.id === req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const bookings = user.bookings || [];
    res.status(200).json(bookings);
});

// Get a specific booking
const getBooking = asyncHandler(async (req, res) => {
    const users = readUsersData();
    const user = users.find((user) => user.id === req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const { id } = req.params;
    const booking = user.bookings.find((booking) => booking.booking_id === id);
    if (!booking) {
        res.status(404);
        throw new Error("Booking not found");
    }

    res.status(200).json(booking);
});

// Add a new booking
const addBooking = asyncHandler(async (req, res) => {
    const users = readUsersData();
    const { check_in, check_out, room_type, price } = req.body;
    if (!check_in || !check_out || !room_type || !price) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = users.find((user) => user.id === req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const booking = {
        booking_id: Date.now().toString(),
        check_in,
        check_out,
        room_type,
        price,
    };

    user.bookings = user.bookings || [];
    user.bookings.push(booking);
    writeUsersData(users);

    res.status(201).json(booking);
});

// Update a specific booking
const updateBooking = asyncHandler(async (req, res) => {
    const users = readUsersData();
    const user = users.find((user) => user.id === req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const { id } = req.params;
    const updatedBooking = req.body;

    const bookingIndex = user.bookings.findIndex((booking) => booking.booking_id === id);
    if (bookingIndex === -1) {
        res.status(404);
        throw new Error("Booking not found");
    }

    user.bookings[bookingIndex] = {
        ...user.bookings[bookingIndex],
        ...updatedBooking,
    };

    writeUsersData(users);
    res.status(200).json(user.bookings[bookingIndex]);
});

// Delete a specific booking
const deleteBooking = asyncHandler(async (req, res) => {
    const users = readUsersData();
    const user = users.find((user) => user.id === req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const { id } = req.params;

    const bookingIndex = user.bookings.findIndex((booking) => booking.booking_id === id);
    if (bookingIndex === -1) {
        res.status(404);
        throw new Error("Booking not found");
    }

    user.bookings.splice(bookingIndex, 1);
    writeUsersData(users);
    res.status(200).json({ message: "Booking removed" });
});

module.exports = {
    getBookings,
    addBooking,
    searchBookings,
    getBooking,
    updateBooking,
    deleteBooking,
};
