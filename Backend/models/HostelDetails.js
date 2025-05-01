const mongoose = require('mongoose');

// Define floor schema for nested documents
const floorSchema = new mongoose.Schema({
  floorNumber: { type: String, required: true },
  totalRooms: { type: Number, required: true },
  totalBeds: { type: Number, required: true },
  studentBedsAvailable: { type: Number, required: true },
  warden: { type: Number, default: 0 },
  staff: { type: Number, default: 0 },
  hk: { type: Number, default: 0 },
  guest: { type: Number, default: 0 },
  others: { type: Number, default: 0 }
});

// Main hostel details schema
const hostelDetailsSchema = new mongoose.Schema({
  blockName: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['Boys', 'Girls'] },
  totalRooms: { type: Number, required: true },
  totalBeds: { type: Number, required: true },
  studentBedsAvailable: { type: Number, required: true },
  floors: [floorSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Pre-save hook to update timestamps
hostelDetailsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const HostelDetails = mongoose.model('HostelDetails', hostelDetailsSchema);

module.exports = HostelDetails;
