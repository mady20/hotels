const express = require('express');
const router = express.Router();

const { getHotels,
    getHotel,
    addHotel,
    updateHotel,
    deleteHotel,
    getRooms,
    getRoom,
    addRoom,
    updateRoom,
    deleteRoom } = require('../controllers/hotelController');



router.route('/')
    .get(getHotels)
    .post( addHotel);

router.route('/:id')
    .get(getHotel)
    .put(updateHotel)
    .delete(deleteHotel);

// Routes for rooms
router.route('/:hotelId/rooms')
    .get(getRooms)
    .post(addRoom);

router.route('/:hotelId/rooms/:roomId')
    .get(getRoom)
    .put(updateRoom)
    .delete(deleteRoom);

module.exports = router;
