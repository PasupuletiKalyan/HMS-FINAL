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
      <text x="138" y="110" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="138" y="120" fontSize="10" textAnchor="middle" dominantBaseline="middle">case</text>
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
      <text x="160" y="270" fontSize="12" textAnchor="middle" dominantBaseline="middle">🚽</text>
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
      <text x="215" y="600" fontSize="10" textAnchor="middle" dominantBaseline="middle">🚽</text>
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
      <text x="135" y="280" fontSize="10" textAnchor="middle" dominantBaseline="middle">🚽</text>
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
      <text x="180" y="650" fontSize="10" textAnchor="middle" dominantBaseline="middle">🚽</text>
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

// SVG template for Phase 4A floors 2-6 (same structure for all these floors)
export const phase4AHigherFloorsSvgTemplate = `
  <svg viewBox="0 -10 550 900" xmlns="http://www.w3.org/2000/svg">
    
    <!-- Title -->
    <rect x="250" y="5" width="200" height="20" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="1"/>
    <text x="260" y="20" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 4A - {FLOOR_NAME}</text>
    
    <!-- Top-Left Section (Left Column) -->
    <g data-room-number="{FLOOR_PREFIX}18">
      <rect x="10" y="50" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="75" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}18</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}17">
      <rect x="10" y="100" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}17</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}16">
      <rect x="10" y="150" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="175" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}16</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}15">
      <rect x="10" y="200" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="225" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}15</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}14">
      <rect x="10" y="250" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="275" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}14</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}13">
      <rect x="10" y="300" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="325" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}13</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}12">
      <rect x="10" y="350" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="375" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}12</text>
    </g>
    
    <!-- Top-Left Section (Right Column & Common) -->
    <g data-room-number="LiftStair1">
      <rect x="130" y="10" width="50" height="70" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="140" y="35" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift &</text>
      <text x="140" y="50" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}19">
      <rect x="130" y="100" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}19</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}20">
      <rect x="130" y="150" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="175" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}20</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}21">
      <rect x="130" y="200" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="225" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}21</text>
    </g>
    
    <!-- Central WS Area -->
    <g data-room-number="WS1">
      <rect x="130" y="250" width="90" height="100" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="150" y="300" fontSize="30" textAnchor="middle" dominantBaseline="middle">🚽</text>
    </g>
    
    <!-- Middle Vertical Section (Left Column) -->
    <g data-room-number="{FLOOR_PREFIX}11">
      <rect x="140" y="520" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="540" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}11</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}10">
      <rect x="140" y="570" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="590" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}10</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}09">
      <rect x="140" y="620" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="640" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}09</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}08">
      <rect x="140" y="670" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="690" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}08</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}07">
      <rect x="140" y="720" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="740" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}07</text>
    </g>
    
    <!-- Middle Vertical Section (Right Column & Common) -->
    <g data-room-number="{FLOOR_PREFIX}22">
      <rect x="230" y="420" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="440" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}22</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}23">
      <rect x="230" y="470" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="490" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}23</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}24">
      <rect x="230" y="520" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="540" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}24</text>
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
    <g data-room-number="{FLOOR_PREFIX}25">
      <rect x="350" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="360" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}25</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}26">
      <rect x="400" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="410" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}26</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}27">
      <rect x="450" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="460" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}27</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}28">
      <rect x="500" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="510" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}28</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}29">
      <rect x="550" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="560" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}29</text>
    </g>
    
    <g data-room-number="Staircase3">
      <rect x="600" y="740" width="50" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="610" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="610" y="770" fontSize="10" textAnchor="middle" dominantBaseline="middle">case</text>
    </g>
    
    <!-- Bottom Horizontal Section (Bottom Row) -->
    <g data-room-number="{FLOOR_PREFIX}06">
      <rect x="350" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="360" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}06</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}05">
      <rect x="400" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="410" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}05</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}04">
      <rect x="450" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="460" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}04</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}03">
      <rect x="500" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="510" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}03</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}02">
      <rect x="550" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="560" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}02</text>
    </g>
    
    <g data-room-number="{FLOOR_PREFIX}01">
      <rect x="600" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="610" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">{FLOOR_PREFIX}01</text>
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

// SVG for Phase 4A 8th Floor (using same layout as 2nd floor but with 8xx room numbers)
export const phase4A8thFloorSvgString = `
  <svg viewBox="0 -10 550 900" xmlns="http://www.w3.org/2000/svg">
    
    <!-- Title -->
    <rect x="250" y="5" width="200" height="20" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="1"/>
    <text x="260" y="20" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 4A - 8th Floor</text>
    
    <!-- Top-Left Section (Left Column) -->
    <g data-room-number="818">
      <rect x="10" y="50" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="75" fontSize="10" textAnchor="middle" dominantBaseline="middle">818</text>
    </g>
    
    <g data-room-number="817">
      <rect x="10" y="100" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">817</text>
    </g>
    
    <g data-room-number="816">
      <rect x="10" y="150" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="175" fontSize="10" textAnchor="middle" dominantBaseline="middle">816</text>
    </g>
    
    <g data-room-number="815">
      <rect x="10" y="200" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="225" fontSize="10" textAnchor="middle" dominantBaseline="middle">815</text>
    </g>
    
    <g data-room-number="814">
      <rect x="10" y="250" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="275" fontSize="10" textAnchor="middle" dominantBaseline="middle">814</text>
    </g>
    
    <g data-room-number="813">
      <rect x="10" y="300" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="325" fontSize="10" textAnchor="middle" dominantBaseline="middle">813</text>
    </g>
    
    <g data-room-number="812">
      <rect x="10" y="350" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="375" fontSize="10" textAnchor="middle" dominantBaseline="middle">812</text>
    </g>
    
    <!-- Top-Left Section (Right Column & Common) -->
    <g data-room-number="LiftStair1">
      <rect x="130" y="10" width="50" height="70" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="140" y="35" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift &</text>
      <text x="140" y="50" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
    </g>
    
    <g data-room-number="819">
      <rect x="130" y="100" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">819</text>
    </g>
    
    <g data-room-number="820">
      <rect x="130" y="150" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="175" fontSize="10" textAnchor="middle" dominantBaseline="middle">820</text>
    </g>
    
    <g data-room-number="821">
      <rect x="130" y="200" width="50" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="140" y="225" fontSize="10" textAnchor="middle" dominantBaseline="middle">821</text>
    </g>
    
    <!-- Central WS Area -->
    <g data-room-number="WS1">
      <rect x="130" y="250" width="90" height="100" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="150" y="300" fontSize="30" textAnchor="middle" dominantBaseline="middle">🚽</text>
    </g>
    
    <!-- Middle Vertical Section (Left Column) -->
    <g data-room-number="811">
      <rect x="140" y="520" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="540" fontSize="10" textAnchor="middle" dominantBaseline="middle">811</text>
    </g>
    
    <g data-room-number="810">
      <rect x="140" y="570" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="590" fontSize="10" textAnchor="middle" dominantBaseline="middle">810</text>
    </g>
    
    <g data-room-number="809">
      <rect x="140" y="620" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="640" fontSize="10" textAnchor="middle" dominantBaseline="middle">809</text>
    </g>
    
    <g data-room-number="808">
      <rect x="140" y="670" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="690" fontSize="10" textAnchor="middle" dominantBaseline="middle">808</text>
    </g>
    
    <g data-room-number="807">
      <rect x="140" y="720" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="150" y="740" fontSize="10" textAnchor="middle" dominantBaseline="middle">807</text>
    </g>
    
    <!-- Middle Vertical Section (Right Column & Common) -->
    <g data-room-number="822">
      <rect x="230" y="420" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="440" fontSize="10" textAnchor="middle" dominantBaseline="middle">822</text>
    </g>
    
    <g data-room-number="823">
      <rect x="230" y="470" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="490" fontSize="10" textAnchor="middle" dominantBaseline="middle">823</text>
    </g>
    
    <g data-room-number="824">
      <rect x="230" y="520" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="540" fontSize="10" textAnchor="middle" dominantBaseline="middle">824</text>
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
    <g data-room-number="825">
      <rect x="350" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="360" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">825</text>
    </g>
    
    <g data-room-number="826">
      <rect x="400" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="410" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">826</text>
    </g>
    
    <g data-room-number="827">
      <rect x="450" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="460" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">827</text>
    </g>
    
    <g data-room-number="828">
      <rect x="500" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="510" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">828</text>
    </g>
    
    <g data-room-number="829">
      <rect x="550" y="740" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="560" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">829</text>
    </g>
    
    <g data-room-number="Staircase3">
      <rect x="600" y="740" width="50" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="610" y="760" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="610" y="770" fontSize="10" textAnchor="middle" dominantBaseline="middle">case</text>
    </g>
    
    <!-- Bottom Horizontal Section (Bottom Row) -->
    <g data-room-number="806">
      <rect x="350" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="360" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">806</text>
    </g>
    
    <g data-room-number="805">
      <rect x="400" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="410" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">805</text>
    </g>
    
    <g data-room-number="804">
      <rect x="450" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="460" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">804</text>
    </g>
    
    <g data-room-number="803">
      <rect x="500" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="510" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">803</text>
    </g>
    
    <g data-room-number="802">
      <rect x="550" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="560" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">802</text>
    </g>
    
    <g data-room-number="801">
      <rect x="600" y="830" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="610" y="850" fontSize="10" textAnchor="middle" dominantBaseline="middle">801</text>
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

