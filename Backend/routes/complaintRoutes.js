const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// Submit a new complaint
router.post("/", async (req, res) => {
  try {
    const { 
      applicationNo, 
      studentName, 
      subject, 
      description, 
      priority, 
      roomDetails, 
      status 
    } = req.body;
    
    const complaint = new Complaint({
      applicationNo,
      studentName,
      subject,
      description,
      priority,
      roomDetails,
      status
    });
    
    const savedComplaint = await complaint.save();
    res.status(201).json({ success: true, complaint: savedComplaint });
  } catch (error) {
    console.error("Error saving complaint:", error);
    res.status(500).json({ success: false, message: "Error saving complaint", error: error.message });
  }
});

// Get all complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ success: false, message: "Error fetching complaints", error: error.message });
  }
});

// Get complaints by application number (for student)
router.get("/student/:applicationNo", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    const complaints = await Complaint.find({ applicationNo }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("Error fetching student complaints:", error);
    res.status(500).json({ success: false, message: "Error fetching student complaints", error: error.message });
  }
});

// Update complaint status (for warden)
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, wardenResponse } = req.body;
    
    const updates = { status };
    if (wardenResponse) updates.wardenResponse = wardenResponse;
    if (status === "Resolved" || status === "Closed") updates.completedAt = new Date();
    
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!updatedComplaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }
    
    res.status(200).json({ success: true, complaint: updatedComplaint });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ success: false, message: "Error updating complaint", error: error.message });
  }
});

module.exports = router;