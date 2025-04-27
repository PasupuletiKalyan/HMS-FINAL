import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';
import { SiS7Airlines } from 'react-icons/si';

// Phase 2 configuration
export const phase2Config: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 52, exceptions: [] },
  "1st Floor": { start: 101, end: 153, exceptions: [] },
  "2nd Floor": { start: 201, end: 240, exceptions: [] },
  "3rd Floor": { start: 301, end: 340, exceptions: [] },
  "4th Floor": { start: 401, end: 440, exceptions: [] },
  "5th Floor": { start: 501, end: 540, exceptions: [] },
  "6th Floor": { start: 601, end: 640, exceptions: [] },
  "7th Floor": { start: 701, end: 740, exceptions: [] },
  "8th Floor": { start: 801, end: 840, exceptions: [] },
  "9th Floor": { start: 901, end: 940, exceptions: [] },
  "10th Floor": { start: 1001, end: 1040, exceptions: [] }
};

// Component for rendering Phase 2 floors
const Phase2FloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase2Config[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // 1st Floor specific SVG layout
  const renderFirstFloorLayout = () => {
    // Room dimensions and spacing
    const roomW = 40; // Room width
    const roomH = 40; // Room height
    const vGap = 5;   // Vertical gap
    const hGap = 0;   // Horizontal gap
    
    // Helper function for vertical positioning
    const getY = (baseY: number, rowNum: number): number => baseY - (rowNum * (roomH + vGap));

    // Calculate derived positions
    const topRowY = getY(600, 19); // Align with top of 117/118
    const bottomRowY = getY(600, 18); // Align with top of 116
    const wsTopLEndX = 10 + 6*(roomW + hGap) + roomW * 1.5 + hGap; // End X of first top WS
    const liftsTopMEndX = wsTopLEndX + hGap + roomW + hGap + roomW; // End X of first top Lifts
    const startBottomRightX = liftsTopMEndX + hGap; // Start X for second horizontal group
    const g150EndX = startBottomRightX + 3*(roomW + hGap) + roomW; // End X of room 150
    const wsTopREndX = g150EndX + hGap * 3 + roomW * 1.5 + hGap; // End X of second top WS
    const g149StartX = wsTopREndX + hGap + 2*(roomW + hGap) + hGap; // Calculate 149 start X

    const elements = [
      // --- Bottom Vertical Section (Left) ---
      // Column 1 (x=10)
      { id: '101', x: 10, y: getY(600, 0), width: roomW, height: roomH, type: 'room' },
      { id: '102', x: 10, y: getY(600, 1), width: roomW, height: roomH, type: 'room' },
      { id: '103', x: 10, y: getY(600, 2), width: roomW, height: roomH, type: 'room' },
      { id: 'WS_Btm_L', x: 105, y: getY(600, 2) - 5, width: roomW, height: 90, type: 'common', label: 'WS' },
      { id: 'Stairs_Btm_L', x: 105, y: getY(600, 3) - 5, width: roomW, height: 40, type: 'common', label: 'Stairs' },
      { id: '104', x: 10, y: getY(600, 3), width: roomW, height: roomH, type: 'room' },
      { id: '105', x: 10, y: getY(600, 4), width: roomW, height: roomH, type: 'room' },
      { id: 'Lifts_Btm_L', x: 105, y: getY(600, 5) - 5, width: roomW, height: 60, type: 'common', label: 'Lifts' },
      { id: '106', x: 10, y: getY(600, 5), width: roomW, height: roomH, type: 'room' },
      { id: '107', x: 10, y: getY(600, 6), width: roomW, height: roomH, type: 'room' },

      // Column 2 (x=50) - Bottom part aligns with Column 1
      { id: '108', x: 60 + roomW + hGap, y: getY(600, 0), width: roomW, height: roomH, type: 'room' },
      // Middle part aligns with mid-section of Column 1
      { id: '109', x: -30 + roomW + hGap, y: getY(600, 8), width: roomW, height: roomH, type: 'room' },
      { id: '110', x: -30 + roomW + hGap, y: getY(600, 9), width: roomW, height: roomH, type: 'room' },
      { id: '111', x: -30 + roomW + hGap, y: getY(600, 10), width: roomW, height: roomH, type: 'room' },
      { id: '112', x:-30 + roomW + hGap, y: getY(600, 11), width: roomW, height: roomH, type: 'room' },
      { id: 'WS_Mid_L', x: 50 + roomW + hGap, y: getY(600, 13) - 5, width: roomW, height: 90, type: 'common', label: 'WS' },
      { id: '113', x: -30 + roomW + hGap, y: getY(600, 12), width: roomW, height: roomH, type: 'room' },
      { id: '114', x: -30 + roomW + hGap, y: getY(600, 13), width: roomW, height: roomH, type: 'room' },
      { id: '115', x: -30 + roomW + hGap, y: getY(600, 14), width: roomW, height: roomH, type: 'room' },
      { id: '116', x: -30 + roomW + hGap, y: getY(600, 15), width: roomW, height: roomH, type: 'room' }, // Aligns with bottomRowY

      // Column 3 (x=90)
      { id: '122', x: 10 + 2*(roomW + hGap), y: getY(600, 8), width: roomW, height: roomH, type: 'room' },
      { id: '121', x: 10 + 2*(roomW + hGap), y: getY(600, 9), width: roomW, height: roomH, type: 'room' },
      { id: '120', x: 10 + 2*(roomW + hGap), y: getY(600, 10), width: roomW, height: roomH, type: 'room' },
      { id: '119', x: 10 + 2*(roomW + hGap), y: getY(600, 11), width: roomW, height: roomH, type: 'room' },


      // --- Top Horizontal Section ---
      // Bottom Row Left Part (aligned with Col 3)
      { id: 'Stairs_Top_L', x: 10 + 2*(roomW + hGap), y:getY(600,15)-5, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
      { id: '135', x: 20 + 3*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
      { id: '134', x: 30 + 4*(roomW + hGap), y: getY(650,17)-5,bottomRowY, width: roomW, height: roomH, type: 'room' },
      { id: '133', x: 40 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
      { id: 'WS_Top_L', x: 50 + 6*(roomW + hGap), y: getY(650,17)-5, width: 130, height: roomH, type: 'common', label: 'WS' }, // Wider WS
      { id: 'Stairs_Top_M', x:240 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
      { id: 'Lifts_Top_M', x: 300 + 5*(roomW + hGap) , y: getY(650,17)-5, width: 90, height: roomH, type: 'common', label: 'Lifts' },

      // Top Row Left Part (aligned with bottom row where possible)
      { id: '117', x: 10, y: getY(650,18)-5, width: roomW, height: roomH, type: 'room' },
      { id: '118', x: 50 + roomW + hGap, y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
      { id: '123', x: 20 + 3*(roomW + hGap), y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 123 above 135
      { id: '124', x: 30 + 4*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 124 above 134
      { id: '125', x: 40 + 5*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 125 above 133
      { id: '126', x: 50 + 6*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 126 above start of WS
      { id: '127', x: 60 + 7*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
      { id: '128', x: 70 + 8*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 128 above Stairs_M
      { id: '129', x: 80 + 9*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 129 above Lifts_M
      { id: '130', x: 90 + 10*(roomW + hGap), y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
      { id: '131', x: 100 + 11*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
      { id: '132', x: 110 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },


      // Bottom Row Right Part
      { id: '153', x: 440 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
      { id: '152', x: 490 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
      { id: '151', x: 540 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
      { id: '150', x: 600 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' },
      { id: 'WS_Top_R', x: 720 + 5*(roomW + hGap), y: getY(650,17)-5, width:110, height: roomH, type: 'common', label: 'WS' }, // Wider WS, larger gap
      { id: 'Stairs_Top_R', x: 850 + 5*(roomW + hGap), y:getY(650,17)-5, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
      { id: 'Lifts_Top_R',x: 910 + 5*(roomW + hGap), y: getY(650,17)-5, width: 60, height: roomH, type: 'common', label: 'Lifts' },
      { id: '149', x: 1060 + 5*(roomW + hGap), y: getY(650,17)-5, width: roomW, height: roomH, type: 'room' }, // Use calculated start X

      // Top Row Right Part (aligned with bottom row where possible)
      { id: '136', x: 160 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 136 above 153
      { id: '137', x: 170 + 12*(roomW + hGap) + (roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 137 above 152
      { id: '138', x:180 + 12*(roomW + hGap) + 2*(roomW + hGap), y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 138 above 151
      { id: '139', x: 190 + 12*(roomW + hGap) + 3*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Aligns 139 above 150
      { id: '140', x: 200 + 12*(roomW + hGap) + 4*(roomW + hGap) + hGap*2, y:getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 140 above start of WS_R gap
      { id: '141', x: 210 + 12*(roomW + hGap)+ 5*(roomW + hGap) + hGap*2, y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
      { id: '142', x: 460 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 142 above Stairs_R
      { id: '143', x: 510 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 143 above Lifts_R
      { id: '144', x:560 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Position relative to 149 start
      { id: '145', x: 610 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' }, // Align 145 above 149
      { id: '146', x: 660 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
      { id: '147', x: 710 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },
      { id: '148', x: 770 + 12*(roomW + hGap), y: getY(650,19)-5, width: roomW, height: roomH, type: 'room' },

      // Labels (Adjusted positions)
      { id: 'Corridor_Btm_V', x: 30 + roomW + hGap/2, y: 400, label: 'Corridor', type: 'label', rotation: -90 }, // Centered in gap
      { id: 'Corridor_Mid_V', x: 0 + 2*(roomW + hGap) - hGap/2, y: 40, label: 'Corridor', type: 'label', rotation: -90 }, // Centered in gap
      { id: 'Corridor_Top_L', x: (10 + 2*(roomW + hGap) + liftsTopMEndX)/2, y:-140, label: 'Corridor', type: 'label', rotation: 0 }, // Centered horizontally
      { id: 'Corridor_Top_R', x: (liftsTopMEndX + hGap + g149StartX + roomW) / 2 , y: -140, label: 'Corridor', type: 'label', rotation: 0 }, // Centered horizontally
    ];
SiS7Airlines
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

    // Render all elements
    return (
      <div style={{ 
        width: '100%',
        height: '95vh',
        overflow: 'auto',
        border: '1px solid #eee',
        padding: '10px',
        boxSizing: 'border-box'
      }}>
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
            } else if (el.type === 'room' || el.type === 'common') {
              // Determine if this element is a room that should be clickable and color-coded
              const isClickableRoom = el.type === 'room';
              const roomId = el.id; // Use room ID directly for 1st floor (already has numbers like 101)
              
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
        </svg>
      </div>
    );
  };
  
  // Ground Floor specific SVG layout
  const renderGroundFloorLayout = () => {
    // Room dimensions and spacing
    const roomW = 40; // Room width
    const roomH = 40; // Room height
    
    // Define the SVG elements for Ground Floor layout based on the provided structure
    const elements = [
      // --- Bottom Vertical Section (Left) ---
      { id: 'G01', x: 10, y: 680, width: roomW, height: roomH, type: 'room' },
      { id: 'G02', x: 10, y: 630, width: roomW, height: roomH, type: 'room' },
      { id: 'G03', x: 10, y: 580, width: roomW, height: roomH, type: 'room' },
      { id: 'WS_Btm_L', x: 90, y: 580, width: roomW, height: 80, type: 'common', label: 'WS' },
      { id: 'Stairs_Btm_L', x: 90, y: 530, width: roomW, height: 40, type: 'common', label: 'Stairs' },
      { id: 'G04', x: 10, y: 530, width: roomW, height: roomH, type: 'room' },
      { id: 'G05', x: 10, y:480, width: roomW, height: roomH, type: 'room' },
      { id: 'Lifts_Btm_L', x: 90, y: 440, width: roomW, height: 60, type: 'common', label: 'Lifts' },
      { id: 'WR', x: 10, y: 380, width: roomW, height: 40, type: 'common', label: 'WR' },
      { id: 'G06', x: 10, y: 430, width: roomW, height: roomH, type: 'room' },
      { id: 'G07', x: 90, y: 680, width: roomW, height: roomH, type: 'room' },

      // --- Bottom Vertical Section (Right) ---
      { id: 'G08', x: 10, y: 290, width: roomW, height: roomH, type: 'room' },
      { id: 'G09', x: 10, y: 240, width: roomW, height: roomH, type: 'room' },
      { id: 'G10', x: 10, y: 190, width: roomW, height: roomH, type: 'room' },
      { id: 'G11', x: 10, y: 140, width: roomW, height: roomH, type: 'room' },
      { id: 'G12', x: 10, y: 90, width: roomW, height: roomH, type: 'room' },
      { id: 'WS_Mid_L', x: 90, y: 60, width: roomW, height: 60, type: 'common', label: 'WS' },
      { id: 'G13', x: 10, y: 40, width: roomW, height: roomH, type: 'room' },
      { id: 'G14', x: 10, y: -10, width: roomW, height: roomH, type: 'room' },
      { id: 'G15', x: 10, y: -60  , width: roomW, height: roomH, type: 'room' },

      { id: 'G18', x: 90, y: 140, width: roomW, height: roomH, type: 'room' },
      { id: 'G19', x: 90, y: 190, width: roomW, height: roomH, type: 'room' },
      { id: 'G20', x: 90, y: 240, width: roomW, height: roomH, type: 'room' },
      { id: 'G21', x: 90, y: 290, width: roomW, height: roomH, type: 'room' },

      // --- Top Horizontal Section ---
      // Top Row Left Part
      { id: 'G16', x: 10, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G17', x: 90, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G22', x: 140, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G23', x: 190, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G24', x: 240, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G25', x: 290, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G26', x: 340, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G27', x: 390, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G28', x: 440, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G29', x: 490, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G30', x:540, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G31', x: 590, y: -110, width: roomW, height: roomH, type: 'room' },

      // Top Row Right Part
      { id: 'G35', x: 640, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G36', x: 690, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G37', x: 740, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G38', x: 790, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G39', x: 840, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G40', x: 890, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G41', x: 940, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G42', x: 990, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G43', x: 1040, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G44', x: 1090, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G45', x: 1140, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G46', x: 1190, y: -110, width: roomW, height: roomH, type: 'room' },
      { id: 'G47', x: 1240, y: -110, width: roomW, height: roomH, type: 'room' },

      // Bottom Row Left Part
      { id: 'Stairs_Top_L', x: 90, y: -10, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
      { id: 'G34', x: 140, y: -45, width: roomW, height: roomH, type: 'room' },
      { id: 'G33', x: 190, y: -45, width: roomW, height: roomH, type: 'room' },
      { id: 'G32', x: 240, y: -45, width: roomW, height: roomH, type: 'room' },
      { id: 'WS_Top_L', x: 320, y: -45, width: 110, height: roomH, type: 'common', label: 'WS' },
      { id: 'Stairs_Top_M', x: 490, y: -45, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
      { id: 'Lifts_Top_M', x: 540, y: -45, width: 80, height: roomH, type: 'common', label: 'Lifts' },

      // Bottom Row Right Part
      { id: 'G52', x: 640, y: -45, width: roomW, height: roomH, type: 'room' },
      { id: 'G51', x: 690, y: -45, width: roomW, height: roomH, type: 'room' },
      { id: 'G50', x: 740, y: -45, width: roomW, height: roomH, type: 'room' },
      { id: 'G49', x:790, y: -45, width: roomW, height: roomH, type: 'room' },
      { id: 'WS_Top_R', x: 880, y: -45, width: 110, height: roomH, type: 'common', label: 'WS' },
      { id: 'Stairs_Top_R', x: 1060, y: -45, width: roomW, height: roomH, type: 'common', label: 'Stairs' },
      { id: 'Lifts_Top_R', x: 1110, y: -45, width: 60, height: roomH, type: 'common', label: 'Lifts' },
      { id: 'G48', x: 1240, y: -45, width: roomW, height: roomH, type: 'room' },

      // Labels
      { id: 'Corridor_Btm_V', x: 75, y: 440, label: 'Corridor', type: 'label', rotation: -90 },
      { id: 'Corridor_Mid_V', x: 75, y: 80, label: 'Corridor', type: 'label', rotation: -90 },
      { id: 'Corridor_Top_L', x: 310, y: -60, label: 'Corridor', type: 'label', rotation: 0 },
      { id: 'Corridor_Top_R', x: 720, y: -60, label: 'Corridor', type: 'label', rotation: 0 },
    ];

    // Calculate viewBox dimensions
    const padding = 20;
    const shapeElements = elements.filter(e => e.x !== undefined);
    const minX = Math.min(...shapeElements.map(e => e.x)) - padding;
    const minY = Math.min(...shapeElements.map(e => e.y)) - padding - 20;
    const maxX = Math.max(...shapeElements.map(e => (e.x || 0) + (e.width || 0))) + padding;
    const maxY = Math.max(...shapeElements.map(e => (e.y || 0) + (e.height || 0))) + padding;
    
    // Adjust bounds for rotated labels manually if needed
    const finalMaxX = maxX + 50; // Extra space for rotated label width
    const finalMaxY = maxY + 40; // Extra space for rotated label height
    
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

    // Render all elements
    return (
      <div style={{ 
        width: '100%',
        height: '95vh',
        overflow: 'auto',
        border: '1px solid #eee',
        padding: '10px',
        boxSizing: 'border-box'
      }}>
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
                // Use a group <g> for multi-line labels to handle positioning easily
                <g key={el.id} transform={`rotate(${el.rotation || 0} ${el.x} ${el.y})`}>
                  {lines.map((line, index) => (
                    <text
                      key={`${el.id}-line-${index}`}
                      x={el.x}
                      // Adjust Y position for multiple lines relative to the label's y
                      y={el.y + (index - (lines.length - 1) / 2) * 12} // 12 is approx line height for labelText
                      style={styles.labelText}
                      textAnchor="middle"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            } else if (el.type === 'room' || el.type === 'common') {
              // Determine if this element is a room that should be clickable and color-coded
              const isClickableRoom = el.type === 'room';
              const roomId = el.id.replace('G', ''); // Extract room number from ID
              
              // Get room status if it's a clickable room
              let fillColor = isClickableRoom ? '#bbf7d0' : '#d3d3d3'; // Default: green for available rooms, gray for common areas
              let occupancyText = 'Available';
              
              if (isClickableRoom) {
                const roomNumber = roomId.padStart(1, '0'); // Ensure proper format
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
              const label = el.label || (isClickableRoom ? roomId : el.id);
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
                      // Adjust Y based on number of lines and font size
                      y={textY + (index - (lines.length - 1) / 2) * (parseInt(specificTextStyle.fontSize) + 2)} // Adjust line spacing
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
  
  // Generate grid layout for Phase 2 (for floors other than Ground and 1st)
  const renderPhase2Layout = () => {
    const rooms = [];
    const { start, end, exceptions } = floorInfo;
    
    // Determine room positions
    // Phase 2 has a specific layout with rooms organized in rows
    // For this example, let's use a simple grid layout
    const roomsPerRow = 10;
    
    for (let i = start; i <= end; i++) {
      if (exceptions.includes(i)) continue;
      
      const roomNumber = i.toString();
      
      // Get occupancy status for this room
      const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
      const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
      
      const isOccupiedA = occupiedBeds[bedAKey] || false;
      const isOccupiedB = occupiedBeds[bedBKey] || false;
      
      // Determine color based on occupancy
      let fillColor = '#bbf7d0'; // Green-200 for available
      let occupancyText = 'Available';
      
      if (isOccupiedA && isOccupiedB) {
        fillColor = '#fecaca'; // Red-200 for fully occupied
        occupancyText = 'Fully Occupied';
      } else if (isOccupiedA || isOccupiedB) {
        fillColor = '#fef08a'; // Yellow-200 for partially occupied
        occupancyText = 'Partially Occupied';
      }
      
      // Position calculation 
      const row = Math.floor((i - start) / roomsPerRow);
      const col = (i - start) % roomsPerRow;
      
      rooms.push(
        <div 
          key={roomNumber} 
          className="room-box"
          style={{
            position: 'absolute',
            left: `${col * 70 + 20}px`,
            top: `${row * 60 + 80}px`,
            width: '60px',
            height: '50px',
            backgroundColor: fillColor,
            border: '1px solid #1976d2',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => onRoomClick(roomNumber)}
          title={occupancyText}
        >
          {roomNumber}
        </div>
      );
    }
    
    return rooms;
  };
  
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '600px',
        backgroundColor: '#f7fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'auto',
        padding: '10px'
      }}
    >
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
        Phase 2 - {floor}
      </div>
      
      {floor === "Ground Floor" 
        ? renderGroundFloorLayout() 
        : floor === "1st Floor" 
          ? renderFirstFloorLayout() 
          : renderPhase2Layout()
      }
      
      {/* Legend */}
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#bbf7d0', marginRight: '5px', border: '1px solid #22c55e' }}></div>
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#fef08a', marginRight: '5px', border: '1px solid #eab308' }}></div>
          <span>Partially Occupied</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#fecaca', marginRight: '5px', border: '1px solid #ef4444' }}></div>
          <span>Fully Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default Phase2FloorPlan;