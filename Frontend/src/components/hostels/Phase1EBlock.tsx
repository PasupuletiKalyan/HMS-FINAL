import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 1 E Block configuration
export const phase1EBlockConfig: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 12, exceptions: [] },
  "1st Floor": { start: 101, end: 112, exceptions: [] },
  "2nd Floor": { start: 201, end: 212, exceptions: [] },
  "3rd Floor": { start: 301, end: 312, exceptions: [] },
  "4th Floor": { start: 401, end: 412, exceptions: [] }
};

// Create visual layout for E Block floors
const Phase1EBlockFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase1EBlockConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // Define SVG dimensions and positions for elements
  const svgWidth = 800;
  const svgHeight = 450;
  const mainRectX = 50;
  const mainRectY = 50;
  const mainRectWidth = 700;
  const mainRectHeight = 250;
  const boxSize = 50;
  const boxMargin = 15;
  const topRowY = mainRectY + 20;
  const bottomRowY = mainRectY + mainRectHeight - boxSize - 20;
  const liftWidth = 60;
  const liftHeight = 40;
  const wsWidth = 200;
  const wsHeight = 60;
  const bottomLabelRectY = mainRectY + mainRectHeight + 50;
  const bottomLabelRectHeight = 50;

  // Get floor prefix based on selected floor
  let floorPrefix = 0;
  switch(floor) {
    case "Ground Floor": 
      floorPrefix = 0;
      break;
    case "1st Floor":
      floorPrefix = 100;
      break;
    case "2nd Floor":
      floorPrefix = 200;
      break;
    case "3rd Floor":
      floorPrefix = 300;
      break;
    case "4th Floor":
      floorPrefix = 400;
      break;
  }

  // Helper function to generate numbered boxes with occupancy colors
  const renderNumberedBox = (number: number, x: number, y: number) => {
    // Format room number differently based on floor
    const roomNumber = floorPrefix === 0 
      ? number.toString().padStart(2, '0') 
      : number.toString();
    
    const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
    const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
    
    const isOccupiedA = occupiedBeds[bedAKey] || false;
    const isOccupiedB = occupiedBeds[bedBKey] || false;
    
    // Determine color based on occupancy
    let fillColor = '#86efac'; // Default blue for available
    
    if (isOccupiedA && isOccupiedB) {
      fillColor = '#ef5350'; // Red for fully occupied
    } else if (isOccupiedA || isOccupiedB) {
      fillColor = '#ffca28'; // Yellow for partially occupied
    }

    return (
      <g key={`box-${number}`} onClick={() => onRoomClick(roomNumber)} style={{ cursor: 'pointer' }}>
        <rect
          x={x}
          y={y}
          width={boxSize}
          height={boxSize}
          fill={fillColor}
          stroke="#1976d2"
          strokeWidth="1"
          rx="5"
          ry="5"
        />
        <text
          x={x + boxSize / 2}
          y={y + boxSize / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fontFamily="Arial, sans-serif"
        >
          {roomNumber}
        </text>
      </g>
    );
  };

  // Calculate room numbers based on floor
  const getRoomNumbers = (baseNumbers: number[]): number[] => {
    if (floorPrefix === 0) return baseNumbers;
    return baseNumbers.map(num => num + floorPrefix);
  };

  // Calculate positions for the top row boxes (01-04 or 101-104, etc.)
  const topBoxesRightXStart = mainRectX + mainRectWidth - (boxSize + boxMargin) * 4 + boxMargin / 2;
  const topBoxesRight = getRoomNumbers([1, 2, 3, 4]).map((num, index) => ({
    num,
    x: topBoxesRightXStart + index * (boxSize + boxMargin),
    y: topRowY,
  }));

  // Calculate positions for the top row boxes (10-12 or 110-112, etc.)
  const topBoxesLeftXStart = mainRectX + boxMargin;
  const topBoxesLeft = getRoomNumbers([10, 11, 12]).map((num, index) => ({
    num,
    x: topBoxesLeftXStart + index * (boxSize + boxMargin),
    y: topRowY,
  }));

  // Calculate positions for the bottom row boxes (05-08 or 105-108, etc.)
  const bottomBoxesRightXStart = mainRectX + mainRectWidth - (boxSize + boxMargin) * 4 + boxMargin / 2;
  const bottomBoxesRight = getRoomNumbers([5, 6, 7, 8]).reverse().map((num, index) => ({
    num,
    x: bottomBoxesRightXStart + index * (boxSize + boxMargin),
    y: bottomRowY,
  }));

  // Calculate position for the bottom row box (09 or 109, etc.)
  const box09 = { num: getRoomNumbers([9])[0], x: mainRectX + boxMargin, y: bottomRowY };

  // Calculate positions for other elements
  const liftX = topBoxesLeft[2].x + boxSize + boxMargin * 2;
  const liftY = topRowY + (boxSize - liftHeight) / 2;
  const wsX = box09.x + boxSize + boxMargin * 2;
  const wsY = bottomRowY + (boxSize - wsHeight) / 2;

  // Only show entry arrow for Ground Floor
  const showEntryArrow = floor === "Ground Floor";
  const entryArrowStartX = mainRectX + mainRectWidth / 2;
  const entryArrowStartY = mainRectY + mainRectHeight - boxMargin * 2;
  const entryArrowEndY = mainRectY + mainRectHeight / 2 + 20;
  const entryTextY = entryArrowStartY + 25;
  
  const bottomLabelRectX = mainRectX + (mainRectWidth - wsWidth * 2) / 2;
  const bottomLabelRectWidth = wsWidth * 2;

  return (
    <div style={{ width: '100%', height: '500px', overflow: 'auto' }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', margin: 'auto', maxWidth: `${svgWidth}px` }}
      >
        {/* Main container rectangle */}
        <rect
          x={mainRectX}
          y={mainRectY}
          width={mainRectWidth}
          height={mainRectHeight}
          fill="#f7fafc"
          stroke="black"
          strokeWidth="2"
          rx="10"
          ry="10"
        />

        {/* Render Top Row Boxes */}
        {topBoxesRight.map(box => renderNumberedBox(box.num, box.x, box.y))}
        {topBoxesLeft.map(box => renderNumberedBox(box.num, box.x, box.y))}

        {/* Render Bottom Row Boxes */}
        {bottomBoxesRight.map(box => renderNumberedBox(box.num, box.x, box.y))}
        {renderNumberedBox(box09.num, box09.x, box09.y)}

        {/* Lift Area */}
        <g>
          <rect
            x={liftX}
            y={liftY}
            width={liftWidth}
            height={liftHeight}
            fill="#D3D3D3"
            stroke="black"
            strokeWidth="1"
            rx="5"
            ry="5"
          />
          <text
            x={liftX + liftWidth / 2}
            y={liftY + liftHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontFamily="Arial, sans-serif"
          >
            Lift
          </text>
        </g>

        {/* WS Area */}
        <g>
          <rect
            x={wsX}
            y={wsY}
            width={wsWidth}
            height={wsHeight}
            fill="#D3D3D3"
            stroke="black"
            strokeWidth="1"
            rx="5"
            ry="5"
          />
          <text
            x={wsX + wsWidth / 2}
            y={wsY + wsHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontFamily="Arial, sans-serif"
          >
            WS
          </text>
        </g>

        {/* Entry Arrow - Only for Ground Floor */}
        {showEntryArrow && (
          <g>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="black" />
              </marker>
            </defs>
            <line
              x1={entryArrowStartX}
              y1={entryArrowStartY}
              x2={entryArrowStartX}
              y2={entryArrowEndY + 5}
              stroke="black"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text
              x={entryArrowStartX}
              y={entryTextY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontFamily="Arial, sans-serif"
            >
              Entry
            </text>
          </g>
        )}

        {/* Bottom Label Box */}
        <g>
          <rect
            x={bottomLabelRectX}
            y={bottomLabelRectY}
            width={bottomLabelRectWidth}
            height={bottomLabelRectHeight}
            fill="white"
            stroke="black"
            strokeWidth="1"
            rx="5"
            ry="5"
          />
          <text
            x={bottomLabelRectX + bottomLabelRectWidth / 2}
            y={bottomLabelRectY + bottomLabelRectHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontFamily="Arial, sans-serif"
          >
            Phase 1 E Block - {floor}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Phase1EBlockFloorPlan;