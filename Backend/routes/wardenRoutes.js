const express = require('express');
const router = express.Router();
const StudentForm = require('../models/StudentForm');
const StudentProgress = require('../models/StudentProgress');
const Student = require('../models/Student');
const Hostel = require('../models/Hostel');

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

module.exports = router;
