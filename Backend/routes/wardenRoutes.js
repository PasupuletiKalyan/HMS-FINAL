const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const HostelForm = require("../models/HostelForm");
const Fee = require("../models/Fee");
const HostelDetails = require("../models/HostelDetails");

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

// Fetch hostel details by type
router.get("/hostel-details", async (req, res) => {
  const { type } = req.query; // 'Girls', 'Boys', or 'All Blocks'
  try {
    console.log("Fetching hostel details for type:", type); // Debug log

    // Validate the type parameter
    if (!type || !["Girls", "Boys", "All Blocks"].includes(type)) {
      return res.status(400).json({ error: "Invalid type parameter. Allowed values are 'Girls', 'Boys', or 'All Blocks'." });
    }

    const query = type === "All Blocks" ? {} : { type };
    console.log("Query being executed:", query); // Log the query being executed

    const hostelDetails = await HostelDetails.find(query);
    console.log("Hostel details fetched successfully:", hostelDetails); // Log the fetched data

    if (!hostelDetails || hostelDetails.length === 0) {
      console.warn("No hostel details found for the specified type. Returning empty array.");
      return res.json([]); // Return an empty array instead of 404
    }

    res.json(hostelDetails);
  } catch (error) {
    console.error("Error fetching hostel details:", error); // Log full error
    res.status(500).json({ error: "Failed to fetch hostel details. Please try again later." });
  }
});

// Update hostel details
router.put("/hostel-details/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedHostel = await HostelDetails.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedHostel);
  } catch (error) {
    console.error("Error updating hostel details:", error);
    res.status(500).json({ error: "Failed to update hostel details" });
  }
});

module.exports = router;
