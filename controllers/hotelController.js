const asyncHandler = require("express-async-handler");
const { readHotelsData, writeHotelsData } = require('../utils/utils');

// @desc Get all hotels
// @route GET /api/hotels
// @access Public
const getHotels = asyncHandler(async (req, res) => {
    const hotels = await readHotelsData();
    res.json(hotels);
});

// @desc Get a specific hotel
// @route GET /api/hotels/:id
// @access Public
const getHotel = asyncHandler(async (req, res) => {
    const hotelId = parseInt(req.params.id);
    const hotels = await readHotelsData();
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
        res.json(hotel);
    } else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});

// @desc Add a new hotel
// @route POST /api/hotels
// @access Private
const addHotel = asyncHandler(async (req, res) => {
    const newHotel = req.body;
    const hotels = await readHotelsData();
    newHotel.id = hotels.length ? hotels[hotels.length - 1].id + 1 : 1;
    hotels.push(newHotel);
    await writeHotelsData(hotels);
    res.status(201).json(newHotel);
});

// @desc Update a specific hotel
// @route PUT /api/hotels/:id
// @access Private
const updateHotel = asyncHandler(async (req, res) => {
    const hotelId = parseInt(req.params.id);
    const updatedHotel = req.body;
    const hotels = await readHotelsData();
    const index = hotels.findIndex(h => h.id === hotelId);
    if (index !== -1) {
        hotels[index] = { ...hotels[index], ...updatedHotel };
        await writeHotelsData(hotels);
        res.json(hotels[index]);
    } else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});

// @desc Delete a specific hotel
// @route DELETE /api/hotels/:id
// @access Private
const deleteHotel = asyncHandler(async (req, res) => {
    const hotelId = parseInt(req.params.id);
    const hotels = await readHotelsData();
    const index = hotels.findIndex(h => h.id === hotelId);
    if (index !== -1) {
        hotels.splice(index, 1);
        await writeHotelsData(hotels);
        res.json({ message: 'Hotel deleted' });
    } else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});

// @desc Get all rooms for a specific hotel
// @route GET /api/hotels/:hotelId/rooms
// @access Public
const getRooms = asyncHandler(async (req, res) => {
    const hotelId = parseInt(req.params.hotelId);
    const hotels = await readHotelsData();
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
        res.json(hotel.rooms);
    } else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});

// @desc Get a specific room in a specific hotel
// @route GET /api/hotels/:hotelId/rooms/:roomId
// @access Public
const getRoom = asyncHandler(async (req, res) => {
    const { hotelId, roomId } = req.params;
    const hotels = await readHotelsData();
    const hotel = hotels.find(h => h.id === parseInt(hotelId));
    if (hotel) {
        const room = hotel.rooms.find(r => r.id === parseInt(roomId));
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});

// @desc Add a new room to a specific hotel
// @route POST /api/hotels/:hotelId/rooms
// @access Private
const addRoom = asyncHandler(async (req, res) => {
    const hotelId = parseInt(req.params.hotelId);
    const newRoom = req.body;
    const hotels = await readHotelsData();
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
        hotel.rooms.push(newRoom);
        await writeHotelsData(hotels);
        res.status(201).json(newRoom);
    } else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});

// @desc Update a specific room in a specific hotel
// @route PUT /api/hotels/:hotelId/rooms/:roomId
// @access Private
const updateRoom = asyncHandler(async (req, res) => {
    const { hotelId, roomId } = req.params;
    const updatedRoom = req.body;
    const hotels = await readHotelsData();
    const hotel = hotels.find(h => h.id === parseInt(hotelId));
    if (hotel) {
        const index = hotel.rooms.findIndex(r => r.id === roomId);
        if (index !== -1) {
            hotel.rooms[index] = { ...hotel.rooms[index], ...updatedRoom };
            await writeHotelsData(hotels);
            res.json(hotel.rooms[index]);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});

// @desc Delete a specific room in a specific hotel
// @route DELETE /api/hotels/:hotelId/rooms/:roomId
// @access Private
const deleteRoom = asyncHandler(async (req, res) => {
    const { hotelId, roomId } = req.params;
    const hotels = await readHotelsData();
    const hotel = hotels.find(h => h.id === parseInt(hotelId));
    if (hotel) {
        const index = hotel.rooms.findIndex(r => r.id === roomId);
        if (index !== -1) {
            hotel.rooms.splice(index, 1);
            await writeHotelsData(hotels);
            res.json({ message: 'Room deleted' });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});

module.exports = {
    getHotels,
    getHotel,
    addHotel,
    updateHotel,
    deleteHotel,
    getRooms,
    getRoom,
    addRoom,
    updateRoom,
    deleteRoom
};