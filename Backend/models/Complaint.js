const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    applicationNo: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    roomDetails: {
      block: String,
      floor: String,
      roomNumber: String,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Closed"],
      default: "Pending",
    },
    wardenResponse: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);