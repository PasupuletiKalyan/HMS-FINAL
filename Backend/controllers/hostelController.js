// HMS_SE/backend/controllers/hostelController.js

const Hostel = require('../models/Hostel');
const HostelDetails = require('../models/HostelDetails');
const OccupiedBed = require('../models/OccupiedBed');
const BlockAvailability = require('../models/BlockAvailability');

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

// Get occupancy statistics for all blocks and phases
exports.getHostelStatistics = async (req, res) => {
  try {
    // Get all occupied beds to calculate statistics
    const occupiedBeds = await OccupiedBed.find({});
    
    // Get the hostel details (containing total beds information)
    const hostelDetails = await HostelDetails.find({});
    
    if (!hostelDetails || hostelDetails.length === 0) {
      // If no hostel details exist yet, initialize them
      await initializeHostelDetails();
      return res.status(200).json({
        success: true,
        message: 'Hostel details initialized. Please fetch statistics again.',
      });
    }
    
    // Count occupied beds by block
    const blockOccupancy = {};
    
    // Initialize all blocks with 0 occupied beds
    hostelDetails.forEach(hostel => {
      const blockName = hostel.blockName;
      if (!blockOccupancy[blockName]) {
        blockOccupancy[blockName] = {
          occupiedBeds: 0,
          // Copy fields from hostel details
          totalBeds: hostel.totalBeds,
          totalRooms: hostel.totalRooms,
          studentBedsAvailable: hostel.studentBedsAvailable,
          nonStudentBeds: hostel.totalBeds - hostel.studentBedsAvailable,
          floors: {},
          type: hostel.type,
          blockName: hostel.blockName
        };
      }
      
      // Initialize floors with 0 occupied beds
      hostel.floors.forEach(floor => {
        if (!blockOccupancy[blockName].floors[floor.floorNumber]) {
          blockOccupancy[blockName].floors[floor.floorNumber] = {
            occupiedBeds: 0,
            totalBeds: floor.totalBeds,
            totalRooms: floor.totalRooms,
            studentBedsAvailable: floor.studentBedsAvailable,
            floorNumber: floor.floorNumber
          };
        }
      });
    });
    
    // Count occupied beds by block and floor
    occupiedBeds.forEach(bed => {
      const { block, floor } = bed;
      
      // Increment block occupancy
      if (blockOccupancy[block]) {
        blockOccupancy[block].occupiedBeds++;
        
        // Increment floor occupancy if this floor exists
        if (blockOccupancy[block].floors[floor]) {
          blockOccupancy[block].floors[floor].occupiedBeds++;
        }
      }
    });
    
    // Calculate empty beds and occupancy percentages
    Object.keys(blockOccupancy).forEach(block => {
      const blockData = blockOccupancy[block];
      blockData.emptyBeds = blockData.studentBedsAvailable - blockData.occupiedBeds;
      blockData.occupiedPercentage = ((blockData.occupiedBeds / blockData.studentBedsAvailable) * 100).toFixed(1);
      
      // Calculate for each floor
      Object.keys(blockData.floors).forEach(floor => {
        const floorData = blockData.floors[floor];
        floorData.emptyBeds = floorData.studentBedsAvailable - floorData.occupiedBeds;
        floorData.occupiedPercentage = ((floorData.occupiedBeds / floorData.studentBedsAvailable) * 100).toFixed(1);
      });
    });
    
    // Format data for the frontend
    const formattedData = {
      allBlocks: Object.values(blockOccupancy),
      girlsHostels: Object.values(blockOccupancy).filter(block => block.type === 'Girls'),
      boysHostels: Object.values(blockOccupancy).filter(block => block.type === 'Boys')
    };
    
    res.status(200).json({
      success: true,
      statistics: formattedData
    });
  } catch (error) {
    console.error('Error getting hostel statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve hostel statistics',
      error: error.message
    });
  }
};

