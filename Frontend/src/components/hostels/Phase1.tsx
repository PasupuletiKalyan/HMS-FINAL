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
    
    <g data-room-number="17"> <rect x="40" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="72" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">17</text> </g>
    <g data-room-number="18"> <rect x="200" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="232" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">18</text> </g>
    <g> <rect x="260" y="40" width="59" height="40" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/> <text x="292" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text> </g>
      <g data-room-number="19"> <rect x="320" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="352" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">19</text> </g>
      <g data-room-number="20"> <rect x="380" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="412" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">20</text> </g>
      <g data-room-number="21"> <rect x="440" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="472" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">21</text> </g>
      <g data-room-number="22"> <rect x="500" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="532" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">22</text> </g>
      <g data-room-number="23"> <rect x="560" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="592" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">23</text> </g>
      <g data-room-number="24"> <rect x="620" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="652" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">24</text> </g>
      <g data-room-number="25"> <rect x="680" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="712" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">25</text> </g>
      <g data-room-number="26"> <rect x="740" y="40" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="772" y="65" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">26</text> </g>
      
      <g data-room-number="27"> <rect x="740" y="120" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="772" y="145" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">27</text> </g>
      <g data-room-number="28"> <rect x="740" y="180" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="772" y="205" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">28</text> </g>
      <g data-room-number="29"> <rect x="740" y="240" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="772" y="265" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">29</text> </g>
      <g data-room-number="30"> <rect x="740" y="300" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="772" y="325" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">30</text> </g>
      <g data-room-number="31"> <rect x="740" y="360" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="772" y="385" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">31</text> </g>
      <g data-room-number="32"> <rect x="740" y="420" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="772" y="445" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">32</text> </g>
      <g data-room-number="33" class="warden-room"> <rect x="740" y="480" width="64" height="40" rx="4" fill="#d8b4fe" stroke="#9333ea" strokeWidth="1.5"/> <text x="772" y="505" fontSize="16" textAnchor="middle" fontFamily="Inter, sans-serif" font-weight="bold">👮‍♂️</text> </g>
      
      <g data-room-number="16"> <rect x="40" y="160" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="72" y="185" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">16</text> </g>
      <g data-room-number="15"> <rect x="40" y="220" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="72" y="245" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">15</text> </g>
      <g data-room-number="14"> <rect x="40" y="280" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="72" y="305" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">14</text> </g>
      <g data-room-number="12A"> <rect x="40" y="340" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="72" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">12A</text> </g>
      <g data-room-number="12"> <rect x="40" y="400" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="72" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">12</text> </g>
      
      <g> <rect x="160" y="160" width="64" height="40" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/> <text x="192" y="185" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text> </g>
      <g data-room-number="9"> <rect x="160" y="280" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="192" y="305" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">9</text> </g>
      <g data-room-number="10"> <rect x="160" y="340" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="192" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">10</text> </g>
      <g data-room-number="11"> <rect x="160" y="400" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="192" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">11</text> </g>
      
      <g data-room-number="8"> <rect x="320" y="160" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="352" y="185" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">8</text> </g>
      <g data-room-number="7"> <rect x="380" y="160" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="412" y="185" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">7</text> </g>
      <g data-room-number="6"> <rect x="440" y="160" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="472" y="185" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">6</text> </g>
      <g data-room-number="5"> <rect x="500" y="160" width="59" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="532" y="185" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">5</text> </g>
      <g> <rect x="620" y="160" width="64" height="40" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/> <text x="652" y="185" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text> </g>
      <g data-room-number="4"> <rect x="620" y="280" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="652" y="305" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">4</text> </g>
      <g data-room-number="3"> <rect x="620" y="340" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="652" y="365" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">3</text> </g>
      <g data-room-number="2"> <rect x="620" y="400" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="652" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">2</text> </g>
      <g data-room-number="1"> <rect x="620" y="460" width="64" height="40" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/> <text x="652" y="485" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif">1</text> </g>
      
      <g> <rect x="620" y="560" width="64" height="40" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/> <text x="652" y="585" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text> </g>
      <g> <rect x="800" y="560" width="64" height="40" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/> <text x="832" y="585" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text> </g>
  </svg>
