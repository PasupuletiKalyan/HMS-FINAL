import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../../config/api';
import ResetStudentProgress from '../ResetStudentProgress';

// Interface for floor occupancy data
interface FloorOccupancy {
  floorNumber: number;
  floorName: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  occupancyRate: number;
  isActive: boolean;
}

// Interface for block occupancy data
interface BlockOccupancy {
  blockId: string;
  blockName: string;
  gender: string;
  isActive: boolean;
  totalFloors: number;
  activeFloors: number;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  occupancyRate: number;
  floors: FloorOccupancy[];
}

// Interface for room release overview stats
interface RoomReleaseStats {
  totalBlocks: number;
  releasedBlocks: number;
  totalFloors: number;
  activeFloors: number;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  overallOccupancyRate: number;
  blocks: BlockOccupancy[];
}

const AdminOverview: React.FC = () => {
  const [roomReleaseStats, setRoomReleaseStats] = useState<RoomReleaseStats>({
    totalBlocks: 0,
    releasedBlocks: 0,
    totalFloors: 0,
    activeFloors: 0,
    totalBeds: 0,
    occupiedBeds: 0,
    availableBeds: 0,
    overallOccupancyRate: 0,
    blocks: []  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    fetchRoomReleaseStats();
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchRoomReleaseStats, 30000);
    return () => clearInterval(interval);
  }, []);
  // Function to fetch room release statistics
  const fetchRoomReleaseStats = async () => {
    setIsLoadingStats(true);
    try {
      // Fetch hostel block availability and occupancy data
      const [blocksResponse, occupiedBedsResponse] = await Promise.all([
        fetch(buildApiUrl('/api/hostels/blocks-availability')),
        fetch(buildApiUrl('/api/occupied-beds')),
      ]);

      let stats: RoomReleaseStats = {
        totalBlocks: 0,
        releasedBlocks: 0,
        totalFloors: 0,
        activeFloors: 0,
        totalBeds: 0,
        occupiedBeds: 0,
        availableBeds: 0,
        overallOccupancyRate: 0,
        blocks: []
      };      // Get occupied beds data
      let occupiedBedsData: any[] = [];
      if (occupiedBedsResponse.ok) {
        const bedsData = await occupiedBedsResponse.json();
        if (bedsData.success) {
          // Use the array of bed objects directly from the API response
          occupiedBedsData = bedsData.occupiedBedsArray || bedsData.bedDetails || [];
          stats.occupiedBeds = occupiedBedsData.length;
          console.log(`Found ${stats.occupiedBeds} occupied beds`);
        }
      }

      // Default block configurations
      const blockConfigs = [
        { name: "Phase 1", gender: "Boys", floors: 5, bedsPerFloor: 50 },
        { name: "Phase 1 E Block", gender: "Boys", floors: 5, bedsPerFloor: 50 },
        { name: "Phase 2", gender: "Boys", floors: 13, bedsPerFloor: 60 },
        { name: "Phase 2 Part 5", gender: "Boys", floors: 13, bedsPerFloor: 60 },
        { name: "Phase 3 North Wing", gender: "Girls", floors: 10, bedsPerFloor: 40 },
        { name: "Phase 3 South Wing", gender: "Girls", floors: 10, bedsPerFloor: 40 },
        { name: "Phase 4A", gender: "Boys", floors: 11, bedsPerFloor: 55 },
        { name: "Phase 4B", gender: "Boys", floors: 11, bedsPerFloor: 55 },
        { name: "Aravali", gender: "Girls", floors: 3, bedsPerFloor: 30 },
        { name: "Ajanta", gender: "Girls", floors: 3, bedsPerFloor: 30 },
        { name: "Himalaya", gender: "Girls", floors: 3, bedsPerFloor: 30 },
        { name: "Shivalik", gender: "Girls", floors: 3, bedsPerFloor: 30 },
        { name: "Vindya", gender: "Girls", floors: 3, bedsPerFloor: 30 },
        { name: "Nilgiri", gender: "Girls", floors: 3, bedsPerFloor: 30 },
        { name: "Satpura", gender: "Girls", floors: 3, bedsPerFloor: 30 },
        { name: "Kailash", gender: "Girls", floors: 3, bedsPerFloor: 30 },
      ];      // Process blocks availability data
      let blocksAvailability: any = {};
      let blockGenders: any = {};
      if (blocksResponse.ok) {
        const blocksData = await blocksResponse.json();
        if (blocksData.blocks && Array.isArray(blocksData.blocks)) {
          blocksData.blocks.forEach((block: any) => {
            blocksAvailability[block.name] = block.floors;
            blockGenders[block.name] = block.gender; // Store the actual gender from database
          });
        }
      }

      // Process each block
      stats.blocks = blockConfigs.map((config, index) => {
        const blockOccupancy = occupiedBedsData.filter(bed => bed.block === config.name);
        const blockFloorAvailability = blocksAvailability[config.name] || [];
        
        // Use gender from database if available, otherwise fallback to config
        const actualGender = blockGenders[config.name] || config.gender;
        
        const floors: FloorOccupancy[] = [];
        let blockTotalBeds = 0;
        let blockOccupiedBeds = 0;
        let blockActiveFloors = 0;

        for (let floorNum = 1; floorNum <= config.floors; floorNum++) {
          const floorOccupancy = blockOccupancy.filter(bed => parseInt(bed.floor) === floorNum);
          const floorAvailability = blockFloorAvailability.find((f: any) => f.floorNumber === floorNum);
          const isFloorActive = floorAvailability ? floorAvailability.isActive : false;
          
          if (isFloorActive) {
            blockActiveFloors++;
            stats.activeFloors++;
          }

          const floorTotalBeds = config.bedsPerFloor;
          const floorOccupiedBeds = floorOccupancy.length;
          const floorAvailableBeds = floorTotalBeds - floorOccupiedBeds;
          const floorOccupancyRate = floorTotalBeds > 0 ? Math.round((floorOccupiedBeds / floorTotalBeds) * 100) : 0;

          blockTotalBeds += floorTotalBeds;
          blockOccupiedBeds += floorOccupiedBeds;

          floors.push({
            floorNumber: floorNum,
            floorName: floorNum === 1 ? "Ground Floor" : `${floorNum - 1}${getOrdinalSuffix(floorNum - 1)} Floor`,
            totalBeds: floorTotalBeds,
            occupiedBeds: floorOccupiedBeds,
            availableBeds: floorAvailableBeds,
            occupancyRate: floorOccupancyRate,
            isActive: isFloorActive
          });
        }

        const blockOccupancyRate = blockTotalBeds > 0 ? Math.round((blockOccupiedBeds / blockTotalBeds) * 100) : 0;
        const isBlockActive = blockActiveFloors > 0;

        if (isBlockActive) {
          stats.releasedBlocks++;
        }

        stats.totalBeds += blockTotalBeds;
        stats.totalFloors += config.floors;        return {
          blockId: `block-${index + 1}`,
          blockName: config.name,
          gender: actualGender,
          isActive: isBlockActive,
          totalFloors: config.floors,
          activeFloors: blockActiveFloors,
          totalBeds: blockTotalBeds,
          occupiedBeds: blockOccupiedBeds,
          availableBeds: blockTotalBeds - blockOccupiedBeds,
          occupancyRate: blockOccupancyRate,
          floors
        };
      });

      stats.totalBlocks = blockConfigs.length;
      stats.availableBeds = stats.totalBeds - stats.occupiedBeds;
      stats.overallOccupancyRate = stats.totalBeds > 0 ? Math.round((stats.occupiedBeds / stats.totalBeds) * 100) : 0;

      setRoomReleaseStats(stats);
    } catch (error) {
      console.error('Error fetching room release statistics:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };
  // Helper function to get ordinal suffix
  const getOrdinalSuffix = (num: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = num % 100;
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  };

  return (
    <div className="overview-content">
      {/* Admin Tools Section */}
      <div className="admin-tools-section" style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#dc3545', marginBottom: '15px' }}>Admin Tools</h2>
        <ResetStudentProgress />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Room Release Overview</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isLoadingStats && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div className="spinner" style={{
                width: '16px',
                height: '16px',
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <span style={{ fontSize: '14px', color: '#666' }}>Updating...</span>
            </div>
          )}
          <button
            onClick={fetchRoomReleaseStats}
            disabled={isLoadingStats}
            style={{
              padding: '8px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoadingStats ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: isLoadingStats ? 0.7 : 1
            }}
          >
            Refresh Data
          </button>
        </div>
      </div>
      
      {/* Overall Statistics Cards */}
      <div className="overall-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="stat-card" style={{ 
          backgroundColor: '#e8f5e8', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>Released Blocks</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#2e7d32'
          }}>
            {roomReleaseStats.releasedBlocks}
          </p>
          <small style={{ color: '#666' }}>out of {roomReleaseStats.totalBlocks} total blocks</small>
        </div>
        
        <div className="stat-card" style={{ 
          backgroundColor: '#e3f2fd', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Active Floors</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#1976d2'
          }}>
            {roomReleaseStats.activeFloors}
          </p>
          <small style={{ color: '#666' }}>out of {roomReleaseStats.totalFloors} total floors</small>
        </div>
        
        <div className="stat-card" style={{ 
          backgroundColor: '#fff3e0', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>Total Beds</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#f57c00'
          }}>
            {roomReleaseStats.totalBeds}
          </p>
          <small style={{ color: '#666' }}>across all blocks</small>
        </div>
        
        <div className="stat-card" style={{ 
          backgroundColor: '#fce4ec', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#c2185b' }}>Occupied Beds</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#c2185b'
          }}>
            {roomReleaseStats.occupiedBeds}
          </p>
          <small style={{ color: '#666' }}>Occupancy: {roomReleaseStats.overallOccupancyRate}%</small>
        </div>
        
        <div className="stat-card" style={{ 
          backgroundColor: '#f3e5f5', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#7b1fa2' }}>Available Beds</h3>
          <p className="stat-number" style={{ 
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            margin: '0',
            color: '#7b1fa2'
          }}>
            {roomReleaseStats.availableBeds}
          </p>
          <small style={{ color: '#666' }}>ready for allocation</small>
        </div>
      </div>

      {/* Detailed Block Information */}
      <div className="blocks-overview">        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: '0', color: '#333' }}>Block-wise Occupancy Details</h2>
        </div>
        
        <div className="blocks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          {roomReleaseStats.blocks.map((block) => (
            <div key={block.blockId} className="block-card" style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div className="block-header" style={{
                padding: '15px',
                backgroundColor: block.isActive ? (block.gender === 'Girls' ? '#ffebee' : '#e3f2fd') : '#f5f5f5',
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'              }}>                <div>
                  <h3 style={{ margin: '0', color: '#333' }}>{block.blockName}</h3>
                  <span style={{ 
                    fontSize: '14px',
                    color: block.gender === 'Girls' ? '#e91e63' : '#2196f3',
                    fontWeight: 'bold'
                  }}>
                    {block.gender} Block
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: block.isActive ? '#4caf50' : '#f44336',
                    color: 'white'
                  }}>
                    {block.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    {block.occupancyRate}% Occupied
                  </div>
                </div>
              </div>
              
              <div className="block-stats" style={{ padding: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4caf50' }}>{block.activeFloors}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Active Floors</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff9800' }}>{block.occupiedBeds}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Occupied Beds</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196f3' }}>{block.availableBeds}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Available Beds</div>
                  </div>
                </div>
                
                <div className="floors-detail">
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#333' }}>Floor Details:</h4>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {block.floors.map((floor) => (
                      <div key={floor.floorNumber} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #eee'
                      }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ 
                            fontSize: '13px', 
                            fontWeight: floor.isActive ? 'bold' : 'normal',
                            color: floor.isActive ? '#333' : '#999'
                          }}>
                            {floor.floorName}
                          </span>
                          {!floor.isActive && (
                            <span style={{ 
                              fontSize: '11px', 
                              color: '#f44336',
                              marginLeft: '8px',
                              fontStyle: 'italic'
                            }}>
                              (Inactive)
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {floor.occupiedBeds}/{floor.totalBeds} beds
                        </div>
                        <div style={{ 
                          minWidth: '40px',
                          textAlign: 'right',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: floor.occupancyRate > 80 ? '#f44336' : floor.occupancyRate > 50 ? '#ff9800' : '#4caf50'
                        }}>
                          {floor.occupancyRate}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AdminOverview;
