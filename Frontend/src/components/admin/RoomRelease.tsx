import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../../config/api';

interface Floor {
  id: string;
  name: string;
  isActive: boolean;
}

interface RoomBookingBlock {
  id: string;
  name: string;
  gender: string;
  floors: Floor[];
  isActive: boolean;
}

const RoomRelease: React.FC = () => {
  const [hostelBlocks, setHostelBlocks] = useState<RoomBookingBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string>("");

  // Updated hostelBlocks structure to match HostelFloorPlanViewer exactly
  const blockConfigs = [
    // Boys Blocks
    { name: "Phase 1", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Phase 1 E Block", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Phase 2", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor", "11th Floor", "12th Floor"] },
    { name: "Phase 2 Part 5", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor", "11th Floor", "12th Floor"] },
    { name: "Phase 3 North Wing", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor"] },
    { name: "Phase 3 South Wing", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor"] },
    { name: "Phase 4A", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor"] },
    { name: "Phase 4B", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor"] },
    // Girls Blocks
    { name: "Aravali", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor"] },
    { name: "Ajanta", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor"] },
    { name: "Himalaya", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor"] },
    { name: "Shivalik", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor"] },
    { name: "Vindya", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor"] },
    { name: "Nilgiri", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor"] },
    { name: "Satpura", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor"] },
    { name: "Kailash", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor"] },
  ];

  useEffect(() => {
    fetchHostelBlocks();
  }, []);

  // Enhanced function to fetch hostel blocks with appropriate number of floors for each block
  const fetchHostelBlocks = async () => {
    // Always start with all available blocks from blockConfigs
    const allBlocks: RoomBookingBlock[] = blockConfigs.map((config, index) => ({
      id: (index + 1).toString(),
      name: config.name,
      gender: config.gender,
      isActive: false, // Default to disabled
      floors: config.floors.map((floorName, i) => ({
        id: `${index + 1}-${i + 1}`,
        name: floorName,
        isActive: false, // Default to disabled
      })),
    }));

    try {
      // Try to fetch from backend first to get current settings
      const response = await fetch(buildApiUrl('/api/hostels/blocks-availability'));
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.blocks && Array.isArray(data.blocks)) {
          // Merge backend data with all available blocks
          const mergedBlocks = allBlocks.map((block) => {
            const backendBlock = data.blocks.find((b: any) => b.name === block.name);
            if (backendBlock) {
              return {
                ...block,
                isActive: backendBlock.floors.some((f: any) => f.isActive),
                floors: block.floors.map((floor, floorIndex) => {
                  const backendFloor = backendBlock.floors.find((f: any) => f.floorNumber === floorIndex + 1);
                  return {
                    ...floor,
                    isActive: backendFloor ? backendFloor.isActive : false
                  };
                })
              };
            }
            return block;
          });
          setHostelBlocks(mergedBlocks);
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching hostel blocks:", error);
    }

    // Fallback: try to load saved settings from localStorage 
    const savedBlocks = localStorage.getItem('hostel_blocks_config');
    if (savedBlocks) {
      try {
        const parsedBlocks = JSON.parse(savedBlocks);
        setHostelBlocks(parsedBlocks);
      } catch (e) {
        console.error("Error parsing saved hostel blocks:", e);
        setHostelBlocks(allBlocks);
      }
    } else {
      setHostelBlocks(allBlocks);
    }
  };

  // Activate all floors in a block
  const activateAllFloors = (blockId: string) => {
    setHostelBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { 
              ...block, 
              isActive: true,
              floors: block.floors.map(floor => ({ ...floor, isActive: true })) 
            } 
          : block
      )
    );
  };

  // Deactivate all floors in a block
  const deactivateAllFloors = (blockId: string) => {
    setHostelBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { 
              ...block, 
              isActive: false,
              floors: block.floors.map(floor => ({ ...floor, isActive: false })) 
            } 
          : block
      )
    );
  };

  // Toggle individual floor activation
  const toggleFloorActivation = (blockId: string, floorId: string) => {
    setHostelBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { 
              ...block, 
              floors: block.floors.map(floor => 
                floor.id === floorId 
                  ? { ...floor, isActive: !floor.isActive } 
                  : floor
              ),
              // Update block status based on floor statuses
              isActive: block.floors.some(f => f.id === floorId ? !f.isActive : f.isActive)
            } 
          : block
      )
    );
  };

  // Enhanced save room booking configuration to persist to both backend and localStorage
  const saveRoomBookingConfiguration = async () => {
    try {
      // Transform frontend data to backend format
      const backendBlocks = hostelBlocks.map(block => ({
        id: block.id,
        name: block.name,
        gender: block.gender,
        floors: block.floors.map((floor, index) => ({
          floorNumber: index + 1,
          isActive: floor.isActive
        }))
      }));

      // Save to backend
      const response = await fetch(buildApiUrl('/api/hostels/blocks-availability'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blocks: backendBlocks }),
      });
      
      if (response.ok) {
        // Also save to localStorage as fallback
        localStorage.setItem('hostel_blocks_config', JSON.stringify(hostelBlocks));
        alert('Room booking configuration saved successfully!');
      } else {
        // If backend fails, still save to localStorage
        localStorage.setItem('hostel_blocks_config', JSON.stringify(hostelBlocks));
        alert('Room booking configuration saved locally. Server update failed.');
      }
    } catch (error) {
      console.error("Error saving room configuration:", error);
      // Save to localStorage as fallback
      localStorage.setItem('hostel_blocks_config', JSON.stringify(hostelBlocks));
      alert('Room booking configuration saved locally. Server update failed.');
    }
  };

  const selectedBlock = hostelBlocks.find(block => block.id === selectedBlockId);

  return (
    <div className="room-release-container">
      <h1>Room Booking Release Controls</h1>        
      <p style={{ marginBottom: '20px' }}>
        Control which hostel blocks and floors are available for student booking. 
        Select a block from the dropdown below, then use the toggle switches to activate/deactivate individual floors, or use the "Activate All" and "Deactivate All" buttons to control all floors in the selected block.
      </p>
      
      {/* Block Selection Dropdown */}
      <div className="block-selector" style={{ marginBottom: '30px' }}>
        <label htmlFor="block-select" style={{ 
          display: 'block', 
          marginBottom: '10px', 
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          Select Hostel Block:
        </label>
        <select
          id="block-select"
          value={selectedBlockId}
          onChange={(e) => setSelectedBlockId(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
            backgroundColor: 'white'
          }}
        >
          <option value="">-- Select a Block --</option>
          {hostelBlocks.map(block => (
            <option key={block.id} value={block.id}>
              {block.name} ({block.gender})
            </option>
          ))}
        </select>
      </div>

      {/* Selected Block Details */}
      {selectedBlock ? (
        <div className="selected-block-container">
          <div 
            className="hostel-block-card"
            style={{
              marginBottom: '25px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}
          >
            <div 
              className="block-header"
              style={{
                padding: '15px',
                backgroundColor: selectedBlock.gender === 'Girls' ? '#FFD6E0' : '#D6E9FF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h3 style={{ margin: '0' }}>
                {selectedBlock.name} 
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: 'normal',
                  marginLeft: '10px',
                  color: selectedBlock.gender === 'Girls' ? '#FF6B8A' : '#4A90E2'
                }}>
                  ({selectedBlock.gender})
                </span>
              </h3>
              <div className="block-actions" style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => activateAllFloors(selectedBlock.id)}
                  disabled={selectedBlock.floors.every(f => f.isActive)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    opacity: selectedBlock.floors.every(f => f.isActive) ? 0.7 : 1
                  }}
                >
                  Activate All
                </button>
                
                <button
                  onClick={() => deactivateAllFloors(selectedBlock.id)}
                  disabled={selectedBlock.floors.every(f => !f.isActive)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    opacity: selectedBlock.floors.every(f => !f.isActive) ? 0.7 : 1
                  }}
                >
                  Deactivate All
                </button>
              </div>
            </div>
            
            <div 
              className="floors-container"
              style={{
                padding: '15px',
                backgroundColor: 'white',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              {selectedBlock.floors.map(floor => (
                <div 
                  key={floor.id}
                  className="floor-item"
                  style={{
                    padding: '10px 15px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    backgroundColor: floor.isActive ? '#e8f4fc' : '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minWidth: '180px'
                  }}
                >
                  <span>{floor.name}</span>
                  <label className="switch" style={{ marginLeft: '10px' }}>
                    <input
                      type="checkbox"
                      checked={floor.isActive}
                      onChange={() => toggleFloorActivation(selectedBlock.id, floor.id)}
                      style={{ display: 'none' }}
                    />
                    <span
                      className="slider round"
                      style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '44px',
                        height: '24px',
                        backgroundColor: floor.isActive ? '#4CAF50' : '#ccc',
                        borderRadius: '24px',
                        transition: '0.4s',
                        cursor: 'pointer'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: floor.isActive ? '23px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.4s'
                        }}
                      />
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-selection-message" style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px dashed #dee2e6'
        }}>
          <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>No Block Selected</h3>
          <p style={{ color: '#6c757d', margin: '0' }}>
            Please select a hostel block from the dropdown above to manage its floor availability.
          </p>
        </div>
      )}
      
      <div className="save-configuration" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={saveRoomBookingConfiguration}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default RoomRelease;
