const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['urgent', 'info', 'maintenance', 'event'],
    default: 'info'
  },
  icon: {
    type: String,
    default: 'fa-info-circle'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Announcement", announcementSchema);