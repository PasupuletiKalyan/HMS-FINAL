// Export all hostel phase components for easy importing elsewhere

import Phase1FloorPlan, { 
  phase1Config,
  phase1GroundFloorSvgString,
  phase1FirstFloorSvgString,
  phase1SecondFloorSvgString,
  phase1ThirdFloorSvgString,
  phase1FourthFloorSvgString
} from './Phase1';

import Phase1EBlockFloorPlan, { 
  phase1EBlockConfig 
} from './Phase1EBlock';

import Phase2FloorPlan, { 
  phase2Config
} from './Phase2';

import Phase2Part5FloorPlan, { 
  phase2Part5Config 
} from './Phase2Part5';

import Phase3NorthWingFloorPlan, { 
  phase3NorthWingConfig,
  phase3NorthWingGroundFloorSvgString 
} from './Phase3NorthWing';

import Phase3SouthWingFloorPlan, { 
  phase3SouthWingConfig 
} from './Phase3SouthWing';

import Phase4AFloorPlan, { 
  phase4AConfig,
  phase4AGroundFloorSvgString 
} from './Phase4A';

// Import the new split components
import Phase4BLowerFloorPlan, { 
  phase4BLowerConfig,
  phase4BGroundFloorSvgString,
  phase4BSecondFloorSvgString,
  phase4B3rdFloorSvgString
} from './Phase4BLowerFloors';

import Phase4BUpperFloorPlan, { 
  phase4BUpperConfig,
  phase4B6thFloorSvgString,
  phase4B7thFloorSvgString,
  phase4B8thFloorSvgString,
  phase4B9thFloorSvgString,
  phase4B10thFloorSvgString
} from './Phase4BUpperFloors';

// Combined Phase 4B configuration for backward compatibility
const phase4BConfig = {
  ...phase4BLowerConfig,
  ...phase4BUpperConfig
};

// Create a combined Phase4BFloorPlan component
import React from 'react';
import { FloorPlanProps } from './types';

// This component will serve as a factory function to choose the right component
const Phase4BFloorPlan = {
  // Create a wrapper that handles the logic of which component to use
  component: (props: FloorPlanProps) => {
    // Check if the floor is in the upper floors config
    const isUpperFloor = Object.keys(phase4BUpperConfig).includes(props.floor);
    
    // Return the appropriate component
    if (isUpperFloor) {
      return { type: Phase4BUpperFloorPlan, props };
    } else {
      return { type: Phase4BLowerFloorPlan, props };
    }
  }
};

// Export types
export * from './types';

export {
  // Phase 1
  Phase1FloorPlan,
  phase1Config,
  phase1GroundFloorSvgString,
  phase1FirstFloorSvgString,
  phase1SecondFloorSvgString,
  phase1ThirdFloorSvgString,
  phase1FourthFloorSvgString,
  
  // Phase 1 E Block
  Phase1EBlockFloorPlan,
  phase1EBlockConfig,
  
  // Phase 2
  Phase2FloorPlan,
  phase2Config,
  
  // Phase 2 Part 5
  Phase2Part5FloorPlan,
  phase2Part5Config,
  
  // Phase 3 North Wing
  Phase3NorthWingFloorPlan,
  phase3NorthWingConfig,
  phase3NorthWingGroundFloorSvgString,
  
  // Phase 3 South Wing
  Phase3SouthWingFloorPlan,
  phase3SouthWingConfig,
  
  // Phase 4A
  Phase4AFloorPlan,
  phase4AConfig,
  phase4AGroundFloorSvgString,
  
  // Phase 4B Component (combined)
  Phase4BFloorPlan,
  
  // Phase 4B Lower Floors
  Phase4BLowerFloorPlan,
  phase4BLowerConfig,
  
  // Phase 4B Upper Floors
  Phase4BUpperFloorPlan,
  phase4BUpperConfig,
  
  // Phase 4B Combined Config
  phase4BConfig,
  
  // Phase 4B SVG Strings
  phase4BGroundFloorSvgString,
  phase4BSecondFloorSvgString,
  phase4B3rdFloorSvgString,
  phase4B6thFloorSvgString,
  phase4B7thFloorSvgString,
  phase4B8thFloorSvgString,
  phase4B9thFloorSvgString,
  phase4B10thFloorSvgString
};