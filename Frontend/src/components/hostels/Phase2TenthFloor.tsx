import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Configuration for Phase 2 Tenth Floor
export const phase2TenthFloorConfig: Record<string, FloorConfig> = {
  "10th Floor": { start: 1001, end: 1049, exceptions: [1016, 1017, 1018, 1019] }
};

// Component for rendering Phase 2 Tenth Floor specifically
const Phase2TenthFloorPlan: React.FC<FloorPlanProps> = ({ 
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

  // Define the elements for the 10th floor layout
  const elements = [
    // --- Top Horizontal Section ---
    // Rooms Row 1 (top row)
    { id: '1012', x: 10, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1017', x: 10 + roomW + hGap, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1018', x: 10 + 2 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1019', x: 10 + 3 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1020', x: 10 + 4 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1024', x: 10 + 5 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1025', x: 10 + 6 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1026', x: 10 + 7 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1027', x: 10 + 8 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1028', x: 10 + 9 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1029', x: 10 + 10 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1030', x: 10 + 11 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1031', x: 10 + 12 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1032', x: 10 + 13 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1033', x: 10 + 14 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1034', x: 10 + 15 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1035', x: 10 + 16 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1036', x: 10 + 17 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1037', x: 10 + 18 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1038', x: 10 + 19 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '1039', x: 10 + 20 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },

    // Corridor - horizontal sections
    { id: 'corridor_top_left', x: 10 + roomW + hGap, y: 10 + roomH + vGap, width: 16 * (roomW + hGap) - hGap, height: 15, type: 'corridor' },
    { id: 'corridor_top_right', x: 10 + 17 * (roomW + hGap), y: 10 + roomH + vGap, width: 4 * (roomW + hGap) - hGap, height: 15, type: 'corridor' },

    // Row 2 (middle row)
    { id: '1011', x: 10, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'Stairs_Top_L', x: 10 + roomW + hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Stairs' },
    { id: '1023', x: 10 + roomW + hGap + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1022', x: 10 + 2 * (roomW + hGap) + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '1021', x: 10 + 3 * (roomW + hGap) + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_L', x: 10 + 4 * (roomW + hGap) + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_M1', x: 10 + 4 * (roomW + hGap) + 3 * roomW + 2 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_M1', x: 10 + 4 * (roomW + hGap) + 4.5 * roomW + 3 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    { id: 'WR', x: 10 + 4 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'WR' },
    { id: '1043', x: 10 + 14 * (roomW + hGap), y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_R', x: 10 + 15 * (roomW + hGap) + hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_M2', x: 10 + 15 * (roomW + hGap) + roomW * 1.5 + 2 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_R', x: 10 + 15 * (roomW + hGap) + roomW * 3 + 3 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    { id: '1040', x: 10 + 15 * (roomW + hGap) + roomW * 4.5 + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },

    // Left Vertical Section
    { id: '1010', x: 10, y: 10 + 3 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Left_1', x: 10, y: 10 + 4 * (roomH + vGap), width: roomW, height: roomH, type: 'common', label: 'WS' },
    { id: '1009', x: 10, y: 10 + 5 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'Balcony_Left', x: 10, y: 10 + 6 * (roomH + vGap), width: roomW, height: roomH/2, type: 'common', label: 'Balco' },
    { id: '1012A', x: 10, y: 10 + 6 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    { id: '1014', x: 10, y: 10 + 7 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    
    // Corridor - vertical (left side)
    { id: 'corridor_left', x: 10 + roomW + hGap/2, y: 10 + 8 * (roomH + vGap), width: 15, height: 3 * (roomH + vGap), type: 'corridor' },
    
    { id: '1008', x: 10, y: 10 + 9 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    { id: '1007', x: 10, y: 10 + 10 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    
    // Gap in the layout
    { id: 'Lifts_Left', x: 10, y: 10 + 12 * (roomH + vGap), width: roomW, height: roomH * 1.5, type: 'common', label: 'Lifts' },
    { id: '1005', x: 10, y: 10 + 13 * (roomH + vGap) + roomH * 0.5, width: roomW, height: roomH, type: 'room' },
    
    // Corridor - vertical (left bottom)
    { id: 'corridor_left_bottom', x: 10 + roomW + hGap/2, y: 10 + 14 * (roomH + vGap), width: 15, height: 6 * (roomH + vGap) + roomH, type: 'corridor' },
    
    { id: 'Stairs_Left', x: 10, y: 10 + 15 * (roomH + vGap) + roomH * 0.5, width: roomW, height: roomH * 1.5, type: 'common', label: 'Stairs' },
    { id: '1004', x: 10, y: 10 + 16 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: '1003', x: 10, y: 10 + 17 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Left_2', x: 10, y: 10 + 18 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'common', label: 'WS' },
    { id: '1002', x: 10, y: 10 + 19 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: '1001', x: 10, y: 10 + 20 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },

    // Second Vertical Section
    { id: '1015', x: 10 + 2 * (roomW + hGap), y: 10 + 9 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    { id: '1016', x: 10 + 2 * (roomW + hGap), y: 10 + 10 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    { id: '1006', x: 10 + 2 * (roomW + hGap), y: 10 + 20 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },

    // Labels for corridors
    { id: 'Corridor_Top_Left', x: 10 + 8 * (roomW + hGap), y: 10 + roomH + vGap + 7.5, label: 'Corridor', type: 'label', rotation: 0 },
    { id: 'Corridor_Top_Right', x: 10 + 19 * (roomW + hGap), y: 10 + roomH + vGap + 7.5, label: 'Corridor', type: 'label', rotation: 0 },
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
    balcony: {
      fill: '#dcedc8', // Light green/olive for balconies
      stroke: '#8bc34a',
      strokeWidth: 0.5,
    },
    waitingroom: {
      fill: '#e1bee7', // Light purple for waiting room
      stroke: '#9c27b0',
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
        Phase 2 - 10th Floor
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
            const roomId = el.id; // Use room ID directly (already has numbers like 1001)
            
            // Get room status if it's a clickable room
            let fillColor = isClickableRoom ? getRoomOccupancyStatus(Number(roomId)).color : '#d3d3d3'; 
            let occupancyText = 'Available';
            
            if (isClickableRoom) {
              const roomNumber = roomId;
              const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
              const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
              
              const isOccupiedA = occupiedBeds[bedAKey] || false;
              const isOccupiedB = occupiedBeds[bedBKey] || false;
              
              if (isOccupiedA && isOccupiedB) {
                fillColor = '#fecaca'; // Red for fully occupied
                occupancyText = 'Fully Occupied';
              } else if (isOccupiedA || isOccupiedB) {
                fillColor = '#fef08a'; // Yellow for partially occupied
                occupancyText = 'Partially Occupied';
              }
            }
            
            // Render rectangles for rooms and common areas
            const style = { 
              ...baseStyle, 
              fill: fillColor 
            };
            
            // Use custom label if provided, else use id
            const label = el.label || (isClickableRoom ? el.id : el.id);
            const textX = el.x + (el.width || 0) / 2;
            const textY = el.y + (el.height || 0) / 2;
            const lines = label.split('\n'); // Handle multi-line labels if any
            
            // Determine font size based on special cases
            let specificTextStyle = styles.text;
            if (el.label === 'Balco') {
              specificTextStyle = { 
                ...styles.text, 
                fontSize: '8px' 
              };
            } else if (el.type === 'common' && lines.length > 1) {
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

export default Phase2TenthFloorPlan;