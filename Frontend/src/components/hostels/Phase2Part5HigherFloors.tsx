import React from 'react';

// Define the structure for a single room/area
interface AreaProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  fillColor?: string;
  textColor?: string;
  fontSize?: number;
  roomNumber?: number;
  onClick?: () => void;
}

// Component for rendering a single rectangular area with optional text
const SvgArea: React.FC<AreaProps> = ({
  id,
  x,
  y,
  width,
  height,
  label,
  fillColor = 'white',
  textColor = 'black',
  fontSize = 10,
  onClick,
}) => (
  <g key={id} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    {/* Rectangle for the area */}
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fillColor}
      stroke="black"
      strokeWidth="1"
      rx="2" // Slightly rounded corners
      ry="2"
    />
    {/* Text label inside the rectangle */}
    {label && (
      <text
        x={x + width / 2} // Center text horizontally
        y={y + height / 2} // Center text vertically
        fill={textColor}
        fontSize={fontSize}
        textAnchor="middle" // Horizontally center
        dominantBaseline="middle" // Vertically center
        pointerEvents="none" // Prevent text from interfering with click events
      >
        {label}
      </text>
    )}
  </g>
);

// Props for the Phase2Part5HigherFloors component
interface Phase2Part5HigherFloorsProps {
  floorNumber: number; // 2, 3, or 4
  onRoomClick: (roomNumber: string) => void;
  occupiedBeds: Record<string, boolean>;
  selectedBlock: string;
  selectedFloor: string;
}

