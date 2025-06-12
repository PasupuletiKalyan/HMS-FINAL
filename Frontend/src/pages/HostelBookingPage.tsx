import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../config/api';
// Import from TypeScript component file
import HostelFloorPlanViewer from '../components/HostelFloorPlanViewer';
import '../styles/HostelBookingPage.css';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const checkStudentProgress = async () => {
      setIsLoading(true);
      try {
        const applicationNumber = localStorage.getItem("applicationNo");
        
        if (!applicationNumber) {
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }
        
        // Fetch progress from the server
        const response = await fetch(buildApiUrl(`/api/progress/${applicationNumber}`));
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.success) {
            // Check if both form and payment are completed
            if (!data.progress.formCompleted) {
              alert("You must fill the hostel form first before accessing hostel booking.");
              navigate("/student-dashboard");
              return;
            }
            
            if (!data.progress.paymentCompleted) {
              alert("You must complete the payment before accessing hostel booking.");
              navigate("/student-dashboard");
              return;
            }
            
            // If we get here, the student can access the booking page
            // Update localStorage for consistency
            localStorage.setItem("formCompleted", "true");
            localStorage.setItem("paymentCompleted", "true");
            
            // Add to completedSteps in localStorage if not already there
            const completedSteps = JSON.parse(localStorage.getItem("completedSteps") || "[]");
            if (!completedSteps.includes(1)) {
              completedSteps.push(1);
            }
            if (!completedSteps.includes(2)) {
              completedSteps.push(2);
            }
            localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
            
          } else {
            alert("Error retrieving your progress. Please try again.");
            navigate("/student-dashboard");
          }
        } else {
          alert("Error connecting to server. Please try again.");
          navigate("/student-dashboard");
        }
      } catch (error) {
        console.error("Error checking student progress:", error);
        alert("An error occurred. Please try again.");
        navigate("/student-dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkStudentProgress();
  }, [navigate]);

  const navigateToBookingPage = () => {
    navigate("/student-dashboard", { state: { section: "My Booking" } });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your booking information...</p>
      </div>
    );
  }

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