`;
// SVG String for Phase 1 1st Floor
export const phase1FirstFloorSvgString = `
  <svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="798" height="648" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    <rect x="280" y="240" width="240" height="60" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="330" y="277" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 1-1st Floor</text>
    <!-- Corridors -->
      <g transform="translate(78, 265) rotate(90)">
        <rect x="-10" y="-40" width="100" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="0" y="-25" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
      </g>
      <g transform="translate(640, 265) rotate(90)">
        <rect x="-10" y="-20" width="100" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="0" y="-5" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
      </g>
      <!-- Lifts -->
      <g>
        <rect x="220" y="55" width="40" height="25" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/>
        <text x="237" y="72" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text>
      </g>
      <g>
        <rect x="682" y="405" width="35" height="25" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/>
        <text x="699" y="422" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text>
      </g>
      
      <!-- WS Areas -->
      <g>
        <rect x="150" y="155" width="60" height="35" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="175" y="177" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      <g>
        <rect x="520" y="155" width="60" height="35" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="545" y="177" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      <g>
        <rect x="590" y="440" width="45" height="50" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="607" y="470" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <!-- Room groups with improved text visibility -->
      <!-- Left Column Rooms -->
      <g data-room-number="52"><rect x="30" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">52</text></g>
      <g data-room-number="51"><rect x="30" y="100" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="117.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">51</text></g>
      <g data-room-number="50"><rect x="30" y="150" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="167.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">50</text></g>
      <g data-room-number="49"><rect x="30" y="200" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="217.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">49</text></g>
      <g data-room-number="48"><rect x="30" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="267.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">48</text></g>
      <g data-room-number="47"><rect x="30" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="317.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">47</text></g>
      <g data-room-number="46"><rect x="30" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="367.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">46</text></g>
      <g data-room-number="45"><rect x="30" y="400" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="417.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">45</text></g>
      
      <!-- Top Row Rooms -->
      <g data-room-number="53"><rect x="170" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="187.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">53</text></g>
      <g data-room-number="54"><rect x="265" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="282.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">54</text></g>
      <g data-room-number="55"><rect x="315" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="332.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">55</text></g>
      <g data-room-number="56"><rect x="365" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="382.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">56</text></g>
      <g data-room-number="57"><rect x="415" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="432.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">57</text></g>
      <g data-room-number="58"><rect x="465" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="482.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">58</text></g>
      <g data-room-number="59"><rect x="515" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="532.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">59</text></g>
      <g data-room-number="60"><rect x="565" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="582.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">60</text></g>
      <g data-room-number="61"><rect x="682" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="67.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">61</text></g>
      
      <!-- Right Column Rooms -->
      <g data-room-number="62"><rect x="682" y="100" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="117.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">62</text></g>
      <g data-room-number="63"><rect x="682" y="150" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="167.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">63</text></g>
      <g data-room-number="64"><rect x="682" y="200" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="217.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">64</text></g>
      <g data-room-number="65"><rect x="682" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="267.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">65</text></g>
      <g data-room-number="66"><rect x="682" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="317.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">66</text></g>
      <g data-room-number="67"><rect x="682" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="367.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">67</text></g>
      <g data-room-number="68"><rect x="682" y="400" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="417.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">68</text></g>
      
      <!-- Rooms 69-73 -->
      <g data-room-number="69"><rect x="682" y="450" width="45" height="30" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="465" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">69</text></g>
      <g data-room-number="70"><rect x="682" y="485" width="45" height="30" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="500" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">70</text></g>
      <g data-room-number="71"><rect x="682" y="520" width="45" height="30" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="535" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">71</text></g>
      <g data-room-number="72"><rect x="682" y="555" width="45" height="30" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="570" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">72</text></g>
      <g data-room-number="73"><rect x="682" y="590" width="45" height="30" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="605" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">73</text></g>
      
      <!-- Inner rooms (left) -->
      <g data-room-number="42"><rect x="132" y="235" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="252.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">42</text></g>
      <g data-room-number="43"><rect x="132" y="325" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="342.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">43</text></g>
      <g data-room-number="44"><rect x="132" y="375" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="392.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">44</text></g>
      
      <!-- Inner rooms (top) -->
      <g data-room-number="41"><rect x="275" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="292.5" y="162.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">41</text></g>
      <g data-room-number="40"><rect x="325" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="342.5" y="162.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">40</text></g>
      <g data-room-number="39"><rect x="375" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="392.5" y="162.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">39</text></g>
      <g data-room-number="38"><rect x="425" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="442.5" y="162.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">38</text></g>
      
      <!-- Inner rooms (right) -->
      <g data-room-number="37"><rect x="590" y="235" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="252.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">37</text></g>
      <g data-room-number="36"><rect x="590" y="285" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="302.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">36</text></g>
      <g data-room-number="35"><rect x="590" y="335" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="352.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">35</text></g>
      <g data-room-number="34"><rect x="590" y="385" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="402.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">34</text></g>
      
      <!-- Inner right rooms -->
      <g data-room-number="76"><rect x="590" y="495" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="512.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">76</text></g>
      <g data-room-number="75"><rect x="590" y="535" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="552.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">75</text></g>
      <g data-room-number="74"><rect x="590" y="575" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="592.5" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">74</text></g>
  </svg>