// Main component for the floor plan SVG
const Phase2Part5HigherFloors: React.FC<Phase2Part5HigherFloorsProps> = ({
  floorNumber,
  onRoomClick,
  occupiedBeds,
  selectedBlock,
  selectedFloor,
}) => {
  // Define dimensions and positions
  const roomWidth = 40;
  const roomHeight = 30;
  const corridorWidth = 30;
  const spacing = 5; // Spacing between elements
  const column1X = spacing;
  const column2X = column1X + roomWidth + corridorWidth + spacing * 2;
  const totalWidth = column2X + roomWidth + spacing;
  const startY = spacing;

  // Function to get room occupancy status
  const getRoomOccupancyStatus = (roomNumber: number) => {
    const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
    const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
    const isBedAOccupied = occupiedBeds[bedAKey] || false;
    const isBedBOccupied = occupiedBeds[bedBKey] || false;
    
    if (isBedAOccupied && isBedBOccupied) {
      return { color: '#fecaca', status: 'Fully Occupied' }; // Red for fully occupied
    } else if (isBedAOccupied || isBedBOccupied) {
      return { color: '#fef08a', status: 'Partially Occupied' }; // Yellow for partially occupied
    } else {
      return { color: '#bbf7d0', status: 'Available' }; // Green for available
    }
  };

  // Create room number prefix based on floor number
  const roomPrefix = floorNumber.toString();
  
  // Define the areas based on the image layout
  const areas: AreaProps[] = [
    // Column 1 (Left)
    { 
      id: `${roomPrefix}61`, 
      x: column1X, 
      y: startY + 0 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}61`, 
      roomNumber: parseInt(`${roomPrefix}61`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}61`)).color,
      onClick: () => onRoomClick(`${roomPrefix}61`)
    },
    { 
      id: `${roomPrefix}60`, 
      x: column1X, 
      y: startY + 1 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}60`, 
      roomNumber: parseInt(`${roomPrefix}60`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}60`)).color,
      onClick: () => onRoomClick(`${roomPrefix}60`)
    },
    { 
      id: `${roomPrefix}59`, 
      x: column1X, 
      y: startY + 2 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}59`, 
      roomNumber: parseInt(`${roomPrefix}59`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}59`)).color,
      onClick: () => onRoomClick(`${roomPrefix}59`)
    },
    { 
      id: `${roomPrefix}58`, 
      x: column1X, 
      y: startY + 3 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}58`, 
      roomNumber: parseInt(`${roomPrefix}58`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}58`)).color,
      onClick: () => onRoomClick(`${roomPrefix}58`)
    },
    { 
      id: `${roomPrefix}57`, 
      x: column1X, 
      y: startY + 4 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}57`, 
      roomNumber: parseInt(`${roomPrefix}57`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}57`)).color,
      onClick: () => onRoomClick(`${roomPrefix}57`)
    },
    { 
      id: `${roomPrefix}56`, 
      x: column1X, 
      y: startY + 5 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}56`, 
      roomNumber: parseInt(`${roomPrefix}56`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}56`)).color,
      onClick: () => onRoomClick(`${roomPrefix}56`)
    },
    { id: 'Lifts', x: column1X, y: startY + 6 * (roomHeight + spacing), width: roomWidth, height: roomHeight, label: 'Lifts', fillColor: '#D3D3D3' }, // Light grey
    { id: 'Stairs', x: column1X, y: startY + 7 * (roomHeight + spacing) + spacing, width: roomWidth, height: roomHeight * 1.5, label: 'Stairs', fillColor: '#D3D3D3' }, // Light grey
    { id: 'WS', x: column1X, y: startY + 8 * (roomHeight + spacing) + roomHeight * 0.5 + spacing * 2, width: roomWidth, height: roomHeight * 2, label: 'WS', fillColor: '#D3D3D3' }, // Light grey

    // Column 2 (Right)
    { 
      id: `${roomPrefix}46`, 
      x: column2X, 
      y: startY + 0 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}46`, 
      roomNumber: parseInt(`${roomPrefix}46`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}46`)).color,
      onClick: () => onRoomClick(`${roomPrefix}46`)
    },
    { 
      id: `${roomPrefix}47`, 
      x: column2X, 
      y: startY + 1 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}47`, 
      roomNumber: parseInt(`${roomPrefix}47`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}47`)).color,
      onClick: () => onRoomClick(`${roomPrefix}47`)
    },
    { 
      id: `${roomPrefix}48`, 
      x: column2X, 
      y: startY + 2 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}48`, 
      roomNumber: parseInt(`${roomPrefix}48`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}48`)).color,
      onClick: () => onRoomClick(`${roomPrefix}48`)
    },
    { 
      id: `${roomPrefix}49`, 
      x: column2X, 
      y: startY + 3 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}49`, 
      roomNumber: parseInt(`${roomPrefix}49`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}49`)).color,
      onClick: () => onRoomClick(`${roomPrefix}49`)
    },
    { 
      id: `${roomPrefix}50`, 
      x: column2X, 
      y: startY + 4 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}50`, 
      roomNumber: parseInt(`${roomPrefix}50`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}50`)).color,
      onClick: () => onRoomClick(`${roomPrefix}50`)
    },
    { 
      id: `${roomPrefix}51`, 
      x: column2X, 
      y: startY + 5 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}51`, 
      roomNumber: parseInt(`${roomPrefix}51`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}51`)).color,
      onClick: () => onRoomClick(`${roomPrefix}51`)
    },
    { 
      id: `${roomPrefix}52`, 
      x: column2X, 
      y: startY + 6 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}52`, 
      roomNumber: parseInt(`${roomPrefix}52`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}52`)).color,
      onClick: () => onRoomClick(`${roomPrefix}52`)
    },
    { 
      id: `${roomPrefix}53`, 
      x: column2X, 
      y: startY + 7 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}53`, 
      roomNumber: parseInt(`${roomPrefix}53`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}53`)).color,
      onClick: () => onRoomClick(`${roomPrefix}53`)
    },
    { 
      id: `${roomPrefix}54`, 
      x: column2X, 
      y: startY + 8 * (roomHeight + spacing), 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}54`, 
      roomNumber: parseInt(`${roomPrefix}54`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}54`)).color,
      onClick: () => onRoomClick(`${roomPrefix}54`)
    },
    { id: 'Balco', x: column2X, y: startY + 9 * (roomHeight + spacing) + spacing, width: roomWidth, height: roomHeight * 2, label: 'Balcony', fillColor: '#D3D3D3' }, // Light grey
    { 
      id: `${roomPrefix}55`, 
      x: column2X, 
      y: startY + 11 * (roomHeight + spacing) + spacing * 2, 
      width: roomWidth, 
      height: roomHeight, 
      label: `${roomPrefix}55`, 
      roomNumber: parseInt(`${roomPrefix}55`),
      fillColor: getRoomOccupancyStatus(parseInt(`${roomPrefix}55`)).color,
      onClick: () => onRoomClick(`${roomPrefix}55`)
    },
  ];

  // Calculate total height based on the last element's position and height
  const lastArea = areas[areas.length - 1];
  const totalHeight = lastArea.y + lastArea.height + spacing;

  // Corridor label position
  const corridorLabelX = column1X + roomWidth + spacing + corridorWidth / 2;
  const corridorLabelY = totalHeight / 2; // Center vertically in the corridor space

  return (
    <div className="higher-floors-container">
      <h3 className="text-center mb-4">{`${selectedBlock} - ${selectedFloor}`}</h3>
      <div className="svg-container" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* SVG container with viewBox for scaling */}
        <svg
          width="100%" // Make SVG take full width of container
          height="100%" // Make SVG take full height of container
          viewBox={`0 0 ${totalWidth} ${totalHeight}`} // Define coordinate system
          preserveAspectRatio="xMidYMid meet" // Center and scale aspect ratio
          style={{ maxWidth: '400px', maxHeight: '80vh', border: '1px solid #ccc' }} // Optional: constrain max width and add border
        >
          {/* Render all defined areas */}
          {areas.map((area) => (
            <SvgArea key={area.id} {...area} />
          ))}

          {/* Corridor Text - Rotated */}
          <text
            x={corridorLabelX}
            y={corridorLabelY}
            fontSize="10"
            textAnchor="middle"
            dominantBaseline="middle"
            // Rotate text vertically
            transform={`rotate(-90, ${corridorLabelX}, ${corridorLabelY})`}
          >
            Corridor
          </text>
        </svg>
      </div>
      
      {/* Legend */}
      <div className="legend" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', background: '#bbf7d0', border: '1px solid black', marginRight: '5px' }}></div>
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', background: '#fef08a', border: '1px solid black', marginRight: '5px' }}></div>
          <span>Partially Occupied</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', background: '#fecaca', border: '1px solid black', marginRight: '5px' }}></div>
          <span>Fully Occupied</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', background: '#D3D3D3', border: '1px solid black', marginRight: '5px' }}></div>
          <span>Common Areas</span>
        </div>
      </div>
    </div>
  );
};

export default Phase2Part5HigherFloors;