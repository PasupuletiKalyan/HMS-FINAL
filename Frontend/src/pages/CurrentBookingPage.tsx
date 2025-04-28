import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CurrentBookingPage.css';

// Define proper BookingInfo interface
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

interface CurrentBookingPageProps {
  currentUserBooking: BookingInfo | null;
  setCurrentUserBooking: React.Dispatch<React.SetStateAction<BookingInfo | null>>;
  occupiedBeds: OccupiedBedsRecord;
  setOccupiedBeds: React.Dispatch<React.SetStateAction<OccupiedBedsRecord>>;
}

const CurrentBookingPage: React.FC<CurrentBookingPageProps> = ({
  currentUserBooking,
  setCurrentUserBooking,
  occupiedBeds,
  setOccupiedBeds
}) => {
  const navigate = useNavigate();

  // Handle cancellation of booking
  const handleCancelBooking = () => {
    if (currentUserBooking) {
      // Remove the bed from occupied beds
      setOccupiedBeds(prev => {
        const newOccupiedBeds = { ...prev };
        delete newOccupiedBeds[currentUserBooking.roomKey];
        return newOccupiedBeds;
      });
      
      // Clear the current user booking
      setCurrentUserBooking(null);
    }
  };

  return (
    <div className="current-booking-page">
      <div className="page-container">
        <h1 className="page-title">Your Current Booking</h1>
        
        {currentUserBooking ? (
          <div className="booking-details-container">
            <div className="booking-card">
              <h2 className="booking-title">Booking Details</h2>
              <div className="booking-info">
                <div className="info-row">
                  <span className="info-label">Block:</span>
                  <span className="info-value">{currentUserBooking.block}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Floor:</span>
                  <span className="info-value">{currentUserBooking.floor}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Room Number:</span>
                  <span className="info-value">{currentUserBooking.roomNumber}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Bed:</span>
                  <span className="info-value">{currentUserBooking.bed}</span>
                </div>
              </div>
              
              <button 
                className="cancel-booking-btn"
                onClick={handleCancelBooking}
              >
                Cancel Booking
              </button>
            </div>
            
            <div className="actions-container">
              <button 
                className="back-to-dashboard-btn"
                onClick={() => navigate('/student-dashboard')}
              >
                Back to Dashboard
              </button>
              <button 
                className="back-to-booking-btn"
                onClick={() => navigate('/hostel-booking')}
              >
                View Other Rooms
              </button>
            </div>
          </div>
        ) : (
          <div className="no-booking-container">
            <p className="no-booking-message">
              You don't have any active bookings.
            </p>
            <button 
              className="book-now-btn"
              onClick={() => navigate('/hostel-booking')}
            >
              Book a Room Now
            </button>
            <button 
              className="back-to-dashboard-btn"
              onClick={() => navigate('/student-dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentBookingPage;
