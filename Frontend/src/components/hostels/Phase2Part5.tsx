import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';
import Phase2Part5HigherFloors from './Phase2Part5HigherFloors';

// Phase 2 Part 5 configuration
export const phase2Part5Config: Record<string, FloorConfig> = {
  "Ground Floor": { start: 54, end: 70, exceptions: [] },
  "1st Floor": { start: 101, end: 130, exceptions: [] },
  "2nd Floor": { start: 201, end: 230, exceptions: [] },
  "3rd Floor": { start: 301, end: 330, exceptions: [] },
  "4th Floor": { start: 401, end: 430, exceptions: [] },
  "5th Floor": { start: 501, end: 530, exceptions: [] },
  "6th Floor": { start: 601, end: 630, exceptions: [] },
  "7th Floor": { start: 701, end: 730, exceptions: [] },
  "8th Floor": { start: 801, end: 830, exceptions: [] },
  "9th Floor": { start: 901, end: 930, exceptions: [] },
  "10th Floor": { start: 1001, end: 1030, exceptions: [] },
  "11th Floor": { start: 1101, end: 1130, exceptions: [] },
  "12th Floor": { start: 1201, end: 1230, exceptions: [] }
};

// Ground Floor layout configuration for Phase 2 Part 5
const groundFloorElements = [
  // Left Column Rooms & Areas
  { id: 'G70', x: 10, y: 10, width: 50, height: 40, type: 'room', roomNumber: 70 },
  { id: 'G69', x: 10, y: 60, width: 50, height: 40, type: 'room', roomNumber: 69 },
  { id: 'G68', x: 10, y: 110, width: 50, height: 40, type: 'room', roomNumber: 68 },
  { id: 'G67', x: 10, y: 160, width: 50, height: 40, type: 'room', roomNumber: 67 },
  { id: 'G66', x: 10, y: 210, width: 50, height: 40, type: 'room', roomNumber: 66 },
  { id: 'G65', x: 10, y: 260, width: 50, height: 40, type: 'room', roomNumber: 65 },
  { id: 'Lifts', x: 10, y: 310, width: 50, height: 60, type: 'common' },
  { id: 'Stairs', x: 10, y: 400, width: 50, height: 60, type: 'common' },
  { id: 'WS', x: 10, y: 470, width: 50, height: 80, type: 'common' },

  // Right Column Rooms & Areas
  { id: 'WR', x: 120, y: 10, width: 50, height: 40, type: 'common' },
  { id: 'G54', x: 120, y: 60, width: 50, height: 40, type: 'room', roomNumber: 54 },
  { id: 'G55', x: 120, y: 110, width: 50, height: 40, type: 'room', roomNumber: 55 },
  { id: 'G56', x: 120, y: 160, width: 50, height: 40, type: 'room', roomNumber: 56 },
  { id: 'G57', x: 120, y: 210, width: 50, height: 40, type: 'room', roomNumber: 57 },
  { id: 'G58', x: 120, y: 260, width: 50, height: 40, type: 'room', roomNumber: 58 },
  { id: 'G59', x: 120, y: 310, width: 50, height: 40, type: 'room', roomNumber: 59 },
  { id: 'G60', x: 120, y: 360, width: 50, height: 40, type: 'room', roomNumber: 60 },
  { id: 'G61', x: 120, y: 410, width: 50, height: 40, type: 'room', roomNumber: 61 },
  { id: 'G62', x: 120, y: 460, width: 50, height: 40, type: 'room', roomNumber: 62 },
  { id: 'G63', x: 120, y: 510, width: 50, height: 40, type: 'room', roomNumber: 63 },
  { id: 'G64', x: 120, y: 560, width: 50, height: 40, type: 'room', roomNumber: 64 },

  // Corridor Label
  { id: 'Corridor', x: 90, y: 300, label: 'Corridor', type: 'label', rotation: -90 },

  // Entry Indicator (Label + Arrow)
  { id: 'Entry Label', x: -30, y: 385, label: 'Entry', type: 'label', rotation: 0 },
  { id: 'Entry Arrow', type: 'arrow', x1: -5, y1: 385, x2: 10, y2: 385 },
];

