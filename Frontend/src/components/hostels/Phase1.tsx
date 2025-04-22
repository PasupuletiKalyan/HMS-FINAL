import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 1 config data
export const phase1Config: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 33, exceptions: [11, 13], has12A: true },
  "1st Floor": { start: 34, end: 76, exceptions: [] },
  "2nd Floor": { start: 77, end: 119, exceptions: [113], has112A: true },
  "3rd Floor": { start: 120, end: 162, exceptions: [] },
  "4th Floor": { start: 163, end: 205, exceptions: [] }
};

// SVG String for Phase 1 Ground Floor
export const phase1GroundFloorSvgString = `
  <svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Grid pattern definition removed -->
    </defs>
    <rect width="100%" height="100%" fill="#ffffff"/>
    <!-- Grid pattern rect removed -->
    <rect width="898" height="648" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    <rect x="320" y="310" width="200" height="50" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="340" y="340" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 1-Ground Floor</text>
    
    <!-- Horizontal corridor label between rooms 20 and 7 -->
    <rect x="412" y="100" width="65" height="25" rx="4" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="412" y="116" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    
    <!-- Vertical corridor label between rooms 14 and 9 -->
    <g transform="translate(125, 300) rotate(90)">
      <rect x="-25" y="-20" width="100" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="0" y="-2" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    </g>
    
    <!-- Vertical corridor label between rooms 31 and 3 -->
    <g transform="translate(680, 350) rotate(90)">
      <rect x="-25" y="-40" width="100" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="0" y="-25" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    </g>
    
    <!-- Moved Entry label to between room 1 and WS -->
    <text x="610" y="540" fontSize="5" fontWeight="bold" fill="#8B4513" fontFamily="Inter, sans-serif" textAnchor="middle">>>> Block-Entry</text>
    
    <g data-room-number="17"> <rect x="40" y="40" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="72" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">17</text> </g>
    <g data-room-number="18"> <rect x="200" y="40" width="64" height="40" rx="4" fill="#bbdefb" stroke="#1976d2" strokeWidth="1"/> <text x="232" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">18</text> </g>
    <g> <rect x="260" y="40" width="64" height="40" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/> <text x="292" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text> </g>
    
    <!-- ...existing code... -->
  </svg>
`;

// SVG String for Phase 1 1st Floor
export const phase1FirstFloorSvgString = `
  <svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="798" height="648" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    <rect x="280" y="240" width="240" height="60" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="330" y="277" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 1-1st Floor</text>
    
    <!-- ...existing code... -->
  </svg>
`;

// SVG string for Phase 1 2nd Floor and other floors would follow
export const phase1SecondFloorSvgString = `
  <svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="798" height="648" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    <rect x="280" y="270" width="240" height="60" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="340" y="307" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 1-2nd Floor</text>
    
    <!-- Floor content would continue here -->
  </svg>
`;

export const phase1ThirdFloorSvgString = `
  <svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="798" height="648" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    <rect x="280" y="270" width="240" height="60" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="340" y="307" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 1-3rd Floor</text>
    
    <!-- Floor content would continue here -->
  </svg>
`;

export const phase1FourthFloorSvgString = `
  <svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="798" height="648" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    <rect x="280" y="270" width="240" height="60" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="330" y="307" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 1-4th Floor</text>
    
    <!-- Floor content would continue here -->
  </svg>
`;

// Export a component that can render Phase 1 SVGs
const Phase1FloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  let svgString = '';
  switch(floor) {
    case 'Ground Floor': 
      svgString = phase1GroundFloorSvgString;
      break;
    case '1st Floor': 
      svgString = phase1FirstFloorSvgString;
      break;
    case '2nd Floor': 
      svgString = phase1SecondFloorSvgString;
      break;
    case '3rd Floor': 
      svgString = phase1ThirdFloorSvgString;
      break;
    case '4th Floor': 
      svgString = phase1FourthFloorSvgString;
      break;
    default:
      return <p>Floor plan not available for {floor}</p>;
  }

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
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

export default Phase1FloorPlan;