// Initialize hostel details with total beds information
const initializeHostelDetails = async () => {
  // Basic data for each hostel block
  const hostelData = [
    // Girls hostels
    {
      blockName: 'Aravali',
      type: 'Girls',
      totalRooms: 60,
      totalBeds: 120,
      studentBedsAvailable: 111,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 27 },
        { floorNumber: '1st Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 28 },
        { floorNumber: '2nd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 28 },
        { floorNumber: '3rd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 28 }
      ]
    },
    {
      blockName: 'Ajanta',
      type: 'Girls',
      totalRooms: 60,
      totalBeds: 120,
      studentBedsAvailable: 113,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 27 },
        { floorNumber: '1st Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 28 },
        { floorNumber: '2nd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '3rd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 }
      ]
    },
    {
      blockName: 'Himalaya',
      type: 'Girls',
      totalRooms: 60, 
      totalBeds: 120,
      studentBedsAvailable: 115,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 28 },
        { floorNumber: '1st Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '2nd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '3rd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 }
      ]
    },
    {
      blockName: 'Shivalik',
      type: 'Girls',
      totalRooms: 60,
      totalBeds: 120,
      studentBedsAvailable: 118,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '1st Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '2nd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 },
        { floorNumber: '3rd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 }
      ]
    },
    {
      blockName: 'Vindhya',
      type: 'Girls',
      totalRooms: 60,
      totalBeds: 120,
      studentBedsAvailable: 118,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '1st Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '2nd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 },
        { floorNumber: '3rd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 }
      ]
    },
    {
      blockName: 'Nilgiri',
      type: 'Girls',
      totalRooms: 60,
      totalBeds: 120,
      studentBedsAvailable: 118,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '1st Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '2nd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 },
        { floorNumber: '3rd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 }
      ]
    },
    {
      blockName: 'Satpura',
      type: 'Girls',
      totalRooms: 60,
      totalBeds: 120,
      studentBedsAvailable: 118,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '1st Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '2nd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 },
        { floorNumber: '3rd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 }
      ]
    },
    {
      blockName: 'Kailash',
      type: 'Girls',
      totalRooms: 60,
      totalBeds: 120,
      studentBedsAvailable: 118,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '1st Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 29 },
        { floorNumber: '2nd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 },
        { floorNumber: '3rd Floor', totalRooms: 15, totalBeds: 30, studentBedsAvailable: 30 }
      ]
    },
    {
      blockName: 'Phase 3-NW',
      type: 'Girls',
      totalRooms: 223,
      totalBeds: 446,
      studentBedsAvailable: 420,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 22, totalBeds: 44, studentBedsAvailable: 40 },
        { floorNumber: '1st Floor', totalRooms: 22, totalBeds: 44, studentBedsAvailable: 42 },
        { floorNumber: '2nd Floor', totalRooms: 22, totalBeds: 44, studentBedsAvailable: 42 },
        { floorNumber: '3rd Floor', totalRooms: 22, totalBeds: 44, studentBedsAvailable: 42 },
        { floorNumber: '4th Floor', totalRooms: 22, totalBeds: 44, studentBedsAvailable: 42 },
        { floorNumber: '5th Floor', totalRooms: 23, totalBeds: 46, studentBedsAvailable: 44 },
        { floorNumber: '6th Floor', totalRooms: 23, totalBeds: 46, studentBedsAvailable: 42 },
        { floorNumber: '7th Floor', totalRooms: 23, totalBeds: 46, studentBedsAvailable: 42 },
        { floorNumber: '8th Floor', totalRooms: 22, totalBeds: 44, studentBedsAvailable: 42 },
        { floorNumber: '9th Floor', totalRooms: 22, totalBeds: 44, studentBedsAvailable: 42 }
      ]
    },
    {
      blockName: 'Phase 3-SW',
      type: 'Girls',
      totalRooms: 197,
      totalBeds: 394,
      studentBedsAvailable: 380,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 19, totalBeds: 38, studentBedsAvailable: 36 },
        { floorNumber: '1st Floor', totalRooms: 19, totalBeds: 38, studentBedsAvailable: 37 },
        { floorNumber: '2nd Floor', totalRooms: 20, totalBeds: 40, studentBedsAvailable: 38 },
        { floorNumber: '3rd Floor', totalRooms: 20, totalBeds: 40, studentBedsAvailable: 38 },
        { floorNumber: '4th Floor', totalRooms: 20, totalBeds: 40, studentBedsAvailable: 39 },
        { floorNumber: '5th Floor', totalRooms: 20, totalBeds: 40, studentBedsAvailable: 39 },
        { floorNumber: '6th Floor', totalRooms: 20, totalBeds: 40, studentBedsAvailable: 38 },
        { floorNumber: '7th Floor', totalRooms: 20, totalBeds: 40, studentBedsAvailable: 39 },
        { floorNumber: '8th Floor', totalRooms: 20, totalBeds: 40, studentBedsAvailable: 38 },
        { floorNumber: '9th Floor', totalRooms: 19, totalBeds: 38, studentBedsAvailable: 38 }
      ]
    },
    // Boys hostels
    {
      blockName: 'Phase 1',
      type: 'Boys',
      totalRooms: 205,
      totalBeds: 410, 
      studentBedsAvailable: 400,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 41, totalBeds: 82, studentBedsAvailable: 78 },
        { floorNumber: '1st Floor', totalRooms: 41, totalBeds: 82, studentBedsAvailable: 80 },
        { floorNumber: '2nd Floor', totalRooms: 41, totalBeds: 82, studentBedsAvailable: 80 },
        { floorNumber: '3rd Floor', totalRooms: 41, totalBeds: 82, studentBedsAvailable: 81 },
        { floorNumber: '4th Floor', totalRooms: 41, totalBeds: 82, studentBedsAvailable: 81 }
      ]
    },
    {
      blockName: 'E-wing',
      type: 'Boys',
      totalRooms: 60,
      totalBeds: 120,
      studentBedsAvailable: 115,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 12, totalBeds: 24, studentBedsAvailable: 22 },
        { floorNumber: '1st Floor', totalRooms: 12, totalBeds: 24, studentBedsAvailable: 23 },
        { floorNumber: '2nd Floor', totalRooms: 12, totalBeds: 24, studentBedsAvailable: 23 },
        { floorNumber: '3rd Floor', totalRooms: 12, totalBeds: 24, studentBedsAvailable: 24 },
        { floorNumber: '4th Floor', totalRooms: 12, totalBeds: 24, studentBedsAvailable: 23 }
      ]
    },
    {
      blockName: 'Phase 2',
      type: 'Boys',
      totalRooms: 621,
      totalBeds: 1242,
      studentBedsAvailable: 1200,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 92 },
        { floorNumber: '1st Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 94 },
        { floorNumber: '2nd Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 93 },
        { floorNumber: '3rd Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 92 },
        { floorNumber: '4th Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 93 },
        { floorNumber: '5th Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 94 },
        { floorNumber: '6th Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 92 },
        { floorNumber: '7th Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 92 },
        { floorNumber: '8th Floor', totalRooms: 47, totalBeds: 94, studentBedsAvailable: 91 },
        { floorNumber: '9th Floor', totalRooms: 47, totalBeds: 94, studentBedsAvailable: 92 },
        { floorNumber: '10th Floor', totalRooms: 47, totalBeds: 94, studentBedsAvailable: 92 },
        { floorNumber: '11th Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 92 },
        { floorNumber: '12th Floor', totalRooms: 48, totalBeds: 96, studentBedsAvailable: 91 }
      ]
    },
    {
      blockName: 'Phase 2- part 5',
      type: 'Boys',
      totalRooms: 135,
      totalBeds: 270,
      studentBedsAvailable: 260,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 27, totalBeds: 54, studentBedsAvailable: 52 },
        { floorNumber: '1st Floor', totalRooms: 27, totalBeds: 54, studentBedsAvailable: 52 },
        { floorNumber: '2nd Floor', totalRooms: 27, totalBeds: 54, studentBedsAvailable: 52 },
        { floorNumber: '3rd Floor', totalRooms: 27, totalBeds: 54, studentBedsAvailable: 52 },
        { floorNumber: '4th Floor', totalRooms: 27, totalBeds: 54, studentBedsAvailable: 52 }
      ]
    },
    {
      blockName: 'Phase 4',
      type: 'Boys',
      totalRooms: 102,
      totalBeds: 204,
      studentBedsAvailable: 190,
      floors: [
        { floorNumber: 'Ground Floor', totalRooms: 25, totalBeds: 50, studentBedsAvailable: 46 },
        { floorNumber: '1st Floor', totalRooms: 26, totalBeds: 52, studentBedsAvailable: 48 },
        { floorNumber: '2nd Floor', totalRooms: 26, totalBeds: 52, studentBedsAvailable: 49 },
        { floorNumber: '3rd Floor', totalRooms: 25, totalBeds: 50, studentBedsAvailable: 47 }
      ]
    }
  ];

  // Create entries for each hostel block
  const hostelDetails = await Promise.all(hostelData.map(async (data) => {
    return new HostelDetails(data);
  }));

  // Save all the hostel details
  await HostelDetails.insertMany(hostelDetails);
  
  console.log('Hostel details initialized successfully');
  return true;
};

// Update hostel statistics when a bed is booked
exports.updateHostelStatistics = async (booking) => {
  try {
    const { block, floor } = booking;
    
    // No need to update database as we'll calculate stats on the fly
    console.log(`Updated statistics for block: ${block}, floor: ${floor}`);
    return true;
  } catch (error) {
    console.error('Error updating hostel statistics:', error);
    return false;
  }
};

// Get block availability settings
exports.getBlockAvailability = async (req, res) => {
  try {
    let blockAvailability = await BlockAvailability.findOne();
      // If no block availability settings exist, create default ones with ALL blocks
    if (!blockAvailability) {
      const defaultBlocks = [
        // Boys Blocks
        {
          id: '1',
          name: 'Phase 1',
          gender: 'Boys',
          floors: Array.from({ length: 5 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '2',
          name: 'Phase 1 E Block',
          gender: 'Boys',
          floors: Array.from({ length: 5 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '3',
          name: 'Phase 2',
          gender: 'Boys',
          floors: Array.from({ length: 13 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '4',
          name: 'Phase 2 Part 5',
          gender: 'Boys',
          floors: Array.from({ length: 13 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '5',
          name: 'Phase 3 North Wing',
          gender: 'Girls',
          floors: Array.from({ length: 10 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '6',
          name: 'Phase 3 South Wing',
          gender: 'Girls',
          floors: Array.from({ length: 10 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '7',
          name: 'Phase 4A',
          gender: 'Boys',
          floors: Array.from({ length: 11 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '8',
          name: 'Phase 4B',
          gender: 'Boys',
          floors: Array.from({ length: 11 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },        // Girls Blocks
        {
          id: '9',
          name: 'Aravali',
          gender: 'Girls',
          floors: Array.from({ length: 3 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '10',
          name: 'Ajanta',
          gender: 'Girls',
          floors: Array.from({ length: 3 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '11',
          name: 'Himalaya',
          gender: 'Girls',
          floors: Array.from({ length: 3 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '12',
          name: 'Shivalik',
          gender: 'Girls',
          floors: Array.from({ length: 3 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '13',
          name: 'Vindya',
          gender: 'Girls',
          floors: Array.from({ length: 3 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '14',
          name: 'Nilgiri',
          gender: 'Girls',
          floors: Array.from({ length: 3 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '15',
          name: 'Satpura',
          gender: 'Girls',
          floors: Array.from({ length: 3 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        },
        {
          id: '16',
          name: 'Kailash',
          gender: 'Girls',
          floors: Array.from({ length: 3 }, (_, i) => ({
            floorNumber: i + 1,
            isActive: false
          }))
        }
      ];

      blockAvailability = new BlockAvailability({
        blocks: defaultBlocks
      });
      await blockAvailability.save();
    }

    res.status(200).json(blockAvailability);
  } catch (error) {
    console.error('Error getting block availability:', error);
    res.status(500).json({ message: 'Failed to get block availability settings' });
  }
};

// Update block availability settings
exports.updateBlockAvailability = async (req, res) => {
  try {
    const { blocks } = req.body;

    let blockAvailability = await BlockAvailability.findOne();
    
    if (!blockAvailability) {
      blockAvailability = new BlockAvailability({ blocks });
    } else {
      blockAvailability.blocks = blocks;
    }

    await blockAvailability.save();

    res.status(200).json({ 
      message: 'Block availability settings updated successfully',
      blockAvailability 
    });
  } catch (error) {
    console.error('Error updating block availability:', error);
    res.status(500).json({ message: 'Failed to update block availability settings' });
  }
};

// Get available blocks for students (only active blocks/floors)
exports.getAvailableBlocksForStudents = async (req, res) => {
  try {
    const blockAvailability = await BlockAvailability.findOne();
    
    if (!blockAvailability) {
      return res.status(200).json({ availableBlocks: [] });
    }

    // Filter blocks to only include those with at least one active floor
    const availableBlocks = blockAvailability.blocks
      .filter(block => block.floors.some(floor => floor.isActive))
      .map(block => ({
        id: block.id,
        name: block.name,
        gender: block.gender,
        availableFloors: block.floors.filter(floor => floor.isActive)
      }));    res.status(200).json({ availableBlocks });
  } catch (error) {
    console.error('Error getting available blocks for students:', error);
    res.status(500).json({ message: 'Failed to get available blocks' });
  }
};

// Reset block availability settings (for testing/admin use)
exports.resetBlockAvailability = async (req, res) => {
  try {
    await BlockAvailability.deleteMany({});
    res.status(200).json({ message: 'Block availability settings reset successfully' });
  } catch (error) {
    console.error('Error resetting block availability:', error);
    res.status(500).json({ message: 'Failed to reset block availability settings' });
  }
};