// First Floor layout configuration for Phase 2 Part 5
const firstFloorElements = [
  // Left Column Rooms & Areas
  { id: '171', x: 10, y: 10, width: 50, height: 40, type: 'room', roomNumber: 171 },
  { id: '170', x: 10, y: 60, width: 50, height: 40, type: 'room', roomNumber: 170 },
  { id: '169', x: 10, y: 110, width: 50, height: 40, type: 'room', roomNumber: 169 },
  { id: '168', x: 10, y: 160, width: 50, height: 40, type: 'room', roomNumber: 168 },
  { id: '167', x: 10, y: 210, width: 50, height: 40, type: 'room', roomNumber: 167 },
  { id: '166', x: 10, y: 260, width: 50, height: 40, type: 'room', roomNumber: 166 },
  { id: 'Lifts', x: 10, y: 310, width: 50, height: 60, type: 'common' },
  { id: 'Stairs', x: 10, y: 400, width: 50, height: 60, type: 'common' },
  { id: 'WS', x: 10, y: 470, width: 50, height: 100, type: 'common' },

  // Right Column Rooms & Areas
  { id: '154', x: 120, y: 10, width: 50, height: 40, type: 'room', roomNumber: 154 },
  { id: '155', x: 120, y: 60, width: 50, height: 40, type: 'room', roomNumber: 155 },
  { id: '156', x: 120, y: 110, width: 50, height: 40, type: 'room', roomNumber: 156 },
  { id: '157', x: 120, y: 160, width: 50, height: 40, type: 'room', roomNumber: 157 },
  { id: '158', x: 120, y: 210, width: 50, height: 40, type: 'room', roomNumber: 158 },
  { id: '159', x: 120, y: 260, width: 50, height: 40, type: 'room', roomNumber: 159 },
  { id: '160', x: 120, y: 310, width: 50, height: 40, type: 'room', roomNumber: 160 },
  { id: '161', x: 120, y: 360, width: 50, height: 40, type: 'room', roomNumber: 161 },
  { id: '162', x: 120, y: 410, width: 50, height: 40, type: 'room', roomNumber: 162 },
  { id: '163', x: 120, y: 460, width: 50, height: 40, type: 'room', roomNumber: 163 },
  { id: '164', x: 120, y: 510, width: 50, height: 40, type: 'room', roomNumber: 164 },
  { id: '165', x: 120, y: 560, width: 50, height: 40, type: 'room', roomNumber: 165 },

  // Corridor Label
  { id: 'Corridor', x: 90, y: 350, label: 'Corridor', type: 'label', rotation: -90 },
];

// Function to create floor layout elements based on first floor structure with different room numbers
const createFloorElements = (floorPrefix: number) => {
  return [
    // Left Column Rooms & Areas
    { id: `${floorPrefix}71`, x: 10, y: 10, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 71 },
    { id: `${floorPrefix}70`, x: 10, y: 60, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 70 },
    { id: `${floorPrefix}69`, x: 10, y: 110, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 69 },
    { id: `${floorPrefix}68`, x: 10, y: 160, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 68 },
    { id: `${floorPrefix}67`, x: 10, y: 210, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 67 },
    { id: `${floorPrefix}66`, x: 10, y: 260, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 66 },
    { id: 'Lifts', x: 10, y: 310, width: 50, height: 60, type: 'common' },
    { id: 'Stairs', x: 10, y: 400, width: 50, height: 60, type: 'common' },
    { id: 'WS', x: 10, y: 470, width: 50, height: 100, type: 'common' },

    // Right Column Rooms & Areas
    { id: `${floorPrefix}54`, x: 120, y: 10, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 54 },
    { id: `${floorPrefix}55`, x: 120, y: 60, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 55 },
    { id: `${floorPrefix}56`, x: 120, y: 110, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 56 },
    { id: `${floorPrefix}57`, x: 120, y: 160, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 57 },
    { id: `${floorPrefix}58`, x: 120, y: 210, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 58 },
    { id: `${floorPrefix}59`, x: 120, y: 260, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 59 },
    { id: `${floorPrefix}60`, x: 120, y: 310, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 60 },
    { id: `${floorPrefix}61`, x: 120, y: 360, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 61 },
    { id: `${floorPrefix}62`, x: 120, y: 410, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 62 },
    { id: `${floorPrefix}63`, x: 120, y: 460, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 63 },
    { id: `${floorPrefix}64`, x: 120, y: 510, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 64 },
    { id: `${floorPrefix}65`, x: 120, y: 560, width: 50, height: 40, type: 'room', roomNumber: floorPrefix * 100 + 65 },

    // Corridor Label
    { id: 'Corridor', x: 90, y: 350, label: 'Corridor', type: 'label', rotation: -90 },
  ];
};

// Define 5th floor layout elements
const fifthFloorElements = createFloorElements(5);

// Define 6th floor layout elements
const sixthFloorElements = createFloorElements(6);

