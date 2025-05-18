import React from 'react';
import { FloorPlanProps } from './types';

// Interface for Element props
interface ElementProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  fillColor?: string;
  textColor?: string;
  strokeColor?: string;
  rx?: number;
  ry?: number;
  fontSize?: number;
  onClick?: () => void;
  roomNumber?: string;
  roomStatus?: string;
}

// Simple Element component for individual room elements
const Element: React.FC<ElementProps> = ({ 
  x, 
  y, 
  width, 
  height, 
  label, 
  fillColor = '#E5E7EB', 
  textColor = '#000000', 
  strokeColor = '#000000', 
  rx = 2, 
  ry = 2, 
  fontSize = 10,
  onClick,
  roomNumber,
  roomStatus
}) => (
  <g 
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
    data-room-number={roomNumber}
    data-room-status={roomStatus}
  >
    {/* Element rectangle */}
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1"
      rx={rx}
      ry={ry}
    />
    {/* Element label */}
    {label && (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill={textColor}
        fontSize={fontSize}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="sans-serif"
        fontWeight="500"
      >
        {label}
      </text>
    )}
  </g>
);

// Phase3 North Wing First Floor Plan component
// We need to accept the floor prop to match FloorPlanProps interface
// but we don't use it in this component
const Phase3NorthWingFirstFloor: React.FC<FloorPlanProps> = ({ 
  selectedBlock, 
  selectedFloor, 
  occupiedBeds, 
  onRoomClick,
  floor: _floor // Rename to _floor to indicate it's intentionally unused
}) => {
  // ViewBox dimensions
  const viewBoxWidth = 550;
  const viewBoxHeight = 380;

  // Common dimensions
  const roomWidth = 35;
  const roomHeight = 35;
  const roomSpacing = 5;
  const elementFill = '#D1D5DB';  // non-room elements

  const getRoomColor = (roomNumber: string) => {
    if (!selectedBlock || !selectedFloor || !occupiedBeds) return '#bbf7d0';
    
    const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
    const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
    
    const isOccupiedA = occupiedBeds[bedAKey] || false;
    const isOccupiedB = occupiedBeds[bedBKey] || false;
    
    if (isOccupiedA && isOccupiedB) {
      return '#fecaca'; // Red for fully occupied
    } else if (isOccupiedA || isOccupiedB) {
      return '#fef08a'; // Yellow for partially occupied
    } else {
      return '#bbf7d0'; // Green for available
    }
  };

  const handleRoomClick = (roomNumber: string) => {
    if (onRoomClick && roomNumber) {
      onRoomClick(roomNumber);
    }
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block bg-white"
    >
      {/* --- Top Section --- */}
      {/* South Wing Entry Arrow and Text */}
      <g>
        <line x1="220" y1="60" x2="220" y2="30" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <text x="210" y="20" fontSize="10" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">South Wing Entry</text>
      </g>      {/* WS Left */}
      <Element 
        x={20} y={60} width={100} height={40} 
        label="WS" 
        fillColor={elementFill}
        roomNumber="WS-Left"
      />

      {/* Stairs Left */}
      <Element 
        x={130} y={60} width={50} height={30} 
        label="Stairs" 
        fillColor={elementFill}
        roomNumber="Stairs-Left"
      />

      {/* Lift */}
      <Element 
        x={240} y={60} width={50} height={30} 
        label="Lift" 
        fillColor={elementFill}
        roomNumber="Lift"
      />

      {/* WS Right */}
      <Element 
        x={360} y={60} width={100} height={40} 
        label="WS" 
        fillColor={elementFill}
        roomNumber="WS-Right"
      />

      {/* Corridor Top Text */}
      <text x={180} y={125} fontSize="10" fontFamily="sans-serif" textAnchor="middle">Corridor</text>
      
      {/* Lobby Text */}
      <text x={350} y={150} fontSize="10" fontFamily="sans-serif" textAnchor="middle">Lobby</text>

      {/* --- Middle Section (Left) --- */}      {/* 108 */}
      <Element 
        x={20} y={150} 
        width={roomWidth} height={roomHeight} 
        label="108" 
        fillColor={getRoomColor('108')}
        roomNumber="108"
        roomStatus="Available"
        onClick={() => handleRoomClick('108')}
      />

      {/* 107 */}
      <Element 
        x={20 + 1 * (roomWidth + roomSpacing)} y={150} 
        width={roomWidth} height={roomHeight} 
        label="107" 
        fillColor={getRoomColor('107')}
        roomNumber="107"
        roomStatus="Available"
        onClick={() => handleRoomClick('107')}
      />      {/* 106 */}
      <Element 
        x={20 + 2 * (roomWidth + roomSpacing) + 10} y={150} 
        width={roomWidth} height={roomHeight} 
        label="106" 
        fillColor={getRoomColor('106')}
        roomNumber="106"
        roomStatus="Available"
        onClick={() => handleRoomClick('106')}
      />

      {/* 105 */}
      <Element 
        x={20 + 3 * (roomWidth + roomSpacing) + 10} y={150} 
        width={roomWidth} height={roomHeight} 
        label="105" 
        fillColor={getRoomColor('105')}
        roomNumber="105"
        roomStatus="Available"
        onClick={() => handleRoomClick('105')}
      />

      {/* 104 */}
      <Element 
        x={20 + 4 * (roomWidth + roomSpacing) + 20} y={150} 
        width={roomWidth} height={roomHeight} 
        label="104" 
        fillColor={getRoomColor('104')}
        roomNumber="104"
        roomStatus="Available"
        onClick={() => handleRoomClick('104')}
      />

      {/* 103 */}
      <Element 
        x={20 + 5 * (roomWidth + roomSpacing) + 40} y={150} 
        width={roomWidth} height={roomHeight} 
        label="103" 
        fillColor={getRoomColor('103')}
        roomNumber="103"
        roomStatus="Available"
        onClick={() => handleRoomClick('103')}
      />

      {/* --- Right Wing --- */}
      {/* 131 */}      <Element 
        x={500} y={110} 
        width={roomWidth} height={roomHeight} 
        label="131" 
        fillColor={getRoomColor('131')}
        roomNumber="131"
        roomStatus="Available"
        onClick={() => handleRoomClick('131')}
      />{/* Stairs Right */}
      <Element 
        x={410} y={150} 
        width={40} height={50} 
        label="Stairs" 
        fillColor={elementFill}
        roomNumber="Stairs-Right"
      />

      {/* 132 */}      <Element 
        x={500} y={110 + 1 * (roomHeight + roomSpacing)} 
        width={roomWidth} height={roomHeight} 
        label="132" 
        fillColor={getRoomColor('132')}
        roomNumber="132"
        roomStatus="Available"
        onClick={() => handleRoomClick('132')}
      />

      {/* Corridor Right Text */}
      <text 
        x={470} y={230} 
        fontSize="10" 
        fontFamily="sans-serif" 
        textAnchor="middle" 
        transform="rotate(-90 470 230)"
      >
        Corridor
      </text>

      {/* 133 */}      <Element 
        x={500} y={110 + 2 * (roomHeight + roomSpacing)} 
        width={roomWidth} height={roomHeight} 
        label="133" 
        fillColor={getRoomColor('133')}
        roomNumber="133"
        roomStatus="Available"
        onClick={() => handleRoomClick('133')}
      />

      {/* 134 */}      <Element 
        x={500} y={110 + 3 * (roomHeight + roomSpacing)} 
        width={roomWidth} height={roomHeight} 
        label="134" 
        fillColor={getRoomColor('134')}
        roomNumber="134"
        roomStatus="Available"
        onClick={() => handleRoomClick('134')}
      />

      {/* --- Right Wing (Bottom Part) --- */}
      {/* 102 */}      <Element 
        x={410} y={205 + roomSpacing} 
        width={roomWidth} height={roomHeight} 
        label="102" 
        fillColor={getRoomColor('102')}
        roomNumber="102"
        roomStatus="Available"
        onClick={() => handleRoomClick('102')}
      />

      {/* 101 */}      <Element 
        x={410} y={210 + roomHeight + 2 * roomSpacing} 
        width={roomWidth} height={roomHeight} 
        label="101" 
        fillColor={getRoomColor('101')}
        roomNumber="101"
        roomStatus="Available"
        onClick={() => handleRoomClick('101')}
      />

      {/* Arrow definition */}
      <defs>
        <marker 
          id="arrowhead" 
          markerWidth="10" 
          markerHeight="7" 
          refX="0" 
          refY="3.5" 
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#000000"/>
        </marker>
      </defs>
    </svg>
  );
};

