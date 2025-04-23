import { FloorConfig } from './types';

// Phase 3 South Wing configuration
export const phase3SouthWingConfig: Record<string, FloorConfig> = {
  "5th Floor": { start: 501, end: 535, exceptions: [] },
  "6th Floor": { start: 601, end: 635, exceptions: [] },
  "7th Floor": { start: 701, end: 735, exceptions: [] },
  "8th Floor": { start: 801, end: 835, exceptions: [] },
  "9th Floor": { start: 901, end: 935, exceptions: [] }
};

// SVG string for Phase 3 South Wing 5th Floor
export const phase3SouthWing5thFloorSvgString = `
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
    <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing 5th Floor</text>
    
    <!-- Rooms on the left -->
    <g data-room-number="523">
      <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">523</text>
    </g>
    
    <g data-room-number="522">
      <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">522</text>
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
    
    <g data-room-number="521">
      <rect x="40" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="390" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">521</text>
    </g>
    
    <g data-room-number="520">
      <rect x="40" y="430" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">520</text>
    </g>
    
    <g data-room-number="519">
      <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">519</text>
    </g>
    
    <g data-room-number="518">
      <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">518</text>
    </g>
    
    <!-- Rooms on the top right -->
    <g data-room-number="524">
      <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">524</text>
    </g>
    
    <g data-room-number="525">
      <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">525</text>
    </g>
    
    <g data-room-number="526">
      <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">526</text>
    </g>
    
    <g data-room-number="527">
      <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">527</text>
    </g>
    
    <!-- Rooms in the middle row -->
    <g data-room-number="528">
      <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">528</text>
    </g>
    
    <g data-room-number="529">
      <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">529</text>
    </g>
    
    <g data-room-number="530">
      <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">530</text>
    </g>
    
    <g data-room-number="531">
      <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">531</text>
    </g>
    
    <g data-room-number="532">
      <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">532</text>
    </g>
    
    <g data-room-number="533">
      <rect x="590" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="610" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">533</text>
    </g>
    
    <g data-room-number="534">
      <rect x="660" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="680" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">534</text>
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
    
    <g data-room-number="537">
      <rect x="460" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="480" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">537</text>
    </g>
    
    <g data-room-number="536">
      <rect x="530" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="550" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">536</text>
    </g>
    
    <g data-room-number="535">
      <rect x="600" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="620" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">535</text>
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

// SVG string for Phase 3 South Wing 6th Floor
export const phase3SouthWing6thFloorSvgString = `
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
    <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing 6th Floor</text>
    
    <!-- Rooms on the left -->
    <g data-room-number="623">
      <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">623</text>
    </g>
    
    <g data-room-number="622">
      <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">622</text>
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
    
    <g data-room-number="621">
      <rect x="40" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="390" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">621</text>
    </g>
    
    <g data-room-number="620">
      <rect x="40" y="430" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">620</text>
    </g>
    
    <g data-room-number="619">
      <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">619</text>
    </g>
    
    <g data-room-number="618">
      <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">618</text>
    </g>
    
    <!-- Rooms on the top right -->
    <g data-room-number="624">
      <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">624</text>
    </g>
    
    <g data-room-number="625">
      <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">625</text>
    </g>
    
    <g data-room-number="626">
      <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">626</text>
    </g>
    
    <g data-room-number="627">
      <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">627</text>
    </g>
    
    <!-- Rooms in the middle row -->
    <g data-room-number="628">
      <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">628</text>
    </g>
    
    <g data-room-number="629">
      <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">629</text>
    </g>
    
    <g data-room-number="630">
      <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">630</text>
    </g>
    
    <g data-room-number="631">
      <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">631</text>
    </g>
    
    <g data-room-number="632">
      <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">632</text>
    </g>
    
    <g data-room-number="633">
      <rect x="590" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="610" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">633</text>
    </g>
    
    <g data-room-number="634">
      <rect x="660" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="680" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">634</text>
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
    
    <g data-room-number="637">
      <rect x="460" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="480" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">637</text>
    </g>
    
    <g data-room-number="636">
      <rect x="530" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="550" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">636</text>
    </g>
    
    <g data-room-number="635">
      <rect x="600" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="620" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">635</text>
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

