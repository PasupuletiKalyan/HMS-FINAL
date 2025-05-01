const express = require("express");
const router = express.Router();
const StudentForm = require("../models/StudentForm");

// Submit a new hostel form
router.post("/", async (req, res) => {
  try {
    // Ensure consistency between admission_no and applicationNo
    if (req.body.applicationNo && !req.body.admission_no) {
      req.body.admission_no = req.body.applicationNo;
    } else if (req.body.admission_no && !req.body.applicationNo) {
      req.body.applicationNo = req.body.admission_no;
    }
    
    const newForm = new StudentForm(req.body);
    await newForm.save();
    res.status(201).json({ success: true, message: "Form submitted successfully" });
  } catch (err) {
    console.error("Form submission error:", err);
    res.status(500).json({ success: false, error: "Form submission failed" });
  }
});

// Fetch form by application number
router.get("/:applicationNo", async (req, res) => {
  try {
    const { applicationNo } = req.params;
    
    // Search by either applicationNo or admission_no
    const form = await StudentForm.findOne({
      $or: [
        { applicationNo },
        { admission_no: applicationNo }
      ]
    });
    
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }
    
    // Ensure both fields are synced before returning
    if (form.applicationNo !== form.admission_no) {
      if (!form.applicationNo && form.admission_no) {
        await StudentForm.findByIdAndUpdate(form._id, { applicationNo: form.admission_no });
        form.applicationNo = form.admission_no;
      } else if (form.applicationNo && !form.admission_no) {
        await StudentForm.findByIdAndUpdate(form._id, { admission_no: form.applicationNo });
        form.admission_no = form.applicationNo;
      }
    }
    
    res.json({ success: true, form });
  } catch (err) {
    console.error("Error fetching form:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
