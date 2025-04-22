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

import Phase4BFloorPlan, { 
  phase4BConfig,
  phase4BSecondFloorSvgString,
  phase4B3rdFloorSvgString,
  phase4B4thFloorSvgString,
  phase4B5thFloorSvgString,
  phase4B6thFloorSvgString,
  phase4B7thFloorSvgString,
  phase4B8thFloorSvgString,
  phase4B9thFloorSvgString,
  phase4B10thFloorSvgString
} from './Phase4B';

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
  
  // Phase 4B
  Phase4BFloorPlan,
  phase4BConfig,
  phase4BSecondFloorSvgString,
  phase4B3rdFloorSvgString,
  phase4B4thFloorSvgString,
  phase4B5thFloorSvgString,
  phase4B6thFloorSvgString,
  phase4B7thFloorSvgString,
  phase4B8thFloorSvgString,
  phase4B9thFloorSvgString,
  phase4B10thFloorSvgString
};