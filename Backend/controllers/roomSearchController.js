const OccupiedBed = require('../models/OccupiedBed');
const Student = require('../models/Student');
const StudentForm = require('../models/StudentForm');

exports.getRoomOccupants = async (req, res) => {
    try {
        const { block, roomNumber } = req.query;

        if (!block || !roomNumber) {
            return res.status(400).json({ message: 'Block and room number are required' });
        }

        // Find all occupied beds for the given room
        const occupiedBeds = await OccupiedBed.find({
            block: block,
            roomNumber: roomNumber
        });

        if (!occupiedBeds || occupiedBeds.length === 0) {
            return res.json({ occupants: [] });
        }

        // Get all student application numbers from occupied beds
        const applicationNumbers = occupiedBeds.map(bed => bed.applicationNo);

        // Find all student forms for these application numbers
        const studentForms = await StudentForm.find({
            applicationNo: { $in: applicationNumbers }
        });

        // Combine bed and student information
        const occupants = occupiedBeds.map(bed => {
            const studentForm = studentForms.find(form => form.applicationNo === bed.applicationNo);
            return {
                ...studentForm?._doc,
                bed: bed.bed
            };
        });

        res.json({ occupants });
    } catch (error) {
        console.error('Error in getRoomOccupants:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
