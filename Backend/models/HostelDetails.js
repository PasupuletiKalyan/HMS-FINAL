const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema({
  floorNumber: String,
  totalRooms: Number,
  totalBeds: Number,
  warden: Number,
  staff: Number,
  hk: Number,
  guest: Number,
  others: Number,
  totalNSBeds: Number,
  studentBedsAvailable: Number,
  occupiedBeds: Number,
  emptyBeds: Number,
});

const hostelDetailsSchema = new mongoose.Schema({
  type: { type: String, required: true },
  blockName: { type: String, required: true },
  totalRooms: Number,
  totalBeds: Number,
  warden: Number,
  staff: Number,
  hk: Number,
  guest: Number,
  others: Number,
  totalNSBeds: Number,
  studentBedsAvailable: Number,
  occupiedBeds: Number,
  emptyBeds: Number,
  floors: [floorSchema],
  totals: floorSchema,
});

module.exports = mongoose.model("HostelDetails", hostelDetailsSchema);
