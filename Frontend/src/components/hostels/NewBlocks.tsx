import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Common configuration for all new blocks (Aravali, Ajanta, Himalaya, Shivalik, Vindya, Nilgiri, Satpura, Kailash)
// Each block has 3 floors (Ground, 1st, 2nd) with the same room structure on each floor
export const newBlocksConfig: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 20, exceptions: [] },
  "1st Floor": { start: 21, end: 40, exceptions: [] },
  "2nd Floor": { start: 41, end: 60, exceptions: [] }
};

// Updated SVG String for Ground Floor with central courtyard layout
export const newBlocksGroundFloorSvgString = `
  <svg viewBox="0 0 650 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="648" height="398" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    
    <!-- Title box in the center -->
    <rect x="225" y="150" width="200" height="100" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="260" y="140" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" class="block-title">Ground Floor</text>
    
    <!-- Outer Walls Path -->
    <path
      d="M150 10 H 500 V 40 H 580 V 90 H 640 V 310 H 580 V 360 H 500 V 390 H 150 V 360 H 70 V 310 H 10 V 90 H 70 V 40 H 150 Z"
      fill="none"
      stroke="#333333"
      strokeWidth="2"
    />

    <!-- Inner Courtyard Path -->
    <path
      d="M150 130 H 200 V 110 H 450 V 130 H 500 V 270 H 450 V 290 H 200 V 270 H 150 Z"
      fill="none"
      stroke="#666666"
      strokeWidth="1.5"
    />
    
    <!-- Central Court Yard Text -->
    <text x="250" y="200" fontSize="10" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">Central Court Yard</text>
    
    <!-- Top Row Rooms (2-9) -->
    <g data-room-number="2"> <rect x="90" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="110" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">2</text> </g>
    <g data-room-number="3"> <rect x="140" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="160" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">3</text> </g>
    <g data-room-number="4"> <rect x="220" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="240" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">4</text> </g>
    <g data-room-number="5"> <rect x="270" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="290" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">5</text> </g>
    <g data-room-number="6"> <rect x="340" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="360" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">6</text> </g>
    <g data-room-number="7"> <rect x="390" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="410" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">7</text> </g>
    <g data-room-number="8"> <rect x="470" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="490" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">8</text> </g>
    <g data-room-number="9"> <rect x="520" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="540" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">9</text> </g>
    
    <!-- Side Rooms (WR, 10, 20, 11) -->
    <g class="warden-room"> <rect x="20" y="100" width="40" height="60" rx="4" fill="#d8b4fe" stroke="#9333ea" strokeWidth="1.5"/> <text x="30" y="135" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" font-weight="bold">WR</text> </g>
    <g data-room-number="10"> <rect x="590" y="100" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="610" y="135" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">10</text> </g>
    <g data-room-number="20"> <rect x="20" y="240" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="40" y="275" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">20</text> </g>
    <g data-room-number="11"> <rect x="590" y="240" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="610" y="275" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">11</text> </g>
    
    <!-- Bottom Row Rooms (12-19) -->
    <g data-room-number="19"> <rect x="90" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="110" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">19</text> </g>
    <g data-room-number="18"> <rect x="140" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="160" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">18</text> </g>
    <g data-room-number="17"> <rect x="220" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="240" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">17</text> </g>
    <g data-room-number="16"> <rect x="270" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="290" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">16</text> </g>
    <g data-room-number="15"> <rect x="340" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="360" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">15</text> </g>
    <g data-room-number="14"> <rect x="390" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="410" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">14</text> </g>
    <g data-room-number="13"> <rect x="470" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="490" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">13</text> </g>
    <g data-room-number="12"> <rect x="520" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="540" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">12</text> </g>
    
    <!-- Central Area Features -->
    <g> <rect x="160" y="170" width="60" height="40" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/> <text x="170" y="195" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text> </g>
    <g> <rect x="430" y="170" width="60" height="40" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/> <text x="440" y="195" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text> </g>
    
    <!-- Corridors -->
    <text x="290" y="100" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    <text x="290" y="330" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    
    <!-- Entry -->
    <g transform="translate(-50, 0)">
      <line x1="70" y1="180" x2="110" y2="180" stroke="#000000" strokeWidth="1.5" />
      <polygon points="105,175 115,180 105,185" fill="#000000" />
      <text x="85" y="195" fontSize="10" fontFamily="sans-serif" textAnchor="middle">Entry</text>
    </g>
  </svg>
`;

