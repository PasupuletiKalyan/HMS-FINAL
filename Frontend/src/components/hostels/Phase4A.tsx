import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 4A configuration
export const phase4AConfig: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 30, exceptions: [] },
  "1st Floor": { start: 101, end: 130, exceptions: [] },
  "2nd Floor": { start: 201, end: 230, exceptions: [] },
  "3rd Floor": { start: 301, end: 330, exceptions: [] },
  "4th Floor": { start: 401, end: 430, exceptions: [] },
  "5th Floor": { start: 501, end: 530, exceptions: [] },
  "6th Floor": { start: 601, end: 630, exceptions: [] },
  "7th Floor": { start: 701, end: 730, exceptions: [] },
  "8th Floor": { start: 801, end: 830, exceptions: [] },
  "9th Floor": { start: 901, end: 930, exceptions: [] },
  "10th Floor": { start: 1001, end: 1030, exceptions: [] }
};

// SVG string for Phase 4A Ground Floor with proper room layout
export const phase4AGroundFloorSvgString = `
  <svg viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg">
    
    <!-- Title -->
    <rect x="150" y="5" width="200" height="20" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="1"/>
    <text x="160" y="20" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 4A - Ground Floor</text>
    
    <!-- Top Left Wing -->
    <g data-room-number="LiftStair1">
      <rect x="130" y="40" width="45" height="120" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="138" y="90" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift &</text>
      <text x="138" y="102" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="138" y="114" fontSize="10" textAnchor="middle" dominantBaseline="middle">case</text>
    </g>
    
    <g data-room-number="G09">
      <rect x="40" y="50" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="45" y="75" fontSize="10" textAnchor="middle" dominantBaseline="middle">G09</text>
    </g>
    
    <g data-room-number="G08">
      <rect x="40" y="100" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="45" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">G08</text>
    </g>
    
    <g data-room-number="G07">
      <rect x="40" y="150" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="45" y="175" fontSize="10" textAnchor="middle" dominantBaseline="middle">G07</text>
    </g>
    
    <g data-room-number="G06">
      <rect x="40" y="200" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="45" y="225" fontSize="10" textAnchor="middle" dominantBaseline="middle">G06</text>
    </g>
    
    <g data-room-number="G05">
      <rect x="40" y="250" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="45" y="275" fontSize="10" textAnchor="middle" dominantBaseline="middle">G05</text>
    </g>
    
    <g data-room-number="G04">
      <rect x="40" y="300" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="45" y="325" fontSize="10" textAnchor="middle" dominantBaseline="middle">G04</text>
    </g>
    
    <text x="88" y="190" fontSize="10" transform="rotate(90 88 200)" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    
    <!-- Central Wing -->
    <g data-room-number="G10">
      <rect x="130" y="170" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="134" y="195" fontSize="10" textAnchor="middle" dominantBaseline="middle">G10</text>
    </g>
    
    <g data-room-number="WS1">
      <rect x="130" y="230" width="90" height="70" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="160" y="270" fontSize="12" textAnchor="middle" dominantBaseline="middle">WS</text>
    </g>
     <text x="140" y="330" fontSize="9" textAnchor="middle" dominantBaseline="middle">Corridor</text>
 
    <g data-room-number="G03">
      <rect x="130" y="350" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="135" y="380" fontSize="10" textAnchor="middle" dominantBaseline="middle">G03</text>
    </g>
    
    <g data-room-number="G02">
      <rect x="130" y="400" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="135" y="430" fontSize="10" textAnchor="middle" dominantBaseline="middle">G02</text>
    </g>
    
    <g data-room-number="G01">
      <rect x="130" y="450" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="135" y="480" fontSize="10" textAnchor="middle" dominantBaseline="middle">G01</text>
    </g>
    
    <g data-room-number="G11">
      <rect x="210" y="350" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="215" y="380" fontSize="10" textAnchor="middle" dominantBaseline="middle">G11</text>
    </g>
    
    <g data-room-number="G12">
      <rect x="210" y="400" width="40" height="40" stroke="grey" strokeWidth="1" fill="#bbf7d0"/>
      <text x="215" y="430" fontSize="10" textAnchor="middle" dominantBaseline="middle">G12</text>
    </g>
    
    <g data-room-number="WR">
      <rect x="210" y="450" width="40" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="215" y="480" fontSize="10" textAnchor="middle" dominantBaseline="middle">WR</text>
    </g>
    
    <g data-room-number="LiftArea">
      <rect x="210" y="500" width="40" height="28" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="215" y="520" fontSize="9" textAnchor="middle" dominantBaseline="middle">Lift</text>
    </g>
    
    <g data-room-number="Stair2">
      <rect x="210" y="530" width="45" height="28" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="210" y="550" fontSize="9" textAnchor="middle" dominantBaseline="middle">Stairs</text>
    </g>
    
    <g data-room-number="WS2">
      <rect x="210" y="570" width="40" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="215" y="600" fontSize="10" textAnchor="middle" dominantBaseline="middle">WS</text>
    </g>
    
    <text x="162" y="390" fontSize="10" transform="rotate(90 162 410)" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    
    <!-- Bottom Wing -->
    <g data-room-number="WO">
      <rect x="110" y="610" width="50" height="30" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="135" y="630" fontSize="12" textAnchor="middle" dominantBaseline="middle">👨‍✈️</text>
    </g>
    
    <text x="240" y="640" fontSize="12" textAnchor="middle" dominantBaseline="middle">Reception</text>
    <text x="240" y="670" fontSize="12" textAnchor="middle" dominantBaseline="middle">Lobby</text>
    
    <g data-room-number="Stair3">
      <rect x="370" y="630" width="45" height="30" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="370" y="650" fontSize="9" textAnchor="middle" dominantBaseline="middle">Stairs</text>
    </g>
  </svg>
`;

