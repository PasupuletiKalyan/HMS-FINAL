interface RoomData {
  coordinates: { x: number; y: number };
  status: string;
  bedCount: number;
}

interface FloorConfig {
  [roomNumber: string]: RoomData;
}

interface HostelData {
  [block: string]: {
    [floor: string]: FloorConfig;
  };
}

export const hostelData: HostelData = {
  "Phase 1": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Phase 1 E Block": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Phase 2": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Phase 2 Part 5": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Phase 3 North Wing": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Phase 3 South Wing": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Phase 4A": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Phase 4B": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Aravali": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Ajanta": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Himalaya": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Shivalik": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Vindya": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Nilgiri": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Satpura": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  },
  "Kailash": {
    "Ground Floor": {},
    "First Floor": {},
    "Second Floor": {},
    "Third Floor": {},
  }
};
