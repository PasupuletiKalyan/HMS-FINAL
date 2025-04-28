import React from 'react';
import { useNavigate } from 'react-router-dom';
// Import from TypeScript component file
import HostelFloorPlanViewer from '../components/HostelFloorPlanViewer';

// Define proper BookingInfo interface instead of using 'any'
interface BookingInfo {
  block: string;
  floor: string;
  roomNumber: string;
  bed: string;
  roomKey: string;
}

// Define OccupiedBedsRecord to match the one in HostelFloorPlanViewer
interface OccupiedBedsRecord {
  [key: string]: boolean;
}

interface HostelBookingPageProps {
  currentUserBooking: BookingInfo | null;
  setCurrentUserBooking: (booking: BookingInfo | null) => void;
  occupiedBeds: OccupiedBedsRecord;
  setOccupiedBeds: React.Dispatch<React.SetStateAction<OccupiedBedsRecord>>;
}

const HostelBookingPage: React.FC<HostelBookingPageProps> = ({
  currentUserBooking,
  setCurrentUserBooking,
  occupiedBeds,
  setOccupiedBeds
}) => {
  const navigate = useNavigate();

  const navigateToBookingPage = () => {
    navigate("/student-dashboard", { state: { section: "My Booking" } }); // Navigate to "My Booking" section in StudentDashboard
  };

  return (
    <div className="hostel-booking-page">
      <div className="page-container">
        <h1 className="page-title">Hostel Room Selection</h1>
        <p className="page-description">
          Select a hostel block and floor to view available rooms and beds.
          Click on a room to see details and make a booking.
        </p>
        
        <HostelFloorPlanViewer 
          currentUserBooking={currentUserBooking}
          setCurrentUserBooking={setCurrentUserBooking}
          occupiedBeds={occupiedBeds}
          setOccupiedBeds={setOccupiedBeds}
          navigateToBookingPage={navigateToBookingPage}
        />
        
        <div className="back-button-container">
          <button 
            className="back-to-dashboard-btn"
            onClick={() => navigate('/student-dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelBookingPage;
