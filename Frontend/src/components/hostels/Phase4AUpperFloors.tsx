import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 4A Upper Floors Configuration (9th and 10th Floors)
export const phase4AUpperConfig: Record<string, FloorConfig> = {
  "9th Floor": { start: 901, end: 930, exceptions: [] },
  "10th Floor": { start: 1001, end: 1030, exceptions: [] }
};

// SVG string for Phase 4A 9th Floor
export const phase4A9thFloorSvgString = `
  <svg viewBox="0 -10 550 900" xmlns="http://www.w3.org/2000/svg">
    
    <!-- Title -->
    <rect x="250" y="5" width="200" height="20" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="1"/>
    <text x="260" y="20" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 4A - 9th Floor</text>
    
    <!-- Top-Left Section (Left Column) -->
    <g data-room-number="915">
      <rect x="10" y="50" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="75" fontSize="10" textAnchor="middle" dominantBaseline="middle">915</text>
    </g>
    
    <g data-room-number="914">
      <rect x="10" y="100" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">914</text>
    </g>
    
    <g data-room-number="913">
      <rect x="10" y="150" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="175" fontSize="10" textAnchor="middle" dominantBaseline="middle">913</text>
    </g>
    
    <g data-room-number="912">
      <rect x="10" y="200" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="225" fontSize="10" textAnchor="middle" dominantBaseline="middle">912</text>
    </g>
    
    <g data-room-number="911">
      <rect x="10" y="250" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="275" fontSize="10" textAnchor="middle" dominantBaseline="middle">911</text>
    </g>
    
    <g data-room-number="910">
      <rect x="10" y="300" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="325" fontSize="10" textAnchor="middle" dominantBaseline="middle">910</text>
    </g>
    
    <g data-room-number="909">
      <rect x="10" y="350" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="375" fontSize="10" textAnchor="middle" dominantBaseline="middle">909</text>
    </g>
    
    <!-- Top-Left Section (Right Column & Common) -->
    <g data-room-number="LiftStair1">
      <rect x="130" y="10" width="50" height="70" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="140" y="35" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift &</text>
      <text x="140" y="50" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
    </g>
    
    <g data-room-number="916">
      <rect x="130" y="100" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">916</text>
    </g>
    
    <g data-room-number="917">
      <rect x="130" y="150" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="175" fontSize="10" textAnchor="middle" dominantBaseline="middle">917</text>
    </g>
    
    <g data-room-number="918">
      <rect x="130" y="200" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="225" fontSize="10" textAnchor="middle" dominantBaseline="middle">918</text>
    </g>
    
    <!-- Central WS Area -->
    <g data-room-number="WS1">
      <rect x="130" y="250" width="90" height="100" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="150" y="300" fontSize="30" textAnchor="middle" dominantBaseline="middle">🚽</text>
    </g>
    
    <!-- Middle Vertical Section (Left Column) -->
    <g data-room-number="908">
      <rect x="140" y="520" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="540" fontSize="10" textAnchor="middle" dominantBaseline="middle">908</text>
    </g>
    
    <g data-room-number="907">
      <rect x="140" y="570" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="590" fontSize="10" textAnchor="middle" dominantBaseline="middle">907</text>
    </g>
    
    <g data-room-number="906">
      <rect x="140" y="620" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="640" fontSize="10" textAnchor="middle" dominantBaseline="middle">906</text>
    </g>
    
    <g data-room-number="905">
      <rect x="140" y="670" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="690" fontSize="10" textAnchor="middle" dominantBaseline="middle">905</text>
    </g>
    
    <g data-room-number="904">
      <rect x="140" y="720" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="740" fontSize="10" textAnchor="middle" dominantBaseline="middle">904</text>
    </g>
    
    <!-- Middle Vertical Section (Right Column & Common) -->
    <g data-room-number="919">
      <rect x="230" y="420" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="440" fontSize="10" textAnchor="middle" dominantBaseline="middle">919</text>
    </g>
    
    <g data-room-number="920">
      <rect x="230" y="470" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="490" fontSize="10" textAnchor="middle" dominantBaseline="middle">920</text>
    </g>
    
    <g data-room-number="921">
      <rect x="230" y="520" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="540" fontSize="10" textAnchor="middle" dominantBaseline="middle">921</text>
    </g>
    
    <g data-room-number="LiftArea">
      <rect x="230" y="570" width="40" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="240" y="590" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift</text>
    </g>
    
    <g data-room-number="Staircase2">
      <rect x="230" y="620" width="40" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="230" y="640" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stairs</text>
    </g>
    
    <g data-room-number="WS2">
      <rect x="230" y="670" width="80" height="100" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="240" y="690" fontSize="14" textAnchor="middle" dominantBaseline="middle">🚽</text>
    </g>
    
    <!-- Bottom Horizontal Section (Top Row) -->
    <g data-room-number="922">
      <rect x="350" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="360" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">922</text>
    </g>
    
    <g data-room-number="923">
      <rect x="400" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="410" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">923</text>
    </g>
    
    <g data-room-number="924">
      <rect x="450" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="460" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">924</text>
    </g>
    
    <g data-room-number="925">
      <rect x="500" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="510" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">925</text>
    </g>
    
    <g data-room-number="926">
      <rect x="550" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="560" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">926</text>
    </g>
    
    <g data-room-number="Staircase3">
      <rect x="600" y="740" width="50" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="610" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="610" y="770" fontSize="10" textAnchor="middle" dominantBaseline="middle">case</text>
    </g>
    
    <!-- Bottom Horizontal Section (Bottom Row) -->
    <g data-room-number="903">
      <rect x="350" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="360" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">903</text>
    </g>
    
    <g data-room-number="902">
      <rect x="400" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="410" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">902</text>
    </g>
    
    <g data-room-number="901">
      <rect x="450" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="460" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">901</text>
    </g>
    
    <!-- Labels for corridors -->
    <text x="20" y="230" fontSize="10" transform="rotate(-90 65 200)" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    <text x="90" y="500" fontSize="10" transform="rotate(-90 205 500)" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    <text x="420" y="810" fontSize="10" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    <text x="200" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">Balcony</text>
    <text x="90" y="480" fontSize="10" textAnchor="middle" dominantBaseline="middle">Balcony</text>
    <text x="120" y="380" fontSize="10" textAnchor="middle" dominantBaseline="middle">Corridor</text>

  </svg>
`;

