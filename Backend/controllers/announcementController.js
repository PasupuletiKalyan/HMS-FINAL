const Announcement = require('../models/Announcement');

// Get all active announcements
exports.getAnnouncements = async (req, res) => {
  try {
    // Only return active announcements that haven't expired
    const announcements = await Announcement.find({
      active: true,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    }).sort({ createdAt: -1 });
    
    res.json({ success: true, announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch announcements' });
  }
};

// Get all announcements for admin (including inactive and expired)
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ success: true, announcements });
  } catch (error) {
    console.error('Error fetching all announcements:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch announcements' });
  }
};

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { text, type, icon, expiresAt } = req.body;
    
    const announcement = new Announcement({
      text,
      type,
      icon,
      expiresAt: expiresAt ? new Date(expiresAt) : null
    });
    
    await announcement.save();
    res.status(201).json({ success: true, announcement });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ success: false, message: 'Failed to create announcement' });
  }
};

// Update an announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, type, icon, active, expiresAt } = req.body;
    
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      {
        text,
        type,
        icon,
        active,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      },
      { new: true }
    );
    
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    
    res.json({ success: true, announcement });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ success: false, message: 'Failed to update announcement' });
  }
};

// Delete an announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    
    const announcement = await Announcement.findByIdAndDelete(id);
    
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    
    res.json({ success: true, message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ success: false, message: 'Failed to delete announcement' });
  }
};