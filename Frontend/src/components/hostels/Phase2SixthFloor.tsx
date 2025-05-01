import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Configuration for Phase 2 Sixth Floor
export const phase2SixthFloorConfig: Record<string, FloorConfig> = {
  "6th Floor": { start: 601, end: 653, exceptions: [] }
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

// Component for rendering Phase 2 Sixth Floor specifically
const Phase2SixthFloorPlan: React.FC<FloorPlanProps> = ({ 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  // Room dimensions and spacing
  const roomW = 40; // Room width
  const roomH = 40; // Room height
  const vGap = 5;   // Vertical gap
  const hGap = 0;   // Horizontal gap
  
  // Helper function for vertical positioning
  const getY = (baseY: number, rowNum: number): number => baseY - (rowNum * (roomH + vGap));

  // Calculate derived positions
  const wsTopLEndX = 10 + 6*(roomW + hGap) + roomW * 1.5 + hGap; // End X of first top WS
  const liftsTopMEndX = wsTopLEndX + hGap + roomW + hGap + roomW; // End X of first top Lifts
  const startBottomRightX = liftsTopMEndX + hGap; // Start X for second horizontal group
  const g650EndX = startBottomRightX + 3*(roomW + hGap) + roomW; // End X of room 650
  const wsTopREndX = g650EndX + hGap * 3 + roomW * 1.5 + hGap; // End X of second top WS
  const g649StartX = wsTopREndX + hGap + 2*(roomW + hGap) + hGap; // Calculate 649 start X

  // Corridor widths and positions
  const corridorWidth = 15;
  const verticalCorridorX = 55; // X position of vertical corridor
  const verticalCorridorLength = 500; // Length of vertical corridor
  const horizontalCorridorY = getY(560, 16); // Y position of horizontal corridor
  const horizontalCorridorLength = 1300; // Length of horizontal corridor

  const elements = [
    // --- Corridors (Added first so they appear behind rooms) ---
    // Vertical corridor
    { 
      id: 'vertical_corridor', 
      x: verticalCorridorX, 
      y: getY(100, 0), 
      width: corridorWidth, 
      height: verticalCorridorLength, 
      type: 'corridor'
    },
    // Horizontal corridor
    { 
      id: 'horizontal_corridor', 
      x: 10, 
      y: horizontalCorridorY, 
      width: horizontalCorridorLength, 
      height: corridorWidth, 
      type: 'corridor'
    },
    
    // --- Bottom Vertical Section (Left) ---
    // Column 1 (x=10)
    { id: '601', x: 10, y: getY(600, 0), width: roomW, height: roomH, type: 'room' },
    { id: '602', x: 10, y: getY(600, 1), width: roomW, height: roomH, type: 'room' },
    { id: '603', x: 10, y: getY(600, 2), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Btm_L', x: 105, y: getY(600, 2) - 5, width: roomW, height: 90, type: 'common', label: 'WS' },
    { id: 'Stairs_Btm_L', x: 105, y: getY(600, 3) - 5, width: roomW, height: 40, type: 'common', label: 'Stairs' },
    { id: '604', x: 10, y: getY(600, 3), width: roomW, height: roomH, type: 'room' },
    { id: '605', x: 10, y: getY(600, 4), width: roomW, height: roomH, type: 'room' },
    { id: 'Lifts_Btm_L', x: 105, y: getY(600, 5) - 5, width: roomW, height: 60, type: 'common', label: 'Lifts' },
    { id: '606', x: 10, y: getY(600, 5), width: roomW, height: roomH, type: 'room' },
    { id: '607', x: 10, y: getY(600, 6), width: roomW, height: roomH, type: 'room' },

    // Column 2 (x=50) - Bottom part aligns with Column 1
    { id: '608', x: 60 + roomW + hGap, y: getY(600, 0), width: roomW, height: roomH, type: 'room' },
    // Middle part aligns with mid-section of Column 1
    { id: '609', x: -30 + roomW + hGap, y: getY(600, 9), width: roomW, height: roomH, type: 'room' },
    { id: '610', x: -30 + roomW + hGap, y: getY(600, 10), width: roomW, height: roomH, type: 'room' },
    { id: '611', x: -30 + roomW + hGap, y: getY(600, 11), width: roomW, height: roomH, type: 'room' },
    { id: '612', x:-30 + roomW + hGap, y: getY(600, 12), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Mid_L', x: 50 + roomW + hGap, y: getY(600, 14) - 5, width: roomW, height: 90, type: 'common', label: 'WS' },
    { id: '613', x: -30 + roomW + hGap, y: getY(600, 13), width: roomW, height: roomH, type: 'room' },
    { id: '614', x: -30 + roomW + hGap, y: getY(600, 14), width: roomW, height: roomH, type: 'room' },
    { id: '615', x: -30 + roomW + hGap, y: getY(600, 15), width: roomW, height: roomH, type: 'room' },
    { id: '616', x: -30 + roomW + hGap, y: getY(600, 16), width: roomW, height: roomH, type: 'room' }, // Aligns with bottomRowY

    // Column 3 (x=90)
    { id: '622', x: 10 + 2*(roomW + hGap), y: getY(600, 9), width: roomW, height: roomH, type: 'room' },
    { id: '621', x: 10 + 2*(roomW + hGap), y: getY(600, 10), width: roomW, height: roomH, type: 'room' },
    { id: '620', x: 10 + 2*(roomW + hGap), y: getY(600, 11), width: roomW, height: roomH, type: 'room' },
    { id: '619', x: 10 + 2*(roomW + hGap), y: getY(600, 12), width: roomW, height: roomH, type: 'room' },


    // --- Top Horizontal Section ---
    // Bottom Row Left Part (aligned with Col 3)
    { id: 'Stairs_Top_L', x: 10 + 2*(roomW + hGap), y:getY(600,15)-5, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
    { id: '635', x: 20 + 3*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '634', x: 30 + 4*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '633', x: 40 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_L', x: 50 + 6*(roomW + hGap), y: getY(650,17)-5, width: 130, height: roomH, type: 'common', label: 'WS' }, // Wider WS
    { id: 'Stairs_Top_M', x:240 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_M', x: 300 + 5*(roomW + hGap) , y: getY(650,17)-5, width: 90, height: roomH, type: 'common', label: 'Lifts' },

    // Top Row Left Part (aligned with bottom row where possible)
    { id: '617', x: 10, y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '618', x: 50 + roomW + hGap, y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '623', x: 20 + 3*(roomW + hGap), y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 623 above 635
    { id: '624', x: 30 + 4*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 624 above 634
    { id: '625', x: 40 + 5*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 625 above 633
    { id: '626', x: 50 + 6*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 626 above start of WS
    { id: '627', x: 60 + 7*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '628', x: 70 + 8*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 628 above Stairs_M
    { id: '629', x: 80 + 9*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 629 above Lifts_M
    { id: '630', x: 90 + 10*(roomW + hGap), y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '631', x: 100 + 11*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '632', x: 110 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },

    // Bottom Row Right Part
    { id: '653', x: 440 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '652', x: 490 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '651', x: 540 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '650', x: 600 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_R', x: 720 + 5*(roomW + hGap), y: getY(650,17)-5, width:110, height: roomH, type: 'common', label: 'WS' }, // Wider WS, larger gap
    { id: 'Stairs_Top_R', x: 850 + 5*(roomW + hGap), y:getY(650,17)-5, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_R',x: 910 + 5*(roomW + hGap), y: getY(650,17)-5, width: 60, height: roomH, type: 'common', label: 'Lifts' },
    { id: '649', x: 1060 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' }, // Use calculated start X

    // Top Row Right Part (aligned with bottom row where possible)
    { id: '636', x: 160 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 636 above 653
    { id: '637', x: 170 + 12*(roomW + hGap) + (roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 637 above 652
    { id: '638', x:180 + 12*(roomW + hGap) + 2*(roomW + hGap), y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 638 above 651
    { id: '639', x: 190 + 12*(roomW + hGap) + 3*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 639 above 650
    { id: '640', x: 200 + 12*(roomW + hGap) + 4*(roomW + hGap) + hGap*2, y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 640 above start of WS_R gap
    { id: '641', x: 210 + 12*(roomW + hGap)+ 5*(roomW + hGap) + hGap*2, y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '642', x: 460 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 642 above Stairs_R
    { id: '643', x: 510 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 643 above Lifts_R
    { id: '644', x:560 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Position relative to 649 start
    { id: '645', x: 610 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 645 above 649
    { id: '646', x: 660 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '647', x: 710 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '648', x: 770 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },

    // Connection corridors (vertical connections between rooms and horizontal corridor)
    {
      id: 'conn_corridor_1',
      x: 30,
      y: getY(600, 0) + roomH,
      width: corridorWidth,
      height: getY(560, 17) - getY(600, 0) - roomH + 15,
      type: 'corridor'
    },
    {
      id: 'conn_corridor_2',
      x: 70 + roomW + hGap,
      y: getY(600, 0) + roomH,
      width: corridorWidth,
      height: getY(560, 17) - getY(600, 0) - roomH + 15,
      type: 'corridor'
    },
    {
      id: 'conn_corridor_3',
      x: 100 + 2*(roomW + hGap),
      y: getY(550, 15) + roomH,
      width: corridorWidth,
      height: horizontalCorridorY - getY(550, 15) - roomH + 15,
      type: 'corridor'
    },
    {
      id: 'conn_corridor_4',
      x: 550 + 4*(roomW + hGap),
      y: getY(550, 15) + roomH,
      width: corridorWidth,
      height: horizontalCorridorY - getY(550, 15) - roomH + 15,
      type: 'corridor'
    },

    // Labels (Adjusted positions)
    { id: 'Corridor_Btm_V', x: 30 + roomW + hGap/2, y: 400, label: 'Corridor', type: 'label', rotation: -90 }, // Centered in gap
    { id: 'Corridor_Mid_V', x: 0 + 2*(roomW + hGap) - hGap/2, y: 40, label: 'Corridor', type: 'label', rotation: -90 }, // Centered in gap
    { id: 'Corridor_Top_L', x: (10 + 2*(roomW + hGap) + liftsTopMEndX)/2, y:-140, label: 'Corridor', type: 'label', rotation: 0 }, // Centered horizontally
    { id: 'Corridor_Top_R', x: (liftsTopMEndX + hGap + g649StartX + roomW) / 2 , y: -140, label: 'Corridor', type: 'label', rotation: 0 }, // Centered horizontally
  ];

  // Calculate viewBox dimensions
  const padding = 15;
  const shapeElements = elements.filter(e => e.x !== undefined);
  const minX = Math.min(...shapeElements.map(e => e.x)) - padding;
  const minY = Math.min(...shapeElements.map(e => e.y ?? Infinity)) - padding;
  const maxX = Math.max(...shapeElements.map(e => (e.x || 0) + (e.width || 0))) + padding;
  const maxY = Math.max(...shapeElements.map(e => (e.y || 0) + (e.height || 0))) + padding;
  
  // Adjust bounds for rotated labels manually if needed
  const finalMaxX = maxX + 110; // Extra space for rotated label width
  const finalMaxY = maxY + 10; // Extra space for rotated label height
  
  const svgWidth = finalMaxX - minX; // Intrinsic width based on content
  const svgHeight = finalMaxY - minY; // Intrinsic height based on content
  
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
        Phase 2 - 6th Floor
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
            const lines = label.split('\n'); // Handle multi-line labels

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
            const roomId = el.id; // Use room ID directly (already has numbers like 601)
            
            // Get room status if it's a clickable room
            const { color: fillColor, status: occupancyText } = isClickableRoom ? getRoomOccupancyStatus(roomId, selectedBlock, selectedFloor, occupiedBeds) : { color: '#d3d3d3', status: el.label || el.id };
            
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
        
        {/* Add connecting lines between corridors */}
        <path 
          d="M75 100 L130 100" 
          stroke="#d1d5db" 
          strokeWidth="1" 
          fill="none"
          strokeDasharray="2,2"
        />
        <path 
          d="M75 200 L130 200" 
          stroke="#d1d5db" 
          strokeWidth="1" 
          fill="none"
          strokeDasharray="2,2"
        />
        <path 
          d="M75 300 L130 300" 
          stroke="#d1d5db" 
          strokeWidth="1" 
          fill="none"
          strokeDasharray="2,2"
        />
      </svg>
      
    </div>
  );
};

export default Phase2SixthFloorPlan;