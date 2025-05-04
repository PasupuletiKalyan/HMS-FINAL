const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require("bcryptjs"); // We'll need bcrypt for password hashing
const User = require("../models/user");
const Student = require('../models/Student');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads/profile-photos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, req.params.applicationNo + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image file.'), false);
  }
};

// Initialize multer middleware
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Serve static files from uploads directory
router.use('/uploads/profile-photos', express.static(uploadDir));

// Get student profile
router.get('/:applicationNo', async (req, res) => {
  try {
    const { applicationNo } = req.params;
    
    const student = await Student.findOne({ applicationNo });
    
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      student 
    });
  } catch (error) {
    console.error("Error getting student profile:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Error getting student profile' 
    });
  }
});

// Upload or update profile photo
router.post('/:applicationNo/profile-photo', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { applicationNo } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }
    
    // Generate URL path for the uploaded file
    const profilePhotoPath = `/api/students/uploads/profile-photos/${req.file.filename}`;
    
    // Find student or create if doesn't exist
    const student = await Student.findOneAndUpdate(
      { applicationNo },
      { profilePhoto: profilePhotoPath },
      { new: true, upsert: true }
    );
    
    res.status(200).json({ 
      success: true, 
      message: 'Profile photo uploaded successfully',
      profilePhoto: profilePhotoPath
    });
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading profile photo' 
    });
  }
});

// Route to handle password change
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
    
    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the password
    user.password = hashedPassword;
    await user.save();
    
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;