import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Configuration for Phase 2 Eleventh Floor
export const phase2EleventhFloorConfig: Record<string, FloorConfig> = {
  "11th Floor": { start: 1101, end: 1149, exceptions: [1216, 1217, 1218, 1219] }
};

// Component for rendering Phase 2 Eleventh Floor specifically
const Phase2EleventhFloorPlan: React.FC<FloorPlanProps> = ({ 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  // Get room occupancy status for coloring
  const getRoomOccupancyStatus = (roomNumber: number): { color: string; status: string } => {
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
  }

  // Room dimensions and spacing
  const roomW = 40; // Room width
  const roomH = 40; // Room height
  const vGap = 5;   // Vertical gap
  const hGap = 10;  // Horizontal gap

  // Define the elements for the 11th floor layout
  const elements = [
    // --- Top Horizontal Section ---
    // Rooms Row 1 (top row)
    { id: '1112A', x: 10, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1112', x: 10 + roomW + hGap, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1118', x: 10 + 2 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1119', x: 10 + 3 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1120', x: 10 + 4 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1121', x: 10 + 5 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1122', x: 10 + 6 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1126', x: 10 + 7 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1127', x: 10 + 8 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1128', x: 10 + 9 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1129', x: 10 + 10 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1130', x: 10 + 11 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1131', x: 10 + 12 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1132', x: 10 + 13 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1133', x: 10 + 14 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1134', x: 10 + 15 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1135', x: 10 + 16 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1136', x: 10 + 17 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1137', x: 10 + 18 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1138', x: 10 + 19 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1139', x: 10 + 20 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1140', x: 10 + 21 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1141', x: 10 + 22 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1142', x: 10 + 23 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1143', x: 10 + 24 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },

    // Corridor - horizontal sections
    { id: 'corridor_top_left', x: 10 + 2 * (roomW + hGap), y: 10 + roomH + vGap, width: 16 * (roomW + hGap) - hGap, height: 15, type: 'corridor' },
    { id: 'corridor_top_right', x: 10 + 18 * (roomW + hGap), y: 10 + roomH + vGap, width: 7 * (roomW + hGap) - hGap, height: 15, type: 'corridor' },

    // Row 2 (middle row)
    { id: '1111', x: 10, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'Stairs_Top_L', x: 10 + roomW + hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Stairs' },
    { id: '1125', x: 10 + roomW + hGap + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1124', x: 10 + 2 * (roomW + hGap) + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1123', x: 10 + 3 * (roomW + hGap) + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_L', x: 10 + 4 * (roomW + hGap) + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_M1', x: 10 + 4 * (roomW + hGap) + 3 * roomW + 2 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_M1', x: 10 + 4 * (roomW + hGap) + 4.5 * roomW + 3 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    
    { id: '1149', x: 10 + 4 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1148', x: 10 + 5 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1147', x: 10 + 6 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1146', x: 10 + 7 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1145', x: 10 + 8 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    
    { id: 'WS_Top_R', x: 10 + 9 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_M2', x: 10 + 9 * (roomW + hGap) + 7.5 * roomW + 5 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_R', x: 10 + 9 * (roomW + hGap) + 9 * roomW + 6 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    { id: '1144', x: 10 + 9 * (roomW + hGap) + 10.5 * roomW + 7 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },

    // Left Vertical Section
    { id: '1110', x: 10, y: 10 + 3 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Left_1', x: 10, y: 10 + 4 * (roomH + vGap), width: roomW, height: roomH, type: 'common', label: 'WS' },
    { id: '1109', x: 10, y: 10 + 5 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1216', x: 10, y: 10 + 6 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1217', x: 10, y: 10 + 7 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    
    // Corridor - vertical (left side)
    { id: 'corridor_left', x: 10 + roomW + hGap/2, y: 10 + 8 * (roomH + vGap), width: 15, height: 3 * (roomH + vGap), type: 'corridor' },
    
    { id: '1108', x: 10, y: 10 + 9 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1107', x: 10, y: 10 + 10 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    
    // Gap in the layout
    { id: 'Lifts_Left', x: 10, y: 10 + 12 * (roomH + vGap), width: roomW, height: roomH * 1.5, type: 'common', label: 'Lifts' },
    { id: '1105', x: 10, y: 10 + 13 * (roomH + vGap) + roomH * 0.5, width: roomW, height: roomH, type: 'room' },
    
    // Corridor - vertical (left bottom)
    { id: 'corridor_left_bottom', x: 10 + roomW + hGap/2, y: 10 + 14 * (roomH + vGap), width: 15, height: 6 * (roomH + vGap) + roomH, type: 'corridor' },
    
    { id: 'Stairs_Left', x: 10, y: 10 + 15 * (roomH + vGap) + roomH * 0.5, width: roomW, height: roomH * 1.5, type: 'common', label: 'Stairs' },
    { id: '1104', x: 10, y: 10 + 16 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: '1103', x: 10, y: 10 + 17 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Left_2', x: 10, y: 10 + 18 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'common', label: 'WS' },
    { id: '1102', x: 10, y: 10 + 19 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: '1101', x: 10, y: 10 + 20 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },

    // Second Vertical Section
    { id: '1218', x: 10 + roomW + hGap, y: 10 + 9 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1219', x: 10 + roomW + hGap, y: 10 + 10 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1106', x: 10 + roomW + hGap, y: 10 + 20 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },

    // Labels for corridors
    { id: 'Corridor_Top_Left', x: 10 + 10 * (roomW + hGap), y: 10 + roomH + vGap + 7.5, label: 'Corridor', type: 'label', rotation: 0 },
    { id: 'Corridor_Top_Right', x: 10 + 21 * (roomW + hGap), y: 10 + roomH + vGap + 7.5, label: 'Corridor', type: 'label', rotation: 0 },
    { id: 'Corridor_Left', x: 10 + roomW + hGap/2 + 7.5, y: 10 + 9.5 * (roomH + vGap), label: 'Corridor', type: 'label', rotation: 90 },
    { id: 'Corridor_Left_Bottom', x: 10 + roomW + hGap/2 + 7.5, y: 10 + 17 * (roomH + vGap), label: 'Corridor', type: 'label', rotation: 90 }
  ];

  // Calculate viewBox dimensions
  const padding = 15;
  const shapeElements = elements.filter(e => e.x !== undefined);
  const minX = Math.min(...shapeElements.map(e => e.x || 0)) - padding;
  const minY = Math.min(...shapeElements.map(e => e.y || Infinity)) - padding;
  const maxX = Math.max(...shapeElements.map(e => (e.x || 0) + (e.width || 0))) + padding;
  const maxY = Math.max(...shapeElements.map(e => (e.y || 0) + (e.height || 0))) + padding;
  
  // Add space for rotated labels
  const finalMaxX = maxX + 50;
  const finalMaxY = maxY + 20;
  
  const svgWidth = finalMaxX - minX;
  const svgHeight = finalMaxY - minY;
  
  // Style definitions
  const styles = {
    room: {
      fill: 'white',
      stroke: 'black',
      strokeWidth: 0.5,
    },
    common: {
      fill: '#d3d3d3', // Light gray
      stroke: 'black',
      strokeWidth: 0.5,
    },
    corridor: {
      fill: '#f3f4f6', // Very light gray for corridors
      stroke: '#d1d5db',
      strokeWidth: 0.5,
      strokeDasharray: '2,2', // Dashed lines for corridors
    },
    text: {
      fontSize: '9px',
      fontFamily: 'sans-serif',
      textAnchor: 'middle' as const,
      dominantBaseline: 'middle' as const,
      pointerEvents: 'none' as const,
    },
    labelText: {
      fontSize: '10px',
      fontFamily: 'sans-serif',
      textAnchor: 'middle' as const,
      dominantBaseline: 'middle' as const,
    },
    stairs: {
      fill: '#c8e6c9', // Light green for stairs
      stroke: '#4caf50',
      strokeWidth: 0.5,
    },
    lifts: {
      fill: '#bbdefb', // Light blue for lifts
      stroke: '#2196f3',
      strokeWidth: 0.5,
    },
    ws: {
      fill: '#fff9c4', // Light yellow for washrooms
      stroke: '#ffeb3b',
      strokeWidth: 0.5,
    }
  };

  return (
    <div style={{ 
      width: '100%',
      height: '95vh',
      overflow: 'auto',
      border: '1px solid #eee',
      padding: '10px',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#e2e8f0', 
          textAlign: 'center', 
          fontWeight: 'bold',
          borderRadius: '4px',
          marginBottom: '10px' 
        }}
      >
        Phase 2 - 11th Floor
      </div>
      
      {/* SVG Floor Plan */}
      <svg 
        width={svgWidth} 
        height={svgHeight} 
        viewBox={`${minX} ${minY} ${svgWidth} ${svgHeight}`}
        style={{ border: '1px solid #ccc', display: 'block' }}
      >
        {elements.map((el) => {
          if (el.type === 'label') {
            // Render text labels
            const label = el.label || el.id;
            const lines = label.split('\n');

            return (
              <g key={el.id} transform={`rotate(${el.rotation || 0} ${el.x} ${el.y})`}>
                {lines.map((line, index) => (
                  <text
                    key={`${el.id}-line-${index}`}
                    x={el.x}
                    y={el.y + (index - (lines.length - 1) / 2) * 12}
                    style={styles.labelText}
                    textAnchor="middle"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          } else if (el.type === 'corridor') {
            // Render corridors
            return (
              <rect
                key={el.id}
                x={el.x}
                y={el.y}
                width={el.width}
                height={el.height}
                style={styles.corridor}
              />
            );
          } else if (el.type === 'room' || el.type === 'common') {
            // Determine if this element is a room that should be clickable and color-coded
            const isClickableRoom = el.type === 'room';
            const roomId = el.id; // Use room ID directly (already has numbers like 1101)
            
            // Get room status if it's a clickable room
            let fillColor = isClickableRoom ? getRoomOccupancyStatus(Number(roomId)).color : '#d3d3d3'; // Default: green for available rooms, gray for common areas
            
            // Render rectangles for rooms and common areas
            const style = { 
              ...(el.type === 'room' ? styles.room : styles.common), 
              fill: fillColor 
            };
            
            // Use custom label if provided, else use id
            const label = el.label || (isClickableRoom ? el.id : el.id);
            const textX = el.x + (el.width || 0) / 2;
            const textY = el.y + (el.height || 0) / 2;
            const lines = label.split('\n'); // Handle multi-line labels if any
            
            let occupancyText = isClickableRoom ? getRoomOccupancyStatus(Number(roomId)).status : '';

            // Determine font size based on special cases
            let specificTextStyle = styles.text;
            if (el.type === 'common' && lines.length > 1) {
              specificTextStyle = { 
                ...styles.text, 
                fontSize: '8px' 
              }; // Adjusted size for multi-line common
            }
            
            // For clickable room elements
            const handleClick = isClickableRoom ? () => onRoomClick(roomId) : undefined;
            
            return (
              <g key={el.id}>
                <rect
                  x={el.x}
                  y={el.y}
                  width={el.width}
                  height={el.height}
                  style={style}
                  rx={isClickableRoom ? 2 : 0} // Round corners for rooms
                  ry={isClickableRoom ? 2 : 0}
                  cursor={isClickableRoom ? 'pointer' : 'default'}
                  onClick={handleClick}
                  data-title={isClickableRoom ? occupancyText : label}
                />
                {lines.map((line, index) => (
                  <text
                    key={`${el.id}-line-${index}`}
                    x={textX}
                    y={textY + (index - (lines.length - 1) / 2) * (parseInt(specificTextStyle.fontSize) + 2)}
                    style={specificTextStyle}
                    pointerEvents="none"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default Phase2EleventhFloorPlan;