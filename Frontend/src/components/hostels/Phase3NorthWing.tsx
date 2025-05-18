import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';
import Phase3NorthWingFirstFloor from './Phase3NorthWingFirstFloor';
import Phase3NorthWingGroundFloor from './Phase3NorthWingGroundFloor';

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
  "8th Floor": { start: 801, end: 841, exceptions: [] },
  "9th Floor": { start: 901, end: 935, exceptions: [] }
};

// Function to determine room occupancy status
export const getRoomOccupancyStatus = (
  roomNumber: string,
  selectedBlock: string,
  selectedFloor: string,
  occupiedBeds: Record<string, boolean>
) => {
  const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
  const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
  
  const isOccupiedA = occupiedBeds[bedAKey] || false;
  const isOccupiedB = occupiedBeds[bedBKey] || false;
  
  if (isOccupiedA && isOccupiedB) {
    return { color: '#fecaca', status: 'Fully Occupied' }; // Red for fully occupied
  } else if (isOccupiedA || isOccupiedB) {
    return { color: '#fef08a', status: 'Partially Occupied' }; // Yellow for partially occupied
  } else {
    return { color: '#bbf7d0', status: 'Available' }; // Green for available
  }
};

// SVG String declarations moved to their respective component files

// SVG String for Phase 3 North Wing 2nd Floor
export const phase3NorthWing2ndFloorSvgString = `
  <svg viewBox="-15 -15 700 600" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="700" height="600" x="-15" y="-15" fill="#ffffff"/>
    
    <!-- Top vertical section (left column) -->
    <g data-room-number="215">
      <rect x="200" y="10" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="30" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">215</text>
    </g>
    
    <g data-room-number="214">
      <rect x="200" y="60" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="80" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">214</text>
    </g>
    
    <g data-room-number="213">
      <rect x="200" y="110" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="130" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">213</text>
    </g>
    
    <g data-room-number="212">
      <rect x="200" y="160" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="180" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">212</text>
    </g>
    
    <g data-room-number="211">
      <rect x="200" y="210" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="230" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">211</text>
    </g>

    <!-- Top vertical section (right column) -->
    <g data-room-number="236">
      <rect x="270" y="10" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">236</text>
    </g>
    
    <g data-room-number="237">
      <rect x="270" y="60" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="80" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">237</text>
    </g>
    
    <g data-room-number="238">
      <rect x="270" y="110" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="130" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">238</text>
    </g>
    
    <g data-room-number="239">
      <rect x="270" y="160" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="180" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">239</text>
    </g>
    
    <g data-room-number="240">
      <rect x="270" y="210" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="230" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">240</text>
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
      <text x="200" y="285" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">Stairs</text>
    </g>
    
    <!-- Lift Area -->
    <g data-common-area="LiftArea">
      <rect x="320" y="260" width="60" height="50" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="340" y="280" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Lift</text>
      <text x="340" y="293" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Area</text>
    </g>
    
    <g data-room-number="241">
      <rect x="390" y="260" width="40" height="50" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="400" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">241</text>
    </g>
    
    <g data-room-number="242">
      <rect x="440" y="260" width="40" height="50" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="450" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">242</text>
    </g>
    
    <g data-room-number="243">
      <rect x="490" y="260" width="40" height="50" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="500" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">243</text>
    </g>

    <!-- Middle horizontal section (bottom rooms) -->
    <g data-room-number="210">
      <rect x="10" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="20" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">210</text>
    </g>
    
    <g data-room-number="209">
      <rect x="60" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="70" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">209</text>
    </g>
    
    <g data-room-number="208">
      <rect x="170" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="180" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">208</text>
    </g>
    
    <g data-room-number="207">
      <rect x="220" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="230" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">207</text>
    </g>
    
    <g data-room-number="206">
      <rect x="270" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">206</text>
    </g>
    
    <g data-room-number="205">
      <rect x="390" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="400" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">205</text>
    </g>
    
    <g data-room-number="204">
      <rect x="440" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="450" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">204</text>
    </g>
    
    <g data-room-number="203">
      <rect x="490" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="500" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">203</text>
    </g>

    <!-- Bottom Vertical Section -->
    <!-- Stairs 2 -->
    <g data-common-area="Stairs2">
      <rect x="550" y="400" width="40" height="70" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="550" y="435" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Stairs</text>
    </g>
    
    <g data-room-number="202">
      <rect x="550" y="480" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="560" y="500" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">202</text>
    </g>
    
    <g data-room-number="201">
      <rect x="550" y="530" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="560" y="550" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">201</text>
    </g }

    <!-- Bottom Vertical Section (right column) -->
    <g data-room-number="244">
      <rect x="620" y="400" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="630" y="420" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">244</text>
    </g>
    
    <g data-room-number="245">
      <rect x="620" y="450" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="630" y="470" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">245</text>
    </g>
    
    <g data-room-number="246">
      <rect x="620" y="500" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="630" y="520" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">246</text>
    </g }

    <!-- Corridors and labels -->
    <!-- Vertical corridor -->
    <text x="255" y="160" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 255,150)">Corridor</text>
    
    <!-- Horizontal corridor between WS and rooms -->
    <text x="135" y="340" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    
    <!-- Bottom vertical corridor -->
    <text x="605" y="480" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 605,475)">Corridor</text>
    
    <!-- Balcony label -->
    <text x="520" y="350" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 540,300)">Balcony</text>

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
      <text x="200" y="285" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">Stairs</text>
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

// SVG String for Phase 3 North Wing 8th Floor
export const phase3NorthWing8thFloorSvgString = `
  <svg viewBox="-15 -45 700 600" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="800" height="600" x="-15" y="-45" fill="#ffffff"/>
    
    <!-- Top vertical section (left column) -->
    <g data-room-number="813">
      <rect x="200" y="10" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="30" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">813</text>
    </g>
    
    <g data-room-number="812">
      <rect x="200" y="60" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="80" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">812</text>
    </g>
    
    <g data-room-number="811">
      <rect x="200" y="110" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="130" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">811</text>
    </g>
    
    <g data-room-number="810">
      <rect x="200" y="160" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="180" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">810</text>
    </g>
    
    <g data-room-number="809">
      <rect x="200" y="210" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="230" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">809</text>
    </g>

    <!-- Top vertical section (right column) -->
    <g data-room-number="834">
      <rect x="270" y="10" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">834</text>
    </g>
    
    <g data-room-number="835">
      <rect x="270" y="60" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="80" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">835</text>
    </g>
    
    <g data-room-number="836">
      <rect x="270" y="110" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="130" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">836</text>
    </g>
    
    <g data-room-number="837">
      <rect x="270" y="160" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="180" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">837</text>
    </g>
    
    <g data-room-number="838">
      <rect x="270" y="210" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="280" y="230" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">838</text>
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
      <text x="200" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Stairs</text>
    </g>
    
    <!-- Lift Area -->
    <g data-common-area="LiftArea">
      <rect x="320" y="260" width="60" height="50" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="340" y="280" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Lift</text>
      <text x="340" y="293" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Area</text>
    </g>
    
    <g data-room-number="839">
      <rect x="390" y="260" width="40" height="50" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="400" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">839</text>
    </g>
    
    <g data-room-number="840">
      <rect x="440" y="260" width="40" height="50" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="450" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">840</text>
    </g>
    
    <g data-room-number="841">
      <rect x="490" y="260" width="40" height="50" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="500" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">841</text>
    </g>

    <!-- Middle horizontal section (bottom rooms) -->
    <g data-room-number="808">
      <rect x="10" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="20" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">808</text>
    </g>
    
    <g data-room-number="807">
      <rect x="60" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="70" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">807</text>
    </g>
    
    <g data-room-number="806">
      <rect x="190" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="200" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">806</text>
    </g>
    
    <g data-room-number="805">
      <rect x="240" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="250" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">805</text>
    </g>
    
    <g data-room-number="804">
      <rect x="290" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="300" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">804</text>
    </g>
    
    <g data-room-number="803">
      <rect x="360" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="370" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">803</text>
    </g>
    
    <g data-room-number="802">
      <rect x="410" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="420" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">802</text>
    </g>
    
    <g data-room-number="801">
      <rect x="460" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="470" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">801</text>
    </g>
    
    <g data-common-area="Stairs2">
      <rect x="530" y="350" width="50" height="40" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="530" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Stairs</text>
    </g>

    <!-- Refuge Terrace -->
    <g data-common-area="RefugeTerrace">
      <text x="605" y="450" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 605,450)">Refuge Terrace</text>
    </g>

    <!-- Corridors and labels -->
    <!-- Vertical corridor -->
    <text x="255" y="155" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 255,150)">Corridor</text>
    
    <!-- Horizontal corridor between WS and rooms -->
    <text x="135" y="340" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    
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

