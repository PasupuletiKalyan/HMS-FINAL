import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import "../styles/WardenDashboardStyles.css";

// Define proper BookingInfo interface instead of using 'any'
interface BookingInfo {
  block: string;
  floor: string;
  roomNumber: string;
  bed: string;
  roomKey: string;
  allottedBy?: string;
  allotmentReason?: string;
  allotmentDate?: string;
}

interface StudentDashboardProps {
  currentUserBooking: BookingInfo | null;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ currentUserBooking }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";
  
  // Dummy data for dashboard statistics
  const stats = {
    noticeCount: 5,
    messageCount: 2,
    complaintsCount: 0,
    eventsCount: 3
  };
  
  return (
    <div className="dashboard-container">
      <Navbar activePage="dashboard" userType="student" />
      
      <main className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome back, {userName}!</h1>
          <p className="last-login">Last login: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="dashboard-grid">
          {/* Hostel Booking Card */}
          <div className="dashboard-card hostel-card">
            <div className="card-header">
              <h2>Hostel Room</h2>
              <span className={`status-badge ${currentUserBooking ? 'active' : 'inactive'}`}>
                {currentUserBooking ? 'Booked' : 'Not Booked'}
              </span>
            </div>
            
            <div className="card-body">
              {currentUserBooking ? (
                <div className="booking-summary">
                  <p><strong>Block:</strong> {currentUserBooking.block}</p>
                  <p><strong>Room:</strong> {currentUserBooking.roomNumber}</p>
                  <p><strong>Bed:</strong> {currentUserBooking.bed}</p>
                  {currentUserBooking.allottedBy && (
                    <>
                      <p><strong>Allotted By:</strong> {currentUserBooking.allottedBy}</p>
                      <p><strong>Allotment Date:</strong> {new Date(currentUserBooking.allotmentDate!).toLocaleDateString()}</p>
                      <p><strong>Reason:</strong> {currentUserBooking.allotmentReason}</p>
                    </>
                  )}
                </div>
              ) : (
                <p>You haven't booked a hostel room yet.</p>
              )}
            </div>
            
            <div className="card-footer">
              <button 
                className="primary-button" 
                onClick={() => navigate(currentUserBooking ? '/current-booking' : '/hostel-booking')}
              >
                {currentUserBooking ? 'View Booking' : 'Book a Room'}
              </button>
            </div>
          </div>
          
          {/* Notices Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Notices</h2>
              <span className="count-badge">{stats.noticeCount}</span>
            </div>
            <div className="card-body">
              <p>You have {stats.noticeCount} new notices to read.</p>
            </div>
            <div className="card-footer">
              <button className="secondary-button">View Notices</button>
            </div>
          </div>
          
          {/* Messages Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Messages</h2>
              <span className="count-badge">{stats.messageCount}</span>
            </div>
            <div className="card-body">
              <p>You have {stats.messageCount} unread messages.</p>
            </div>
            <div className="card-footer">
              <button className="secondary-button">View Messages</button>
            </div>
          </div>
          
          {/* Complaints Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Complaints</h2>
              <span className="count-badge">{stats.complaintsCount}</span>
            </div>
            <div className="card-body">
              <p>You have {stats.complaintsCount} active complaints.</p>
            </div>
            <div className="card-footer">
              <button className="secondary-button">File a Complaint</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;