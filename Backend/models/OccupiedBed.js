// HMS_SE/backend/models/OccupiedBed.js

const mongoose = require('mongoose');

const occupiedBedSchema = new mongoose.Schema({
  bedKey: {
    type: String,
    required: true,
    unique: true
  },
  block: {
    type: String,
    required: true
  },
  floor: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  bed: {
    type: String,
    required: true
  },
  occupiedBy: {
    type: String, // application number of the student
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

const OccupiedBed = mongoose.model('OccupiedBed', occupiedBedSchema);

module.exports = OccupiedBed;