// SVG string for Phase 4A 10th Floor
export const phase4A10thFloorSvgString = `
  <svg viewBox="0 -10 550 900" xmlns="http://www.w3.org/2000/svg">
    
    <!-- Title -->
    <rect x="250" y="5" width="200" height="20" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="1"/>
    <text x="260" y="20" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 4A - 10th Floor</text>
    
    <!-- Top-Left Section (Left Column) -->    
    <g data-room-number="1011">
      <rect x="10" y="250" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="10" y="275" fontSize="10" textAnchor="middle" dominantBaseline="middle">1011</text>
    </g>
    
    <g data-room-number="1010">
      <rect x="10" y="300" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="10" y="325" fontSize="10" textAnchor="middle" dominantBaseline="middle">1010</text>
    </g>
    
    <g data-room-number="1009">
      <rect x="10" y="350" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="10" y="375" fontSize="10" textAnchor="middle" dominantBaseline="middle">1009</text>
    </g>
    
    <!-- Top-Left Section (Right Column & Common) -->
    <g data-room-number="LiftStair1">
      <rect x="130" y="10" width="50" height="70" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="140" y="35" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift &</text>
      <text x="140" y="50" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
    </g>
    
    <g data-room-number="1012">
      <rect x="130" y="100" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="130" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">1012</text>
    </g>
    
    <g data-room-number="1013">
      <rect x="130" y="150" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="130" y="175" fontSize="10" textAnchor="middle" dominantBaseline="middle">1013</text>
    </g>
    
    <g data-room-number="1014">
      <rect x="130" y="200" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="130" y="225" fontSize="10" textAnchor="middle" dominantBaseline="middle">1014</text>
    </g>
    
    <!-- Central WS Area -->
    <g data-room-number="WS1">
      <rect x="130" y="250" width="90" height="100" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="150" y="300" fontSize="30" textAnchor="middle" dominantBaseline="middle">🚽</text>
    </g>
    
    <!-- Middle Vertical Section (Left Column) -->
    <g data-room-number="1008">
      <rect x="140" y="520" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="540" fontSize="10" textAnchor="middle" dominantBaseline="middle">1008</text>
    </g>
    
    <g data-room-number="1007">
      <rect x="140" y="570" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="590" fontSize="10" textAnchor="middle" dominantBaseline="middle">1007</text>
    </g>
    
    <g data-room-number="1006">
      <rect x="140" y="620" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="640" fontSize="10" textAnchor="middle" dominantBaseline="middle">1006</text>
    </g>
    
    <g data-room-number="1005">
      <rect x="140" y="670" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="690" fontSize="10" textAnchor="middle" dominantBaseline="middle">1005</text>
    </g>
    
    <g data-room-number="1004">
      <rect x="140" y="720" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="740" fontSize="10" textAnchor="middle" dominantBaseline="middle">1004</text>
    </g>
    
    <!-- Middle Vertical Section (Right Column & Common) -->
    <g data-room-number="1015">
      <rect x="230" y="420" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="230" y="440" fontSize="10" textAnchor="middle" dominantBaseline="middle">1015</text>
    </g>
    
    <g data-room-number="1016">
      <rect x="230" y="470" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="230" y="490" fontSize="10" textAnchor="middle" dominantBaseline="middle">1016</text>
    </g>
    
    <g data-room-number="1017">
      <rect x="230" y="520" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="230" y="540" fontSize="10" textAnchor="middle" dominantBaseline="middle">1017</text>
    </g>
    
    <g data-room-number="LiftArea">
      <rect x="230" y="570" width="40" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="230" y="590" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift</text>
    </g>
    
    <g data-room-number="Staircase2">
      <rect x="230" y="620" width="40" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="230" y="640" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stairs</text>
    </g>
    
    <g data-room-number="WS2">
      <rect x="230" y="670" width="80" height="100" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="240" y="690" fontSize="14" textAnchor="middle" dominantBaseline="middle">🚽</text>
    </g>
    
    <!-- Bottom Horizontal Section (Top Row) -->
    <g data-room-number="1018">
      <rect x="350" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="350" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">1018</text>
    </g>
    
    <g data-room-number="1019">
      <rect x="400" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="400" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">1019</text>
    </g>
    
    <g data-room-number="1020">
      <rect x="450" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="450" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">1020</text>
    </g>
    
    <g data-room-number="1021">
      <rect x="500" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="500" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">1021</text>
    </g>
    
    <g data-room-number="1022">
      <rect x="550" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="550" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">1022</text>
    </g>
    
    <g data-room-number="Staircase3">
      <rect x="600" y="740" width="50" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="610" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="610" y="770" fontSize="10" textAnchor="middle" dominantBaseline="middle">case</text>
    </g>
    
    <!-- Bottom Horizontal Section (Bottom Row) -->
    <g data-room-number="1003">
      <rect x="350" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="350" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">1003</text>
    </g>
    
    <g data-room-number="1002">
      <rect x="400" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="400" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">1002</text>
    </g>
    
    <g data-room-number="1001">
      <rect x="450" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="450" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">1001</text>
    </g>
    <!-- Labels for corridors -->
    <text x="20" y="230" fontSize="10" transform="rotate(-90 65 200)" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    <text x="90" y="500" fontSize="10" transform="rotate(-90 205 500)" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    <text x="420" y="810" fontSize="10" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    <text x="200" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">Balcony</text>
    <text x="90" y="480" fontSize="10" textAnchor="middle" dominantBaseline="middle">Balcony</text>
    <text x="120" y="380" fontSize="10" textAnchor="middle" dominantBaseline="middle">Corridor</text>
  </svg>
`;

// Component for rendering Phase 4A Upper Floors (9th and 10th)
const Phase4AUpperFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase4AUpperConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For floors with SVG layout, use the visual rendering
  // Use specific SVG layouts for 9th and 10th floors
  const svgRef = React.useRef<HTMLDivElement>(null);
  
  // Select the appropriate SVG based on the floor
  let svgString = '';
  
  if (floor === '9th Floor') {
    svgString = phase4A9thFloorSvgString;
  } else if (floor === '10th Floor') {
    svgString = phase4A10thFloorSvgString;
  }
  
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
};

export default Phase4AUpperFloorPlan;