// SVG string for Phase 4A 1st Floor layout
export const phase4A1stFloorSvgString = `
  <svg viewBox="0 0 350 800" xmlns="http://www.w3.org/2000/svg">
    
    <!-- Title -->
    <rect x="200" y="5" width="180" height="20" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="1"/>
    <text x="220" y="20" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 4A - 1st Floor</text>
    
    <!-- Room Definitions -->
    <!-- Top Left Section (Rooms 114-108) -->
    <g data-room-number="114">
      <rect x="10" y="10" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="20" y="30" fontSize="10" textAnchor="middle" dominantBaseline="middle">114</text>
    </g>
    
    <g data-room-number="113">
      <rect x="10" y="60" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="20" y="90" fontSize="10" textAnchor="middle" dominantBaseline="middle">113</text>
    </g>
    
    <g data-room-number="112">
      <rect x="10" y="110" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="20" y="130" fontSize="10" textAnchor="middle" dominantBaseline="middle">112</text>
    </g>
    
    <g data-room-number="111">
      <rect x="10" y="160" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="20" y="190" fontSize="10" textAnchor="middle" dominantBaseline="middle">111</text>
    </g>
    
    <g data-room-number="110">
      <rect x="10" y="210" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="20" y="240" fontSize="10" textAnchor="middle" dominantBaseline="middle">110</text>
    </g>
    
    <g data-room-number="109">
      <rect x="10" y="260" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="20" y="290" fontSize="10" textAnchor="middle" dominantBaseline="middle">109</text>
    </g>
    
    <g data-room-number="108">
      <rect x="10" y="310" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="20" y="340" fontSize="10" textAnchor="middle" dominantBaseline="middle">108</text>
    </g>
    
    <!-- Lift & Stair case (Top) & Rooms 115-117 -->
    <g data-room-number="LiftStair1">
      <rect x="100" y="10" width="40" height="65" fill="#d1d5db" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="105" y="45" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift </text>
      <text x="105" y="60" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
    </g>
    
    <g data-room-number="115">
      <rect x="100" y="80" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="110" y="110" fontSize="10" textAnchor="middle" dominantBaseline="middle">115</text>
    </g>
    
    <g data-room-number="116">
      <rect x="100" y="130" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="110" y="160" fontSize="10" textAnchor="middle" dominantBaseline="middle">116</text>
    </g>
    
    <g data-room-number="117">
      <rect x="100" y="180" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="110" y="200" fontSize="10" textAnchor="middle" dominantBaseline="middle">117</text>
    </g>
    
    <!-- WS Area (Top Middle) -->
    <g data-room-number="WS1">
      <rect x="95" y="240" width="110" height="65" fill="#d1d5db" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="135" y="280" fontSize="10" textAnchor="middle" dominantBaseline="middle">WS</text>
    </g>
    
    <!-- Middle Left Section (Rooms 107-101) -->
    <g data-room-number="107">
      <rect x="95" y="350" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="105" y="380" fontSize="10" textAnchor="middle" dominantBaseline="middle">107</text>
    </g>
    
    <g data-room-number="106">
      <rect x="95" y="400" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="105" y="430" fontSize="10" textAnchor="middle" dominantBaseline="middle">106</text>
    </g>
    
    <g data-room-number="105">
      <rect x="95" y="450" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="105" y="480" fontSize="10" textAnchor="middle" dominantBaseline="middle">105</text>
    </g>
    
    <g data-room-number="104">
      <rect x="95" y="500" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="105" y="530" fontSize="10" textAnchor="middle" dominantBaseline="middle">104</text>
    </g>
    
    <g data-room-number="103">
      <rect x="95" y="550" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="105" y="580" fontSize="10" textAnchor="middle" dominantBaseline="middle">103</text>
    </g>
    
    <g data-room-number="102">
      <rect x="95" y="600" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="105" y="630" fontSize="10" textAnchor="middle" dominantBaseline="middle">102</text>
    </g>
    
    <g data-room-number="101">
      <rect x="95" y="650" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="105" y="680" fontSize="10" textAnchor="middle" dominantBaseline="middle">101</text>
    </g>
    
    <!-- Middle Right Section (Rooms 118-120 & Lift/Stair/WS) -->
    <g data-room-number="118">
      <rect x="180" y="350" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="190" y="380" fontSize="10" textAnchor="middle" dominantBaseline="middle">118</text>
    </g>
    
    <g data-room-number="119">
      <rect x="180" y="400" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="190" y="430" fontSize="10" textAnchor="middle" dominantBaseline="middle">119</text>
    </g>
    
    <g data-room-number="120">
      <rect x="180" y="450" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="190" y="480" fontSize="10" textAnchor="middle" dominantBaseline="middle">120</text>
    </g>
    
    <!-- Lift Area (Middle) -->
    <g data-room-number="LiftArea">
      <rect x="180" y="500" width="40" height="40" fill="#d1d5db" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="190" y="530" fontSize="8" textAnchor="middle" dominantBaseline="middle">Lift</text>
    </g>
    
    <!-- Stair case (Middle) -->
    <g data-room-number="Stair2">
      <rect x="180" y="540" width="40" height="40" fill="#d1d5db" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="190" y="570" fontSize="8" textAnchor="middle" dominantBaseline="middle">Stairs</text>
    </g>
    
    <!-- WS (Middle) -->
    <g data-room-number="WS2">
      <rect x="180" y="600" width="90" height="90" fill="#d1d5db" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="180" y="650" fontSize="10" textAnchor="middle" dominantBaseline="middle">WashRooms</text>
    </g>
    
    <!-- Bottom Section -->
    <!-- Bottom Row 1 (Rooms 121-125 & Stair case) -->
    <g data-room-number="121">
      <rect x="290" y="680" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="300" y="710" fontSize="10" textAnchor="middle" dominantBaseline="middle">121</text>
    </g>
    
    <g data-room-number="122">
      <rect x="340" y="680" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="350" y="710" fontSize="10" textAnchor="middle" dominantBaseline="middle">122</text>
    </g>
    
    <g data-room-number="123">
      <rect x="390" y="680" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="400" y="710" fontSize="10" textAnchor="middle" dominantBaseline="middle">123</text>
    </g>
    
    <g data-room-number="124">
      <rect x="440" y="680" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="450" y="710" fontSize="10" textAnchor="middle" dominantBaseline="middle">124</text>
    </g>
    
    <g data-room-number="125">
      <rect x="490" y="680" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="500" y="710" fontSize="10" textAnchor="middle" dominantBaseline="middle">125</text>
    </g>
    
    <!-- Stair case (Bottom Right) - Wider -->
    <g data-room-number="Stair3">
      <rect x="540" y="680" width="60" height="40" fill="#d1d5db" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="550" y="700" fontSize="8" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="550" y="710" fontSize="8" textAnchor="middle" dominantBaseline="middle">case</text>
    </g>
    
    <!-- Bottom Row 2 (Rooms 131-126) -->
    <g data-room-number="131">
      <rect x="290" y="760"width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="300" y="790" fontSize="10" textAnchor="middle" dominantBaseline="middle">131</text>
    </g>
    
    <g data-room-number="130">
      <rect x="340" y="760" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="350" y="790" fontSize="10" textAnchor="middle" dominantBaseline="middle">130</text>
    </g>
    
    <g data-room-number="129">
      <rect x="390" y="760" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="400" y="790" fontSize="10" textAnchor="middle" dominantBaseline="middle">129</text>
    </g>
    
    <g data-room-number="128">
      <rect x="440" y="760" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="450" y="790" fontSize="10" textAnchor="middle" dominantBaseline="middle">128</text>
    </g>
    
    <g data-room-number="127">
      <rect x="490" y="760" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="500" y="790" fontSize="10" textAnchor="middle" dominantBaseline="middle">127</text>
    </g>
    
    <!-- Room 126 (Bottom Right) - Wider to match stair case above -->
    <g data-room-number="126">
      <rect x="540" y="760" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1" rx="2" ry="2"/>
      <text x="550" y="790" fontSize="10" textAnchor="middle" dominantBaseline="middle">126</text>
    </g>
    
    <!-- Corridors (Using text labels) -->
    <!-- Corridor 1 (Vertical Left) -->
    <text x="10" y="190" fontSize="10" transform="rotate(-90 30 135)" textAnchor="middle">Corridor</text>
    
    <!-- Corridor 2 (Vertical Middle) -->
    <text x="30" y="390" fontSize="10" transform="rotate(-90 145 370)" textAnchor="middle">Corridor</text>
    
    <!-- Corridor 3 (Horizontal Bottom 1) -->
    <text x="110" y="330" fontSize="10" textAnchor="middle">Corridor</text>
    
    <!-- Corridor 4 (Horizontal Bottom 2) -->
    <text x="400" y="740" fontSize="10" textAnchor="middle">Corridor</text>
    <text x="160" y="770" fontSize="10" textAnchor="middle">Balcony</text>
  </svg>
`;

// Component for rendering Phase 4A floors
const Phase4AFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase4AConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For Ground Floor or 1st Floor, use the SVG rendering
  if (floor === 'Ground Floor' || floor === '1st Floor') {
    const svgRef = React.useRef<HTMLDivElement>(null);
    // Select the appropriate SVG based on the floor
    const svgString = floor === 'Ground Floor' ? phase4AGroundFloorSvgString : phase4A1stFloorSvgString;
    
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
          // Skip utility spaces like stairs, lifts, etc. which are typically gray
          const currentFill = rect.getAttribute('fill');
          if (currentFill === '#d3d3d3' || currentFill === '#d1d5db') return;

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
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    );
  }
  
  // For other floors, use a grid layout
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
  
  // Create rows of rooms for grid layout
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

export default Phase4AFloorPlan;