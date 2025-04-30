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