// Define 7th floor layout elements
const seventhFloorElements = [
  // Column 1 (Left)
  { id: '767', x: 10, y: 10, width: 40, height: 30, type: 'room', roomNumber: 767 },
  { id: '766', x: 10, y: 45, width: 40, height: 30, type: 'room', roomNumber: 766 },
  { id: '765', x: 10, y: 80, width: 40, height: 30, type: 'room', roomNumber: 765 },
  { id: '764', x: 10, y: 115, width: 40, height: 30, type: 'room', roomNumber: 764 },
  { id: '763', x: 10, y: 150, width: 40, height: 30, type: 'room', roomNumber: 763 },
  { id: 'Lifts', x: 10, y: 185, width: 40, height: 30, type: 'common' },
  { id: 'Stairs', x: 10, y: 220, width: 40, height: 30, type: 'common' },
  { id: 'WS', x: 10, y: 255, width: 40, height: 60, type: 'common' },

  // Column 2 (Right)
  { id: '752', x: 85, y: 10, width: 40, height: 30, type: 'room', roomNumber: 752 },
  { id: '753', x: 85, y: 45, width: 40, height: 30, type: 'room', roomNumber: 753 },
  { id: '754', x: 85, y: 80, width: 40, height: 30, type: 'room', roomNumber: 754 },
  { id: '755', x: 85, y: 115, width: 40, height: 30, type: 'room', roomNumber: 755 },
  { id: '756', x: 85, y: 150, width: 40, height: 30, type: 'room', roomNumber: 756 },
  { id: '757', x: 85, y: 185, width: 40, height: 30, type: 'room', roomNumber: 757 },
  { id: '758', x: 85, y: 220, width: 40, height: 30, type: 'room', roomNumber: 758 },
  { id: '759', x: 85, y: 255, width: 40, height: 30, type: 'room', roomNumber: 759 },
  { id: '760', x: 85, y: 290, width: 40, height: 30, type: 'room', roomNumber: 760 },
  { id: '761', x: 85, y: 325, width: 40, height: 30, type: 'room', roomNumber: 761 },
  { id: '762', x: 85, y: 360, width: 40, height: 30, type: 'room', roomNumber: 762 },

  // Corridor Label
  { id: 'Corridor', x: 65, y: 200, label: 'Corridor', type: 'label', rotation: -90 },
];

// Define 8th floor layout elements
const eighthFloorElements = [
  // Column 1 (Left)
  { id: '858', x: 10, y: 10, width: 40, height: 40, type: 'room', roomNumber: 858 },
  { id: '857', x: 10, y: 60, width: 40, height: 40, type: 'room', roomNumber: 857 },
  { id: '856', x: 10, y: 110, width: 40, height: 40, type: 'room', roomNumber: 856 },
  { id: '855', x: 10, y: 160, width: 40, height: 40, type: 'room', roomNumber: 855 },
  { id: '854', x: 10, y: 210, width: 40, height: 40, type: 'room', roomNumber: 854 },
  { id: 'Lifts', x: 10, y: 260, width: 40, height: 60, type: 'common' },
  { id: 'Stairs', x: 10, y: 330, width: 40, height: 60, type: 'common' },
  { id: 'WS', x: 10, y: 400, width: 40, height: 80, type: 'common' },

  // Column 2 (Right)
  { id: '845', x: 85, y: 10, width: 40, height: 40, type: 'room', roomNumber: 845 },
  { id: '846', x: 85, y: 60, width: 40, height: 40, type: 'room', roomNumber: 846 },
  { id: 'Balco', x: 85, y: 110, width: 40, height: 90, type: 'common', label: 'Balcony' },
  { id: '847', x: 85, y: 210, width: 40, height: 40, type: 'room', roomNumber: 847 },
  { id: '848', x: 85, y: 260, width: 40, height: 40, type: 'room', roomNumber: 848 },
  { id: '849', x: 85, y: 310, width: 40, height: 40, type: 'room', roomNumber: 849 },
  { id: '850', x: 85, y: 360, width: 40, height: 40, type: 'room', roomNumber: 850 },
  { id: '851', x: 85, y: 410, width: 40, height: 40, type: 'room', roomNumber: 851 },
  { id: '852', x: 85, y: 460, width: 40, height: 40, type: 'room', roomNumber: 852 },
  { id: '853', x: 85, y: 510, width: 40, height: 40, type: 'room', roomNumber: 853 },

  // Corridor Label
  { id: 'Corridor', x: 67.5, y: 280, label: 'Corridor', type: 'label', rotation: -90 },
];

