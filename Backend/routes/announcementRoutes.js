const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Public routes for students
router.get('/active', announcementController.getAnnouncements);

// Admin routes
router.get('/admin/all', announcementController.getAllAnnouncements);
router.post('/', announcementController.createAnnouncement);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;