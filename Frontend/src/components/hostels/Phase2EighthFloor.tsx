import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Configuration for Phase 2 Eighth Floor
export const phase2EighthFloorConfig: Record<string, FloorConfig> = {
  "8th Floor": { start: 801, end: 844, exceptions: [] }
};

// Component for rendering Phase 2 Eighth Floor specifically
const Phase2EighthFloorPlan: React.FC<FloorPlanProps> = ({ 
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

  // Function to get the room's occupancy status color
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
  };

  // Define the elements for the 8th floor layout
  const elements = [
    // --- Top Horizontal Section ---
    // Rooms Row 1 (top row)
    { id: '814', x: 10, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: 'Balcony_Top_L', x: 10 + roomW + hGap, y: 10, width: 110 * 0.5, height: roomH, type: 'common', label: 'Balcony' },
    { id: '819', x: 10+7 + roomW + hGap + roomW  + hGap, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '820', x: 10 + 2 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '821', x: 10 + 3 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '822', x: 10 + 4 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '826', x: 10 + 5 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '827', x: 10 + 6 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '828', x: 10 + 7 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '829', x: 10 + 8* (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '830', x: 10 + 9* (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '831', x: 10 + 10 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '832', x: 10 + 11 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '833', x: 10 + 12 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '834', x: 10 + 13 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '835', x: 10 + 14 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '836', x: 10 + 15 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '837', x: 10 + 16 * (roomW + hGap) + roomW * 1.5, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: 'Balcony_Top_R', x: 10 + 18 * (roomW + hGap) + roomW , y: 10, width: roomW * 2 + hGap, height: roomH, type: 'common', label: 'Balcony' },
    { id: '838', x: 10 + 18 * (roomW + hGap) + roomW * 3.5 + hGap, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '839', x: 10 + 19 * (roomW + hGap) + roomW * 3.5 + hGap, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '840', x: 10 + 20 * (roomW + hGap) + roomW * 3.5 + hGap, y: 10, width: roomW, height: roomH, type: 'room' },
    { id: '841', x: 10 + 21 * (roomW + hGap) + roomW * 3.5 + hGap, y: 10, width: roomW, height: roomH, type: 'room' },

    // Corridor - horizontal (middle)
    { id: 'corridor_top', x: 10 + roomW + hGap, y: 10 + roomH + vGap, width: 21 * (roomW + hGap) + roomW * 3.5, height: 15, type: 'corridor' },

    // Row 2 (middle row)
    { id: 'Stairs_Top_L', x: 80 + hGap, y: 10 + 2 * (roomH + vGap), width: 40, height: roomH, type: 'common', label: 'Stairs' },
    { id: '825', x: 10 + 5* hGap + roomW * 1.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '824', x: 10 + 7 * hGap + roomW * 2.5, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '823', x: 10 + 8 * hGap + roomW * 3.5, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_L', x: 10 + 10 * hGap + roomW * 4.5, y: 10 + 2 * (roomH + vGap), width: 60 * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_M1', x: 10 + 14 * hGap + roomW * 6, y: 10 + 2 * (roomH + vGap), width: 30 * 1.5, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_M1', x: 10 + 13 * hGap + roomW * 7.5, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    { id: '844', x: 10 + 14 * hGap + roomW * 9, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'Balcony_Mid', x: 10 + 15 * hGap + roomW * 10, y: 10 + 2 * (roomH + vGap), width: 40 * 2 + hGap, height: roomH, type: 'common', label: 'Balcony' },
    { id: '843', x: 10 + 16 * hGap + roomW * 12 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_R', x: 10 + 18 * hGap + roomW * 13 + hGap, y: 10 + 2 * (roomH + vGap), width: 80 * 1.5, height: roomH, type: 'common', label: 'WS' },
    { id: 'Stairs_Top_M2', x: 10 + 28 * hGap + roomW * 14.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW * 1.5, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_R', x: 10 + 30 * hGap + roomW * 16 + hGap, y: 10 + 2 * (roomH + vGap), width: 60 * 1.5, height: roomH, type: 'common', label: 'Lifts' },
    { id: '842', x: 10 + 50 * hGap + roomW * 17.5 + hGap, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },

    // --- Left Vertical Section ---
    { id: '812A', x: 10, y: 10 + 2 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '812', x: 10, y: 10 + 3 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Left_1', x: 90, y: 10 + 3 * (roomH + vGap), width: roomW, height: 60, type: 'common', label: 'WS' },
    { id: '811', x: 10, y: 10 + 4 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '810', x: 10, y: 10 + 5 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    
    
    { id: '809', x: 10, y: 10 + 6 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '808', x: 10, y: 10 + 7 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '807', x: 10, y: 10 + 8 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    
    // Gap in the layout
    { id: '805', x: 10, y: 10 + 12 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: 'Lifts_Left', x: 95, y: 10 + 13 * (roomH + vGap), width: roomW, height: roomH * 1.5, type: 'common', label: 'Lifts' },
    
    
    { id: '803', x: 10, y: 10 + 14 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },
    { id: '802', x: 10, y: 10 + 15 * (roomH + vGap) + roomH , width: roomW, height: roomH, type: 'room' },
    { id: 'Stairs_Left', x: 95, y: 10 + 14 * (roomH + vGap) + roomH, width: roomW, height: roomH * 1.5, type: 'common', label: 'Stairs' },
    { id: '801', x: 10, y: 10 + 16 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },

    // --- Second Vertical Section ---
    { id: '815', x: -6 + 2 * (roomW + hGap), y: 10 + 5 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '816', x: -6 + 2 * (roomW + hGap), y: 10 + 6 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '817', x: -6 + 2 * (roomW + hGap), y: 10 + 7 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '818', x:-6 + 2 * (roomW + hGap), y: 10 + 8 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    
    // Special rooms with adjustments
    { id: '804', x: 10 , y: 10 + 13 * (roomH + vGap), width: roomW, height: roomH, type: 'room' },
    { id: '806', x: 95, y: 10 + 16 * (roomH + vGap) + roomH, width: roomW, height: roomH, type: 'room' },

    // Labels for corridors
    { id: 'Corridor_Top', x: 10 + 12 * (roomW + hGap), y: 10 + roomH + vGap + 7.5, label: 'Corridor', type: 'label', rotation: 0 },
    { id: 'Corridor_Left', x: 10 + roomW + hGap/2 + 7.5, y: 10 + 7 * (roomH + vGap), label: 'Corridor', type: 'label', rotation: 90 },
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
        Phase 2 - 8th Floor
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
            const roomId = el.id; // Use room ID directly (already has numbers like 801)
            
            // Get room status if it's a clickable room
            let fillColor = isClickableRoom ? getRoomOccupancyStatus(Number(roomId)).color : '#d3d3d3'; // Default: green for available rooms, gray for common areas
            
            // Render rectangles for rooms and common areas
            const baseStyle = isClickableRoom ? styles.room : 
                        (el.label === 'Balcony' || el.id.includes('Balcony')) ? styles.balcony : styles.common;
            
            const style = { 
              ...baseStyle, 
              fill: fillColor 
            };
            
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
                  rx={(el.type === 'room' || el.label === 'Balcony' || el.id.includes('Balcony')) ? 2 : 0} // Round corners for rooms and balconies
                  ry={(el.type === 'room' || el.label === 'Balcony' || el.id.includes('Balcony')) ? 2 : 0}
                  cursor={isClickableRoom ? 'pointer' : 'default'}
                  onClick={handleClick}
                  data-title={isClickableRoom ? 'Room ' + roomId : label}
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

export default Phase2EighthFloorPlan;