// Define 9th floor layout elements
const ninthFloorElements = [
  // Column 1 (Left)
  { id: '956', x: 10, y: 10, width: 40, height: 40, type: 'room', roomNumber: 956 },
  { id: '955', x: 10, y: 60, width: 40, height: 40, type: 'room', roomNumber: 955 },
  { id: '954', x: 10, y: 110, width: 40, height: 40, type: 'room', roomNumber: 954 },
  { id: '953', x: 10, y: 160, width: 40, height: 40, type: 'room', roomNumber: 953 },
  { id: '952', x: 10, y: 210, width: 40, height: 40, type: 'room', roomNumber: 952 },
  { id: 'Lifts', x: 10, y: 260, width: 40, height: 60, type: 'common' },
  { id: 'Stairs', x: 10, y: 330, width: 40, height: 60, type: 'common' },
  { id: 'WS', x: 10, y: 400, width: 40, height: 80, type: 'common' },

  // Column 2 (Right)
  { id: '943', x: 85, y: 10, width: 40, height: 40, type: 'room', roomNumber: 943 },
  { id: '944', x: 85, y: 60, width: 40, height: 40, type: 'room', roomNumber: 944 },
  { id: '945', x: 85, y: 210, width: 40, height: 40, type: 'room', roomNumber: 945 },
  { id: '946', x: 85, y: 260, width: 40, height: 40, type: 'room', roomNumber: 946 },
  { id: '947', x: 85, y: 310, width: 40, height: 40, type: 'room', roomNumber: 947 },
  { id: '948', x: 85, y: 360, width: 40, height: 40, type: 'room', roomNumber: 948 },
  { id: '949', x: 85, y: 410, width: 40, height: 40, type: 'room', roomNumber: 949 },
  { id: '950', x: 85, y: 460, width: 40, height: 40, type: 'room', roomNumber: 950 },
  { id: '951', x: 85, y: 510, width: 40, height: 40, type: 'room', roomNumber: 951 },

  // Corridor Label
  { id: 'Corridor', x: 67.5, y: 280, label: 'Corridor', type: 'label', rotation: -90 },
];

// Define 10th floor layout elements
const tenthFloorElements = [
  // Column 1 (Left)
  { id: '1055', x: 10, y: 10, width: 40, height: 40, type: 'room', roomNumber: 1055 },
  { id: '1054', x: 10, y: 60, width: 40, height: 40, type: 'room', roomNumber: 1054 },
  { id: '1053', x: 10, y: 110, width: 40, height: 40, type: 'room', roomNumber: 1053 },
  { id: '1052', x: 10, y: 160, width: 40, height: 40, type: 'room', roomNumber: 1052 },
  { id: '1051', x: 10, y: 210, width: 40, height: 40, type: 'room', roomNumber: 1051 },
  { id: 'Lifts', x: 10, y: 260, width: 40, height: 60, type: 'common' },
  { id: 'Stairs', x: 10, y: 330, width: 40, height: 60, type: 'common' },
  { id: 'WS', x: 10, y: 400, width: 40, height: 80, type: 'common' },

  // Column 2 (Right)
  { id: '1043', x: 85, y: 10, width: 40, height: 40, type: 'room', roomNumber: 1043 },
  { id: '1044', x: 85, y: 60, width: 40, height: 40, type: 'room', roomNumber: 1044 },
  { id: '1045', x: 85, y: 210, width: 40, height: 40, type: 'room', roomNumber: 1045 },
  { id: '1046', x: 85, y: 260, width: 40, height: 40, type: 'room', roomNumber: 1046 },
  { id: '1047', x: 85, y: 310, width: 40, height: 40, type: 'room', roomNumber: 1047 },
  { id: '1048', x: 85, y: 360, width: 40, height: 40, type: 'room', roomNumber: 1048 },
  { id: '1049', x: 85, y: 410, width: 40, height: 40, type: 'room', roomNumber: 1049 },
  { id: '1050', x: 85, y: 460, width: 40, height: 40, type: 'room', roomNumber: 1050 },

  // Corridor Label
  { id: 'Corridor', x: 67.5, y: 280, label: 'Corridor', type: 'label', rotation: -90 },
];

