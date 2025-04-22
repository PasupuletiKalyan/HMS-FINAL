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