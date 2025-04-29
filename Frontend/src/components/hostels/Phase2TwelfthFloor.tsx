import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Configuration for Phase 2 Twelfth Floor
export const phase2TwelfthFloorConfig: Record<string, FloorConfig> = {
  "12th Floor": { start: 1201, end: 1251, exceptions: [] }
};

// SVG string for exporting and reusing the floor plan
export const phase2TwelfthFloorSvgString = `
<svg width="1530" height="790" class="bg-white block" xmlns="http://www.w3.org/2000/svg">
  <!-- Add your SVG paths here for export purposes -->
  <!-- Top Row -->
  <g><rect x="5" y="5" width="40" height="40" fill="#a0d2eb" stroke="#444444" stroke-width="1" rx="3" ry="3"></rect><text x="25" y="25" style="font-size: 10px; font-family: sans-serif; text-anchor: middle; dominant-baseline: middle; pointer-events: none; user-select: none; fill: #333333; font-weight: normal;">1214</text></g>
  <g><rect x="50" y="5" width="40" height="40" fill="#a0d2eb" stroke="#444444" stroke-width="1" rx="3" ry="3"></rect><text x="70" y="25" style="font-size: 10px; font-family: sans-serif; text-anchor: middle; dominant-baseline: middle; pointer-events: none; user-select: none; fill: #333333; font-weight: normal;">1215</text></g>
  <!-- Additional SVG elements would go here -->
</svg>
`;

