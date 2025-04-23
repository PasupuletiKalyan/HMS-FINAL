import { FloorConfig } from './types';

// Phase 3 South Wing configuration
export const phase3SouthWingConfig: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 35, exceptions: [] },
  "1st Floor": { start: 101, end: 135, exceptions: [] },
  "2nd Floor": { start: 201, end: 235, exceptions: [] },
  "3rd Floor": { start: 301, end: 335, exceptions: [] },
  "4th Floor": { start: 401, end: 435, exceptions: [] },
};
  // SVG string for Phase 3 South Wing Ground Floor
export const phase3SouthWingGroundFloorSvgString = `
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
  <rect x="350" y="200" width="270" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
  <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing Ground Floor</text>
  
  <!-- Rooms on the left -->
  <g data-room-number="G09">
    <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="60" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G09</text>
  </g>
  
  <g data-room-number="G08">
    <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="60" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G08</text>
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
  
  <g data-room-number="G07">
    <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="60" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G07</text>
  </g>
  
  <g data-room-number="G06">
    <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G06</text>
  </g>
  
  <!-- Rooms on the top right -->
  <g data-room-number="G10">
    <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="190" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G10</text>
  </g>
  
  <g data-room-number="G11">
    <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="190" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G11</text>
  </g>
  
  <g data-room-number="G12">
    <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="190" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G12</text>
  </g>
  
  <g data-room-number="G13">
    <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="190" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G13</text>
  </g>
  
  <!-- Rooms in the middle row -->
  <g data-room-number="G14">
    <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G14</text>
  </g>
  
  <g data-room-number="G15">
    <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G15</text>
  </g>
  
  <g data-room-number="G16">
    <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G16</text>
  </g>
  
  <g data-room-number="G17">
    <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G17</text>
  </g>
  
  <g data-room-number="G18">
    <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G18</text>
  </g>
  
  <g data-room-number="G19">
    <rect x="590" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="610" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G19</text>
  </g>
  
  <g data-room-number="G20">
    <rect x="660" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="680" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G20</text>
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
  
  <g data-room-number="G25">
    <rect x="460" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="480" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G25</text>
  </g>
  
  <g data-room-number="G24">
    <rect x="530" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="550" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G24</text>
  </g>
  
  <g data-room-number="G23">
    <rect x="600" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="620" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G23</text>
  </g>
  <g data-room-number="G21">
    <rect x="720" y="440" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="740" y="460" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G21</text>
  </g>
  <g data-room-number="G22">
    <rect x="720" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="740" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">G22</text>
  </g>
  
  
  <!-- Corridors & Balcony -->
  <g transform="translate(130, 200) rotate(-90)">
    <text x="0" y="10" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
  </g>
  
  <text x="400" y="460" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
</svg>
`;

// SVG string for Phase 3 South Wing 1st Floor
export const phase3SouthWing1stFloorSvgString = `
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
  <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing 1st Floor</text>
  
  <!-- Rooms on the left -->
  <g data-room-number="114">
    <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">114</text>
  </g>
  
  <g data-room-number="112A">
    <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="60" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">112A</text>
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
  
  <g data-room-number="112">
    <rect x="40" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="390" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">112</text>
  </g>
  
  <g data-room-number="111">
    <rect x="40" y="430" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">111</text>
  </g>
  
  <g data-room-number="110">
    <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">110</text>
  </g>
  
  <g data-room-number="109">
    <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">109</text>
  </g>
  
  <!-- Rooms on the top right -->
  <g data-room-number="115">
    <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">115</text>
  </g>
  
  <g data-room-number="116">
    <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">116</text>
  </g>
  
  <g data-room-number="117">
    <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">117</text>
  </g>
  
  <g data-room-number="118">
    <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">118</text>
  </g>
  
  <!-- Rooms in the middle row -->
  <g data-room-number="119">
    <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">119</text>
  </g>
  
  <g data-room-number="120">
    <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">120</text>
  </g>
  
  <g data-room-number="121">
    <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">121</text>
  </g>
  
  <g data-room-number="122">
    <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">122</text>
  </g>
  
  <g data-room-number="123">
    <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">123</text>
  </g>
  
  <g data-room-number="124">
    <rect x="590" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="610" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">124</text>
  </g>
  
  <g data-room-number="125">
    <rect x="660" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="680" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">125</text>
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
  
  <g data-room-number="130">
    <rect x="460" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="480" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">130</text>
  </g>
  
  <g data-room-number="129">
    <rect x="530" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="550" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">129</text>
  </g>
  
  <g data-room-number="128">
    <rect x="600" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="620" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">128</text>
  </g>
  <g data-room-number="127">
    <rect x="710" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="720" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">127</text>
  </g>
  <g data-room-number="126">
    <rect x="710" y="440" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="720" y="460" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">126</text>
  </g>
  
  <!-- Corridors & Balcony -->
  <g transform="translate(130, 200) rotate(-90)">
    <text x="0" y="10" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
  </g>
  
  <text x="400" y="460" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
  
</svg>
`;

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

