import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

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
  
  // Render Ground Floor with SVG layout or other floors as a grid of room buttons
  if (floor === "Ground Floor") {
    return renderGroundFloorLayout();
  } else {
    // Render standard grid for other floors
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