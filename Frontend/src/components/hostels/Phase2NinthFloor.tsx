import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Configuration for Phase 2 Ninth Floor
export const phase2NinthFloorConfig: Record<string, FloorConfig> = {
  "9th Floor": { start: 901, end: 943, exceptions: [] }
};

// Component for rendering Phase 2 Ninth Floor specifically
const Phase2NinthFloorPlan: React.FC<FloorPlanProps> = ({ 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  // Room dimensions and spacing
  const roomW = 40; // Room width
  const roomH = 40; // Room height
  const vGap = 5;   // Vertical gap
  const hGap = 10;  // Horizontal gap

  // Function to determine room occupancy status
  const getRoomOccupancyStatus = (roomNumber: string): { color: string; status: string } => {
    const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
    const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
    
    const isOccupiedA = occupiedBeds[bedAKey] || false;
    const isOccupiedB = occupiedBeds[bedBKey] || false;
    
    if (isOccupiedA && isOccupiedB) {
      return { color: '#fecaca', status: 'Fully Occupied' }; // Light red for fully occupied
    } else if (isOccupiedA || isOccupiedB) {
      return { color: '#fef08a', status: 'Partially Occupied' }; // Light yellow for partially occupied
    } else {
      return { color: '#bbf7d0', status: 'Available' }; // Light green for available
    }
  };

  // Define the elements for the 9th floor layout
  const elements = [
    // --- Top Horizontal Section ---
    // Rooms Row 1 (top row)
    { id: '912', x: 10, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '917', x: 10 + roomW + hGap, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '918', x: 10 + 2 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '919', x: 10 + 3 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '920', x: 10 + 4 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '924', x: 10 + 5 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '925', x: 10 + 6 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '926', x: 10 + 7 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '927', x: 10 + 8 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '928', x: 10 + 9 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '929', x: 10 + 10 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '930', x: 10 + 11 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '931', x: 10 + 12 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '932', x: 10 + 13 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '933', x: 10 + 14 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '934', x: 10 + 15 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '935', x: 10 + 16 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '936', x: 10 + 17 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '937', x: 10 + 18 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '938', x: 10 + 19 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '939', x: 10 + 20 * (roomW + hGap), y: 10, width: roomW, height: roomH, type: 'room' },

    // Corridor - horizontal sections
    { id: 'corridor_top_left', x: 10 + roomW + hGap, y: 10 + roomH + vGap, width: 16 * (roomW + hGap) - hGap, height: 15, type: 'corridor' },
    { id: 'corridor_top_right', x: 10 + 17 * (roomW + hGap), y: 10 + roomH + vGap, width: 4 * (roomW + hGap) - hGap, height: 15, type: 'corridor' },

    // Row 2 (middle row)
    { id: '911', x: 10, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'Stairs_Top_L', x: 60 + roomW + hGap, y: 10 + 3 * (roomH + vGap), width:40, height: roomH, type: 'common', label: 'Stairs' },
    { id: '923', x: 10 + roomW + hGap + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '922', x: 10 + 2 * (roomW + hGap) + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '921', x: 10 + 3 * (roomW + hGap) + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_L', x: 10 + 4 * (roomW + hGap) + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_M1', x: 10 + 4 * (roomW + hGap) + 3 * roomW + 2 * hGap, y: 10 + 2 * (roomH + vGap), width: 40, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_M1', x: 10 + 4 * (roomW + hGap) + 4.5 * roomW + 3 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    { id: 'WR', x: 10 + 4 * (roomW + hGap) + 6 * roomW + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'WR' },
    { id: '943', x: 10 + 14 * (roomW + hGap), y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_R', x: 10 + 15 * (roomW + hGap) + hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_M2', x: 10 + 15 * (roomW + hGap) + roomW * 1.5 + 2 * hGap, y: 10 + 2 * (roomH + vGap), width: 20, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_R', x: 10 + 14 * (roomW + hGap) + roomW * 3 + 3 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    { id: '940', x: 10 + 16 * (roomW + hGap) + roomW * 4.5 + 4 * hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },

    // Left Vertical Section
    { id: '910', x: 10, y: 10 + 3 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Left_1', x: 105, y: 10 + 4 * (roomH + vGap), width: roomW, height: 90, type: 'common', label: 'WS' },
    { id: '909', x: 10, y: 10 + 5 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'Balcony_Left', x: 10, y: 10 + 6 * (roomH + vGap), width: roomW, height: 90, type: 'common', label: 'Balco' },
    { id: '912A', x: 105, y: 10 + 6 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    { id: '914', x: 105, y: 10 + 7 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    
    // Corridor - vertical (left side)
    { id: 'corridor_left', x: 10 + roomW + hGap/2, y: 10 + 8 * (roomH + vGap), width: 15, height: 3 * (roomH + vGap), type: 'corridor' },
    
    { id: '908', x: 10, y: 10 + 8 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    { id: '907', x: 10, y: 10 + 9 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    
    // Gap in the layout
    { id: 'Lifts_Left', x: 105, y: 10 + 14 * (roomH + vGap), width: roomW, height: roomH * 1.5, type: 'common', label: 'Lifts' },
    { id: '905', x: 10, y: 10 + 13 * (roomH + vGap) + roomH * 0.5, width: roomW, height: roomH, type: 'room' },
      
    { id: 'Stairs_Left', x: 105, y: 10 + 15* (roomH + vGap) + roomH * 0.5, width: roomW, height: roomH * 1.5, type: 'common', label: 'Stairs' },
    { id: '904', x: 10, y: 10 + 14 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: '903', x: 10, y: 10 + 15 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: '902', x: 10, y: 10 + 16 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: '901', x: 10, y: 10 + 17 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },

    // Second Vertical Section
    { id: '915', x: 10 + 2 * (roomW + hGap), y: 10 + 9 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    { id: '916', x: 10 + 2 * (roomW + hGap), y: 10 + 10 * (roomH + vGap) + roomH/2, width: roomW, height: roomH, type: 'room' },
    { id: '906', x: 100, y: 10 + 17 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },

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
        Phase 2 - 9th Floor
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
            const roomId = el.id; // Use room ID directly (already has numbers like 901)
            
            // Get room status if it's a clickable room
            let fillColor;
            let occupancyText = '';
            
            if (isClickableRoom) {
              const roomStatus = getRoomOccupancyStatus(roomId);
              fillColor = roomStatus.color;
              occupancyText = roomStatus.status;
            } else if (el.id.includes('WS')) {
              // Special color for washrooms
              fillColor = '#fff9c4'; // Light yellow for washrooms
            } else if (el.id.includes('Stairs')) {
              // Special color for stairs
              fillColor = '#c8e6c9'; // Light green for stairs
            } else if (el.id.includes('Lifts')) {
              // Special color for lifts
              fillColor = '#bbdefb'; // Light blue for lifts
            } else if (el.id.includes('Balcony')) {
              // Use balcony style
              fillColor = styles.balcony.fill;
            } else if (el.id.includes('WR')) {
              // Use waiting room style
              fillColor = styles.waitingroom.fill;
            } else {
              // Default for other common areas
              fillColor = '#d3d3d3'; // Light gray
            }
            
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

export default Phase2NinthFloorPlan;