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

// Room allotment by warden
router.post('/room-allotment', async (req, res) => {
  try {
    const { studentId, block, roomNumber, bed, reason } = req.body;
    const wardenId = req.user.id; // Assuming you have authentication middleware

    // Import models inside the route handler to prevent overwrite errors
    const User = require('../models/user');
    // Use OccupiedBed model instead of the missing Booking model
    const OccupiedBed = require('../models/OccupiedBed');

    // Find the student
    const student = await User.findOne({ applicationNo: studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if room is available
    const existingBooking = await OccupiedBed.findOne({
      block,
      roomNumber,
      bed,
      status: 'active'
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room/bed is already occupied' });
    }

    // Create new booking using the OccupiedBed model instead
    const booking = new OccupiedBed({
      userId: student._id,
      applicationNumber: studentId,
      block,
      roomNumber,
      bed,
      allottedBy: wardenId,
      allotmentReason: reason || 'Allotted by warden',
      date: new Date(),
      status: 'active'
    });

    await booking.save();

    res.status(201).json({ message: 'Room allotted successfully', booking });
  } catch (error) {
    console.error('Error in room allotment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Statistics routes
router.get('/statistics/all', hostelController.getHostelStatistics);

module.exports = router;