// Define 11th floor layout elements
const eleventhFloorElements = [
  // Column 1 (Left)
  { id: '1164', x: 10, y: 10, width: 40, height: 40, type: 'room', roomNumber: 1164 },
  { id: '1163', x: 10, y: 60, width: 40, height: 40, type: 'room', roomNumber: 1163 },
  { id: '1162', x: 10, y: 110, width: 40, height: 40, type: 'room', roomNumber: 1162 },
  { id: '1161', x: 10, y: 160, width: 40, height: 40, type: 'room', roomNumber: 1161 },
  { id: '1160', x: 10, y: 210, width: 40, height: 40, type: 'room', roomNumber: 1160 },
  { id: 'Lifts', x: 10, y: 260, width: 40, height: 60, type: 'common' },
  { id: 'Stairs', x: 10, y: 330, width: 40, height: 60, type: 'common' },
  { id: 'WS', x: 10, y: 400, width: 40, height: 80, type: 'common' },

  // Column 2 (Right)
  { id: '1150', x: 85, y: 10, width: 40, height: 40, type: 'room', roomNumber: 1150 },
  { id: '1151', x: 85, y: 60, width: 40, height: 40, type: 'room', roomNumber: 1151 },
  { id: '1152', x: 85, y: 110, width: 40, height: 40, type: 'room', roomNumber: 1152 },
  { id: '1153', x: 85, y: 160, width: 40, height: 40, type: 'room', roomNumber: 1153 },
  { id: '1154', x: 85, y: 210, width: 40, height: 40, type: 'room', roomNumber: 1154 },
  { id: '1155', x: 85, y: 260, width: 40, height: 40, type: 'room', roomNumber: 1155 },
  { id: '1156', x: 85, y: 310, width: 40, height: 40, type: 'room', roomNumber: 1156 },
  { id: '1157', x: 85, y: 360, width: 40, height: 40, type: 'room', roomNumber: 1157 },
  { id: '1158', x: 85, y: 410, width: 40, height: 40, type: 'room', roomNumber: 1158 },
  { id: '1159', x: 85, y: 460, width: 40, height: 40, type: 'room', roomNumber: 1159 },

  // Corridor Label
  { id: 'Corridor', x: 67.5, y: 250, label: 'Corridor', type: 'label', rotation: -90 },
];

// Define 12th floor layout elements
const twelfthFloorElements = createFloorElements(12);

// Define type for custom SVG style with occupancy status
type SVGStylesType = {
  room: React.CSSProperties;
  common: React.CSSProperties;
  text: React.CSSProperties;
  labelText: React.CSSProperties;
  arrowLine: React.CSSProperties;
  arrowHead: React.CSSProperties;
  available: React.CSSProperties;
  'partially-occupied': React.CSSProperties;
  'fully-occupied': React.CSSProperties;
};

// Style definitions for SVG elements - use React.CSSProperties to ensure type safety
const svgStyles: SVGStylesType = {
  room: {
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
  },
  common: {
    fill: '#d3d3d3', // Light gray
    stroke: 'black',
    strokeWidth: 1,
  },
  text: {
    fontSize: '10px',
    fontFamily: 'sans-serif',
    textAnchor: 'middle' as const,
    dominantBaseline: 'middle' as const,
    pointerEvents: 'none' as const, // Make text non-interactive
  },
  labelText: {
    fontSize: '12px',
    fontFamily: 'sans-serif',
    textAnchor: 'middle' as const, // Center text horizontally
    dominantBaseline: 'middle' as const, // Center text vertically
  },
  arrowLine: {
    stroke: 'black',
    strokeWidth: 2,
    markerEnd: 'url(#arrowhead)', // Reference the arrowhead marker
  },
  arrowHead: {
    fill: 'black',
  },
  available: {
    fill: '#bbf7d0', // Light green for available
  },
  'partially-occupied': {
    fill: '#fef08a', // Light yellow for partially occupied
  },
  'fully-occupied': {
    fill: 'fecaca', // Light red for fully occupied
    cursor: 'not-allowed',
  }
};

