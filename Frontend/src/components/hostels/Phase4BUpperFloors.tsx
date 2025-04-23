import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 4B configuration for upper floors (6th to 10th)
export const phase4BUpperConfig: Record<string, FloorConfig> = {
  "6th Floor": { start: 601, end: 630, exceptions: [] },
  "7th Floor": { start: 701, end: 730, exceptions: [] },
  "8th Floor": { start: 801, end: 830, exceptions: [] },
  "9th Floor": { start: 901, end: 930, exceptions: [] },
  "10th Floor": { start: 1001, end: 1030, exceptions: [] }
};

export const phase4B6thFloorSvgString = `
  <!-- SVG content for 6th floor -->
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
      <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
      <text x="260" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 6th Floor</text>
      
      <!-- Top Right Vertical Section -->
      <g>
        <rect x="600" y="60" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="608">
        <rect x="720" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">608</text>
      </g>
      
      <g data-room-number="609">
        <rect x="720" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="135" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">609</text>
      </g>
      
      <g data-room-number="607">
        <rect x="600" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">607</text>
      </g>
      
      <g data-room-number="610">
        <rect x="720" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">610</text>
      </g>
      
      <g data-room-number="606">
        <rect x="600" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">606</text>
      </g>
      
      <g data-room-number="611">
        <rect x="720" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">611</text>
      </g>
      
      <!-- Vertical Corridor Text -->
      <g transform="translate(680, 280) rotate(90)">
        <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      </g>
      
      <g data-room-number="612">
        <rect x="720" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">612</text>
      </g>
      
      <g data-room-number="613">
        <rect x="720" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">613</text>
      </g>
      
      <g>
        <rect x="600" y="360" width="60" height="120" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
        <text x="620" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <g data-room-number="614">
        <rect x="720" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">614</text>
      </g>
      
      <g data-room-number="615">
        <rect x="720" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">615</text>
      </g>
      
      <!-- Middle Connection -->
      <g data-room-number="616">
        <rect x="720" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">616</text>
      </g>
      
      <g>
        <rect x="600" y="520" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g>
        <rect x="500" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="540" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Lift</text>
      </g>
      
      <!-- Bottom Horizontal Section -->
      <g>
        <rect x="40" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="60" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="601">
        <rect x="130" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">601</text>
      </g>
      
      <g data-room-number="602">
        <rect x="200" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">602</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="603">
        <rect x="270" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">603</text>
      </g>
      
      <g data-room-number="604">
        <rect x="340" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">604</text>
      </g>
      
      <g data-room-number="605">
        <rect x="410" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">605</text>
      </g>
      
      <!-- Corridor Label -->
      <text x="400" y="590" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      
      <!-- Study Lounge -->
      <g>
        <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="550" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
      </g>
      
      <g data-room-number="617">
        <rect x="410" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">617</text>
      </g>
      
      <g data-room-number="618">
        <rect x="340" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">618</text>
      </g>
      
      <g data-room-number="619">
        <rect x="270" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">619</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="620">
        <rect x="200" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="210" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">620</text>
      </g>
      
      <g data-room-number="621">
        <rect x="130" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">621</text>
      </g>
      
      <g data-room-number="622">
        <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">622</text>
      </g>
    </svg>
`;

export const phase4B7thFloorSvgString = `
  <!-- SVG content for 7th floor -->
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
      <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
      <text x="260" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 7th Floor</text>
      
      <!-- Top Right Vertical Section -->
      <g>
        <rect x="600" y="60" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g>
        <rect x="720" y="60" width="60" height="80" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="720" y="105" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Terrace</text>
      </g>
      
      <g data-room-number="707">
        <rect x="600" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">707</text>
      </g>
      
      <g data-room-number="706">
        <rect x="600" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">706</text>
      </g>
      
      <g data-room-number="708">
        <rect x="720" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">708</text>
      </g>
      
      <!-- Vertical Corridor Text -->
      <g transform="translate(680, 280) rotate(90)">
        <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      </g>
      
      <g data-room-number="709">
        <rect x="720" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">709</text>
      </g>
      
      <g data-room-number="710">
        <rect x="720" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">710</text>
      </g>
      
      <g>
        <rect x="600" y="360" width="60" height="120" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
        <text x="620" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <g data-room-number="711">
        <rect x="720" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">711</text>
      </g>
      
      <g data-room-number="712">
        <rect x="720" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">712</text>
      </g>
      
      <!-- Middle Connection -->
      <g data-room-number="713">
        <rect x="720" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">713</text>
      </g>
      
      <g>
        <rect x="600" y="520" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g>
        <rect x="500" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="540" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Lift</text>
      </g>
      
      <!-- Bottom Horizontal Section -->
      <g>
        <rect x="40" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="60" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="701">
        <rect x="130" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="150" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">701</text>
      </g>
      
      <g data-room-number="702">
        <rect x="200" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="210" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">702</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="703">
        <rect x="270" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">703</text>
      </g>
      
      <g data-room-number="704">
        <rect x="340" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="350" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">704</text>
      </g>
      
      <g data-room-number="705">
        <rect x="410" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="420" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">705</text>
      </g>
      
      <!-- Corridor Label -->
      <text x="400" y="590" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      
      <!-- Study Lounge -->
      <g>
        <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="540" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
      </g>
      
      <g data-room-number="714">
        <rect x="410" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">714</text>
      </g>
      
      <g data-room-number="715">
        <rect x="340" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">715</text>
      </g>
      
      <g data-room-number="716">
        <rect x="270" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="300" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">716</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="717">
        <rect x="200" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">717</text>
      </g>
      
      <g data-room-number="718">
        <rect x="130" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">718</text>
      </g>
      
      <g data-room-number="719">
        <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">719</text>
      </g>
    </svg>
`;

export const phase4B8thFloorSvgString = `
  <!-- SVG content for 8th floor -->
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
      <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
      <text x="260" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 8th Floor</text>
      
      <!-- Top Right Vertical Section -->
      <g>
        <rect x="600" y="60" width="70" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="620" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="808">
        <rect x="710" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">808</text>
      </g>
      
      <g data-room-number="809">
        <rect x="710" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="135" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">809</text>
      </g>
      
      <g data-room-number="807">
        <rect x="600" y="160" width="70" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">807</text>
      </g>
      
      <g data-room-number="810">
        <rect x="710" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">810</text>
      </g>
      
      <g data-room-number="806">
        <rect x="600" y="210" width="70" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">806</text>
      </g>
      
      <g data-room-number="811">
        <rect x="710" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">811</text>
      </g>
      
      <!-- Vertical Corridor Text -->
      <g transform="translate(680, 280) rotate(90)">
        <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      </g>
      
      <g data-room-number="812">
        <rect x="710" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">812</text>
      </g>
      
      <g data-room-number="813">
        <rect x="710" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">813</text>
      </g>
      
      <g>
        <rect x="600" y="360" width="70" height="130" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
        <text x="640" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <g data-room-number="814">
        <rect x="710" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">814</text>
      </g>
      
      <g data-room-number="815">
        <rect x="710" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">815</text>
      </g>
      
      <!-- Middle Connection -->
      <g data-room-number="816">
        <rect x="710" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">816</text>
      </g>
      
      <g>
        <rect x="600" y="520" width="70" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="620" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g>
        <rect x="500" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="540" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Lift</text>
      </g>
      
      <!-- Bottom Horizontal Section -->
      <g>
        <rect x="40" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="60" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="801">
        <rect x="140" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">801</text>
      </g>
      
      <g data-room-number="802">
        <rect x="210" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="230" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">802</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="803">
        <rect x="280" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="300" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">803</text>
      </g>
      
      <g data-room-number="804">
        <rect x="350" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="370" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">804</text>
      </g>
      
      <g data-room-number="805">
        <rect x="420" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="440" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">805</text>
      </g>
      
      <!-- Corridor Label -->
      <text x="400" y="587" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      
      <!-- Study Lounge -->
      <g>
        <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="540" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
      </g>
      
      <g data-room-number="817">
        <rect x="420" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="440" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">817</text>
      </g>
      
      <g data-room-number="818">
        <rect x="350" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="370" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">818</text>
      </g>
      
      <g data-room-number="819">
        <rect x="280" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="300" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">819</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="820">
        <rect x="210" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="230" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">820</text>
      </g>
      
      <g data-room-number="821">
        <rect x="140" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">821</text>
      </g>
      
      <g data-room-number="822">
        <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">822</text>
      </g>
    </svg>
`;

