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

// Import the new separate Phase 2 Third Floor component
import Phase2ThirdFloorPlan, {
  phase2ThirdFloorConfig
} from './Phase2ThirdFloor';

// Import the new Phase 2 Sixth Floor component
import Phase2SixthFloorPlan, {
  phase2SixthFloorConfig
} from './Phase2SixthFloor';

// Import the new Phase 2 Seventh Floor component
import Phase2SeventhFloorPlan, {
  phase2SeventhFloorConfig
} from './Phase2SeventhFloor';

// Import the new Phase 2 Eighth Floor component
import Phase2EighthFloorPlan, {
  phase2EighthFloorConfig
} from './Phase2EighthFloor';

// Import the new Phase 2 Ninth Floor component
import Phase2NinthFloorPlan, {
  phase2NinthFloorConfig
} from './Phase2NinthFloor';

// Import the new Phase 2 Tenth Floor component
import Phase2TenthFloorPlan, {
  phase2TenthFloorConfig
} from './Phase2TenthFloor';

// Import the new Phase 2 Eleventh Floor component
import Phase2EleventhFloorPlan, {
  phase2EleventhFloorConfig
} from './Phase2EleventhFloor';

// Import the new Phase 2 Twelfth Floor component
import Phase2TwelfthFloorPlan, {
  phase2TwelfthFloorConfig
} from './Phase2TwelfthFloor';

import Phase2Part5FloorPlan, { 
  phase2Part5Config 
} from './Phase2Part5';

import { 
  Phase3NorthWingFloorPlan, 
  phase3NorthWingConfig,
  phase3NorthWingGroundFloorSvgString 
} from './Phase3NorthWing';

import Phase3SouthWingFloorPlan, { 
  phase3SouthWingConfig 
} from './Phase3SouthWing';

import { 
  Phase4AFloorPlan,
  phase4AConfig,
  phase4AGroundFloorSvgString 
} from './Phase4A';

// Import the new Phase4AUpperFloors component
import Phase4AUpperFloorPlan, {
  phase4AUpperConfig,
  phase4A9thFloorSvgString,
  phase4A10thFloorSvgString
} from './Phase4AUpperFloors';

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

// Import RoomLayout component
import RoomLayout from './RoomLayout';

// Import the new blocks components
import NewBlocksFloorPlan, {
  AravaliFloorPlan,
  AjantaFloorPlan,
  HimalayaFloorPlan,
  ShivalikFloorPlan,
  VindyaFloorPlan,
  NilgiriFloorPlan,
  SatpuraFloorPlan,
  KailashFloorPlan,
  aravaliConfig,
  ajantaConfig,
  himalayaConfig,
  shivalikConfig,
  vindyaConfig,
  nilgiriConfig,
  satpuraConfig,
  kailashConfig,
  newBlocksGroundFloorSvgString,
  newBlocksFirstFloorSvgString,
  newBlocksSecondFloorSvgString
} from './NewBlocks';

// Combined Phase 4B configuration for backward compatibility
const phase4BConfig = {
  ...phase4BLowerConfig,
  ...phase4BUpperConfig
};

// Create a combined Phase4BFloorPlan component
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

// Create a combined Phase4AFloorPlan component wrapper to handle upper floors
const Phase4ACombinedFloorPlan = {
  // Create a wrapper that handles the logic of which component to use
  component: (props: FloorPlanProps) => {
    // Check if the floor is in the upper floors config
    const isUpperFloor = Object.keys(phase4AUpperConfig).includes(props.floor);
    
    // Return the appropriate component
    if (isUpperFloor) {
      return { type: Phase4AUpperFloorPlan, props };
    } else {
      return { type: Phase4AFloorPlan, props };
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
  
  // Phase 2 Third Floor specific component
  Phase2ThirdFloorPlan,
  phase2ThirdFloorConfig,

  // Phase 2 Sixth Floor specific component
  Phase2SixthFloorPlan,
  phase2SixthFloorConfig,

  // Phase 2 Seventh Floor specific component
  Phase2SeventhFloorPlan,
  phase2SeventhFloorConfig,

  // Phase 2 Eighth Floor specific component
  Phase2EighthFloorPlan,
  phase2EighthFloorConfig,

  // Phase 2 Ninth Floor specific component
  Phase2NinthFloorPlan,
  phase2NinthFloorConfig,

  // Phase 2 Tenth Floor specific component
  Phase2TenthFloorPlan,
  phase2TenthFloorConfig,

  // Phase 2 Eleventh Floor specific component
  Phase2EleventhFloorPlan,
  phase2EleventhFloorConfig,

  // Phase 2 Twelfth Floor specific component
  Phase2TwelfthFloorPlan,
  phase2TwelfthFloorConfig,
  
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

  // Phase 4A Upper Floors
  Phase4AUpperFloorPlan,
  phase4AUpperConfig,
  phase4A9thFloorSvgString,
  phase4A10thFloorSvgString,

  // Phase 4A Combined Component
  Phase4ACombinedFloorPlan,
  
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
  phase4B10thFloorSvgString,

  // New Hostel Blocks
  NewBlocksFloorPlan,
  
  // Aravali Block
  AravaliFloorPlan,
  aravaliConfig,
  
  // Ajanta Block
  AjantaFloorPlan,
  ajantaConfig,
  
  // Himalaya Block
  HimalayaFloorPlan,
  himalayaConfig,
  
  // Shivalik Block
  ShivalikFloorPlan,
  shivalikConfig,
  
  // Vindya Block
  VindyaFloorPlan,
  vindyaConfig,
  
  // Nilgiri Block
  NilgiriFloorPlan,
  nilgiriConfig,
  
  // Satpura Block
  SatpuraFloorPlan,
  satpuraConfig,
  
  // Kailash Block
  KailashFloorPlan,
  kailashConfig,
  
  // New Blocks SVG Strings
  newBlocksGroundFloorSvgString,
  newBlocksFirstFloorSvgString,
  newBlocksSecondFloorSvgString,
  
  // Room Layout Component
  RoomLayout
};