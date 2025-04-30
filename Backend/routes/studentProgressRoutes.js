const express = require("express");
const router = express.Router();
const StudentProgress = require("../models/StudentProgress");

// Get progress for a specific student
router.get("/:applicationNo", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    
    // Find or create student progress
    let progress = await StudentProgress.findOne({ applicationNo });
    
    if (!progress) {
      progress = new StudentProgress({ applicationNo });
      await progress.save();
    }
    
    res.status(200).json({ 
      success: true, 
      progress 
    });
  } catch (error) {
    console.error("Error getting student progress:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to get student progress" 
    });
  }
});

// Update form completion status
router.post("/:applicationNo/form", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    
    const progress = await StudentProgress.findOneAndUpdate(
      { applicationNo },
      { 
        formCompleted: true,
        $addToSet: { completedSteps: 1 },
        updatedAt: Date.now()
      },
      { new: true, upsert: true }
    );
    
    res.status(200).json({ 
      success: true, 
      progress 
    });
  } catch (error) {
    console.error("Error updating form completion status:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update form completion status" 
    });
  }
});

// Update payment completion status
router.post("/:applicationNo/payment", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    
    // Check if form is completed first
    const studentProgress = await StudentProgress.findOne({ applicationNo });
    if (!studentProgress || !studentProgress.formCompleted) {
      return res.status(400).json({ 
        success: false, 
        message: "Must complete the form before payment" 
      });
    }
    
    const progress = await StudentProgress.findOneAndUpdate(
      { applicationNo },
      { 
        paymentCompleted: true,
        $addToSet: { completedSteps: 2 },
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.status(200).json({ 
      success: true, 
      progress 
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update payment status" 
    });
  }
});

// Update room booking status
router.post("/:applicationNo/booking", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    
    // Check if form and payment are completed first
    const studentProgress = await StudentProgress.findOne({ applicationNo });
    if (!studentProgress || !studentProgress.formCompleted || !studentProgress.paymentCompleted) {
      return res.status(400).json({ 
        success: false, 
        message: "Must complete form and payment before booking a room" 
      });
    }
    
    const progress = await StudentProgress.findOneAndUpdate(
      { applicationNo },
      { 
        roomBooked: true,
        $addToSet: { completedSteps: 3 },
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.status(200).json({ 
      success: true, 
      progress 
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update booking status" 
    });
  }
});

// Reset progress for a student (for testing)
router.delete("/:applicationNo/reset", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    
    await StudentProgress.findOneAndUpdate(
      { applicationNo },
      { 
        formCompleted: false,
        paymentCompleted: false,
        roomBooked: false,
        completedSteps: [],
        updatedAt: Date.now()
      },
      { new: true, upsert: true }
    );
    
    res.status(200).json({ 
      success: true, 
      message: "Progress reset successfully" 
    });
  } catch (error) {
    console.error("Error resetting progress:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to reset progress" 
    });
  }
});

module.exports = router;