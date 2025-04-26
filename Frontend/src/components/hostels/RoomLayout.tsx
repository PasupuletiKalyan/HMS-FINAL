import React from 'react';

// Define colors for consistency
const defaultFill = '#f0f0f0';
const filledFill = '#cccccc';
const defaultStroke = '#555';
const filledStroke = '#333';
const textFill = '#000000'; // Black text
const hoverFill = '#e2e8f0'; // Light blue-gray for hover effect

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
  isBed = false
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
  isBed?: boolean;
}) => {
  // Calculate center coordinates for the text
  const textX = x + width / 2;
  const textY = y + height / 2;
  
  // Add hover styles for interactive elements
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Only apply hover effects if onClick exists
  const handleMouseEnter = onClick ? () => setIsHovered(true) : undefined;
  const handleMouseLeave = onClick ? () => setIsHovered(false) : undefined;
  
  // Add cursor style if clickable
  const cursorStyle = onClick ? { cursor: 'pointer' } : {};
  
  // Determine fill color based on hover state
  const currentFill = (isHovered && isBed) ? hoverFill : fill;

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
        fill={currentFill}
        stroke={stroke}
        strokeWidth="1" // Border thickness
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
  // Keep the viewBox the same - this defines the internal coordinate system
  const viewBoxWidth = 800;
  const viewBoxHeight = 400;

  // Determine fill colors based on occupancy
  const bedAFill = bedAOccupied ? '#fecaca' : defaultFill; // Red if occupied
  const bedAStroke = bedAOccupied ? '#dc2626' : defaultStroke; // Darker red border if occupied
  
  const bedBFill = bedBOccupied ? '#fecaca' : defaultFill;
  const bedBStroke = bedBOccupied ? '#dc2626' : defaultStroke;
  
  // Define click handlers for beds
  const handleBedAClick = () => {
    if (!bedAOccupied && onSelectBed) {
      onSelectBed('A');
    }
  };
  
  const handleBedBClick = () => {
    if (!bedBOccupied && onSelectBed) {
      onSelectBed('B');
    }
  };

  return (
    // Reduced padding on the container
    <div className="flex justify-center items-center p-2 bg-gray-100">
      {/* Room number and location display */}
      {roomNumber && (
        <div className="absolute top-2 left-2 bg-white px-3 py-1 shadow rounded-md">
          <h2 className="text-base font-semibold">Room {roomNumber}</h2>
          {block && floor && (
            <p className="text-xs text-gray-600">{block} - {floor}</p>
          )}
        </div>
      )}
       
      {/* Container div for centering and padding */}
      <svg
        width="100%" // Make SVG take full width of its container
        height="100%" // Make SVG take full height of its container
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} // Define coordinate system (remains the same)
        preserveAspectRatio="xMidYMid meet" // Maintain aspect ratio and center
        // Reduced maxWidth to make the SVG display smaller
        style={{ maxWidth: '500px', border: '2px solid black' }} // Add border and max width
      >
        {/* Top Row */}
        <RoomItem x={80} y={10} width={150} height={50} fill={defaultFill} stroke={defaultStroke} label="Cupboards" />
        <RoomItem x={300} y={10} width={60} height={40} fill={defaultFill} stroke={defaultStroke} label="Mirror" />
        <RoomItem x={430} y={10} width={150} height={50} fill={defaultFill} stroke={defaultStroke} label="Cupboards" />
        <RoomItem x={viewBoxWidth - 10 - 60} y={10} width={60} height={70} fill={filledFill} stroke={filledStroke} label="Entry" />

        {/* Left Side */}
        <RoomItem x={10} y={150} width={50} height={120} fill={filledFill} stroke={filledStroke} label="Balcony" />
        <RoomItem x={60} y={viewBoxHeight - 10 - 50} width={100} height={50} rx={10} ry={10} fill={defaultFill} stroke={defaultStroke} label="Study Table" />

        {/* Center Area */}
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
          onClick={handleBedBClick}
          isBed={true}
        />
        
        {/* Central Wall - No label needed */}
        <rect x={320} y={120} width={40} height={250} fill={filledFill} stroke={filledStroke} strokeWidth="1" />
        <RoomItem x={380} y={viewBoxHeight - 10 - 50} width={100} height={50} rx={10} ry={10} fill={defaultFill} stroke={defaultStroke} label="Study Table" />

        {/* Right Side */}
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
          onClick={handleBedAClick}
          isBed={true}
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
            fill={filledFill}
            stroke={filledStroke}
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
          <rect x={0} y={0} width={15} height={15} fill={defaultFill} stroke={defaultStroke} />
          <text x={25} y={12} fontSize={10}>Available</text>
          
          <rect x={0} y={25} width={15} height={15} fill="#fecaca" stroke="#dc2626" />
          <text x={25} y={37} fontSize={10}>Occupied</text>
        </g>
      </svg>
    </div>
  );
};

export default RoomLayout;