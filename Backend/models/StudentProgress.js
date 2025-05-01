const mongoose = require("mongoose");

const studentProgressSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
    unique: true
  },
  formCompleted: {
    type: Boolean,
    default: false
  },
  paymentCompleted: {
    type: Boolean,
    default: false
  },
  roomBooked: {
    type: Boolean,
    default: false
  },
  bookingDetails: {
    block: String,
    floor: String,
    roomNumber: String,
    bed: String,
    roomKey: String,
    bookingDate: {
      type: Date,
      default: Date.now
    }
  },
  completedSteps: {
    type: [Number],
    default: []
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("StudentProgress", studentProgressSchema);