// SVG String for Phase 3 North Wing 9th Floor
export const phase3NorthWing9thFloorSvgString = `
  <svg viewBox="-15 -15 600 600" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="700" height="600" x="-15" y="-15" fill="#ffffff"/>
    
    <!-- Top vertical section (left column) -->
    <g data-room-number="913">
      <rect x="200" y="10" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="30" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">913</text>
    </g>
    
    <g data-room-number="912">
      <rect x="200" y="60" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="80" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">912</text>
    </g>
    
    <g data-room-number="911">
      <rect x="200" y="110" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="130" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">911</text>
    </g>
    
    <g data-room-number="910">
      <rect x="200" y="160" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="180" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">910</text>
    </g>
    
    <g data-room-number="909">
      <rect x="200" y="210" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="210" y="230" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">909</text>
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
      <text x="200" y="285" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Stairs</text>
    </g>
    
    <!-- Lift Area -->
    <g data-common-area="LiftArea">
      <rect x="320" y="260" width="60" height="50" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="340" y="280" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Lift</text>
      <text x="340" y="293" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Area</text>
    </g>
    
    <!-- Middle horizontal section (bottom rooms) -->
    <g data-room-number="908">
      <rect x="10" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="20" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">908</text>
    </g>
    
    <g data-room-number="907">
      <rect x="60" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="70" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">907</text>
    </g>
    
    <g data-room-number="906">
      <rect x="190" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="200" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">906</text>
    </g>
    
    <g data-room-number="905">
      <rect x="240" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="250" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">905</text>
    </g>
    
    <g data-room-number="904">
      <rect x="290" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="300" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">904</text>
    </g>
    
    <g data-room-number="903">
      <rect x="360" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="370" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">903</text>
    </g>
    
    <g data-room-number="902">
      <rect x="410" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="420" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">902</text>
    </g>
    
    <g data-room-number="901">
      <rect x="460" y="350" width="40" height="40" rx="2" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="470" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">901</text>
    </g>
    
    <g data-common-area="Stairs2">
      <rect x="520" y="350" width="50" height="40" rx="2" fill="#d3d3d3" stroke="#000000" strokeWidth="1.5" />
      <text x="520" y="370" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Stairs</text>
    </g>

    <!-- Refuge Terrace -->
    <g data-common-area="RefugeTerrace">
      <text x="605" y="450" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 605,450)">Refuge Terrace</text>
    </g>

    <!-- Corridors and labels -->
    <!-- Vertical corridor -->
    <text x="255" y="155" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" transform="rotate(-90 255,150)">Corridor</text>
    
    <!-- Horizontal corridor between WS and rooms -->
    <text x="135" y="340" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    
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
export const Phase3NorthWingFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase3NorthWingConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For Ground Floor, use the new component
  if (floor === 'Ground Floor') {
    return (
      <div>
        <h3 className="text-center mb-4">{`${selectedBlock} - ${floor}`}</h3>
        <Phase3NorthWingGroundFloor
          selectedBlock={selectedBlock}
          selectedFloor={selectedFloor}
          occupiedBeds={occupiedBeds}
          onRoomClick={onRoomClick}
          floor={floor}
        />
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Click on a room to book a bed</p>
        </div>
      </div>
    );
  }
  // For 1st floor, use the new Phase3NorthWingFirstFloor component
  if (floor === '1st Floor') {
    return (
      <div>
        <h3 className="text-center mb-4">{`${selectedBlock} - ${floor}`}</h3>
        <Phase3NorthWingFirstFloor
          selectedBlock={selectedBlock}
          selectedFloor={selectedFloor}
          occupiedBeds={occupiedBeds}
          onRoomClick={onRoomClick}
          floor={floor}
        />
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Click on a room to book a bed</p>
        </div>
      </div>
    );
  }
  
  // For 2nd floor, use the 2nd floor SVG layout
  if (floor === '2nd Floor') {
    const svgRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
      // Apply room occupancy status colors
      const roomElements = container.querySelectorAll('g[data-room-number]');
      roomElements.forEach(roomElement => {
        const roomNumber = roomElement.getAttribute('data-room-number') || '';
        const { color } = getRoomOccupancyStatus(roomNumber, selectedBlock, selectedFloor, occupiedBeds);
        
        const rect = roomElement.querySelector('rect');
        if (rect) {
          rect.setAttribute('fill', color);
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
      <div>
        <h3 className="text-center mb-4">{`${selectedBlock} - ${floor}`}</h3>
        <div
          ref={svgRef}
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: phase3NorthWing2ndFloorSvgString }}
        />
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Click on a room to book a bed</p>
        </div>
      </div>
    );
  }
  
  // For 3rd to 7th floor, use the new SVG layout
  if (['3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor'].includes(floor)) {
    const svgRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
      // Apply room occupancy status colors
      const roomElements = container.querySelectorAll('g[data-room-number]');
      roomElements.forEach(roomElement => {
        const roomNumber = roomElement.getAttribute('data-room-number') || '';
        const { color } = getRoomOccupancyStatus(roomNumber, selectedBlock, selectedFloor, occupiedBeds);
        
        const rect = roomElement.querySelector('rect');
        if (rect) {
          rect.setAttribute('fill', color);
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
      <div>
        <h3 className="text-center mb-4">{`${selectedBlock} - ${floor}`}</h3>
        <div
          ref={svgRef}
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: phase3NorthWing2ndFloorSvgString }}
        />
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Click on a room to book a bed</p>
        </div>
      </div>
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
        const { color } = getRoomOccupancyStatus(floorRoomNumber, selectedBlock, selectedFloor, occupiedBeds);
        const rect = roomElement.querySelector('rect');
        if (rect) {
          rect.setAttribute('fill', color);
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

  // For 8th floor, use the 8th floor SVG layout
  if (floor === '8th Floor') {
    const svgRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
      // Update room numbers based on floor
      const roomElements = container.querySelectorAll('g[data-room-number]');
      roomElements.forEach(roomElement => {
        const originalRoomNumber = roomElement.getAttribute('data-room-number') || '';
        // Update data attribute to new room number for click handling
        roomElement.setAttribute('data-room-number', originalRoomNumber);
        
        // Apply occupancy colors
        const { color } = getRoomOccupancyStatus(originalRoomNumber, selectedBlock, selectedFloor, occupiedBeds);
        const rect = roomElement.querySelector('rect');
        if (rect) {
          rect.setAttribute('fill', color);
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
      <div>
        <h3 className="text-center mb-4">{`${selectedBlock} - ${floor}`}</h3>
        <div
          ref={svgRef}
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: phase3NorthWing8thFloorSvgString }}
        />
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Click on a room to book a bed</p>
        </div>
      </div>
    );
  }

  // For 9th floor, use the 9th floor SVG layout
  if (floor === '9th Floor') {
    const svgRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
      // Update room numbers based on floor
      const roomElements = container.querySelectorAll('g[data-room-number]');
      roomElements.forEach(roomElement => {
        const originalRoomNumber = roomElement.getAttribute('data-room-number') || '';
        // Update data attribute to new room number for click handling
        roomElement.setAttribute('data-room-number', originalRoomNumber);
        
        // Apply occupancy colors
        const { color } = getRoomOccupancyStatus(originalRoomNumber, selectedBlock, selectedFloor, occupiedBeds);
        const rect = roomElement.querySelector('rect');
        if (rect) {
          rect.setAttribute('fill', color);
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
      <div>
        <h3 className="text-center mb-4">{`${selectedBlock} - ${floor}`}</h3>
        <div
          ref={svgRef}
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: phase3NorthWing9thFloorSvgString }}
        />
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Click on a room to book a bed</p>
        </div>
      </div>
    );
  }
  
  // For other floors (3rd-7th), use a simple list view
  const getOccupancyClassName = (roomNumber: number | string): string => {
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
    const occupancyStatus = getOccupancyClassName(roomNumber);
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