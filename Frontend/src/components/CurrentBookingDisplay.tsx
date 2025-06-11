import React from 'react';
import '../styles/CurrentBookingPage.css';

// Define TypeScript interface for the booking info
interface BookingInfo {
  block: string;
  floor: string;
  roomNumber: string;
  bed: string;
  roomKey: string;
}

interface CurrentBookingPageProps {
  currentUserBooking: BookingInfo | null;
  onCancelBooking?: () => void;
  navigateToFloorPlan?: () => void;
}

const CurrentBookingPage: React.FC<CurrentBookingPageProps> = ({ 
  currentUserBooking, 
  onCancelBooking, 
  navigateToFloorPlan 
}) => {
  if (!currentUserBooking) {
    return (
      <div className="no-booking-container">
        <h2>No Active Booking</h2>
        <p>You don't have any active hostel bookings.</p>
        {navigateToFloorPlan && (
          <button onClick={navigateToFloorPlan} className="return-btn">
            Return to Floor Plan
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <h1 className="booking-page-heading">Your Hostel Booking</h1>
      
      <div className="booking-card">
        <div className="booking-header">
          <h2>Booking Details</h2>
          <span className="booking-status-badge">Active</span>
        </div>
        
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
        
        <div className="booking-note" style={{
          backgroundColor: "#fff3f3",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          borderLeft: "5px solid #e53935"
        }}>
          <p style={{ margin: "5px 0", fontWeight: "500" }}><strong>Note:</strong> Please report to the hostel office with your booking details for key collection.</p>
          <p style={{ margin: "5px 0" }}>Your room booking has been confirmed and is valid for the current academic year.</p>
        </div>
        
        {(navigateToFloorPlan || onCancelBooking) && (
          <div className="booking-actions">
            {navigateToFloorPlan && (
              <button onClick={navigateToFloorPlan} className="return-btn">
                Back to Floor Plan
              </button>
            )}
            {onCancelBooking && (
              <button onClick={onCancelBooking} className="cancel-btn">
                Cancel Booking
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentBookingPage;