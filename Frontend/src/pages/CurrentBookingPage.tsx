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
  currentUserBooking}) => {
  const navigate = useNavigate();

  // Cancel booking functionality removed since students should only book once

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
                  <span className="info-value">{currentUserBooking.floor}-{currentUserBooking.roomNumber}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Bed:</span>
                  <span className="info-value">{currentUserBooking.bed}</span>
                </div>
              </div>
              
              {/* Cancel booking button removed since students can only book once */}
            </div>
            
            <div className="actions-container">
              <button 
                className="back-to-dashboard-btn"
                onClick={() => navigate('/student-dashboard')}
              >
                Back to Dashboard
              </button>
              {/* "View Other Rooms" button removed as requested */}
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
