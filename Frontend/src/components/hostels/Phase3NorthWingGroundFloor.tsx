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
// This component will be used in the new implementation
// @ts-ignore - will be used in future implementation
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
  const viewBoxWidth = 550;  // width
  const viewBoxHeight = 380;  // height

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
      width={viewBoxWidth} // explicit width
      height={viewBoxHeight} // explicit height
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block bg-white"
    >
      {/* --- Top Section --- */}
      {/* South Wing Entry Arrow and Text */}
      <g>
        <line x1="220" y1="70" x2="220" y2="40" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <text x="220" y="20" fontSize="10" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="text-before-edge">South Wing Entry</text>
      </g>

      {/* WS Left */}
      <Element x={20} y={60} width={100} height={40} label="WS" fillColor={elementFill} />
      
      {/* Stairs Left */}
      <Element x={130} y={60} width={50} height={30} label="Stairs" fillColor={elementFill} />
      
      {/* Lift */}
      <Element x={240} y={60} width={50} height={30} label="Lift" fillColor={elementFill} />
      
      {/* WS Right */}
      <Element x={360} y={60} width={100} height={40} label="WS" fillColor={elementFill} />
      
      {/* Corridor Top Text */}
      <text x={180} y={125} fontSize="10" fontFamily="sans-serif" textAnchor="middle">Corridor</text>
      
      {/* Lobby Text */}
      <text x={340} y={125} fontSize="10" fontFamily="sans-serif" textAnchor="middle">Lobby</text>

      {/* --- Middle Section (Left) --- */}
      {/* G05 */}
      <Element 
        x={20} 
        y={150} 
        width={roomWidth} 
        height={roomHeight} 
        label="G05" 
        fillColor={getRoomColor('5')}
        roomNumber="5"
        onClick={() => handleRoomClick('5')} 
      />
      
      {/* G04 */}
      <Element 
        x={20 + 1 * (roomWidth + roomSpacing)} 
        y={150} 
        width={roomWidth} 
        height={roomHeight} 
        label="G04" 
        fillColor={getRoomColor('4')}
        roomNumber="4"
        onClick={() => handleRoomClick('4')} 
      />
      
      {/* G03 */}
      <Element 
        x={20 + 2 * (roomWidth + roomSpacing)} 
        y={150} 
        width={roomWidth} 
        height={roomHeight} 
        label="G03" 
        fillColor={getRoomColor('3')}
        roomNumber="3"
        onClick={() => handleRoomClick('3')} 
      />
      
      {/* G02 */}
      <Element 
        x={20 + 3 * (roomWidth + roomSpacing)} 
        y={150} 
        width={roomWidth} 
        height={roomHeight} 
        label="G02" 
        fillColor={getRoomColor('2')}
        roomNumber="2"
        onClick={() => handleRoomClick('2')} 
      />
      
      {/* G01 */}
      <Element 
        x={20 + 4 * (roomWidth + roomSpacing)} 
        y={150} 
        width={roomWidth} 
        height={roomHeight} 
        label="G01" 
        fillColor={getRoomColor('1')}
        roomNumber="1"
        onClick={() => handleRoomClick('1')} 
      />
      
      {/* Reception Text */}
      <text x={250} y={167.5} fontSize="10" fontFamily="sans-serif" textAnchor="middle">Reception</text>

      {/* Entry Arrow and Text (Middle) */}
      <g>
        <line x1="360" y1="220" x2="360" y2="200" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <text x="360" y="175" fontSize="10" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="text-after-edge">Block Entry</text>
      </g>

      {/* --- Right Wing --- */}
      {/* G26 */}
      <Element 
        x={500} 
        y={90} 
        width={roomWidth} 
        height={roomHeight} 
        label="G26" 
        fillColor={getRoomColor('26')}
        roomNumber="26"
        onClick={() => handleRoomClick('26')} 
      />
      
      {/* G27 */}
      <Element 
        x={500} 
        y={90 + 1 * (roomWidth + roomSpacing)} 
        width={roomWidth} 
        height={roomHeight} 
        label="G27" 
        fillColor={getRoomColor('27')}
        roomNumber="27"
        onClick={() => handleRoomClick('27')} 
      />
      
      {/* G28 */}
      <Element 
        x={500} 
        y={90 + 2 * (roomWidth + roomSpacing)} 
        width={roomWidth} 
        height={roomHeight} 
        label="G28" 
        fillColor={getRoomColor('28')}
        roomNumber="28"
        onClick={() => handleRoomClick('28')} 
      />
      
      {/* Corridor Right Text */}
      <text x={480} y={260} fontSize="10" fontFamily="sans-serif" textAnchor="middle" transform="rotate(-90 480 260)">Corridor</text>

      {/* Stairs Right */}
      <Element x={430} y={210} width={40} height={60} label="Stairs" fillColor={elementFill} />
      
      {/* G29 */}
      <Element 
        x={500} 
        y={90 + 3 * (roomWidth + roomSpacing)} 
        width={roomWidth} 
        height={roomHeight} 
        label="G29" 
        fillColor={getRoomColor('29')}
        roomNumber="29"
        onClick={() => handleRoomClick('29')} 
      />
      
      {/* G30 */}
      <Element 
        x={500} 
        y={90 + 4 * (roomWidth + roomSpacing)} 
        width={roomWidth} 
        height={roomHeight} 
        label="G30" 
        fillColor={getRoomColor('30')}
        roomNumber="30"
        onClick={() => handleRoomClick('30')} 
      />
      
      {/* G31 (bottom right) */}
      <Element 
        x={500} 
        y={90 + 5 * (roomWidth + roomSpacing)} 
        width={roomWidth} 
        height={roomHeight} 
        label="G31" 
        fillColor={getRoomColor('31')}
        roomNumber="31"
        onClick={() => handleRoomClick('31')} 
      />
      
      {/* WR */}
      <Element x={430} y={290} width={40} height={60} label="WR" fillColor={elementFill} />
      
      {/* Arrowhead definition for entry arrows */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#000000"/>
        </marker>
      </defs>
    </svg>
  );
};