// Updated SVG String for 1st Floor with central courtyard layout
export const newBlocksFirstFloorSvgString = `
  <svg viewBox="0 0 650 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="648" height="398" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    
    <!-- Title box in the center -->
    <rect x="225" y="150" width="200" height="100" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="260" y="130" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" class="block-title">1st Floor</text>
    
    <!-- Outer Walls Path -->
    <path
      d="M150 10 H 500 V 40 H 580 V 90 H 640 V 310 H 580 V 360 H 500 V 390 H 150 V 360 H 70 V 310 H 10 V 90 H 70 V 40 H 150 Z"
      fill="none"
      stroke="#333333"
      strokeWidth="2"
    />

    <!-- Inner Courtyard Path -->
    <path
      d="M150 130 H 200 V 110 H 450 V 130 H 500 V 270 H 450 V 290 H 200 V 270 H 150 Z"
      fill="none"
      stroke="#666666"
      strokeWidth="1.5"
    />
    
    <!-- Central Court Yard Text -->
    <text x="250" y="200" fontSize="12" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">Central Court Yard</text>
    
    <!-- Top Row Rooms (22-29) -->
    <g data-room-number="22"> <rect x="90" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="110" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">22</text> </g>
    <g data-room-number="23"> <rect x="140" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="160" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">23</text> </g>
    <g data-room-number="24"> <rect x="220" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="240" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">24</text> </g>
    <g data-room-number="25"> <rect x="270" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="290" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">25</text> </g>
    <g data-room-number="26"> <rect x="340" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="360" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">26</text> </g>
    <g data-room-number="27"> <rect x="390" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="410" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">27</text> </g>
    <g data-room-number="28"> <rect x="470" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="490" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">28</text> </g>
    <g data-room-number="29"> <rect x="520" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="540" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">29</text> </g>
    
    <!-- Side Rooms (21, 30, 40, 31) -->
    <g data-room-number="21"> <rect x="20" y="100" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="40" y="135" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">21</text> </g>
    <g data-room-number="30"> <rect x="590" y="100" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="610" y="135" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">30</text> </g>
    <g data-room-number="40"> <rect x="20" y="240" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="40" y="275" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">40</text> </g>
    <g data-room-number="31"> <rect x="590" y="240" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="610" y="275" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">31</text> </g>
    
    <!-- Bottom Row Rooms (32-39) -->
    <g data-room-number="39"> <rect x="90" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="110" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">39</text> </g>
    <g data-room-number="38"> <rect x="140" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="160" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">38</text> </g>
    <g data-room-number="37"> <rect x="220" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="240" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">37</text> </g>
    <g data-room-number="36"> <rect x="270" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="290" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">36</text> </g>
    <g data-room-number="35"> <rect x="340" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="360" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">35</text> </g>
    <g data-room-number="34"> <rect x="390" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="410" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">34</text> </g>
    <g data-room-number="33"> <rect x="470" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="490" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">33</text> </g>
    <g data-room-number="32"> <rect x="520" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="540" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">32</text> </g>
    
    <!-- Central Area Features -->
    <g> <rect x="160" y="170" width="60" height="40" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/> <text x="170" y="195" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text> </g>
    <g> <rect x="430" y="170" width="60" height="40" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/> <text x="440" y="195" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text> </g>
    
    <!-- Corridors -->
    <text x="300" y="100" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    <text x="300" y="330" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
  </svg>
`;

