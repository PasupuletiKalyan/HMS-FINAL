// HMS_SE/backend/models/Hostel.js

const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String,
  capacity: Number,
  occupancy: {
    type: Number,
    default: 0 // Initialize occupancy to 0
  },
  price: Number,
  amenities: [String] // Array of strings for amenities
});

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;