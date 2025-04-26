import React, { useState } from 'react';

// Define colors matched with the old room layout
const defaultFill = '#fed7aa'; // Same as bed-a/bed-b in CSS (#fed7aa)
const availableBedFill = '#fed7aa'; // Orange bed color from old layout
const selectedBedFill = '#bbf7d0'; // Green-200 for selected beds
const occupiedBedFill = '#fecaca'; // Red-200 for occupied beds
const furnitureFill = '#e5e7eb'; // Gray background for furniture
const mirrorFill = '#e0e7ff'; // Light purple for mirror
const entryFill = '#a16207'; // Brown color for entry
const balconyFill = '#d1d5db'; // Gray for balcony
const washRoomFill = '#d1d5db'; // Gray for washroom
const tableFill = '#e5e7eb'; // Gray for study tables

// Border colors
const defaultStroke = '#fb923c'; // Same as bed-a/bed-b border in CSS (#fb923c)
const selectedBedStroke = '#22c55e'; // Green-500 for selected bed border
const occupiedBedStroke = '#ef4444'; // Red-500 for occupied bed border
const furnitureStroke = '#9ca3af'; // Gray-400 border for furniture
const mirrorStroke = '#a5b4fc'; // Purple border for mirror
const entryStroke = '#a16207'; // Same as entry fill

// Text colors
const textFill = '#000000'; // Black text

// Component for a single room item (rectangle + text)
// Simplifies creating each element
const RoomItem = ({ 
  x, 
  y, 
  width, 
  height, 
  rx = 0, 
  ry = 0, 
  fill, 
  stroke, 
  label,
  onClick,
  isSelected = false
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  ry?: number;
  fill: string;
  stroke: string;
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
}) => {
  // Calculate center coordinates for the text
  const textX = x + width / 2;
  const textY = y + height / 2;
  
  // Add hover state for interactive elements
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Only apply hover effects if onClick exists
  const handleMouseEnter = onClick ? () => setIsHovered(true) : undefined;
  const handleMouseLeave = onClick ? () => setIsHovered(false) : undefined;
  
  // Add cursor style if clickable
  const cursorStyle = onClick ? { cursor: 'pointer' } : {};
  
  // Apply transform effect on hover for beds (matches the old room layout hover)
  const transform = (isHovered && onClick) ? 'translate(0, -2px)' : 'none';
  const boxShadow = (isHovered && onClick) ? '0 3px 6px rgba(0, 0, 0, 0.15)' : 'none';
  
  // Add selected style shadow similar to the old layout
  const selectedShadow = isSelected ? '0 0 0 3px rgba(34, 197, 94, 0.3)' : 'none';

  return (
    <g
      onClick={onClick}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      style={cursorStyle}
    >
      {/* The rectangle shape */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx} // Horizontal corner radius
        ry={ry} // Vertical corner radius
        fill={fill}
        stroke={stroke}
        strokeWidth="1" // Border thickness
        style={{ 
          transform, 
          boxShadow: isSelected ? selectedShadow : boxShadow,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
        }}
      />
      {/* The label text, centered within the rectangle */}
      <text
        x={textX}
        y={textY}
        fill={textFill}
        fontSize="12" // Font size for labels - kept same relative size within SVG
        fontFamily="sans-serif" // Font family
        textAnchor="middle" // Horizontal alignment
        dominantBaseline="middle" // Vertical alignment
      >
        {label}
      </text>
    </g>
  );
};

interface RoomLayoutProps {
  bedAOccupied?: boolean;
  bedBOccupied?: boolean;
  roomNumber?: string;
  block?: string;
  floor?: string;
  onSelectBed?: (bed: string) => void;
}