`;

// SVG string for Phase 1 2nd Floor and other floors would follow
export const phase1SecondFloorSvgString = `
  <svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="798" height="648" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    <rect x="280" y="270" width="240" height="60" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="340" y="307" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 1-2nd Floor</text>
          <!-- Corridors -->
      <g transform="translate(78, 265) rotate(90)">
        <rect x="-50" y="-40" width="160" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="0" y="-25" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
      </g>
      <g transform="translate(640, 265) rotate(90)">
        <rect x="-50" y="-30" width="160" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="0" y="-15" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
      </g>
      
      <!-- Lifts -->
      <g>
        <rect x="233" y="55" width="45" height="25" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/>
        <text x="250" y="72" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text>
      </g>
      <g>
        <rect x="685" y="436" width="40" height="20" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/>
        <text x="690" y="450" fontSize="3" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text>
      </g>
      
      <!-- WS Areas -->
      <g>
        <rect x="150" y="155" width="60" height="35" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="175" y="177" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      <g>
        <rect x="563" y="155" width="60" height="35" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="588" y="177" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      <g>
        <rect x="590" y="440" width="45" height="80" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="607" y="480" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <!-- Left column rooms -->
      <g data-room-number="95"><rect x="30" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">95</text></g>
      <g data-room-number="94"><rect x="30" y="100" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="122.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">94</text></g>
      <g data-room-number="93"><rect x="30" y="150" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="172.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">93</text></g>
      <g data-room-number="92"><rect x="30" y="200" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="222.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">92</text></g>
      <g data-room-number="91"><rect x="30" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">91</text></g>
      <g data-room-number="90"><rect x="30" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="322.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">90</text></g>
      <g data-room-number="89"><rect x="30" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="372.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">89</text></g>
      <g data-room-number="88"><rect x="30" y="400" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="422.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">88</text></g>
      
      <!-- Top row rooms -->
      <g data-room-number="96"><rect x="183" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="200.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">96</text></g>
      <g data-room-number="97"><rect x="280" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="297.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">97</text></g>
      <g data-room-number="98"><rect x="330" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="347.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">98</text></g>
      <g data-room-number="99"><rect x="380" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="397.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">99</text></g>
      <g data-room-number="100"><rect x="430" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="447.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">100</text></g>
      <g data-room-number="101"><rect x="480" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="497.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">101</text></g>
      <g data-room-number="102"><rect x="530" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="547.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">102</text></g>
      <g data-room-number="103"><rect x="580" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="597.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">103</text></g>
      <g data-room-number="104"><rect x="682" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">104</text></g>
      
      <!-- Right column rooms -->
      <g data-room-number="105"><rect x="682" y="100" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="122.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">105</text></g>
      <g data-room-number="106"><rect x="682" y="150" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="172.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">106</text></g>
      <g data-room-number="107"><rect x="682" y="200" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="222.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">107</text></g>
      <g data-room-number="108"><rect x="682" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">108</text></g>
      <g data-room-number="109"><rect x="682" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="322.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">109</text></g>
      <g data-room-number="110"><rect x="682" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="372.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">110</text></g>
      <g data-room-number="111"><rect x="682" y="400" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="422.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">111</text></g>
      <g data-room-number="112"><rect x="682" y="460" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="482.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">112</text></g>
      <g data-room-number="112A"><rect x="682" y="500" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="522.5" fontSize="11" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">112A</text></g>
      <g data-room-number="114"><rect x="682" y="540" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="562.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">114</text></g>
      <g data-room-number="115"><rect x="682" y="580" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="602.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">115</text></g>
      <g data-room-number="116"><rect x="682" y="620" width="45" height="25" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="637.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">116</text></g>
      
      <!-- Inner rooms (left) -->
      <g data-room-number="85"><rect x="132" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">85</text></g>
      <g data-room-number="86"><rect x="132" y="340" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="362.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">86</text></g>
      <g data-room-number="87"><rect x="132" y="390" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="412.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">87</text></g>
      
      <!-- Inner rooms (top) -->
      <g data-room-number="84"><rect x="280" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="297.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">84</text></g>
      <g data-room-number="83"><rect x="330" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="347.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">83</text></g>
      <g data-room-number="82"><rect x="380" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="397.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">82</text></g>
      <g data-room-number="81"><rect x="430" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="447.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">81</text></g>
      
      <!-- Inner rooms (right) -->
      <g data-room-number="80"><rect x="590" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">80</text></g>
      <g data-room-number="79"><rect x="590" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="322.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">79</text></g>
      <g data-room-number="78"><rect x="590" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="372.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">78</text></g>
      <g data-room-number="77"><rect x="590" y="390" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="412.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">77</text></g>
      
      <!-- Inner rooms (bottom right) below WS -->
      <g data-room-number="119"><rect x="590" y="525" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="547.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">119</text></g>
      <g data-room-number="118"><rect x="590" y="570" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="592.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">118</text></g>
      <g data-room-number="117"><rect x="590" y="615" width="45" height="25" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="632.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">117</text></g>
  </svg>
