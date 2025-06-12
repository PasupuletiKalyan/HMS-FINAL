const express = require('express');
const router = express.Router();
const roomSearchController = require('../controllers/roomSearchController');

// Route to get room occupants
router.get('/room-occupants', roomSearchController.getRoomOccupants);

module.exports = router;
