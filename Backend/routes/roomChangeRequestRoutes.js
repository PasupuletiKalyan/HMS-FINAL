const express = require("express");
const router = express.Router();
const RoomChangeRequest = require("../models/RoomChangeRequest");

// Submit a new room change request
router.post("/", async (req, res) => {
  try {
    const { 
      applicationNo, 
      studentName, 
      currentRoom, 
      reason, 
      preferredBlock, 
      additionalDetails,
      status,
      requestDate
    } = req.body;
    
    // Check if student already has a pending room change request
    const existingRequest = await RoomChangeRequest.findOne({ 
      applicationNo, 
      status: { $in: ['Pending', 'Processing'] }
    });
    
    if (existingRequest) {
      return res.status(400).json({ 
        success: false, 
        message: "You already have a pending room change request. Please wait for it to be processed." 
      });
    }
    
    const roomChangeRequest = new RoomChangeRequest({
      applicationNo,
      studentName,
      currentRoom,
      reason,
      preferredBlock: preferredBlock || "No preference",
      additionalDetails: additionalDetails || "",
      status: status || "Pending",
      requestDate: requestDate || new Date().toISOString().split('T')[0]
    });
    
    const savedRequest = await roomChangeRequest.save();
    res.status(201).json({ success: true, request: savedRequest });
  } catch (error) {
    console.error("Error saving room change request:", error);
    res.status(500).json({ success: false, message: "Error saving room change request", error: error.message });
  }
});

// Get all room change requests (for warden)
router.get("/", async (req, res) => {
  try {
    const requests = await RoomChangeRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching room change requests:", error);
    res.status(500).json({ success: false, message: "Error fetching room change requests", error: error.message });
  }
});

// Get room change requests by application number (for student)
router.get("/student/:applicationNo", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    const requests = await RoomChangeRequest.find({ applicationNo }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching student room change requests:", error);
    res.status(500).json({ success: false, message: "Error fetching student room change requests", error: error.message });
  }
});

// Update room change request status (for warden)
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, wardenResponse, newRoom } = req.body;
    
    const updates = { status };
    if (wardenResponse) updates.wardenResponse = wardenResponse;
    if (newRoom) updates.newRoom = newRoom;
    if (status === "Approved" || status === "Rejected") {
      updates.processedDate = new Date();
    }
    
    const updatedRequest = await RoomChangeRequest.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Room change request not found" });
    }
    
    res.status(200).json({ success: true, request: updatedRequest });
  } catch (error) {
    console.error("Error updating room change request:", error);
    res.status(500).json({ success: false, message: "Error updating room change request", error: error.message });
  }
});

// Delete room change request
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await RoomChangeRequest.findByIdAndDelete(id);
    
    if (!deletedRequest) {
      return res.status(404).json({ success: false, message: "Room change request not found" });
    }
    
    res.status(200).json({ success: true, message: "Room change request deleted successfully" });
  } catch (error) {
    console.error("Error deleting room change request:", error);
    res.status(500).json({ success: false, message: "Error deleting room change request", error: error.message });
  }
});

module.exports = router;
