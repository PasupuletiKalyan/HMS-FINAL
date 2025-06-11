const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

const blockSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Boys', 'Girls']
  },
  floors: [floorSchema]
});

const blockAvailabilitySchema = new mongoose.Schema({
  blocks: [blockSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('BlockAvailability', blockAvailabilitySchema);