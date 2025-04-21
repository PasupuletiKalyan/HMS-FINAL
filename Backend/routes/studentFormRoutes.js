const express = require("express");
const router = express.Router();
const StudentForm = require("../models/StudentForm");

// Submit a new hostel form
router.post("/", async (req, res) => {
  try {
    const newForm = new StudentForm(req.body);
    await newForm.save();
    res.status(201).json({ success: true, message: "Form submitted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Form submission failed" });
  }
});

// Fetch form by application number
router.get("/:applicationNo", async (req, res) => {
  try {
    const form = await StudentForm.findOne({ admission_no: req.params.applicationNo });
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }
    res.json({ success: true, form });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
