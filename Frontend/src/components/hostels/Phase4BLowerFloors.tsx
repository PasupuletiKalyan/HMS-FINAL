import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 4B configuration for lower floors (Ground to 5th)
export const phase4BLowerConfig: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 30, exceptions: [] },
  "1st Floor": { start: 101, end: 130, exceptions: [] },
  "2nd Floor": { start: 201, end: 230, exceptions: [] },
  "3rd Floor": { start: 301, end: 330, exceptions: [] },
  "4th Floor": { start: 401, end: 430, exceptions: [] },
  "5th Floor": { start: 501, end: 530, exceptions: [] }
};

// SVG string for Phase 4B Ground Floor
export const phase4BGroundFloorSvgString = `
  <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
    
    <!-- Title -->
    <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
    <text x="240" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B Ground Floor</text>
    
    <!-- Top Right Vertical Section -->
    <g>
      <rect x="600" y="60" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
      <text x="610" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
    </g>
    
    <g data-room-number="8">
      <rect x="720" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="750" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">8</text>
    </g>
    
    <g data-room-number="9">
      <rect x="720" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="750" y="135" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">9</text>
    </g>
    
    <g data-room-number="7">
      <rect x="600" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="630" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">7</text>
    </g>
    
    <g data-room-number="10">
      <rect x="720" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="750" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">10</text>
    </g>
    
    <g data-room-number="6">
      <rect x="600" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="630" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">6</text>
    </g>
    
    <g data-room-number="11">
      <rect x="720" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="750" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">11</text>
    </g>
    
    <!-- Vertical Corridor Text -->
    <g transform="translate(680, 280) rotate(90)">
      <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
    </g>
    
    <g data-room-number="12">
      <rect x="720" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="750" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">12</text>
    </g>
    
    <g data-room-number="13">
      <rect x="720" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="750" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">13</text>
    </g>
    
    <g>
      <rect x="600" y="360" width="60" height="120" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
      <text x="630" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
    </g>
    
    <g data-room-number="14">
      <rect x="720" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="750" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">14</text>
    </g>
    
    <g data-room-number="15">
      <rect x="720" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="750" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">15</text>
    </g>
    
    <!-- Middle Connection -->
    <g data-room-number="16">
      <rect x="720" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="750" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">16</text>
    </g>
    
    <g>
      <rect x="600" y="520" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
      <text x="630" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
    </g>
    
    <g>
      <rect x="500" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
      <text x="540" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Lift</text>
    </g>
    
    <!-- Bottom Horizontal Section -->
    <g>
      <rect x="40" y="520" width="80" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
      <text x="80" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
    </g>
    
    <g data-room-number="1">
      <rect x="130" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="160" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">1</text>
    </g>
    
    <g data-room-number="2">
      <rect x="200" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="230" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">2</text>
    </g>
    
    <!-- Gap in the layout -->
    
    <g data-room-number="3">
      <rect x="270" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="300" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">3</text>
    </g>
    
    <g data-room-number="4">
      <rect x="340" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="370" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">4</text>
    </g>
    
    <g data-room-number="5">
      <rect x="410" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="440" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">5</text>
    </g>
    
    <!-- Corridor Label -->
    <text x="400" y="590" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
    
    <!-- Study Lounge -->
    <g>
      <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
      <text x="590" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
    </g>
    
    <g data-room-number="17">
      <rect x="410" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="440" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">17</text>
    </g>
    
    <g data-room-number="18">
      <rect x="340" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="370" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">18</text>
    </g>
    
    <g data-room-number="19">
      <rect x="270" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="300" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">19</text>
    </g>
    
    <!-- Gap in the layout -->
    
    <g data-room-number="20">
      <rect x="200" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="230" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">20</text>
    </g>
    
    <g data-room-number="21">
      <rect x="130" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">21</text>
    </g>
    
    <g data-room-number="22">
      <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
      <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">22</text>
    </g>
  </svg>
`;