export default Phase3NorthWingFirstFloor;

// Export the SVG string for potential server-side rendering
export const phase3NorthWingFirstFloorSvgString = `
  <svg viewBox="0 0 550 380" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="550" height="380" fill="#ffffff"/>
    
    <!-- South Wing Entry Arrow and Text -->
    <g>
      <line x1="220" y1="60" x2="220" y2="30" stroke="#000000" stroke-width="1.5" marker-end="url(#arrowhead)" />
      <text x="210" y="20" font-size="10" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">South Wing Entry</text>
    </g>

    <!-- WS Left -->
    <g>
      <rect x="20" y="60" width="100" height="40" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="70" y="80" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">WS</text>
    </g>

    <!-- Stairs Left -->
    <g>
      <rect x="130" y="60" width="50" height="30" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="155" y="75" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Stairs</text>
    </g>

    <!-- Lift -->
    <g>
      <rect x="240" y="60" width="50" height="30" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="265" y="75" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Lift</text>
    </g>

    <!-- WS Right -->
    <g>
      <rect x="360" y="60" width="100" height="40" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="410" y="80" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">WS</text>
    </g>

    <!-- Room texts -->
    <text x="180" y="125" font-size="10" font-family="sans-serif" text-anchor="middle">Corridor</text>
    <text x="350" y="150" font-size="10" font-family="sans-serif" text-anchor="middle">Lobby</text>
    <text x="470" y="230" font-size="10" font-family="sans-serif" text-anchor="middle" transform="rotate(-90 470 230)">Corridor</text>

    <!-- Room 108 -->
    <g data-room-number="108">
      <rect x="20" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="37.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">108</text>
    </g>

    <!-- Room 107 -->
    <g data-room-number="107">
      <rect x="60" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="77.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">107</text>
    </g>

    <!-- Room 106 -->
    <g data-room-number="106">
      <rect x="105" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="122.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">106</text>
    </g>

    <!-- Room 105 -->
    <g data-room-number="105">
      <rect x="150" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="167.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">105</text>
    </g>

    <!-- Room 104 -->
    <g data-room-number="104">
      <rect x="195" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="212.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">104</text>
    </g>

    <!-- Room 103 -->
    <g data-room-number="103">
      <rect x="240" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="257.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">103</text>
    </g>

    <!-- Right wing rooms -->
    <!-- Room 131 -->
    <g data-room-number="131">
      <rect x="500" y="110" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="127.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">131</text>
    </g>

    <!-- Stairs Right -->
    <g>
      <rect x="410" y="150" width="40" height="50" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="430" y="175" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Stairs</text>
    </g>

    <!-- Room 132 -->
    <g data-room-number="132">
      <rect x="500" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">132</text>
    </g>

    <!-- Room 133 -->
    <g data-room-number="133">
      <rect x="500" y="190" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="207.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">133</text>
    </g>

    <!-- Room 134 -->
    <g data-room-number="134">
      <rect x="500" y="230" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="247.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">134</text>
    </g>

    <!-- Room 102 -->
    <g data-room-number="102">
      <rect x="410" y="210" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="427.5" y="227.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">102</text>
    </g>

    <!-- Room 101 -->
    <g data-room-number="101">
      <rect x="410" y="250" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="427.5" y="267.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">101</text>
    </g>

    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#000000"/>
      </marker>
    </defs>
  </svg>
`;