// SVG string for Phase 3 South Wing 7th Floor
export const phase3SouthWing7thFloorSvgString = `
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
    <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing 7th Floor</text>
    
    <!-- Rooms on the left -->
    <g data-room-number="723">
      <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">723</text>
    </g>
    
    <g data-room-number="722">
      <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">722</text>
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
    
    <g data-room-number="721">
      <rect x="40" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="390" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">721</text>
    </g>
    
    <g data-room-number="720">
      <rect x="40" y="430" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">720</text>
    </g>
    
    <g data-room-number="719">
      <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">719</text>
    </g>
    
    <g data-room-number="718">
      <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">718</text>
    </g>
    
    <!-- Rooms on the top right -->
    <g data-room-number="724">
      <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">724</text>
    </g>
    
    <g data-room-number="725">
      <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">725</text>
    </g>
    
    <g data-room-number="726">
      <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">726</text>
    </g>
    
    <g data-room-number="727">
      <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">727</text>
    </g>
    
    <!-- Rooms in the middle row -->
    <g data-room-number="728">
      <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">728</text>
    </g>
    
    <g data-room-number="729">
      <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">729</text>
    </g>
    
    <g data-room-number="730">
      <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">730</text>
    </g>
    
    <g data-room-number="731">
      <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">731</text>
    </g>
    
    <g data-room-number="732">
      <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">732</text>
    </g>
    
    <g data-room-number="733">
      <rect x="590" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="610" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">733</text>
    </g>
    
    <g data-room-number="734">
      <rect x="660" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="680" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">734</text>
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
    
    <g data-room-number="737">
      <rect x="460" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="480" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">737</text>
    </g>
    
    <g data-room-number="736">
      <rect x="530" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="550" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">736</text>
    </g>
    
    <g data-room-number="735">
      <rect x="600" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="620" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">735</text>
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

// SVG string for Phase 3 South Wing 8th Floor
export const phase3SouthWing8thFloorSvgString = `
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
    <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing 8th Floor</text>
    
    <!-- Rooms on the left -->
    <g data-room-number="819">
      <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">819</text>
    </g>
    
    <g data-room-number="818">
      <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">818</text>
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
    
    <g data-room-number="817">
      <rect x="40" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="390" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">817</text>
    </g>
    
    <g data-room-number="816">
      <rect x="40" y="430" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">816</text>
    </g>
    
    <g data-room-number="815">
      <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">815</text>
    </g>
    
    <g data-room-number="814">
      <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">814</text>
    </g>
    
    <!-- Rooms on the top right -->
    <g data-room-number="820">
      <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">820</text>
    </g>
    
    <g data-room-number="821">
      <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">821</text>
    </g>
    
    <g data-room-number="822">
      <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">822</text>
    </g>
    
    <g data-room-number="823">
      <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">823</text>
    </g>
    
    <!-- Rooms in the middle row -->
    <g data-room-number="824">
      <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">824</text>
    </g>
    
    <g data-room-number="825">
      <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">825</text>
    </g>
    
    <g data-room-number="826">
      <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">826</text>
    </g>
    
    <g data-room-number="827">
      <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">827</text>
    </g>
    
    <g data-room-number="828">
      <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">828</text>
    </g>
    
    <g data-room-number="829">
      <rect x="590" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="610" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">829</text>
    </g>
    
    <g data-room-number="830">
      <rect x="660" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="680" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">830</text>
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
    
    <g data-room-number="833">
      <rect x="460" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="480" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">833</text>
    </g>
    
    <g data-room-number="832">
      <rect x="530" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="550" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">832</text>
    </g>
    
    <g data-room-number="831">
      <rect x="600" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="620" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">831</text>
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

// SVG string for Phase 3 South Wing 9th Floor
export const phase3SouthWing9thFloorSvgString = `
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
    <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing 9th Floor</text>
    
    <!-- Rooms on the left -->
    <g data-room-number="919">
      <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">919</text>
    </g>
    
    <g data-room-number="918">
      <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">918</text>
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
    
    <g data-room-number="917">
      <rect x="40" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="390" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">917</text>
    </g>
    
    <g data-room-number="916">
      <rect x="40" y="430" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">916</text>
    </g>
    
    <g data-room-number="915">
      <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="70" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">915</text>
    </g>
    
    <g data-room-number="914">
      <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">914</text>
    </g>
    
    <!-- Rooms on the top right -->
    <g data-room-number="920">
      <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">920</text>
    </g>
    
    <g data-room-number="921">
      <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">921</text>
    </g>
    
    <g data-room-number="922">
      <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">922</text>
    </g>
    
    <g data-room-number="923">
      <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="200" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">923</text>
    </g>
    
    <!-- Rooms in the middle row -->
    <g data-room-number="924">
      <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">924</text>
    </g>
    
    <g data-room-number="925">
      <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">925</text>
    </g>
    
    <g data-room-number="926">
      <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">926</text>
    </g>
    
    <g data-room-number="927">
      <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">927</text>
    </g>
    
    <g data-room-number="928">
      <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">928</text>
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
        
    <!-- Corridors & Balcony -->
    <g transform="translate(130, 250) rotate(-90)">
      <text x="0" y="10" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
    </g>
    
    <text x="400" y="460" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
    
    <g transform="translate(500, 530) rotate(0)">
      <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">REFUGE TERRACE</text>
    </g>
  </svg>
`;