// Component for rendering Phase 2 Twelfth Floor specifically
const Phase2TwelfthFloorPlan: React.FC<FloorPlanProps> = ({ 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  // Base size for a single room unit
  const roomSize = 40; 
  const padding = 5;   
  const cellSize = roomSize + padding; // Total size of a grid cell (45)

  // Calculate SVG dimensions based on the floor plan
  const maxX = 33; // Based on the widest row
  const maxY = 17; // Based on the highest row
  const svgWidth = maxX * cellSize + padding;
  const svgHeight = maxY * cellSize + padding;

  // Helper function to get room occupancy status color
  const getRoomOccupancyStatus = (roomNumber: string): { color: string; status: string } => {
    const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
    const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
    const isBedAOccupied = occupiedBeds[bedAKey] || false;
    const isBedBOccupied = occupiedBeds[bedBKey] || false;
    
    if (isBedAOccupied && isBedBOccupied) {
      return { color: '#fecaca', status: 'Fully Occupied' }; // Light red for fully occupied
    } else if (isBedAOccupied || isBedBOccupied) {
      return { color: '#fef08a', status: 'Partially Occupied' }; // Light yellow for partially occupied
    } else {
      return { color: '#bbf7d0', status: 'Available' }; // Light green for available
    }
  };

  // Helper function to determine fill color
  const getFillColor = (type: string, roomId: string) => {
    switch (type) {
      case 'room': 
        return getRoomOccupancyStatus(roomId).color;
      case 'corridor': return 'none'; // Transparent for corridors
      case 'utility': return '#ffeaa7'; // Light yellow for utilities
      default: return '#ffffff'; // White by default
    }
  };

  // Helper function to determine stroke color
  const getStrokeColor = (type: string) => {
    switch (type) {
      case 'corridor': return 'none';
      default: return '#444444'; // Dark gray for others
    }
  };

  // --- Floor Plan Element Data ---
  const elements = [
    // Top Row
    { id: '1214', x: 0, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1215', x: 1, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1220', x: 2, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1221', x: 3, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1222', x: 4, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1223', x: 5, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1224', x: 6, y: 0, w: 1, h: 1, type: 'room' },
    { id: 'Corridor', x: 7, y: 0, w: 4, h: 1, type: 'corridor' },
    { id: '1228', x: 11, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1229', x: 12, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1230', x: 13, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1231', x: 14, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1232', x: 15, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1233', x: 16, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1234', x: 17, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1235', x: 18, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1236', x: 19, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1237', x: 20, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1238', x: 21, y: 0, w: 1, h: 1, type: 'room' },
    { id: 'Corridor', x: 22, y: 0, w: 4, h: 1, type: 'corridor' },
    { id: '1239', x: 26, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1240', x: 27, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1241', x: 28, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1242', x: 29, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1243', x: 30, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1244', x: 31, y: 0, w: 1, h: 1, type: 'room' },
    { id: '1245', x: 32, y: 0, w: 1, h: 1, type: 'room' },

    // Second Row
    { id: '1212A', x: 0, y: 1, w: 1, h: 1, type: 'room' },
    { id: 'Stairs', x: 2, y: 1, w: 1, h: 1, type: 'utility' },
    { id: '1227', x: 3, y: 1, w: 1, h: 1, type: 'room' },
    { id: '1226', x: 4, y: 1, w: 1, h: 1, type: 'room' },
    { id: '1225', x: 5, y: 1, w: 1, h: 1, type: 'room' },
    { id: 'WS', x: 7, y: 1, w: 1, h: 1, type: 'utility' },
    { id: 'Stairs', x: 9, y: 1, w: 1, h: 1, type: 'utility' },
    { id: 'Lifts', x: 10, y: 1, w: 1, h: 1, type: 'utility' },
    { id: '1251', x: 11, y: 1, w: 1, h: 1, type: 'room' },
    { id: '1250', x: 12, y: 1, w: 1, h: 1, type: 'room' },
    { id: '1249', x: 13, y: 1, w: 1, h: 1, type: 'room' },
    { id: '1248', x: 14, y: 1, w: 1, h: 1, type: 'room' },
    { id: '1247', x: 15, y: 1, w: 1, h: 1, type: 'room' },
    { id: 'WS', x: 17, y: 1, w: 1, h: 1, type: 'utility' },
    { id: 'Stairs', x: 20, y: 1, w: 1, h: 1, type: 'utility' },
    { id: 'Lifts', x: 21, y: 1, w: 1, h: 1, type: 'utility' },
    { id: '1246', x: 23, y: 1, w: 1, h: 1, type: 'room' },

    // Left Column
    { id: '1212', x: 0, y: 2, w: 1, h: 1, type: 'room' },
    { id: 'WS', x: 1, y: 2, w: 1, h: 1, type: 'utility' },
    { id: '1211', x: 0, y: 3, w: 1, h: 1, type: 'room' },
    { id: '1216', x: 1, y: 3, w: 1, h: 1, type: 'room' },
    { id: '1210', x: 0, y: 4, w: 1, h: 1, type: 'room' },
    { id: '1217', x: 1, y: 4, w: 1, h: 1, type: 'room' },
    { id: 'Corridor', x: 0, y: 5, w: 2, h: 1, type: 'corridor' },
    { id: '1209', x: 0, y: 6, w: 1, h: 1, type: 'room' },
    { id: '1217A', x: 1, y: 6, w: 1, h: 1, type: 'room' }, // Changed the duplicate 1217 to 1217A
    { id: '1208', x: 0, y: 7, w: 1, h: 1, type: 'room' },
    { id: '1218', x: 1, y: 7, w: 1, h: 1, type: 'room' },
    { id: '1207', x: 0, y: 8, w: 1, h: 1, type: 'room' },
    { id: '1219', x: 1, y: 8, w: 1, h: 1, type: 'room' },

    // Bottom Left
    { id: 'Lifts', x: 1, y: 10, w: 1, h: 1, type: 'utility' },
    { id: '1205', x: 0, y: 11, w: 1, h: 1, type: 'room' },
    { id: 'Stairs', x: 1, y: 11, w: 1, h: 1, type: 'utility' },
    { id: '1204', x: 0, y: 12, w: 1, h: 1, type: 'room' },
    { id: 'Corridor', x: 0, y: 13, w: 2, h: 1, type: 'corridor' },
    { id: '1203', x: 0, y: 14, w: 1, h: 1, type: 'room' },
    { id: 'WS', x: 1, y: 14, w: 1, h: 1, type: 'utility' },
    { id: '1202', x: 0, y: 15, w: 1, h: 1, type: 'room' },
    { id: '1201', x: 0, y: 16, w: 1, h: 1, type: 'room' },
    { id: '1206', x: 1, y: 16, w: 1, h: 1, type: 'room' },
  ];

  // Function to render the floor layout with SVG
  const renderFloorLayout = () => {
    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        className="bg-white block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Map over the elements data array to render each item */}
        {elements.map((el, index) => {
          // Calculate pixel position (top-left corner) based on grid coordinates
          const px = el.x * cellSize + padding / 2;
          const py = el.y * cellSize + padding / 2;
          // Calculate pixel width/height based on grid span, accounting for padding
          const pw = el.w * cellSize - padding;
          const ph = el.h * cellSize - padding;

          // Calculate center coordinates for placing the text
          const textX = px + pw / 2;
          const textY = py + ph / 2;

          // Handle click events for room elements
          const handleClick = () => {
            if (el.type === 'room') {
              onRoomClick(el.id);
            }
          };

          return (
            <g 
              key={`${el.id}-${index}-${el.x}-${el.y}`} 
              className="group"
              onClick={el.type === 'room' ? handleClick : undefined}
            >
              {/* Conditionally render the rectangle ONLY if it's NOT a corridor */}
              {el.type !== 'corridor' && (
                <rect
                  x={px}
                  y={py}
                  width={pw}
                  height={ph}
                  fill={getFillColor(el.type, el.id)}
                  stroke={getStrokeColor(el.type)}
                  strokeWidth="1"
                  rx="3"
                  ry="3"
                  className={el.type === 'room' ? "group-hover:opacity-80 transition-opacity duration-150 cursor-pointer" : ""}
                />
              )}
              {/* Text label */}
              <text
                x={textX}
                y={textY}
                style={{
                  fontSize: '10px',
                  fontFamily: 'sans-serif',
                  textAnchor: 'middle',
                  dominantBaseline: 'middle',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  fill: el.type === 'corridor' ? '#555555' : '#333333',
                  fontWeight: el.type === 'corridor' ? 'bold' : 'normal'
                }}
              >
                {el.id}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  // Check if we should use the standard grid layout or the custom floor plan
  const floorInfo = phase2TwelfthFloorConfig["12th Floor"];
  
  // Use the SVG floor plan layout
  if (selectedFloor === "12th Floor") {
    return (
      <div className="room-list-container">
        <h3>{`${selectedBlock} - ${selectedFloor}`}</h3>
        {renderFloorLayout()}
      </div>
    );
  } else {
    // This else block isn't needed since this component only renders the 12th floor
    return (
      <div className="room-list-container">
        <h3>{`${selectedBlock} - ${selectedFloor}`}</h3>
        <div className="room-grid">
          <p>Floor plan not available</p>
        </div>
      </div>
    );
  }
};

export default Phase2TwelfthFloorPlan;