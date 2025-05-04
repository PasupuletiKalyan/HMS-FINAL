const express = require('express');
const router = express.Router();
const StudentForm = require('../models/StudentForm');
const StudentProgress = require('../models/StudentProgress');
const Student = require('../models/Student');
const Hostel = require('../models/Hostel');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer storage for warden profile photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/warden-photos');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const { userId } = req.params;
    const fileExt = path.extname(file.originalname);
    // Create unique filename using userId and timestamp
    cb(null, `warden-${userId}-${Date.now()}-${Math.floor(Math.random() * 1000000000)}${fileExt}`);
  }
});

// Initialize multer middleware with file filtering
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: function (req, file, cb) {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get student details by application number
router.get('/student/:applicationNo', async (req, res) => {
  try {
    const { applicationNo } = req.params;
    
    // Search for form data using either applicationNo or admission_no
    const formData = await StudentForm.findOne({
      $or: [
        { applicationNo },
        { admission_no: applicationNo }
      ]
    });
    
    // If form was found, ensure both fields are synced
    if (formData) {
      if (formData.applicationNo !== formData.admission_no) {
        if (!formData.applicationNo && formData.admission_no) {
          await StudentForm.findByIdAndUpdate(formData._id, { applicationNo: formData.admission_no });
          formData.applicationNo = formData.admission_no;
        } else if (formData.applicationNo && !formData.admission_no) {
          await StudentForm.findByIdAndUpdate(formData._id, { admission_no: formData.applicationNo });
          formData.admission_no = formData.applicationNo;
        }
      }
    }
    
    // Fetch progress data
    const progressData = await StudentProgress.findOne({ applicationNo });
    
    // Fetch booking details if available
    const student = await Student.findOne({ applicationNo });
    let bookingDetails = null;
    
    // First check if booking details exist in StudentProgress (added during booking process)
    if (progressData && progressData.roomBooked && progressData.bookingDetails) {
      bookingDetails = progressData.bookingDetails;
    }
    // If not found in progress data, check if student has a roomNo (older method)
    else if (student && student.roomNo) {
      // Parse room number to extract block, floor, etc.
      const roomData = await Hostel.findOne({ roomNo: student.roomNo });
      if (roomData) {
        bookingDetails = {
          block: roomData.block,
          floor: roomData.floor,
          roomNumber: roomData.roomNumber,
          bed: roomData.bed
        };
      }
    }
    
    // Create response object
    const studentDetails = {
      formData: formData || null,
      progress: {
        formCompleted: progressData?.formCompleted || false,
        paymentCompleted: progressData?.paymentCompleted || false,
        roomBooked: progressData?.roomBooked || false,
        completedSteps: progressData?.completedSteps || []
      },
      bookingDetails,
      documentVerification: student?.documentVerification || {
        antiRagging: false,
        antiDrug: false,
        keysHandedOver: false
      },
      // Include profile photo if available
      profilePhoto: student?.profilePhoto || null
    };
    
    res.json({ success: true, studentDetails });
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch student details' 
    });
  }
});

// Update document verification status
router.post('/student/:applicationNo/verify-documents', async (req, res) => {
  try {
    const { applicationNo } = req.params;
    const { antiRagging, antiDrug, keysHandedOver } = req.body;
    
    // Find student or create if doesn't exist
    const student = await Student.findOneAndUpdate(
      { applicationNo },
      { 
        $set: { 
          'documentVerification.antiRagging': antiRagging,
          'documentVerification.antiDrug': antiDrug,
          'documentVerification.keysHandedOver': keysHandedOver,
          'documentVerification.verifiedAt': new Date()
        }
      },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, documentVerification: student.documentVerification });
  } catch (error) {
    console.error('Error updating document verification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update document verification status' 
    });
  }
});

// Upload or update warden profile photo
router.post('/profile-photo/:userId', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }
    
    // Generate URL path for the uploaded file - ensure consistency with Express static middleware
    const profilePhotoPath = `/uploads/warden-photos/${req.file.filename}`;
    
    // Update the user record with the profile photo path
    await User.findByIdAndUpdate(
      userId,
      { profilePhoto: profilePhotoPath },
      { new: true }
    );
    
    res.status(200).json({ 
      success: true, 
      message: 'Profile photo uploaded successfully',
      profilePhoto: profilePhotoPath
    });
  } catch (error) {
    console.error("Error uploading warden profile photo:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading profile photo' 
    });
  }
});

// Get warden profile photo
router.get('/profile-photo/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user by ID
    const user = await User.findById(userId);
    
    if (!user || !user.profilePhoto) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile photo not found' 
      });
    }
    
    res.json({ 
      success: true, 
      profilePhoto: user.profilePhoto
    });
  } catch (error) {
    console.error("Error getting warden profile photo:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Error retrieving profile photo' 
    });
  }
});

module.exports = router;
