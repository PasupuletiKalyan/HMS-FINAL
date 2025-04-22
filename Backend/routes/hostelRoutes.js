// HMS_SE/backend/routes/hostelRoutes.js

const express = require('express');
const router = express.Router();
const hostelController = require('../controllers/hostelController');

// Get all hostels
router.get('/', hostelController.getAllHostels);

// Get single hostel by ID
router.get('/:id', hostelController.getHostelById);

// Add new hostel
router.post('/', hostelController.addHostel);

// Update hostel
router.put('/:id', hostelController.updateHostel);

// Delete hostel
router.delete('/:id', hostelController.deleteHostel);

module.exports = router;