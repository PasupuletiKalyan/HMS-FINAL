import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 3 North Wing configuration
export const phase3NorthWingConfig: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 35, exceptions: [] },
  "1st Floor": { start: 101, end: 135, exceptions: [] },
  "2nd Floor": { start: 201, end: 235, exceptions: [] },
  "3rd Floor": { start: 301, end: 348, exceptions: [] },
  "4th Floor": { start: 401, end: 448, exceptions: [] },
  "5th Floor": { start: 501, end: 548, exceptions: [] },
  "6th Floor": { start: 601, end: 648, exceptions: [] },
  "7th Floor": { start: 701, end: 748, exceptions: [] },
  "8th Floor": { start: 801, end: 835, exceptions: [] },
  "9th Floor": { start: 901, end: 935, exceptions: [] }
};

// SVG String for Phase 3 North Wing Ground Floor
export const phase3NorthWingGroundFloorSvgString = `
  <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="1198" height="598" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    
    <!-- Title -->
    <rect x="200" y="300" width="500" height="100" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="450" y="360" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 3 North Wing - Ground Floor</text>
    
    <!-- Top WS Room -->
    <rect x="100" y="50" width="200" height="80" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1.5" />
    <text x="200" y="95" fontSize="20" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
    
    <!-- Corridor between WS and bottom rooms -->
    <rect x="140" y="150" width="120" height="30" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="200" y="170" fontSize="16" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    
    <!-- Room 05, 04, 03 aligned under WS, facing it -->
    <g data-room-number="5">
      <rect x="100" y="180" width="50" height="50" rx="4" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="125" y="210" fontSize="16" textAnchor="middle" fontFamily="Inter, sans-serif">05</text>
    </g>
    
    <!-- ...existing code for other rooms... -->
    
    <!-- Building Outline -->
    <path d="M50,20 L800,20 L800,50 L900,50 L900,450 L50,450 Z" fill="none" stroke="#718096" strokeWidth="2" strokeDasharray="5,5" />
  </svg>
`;