// Updated SVG String for 2nd Floor with central courtyard layout
export const newBlocksSecondFloorSvgString = `
  <svg viewBox="0 0 650 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="648" height="398" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    
    <!-- Title box in the center -->
    <rect x="225" y="150" width="200" height="100" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="250" y="130" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif" class="block-title">2nd Floor</text>
    
    <!-- Outer Walls Path -->
    <path
      d="M150 10 H 500 V 40 H 580 V 90 H 640 V 310 H 580 V 360 H 500 V 390 H 150 V 360 H 70 V 310 H 10 V 90 H 70 V 40 H 150 Z"
      fill="none"
      stroke="#333333"
      strokeWidth="2"
    />

    <!-- Inner Courtyard Path -->
    <path
      d="M150 130 H 200 V 110 H 450 V 130 H 500 V 270 H 450 V 290 H 200 V 270 H 150 Z"
      fill="none"
      stroke="#666666"
      strokeWidth="1.5"
    />
    
    <!-- Central Court Yard Text -->
    <text x="250" y="200" fontSize="12" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">Central Court Yard</text>
    
    <!-- Top Row Rooms (42-49) -->
    <g data-room-number="42"> <rect x="90" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="110" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">42</text> </g>
    <g data-room-number="43"> <rect x="140" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="160" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">43</text> </g>
    <g data-room-number="44"> <rect x="220" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="240" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">44</text> </g>
    <g data-room-number="45"> <rect x="270" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="290" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">45</text> </g>
    <g data-room-number="46"> <rect x="340" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="360" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">46</text> </g>
    <g data-room-number="47"> <rect x="390" y="20" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="410" y="45" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">47</text> </g>
    <g data-room-number="48"> <rect x="470" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="490" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">48</text> </g>
    <g data-room-number="49"> <rect x="520" y="50" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="540" y="75" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">49</text> </g>
    
    <!-- Side Rooms (41, 50, 60, 51) -->
    <g data-room-number="41"> <rect x="20" y="100" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="40" y="135" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">41</text> </g>
    <g data-room-number="50"> <rect x="590" y="100" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="610" y="135" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">50</text> </g>
    <g data-room-number="60"> <rect x="20" y="240" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="40" y="275" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">60</text> </g>
    <g data-room-number="51"> <rect x="590" y="240" width="40" height="60" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="610" y="275" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">51</text> </g>
    
    <!-- Bottom Row Rooms (52-59) -->
    <g data-room-number="59"> <rect x="90" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="110" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">59</text> </g>
    <g data-room-number="58"> <rect x="140" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="160" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">58</text> </g>
    <g data-room-number="57"> <rect x="220" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="240" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">57</text> </g>
    <g data-room-number="56"> <rect x="270" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="290" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">56</text> </g>
    <g data-room-number="55"> <rect x="340" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="360" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">55</text> </g>
    <g data-room-number="54"> <rect x="390" y="340" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="410" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">54</text> </g>
    <g data-room-number="53"> <rect x="470" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="490" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">53</text> </g>
    <g data-room-number="52"> <rect x="520" y="310" width="40" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="540" y="335" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">52</text> </g>
    
    <!-- Central Area Features -->
    <g> <rect x="160" y="170" width="60" height="40" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/> <text x="170" y="195" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text> </g>
    <g> <rect x="430" y="170" width="60" height="40" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/> <text x="440" y="195" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text> </g>
    
    <!-- Corridors -->
    <text x="300" y="100" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    <text x="300" y="330" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
  </svg>
`;

// Create individual configs for each block
export const aravaliConfig = { ...newBlocksConfig };
export const ajantaConfig = { ...newBlocksConfig };
export const himalayaConfig = { ...newBlocksConfig };
export const shivalikConfig = { ...newBlocksConfig };
export const vindyaConfig = { ...newBlocksConfig };
export const nilgiriConfig = { ...newBlocksConfig };
export const satpuraConfig = { ...newBlocksConfig };
export const kailashConfig = { ...newBlocksConfig };