// SVG string for Phase 4B 2nd Floor
export const phase4BSecondFloorSvgString = `
 <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
   
   <!-- Title -->
   <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
   <text x="270" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 2nd Floor</text>
         <!-- Top Right Vertical Section -->
      <g>
        <rect x="600" y="60" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="208">
        <rect x="720" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">208</text>
      </g>
      
      <g data-room-number="209">
        <rect x="720" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="135" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">209</text>
      </g>
      
      <g data-room-number="207">
        <rect x="600" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">207</text>
      </g>
      
      <g data-room-number="210">
        <rect x="720" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">210</text>
      </g>
      
      <g data-room-number="206">
        <rect x="600" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">206</text>
      </g>
      
      <g data-room-number="211">
        <rect x="720" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">211</text>
      </g>
      
      <!-- Vertical Corridor Text -->
      <g transform="translate(680, 280) rotate(90)">
        <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      </g>
      
      <g data-room-number="212">
        <rect x="720" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">212</text>
      </g>
      
      <g data-room-number="213">
        <rect x="720" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">213</text>
      </g>
      
      <g>
        <rect x="600" y="360" width="60" height="120" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
        <text x="620" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <g data-room-number="214">
        <rect x="720" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">214</text>
      </g>
      
      <g data-room-number="215">
        <rect x="720" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">215</text>
      </g>
      
      <!-- Middle Connection -->
      <g data-room-number="216">
        <rect x="720" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">216</text>
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
      
      <g data-room-number="201">
        <rect x="130" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">201</text>
      </g>
      
      <g data-room-number="202">
        <rect x="200" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="210" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">202</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="203">
        <rect x="270" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">203</text>
      </g>
      
      <g data-room-number="204">
        <rect x="340" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">204</text>
      </g>
      
      <g data-room-number="205">
        <rect x="410" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">205</text>
      </g>
      
      <!-- Corridor Label -->
      <text x="400" y="590" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      
      <!-- Study Lounge -->
      <g>
        <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="550" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
      </g>
      
      <g data-room-number="217">
        <rect x="410" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">217</text>
      </g>
      
      <g data-room-number="218">
        <rect x="340" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">218</text>
      </g>
      
      <g data-room-number="219">
        <rect x="270" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">219</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="220">
        <rect x="200" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">220</text>
      </g>
      
      <g data-room-number="221">
        <rect x="130" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">221</text>
      </g>
      
      <g data-room-number="222">
        <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">222</text>
      </g>
 </svg>
`;

export const phase4B3rdFloorSvgString = `
  <!-- SVG content for 3rd floor -->
      <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
      
      <!-- Title -->
      <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
      <text x="270" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 3rd Floor</text>
      
      <!-- Top Right Vertical Section -->
      <g>
        <rect x="600" y="60" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="308">
        <rect x="720" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">308</text>
      </g>
      
      <g data-room-number="309">
        <rect x="720" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="135" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">309</text>
      </g>
      
      <g data-room-number="307">
        <rect x="600" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">307</text>
      </g>
      
      <g data-room-number="310">
        <rect x="720" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">310</text>
      </g>
      
      <g data-room-number="306">
        <rect x="600" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">306</text>
      </g>
      
      <g data-room-number="311">
        <rect x="720" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">311</text>
      </g>
      
      <!-- Vertical Corridor Text -->
      <g transform="translate(680, 280) rotate(90)">
        <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      </g>
      
      <g data-room-number="312">
        <rect x="720" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">312</text>
      </g>
      
      <g data-room-number="313">
        <rect x="720" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">313</text>
      </g>
      
      <g>
        <rect x="600" y="360" width="60" height="120" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
        <text x="620" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <g data-room-number="314">
        <rect x="720" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">314</text>
      </g>
      
      <g data-room-number="315">
        <rect x="720" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">315</text>
      </g>
      
      <!-- Middle Connection -->
      <g data-room-number="316">
        <rect x="720" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">316</text>
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
      
      <g data-room-number="301">
        <rect x="130" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">301</text>
      </g>
      
      <g data-room-number="302">
        <rect x="200" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">302</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="303">
        <rect x="270" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="300" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">303</text>
      </g>
      
      <g data-room-number="304">
        <rect x="340" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">304</text>
      </g>
      
      <g data-room-number="305">
        <rect x="410" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">305</text>
      </g>
      
      <!-- Corridor Label -->
      <text x="400" y="590" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      
      <!-- Study Lounge -->
      <g>
        <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="550" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
      </g>
      
      <g data-room-number="317">
        <rect x="410" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">317</text>
      </g>
      
      <g data-room-number="318">
        <rect x="340" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">318</text>
      </g>
      
      <g data-room-number="319">
        <rect x="270" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">319</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="320">
        <rect x="200" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="230" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">320</text>
      </g>
      
      <g data-room-number="321">
        <rect x="130" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">321</text>
      </g>
      
      <g data-room-number="322">
        <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">322</text>
      </g>
    </svg>
`;

export const phase4B4thFloorSvgString = `
  <!-- SVG content for 4th floor -->
      <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
      
      <!-- Title -->
      <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
      <text x="250" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 4th Floor</text>
      
      <!-- Top Right Vertical Section -->
      <g>
        <rect x="600" y="60" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="408">
        <rect x="720" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">408</text>
      </g>
      
      <g data-room-number="409">
        <rect x="720" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="135" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">409</text>
      </g>
      
      <g data-room-number="407">
        <rect x="600" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">407</text>
      </g>
      
      <g data-room-number="410">
        <rect x="720" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">410</text>
      </g>
      
      <g data-room-number="406">
        <rect x="600" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">406</text>
      </g>
      
      <g data-room-number="411">
        <rect x="720" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">411</text>
      </g>
      
      <!-- Vertical Corridor Text -->
      <g transform="translate(680, 280) rotate(90)">
        <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      </g>
      
      <g data-room-number="412">
        <rect x="720" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">412</text>
      </g>
      
      <g data-room-number="413">
        <rect x="720" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">413</text>
      </g>
      
      <g>
        <rect x="600" y="360" width="60" height="120" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
        <text x="620" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <g data-room-number="414">
        <rect x="720" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">414</text>
      </g>
      
      <g data-room-number="415">
        <rect x="720" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">415</text>
      </g>
      
      <!-- Middle Connection -->
      <g data-room-number="416">
        <rect x="720" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">416</text>
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
      
      <g data-room-number="401">
        <rect x="130" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">401</text>
      </g>
      
      <g data-room-number="402">
        <rect x="200" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="230" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">402</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="403">
        <rect x="270" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">403</text>
      </g>
      
      <g data-room-number="404">
        <rect x="340" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">404</text>
      </g>
      
      <g data-room-number="405">
        <rect x="410" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">405</text>
      </g>
      
      <!-- Corridor Label -->
      <text x="400" y="590" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      
      <!-- Study Lounge -->
      <g>
        <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="550" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
      </g>
      
      <g data-room-number="417">
        <rect x="410" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">417</text>
      </g>
      
      <g data-room-number="418">
        <rect x="340" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">418</text>
      </g>
      
      <g data-room-number="419">
        <rect x="270" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">419</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="420">
        <rect x="200" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">420</text>
      </g>
      
      <g data-room-number="421">
        <rect x="130" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">421</text>
      </g>
      
      <g data-room-number="422">
        <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">422</text>
      </g>
    </svg>
`;