// Create a simple list view for Phase 2 Part 5 floors
const Phase2Part5FloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase2Part5Config[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  const getRoomOccupancyStatus = (roomNumber: number | string): "available" | "partially-occupied" | "fully-occupied" => {
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
  
  // Function to render ground floor using SVG layout
  const renderGroundFloorLayout = () => {
    // Calculate viewBox to fit all elements with some padding
    const padding = 10;
    // Filter out non-shape elements for bounding box calculation
    const shapeElements = groundFloorElements.filter(e => e.x !== undefined || e.x1 !== undefined);
    // Calculate min/max X and Y, considering both rects and the arrow
    const minX = Math.min(...shapeElements.map(e => Math.min(e.x ?? Infinity, e.x1 ?? Infinity))) - padding - 40; // Extra padding for Entry label
    const minY = Math.min(...shapeElements.map(e => Math.min(e.y ?? Infinity, e.y1 ?? Infinity))) - padding;
    const maxX = Math.max(...shapeElements.map(e => Math.max((e.x ?? -Infinity) + (e.width ?? 0), e.x2 ?? -Infinity))) + padding;
    const maxY = Math.max(...shapeElements.map(e => Math.max((e.y ?? -Infinity) + (e.height ?? 0), e.y2 ?? -Infinity))) + padding;

    const width = maxX - minX;
    const height = maxY - minY;

    return (
      <div className="ground-floor-layout">
        <h3>{`${selectedBlock} - ${floor}`}</h3>
        <svg
          viewBox={`${minX} ${minY} ${width} ${height}`}
          style={{
            border: '1px solid #ccc',
            maxWidth: '100%',
            maxHeight: '80vh',
            display: 'block',
            margin: 'auto'
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Define marker for arrowhead */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="8" // Adjust refX so the arrow tip aligns with the line end
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth">
              <polygon points="0 0, 10 3.5, 0 7" style={svgStyles.arrowHead} />
            </marker>
          </defs>

          {groundFloorElements.map((el) => {
            if (el.type === 'label' && el.x !== undefined && el.y !== undefined) {
              // Render text labels
              return (
                <text
                  key={el.id}
                  x={el.x}
                  y={el.y}
                  style={svgStyles.labelText}
                  // Adjust text anchor for Entry label to be right-aligned
                  textAnchor={el.id === 'Entry Label' ? 'end' : 'middle'}
                  transform={`rotate(${el.rotation || 0} ${el.x} ${el.y})`}
                >
                  {el.label}
                </text>
              );
            } else if (el.type === 'arrow' && el.x1 !== undefined && el.y1 !== undefined && el.x2 !== undefined && el.y2 !== undefined) {
              // Render the arrow line
              return (
                <line
                  key={el.id}
                  x1={el.x1}
                  y1={el.y1}
                  x2={el.x2}
                  y2={el.y2}
                  style={svgStyles.arrowLine}
                />
              );
            } else if ((el.type === 'room' || el.type === 'common') && 
                       el.x !== undefined && el.y !== undefined && 
                       el.width !== undefined && el.height !== undefined) {
              // Render rectangles for rooms and common areas
              let style: React.CSSProperties = el.type === 'room' ? {...svgStyles.room} : {...svgStyles.common};
              const label = el.label || el.id;
              const textX = el.x + el.width / 2;
              const textY = el.y + el.height / 2;
              const lines = String(label).split('\n'); // Handle multi-line labels if any

              // Add occupancy status styles for rooms
              if (el.type === 'room' && el.roomNumber) {
                const occupancyStatus = getRoomOccupancyStatus(el.roomNumber);
                style = {...style, ...svgStyles[occupancyStatus]};
              }

              return (
                <g 
                  key={el.id}
                  onClick={el.type === 'room' && el.roomNumber ? () => onRoomClick(el.roomNumber.toString()) : undefined}
                  style={{cursor: el.type === 'room' ? 'pointer' : 'default'}}
                >
                  <rect
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    style={style}
                  />
                  {lines.map((line, index) => (
                    <text
                      key={`${el.id}-line-${index}`}
                      x={textX}
                      y={textY + (index - (lines.length - 1) / 2) * 12}
                      style={svgStyles.text}
                    >
                      {el.roomNumber || line}
                    </text>
                  ))}
                </g>
              );
            }
            return null;
          })}
        </svg>
        <div className="legend" style={{marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles.available.fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Available</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles['partially-occupied'].fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Partially Occupied</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles['fully-occupied'].fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Fully Occupied</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles.common.fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Common Areas</span>
          </div>
        </div>
      </div>
    );
  };

  // Function to render first floor using SVG layout
  const renderFirstFloorLayout = () => {
    // Calculate viewBox to fit all elements with some padding
    const padding = 10;
    // Filter out non-shape elements for bounding box calculation
    const shapeElements = firstFloorElements.filter(e => e.x !== undefined);
    // Calculate min/max X and Y
    const minX = Math.min(...shapeElements.map(e => e.x ?? Infinity)) - padding;
    const minY = Math.min(...shapeElements.map(e => e.y ?? Infinity)) - padding;
    const maxX = Math.max(...shapeElements.map(e => (e.x ?? -Infinity) + (e.width ?? 0))) + padding;
    const maxY = Math.max(...shapeElements.map(e => (e.y ?? -Infinity) + (e.height ?? 0))) + padding;

    // Adjust for rotated label
    const labelElements = firstFloorElements.filter(e => e.type === 'label');
    const maxLabelX = labelElements.length > 0
      ? Math.max(maxX, ...labelElements.map(e => e.x + 12))
      : maxX;
    const maxLabelY = labelElements.length > 0
      ? Math.max(maxY, ...labelElements.map(e => e.y + (e.label?.length ?? 0) * 6))
      : maxY;

    const finalMaxX = Math.max(maxX, maxLabelX);
    const finalMaxY = Math.max(maxY, maxLabelY);

    const width = finalMaxX - minX;
    const height = finalMaxY - minY;

    return (
      <div className="first-floor-layout">
        <h3>{`${selectedBlock} - ${floor}`}</h3>
        <svg
          viewBox={`${minX} ${minY} ${width} ${height}`}
          style={{
            border: '1px solid #ccc',
            maxWidth: '100%',
            maxHeight: '80vh',
            display: 'block',
            margin: 'auto'
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          {firstFloorElements.map((el) => {
            if (el.type === 'label' && el.x !== undefined && el.y !== undefined) {
              // Render text labels
              return (
                <text
                  key={el.id}
                  x={el.x}
                  y={el.y}
                  style={svgStyles.labelText}
                  textAnchor="middle"
                  transform={`rotate(${el.rotation || 0} ${el.x} ${el.y})`}
                >
                  {el.label}
                </text>
              );
            } else if ((el.type === 'room' || el.type === 'common') && 
                       el.x !== undefined && el.y !== undefined && 
                       el.width !== undefined && el.height !== undefined) {
              // Render rectangles for rooms and common areas
              let style: React.CSSProperties = el.type === 'room' ? {...svgStyles.room} : {...svgStyles.common};
              const label = el.label || el.id;
              const textX = el.x + el.width / 2;
              const textY = el.y + el.height / 2;
              const lines = String(label).split('\n'); // Handle multi-line labels if any

              // Add occupancy status styles for rooms
              if (el.type === 'room' && el.roomNumber) {
                const occupancyStatus = getRoomOccupancyStatus(el.roomNumber);
                style = {...style, ...svgStyles[occupancyStatus]};
              }

              return (
                <g 
                  key={el.id}
                  onClick={el.type === 'room' && el.roomNumber ? () => onRoomClick(el.roomNumber.toString()) : undefined}
                  style={{cursor: el.type === 'room' ? 'pointer' : 'default'}}
                >
                  <rect
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    style={style}
                  />
                  {lines.map((line, index) => (
                    <text
                      key={`${el.id}-line-${index}`}
                      x={textX}
                      y={textY + (index - (lines.length - 1) / 2) * 12}
                      style={svgStyles.text}
                    >
                      {el.roomNumber || line}
                    </text>
                  ))}
                </g>
              );
            }
            return null;
          })}
        </svg>
        <div className="legend" style={{marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles.available.fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Available</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles['partially-occupied'].fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Partially Occupied</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles['fully-occupied'].fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Fully Occupied</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles.common.fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Common Areas</span>
          </div>
        </div>
      </div>
    );
  };

  // Function to render a floor SVG layout based on the provided elements
  const renderFloorLayout = (floorElements: any[], selectedBlock: string, selectedFloor: string) => {
    // Calculate viewBox to fit all elements with some padding
    const padding = 10;
    // Filter out non-shape elements for bounding box calculation
    const shapeElements = floorElements.filter(e => e.x !== undefined);
    // Calculate min/max X and Y
    const minX = Math.min(...shapeElements.map(e => e.x ?? Infinity)) - padding;
    const minY = Math.min(...shapeElements.map(e => e.y ?? Infinity)) - padding;
    const maxX = Math.max(...shapeElements.map(e => (e.x ?? -Infinity) + (e.width ?? 0))) + padding;
    const maxY = Math.max(...shapeElements.map(e => (e.y ?? -Infinity) + (e.height ?? 0))) + padding;

    // Adjust for rotated label
    const labelElements = floorElements.filter(e => e.type === 'label');
    const maxLabelX = labelElements.length > 0
      ? Math.max(maxX, ...labelElements.map(e => e.x + 12))
      : maxX;
    const maxLabelY = labelElements.length > 0
      ? Math.max(maxY, ...labelElements.map(e => e.y + (e.label?.length ?? 0) * 6))
      : maxY;

    const finalMaxX = Math.max(maxX, maxLabelX);
    const finalMaxY = Math.max(maxY, maxLabelY);

    const width = finalMaxX - minX;
    const height = finalMaxY - minY;

    return (
      <div className="floor-layout">
        <h3>{`${selectedBlock} - ${selectedFloor}`}</h3>
        <svg
          viewBox={`${minX} ${minY} ${width} ${height}`}
          style={{
            border: '1px solid #ccc',
            maxWidth: '100%',
            maxHeight: '80vh',
            display: 'block',
            margin: 'auto'
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          {floorElements.map((el) => {
            if (el.type === 'label' && el.x !== undefined && el.y !== undefined) {
              // Render text labels
              return (
                <text
                  key={el.id}
                  x={el.x}
                  y={el.y}
                  style={svgStyles.labelText}
                  textAnchor="middle"
                  transform={`rotate(${el.rotation || 0} ${el.x} ${el.y})`}
                >
                  {el.label}
                </text>
              );
            } else if ((el.type === 'room' || el.type === 'common') && 
                       el.x !== undefined && el.y !== undefined && 
                       el.width !== undefined && el.height !== undefined) {
              // Render rectangles for rooms and common areas
              let style: React.CSSProperties = el.type === 'room' ? {...svgStyles.room} : {...svgStyles.common};
              const label = el.label || el.id;
              const textX = el.x + el.width / 2;
              const textY = el.y + el.height / 2;
              const lines = String(label).split('\n'); // Handle multi-line labels if any

              // Add occupancy status styles for rooms
              if (el.type === 'room' && el.roomNumber) {
                const occupancyStatus = getRoomOccupancyStatus(el.roomNumber);
                style = {...style, ...svgStyles[occupancyStatus]};
              }

              return (
                <g 
                  key={el.id}
                  onClick={el.type === 'room' && el.roomNumber ? () => onRoomClick(el.roomNumber.toString()) : undefined}
                  style={{cursor: el.type === 'room' ? 'pointer' : 'default'}}
                >
                  <rect
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    style={style}
                  />
                  {lines.map((line, index) => (
                    <text
                      key={`${el.id}-line-${index}`}
                      x={textX}
                      y={textY + (index - (lines.length - 1) / 2) * 12}
                      style={svgStyles.text}
                    >
                      {el.roomNumber || line}
                    </text>
                  ))}
                </g>
              );
            }
            return null;
          })}
        </svg>
        <div className="legend" style={{marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles.available.fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Available</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles['partially-occupied'].fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Partially Occupied</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles['fully-occupied'].fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Fully Occupied</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '20px', height: '20px', background: svgStyles.common.fill, border: '1px solid black', marginRight: '5px'}}></div>
            <span>Common Areas</span>
          </div>
        </div>
      </div>
    );
  };

  // For floors 2-4, use the dedicated component
  if (floor === "2nd Floor") {
    return <Phase2Part5HigherFloors 
      floorNumber={2}
      onRoomClick={onRoomClick} 
      occupiedBeds={occupiedBeds} 
      selectedBlock={selectedBlock} 
      selectedFloor={selectedFloor} 
    />;
  }
  
  if (floor === "3rd Floor") {
    return <Phase2Part5HigherFloors 
      floorNumber={3}
      onRoomClick={onRoomClick} 
      occupiedBeds={occupiedBeds} 
      selectedBlock={selectedBlock} 
      selectedFloor={selectedFloor} 
    />;
  }
  
  if (floor === "4th Floor") {
    return <Phase2Part5HigherFloors 
      floorNumber={4}
      onRoomClick={onRoomClick} 
      occupiedBeds={occupiedBeds} 
      selectedBlock={selectedBlock} 
      selectedFloor={selectedFloor} 
    />;
  }

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
  
  // Render floor layouts based on floor selection
  if (floor === "Ground Floor") {
    return renderGroundFloorLayout();
  } else if (floor === "1st Floor") {
    return renderFirstFloorLayout();
  } else if (floor === "5th Floor") {
    return renderFloorLayout(fifthFloorElements, selectedBlock, selectedFloor);
  } else if (floor === "6th Floor") {
    return renderFloorLayout(sixthFloorElements, selectedBlock, selectedFloor);
  } else if (floor === "7th Floor") {
    return renderFloorLayout(seventhFloorElements, selectedBlock, selectedFloor);
  } else if (floor === "8th Floor") {
    return renderFloorLayout(eighthFloorElements, selectedBlock, selectedFloor);
  } else if (floor === "9th Floor") {
    return renderFloorLayout(ninthFloorElements, selectedBlock, selectedFloor);
  } else if (floor === "10th Floor") {
    return renderFloorLayout(tenthFloorElements, selectedBlock, selectedFloor);
  } else if (floor === "11th Floor") {
    return renderFloorLayout(eleventhFloorElements, selectedBlock, selectedFloor);
  } else if (floor === "12th Floor") {
    return renderFloorLayout(twelfthFloorElements, selectedBlock, selectedFloor);
  } else {
    // Render standard grid for other floors (13-14)
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
};

export default Phase2Part5FloorPlan;