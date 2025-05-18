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

// Phase3 North Wing Ground Floor Plan component (Structure 8)
const Phase3NorthWingGroundFloor: React.FC<FloorPlanProps> = ({ 
  selectedBlock, 
  selectedFloor, 
  occupiedBeds, 
  onRoomClick,
  floor: _floor // Renamed to indicate it's intentionally unused
}) => {
  // ViewBox dimensions
  const viewBoxWidth = 800;
  const viewBoxHeight = 600;

  // Common dimensions
  const roomWidth = 40;
  const roomHeight = 40;
  const roomSpacing = 10;
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
      {/* Header Section */}
      <text x={viewBoxWidth / 2} y={30} fontSize="18" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
        Phase 3 North Wing - Ground Floor (Structure 8)
      </text>
      
      {/* Wing Entry Points */}
      <g>
        <line x1={viewBoxWidth / 2} y1={70} x2={viewBoxWidth / 2} y2={50} stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <text x={viewBoxWidth / 2} y={90} fontSize="12" fontFamily="sans-serif" textAnchor="middle">Main Entrance</text>
      </g>
      
      {/* Left Wing */}
      <g>
        <rect x={50} y={120} width={300} height={400} fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="5,5" />
        <text x={200} y={135} fontSize="14" fontFamily="sans-serif" textAnchor="middle">Left Wing</text>
      </g>
      
      {/* Right Wing */}
      <g>
        <rect x={450} y={120} width={300} height={400} fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="5,5" />
        <text x={600} y={135} fontSize="14" fontFamily="sans-serif" textAnchor="middle">Right Wing</text>
      </g>
      
      {/* Left Wing Facilities */}
      {/* WS (Washroom) */}
      <Element 
        x={100} y={170} width={80} height={60} 
        label="WS" 
        fontSize={14}
        fillColor={elementFill}
        roomNumber="WS-Left"
      />
      
      {/* Stairs */}
      <Element 
        x={200} y={170} width={60} height={60} 
        label="Stairs" 
        fontSize={12}
        fillColor={elementFill}
        roomNumber="Stairs-Left"
      />
      
      {/* Left Wing Rooms - Top Row */}
      <Element 
        x={70} y={250} 
        width={roomWidth} height={roomHeight} 
        label="G01" 
        fillColor={getRoomColor('1')}
        roomNumber="1"
        roomStatus="Available"
        onClick={() => handleRoomClick('1')}
      />
      
      <Element 
        x={70 + (roomWidth + roomSpacing)} y={250} 
        width={roomWidth} height={roomHeight} 
        label="G02" 
        fillColor={getRoomColor('2')}
        roomNumber="2"
        roomStatus="Available"
        onClick={() => handleRoomClick('2')}
      />
      
      <Element 
        x={70 + 2 * (roomWidth + roomSpacing)} y={250}
        width={roomWidth} height={roomHeight} 
        label="G03" 
        fillColor={getRoomColor('3')}
        roomNumber="3"
        roomStatus="Available"
        onClick={() => handleRoomClick('3')}
      />

      {/* G02 */}      <Element 
        x={70 + 3 * (roomWidth + roomSpacing)} y={250} 
        width={roomWidth} height={roomHeight} 
        label="G04" 
        fillColor={getRoomColor('4')}
        roomNumber="4"
        roomStatus="Available"
        onClick={() => handleRoomClick('4')}
      />
      
      <Element 
        x={70 + 4 * (roomWidth + roomSpacing)} y={250} 
        width={roomWidth} height={roomHeight} 
        label="G05" 
        fillColor={getRoomColor('5')}
        roomNumber="5"
        roomStatus="Available"
        onClick={() => handleRoomClick('5')}
      />
      
      {/* Left Wing Rooms - Bottom Row */}
      <Element 
        x={70} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G06" 
        fillColor={getRoomColor('6')}
        roomNumber="6"
        roomStatus="Available"
        onClick={() => handleRoomClick('6')}
      />
      
      <Element 
        x={70 + (roomWidth + roomSpacing)} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G07" 
        fillColor={getRoomColor('7')}
        roomNumber="7"
        roomStatus="Available"
        onClick={() => handleRoomClick('7')}
      />
      
      <Element 
        x={70 + 2 * (roomWidth + roomSpacing)} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G08" 
        fillColor={getRoomColor('8')}
        roomNumber="8"
        roomStatus="Available"
        onClick={() => handleRoomClick('8')}
      />
      
      <Element 
        x={70 + 3 * (roomWidth + roomSpacing)} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G09" 
        fillColor={getRoomColor('9')}
        roomNumber="9"
        roomStatus="Available"
        onClick={() => handleRoomClick('9')}
      />
      
      <Element 
        x={70 + 4 * (roomWidth + roomSpacing)} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G10" 
        fillColor={getRoomColor('10')}
        roomNumber="10"
        roomStatus="Available"
        onClick={() => handleRoomClick('10')}
      />
      
      {/* Left Wing Corridor Text */}
      <text x={200} y={380} fontSize="12" fontFamily="sans-serif" textAnchor="middle">Corridor</text>
      
      {/* Reception */}
      <Element 
        x={140} y={400} width={120} height={60} 
        label="Reception" 
        fontSize={14}
        fillColor={elementFill}
        roomNumber="Reception"
      />
      
      {/* Right Wing Facilities */}
      {/* WS (Washroom) */}
      <Element 
        x={620} y={170} width={80} height={60} 
        label="WS" 
        fontSize={14}
        fillColor={elementFill}
        roomNumber="WS-Right"
      />
      
      {/* Lift */}
      <Element 
        x={530} y={170} width={60} height={60} 
        label="Lift" 
        fontSize={12}
        fillColor={elementFill}
        roomNumber="Lift"
      />
      
      {/* Right Wing Rooms - Top Row */}      
      <Element 
        x={490} y={250} 
        width={roomWidth} height={roomHeight} 
        label="G21" 
        fillColor={getRoomColor('21')}
        roomNumber="21"
        roomStatus="Available"
        onClick={() => handleRoomClick('21')}
      />
      
      <Element 
        x={490 + (roomWidth + roomSpacing)} y={250} 
        width={roomWidth} height={roomHeight} 
        label="G22" 
        fillColor={getRoomColor('22')}
        roomNumber="22"
        roomStatus="Available"
        onClick={() => handleRoomClick('22')}
      />
      
      <Element 
        x={490 + 2 * (roomWidth + roomSpacing)} y={250} 
        width={roomWidth} height={roomHeight} 
        label="G23" 
        fillColor={getRoomColor('23')}
        roomNumber="23"
        roomStatus="Available"
        onClick={() => handleRoomClick('23')}
      />
      
      <Element 
        x={490 + 3 * (roomWidth + roomSpacing)} y={250} 
        width={roomWidth} height={roomHeight} 
        label="G24" 
        fillColor={getRoomColor('24')}
        roomNumber="24"
        roomStatus="Available"
        onClick={() => handleRoomClick('24')}
      />
      
      <Element 
        x={490 + 4 * (roomWidth + roomSpacing)} y={250} 
        width={roomWidth} height={roomHeight} 
        label="G25" 
        fillColor={getRoomColor('25')}
        roomNumber="25"
        roomStatus="Available"
        onClick={() => handleRoomClick('25')}
      />

      {/* Right Wing Rooms - Bottom Row */}
      <Element 
        x={490} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G26" 
        fillColor={getRoomColor('26')}
        roomNumber="26"
        roomStatus="Available"
        onClick={() => handleRoomClick('26')}
      />
      
      <Element 
        x={490 + (roomWidth + roomSpacing)} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G27" 
        fillColor={getRoomColor('27')}
        roomNumber="27"
        roomStatus="Available"
        onClick={() => handleRoomClick('27')}
      />
      
      <Element 
        x={490 + 2 * (roomWidth + roomSpacing)} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G28" 
        fillColor={getRoomColor('28')}
        roomNumber="28"
        roomStatus="Available"
        onClick={() => handleRoomClick('28')}
      />
      
      <Element 
        x={490 + 3 * (roomWidth + roomSpacing)} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G29" 
        fillColor={getRoomColor('29')}
        roomNumber="29"
        roomStatus="Available"
        onClick={() => handleRoomClick('29')}
      />
      
      <Element 
        x={490 + 4 * (roomWidth + roomSpacing)} y={310} 
        width={roomWidth} height={roomHeight} 
        label="G30" 
        fillColor={getRoomColor('30')}
        roomNumber="30"
        roomStatus="Available"
        onClick={() => handleRoomClick('30')}
      />
      
      {/* Right Wing Corridor Text */}
      <text x={600} y={380} fontSize="12" fontFamily="sans-serif" textAnchor="middle">Corridor</text>
      
      {/* Warden Residence */}
      <Element 
        x={550} y={400} width={100} height={60} 
        label="WR" 
        fontSize={14}
        fillColor={elementFill}
        roomNumber="Warden-Residence"
      />
      
      {/* Additional Rooms (11-20) - Middle Section Lower */}
      <Element 
        x={160} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G11" 
        fillColor={getRoomColor('11')}
        roomNumber="11"
        roomStatus="Available"
        onClick={() => handleRoomClick('11')}
      />
      
      <Element 
        x={160 + (roomWidth + roomSpacing)} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G12" 
        fillColor={getRoomColor('12')}
        roomNumber="12"
        roomStatus="Available"
        onClick={() => handleRoomClick('12')}
      />
      
      <Element 
        x={160 + 2 * (roomWidth + roomSpacing)} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G13" 
        fillColor={getRoomColor('13')}
        roomNumber="13"
        roomStatus="Available"
        onClick={() => handleRoomClick('13')}
      />
      
      <Element 
        x={160 + 3 * (roomWidth + roomSpacing)} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G14" 
        fillColor={getRoomColor('14')}
        roomNumber="14"
        roomStatus="Available"
        onClick={() => handleRoomClick('14')}
      />
      
      <Element 
        x={160 + 4 * (roomWidth + roomSpacing)} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G15" 
        fillColor={getRoomColor('15')}
        roomNumber="15"
        roomStatus="Available"
        onClick={() => handleRoomClick('15')}
      />
      
      {/* Utility Room */}
      <Element 
        x={400} y={480} width={80} height={50} 
        label="Utility" 
        fontSize={12}
        fillColor={elementFill}
        roomNumber="Utility"
      />
      
      {/* Right Section Rooms 16-20 */}
      <Element 
        x={490} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G16" 
        fillColor={getRoomColor('16')}
        roomNumber="16"
        roomStatus="Available"
        onClick={() => handleRoomClick('16')}
      />
      
      <Element 
        x={490 + (roomWidth + roomSpacing)} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G17" 
        fillColor={getRoomColor('17')}
        roomNumber="17"
        roomStatus="Available"
        onClick={() => handleRoomClick('17')}
      />
      
      <Element 
        x={490 + 2 * (roomWidth + roomSpacing)} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G18" 
        fillColor={getRoomColor('18')}
        roomNumber="18"
        roomStatus="Available"
        onClick={() => handleRoomClick('18')}
      />
      
      <Element 
        x={490 + 3 * (roomWidth + roomSpacing)} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G19" 
        fillColor={getRoomColor('19')}
        roomNumber="19"
        roomStatus="Available"
        onClick={() => handleRoomClick('19')}
      />
      
      <Element 
        x={490 + 4 * (roomWidth + roomSpacing)} y={480} 
        width={roomWidth} height={roomHeight} 
        label="G20" 
        fillColor={getRoomColor('20')}
        roomNumber="20"
        roomStatus="Available"
        onClick={() => handleRoomClick('20')}
      />
      
      {/* Additional Lower Rooms - G31-G35 */}
      <Element 
        x={70} y={540} 
        width={roomWidth} height={roomHeight} 
        label="G31" 
        fillColor={getRoomColor('31')}
        roomNumber="31"
        roomStatus="Available"
        onClick={() => handleRoomClick('31')}
      />
      
      <Element 
        x={170} y={540} 
        width={roomWidth} height={roomHeight} 
        label="G32" 
        fillColor={getRoomColor('32')}
        roomNumber="32"
        roomStatus="Available"
        onClick={() => handleRoomClick('32')}
      />
      
      <Element 
        x={270} y={540} 
        width={roomWidth} height={roomHeight} 
        label="G33" 
        fillColor={getRoomColor('33')}
        roomNumber="33"
        roomStatus="Available"
        onClick={() => handleRoomClick('33')}
      />
      
      <Element 
        x={370} y={540} 
        width={roomWidth} height={roomHeight} 
        label="G34" 
        fillColor={getRoomColor('34')}
        roomNumber="34"
        roomStatus="Available"
        onClick={() => handleRoomClick('34')}
      />
      
      <Element 
        x={470} y={540} 
        width={roomWidth} height={roomHeight} 
        label="G35" 
        fillColor={getRoomColor('35')}
        roomNumber="35"
        roomStatus="Available"
        onClick={() => handleRoomClick('35')}
      />
      
      {/* Lower Corridor Text */}
      <text x={viewBoxWidth / 2} y={520} fontSize="12" fontFamily="sans-serif" textAnchor="middle">Main Corridor</text>
      
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

export default Phase3NorthWingGroundFloor;

// Export the SVG string for potential server-side rendering
export const phase3NorthWingGroundFloorSvgString = `
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="800" height="600" fill="#ffffff"/>
    
    <!-- Header Text -->
    <text x="400" y="30" font-size="18" font-family="sans-serif" text-anchor="middle" font-weight="bold">
      Phase 3 North Wing - Ground Floor (Structure 8)
    </text>
    
    <!-- Wing Entry Points -->
    <g>
      <line x1="400" y1="70" x2="400" y2="50" stroke="#000000" stroke-width="1.5" marker-end="url(#arrowhead)" />
      <text x="400" y="90" font-size="12" font-family="sans-serif" text-anchor="middle">Main Entrance</text>
    </g>
    
    <!-- Left Wing -->
    <g>
      <rect x="50" y="120" width="300" height="400" fill="none" stroke="#000000" stroke-width="1" stroke-dasharray="5,5" />
      <text x="200" y="135" font-size="14" font-family="sans-serif" text-anchor="middle">Left Wing</text>
    </g>
    
    <!-- Right Wing -->
    <g>
      <rect x="450" y="120" width="300" height="400" fill="none" stroke="#000000" stroke-width="1" stroke-dasharray="5,5" />
      <text x="600" y="135" font-size="14" font-family="sans-serif" text-anchor="middle">Right Wing</text>
    </g>
    
    <!-- Left Wing Facilities -->
    <!-- WS (Washroom) -->
    <g>
      <rect x="100" y="170" width="80" height="60" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="140" y="200" fill="#000000" font-size="14" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">WS</text>
    </g>
    
    <!-- Stairs -->
    <g>
      <rect x="200" y="170" width="60" height="60" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="230" y="200" fill="#000000" font-size="12" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Stairs</text>
    </g>
    
    <!-- Left Wing Rooms - Top Row -->
    <g data-room-number="1">
      <rect x="70" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="90" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G01</text>
    </g>
    
    <g data-room-number="2">
      <rect x="120" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="140" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G02</text>
    </g>
    
    <g data-room-number="3">
      <rect x="170" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="190" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G03</text>
    </g>
    
    <g data-room-number="4">
      <rect x="220" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="240" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G04</text>
    </g>
    
    <g data-room-number="5">
      <rect x="270" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="290" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G05</text>
    </g>
    
    <!-- Left Wing Rooms - Bottom Row -->
    <g data-room-number="6">
      <rect x="70" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="90" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G06</text>
    </g>
    
    <g data-room-number="7">
      <rect x="120" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="140" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G07</text>
    </g>
    
    <g data-room-number="8">
      <rect x="170" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="190" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G08</text>
    </g>
    
    <g data-room-number="9">
      <rect x="220" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="240" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G09</text>
    </g>
    
    <g data-room-number="10">
      <rect x="270" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="290" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G10</text>
    </g>
    
    <!-- Left Wing Corridor Text -->
    <text x="200" y="380" font-size="12" font-family="sans-serif" text-anchor="middle">Corridor</text>
    
    <!-- Reception -->
    <g>
      <rect x="140" y="400" width="120" height="60" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="200" y="430" fill="#000000" font-size="14" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Reception</text>
    </g>
    
    <!-- Right Wing Facilities -->
    <!-- WS (Washroom) -->
    <g>
      <rect x="620" y="170" width="80" height="60" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="660" y="200" fill="#000000" font-size="14" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">WS</text>
    </g>
    
    <!-- Lift -->
    <g>
      <rect x="530" y="170" width="60" height="60" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="560" y="200" fill="#000000" font-size="12" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Lift</text>
    </g>
    
    <!-- Right Wing Rooms - Top Row -->      
    <g data-room-number="21">
      <rect x="490" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="510" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G21</text>
    </g>
    
    <g data-room-number="22">
      <rect x="540" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="560" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G22</text>
    </g>
    
    <g data-room-number="23">
      <rect x="590" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="610" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G23</text>
    </g>
    
    <g data-room-number="24">
      <rect x="640" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="660" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G24</text>
    </g>
    
    <g data-room-number="25">
      <rect x="690" y="250" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="710" y="270" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G25</text>
    </g>

    <!-- Right Wing Rooms - Bottom Row -->
    <g data-room-number="26">
      <rect x="490" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="510" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G26</text>
    </g>
    
    <g data-room-number="27">
      <rect x="540" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="560" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G27</text>
    </g>
    
    <g data-room-number="28">
      <rect x="590" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="610" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G28</text>
    </g>
    
    <g data-room-number="29">
      <rect x="640" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="660" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G29</text>
    </g>
    
    <g data-room-number="30">
      <rect x="690" y="310" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="710" y="330" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G30</text>
    </g>
    
    <!-- Right Wing Corridor Text -->
    <text x="600" y="380" font-size="12" font-family="sans-serif" text-anchor="middle">Corridor</text>
    
    <!-- Warden Residence -->
    <g>
      <rect x="550" y="400" width="100" height="60" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="600" y="430" fill="#000000" font-size="14" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">WR</text>
    </g>
    
    <!-- Additional Rooms (11-20) - Middle Section Lower -->
    <g data-room-number="11">
      <rect x="160" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="180" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G11</text>
    </g>
    
    <g data-room-number="12">
      <rect x="210" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="230" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G12</text>
    </g>
    
    <g data-room-number="13">
      <rect x="260" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="280" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G13</text>
    </g>
    
    <g data-room-number="14">
      <rect x="310" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="330" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G14</text>
    </g>
    
    <g data-room-number="15">
      <rect x="360" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="380" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G15</text>
    </g>
    
    <!-- Utility Room -->
    <g>
      <rect x="400" y="480" width="80" height="50" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="440" y="505" fill="#000000" font-size="12" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Utility</text>
    </g>
    
    <!-- Right Section Rooms 16-20 -->
    <g data-room-number="16">
      <rect x="490" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="510" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G16</text>
    </g>
    
    <g data-room-number="17">
      <rect x="540" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="560" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G17</text>
    </g>
    
    <g data-room-number="18">
      <rect x="590" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="610" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G18</text>
    </g>
    
    <g data-room-number="19">
      <rect x="640" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="660" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G19</text>
    </g>
    
    <g data-room-number="20">
      <rect x="690" y="480" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="710" y="500" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G20</text>
    </g>
    
    <!-- Additional Lower Rooms - G31-G35 -->
    <g data-room-number="31">
      <rect x="70" y="540" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="90" y="560" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G31</text>
    </g>
    
    <g data-room-number="32">
      <rect x="170" y="540" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="190" y="560" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G32</text>
    </g>
    
    <g data-room-number="33">
      <rect x="270" y="540" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="290" y="560" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G33</text>
    </g>
    
    <g data-room-number="34">
      <rect x="370" y="540" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="390" y="560" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G34</text>
    </g>
    
    <g data-room-number="35">
      <rect x="470" y="540" width="40" height="40" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="490" y="560" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G35</text>
    </g>
    
    <!-- Lower Corridor Text -->
    <text x="400" y="520" font-size="12" font-family="sans-serif" text-anchor="middle">Main Corridor</text>
    
    <!-- Arrow definition -->
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#000000"/>
      </marker>
    </defs>
  </svg>
`;
