// Define shared types for the hostel components
export interface FloorConfig {
  start: number;
  end: number;
  exceptions: number[];
  has12A?: boolean;
  has112A?: boolean;
}

export interface HostelConfig {
  [floorName: string]: FloorConfig;
}

export interface FloorPlanProps {
  floor: string;
  onRoomClick: (roomNumber: string) => void;
  occupiedBeds: Record<string, boolean>;
  selectedBlock: string;
  selectedFloor: string;
}

export interface RoomOccupancyStatus {
  bedA: boolean;
  bedB: boolean;
  totalOccupied: number;
}

export interface ModalRoomInfo {
  number: string;
  block: string;
  floor: string;
  bed?: string;
}

export interface Booking {
  block: string;
  floor: string;
  roomNumber: string | number;
  bed: string;
  roomKey: string;
}

export interface HostelFloorPlanViewerProps {
  currentUserBooking: Booking | null;
  setCurrentUserBooking: React.Dispatch<React.SetStateAction<Booking | null>>;
  occupiedBeds: Record<string, boolean>;
  setOccupiedBeds: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  navigateToBookingPage: () => void;
}

// Utility function to get room occupancy status
export const getRoomOccupancyStatus = (
  roomNumber: string | number,
  occupiedBeds: Record<string, boolean>,
  selectedBlock: string,
  selectedFloor: string
): string => {
  // Special case for Warden Room (33)
  if (roomNumber === 33 || roomNumber === "33") {
    return "fully-occupied"; // Mark Warden Room as unbookable
  }
  
  const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
  const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
  
  const isBedAOccupied = occupiedBeds[bedAKey] || false;
  const isBedBOccupied = occupiedBeds[bedBKey] || false;
  
  if (isBedAOccupied && isBedBOccupied) {
    return "fully-occupied"; // Both beds occupied
  } else if (isBedAOccupied || isBedBOccupied) {
    return "partially-occupied"; // Only one bed occupied
  } else {
    return "available"; // No beds occupied
  }
};

// Utility function to get room fill color based on occupancy status
export const getRoomFillColor = (
  roomNumber: string | number,
  occupiedBeds: Record<string, boolean>,
  selectedBlock: string,
  selectedFloor: string
): string => {
  // Special case for Warden Room (33)
  if (roomNumber === 33 || roomNumber === "33") {
    return "#d8b4fe"; // Purple for warden room
  }
  
  const status = getRoomOccupancyStatus(roomNumber, occupiedBeds, selectedBlock, selectedFloor);
  
  switch (status) {
    case "fully-occupied":
      return "#fca5a5"; // Red for fully occupied
    case "partially-occupied":
      return "#fde047"; // Yellow for partially occupied
    case "available":
    default:
      return "#86efac"; // Green for available
  }
};