// Main component to render the SVG room layout
const RoomLayout: React.FC<RoomLayoutProps> = ({
  bedAOccupied = false,
  bedBOccupied = false,
  roomNumber = '',
  block = '',
  floor = '',
  onSelectBed
}) => {
  // Track selected bed
  const [selectedBed, setSelectedBed] = useState<string | null>(null);

  // Keep the viewBox the same - this defines the internal coordinate system
  const viewBoxWidth = 800;
  const viewBoxHeight = 400;

  // Determine fill colors based on occupancy and selection
  const bedAFill = bedAOccupied ? occupiedBedFill : selectedBed === 'A' ? selectedBedFill : availableBedFill;
  const bedAStroke = bedAOccupied ? occupiedBedStroke : selectedBed === 'A' ? selectedBedStroke : defaultStroke;
  
  const bedBFill = bedBOccupied ? occupiedBedFill : selectedBed === 'B' ? selectedBedFill : availableBedFill;
  const bedBStroke = bedBOccupied ? occupiedBedStroke : selectedBed === 'B' ? selectedBedStroke : defaultStroke;
  
  // Define click handlers for beds
  const handleBedAClick = () => {
    if (!bedAOccupied) {
      setSelectedBed('A');
      if (onSelectBed) {
        onSelectBed('A');
      }
    }
  };
  
  const handleBedBClick = () => {
    if (!bedBOccupied) {
      setSelectedBed('B');
      if (onSelectBed) {
        onSelectBed('B');
      }
    }
  };

  return (
    // Container with styling similar to old layout
    <div style={{ 
      width: '100%', 
      maxWidth: '500px', 
      margin: '0 auto', 
      border: '2px solid #d1d5db',
      borderRadius: '0.375rem',
      backgroundColor: '#f9fafb', 
      padding: '1rem',
      boxSizing: 'border-box'
    }}>
      {/* Room number and location display */}
      {roomNumber && (
        <div style={{
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>
          <h2 style={{
            margin: '0',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#1f2937'
          }}>Room {roomNumber}</h2>
          {block && floor && (
            <p style={{
              margin: '0',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>{block} - {floor}</p>
          )}
        </div>
      )}
       
      {/* SVG container */}
      <svg
        width="100%" // Make SVG take full width of its container
        height="100%" // Make SVG take full height of its container
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} // Define coordinate system (remains the same)
        preserveAspectRatio="xMidYMid meet" // Maintain aspect ratio and center
        style={{ maxWidth: '500px' }} // Add max width
      >
        {/* Top Row - Furniture/Cupboards */}
        <RoomItem 
          x={80} 
          y={10} 
          width={150} 
          height={50} 
          fill={furnitureFill} 
          stroke={furnitureStroke} 
          label="Cupboards" 
        />
        <RoomItem 
          x={300} 
          y={10} 
          width={60} 
          height={40} 
          fill={mirrorFill} 
          stroke={mirrorStroke} 
          label="Mirror" 
        />
        <RoomItem 
          x={430} 
          y={10} 
          width={150} 
          height={50} 
          fill={furnitureFill} 
          stroke={furnitureStroke} 
          label="Cupboards" 
        />
        <RoomItem 
          x={viewBoxWidth - 10 - 60} 
          y={10} 
          width={60} 
          height={70} 
          fill={entryFill} 
          stroke={entryStroke} 
          label="Entry" 
        />

        {/* Left Side - Balcony */}
        <RoomItem 
          x={10} 
          y={150} 
          width={50} 
          height={120} 
          fill={balconyFill} 
          stroke={furnitureStroke} 
          label="Balcony" 
        />
        
        {/* Study Tables */}
        <RoomItem 
          x={60} 
          y={viewBoxHeight - 10 - 50} 
          width={100} 
          height={50} 
          rx={10} 
          ry={10} 
          fill={tableFill} 
          stroke={furnitureStroke} 
          label="Study Table" 
        />

        {/* Center Area - Bed B */}
        <RoomItem 
          x={160} 
          y={200} 
          width={120} 
          height={180} 
          rx={15} 
          ry={15} 
          fill={bedBFill} 
          stroke={bedBStroke} 
          label="Bed B" 
          onClick={!bedBOccupied ? handleBedBClick : undefined}
          isSelected={selectedBed === 'B'}
        />
        
        {/* Central Wall - No label needed */}
        <rect 
          x={320} 
          y={120} 
          width={40} 
          height={250} 
          fill={furnitureFill} 
          stroke={furnitureStroke} 
          strokeWidth="1" 
        />
        
        {/* Right side table */}
        <RoomItem 
          x={380} 
          y={viewBoxHeight - 10 - 50} 
          width={100} 
          height={50} 
          rx={10} 
          ry={10} 
          fill={tableFill} 
          stroke={furnitureStroke} 
          label="Study Table" 
        />

        {/* Right Side - Bed A */}
        <RoomItem 
          x={viewBoxWidth - 230 - 90} 
          y={200} 
          width={120} 
          height={180} 
          rx={15} 
          ry={15} 
          fill={bedAFill} 
          stroke={bedAStroke} 
          label="Bed A" 
          onClick={!bedAOccupied ? handleBedAClick : undefined}
          isSelected={selectedBed === 'A'}
        />
        
        {/* Washroom */}
        <g>
          <rect
            x={viewBoxWidth - 5 - 100}
            y={130}
            width={100}
            height={250}
            rx={15}
            ry={15}
            fill={washRoomFill}
            stroke={furnitureStroke}
            strokeWidth="1"
          />
          <text
            x={viewBoxWidth - 10 - 100 + 50} // Center text
            y={130 + 125} // Center text
            fill={textFill}
            fontSize="12"
            fontFamily="sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Washroom
          </text>
        </g>

        {/* Legend for bed status */}
        <g transform="translate(20, 20)">
          <rect x={0} y={0} width={15} height={15} fill={availableBedFill} stroke={defaultStroke} />
          <text x={25} y={12} fontSize={10}>Available</text>
          
          <rect x={0} y={25} width={15} height={15} fill={occupiedBedFill} stroke={occupiedBedStroke} />
          <text x={25} y={37} fontSize={10}>Occupied</text>
          
          <rect x={0} y={50} width={15} height={15} fill={selectedBedFill} stroke={selectedBedStroke} />
          <text x={25} y={62} fontSize={10}>Selected</text>
        </g>
      </svg>
    </div>
  );
};

export default RoomLayout;