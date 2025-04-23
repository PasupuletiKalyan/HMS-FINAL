import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';
import Phase4BLowerFloorPlan, { phase4BLowerConfig } from './Phase4BLowerFloors';
import Phase4BUpperFloorPlan, { phase4BUpperConfig } from './Phase4BUpperFloors';

// Combined Phase 4B configuration
export const phase4BConfig: Record<string, FloorConfig> = {
  ...phase4BLowerConfig,
  ...phase4BUpperConfig
};

// Phase4B component that renders either lower or upper floors based on selected floor
const Phase4BFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;

  // Check if the selected floor is in lower floors (Ground to 5th)
  const isLowerFloor = Object.keys(phase4BLowerConfig).includes(floor);
  
  // Check if the selected floor is in upper floors (6th to 10th)
  const isUpperFloor = Object.keys(phase4BUpperConfig).includes(floor);
  
  if (isLowerFloor) {
    return (
      <Phase4BLowerFloorPlan
        floor={floor}
        onRoomClick={onRoomClick}
        occupiedBeds={occupiedBeds}
        selectedBlock={selectedBlock}
        selectedFloor={selectedFloor}
      />
    );
  }
  
  if (isUpperFloor) {
    return (
      <Phase4BUpperFloorPlan
        floor={floor}
        onRoomClick={onRoomClick}
        occupiedBeds={occupiedBeds}
        selectedBlock={selectedBlock}
        selectedFloor={selectedFloor}
      />
    );
  }
  
  // Fallback if floor is not found in either configuration
  return <p>Selected floor {floor} not available for {selectedBlock}</p>;
};

export default Phase4BFloorPlan;