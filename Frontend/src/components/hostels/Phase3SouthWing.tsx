import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 3 South Wing configuration
export const phase3SouthWingConfig: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 35, exceptions: [] },
  "1st Floor": { start: 101, end: 135, exceptions: [] },
  "2nd Floor": { start: 201, end: 235, exceptions: [] },
  "3rd Floor": { start: 301, end: 335, exceptions: [] },
  "4th Floor": { start: 401, end: 435, exceptions: [] },
  "5th Floor": { start: 501, end: 535, exceptions: [] },
  "6th Floor": { start: 601, end: 635, exceptions: [] },
  "7th Floor": { start: 701, end: 735, exceptions: [] },
  "8th Floor": { start: 801, end: 835, exceptions: [] },
  "9th Floor": { start: 901, end: 935, exceptions: [] }
};

// SVG string for Phase 3 South Wing 2nd Floor
export const phase3SouthWing2ndFloorSvgString = `
  <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
    <!-- Background with grid -->
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ccc" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    <rect width="798" height="698" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    
    <!-- Title -->
    <rect x="350" y="200" width="250" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
    <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing 2nd Floor</text>
    
    <!-- Rooms on the left -->
    <g data-room-number="221">
      <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">221</text>
    </g>
    
    <g data-room-number="220">
      <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">220</text>
    </g>
    
    <g>
      <rect x="40" y="160" width="60" height="80" rx="4" fill="#d3d3d3" stroke="#718096" strokeWidth="2" />
      <text x="55" y="190" fontSize="12" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif" fill="black">Lift</text>
      <text x="55" y="210" fontSize="12" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif" fill="black">Area</text>
    </g>
    
    <g>
      <rect x="40" y="250" width="60" height="80" rx="4" fill="#d3d3d3" stroke="#718096" strokeWidth="2" />
      <text x="55" y="290" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
    </g>
    
    <g data-room-number="219">
      <rect x="40" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="390" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">219</text>
    </g>
    
    <g data-room-number="218">
      <rect x="40" y="430" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">218</text>
    </g>
    
    <g data-room-number="217">
      <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">217</text>
    </g>
    
    <g data-room-number="216">
      <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">216</text>
    </g>
    
    <!-- Rooms on the top right -->
    <g data-room-number="222">
      <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">222</text>
    </g>
    
    <g data-room-number="223">
      <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">223</text>
    </g>
    
    <g data-room-number="224">
      <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">224</text>
    </g>
    
    <g data-room-number="225">
      <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">225</text>
    </g>
    
    <!-- Rooms in the middle row -->
    <g data-room-number="226">
      <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">226</text>
    </g>
    
    <g data-room-number="227">
      <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">227</text>
    </g>
    
    <g data-room-number="228">
      <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">228</text>
    </g>
    
    <g data-room-number="229">
      <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">229</text>
    </g>
    
    <g data-room-number="230">
      <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">230</text>
    </g>
    
    <g data-room-number="231">
      <rect x="590" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="610" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">231</text>
    </g>
    
    <g data-room-number="232">
      <rect x="660" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="680" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">232</text>
    </g>
    
    <!-- Bottom elements -->
    <g>
      <rect x="150" y="490" width="160" height="100" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
      <text x="230" y="540" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">🚽</text>
    </g>
    
    <g>
      <rect x="370" y="490" width="80" height="40" rx="4" fill="#d3d3d3" stroke="#718096" strokeWidth="2" />
      <text x="380" y="515" fontSize="20" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Lift Area</text>
    </g>
    
    <g>
      <rect x="370" y="540" width="80" height="40" rx="4" fill="#d3d3d3" stroke="#718096" strokeWidth="2" />
      <text x="380" y="565" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
    </g>
    
    <g data-room-number="235">
      <rect x="460" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="480" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">235</text>
    </g>
    
    <g data-room-number="234">
      <rect x="530" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="550" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">234</text>
    </g>
    
    <g data-room-number="233">
      <rect x="600" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="620" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">233</text>
    </g>
    
    <!-- Corridors & Balcony -->
    <g transform="translate(130, 200) rotate(-90)">
      <text x="0" y="10" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
    </g>
    
    <text x="400" y="460" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
    
    <g transform="translate(710, 520) rotate(-90)">
      <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Balcony</text>
    </g>
  </svg>
`;

// Create a simple list view for Phase 3 South Wing floors
const Phase3SouthWingFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase3SouthWingConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For 2nd Floor, use SVG rendering
  if (floor === '2nd Floor') {
    const svgRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
      // Event handler using delegation
      const handleClick = (event: MouseEvent) => {
        const targetGroup = (event.target as Element).closest('g[data-room-number]');
        if (targetGroup) {
          const roomNumber = targetGroup.getAttribute('data-room-number');
          if (roomNumber) {
            onRoomClick(roomNumber);
          }
        }
      };
      
      container.addEventListener('click', handleClick);
      
      return () => {
        container.removeEventListener('click', handleClick);
      };
    }, [onRoomClick]);
    
    return (
      <div
        ref={svgRef}
        className="svg-container"
        dangerouslySetInnerHTML={{ __html: phase3SouthWing2ndFloorSvgString }}
      />
    );
  }
  
  // For other floors, use the grid layout
  const getRoomOccupancyStatus = (roomNumber: number | string): string => {
    const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
    const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
    const isBedAOccupied = occupiedBeds[bedAKey] || false;
    const isBedBOccupied = occupiedBeds[bedBKey] || false;
    
    if (isBedAOccupied && isBedBOccupied) {
      return "fully-occupied";
    } else if (isBedAOccupied || isBedBOccupied) {
      return "partially-occupied";
    } else {
      return "available";
    }
  };
  
  const createRoomButton = (roomNumber: number): React.ReactNode => {
    const occupancyStatus = getRoomOccupancyStatus(roomNumber);
    return (
      <button
        key={roomNumber}
        className={`room-button ${occupancyStatus}`}
        data-room-number={roomNumber}
        onClick={() => onRoomClick(roomNumber.toString())}
        disabled={occupancyStatus === "fully-occupied"}
      >
        {roomNumber}
      </button>
    );
  };
  
  // Render Phase 3 South Wing as a grid of room buttons
  const rooms: React.ReactNode[] = [];
  for (let i = floorInfo.start; i <= floorInfo.end; i++) {
    if (floorInfo.exceptions && floorInfo.exceptions.includes(i)) continue;
    rooms.push(createRoomButton(i));
  }
  
  return (
    <div className="room-list-container">
      <h3>{`${selectedBlock} - ${floor}`}</h3>
      <div className="room-grid">
        {rooms}
      </div>
    </div>
  );
};

export default Phase3SouthWingFloorPlan;