export const phase4B5thFloorSvgString = `
  <!-- SVG content for 5th floor -->
      <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">      
      <!-- Title -->
      <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
      <text x="270" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 5th Floor</text>
      
      <!-- Top Right Vertical Section -->
      <g>
        <rect x="600" y="60" width="60" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="610" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Stairs</text>
      </g>
      
      <g data-room-number="508">
        <rect x="720" y="60" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="85" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">508</text>
      </g>
      
      <g data-room-number="509">
        <rect x="720" y="110" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="135" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">509</text>
      </g>
      
      <g data-room-number="507">
        <rect x="600" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">507</text>
      </g>
      
      <g data-room-number="510">
        <rect x="720" y="160" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="185" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">510</text>
      </g>
      
      <g data-room-number="506">
        <rect x="600" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="620" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">506</text>
      </g>
      
      <g data-room-number="511">
        <rect x="720" y="210" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="235" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">511</text>
      </g>
      
      <!-- Vertical Corridor Text -->
      <g transform="translate(680, 280) rotate(90)">
        <text x="0" y="0" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      </g>
      
      <g data-room-number="512">
        <rect x="720" y="260" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="285" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">512</text>
      </g>
      
      <g data-room-number="513">
        <rect x="720" y="310" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="335" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">513</text>
      </g>
      
      <g>
        <rect x="600" y="360" width="60" height="120" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="2" />
        <text x="620" y="425" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
      </g>
      
      <g data-room-number="514">
        <rect x="720" y="410" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="435" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">514</text>
      </g>
      
      <g data-room-number="515">
        <rect x="720" y="460" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="485" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">515</text>
      </g>
      
      <!-- Middle Connection -->
      <g data-room-number="516">
        <rect x="720" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="730" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">516</text>
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
      
      <g data-room-number="501">
        <rect x="130" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">501</text>
      </g>
      
      <g data-room-number="502">
        <rect x="200" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="220" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">502</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="503">
        <rect x="270" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">503</text>
      </g>
      
      <g data-room-number="504">
        <rect x="340" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">504</text>
      </g>
      
      <g data-room-number="505">
        <rect x="410" y="520" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="545" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">505</text>
      </g>
      
      <!-- Corridor Label -->
      <text x="400" y="590" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
      
      <!-- Study Lounge -->
      <g>
        <rect x="500" y="620" width="180" height="40" rx="4" fill="#d3d3d3" stroke="black" strokeWidth="2" />
        <text x="560" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif" fill="black">Study Lounge</text>
      </g>
      
      <g data-room-number="517">
        <rect x="410" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="430" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">517</text>
      </g>
      
      <g data-room-number="518">
        <rect x="340" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="360" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">518</text>
      </g>
      
      <g data-room-number="519">
        <rect x="270" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="290" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">519</text>
      </g>
      
      <!-- Gap in the layout -->
      
      <g data-room-number="520">
        <rect x="200" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="230" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">520</text>
      </g>
      
      <g data-room-number="521">
        <rect x="130" y="620" width="60" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="160" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">521</text>
      </g>
      
      <g data-room-number="522">
        <rect x="40" y="620" width="80" height="40" rx="4" fill="#86efac" stroke="black" strokeWidth="2" />
        <text x="80" y="645" fontSize="12" textAnchor="middle" fontFamily="Inter, sans-serif">522</text>
      </g>
    </svg>
`;

// Component for rendering Phase 4B floors (Ground to 5th)
const Phase4BLowerFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase4BLowerConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For specific floors, use SVG rendering
  let svgString = '';
  switch(floor) {
    case 'Ground Floor':
      svgString = phase4BGroundFloorSvgString;
      break;
    case '2nd Floor':
      svgString = phase4BSecondFloorSvgString;
      break;
    case '3rd Floor':
      svgString = phase4B3rdFloorSvgString;
      break;
    case '4th Floor':
      svgString = phase4B4thFloorSvgString;
      break;
    case '5th Floor':
      svgString = phase4B5thFloorSvgString;
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

export default Phase4BLowerFloorPlan;