// SVG String for Phase 3 North Wing Higher Floors (3rd-7th floors)
export const phase3NorthWingHigherFloorSvgString = `
  <svg viewBox="-10 -10 680 600" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="680" height="600" x="-10" y="-10" fill="#ffffff"/>
    
    <!-- Top vertical section (left column) -->
    <g data-room-number="317">
      <rect x="200" y="10" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="30" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">317</text>
    </g>
    
    <g data-room-number="316">
      <rect x="200" y="60" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="80" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">316</text>
    </g>
    
    <g data-room-number="315">
      <rect x="200" y="110" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="130" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">315</text>
    </g>
    
    <g data-room-number="314">
      <rect x="200" y="160" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="180" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">314</text>
    </g>
    
    <g data-room-number="313">
      <rect x="200" y="210" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="230" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">313</text>
    </g>

    <!-- Top vertical section (right column) -->
    <g data-room-number="338">
      <rect x="270" y="10" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">338</text>
    </g>
    
    <g data-room-number="339">
      <rect x="270" y="60" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="80" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">339</text>
    </g>
    
    <g data-room-number="340">
      <rect x="270" y="110" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="130" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">340</text>
    </g>
    
    <g data-room-number="341">
      <rect x="270" y="160" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="180" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">341</text>
    </g>
    
    <g data-room-number="342">
      <rect x="270" y="210" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="230" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">342</text>
    </g>

    <!-- Middle horizontal section -->
    <!-- Washroom -->
    <g data-common-area="WS">
      <rect x="10" y="260" width="150" height="60" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="85" y="290" fontSize="16" textAnchor="middle" fontFamily="Inter, sans-serif">WS</text>
    </g>
    
    <!-- Stairs 1 -->
    <g data-common-area="Stairs1">
      <rect x="190" y="260" width="60" height="50" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="200" y="285" fontSize="8" textAnchor="middle"fontFamily="Inter, sans-serif">Stairs</text>
    </g>
    
    <!-- Lift Area -->
    <g data-common-area="LiftArea">
      <rect x="320" y="260" width="60" height="50" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="340" y="280" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Lift</text>
      <text x="340" y="293" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Area</text>
    </g>
    
    <g data-room-number="343">
      <rect x="390" y="260" width="40" height="50" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="400" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">343</text>
    </g>
    
    <g data-room-number="344">
      <rect x="440" y="260" width="40" height="50" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="450" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">344</text>
    </g>
    
    <g data-room-number="345">
      <rect x="490" y="260" width="40" height="50" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="500" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">345</text>
    </g>

    <!-- Middle horizontal section (bottom rooms) -->
    <g data-room-number="312">
      <rect x="10" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="20" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">312</text>
    </g>
    
    <g data-room-number="311">
      <rect x="60" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="70" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">311</text>
    </g>
    
    <g data-room-number="310">
      <rect x="170" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="180" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">310</text>
    </g>
    
    <g data-room-number="309">
      <rect x="220" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="230" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">309</text>
    </g>
    
    <g data-room-number="308">
      <rect x="270" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">308</text>
    </g>
    
    <g data-room-number="307">
      <rect x="340" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="350" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">307</text>
    </g>
    
    <g data-room-number="306">
      <rect x="390" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="400" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">306</text>
    </g>
    
    <g data-room-number="305">
      <rect x="440" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="450" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">305</text>
    </g>
    
    <g data-common-area="Stairs2">
      <rect x="490" y="350" width="60" height="40" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="500" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Stairs</text>
    </g>

    <!-- Bottom Vertical Section (left column) -->
    <g data-room-number="304">
      <rect x="550" y="400" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="560" y="420" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">304</text>
    </g>
    
    <g data-room-number="303">
      <rect x="550" y="450" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="560" y="470" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">303</text>
    </g>
    
    <g data-room-number="302">
      <rect x="550" y="500" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="560" y="520" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">302</text>
    </g>
    
    <g data-room-number="301">
      <rect x="550" y="550" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="560" y="570" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">301</text>
    </g>

    <!-- Bottom Vertical Section (right column) -->
    <g data-room-number="346">
      <rect x="620" y="400" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="630" y="420" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">346</text>
    </g>
    
    <g data-room-number="347">
      <rect x="620" y="450" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="630" y="470" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">347</text>
    </g>
    
    <g data-room-number="348">
      <rect x="620" y="500" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="630" y="520" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">348</text>
    </g>

    <!-- Corridors and labels -->
    <!-- Vertical corridor -->
    <text x="255" y="155" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 255,150)">Corridor</text>
    
    <!-- Horizontal corridor between WS and rooms -->
    <text x="135" y="340" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    
    <!-- Bottom vertical corridor -->
    <text x="580" y="480" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 605,475)">Corridor</text>
    
    <!-- Balcony label -->
    <text x="520" y="370" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 540,300)">Balcony</text>

    <!-- Corridor arrows -->
    <line x1="125" y1="330" x2="105" y2="330" style="stroke:#a0a0a0;stroke-width:1.5;" marker-end="url(#arrowhead-left)" />
    <line x1="145" y1="330" x2="165" y2="330" style="stroke:#a0a0a0;stroke-width:1.5;" marker-end="url(#arrowhead-right)" />
    
    <!-- Arrow markers definition -->
    <defs>
      <marker
        id="arrowhead-right"
        markerWidth="8"
        markerHeight="5"
        refX="6"
        refY="2.5"
        orient="auto"
        markerUnits="strokeWidth">
        <polygon points="0 0, 8 2.5, 0 5" fill="#a0a0a0" />
      </marker>
      <marker
        id="arrowhead-left"
        markerWidth="8"
        markerHeight="5"
        refX="2"
        refY="2.5"
        orient="auto"
        markerUnits="strokeWidth">
        <polygon points="8 0, 0 2.5, 8 5" fill="#a0a0a0" />
      </marker>
    </defs>
  </svg>
`;

