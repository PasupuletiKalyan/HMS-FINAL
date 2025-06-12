const mongoose = require("mongoose");

const RoomChangeRequestSchema = new mongoose.Schema(
  {
    applicationNo: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    currentRoom: {
      block: { type: String, required: true },
      floor: { type: String, required: true },
      roomNumber: { type: String, required: true },
      bed: { type: String, required: true },
    },
    reason: {
      type: String,
      required: true,
    },
    preferredBlock: {
      type: String,
      default: "No preference",
    },
    additionalDetails: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Processing"],
      default: "Pending",
    },
    wardenResponse: {
      type: String,
      default: "",
    },
    requestDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    processedDate: {
      type: Date,
    },
    newRoom: {
      block: String,
      floor: String,
      roomNumber: String,
      bed: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RoomChangeRequest", RoomChangeRequestSchema);