// SVG for Phase 4A 7th Floor (unique layout)
export const phase4A7thFloorSvgString = `
  <svg viewBox="0 -10 550 770" xmlns="http://www.w3.org/2000/svg">
    
    <!-- Title -->
    <rect x="260" y="5" width="200" height="20" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="1"/>
    <text x="270" y="20" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 4A - 7th Floor</text>
    
    <!-- Top-Left Section (Lift & Stair case) -->
    <g data-room-number="LiftStair1">
      <rectx="130" y="10" width="60" height="70" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="140" y="35" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift &</text>
      <text x="150" y="50" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="160" y="65" fontSize="10" textAnchor="middle" dominantBaseline="middle">case</text>
    </g>
    
    <!-- Terrace Area -->
    <g data-room-number="Terrace">
      <rect x="130" y="90" width="60" height="100" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="130" y="145" fontSize="10" textAnchor="middle" dominantBaseline="middle">Terrace</text>
    </g>
    
    <!-- Left Column Rooms -->
    <g data-room-number="718">
      <rect x="10" y="20" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="40" fontSize="10" textAnchor="middle" dominantBaseline="middle">718</text>
    </g>
    
    <g data-room-number="717">
      <rect x="10" y="70" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="90" fontSize="10" textAnchor="middle" dominantBaseline="middle">717</text>
    </g>
    
    <g data-room-number="716">
      <rect x="10" y="120" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="140" fontSize="10" textAnchor="middle" dominantBaseline="middle">716</text>
    </g>
    
    <g data-room-number="715">
      <rect x="10" y="170" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="190" fontSize="10" textAnchor="middle" dominantBaseline="middle">715</text>
    </g>
    
    <g data-room-number="714">
      <rect x="10" y="220" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="240" fontSize="10" textAnchor="middle" dominantBaseline="middle">714</text>
    </g>
    
    <g data-room-number="713">
      <rect x="10" y="270" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="290" fontSize="10" textAnchor="middle" dominantBaseline="middle">713</text>
    </g>
    
    <g data-room-number="712">
      <rect x="10" y="320" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="20" y="340" fontSize="10" textAnchor="middle" dominantBaseline="middle">712</text>
    </g>
    
    <!-- Central WS Area -->
    <g data-room-number="WS1">
      <rect x="130" y="200" width="80" height="100" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="160" y="250" fontSize="14" textAnchor="middle" dominantBaseline="middle">WS</text>
    </g>
    
    <!-- Right Top Column Rooms -->
    <g data-room-number="719">
      <rect x="180" y="340" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="190" y="365" fontSize="10" textAnchor="middle" dominantBaseline="middle">719</text>
    </g>
    
    <g data-room-number="720">
      <rect x="180" y="390" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="190" y="415" fontSize="10" textAnchor="middle" dominantBaseline="middle">720</text>
    </g>
    
    <g data-room-number="721">
      <rect x="180" y="440" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="190" y="465" fontSize="10" textAnchor="middle" dominantBaseline="middle">721</text>
    </g>
    
    <!-- Middle Left Column Rooms -->
    <g data-room-number="711">
      <rect x="90" y="440" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="100" y="460" fontSize="10" textAnchor="middle" dominantBaseline="middle">711</text>
    </g>
    
    <g data-room-number="710">
      <rect x="90" y="490" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="100" y="510" fontSize="10" textAnchor="middle" dominantBaseline="middle">710</text>
    </g>
    
    <g data-room-number="709">
      <rect x="90" y="540" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="100" y="560" fontSize="10" textAnchor="middle" dominantBaseline="middle">709</text>
    </g>
    
    <g data-room-number="708">
      <rect x="90" y="590" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="100" y="620" fontSize="10" textAnchor="middle" dominantBaseline="middle">708</text>
    </g>
    
    <g data-room-number="707">
      <rect x="90" y="640" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="100" y="660" fontSize="10" textAnchor="middle" dominantBaseline="middle">707</text>
    </g>
    
    <!-- Middle Right Column (Lift, Stair, WS) -->
    <g data-room-number="LiftArea">
      <rect x="180" y="490" width="50" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="190" y="505" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lift</text>
      <text x="190" y="520" fontSize="10" textAnchor="middle" dominantBaseline="middle">Area</text>
    </g>
    
    <g data-room-number="Staircase2">
      <rect x="180" y="540" width="50" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="190" y="555" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="190" y="570" fontSize="10" textAnchor="middle" dominantBaseline="middle">case</text>
    </g>
    
    <g data-room-number="WS2">
      <rect x="180" y="590" width="50" height="60" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="200" y="625" fontSize="14" textAnchor="middle" dominantBaseline="middle">WS</text>
    </g>
    
    <!-- Bottom Horizontal Section (Top Row) -->
    <g data-room-number="722">
      <rect x="230" y="640" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="665" fontSize="10" textAnchor="middle" dominantBaseline="middle">722</text>
    </g>
    
    <g data-room-number="723">
      <rect x="280" y="640" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="290" y="665" fontSize="10" textAnchor="middle" dominantBaseline="middle">723</text>
    </g>
    
    <g data-room-number="724">
      <rect x="330" y="640" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="340" y="665" fontSize="10" textAnchor="middle" dominantBaseline="middle">724</text>
    </g>
    
    <g data-room-number="725">
      <rect x="380" y="640" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="390" y="665" fontSize="10" textAnchor="middle" dominantBaseline="middle">725</text>
    </g>
    
    <g data-room-number="726">
      <rect x="430" y="640" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="440" y="665" fontSize="10" textAnchor="middle" dominantBaseline="middle">726</text>
    </g>
    
    <g data-room-number="Staircase3">
      <rect x="480" y="640" width="50" height="40" fill="#d3d3d3" stroke="grey" strokeWidth="1"/>
      <text x="490" y="655" fontSize="10" textAnchor="middle" dominantBaseline="middle">Stair</text>
      <text x="490" y="670" fontSize="10" textAnchor="middle" dominantBaseline="middle">case</text>
    </g>
    
    <!-- Bottom Horizontal Section (Bottom Row) -->
    <g data-room-number="706">
      <rect x="230" y="710" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="240" y="735" fontSize="10" textAnchor="middle" dominantBaseline="middle">706</text>
    </g>
    
    <g data-room-number="705">
      <rect x="280" y="710" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="290" y="735" fontSize="10" textAnchor="middle" dominantBaseline="middle">705</text>
    </g>
    
    <g data-room-number="704">
      <rect x="330" y="710" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="340" y="735" fontSize="10" textAnchor="middle" dominantBaseline="middle">704</text>
    </g>
    
    <g data-room-number="703">
      <rect x="380" y="710" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="390" y="735" fontSize="10" textAnchor="middle" dominantBaseline="middle">703</text>
    </g>
    
    <g data-room-number="702">
      <rect x="430" y="710" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="440" y="735" fontSize="10" textAnchor="middle" dominantBaseline="middle">702</text>
    </g>
    
    <g data-room-number="701">
      <rect x="480" y="710" width="40" height="40" fill="#bbf7d0" stroke="grey" strokeWidth="1"/>
      <text x="490" y="735" fontSize="10" textAnchor="middle" dominantBaseline="middle">701</text>
    </g>
    
    <!-- Labels for corridors -->
    <text x="65" y="230" fontSize="10" transform="rotate(-90 65 200)" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    <text x="142" y="510" fontSize="10" transform="rotate(-90 155 500)" textAnchor="middle" dominantBaseline="middle">Corridor</text>
    <text x="350" y="700"fontSize="10" textAnchor="middle" dominantBaseline="middle">Corridor</text>
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
  
  // Get the floor prefix based on the floor name (e.g., "2" for "2nd Floor")
  const getFloorPrefix = (floorName: string): string => {
    if (floorName === 'Ground Floor') return '';
    
    // Extract the number from the floor name
    const floorNumber = floorName.match(/(\d+)/)?.[1] || '';
    return floorNumber;
  };
  
  // For floors with SVG layout, use the visual rendering
  // Use specific SVG layouts for Ground, 1st, 2nd-6th, and 7th floors
  if (floor === 'Ground Floor' || floor === '1st Floor' || 
      ['2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor', '8th Floor'].includes(floor)) {
    
    const svgRef = React.useRef<HTMLDivElement>(null);
    // Select the appropriate SVG based on the floor
    let svgString = '';
    
    if (floor === 'Ground Floor') {
      svgString = phase4AGroundFloorSvgString;
    } else if (floor === '1st Floor') {
      svgString = phase4A1stFloorSvgString;
    } else if (floor === '7th Floor') {
      // Use the specific 7th floor layout
      svgString = phase4A7thFloorSvgString;
    } else if (floor === '8th Floor') {
      svgString = phase4A8thFloorSvgString;
    } else {
      // For floors 2-6, use the template and replace placeholders
      const floorPrefix = getFloorPrefix(floor);
      svgString = phase4AHigherFloorsSvgTemplate
        .replace(/{FLOOR_NAME}/g, floor)
        .replace(/{FLOOR_PREFIX}/g, floorPrefix);
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
  }
  
  // Fallback to grid layout for floors 9-10
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
}

export default Phase4AFloorPlan;