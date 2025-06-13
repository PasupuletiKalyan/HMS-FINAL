// HMS_SE/backend/routes/occupiedBedRoutes.js

const express = require("express");
const router = express.Router();
const OccupiedBed = require("../models/OccupiedBed");
const hostelController = require('../controllers/hostelController');

// Get all occupied beds
router.get("/", async (req, res) => {
  try {
    const occupiedBeds = await OccupiedBed.find({});
    
    // Convert to a format that's easy to use in the frontend (for HostelFloorPlanViewer)
    const bedsMap = {};
    occupiedBeds.forEach(bed => {
      bedsMap[bed.bedKey] = true;
    });
    
    res.status(200).json({ 
      success: true, 
      occupiedBeds: bedsMap,       // For HostelFloorPlanViewer (object format)
      occupiedBedsArray: occupiedBeds, // For AdminOverview (array format)
      bedDetails: occupiedBeds     // Full details
    });
  } catch (error) {
    console.error("Error getting occupied beds:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to get occupied beds" 
    });
  }
});

// Mark a bed as occupied
router.post("/", async (req, res) => {
  try {
    const { bedKey, block, floor, roomNumber, bed, applicationNo } = req.body;
    
    // Check if the bed is already occupied
    const existingBed = await OccupiedBed.findOne({ bedKey });
    if (existingBed) {
      return res.status(400).json({
        success: false,
        message: "This bed is already occupied"
      });
    }
    
    // Create new occupied bed record
    const occupiedBed = new OccupiedBed({
      bedKey,
      block,
      floor,
      roomNumber,
      bed,
      occupiedBy: applicationNo
    });
    
    await occupiedBed.save();
    
    // Update hostel statistics
    await hostelController.updateHostelStatistics({
      block,
      floor,
      roomNumber,
      bed
    });
    
    res.status(201).json({ 
      success: true, 
      occupiedBed 
    });
  } catch (error) {
    console.error("Error marking bed as occupied:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to mark bed as occupied" 
    });
  }
});

// Get bed occupied by specific student
router.get("/student/:applicationNo", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    const occupiedBed = await OccupiedBed.findOne({ occupiedBy: applicationNo });
    
    if (occupiedBed) {
      res.status(200).json({ 
        success: true, 
        occupiedBed 
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: "No occupied bed found for this student" 
      });
    }
  } catch (error) {
    console.error("Error getting student's occupied bed:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to get student's occupied bed" 
    });
  }
});

// Release a bed (mark as unoccupied)
router.delete("/:bedKey", async (req, res) => {
  try {
    const { bedKey } = req.params;
    
    // Get the bed details before deleting
    const bedToDelete = await OccupiedBed.findOne({ bedKey });
    
    if (!bedToDelete) {
      return res.status(404).json({
        success: false,
        message: "Bed not found or already unoccupied"
      });
    }
    
    const result = await OccupiedBed.deleteOne({ bedKey });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Bed not found or already unoccupied"
      });
    }
    
    // Update hostel statistics
    await hostelController.updateHostelStatistics({
      block: bedToDelete.block,
      floor: bedToDelete.floor,
      roomNumber: bedToDelete.roomNumber,
      bed: bedToDelete.bed
    });
    
    res.status(200).json({ 
      success: true, 
      message: "Bed released successfully" 
    });
  } catch (error) {
    console.error("Error releasing bed:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to release bed" 
    });
  }
});

// Release all beds (for admin use/testing)
router.delete("/", async (req, res) => {
  try {
    // Get all occupied beds before deleting
    const allBeds = await OccupiedBed.find({});
    
    const result = await OccupiedBed.deleteMany({});
    
    // No need to update statistics individually as we'll calculate stats on-demand
    
    res.status(200).json({ 
      success: true, 
      message: `Released ${result.deletedCount} beds` 
    });
  } catch (error) {
    console.error("Error releasing all beds:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to release all beds" 
    });
  }
});

module.exports = router;