// HMS_SE/backend/controllers/hostelController.js

const Hostel = require('../models/Hostel');

// Get all hostels
exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single hostel by ID
exports.getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    res.status(200).json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new hostel
exports.addHostel = async (req, res) => {
  try {
    const newHostel = new Hostel(req.body);
    const savedHostel = await newHostel.save();
    res.status(201).json(savedHostel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update hostel
exports.updateHostel = async (req, res) => {
  try {
    const updatedHostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedHostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    res.status(200).json(updatedHostel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete hostel
exports.deleteHostel = async (req, res) => {
  try {
    const deletedHostel = await Hostel.findByIdAndDelete(req.params.id);
    if (!deletedHostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    res.status(200).json({ message: 'Hostel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};