export default Phase3NorthWingGroundFloor;

// Export the SVG string for potential server-side rendering
export const phase3NorthWingGroundFloorSvgString = `
  <svg viewBox="0 0 550 380" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="550" height="380" fill="#ffffff"/>
    
    <!-- South Wing Entry Arrow and Text -->
    <g>
      <line x1="220" y1="70" x2="220" y2="40" stroke="#000000" stroke-width="1.5" marker-end="url(#arrowhead)" />
      <text x="220" y="20" font-size="10" font-family="sans-serif" text-anchor="middle">South Wing Entry</text>
    </g>
    
    <!-- WS Left -->
    <rect x="20" y="60" width="100" height="40" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
    <text x="70" y="80" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">WS</text>
    
    <!-- Stairs Left -->
    <rect x="130" y="60" width="50" height="30" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
    <text x="155" y="75" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Stairs</text>
    
    <!-- Lift -->
    <rect x="240" y="60" width="50" height="30" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
    <text x="265" y="75" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Lift</text>
    
    <!-- WS Right -->
    <rect x="360" y="60" width="100" height="40" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
    <text x="410" y="80" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">WS</text>
    
    <!-- Corridor Top Text -->
    <text x="180" y="125" font-size="10" font-family="sans-serif" text-anchor="middle">Corridor</text>
    
    <!-- Lobby Text -->
    <text x="340" y="125" font-size="10" font-family="sans-serif" text-anchor="middle">Lobby</text>
    
    <!-- Rooms G01-G05 -->
    <g data-room-number="5">
      <rect x="20" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="37.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G05</text>
    </g>
    
    <g data-room-number="4">
      <rect x="60" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="77.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G04</text>
    </g>
    
    <g data-room-number="3">
      <rect x="100" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="117.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G03</text>
    </g>
    
    <g data-room-number="2">
      <rect x="140" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="157.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G02</text>
    </g>
    
    <g data-room-number="1">
      <rect x="180" y="150" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="197.5" y="167.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G01</text>
    </g>
    
    <!-- Reception Text -->
    <text x="250" y="167.5" font-size="10" font-family="sans-serif" text-anchor="middle">Reception</text>
    
    <!-- Entry Arrow and Text (Middle) -->
    <g>
      <line x1="360" y1="220" x2="360" y2="200" stroke="#000000" stroke-width="1.5" marker-end="url(#arrowhead)" />
      <text x="360" y="175" font-size="10" font-family="sans-serif" text-anchor="middle">Block Entry</text>
    </g>
    
    <!-- Right Wing Rooms G26-G31 -->
    <g data-room-number="26">
      <rect x="500" y="90" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="107.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G26</text>
    </g>
    
    <g data-room-number="27">
      <rect x="500" y="130" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="147.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G27</text>
    </g>
    
    <g data-room-number="28">
      <rect x="500" y="170" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="187.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G28</text>
    </g>
    
    <!-- Corridor Right Text -->
    <text x="480" y="260" font-size="10" font-family="sans-serif" text-anchor="middle" transform="rotate(-90 480 260)">Corridor</text>
    
    <!-- Stairs Right -->
    <rect x="430" y="210" width="40" height="60" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
    <text x="450" y="240" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">Stairs</text>
    
    <g data-room-number="29">
      <rect x="500" y="210" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="227.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G29</text>
    </g>
    
    <g data-room-number="30">
      <rect x="500" y="250" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="267.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G30</text>
    </g>
    
    <g data-room-number="31">
      <rect x="500" y="290" width="35" height="35" fill="#bbf7d0" stroke="#000000" stroke-width="1" rx="2" ry="2" />
      <text x="517.5" y="307.5" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">G31</text>
    </g>
    
    <!-- WR -->
    <rect x="430" y="290" width="40" height="60" fill="#D1D5DB" stroke="#000000" stroke-width="1" rx="2" ry="2" />
    <text x="450" y="320" fill="#000000" font-size="10" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="500">WR</text>
    
    <!-- Arrow definition -->
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#000000"/>
      </marker>
    </defs>
  </svg>
`;



