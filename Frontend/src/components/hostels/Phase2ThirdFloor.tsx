import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Configuration for Phase 2 Third Floor
export const phase2ThirdFloorConfig: Record<string, FloorConfig> = {
  "3rd Floor": { start: 301, end: 345, exceptions: [] }
};

// Component for rendering Phase 2 Third Floor specifically
const Phase2ThirdFloorPlan: React.FC<FloorPlanProps> = ({ 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  // Helper function to determine room occupancy status
  const getRoomOccupancyStatus = (roomNumber: number): string => {
    const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
    const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
    const isBedAOccupied = occupiedBeds[bedAKey] || false;
    const isBedBOccupied = occupiedBeds[bedBKey] || false;
    
    if (isBedAOccupied && isBedBOccupied) {
      return '#fecaca'; // Light red for fully occupied
    } else if (isBedAOccupied || isBedBOccupied) {
      return '#fef08a'; // Light yellow for partially occupied
    } else {
      return '#bbf7d0'; // Light green for available
    }
  }

  // Room dimensions and spacing
  const roomW = 40; // Room width
  const roomH = 40; // Room height
  const vGap = 5;   // Vertical gap
  const hGap = 5;   // Horizontal gap
  
  // Helper function for vertical positioning
  const getY = (baseY: number, rowNum: number): number => baseY - (rowNum * (roomH + vGap));
  
  // Calculate positions for the Top Horizontal Section - Left Part
  const wsTopLStartX = 10 + 5*(roomW + hGap) + hGap*2;
  const wsTopLEndX = wsTopLStartX + roomW * 1.5 + hGap; // End X of first top WS
  const liftsTopMEndX = wsTopLEndX + hGap + roomW + hGap + roomW; // End X of first top Lifts
  
  // Calculate positions for the Top Horizontal Section - Right Part
  const startBottomRightX = liftsTopMEndX + hGap; // Start X for second horizontal group
  const g342EndX = startBottomRightX + 3*(roomW + hGap) + roomW; // End X of room 342
  const wsTopREndX = g342EndX + hGap * 3 + roomW * 1.5 + hGap; // End X of second top WS
  const g341StartX = wsTopREndX + hGap + 2*(roomW + hGap) + hGap; // Start X for room 341

  // Corridor widths and positions
  const corridorWidth = 15;
  const verticalCorridorX = 60; // X position of vertical corridor
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
    { id: '301', x: 10, y: getY(600, 0), width: roomW, height: roomH, type: 'room' },
    { id: '302', x: 10, y: getY(600, 1), width: roomW, height: roomH, type: 'room' },
    { id: '303', x: 10, y: getY(600, 2), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Btm_L', x: 90, y: getY(600, 3) - 5, width: roomW, height: 120, type: 'common', label: 'WS' },
    { id: 'Stairs_Btm_L', x: 90, y: getY(600, 4) - 5, width: roomW, height: 40, type: 'common', label: 'Stairs' },
    { id: '304', x: 10, y: getY(590, 5), width: roomW, height: roomH, type: 'room' },
    { id: 'Lifts_Btm_L', x: 90, y: getY(600, 6) - 5, width: roomW, height: 70, type: 'common', label: 'Lifts' },
    { id: '305', x: 10, y: getY(590, 6), width: roomW, height: roomH, type: 'room' },
    { id: '307', x: 10, y: getY(590, 8), width: roomW, height: roomH, type: 'room' },
    { id: '308', x: 10, y: getY(590, 9), width: roomW, height: roomH, type: 'room' },
    { id: '309', x: 10, y: getY(590, 10), width: roomW, height: roomH, type: 'room' },
    { id: '310', x: 10, y: getY(590, 11), width: roomW, height: roomH, type: 'room' },
    { id: '311', x: 10, y: getY(590, 12), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Mid_L', x: 90, y: getY(600, 14) - 5, width: roomW, height: 90, type: 'common', label: 'WS' },
    { id: '312', x: 10, y: getY(590, 13), width: roomW, height: roomH, type: 'room' },
    
    // Column 2 (x=50) - Bottom part aligns with Column 1
    { id: '306', x:50 + roomW + hGap, y: getY(600, 0), width: roomW, height: roomH, type: 'room' },
    // Middle part aligns with mid-section of Column 1
    { id: '318', x: 50 + roomW + hGap, y: getY(590, 8), width: roomW, height: roomH, type: 'room' },
    { id: '317', x: 50 + roomW + hGap, y: getY(590, 9), width: roomW, height: roomH, type: 'room' },
    { id: '316', x: 50 + roomW + hGap, y: getY(590, 10), width: roomW, height: roomH, type: 'room' },
    { id: '315', x: 50 + roomW + hGap, y: getY(590, 11), width: roomW, height: roomH, type: 'room' },
    { id: 'Stairs_Top_L', x: 50 + roomW + hGap, y: getY(590, 15), width: roomW, height: roomH, type: 'common', label: 'Stairs' }, // Aligns with bottomRowY
    
    // --- Top Horizontal Section ---
    // Bottom Row Left Part (aligned with Col 3)
    { id: '329', x: 60 + 2*(roomW + hGap), y: getY(550, 15), width: roomW, height: roomH, type: 'room' },
    { id: '328', x: 70 + 3*(roomW + hGap), y: getY(550, 15), width: roomW, height: roomH, type: 'room' },
    { id: '327', x: 80 + 4*(roomW + hGap), y: getY(550, 15), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_L', x:150 + 4*(roomW + hGap), y: getY(550, 15), width: 150, height: roomH, type: 'common', label: 'WS' }, // Use calculated start X
    { id: 'Stairs_Top_M', x:330 + 4*(roomW + hGap), y:getY(550, 15), width: roomW, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_M', x: 400 + 4*(roomW + hGap), y: getY(550, 15), width: 80, height: roomH, type: 'common', label: 'Lifts' },
    
    // Top Row Left Part (aligned with bottom row where possible)
    { id: '312A', x: 10, y:getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '314', x: 50 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '319', x: 100 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' }, // Aligns 319 above 329
    { id: '320', x: 270 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' }, // Aligns 320 above 327
    { id: '321', x: 320 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' }, // Aligns 321 above start of WS gap
    { id: '322', x: 370 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' }, // Align 322 above WS
    { id: '323', x: 420 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '324', x: 470 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' }, // Align 324 above Stairs_M
    { id: '325', x: 520 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' }, // Align 325 above Lifts_M
    { id: '326', x: 570 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '330', x: 640 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '331',x: 690 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '332',x: 740 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '333',x: 790 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '334', x: 840 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '335',x: 890 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '336', x: 940 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    { id: '337', x: 990 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' },
    
    // Bottom Row Right Part
    { id: '345', x:510 + 4*(roomW + hGap), y: getY(550, 15), width: roomW, height: roomH, type: 'room' },
    { id: '344', x:560 + 4*(roomW + hGap), y: getY(550, 15), width: roomW, height: roomH, type: 'room' },
    { id: '343', x: 610 + 4*(roomW + hGap), y: getY(550, 15), width: roomW, height: roomH, type: 'room' },
    { id: '342', x:660 + 4*(roomW + hGap), y: getY(550, 15), width: roomW, height: roomH, type: 'room' },
    { id: 'WS_Top_R',x:730 + 4*(roomW + hGap), y: getY(550, 15), width: 140, height: roomH, type: 'common', label: 'WS' }, // Wider WS, larger gap
    { id: 'Stairs_Top_R', x:890 + 4*(roomW + hGap), y: getY(550, 15), width: roomW, height: roomH, type: 'common', label: 'Stairs' },
    { id: 'Lifts_Top_R', x:950 + 4*(roomW + hGap), y: getY(550, 15), width: 90, height: roomH, type: 'common', label: 'Lifts' },
    { id: '341', x: 1340, y: getY(550, 15), width: roomW, height: roomH, type: 'room' }, // Using calculated start X
    
    // Top Row Right Part (aligned with bottom row where possible)
    { id: '338',x: 1190 + roomW + hGap,y: getY(560, 17),width: roomW, height: roomH, type: 'room' }, // Aligns 338 above 344
    { id: '339', x: 1240 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' }, // Aligns 339 above 343
    { id: '340', x: 1290 + roomW + hGap,y: getY(560, 17), width: roomW, height: roomH, type: 'room' }, // Aligns 340 above 342
    
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
    { id: 'Corridor_Btm_V', x: 25 + roomW + hGap/2, y: 440, label: 'Corridor', type: 'label', rotation: -90 }, // Centered in gap
    { id: 'Corridor_Mid_V', x: 70, y: 300, label: 'Corridor', type: 'label', rotation: -90 }, // Centered in vertical corridor
    { id: 'Corridor_Top_L', x: 350, y: horizontalCorridorY + 7, label: 'Corridor', type: 'label', rotation: 0 }, // Centered horizontally
    { id: 'Corridor_Top_R', x: 800, y: horizontalCorridorY + 7, label: 'Corridor', type: 'label', rotation: 0 }, // Centered horizontally
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
        Phase 2 - 3rd Floor
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
            const roomId = el.id; // Use room ID directly (already has numbers like 301)
            
            // Get room status if it's a clickable room
            let fillColor = isClickableRoom ? getRoomOccupancyStatus(Number(roomId)) : '#d3d3d3'; // Default: green for available rooms, gray for common areas
            
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
                  data-title={isClickableRoom ? 'Occupied' : label}
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

export default Phase2ThirdFloorPlan;