// Component for rendering Phase 3 North Wing SVG
const Phase3NorthWingFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase3NorthWingConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For Ground Floor, use the original SVG rendering
  if (floor === 'Ground Floor') {
    const svgRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
      // Apply room occupancy status colors
      const roomElements = container.querySelectorAll('g[data-room-number]');
      roomElements.forEach(roomElement => {
        const roomNumber = roomElement.getAttribute('data-room-number') || '';
        const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
        const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
        const isBedAOccupied = occupiedBeds[bedAKey] || false;
        const isBedBOccupied = occupiedBeds[bedBKey] || false;
        
        const rect = roomElement.querySelector('rect');
        if (rect) {
          if (isBedAOccupied && isBedBOccupied) {
            // Fully occupied
            rect.setAttribute('fill', '#fecaca'); // Red-200
            rect.setAttribute('stroke', '#ef4444'); // Red-500
          } else if (isBedAOccupied || isBedBOccupied) {
            // Partially occupied
            rect.setAttribute('fill', '#fef08a'); // Yellow-200
            rect.setAttribute('stroke', '#eab308'); // Yellow-500
          } else {
            // Available
            rect.setAttribute('fill', '#bbf7d0'); // Green-200
            rect.setAttribute('stroke', '#22c55e'); // Green-500
          }
        }
      });
      
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
    }, [onRoomClick, occupiedBeds, selectedBlock, selectedFloor]);
    
    return (
      <div
        ref={svgRef}
        className="svg-container"
        dangerouslySetInnerHTML={{ __html: phase3NorthWingGroundFloorSvgString }}
      />
    );
  }
  
  // For 3rd to 7th floor, use the new SVG layout
  if (['3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor'].includes(floor)) {
    const svgRef = React.useRef<HTMLDivElement>(null);
    const floorPrefix = floor.charAt(0); // Get first character (3, 4, 5, etc.)
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
      // Update room numbers based on floor
      const roomElements = container.querySelectorAll('g[data-room-number]');
      roomElements.forEach(roomElement => {
        const originalRoomNumber = roomElement.getAttribute('data-room-number') || '';
        // Replace first digit with current floor prefix (301, 401, 501, etc.)
        const floorRoomNumber = floorPrefix + originalRoomNumber.substring(1);
        
        // Update the room number text
        const text = roomElement.querySelector('text');
        if (text) {
          text.textContent = floorRoomNumber;
        }
        
        // Update data attribute to new room number for click handling
        roomElement.setAttribute('data-room-number', floorRoomNumber);
        
        // Apply occupancy colors
        const bedAKey = `${selectedBlock}_${selectedFloor}_${floorRoomNumber}_A`;
        const bedBKey = `${selectedBlock}_${selectedFloor}_${floorRoomNumber}_B`;
        const isBedAOccupied = occupiedBeds[bedAKey] || false;
        const isBedBOccupied = occupiedBeds[bedBKey] || false;
        
        const rect = roomElement.querySelector('rect');
        if (rect) {
          if (isBedAOccupied && isBedBOccupied) {
            // Fully occupied
            rect.setAttribute('fill', '#fecaca'); // Red-200
            rect.setAttribute('stroke', '#ef4444'); // Red-500
          } else if (isBedAOccupied || isBedBOccupied) {
            // Partially occupied
            rect.setAttribute('fill', '#fef08a'); // Yellow-200
            rect.setAttribute('stroke', '#eab308'); // Yellow-500
          } else {
            // Available
            rect.setAttribute('fill', '#bbf7d0'); // Green-200
            rect.setAttribute('stroke', '#22c55e'); // Green-500
          }
        }
      });
      
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
    }, [onRoomClick, occupiedBeds, selectedBlock, selectedFloor, floorPrefix]);
    
    return (
      <div>
        <h3 className="text-center mb-4">{`${selectedBlock} - ${floor}`}</h3>
        <div
          ref={svgRef}
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: phase3NorthWingHigherFloorSvgString }}
        />
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Click on a room to book a bed</p>
        </div>
      </div>
    );
  }
  
  // For other floors (1st, 2nd, 8th, 9th), use a simple list view
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

export default Phase3NorthWingFloorPlan;