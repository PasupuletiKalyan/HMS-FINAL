const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const HostelForm = require("../models/HostelForm");
const Fee = require("../models/Fee");

// GET student full info by name or application number
router.get("/student-info", async (req, res) => {
  const { query } = req.query; // can be name or appNo

  try {
    const student = await Student.findOne({
      $or: [
        { name: new RegExp(query, "i") },
        { applicationNo: query }
      ]
    });

    if (!student) return res.status(404).json({ error: "Student not found" });

    const form = await HostelForm.findOne({ applicationNo: student.applicationNo });
    const fee = await Fee.findOne({ applicationNo: student.applicationNo });

    res.json({
      student,
      hostelForm: form || null,
      feeStatus: fee ? fee.status : "Unpaid"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