`;

export const phase1ThirdFloorSvgString = `
  <svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="798" height="648" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    <rect x="280" y="270" width="240" height="60" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="340" y="307" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 1-3rd Floor</text>
          <!-- Corridors -->
      <g transform="translate(78, 265) rotate(90)">
        <rect x="-50" y="-40" width="120" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="-20" y="-25" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
      </g>
      <g transform="translate(640, 265) rotate(90)">
        <rect x="-50" y="-30" width="180" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="0" y="-15" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
      </g>
      
      <!-- Lifts -->
      <g>
        <rect x="233" y="55" width="45" height="25" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/>
        <text x="250" y="72" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text>
      </g>
      <g>
        <rect x="682" y="436" width="35" height="20" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/>
        <text x="688" y="450" fontSize="3" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text>
      </g>
      
      <!-- WS Areas -->
      <g>
        <rect x="150" y="155" width="70" height="35" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="175" y="177" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      <g>
        <rect x="563" y="155" width="70" height="35" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="588" y="177" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      <g>
        <rect x="590" y="440" width="45" height="80" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="607" y="480" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <!-- Left column rooms -->
      <g data-room-number="138"><rect x="30" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">138</text></g>
      <g data-room-number="137"><rect x="30" y="100" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="122.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">137</text></g>
      <g data-room-number="136"><rect x="30" y="150" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="172.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">136</text></g>
      <g data-room-number="135"><rect x="30" y="200" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="222.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">135</text></g>
      <g data-room-number="134"><rect x="30" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">134</text></g>
      <g data-room-number="133"><rect x="30" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="322.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">133</text></g>
      <g data-room-number="132"><rect x="30" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="372.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">132</text></g>
      <g data-room-number="131"><rect x="30" y="400" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="422.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">131</text></g>
      
      <!-- Top row rooms -->
      <g data-room-number="139"><rect x="183" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="200.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">139</text></g>
      <g data-room-number="140"><rect x="280" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="297.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">140</text></g>
      <g data-room-number="141"><rect x="330" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="347.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">141</text></g>
      <g data-room-number="142"><rect x="380" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="397.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">142</text></g>
      <g data-room-number="143"><rect x="430" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="447.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">143</text></g>
      <g data-room-number="144"><rect x="480" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="497.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">144</text></g>
      <g data-room-number="145"><rect x="530" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="547.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">145</text></g>
      <g data-room-number="146"><rect x="580" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="597.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">146</text></g>
      <g data-room-number="147"><rect x="682" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">147</text></g>
      
      <!-- Right column rooms -->
      <g data-room-number="148"><rectx="682" y="100" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="122.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">148</text></g>
      <g data-room-number="149"><rect x="682" y="150" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="172.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">149</text></g>
      <g data-room-number="150"><rect x="682" y="200" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="222.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">150</text></g>
      <g data-room-number="151"><rect x="682" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">151</text></g>
      <g data-room-number="152"><rect x="682" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="322.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">152</text></g>
      <g data-room-number="153"><rect x="682" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="372.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">153</text></g>
      <g data-room-number="154"><rect x="682" y="400" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="422.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">154</text></g>
      <g data-room-number="155"><rect x="682" y="460" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="482.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">155</text></g>
      <g data-room-number="156"><rect x="682" y="500" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="522.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">156</text></g>
      <g data-room-number="157"><rect x="682" y="540" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="562.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">157</text></g>
      <g data-room-number="158"><rect x="682" y="580" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="602.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">158</text></g>
      <g data-room-number="159"><rect x="682" y="620" width="45" height="25" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="637.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">159</text></g>
      
      <!-- Inner rooms (left) -->
      <g data-room-number="128"><rect x="132" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">128</text></g>
      <g data-room-number="129"><rect x="132" y="340" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="362.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">129</text></g>
      <g data-room-number="130"><rect x="132" y="390" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="412.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">130</text></g>
      
      <!-- Inner rooms (top) -->
      <g data-room-number="127"><rect x="280" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="297.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">127</text></g>
      <g data-room-number="126"><rect x="330" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="347.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">126</text></g>
      <g data-room-number="125"><rect x="380" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="397.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">125</text></g>
      <g data-room-number="124"><rect x="430" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="447.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">124</text></g>
      
      <!-- Inner rooms (right) -->
      <g data-room-number="123"><rect x="590" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">123</text></g>
      <g data-room-number="122"><rect x="590" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="322.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">122</text></g>
      <g data-room-number="121"><rect x="590" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="372.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">121</text></g>
      <g data-room-number="120"><rect x="590" y="390" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="412.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">120</text></g>
      
      <!-- Inner rooms (bottom right) below WS -->
      <g data-room-number="162"><rect x="590" y="525" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="547.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">162</text></g>
      <g data-room-number="161"><rect x="590" y="570" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="592.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">161</text></g>
      <g data-room-number="160"><rect x="590" y="615" width="45" height="25" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="632.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">160</text></g>
  </svg>
