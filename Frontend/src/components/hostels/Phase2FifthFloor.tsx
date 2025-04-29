import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Configuration for Phase 2 Fifth Floor
export const phase2FifthFloorConfig: Record<string, FloorConfig> = {
  "5th Floor": { start: 501, end: 553, exceptions: [] }
};

// Component for rendering Phase 2 Fifth Floor specifically
const Phase2FifthFloorPlan: React.FC<FloorPlanProps> = ({ 
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
  const g550EndX = startBottomRightX + 3*(roomW + hGap) + roomW; // End X of room 550
  const wsTopREndX = g550EndX + hGap * 3 + roomW * 1.5 + hGap; // End X of second top WS
  const g549StartX = wsTopREndX + hGap + 2*(roomW + hGap) + hGap; // Calculate 549 start X

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
      y: getY(600, 0), 
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
    { id: '501', x: 10, y: getY(600, 0), width: roomW, height: roomH, type: 'room' },
    { id: '502', x: 10, y: getY(600, 1), width: roomW, height: roomH, type: 'room' },
    { id: '503', x: 10, y: getY(600, 2), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Btm_L', x: 105, y: getY(600, 2) - 5, width: roomW, height: 90, type: 'common', label: 'WS' },
    { id: 'Stairs_Btm_L', x: 105, y: getY(600, 3) - 5, width: roomW, height: 40, type: 'common', label: 'Stairs' },
    { id: '504', x: 10, y: getY(600, 3), width: roomW, height: roomH, type: 'room' },
    { id: '505', x: 10, y: getY(600, 4), width: roomW, height: roomH, type: 'room' },
    { id: 'Lifts_Btm_L', x: 105, y: getY(600, 5) - 5, width: roomW, height: 60, type: 'common', label: 'Lifts' },
    { id: '506', x: 10, y: getY(600, 5), width: roomW, height: roomH, type: 'room' },
    { id: '507', x: 10, y: getY(600, 6), width: roomW, height: roomH, type: 'room' },

    // Column 2 (x=50) - Bottom part aligns with Column 1
    { id: '508', x: 60 + roomW + hGap, y: getY(600, 0), width: roomW, height: roomH, type: 'room' },
    // Middle part aligns with mid-section of Column 1
    { id: '509', x: -30 + roomW + hGap, y: getY(600, 8), width: roomW, height: roomH, type: 'room' },
    { id: '510', x: -30 + roomW + hGap, y: getY(600, 9), width: roomW, height: roomH, type: 'room' },
    { id: '511', x: -30 + roomW + hGap, y: getY(600, 10), width: roomW, height: roomH, type: 'room' },
    { id: '512', x:-30 + roomW + hGap, y: getY(600, 11), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Mid_L', x: 50 + roomW + hGap, y: getY(600, 13) - 5, width: roomW, height: 90, type: 'common', label: 'WS' },
    { id: '513', x: -30 + roomW + hGap, y: getY(600, 12), width: roomW, height: roomH, type: 'room' },
    { id: '514', x: -30 + roomW + hGap, y: getY(600, 13), width: roomW, height: roomH, type: 'room' },
    { id: '515', x: -30 + roomW + hGap, y: getY(600, 14), width: roomW, height: roomH, type: 'room' },
    { id: '516', x: -30 + roomW + hGap, y: getY(600, 15), width: roomW, height: roomH, type: 'room' }, // Aligns with bottomRowY

    // Column 3 (x=90)
    { id: '522', x: 10 + 2*(roomW + hGap), y: getY(600, 8), width: roomW, height: roomH, type: 'room' },
    { id: '521', x: 10 + 2*(roomW + hGap), y: getY(600, 9), width: roomW, height: roomH, type: 'room' },
    { id: '520', x: 10 + 2*(roomW + hGap), y: getY(600, 10), width: roomW, height: roomH, type: 'room' },
    { id: '519', x: 10 + 2*(roomW + hGap), y: getY(600, 11), width: roomW, height: roomH, type: 'room' },


    // --- Top Horizontal Section ---
    // Bottom Row Left Part (aligned with Col 3)
    { id: 'Stairs_Top_L', x: 10 + 2*(roomW + hGap), y:getY(600,15)-5, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
    { id: '535', x: 20 + 3*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '534', x: 30 + 4*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '533', x: 40 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_L', x: 50 + 6*(roomW + hGap), y: getY(650,17)-5, width: 130, height: roomH, type: 'common', label: 'WS' }, // Wider WS
    { id: 'Stairs_Top_M', x:240 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_M', x: 300 + 5*(roomW + hGap) , y: getY(650,17)-5, width: 90, height: roomH, type: 'common', label: 'Lifts' },

    // Top Row Left Part (aligned with bottom row where possible)
    { id: '517', x: 10, y: getY(650,18)-5, width: roomW, height: roomH, type: 'room' },
    { id: '518', x: 50 + roomW + hGap, y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '523', x: 20 + 3*(roomW + hGap), y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 523 above 535
    { id: '524', x: 30 + 4*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 524 above 534
    { id: '525', x: 40 + 5*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 525 above 533
    { id: '526', x: 50 + 6*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 526 above start of WS
    { id: '527', x: 60 + 7*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '528', x: 70 + 8*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 528 above Stairs_M
    { id: '529', x: 80 + 9*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 529 above Lifts_M
    { id: '530', x: 90 + 10*(roomW + hGap), y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '531', x: 100 + 11*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '532', x: 110 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },

    // Bottom Row Right Part
    { id: '553', x: 440 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '552', x: 490 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '551', x: 540 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: '550', x: 600 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_R', x: 720 + 5*(roomW + hGap), y: getY(650,17)-5, width:110, height: roomH, type: 'common', label: 'WS' }, // Wider WS, larger gap
    { id: 'Stairs_Top_R', x: 850 + 5*(roomW + hGap), y:getY(650,17)-5, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_R',x: 910 + 5*(roomW + hGap), y: getY(650,17)-5, width: 60, height: roomH, type: 'common', label: 'Lifts' },
    { id: '549', x: 1060 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' }, // Use calculated start X

    // Top Row Right Part (aligned with bottom row where possible)
    { id: '536', x: 160 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 536 above 553
    { id: '537', x: 170 + 12*(roomW + hGap) + (roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 537 above 552
    { id: '538', x:180 + 12*(roomW + hGap) + 2*(roomW + hGap), y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 538 above 551
    { id: '539', x: 190 + 12*(roomW + hGap) + 3*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 539 above 550
    { id: '540', x: 200 + 12*(roomW + hGap) + 4*(roomW + hGap) + hGap*2, y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 540 above start of WS_R gap
    { id: '541', x: 210 + 12*(roomW + hGap)+ 5*(roomW + hGap) + hGap*2, y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '542', x: 460 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 542 above Stairs_R
    { id: '543', x: 510 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 543 above Lifts_R
    { id: '544', x:560 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Position relative to 549 start
    { id: '545', x: 610 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 545 above 549
    { id: '546', x: 660 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '547', x: 710 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
    { id: '548', x: 770 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },

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
    { id: 'Corridor_Top_R', x: (liftsTopMEndX + hGap + g549StartX + roomW) / 2 , y: -140, label: 'Corridor', type: 'label', rotation: 0 }, // Centered horizontally
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
        Phase 2 - 5th Floor
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
            const roomId = el.id; // Use room ID directly (already has numbers like 501)
            
            // Get room status if it's a clickable room
            let fillColor = isClickableRoom ? '#bbf7d0' : '#d3d3d3'; // Default: green for available rooms, gray for common areas
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

export default Phase2FifthFloorPlan;