const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Route to change user password
router.post("/change-password", async (req, res) => {
  try {
    const { userId, applicationNo, currentPassword, newPassword } = req.body;
    
    // Find user by ID or application number
    let user;
    if (userId) {
      user = await User.findById(userId);
    } else if (applicationNo) {
      user = await User.findOne({ applicationNo });
    }
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Check if current password is correct
    if (user.password !== currentPassword) { // Simple password comparison without bcrypt for now
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }
    
    // Update password
    user.password = newPassword; // Store new password without hashing for now
    await user.save();
    
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;