`;

export const phase1FourthFloorSvgString = `
  <svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="798" height="648" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    <rect x="280" y="270" width="240" height="60" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="330" y="307" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 1-4th Floor</text>
          <!-- Corridors -->
      <g transform="translate(78, 265) rotate(90)">
        <rect x="-50" y="-40" width="120" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="-20" y="-25" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
      </g>
      <g transform="translate(640, 310) rotate(90)">
        <rect x="-50" y="-30" width="180" height="20" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
        <text x="0" y="-15" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
      </g>
      
      <!-- Lifts -->
      <g>
        <rect x="233" y="55" width="45" height="25" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/>
        <text x="250" y="72" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text>
      </g>
      <g>
        <rect x="682" y="434" width="35" height="20" rx="4" fill="#a0aec0" stroke="#718096" strokeWidth="1"/>
        <text x="688" y="450" fontSize="3" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text>
      </g>
      
      <!-- WS Areas -->
      <g>
        <rect x="150" y="155" width="70" height="35" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="175" y="177" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      <g>
        <rect x="563" y="155" width="70" height="35" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="588" y="177" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      <g>
        <rect x="590" y="440" width="45" height="80" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1"/>
        <text x="607" y="480" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <!-- Left column rooms -->
      <g data-room-number="181"><rect x="30" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">181</text></g>
      <g data-room-number="180"><rect x="30" y="100" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="122.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">180</text></g>
      <g data-room-number="179"><rect x="30" y="150" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="172.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">179</text></g>
      <g data-room-number="178"><rect x="30" y="200" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="222.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">178</text></g>
      <g data-room-number="177"><rect x="30" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">177</text></g>
      <g data-room-number="176"><rect x="30" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="322.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">176</text></g>
      <g data-room-number="175"><rect x="30" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="372.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">175</text></g>
      <g data-room-number="174"><rect x="30" y="400" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="47.5" y="422.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">174</text></g>
      
      <!-- Top row rooms -->
      <g data-room-number="182"><rect x="183" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="200.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">182</text></g>
      <g data-room-number="183"><rect x="280" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="297.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">183</text></g>
      <g data-room-number="184"><rect x="330" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="347.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">184</text></g>
      <g data-room-number="185"><rect x="380" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="397.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">185</text></g>
      <g data-room-number="186"><rect x="430" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="447.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">186</text></g>
      <g data-room-number="187"><rect x="480" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="497.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">187</text></g>
      <g data-room-number="188"><rect x="530" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="547.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">188</text></g>
      <g data-room-number="189"><rect x="580" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="597.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">189</text></g>
      <g data-room-number="190"><rect x="682" y="50" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="72.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">190</text></g>
      
      <!-- Right column rooms -->
      <g data-room-number="191"><rect x="682" y="100" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="122.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">191</text></g>
      <g data-room-number="192"><rect x="682" y="150" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="172.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">192</text></g>
      <g data-room-number="193"><rect x="682" y="200" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="222.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">193</text></g>
      <g data-room-number="194"><rect x="682" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">194</text></g>
      <g data-room-number="195"><rect x="682" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="322.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">195</text></g>
      <g data-room-number="196"><rect x="682" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="372.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">196</text></g>
      <g data-room-number="197"><rect x="682" y="400" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="422.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">197</text></g>
      <g data-room-number="198"><rect x="682" y="460" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="482.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">198</text></g>
      <g data-room-number="199"><rect x="682" y="500" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="522.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">199</text></g>
      <g data-room-number="200"><rect x="682" y="540" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="562.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">200</text></g>
      <g data-room-number="201"><rect x="682" y="580" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="602.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">201</text></g>
      <g data-room-number="202"><rect x="682" y="620" width="45" height="25" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="699.5" y="637.5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">202</text></g>
      
      <!-- Inner rooms (left) -->
      <g data-room-number="171"><rect x="132" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">171</text></g>
      <g data-room-number="172"><rect x="132" y="340" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="362.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">172</text></g>
      <g data-room-number="173"><rect x="132" y="390" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="149.5" y="412.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">173</text></g>
      
      <!-- Inner rooms (top) -->
      <g data-room-number="170"><rect x="280" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="297.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">170</text></g>
      <g data-room-number="169"><rect x="330" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="347.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">169</text></g>
      <g data-room-number="168"><rect x="380" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="397.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">168</text></g>
      <g data-room-number="167"><rect x="430" y="145" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="447.5" y="167.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">167</text></g>
      
      <!-- Inner rooms (right) -->
      <g data-room-number="166"><rect x="590" y="250" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="272.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">166</text></g>
      <g data-room-number="165"><rect x="590" y="300" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="322.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">165</text></g>
      <g data-room-number="164"><rect x="590" y="350" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="372.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">164</text></g>
      <g data-room-number="163"><rect x="590" y="390" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="412.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">163</text></g>
      
      <!-- Inner rooms (bottom right) below WS -->
      <g data-room-number="205"><rect x="590" y="525" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="547.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">205</text></g>
      <g data-room-number="204"><rect x="590" y="570" width="45" height="35" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="592.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">204</text></g>
      <g data-room-number="203"><rect x="590" y="615" width="45" height="25" rx="4" fill="#86efac" stroke="#1976d2" strokeWidth="1"/><text x="607.5" y="632.5" fontSize="12" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">203</text></g>
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
    
    // Apply visual updates based on selectedBlock and selectedFloor
    if (selectedBlock === 'Phase 1' && selectedFloor === floor) {
      // Highlight the selected floor's SVG container
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
      // Skip warden room (33)
      if (room.getAttribute('data-room-number') === '33') return;
      
      const roomNumber = room.getAttribute('data-room-number') || '';
      const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
      const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
      
      // If neither bed is occupied, set to available (green)
      if (!occupiedBeds[bedAKey] && !occupiedBeds[bedBKey]) {
        const bedRect = room.querySelector('rect');
        if (bedRect) {
          bedRect.setAttribute('fill', '#bbf7d0'); // Green-200 for available
          bedRect.setAttribute('stroke', '#22c55e'); // Green-500
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

export default Phase1FloorPlan;