// Generic floor plan component that can be used with any of the 8 new blocks
const NewBlocksFloorPlan: React.FC<FloorPlanProps> = ({
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  let svgString = '';
  
  switch(floor) {
    case 'Ground Floor': 
      svgString = newBlocksGroundFloorSvgString;
      break;
    case '1st Floor': 
      svgString = newBlocksFirstFloorSvgString;
      break;
    case '2nd Floor': 
      svgString = newBlocksSecondFloorSvgString;
      break;
    default:
      return <p>Floor plan not available for {floor}</p>;
  }

  const svgRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!svgRef.current) return;
    
    const container = svgRef.current;
    
    // Update the block title in the SVG
    const titleElement = container.querySelector('.block-title');
    if (titleElement) {
      titleElement.textContent = `${selectedBlock} - ${selectedFloor}`;
    }

    // Apply visual updates based on selectedBlock and selectedFloor
    if (selectedBlock && selectedFloor === floor) {
      container.classList.add('selected-floor');
    } else {
      container.classList.remove('selected-floor');
    }
    
    // Mark occupied beds
    Object.entries(occupiedBeds).forEach(([key, isOccupied]) => {
      if (isOccupied && key.includes(`${selectedBlock}_${selectedFloor}_`)) {
        // Extract room number from key (format: block_floor_roomNumber_bed)
        const parts = key.split('_');
        if (parts.length >= 3) {
          const roomNumber = parts[2];
          
          const roomElement = container.querySelector(`g[data-room-number="${roomNumber}"]`);
          if (roomElement) {
            const bedRect = roomElement.querySelector('rect');
            const currentFill = bedRect?.getAttribute('fill');
            
            if (bedRect) {
              // First check if this room already has one bed occupied (yellow)
              if (currentFill === '#fef08a') {
                // Mark as fully-occupied (red) if the other bed is already marked
                bedRect.setAttribute('fill', '#fecaca'); // Red-200 for fully occupied
                bedRect.setAttribute('stroke', '#ef4444'); // Red-500
              } else {
                // Mark as partially-occupied (yellow) for first bed
                bedRect.setAttribute('fill', '#fef08a'); // Yellow-200 for partially occupied
                bedRect.setAttribute('stroke', '#eab308'); // Yellow-500
              }
            }
          }
        }
      }
    });
    
    // Reset available rooms to green
    const rooms = container.querySelectorAll('g[data-room-number]');
    rooms.forEach(room => {
      // Skip warden room (20, 120, 220)
      const roomNumber = room.getAttribute('data-room-number') || '';
      if (roomNumber === '20') return;
      
      const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
      const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
      
      // If neither bed is occupied, set to available (green)
      if (!occupiedBeds[bedAKey] && !occupiedBeds[bedBKey]) {
        const bedRect = room.querySelector('rect');
        if (bedRect) {
          bedRect.setAttribute('fill', '#86efac'); // Green-200 for available
          bedRect.setAttribute('stroke', '#1976d2'); // Blue-500
        }
      }
    });
    
    // Event handler using delegation
    const handleClick = (event: MouseEvent) => {
      const targetGroup = (event.target as Element).closest('g[data-room-number]');
      if (targetGroup) {
        const roomNumber = targetGroup.getAttribute('data-room-number');
        if (roomNumber) {
          // Pass the room number to the click handler
          onRoomClick(roomNumber);
        }
      }
    };
    
    container.addEventListener('click', handleClick);
    
    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [onRoomClick, occupiedBeds, selectedBlock, selectedFloor, floor]);
  
  return (
    <div
      ref={svgRef}
      className="svg-container"
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

// Export component factories for each block
export const AravaliFloorPlan = NewBlocksFloorPlan;
export const AjantaFloorPlan = NewBlocksFloorPlan;
export const HimalayaFloorPlan = NewBlocksFloorPlan;
export const ShivalikFloorPlan = NewBlocksFloorPlan;
export const VindyaFloorPlan = NewBlocksFloorPlan;
export const NilgiriFloorPlan = NewBlocksFloorPlan;
export const SatpuraFloorPlan = NewBlocksFloorPlan;
export const KailashFloorPlan = NewBlocksFloorPlan;

export default NewBlocksFloorPlan;