export const phase4B9thFloorSvgString = `
  <!-- SVG content for 9th floor -->
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
      <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
      <text x="270" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 9th Floor</text>
      
      <!-- Top Right Vertical Section -->
      <g>
        <rect x="600" y="60" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="908">
        <rect x="720" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">908</text>
      </g>
      
      <g data-room-number="909">
        <rect x="720" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="135" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">909</text>
      </g>
      
      <g data-room-number="907">
        <rect x="600" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">907</text>
      </g>
      
      <g data-room-number="910">
        <rect x="720" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">910</text>
      </g>
      
      <g data-room-number="906">
        <rect x="600" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">906</text>
      </g>
      
      <g data-room-number="911">
        <rect x="720" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">911</text>
      </g>
      
      <!-- Vertical Corridor Text -->
      <g transform="translate(680, 280) rotate(90)">
        <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      </g>
      
      <g data-room-number="912">
        <rect x="720" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">912</text>
      </g>
      
      <g data-room-number="913">
        <rect x="720" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">913</text>
      </g>
      
      <g>
        <rect x="600" y="360" width="60" height="120" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
        <text x="620" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <g data-room-number="914">
        <rect x="720" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">914</text>
      </g>
      
      <g data-room-number="915">
        <rect x="720" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">915</text>
      </g>
      
      <!-- Middle Connection -->
      <g data-room-number="916">
        <rect x="720" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">916</text>
      </g>
      
      <g>
        <rect x="600" y="520" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g>
        <rect x="500" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="540" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Lift</text>
      </g>
      
      <!-- Bottom Horizontal Section -->
      <g>
        <rect x="40" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="60" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="901">
        <rect x="130" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">901</text>
      </g>
      
      <g data-room-number="902">
        <rect x="200" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">902</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="903">
        <rect x="270" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">903</text>
      </g>
      
      <g data-room-number="904">
        <rect x="340" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="350" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">904</text>
      </g>
      
      <g data-room-number="905">
        <rect x="410" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">905</text>
      </g>
      
      <!-- Corridor Label -->
      <text x="400" y="590" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      
      <!-- Study Lounge -->
      <g>
        <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="540" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
      </g>
      
      <g data-room-number="917">
        <rect x="410" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">917</text>
      </g>
      
      <g data-room-number="918">
        <rect x="340" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="350" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">918</text>
      </g>
      
      <g data-room-number="919">
        <rect x="270" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">919</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="920">
        <rect x="200" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">920</text>
      </g>
      
      <g data-room-number="921">
        <rect x="130" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">921</text>
      </g>
      
      <g data-room-number="922">
        <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">922</text>
      </g>
    </svg>
`;

export const phase4B10thFloorSvgString = `
  <!-- SVG content for 10th floor -->
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
      <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
      <text x="260" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 10th Floor</text>
      
      <!-- Top Right Vertical Section -->
      <g>
        <rect x="600" y="60" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="1008">
        <rect x="720" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1008</text>
      </g>
      
      <g data-room-number="1009">
        <rect x="720" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="135" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1009</text>
      </g>
      
      <g data-room-number="1007">
        <rect x="600" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1007</text>
      </g>
      
      <g data-room-number="1010">
        <rect x="720" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1010</text>
      </g>
      
      <g data-room-number="1006">
        <rect x="600" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1006</text>
      </g>
      
      <g data-room-number="1011">
        <rect x="720" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1011</text>
      </g>
      
      <!-- Vertical Corridor Text -->
      <g transform="translate(680, 280) rotate(90)">
        <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      </g>
      
      <g data-room-number="1012">
        <rect x="720" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1012</text>
      </g>
      
      <g data-room-number="1013">
        <rect x="720" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1013</text>
      </g>
      
      <g>
        <rect x="600" y="360" width="60" height="120" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
        <text x="620" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <g data-room-number="1014">
        <rect x="720" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1014</text>
      </g>
      
      <g data-room-number="1015">
        <rect x="720" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1015</text>
      </g>
      
      <!-- Middle Connection -->
      <g data-room-number="1016">
        <rect x="720" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1016</text>
      </g>
      
      <g>
        <rect x="600" y="520" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g>
        <rect x="500" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="540" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Lift</text>
      </g>
      
      <!-- Bottom Horizontal Section -->
      <g>
        <rect x="40" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="60" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="1001">
        <rect x="130" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="140" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1001</text>
      </g>
      
      <g data-room-number="1002">
        <rect x="200" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1002</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="1003">
        <rect x="270" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1003</text>
      </g>
      
      <g data-room-number="1004">
        <rect x="340" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1004</text>
      </g>
      
      <g data-room-number="1005">
        <rect x="410" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1005</text>
      </g>
      
      <!-- Corridor Label -->
      <text x="400" y="590" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      
      <!-- Study Lounge -->
      <g>
        <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="550" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
      </g>
      
      <g data-room-number="1017">
        <rect x="410" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1017</text>
      </g>
      
      <g data-room-number="1018">
        <rect x="340" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1018</text>
      </g>
      
      <g data-room-number="1019">
        <rect x="270" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1019</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="1020">
        <rect x="200" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1020</text>
      </g>
      
      <g data-room-number="1021">
        <rect x="130" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1021</text>
      </g>
      
      <g data-room-number="1022">
        <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1022</text>
      </g>
    </svg>
`;

// Component for rendering Phase 4B floors (6th to 10th)
const Phase4BUpperFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase4BUpperConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For specific floors, use SVG rendering
  let svgString = '';
  switch(floor) {
    case '6th Floor':
      svgString = phase4B6thFloorSvgString;
      break;
    case '7th Floor':
      svgString = phase4B7thFloorSvgString;
      break;
    case '8th Floor':
      svgString = phase4B8thFloorSvgString;
      break;
    case '9th Floor':
      svgString = phase4B9thFloorSvgString;
      break;
    case '10th Floor':
      svgString = phase4B10thFloorSvgString;
      break;
  }
  
  if (svgString) {
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
  }
  
  // For floors without SVG, use a grid layout
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
  
  // Render Phase 4B as a grid of room buttons
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

export default Phase4BUpperFloorPlan;