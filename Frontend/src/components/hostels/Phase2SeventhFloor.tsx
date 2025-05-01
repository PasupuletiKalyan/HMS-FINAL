import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Configuration for Phase 2 Seventh Floor
export const phase2SeventhFloorConfig: Record<string, FloorConfig> = {
  "7th Floor": { start: 701, end: 751, exceptions: [] }
};

// Function to determine room occupancy status
const getRoomOccupancyStatus = (
  roomNumber: string,
  selectedBlock: string,
  selectedFloor: string,
  occupiedBeds: Record<string, boolean>
) => {
  const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
  const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
  
  const isOccupiedA = occupiedBeds[bedAKey] || false;
  const isOccupiedB = occupiedBeds[bedBKey] || false;
  
  if (isOccupiedA && isOccupiedB) {
    return { color: '#fecaca', status: 'Fully Occupied' }; // Red for fully occupied
  } else if (isOccupiedA || isOccupiedB) {
    return { color: '#fef08a', status: 'Partially Occupied' }; // Yellow for partially occupied
  } else {
    return { color: '#bbf7d0', status: 'Available' }; // Green for available
  }
};

// Component for rendering Phase 2 Seventh Floor specifically
const Phase2SeventhFloorPlan: React.FC<FloorPlanProps> = ({ 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  // Room dimensions and spacing
  const roomW = 40; // Room width
  const roomH = 40; // Room height
  const vGap = 5;   // Vertical gap
  const hGap = 10;  // Horizontal gap (increased for better spacing)
  
  // Define the elements for the 7th floor layout
  const elements = [
    // --- Top Horizontal Section ---
    // Rooms Row 1 (top row)
    { id: '714', x: 10, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '715', x: 10 + roomW + hGap, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '716', x: 10 + 3 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '721', x: 10 + 4 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '722', x: 10 + 5 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '723', x: 10 + 6 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '724', x: 10 + 7 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '728', x: 10 + 8 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '729', x: 10 + 9 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '730', x: 10 + 10* (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '731', x: 10 + 11 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '732', x: 10 + 12 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '733', x: 10 + 14 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '734', x: 10 + 15 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '735', x: 10 + 16 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '736', x: 10 + 17 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '737', x: 10 + 18 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '738', x: 10 + 19 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '739', x: 10 + 20 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '740', x: 10 + 21 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '741', x: 10 + 22 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '742', x: 10 + 23 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '743', x: 10 + 24 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '744', x: 10 + 25 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '745', x: 10 + 26 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },

    // Corridor - horizontal (middle)
    { id: 'corridor_top', x: 10, y: 10 + roomH + vGap, width: 24 * (roomW + hGap) + roomW, height: 15, type: 'corridor' },

    // Row 2 (middle row)
    { id: 'Stairs_Top_L', x: 60 + (roomW + hGap), y: 10 + 3 * roomH + vGap, width: 40, height: roomH, type: 'common', label: 'Stairs' },
    { id: '727', x: 10 +2*(roomW + hGap) + roomW  + hGap, y: 10 + 2 * roomH + vGap, width: roomW, height: roomH, type: 'room' },
    { id: '726', x: 10 + 3 * (roomW + hGap) + roomW + hGap, y: 10 + 2 * roomH + vGap, width: roomW, height: roomH, type: 'room' },
    { id: '725', x: 10 + 4 * (roomW + hGap) + roomW  + hGap, y: 10 + 2 * roomH + vGap, width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_L', x: 10 + 6 * (roomW + hGap) + roomW  + hGap, y: 10 + 2 * roomH + vGap, width: 60 * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_M', x: 10 + 8 * (roomW + hGap) + 1 * roomW + 2 * hGap, y: 10 + 2 * roomH + vGap, width: roomW , height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_M', x: 10 + 6 * (roomW + hGap) + 4.5 * roomW + 3 * hGap, y: 10 + 2 * roomH + vGap, width: 60 * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    { id: '751', x: 10 + 8 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * roomH + vGap, width: roomW, height: roomH, type: 'room' },
    { id: '750', x: 10 + 9 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * roomH + vGap, width: roomW, height: roomH, type: 'room' },
    { id: '749', x: 10 + 10 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * roomH + vGap, width: roomW, height: roomH, type: 'room' },
    { id: '748', x: 10 + 11 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * roomH + vGap, width: roomW, height: roomH, type: 'room' },
    { id: '747', x: 10 + 12 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * roomH + vGap, width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_R', x: 10 + 13 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * roomH + vGap, width: 60 * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_R', x: 10 + 14 * (roomW + hGap) + 7.5 * roomW + 5 * hGap, y: 10 + 2 * roomH + vGap, width: roomW * 1.5, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_R', x: 10 + 14 * (roomW + hGap) + 9 * roomW + 6 * hGap, y: 10 + 2 * roomH + vGap, width: roomW * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    { id: '746', x: 10 + 16 * (roomW + hGap) + 10.5 * roomW + 7 * hGap, y: 10 + 2 * roomH + vGap, width: roomW, height: roomH, type: 'room' },

    // --- Left Vertical Section ---
    { id: '712A', x: 10, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' }, // Aligns with row 2 start
    { id: 'WS_Left_1', x: 110, y: 10 + 4 * (roomH + vGap), width: roomW, height: 60, type: 'common', label: 'WS' },
    { id: '712', x: 10, y: 10 + 4 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '711', x: 10, y: 10 + 5 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '710', x: 10, y: 10 + 6 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    
    // Corridor - vertical (left side)
    
    { id: '709', x: 10, y: 10 + 7 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '708', x: 10, y: 10 + 8 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '707', x: 10, y: 10 + 9 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    
    // Gap in the layout
    { id: 'Lifts_Left', x: 110, y: 10 + 12 * (roomH + vGap), width: roomW, height: roomH * 1.5, type: 'common', label: 'Lifts' },
    { id: '705', x: 10, y: 30 + 12 * (roomH + vGap) + roomH * 0.5, width: roomW, height: roomH, type: 'room' },
    { id: 'Stairs_Left', x: 110, y: 10 + 13 * (roomH + vGap) + roomH * 0.5, width: roomW, height: roomH , type: 'common', label: 'Stairs' },
    
    // Corridor - vertical (left bottom)
    
    { id: '704', x: 10, y: 10 + 14 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '703', x: 10, y: 10 + 15 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Left_2', x: 110, y: 10 + 15 * (roomH + vGap), width: roomW, height: 80, type: 'common', label: 'WS' },
    { id: '702', x: 10, y: 10 + 16 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '701', x: 10, y: 10 + 17 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },

    // --- Second Vertical Section ---
    { id: '717', x: 10 + 2 * (roomW + hGap), y: 10 + 6 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '718', x: 10 + 2 * (roomW + hGap), y: 10 + 7 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '719', x: 10 + 2 * (roomW + hGap), y: 10 + 8 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '720', x: 10 + 2 * (roomW + hGap), y: 10 + 9 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    
    // Bottom section
    { id: '706', x: 10 + 2 * (roomW + hGap), y: 10 + 17 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },

    // Labels for corridors
    { id: 'Corridor_Top', x: 10 + 12 * (roomW + hGap), y: 10 + roomH + vGap + 7.5, label: 'Corridor', type: 'label', rotation: 0 },
    { id: 'Corridor_Left', x: 10 + roomW + hGap/2 + 7.5, y: 10 + 7 * (roomH + vGap), label: 'Corridor', type: 'label', rotation: 90 },
    { id: 'Corridor_Left_Bottom', x: 10 + roomW + hGap/2 + 7.5, y: 10 + 14 * (roomH + vGap), label: 'Corridor', type: 'label', rotation: 90 }
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
        Phase 2 - 7th Floor
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
            const roomId = el.id; // Use room ID directly (already has numbers like 701)
            
            // Get room status if it's a clickable room
            let { color: fillColor, status: occupancyText } = getRoomOccupancyStatus(roomId, selectedBlock, selectedFloor, occupiedBeds);
            
            // Render rectangles for rooms and common areas
            const style = isClickableRoom ? 
              { ...styles.room, fill: fillColor } : 
              styles.common;
            
            // Use custom label if provided, else use id
            const label = el.label || (isClickableRoom ? el.id : el.id);
            const textX = el.x + (el.width || 0) / 2;
            const textY = el.y + (el.height || 0) / 2;
            const lines = label.split('\n'); // Handle multi-line labels if any
            
            // Determine font size based on number of lines for common areas
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

export default Phase2SeventhFloorPlan;