// SVG string for Phase 3 South Wing 3rd Floor
export const phase3SouthWing3rdFloorSvgString = `
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
  <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing 3rd Floor</text>
  
  <!-- Rooms on the left -->
  <g data-room-number="323">
    <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">323</text>
  </g>
  
  <g data-room-number="322">
    <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">322</text>
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
  
  <g data-room-number="321">
    <rect x="40" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="390" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">321</text>
  </g>
  
  <g data-room-number="320">
    <rect x="40" y="430" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">320</text>
  </g>
  
  <g data-room-number="319">
    <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">319</text>
  </g>
  
  <g data-room-number="318">
    <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">318</text>
  </g>
  
  <!-- Rooms on the top right -->
  <g data-room-number="324">
    <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">324</text>
  </g>
  
  <g data-room-number="325">
    <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">325</text>
  </g>
  
  <g data-room-number="326">
    <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">326</text>
  </g>
  
  <g data-room-number="327">
    <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">327</text>
  </g>
  
  <!-- Rooms in the middle row -->
  <g data-room-number="328">
    <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">328</text>
  </g>
  
  <g data-room-number="329">
    <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">329</text>
  </g>
  
  <g data-room-number="330">
    <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">330</text>
  </g>
  
  <g data-room-number="331">
    <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">331</text>
  </g>
  
  <g data-room-number="332">
    <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">332</text>
  </g>
  
  <g data-room-number="333">
    <rect x="590" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="610" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">333</text>
  </g>
  
  <g data-room-number="334">
    <rect x="660" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="680" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">334</text>
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
  
  <g data-room-number="337">
    <rect x="460" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="480" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">337</text>
  </g>
  
  <g data-room-number="336">
    <rect x="530" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="550" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">336</text>
  </g>
  
  <g data-room-number="335">
    <rect x="600" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="620" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">335</text>
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

// SVG string for Phase 3 South Wing 4th Floor
export const phase3SouthWing4thFloorSvgString = `
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
  <text x="360" y="230" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-3 South Wing 4th Floor</text>
  
  <!-- Rooms on the left -->
  <g data-room-number="423">
    <rect x="40" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">423</text>
  </g>
  
  <g data-room-number="422">
    <rect x="40" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">422</text>
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
  
  <g data-room-number="421">
    <rect x="40" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="390" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">421</text>
  </g>
  
  <g data-room-number="420">
    <rect x="40" y="430" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="450" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">420</text>
  </g>
  
  <g data-room-number="419">
    <rect x="40" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="70" y="510" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">419</text>
  </g>
  
  <g data-room-number="418">
    <rect x="40" y="550" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="60" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">418</text>
  </g>
  
  <!-- Rooms on the top right -->
  <g data-room-number="424">
    <rect x="170" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="135" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">424</text>
  </g>
  
  <g data-room-number="425">
    <rect x="170" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="185" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">425</text>
  </g>
  
  <g data-room-number="426">
    <rect x="170" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">426</text>
  </g>
  
  <g data-room-number="427">
    <rect x="170" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="200" y="285" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">427</text>
  </g>
  
  <!-- Rooms in the middle row -->
  <g data-room-number="428">
    <rect x="240" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="260" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">428</text>
  </g>
  
  <g data-room-number="429">
    <rect x="310" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="330" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">429</text>
  </g>
  
  <g data-room-number="430">
    <rect x="380" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="400" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">430</text>
  </g>
  
  <g data-room-number="431">
    <rect x="450" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="470" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">431</text>
  </g>
  
  <g data-room-number="432">
    <rect x="520" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="540" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">432</text>
  </g>
  
  <g data-room-number="433">
    <rect x="590" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="610" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">433</text>
  </g>
  
  <g data-room-number="434">
    <rect x="660" y="370" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="680" y="395" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">434</text>
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
  
  <g data-room-number="437">
    <rect x="460" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="480" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">437</text>
  </g>
  
  <g data-room-number="436">
    <rect x="530" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="550" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">436</text>
  </g>
  
  <g data-room-number="435">
    <rect x="600" y="490" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
    <text x="620" y="515" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">435</text>
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
