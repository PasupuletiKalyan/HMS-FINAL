const express = require("express");
const router = express.Router();
const StudentProgress = require("../models/StudentProgress");
const StudentForm = require("../models/StudentForm"); // Added for cross-referencing

// Helper function to check both applicationNo and admission_no
async function findStudentIdentifier(applicationNo) {
  // Check if a form exists with either field
  const form = await StudentForm.findOne({
    $or: [
      { applicationNo },
      { admission_no: applicationNo }
    ]
  });
  
  // If form exists, use the identifier that exists in the form
  if (form) {
    return form.applicationNo || form.admission_no;
  }
  
  // Otherwise use the original input
  return applicationNo;
}

// Get progress for a specific student
router.get("/:applicationNo", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    const identifier = await findStudentIdentifier(applicationNo);
    
    // Find or create student progress
    let progress = await StudentProgress.findOne({ applicationNo: identifier });
    
    if (!progress) {
      progress = new StudentProgress({ applicationNo: identifier });
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
    const identifier = await findStudentIdentifier(applicationNo);
    
    const progress = await StudentProgress.findOneAndUpdate(
      { applicationNo: identifier },
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
    const identifier = await findStudentIdentifier(applicationNo);
    
    // Check if form is completed first
    const studentProgress = await StudentProgress.findOne({ applicationNo: identifier });
    if (!studentProgress || !studentProgress.formCompleted) {
      return res.status(400).json({ 
        success: false, 
        message: "Must complete the form before payment" 
      });
    }
    
    const progress = await StudentProgress.findOneAndUpdate(
      { applicationNo: identifier },
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
    const identifier = await findStudentIdentifier(applicationNo);
    const { bookingDetails } = req.body;
    
    // Check if form and payment are completed first
    const studentProgress = await StudentProgress.findOne({ applicationNo: identifier });
    if (!studentProgress || !studentProgress.formCompleted || !studentProgress.paymentCompleted) {
      return res.status(400).json({ 
        success: false, 
        message: "Must complete form and payment before booking a room" 
      });
    }
    
    const progress = await StudentProgress.findOneAndUpdate(
      { applicationNo: identifier },
      { 
        roomBooked: true,
        bookingDetails: bookingDetails, // Store the booking details
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
    const identifier = await findStudentIdentifier(applicationNo);
    
    await StudentProgress.findOneAndUpdate(
      { applicationNo: identifier },
      { 
        formCompleted: false,
        paymentCompleted: false,
        roomBooked: false,
        bookingDetails: null,
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

// Reset progress for ALL students (for testing)
router.delete("/reset/all", async (req, res) => {
  try {
    // Update all student progress documents
    const result = await StudentProgress.updateMany(
      {}, // Empty filter means all documents
      { 
        formCompleted: false,
        paymentCompleted: false,
        roomBooked: false,
        bookingDetails: null,
        completedSteps: [],
        updatedAt: Date.now()
      }
    );
    
    res.status(200).json({ 
      success: true, 
      message: `Successfully reset progress for ${result.modifiedCount} students` 
    });
  } catch (error) {
    console.error("Error resetting all student progress:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to reset student progress" 
    });
  }
});

module.exports = router;