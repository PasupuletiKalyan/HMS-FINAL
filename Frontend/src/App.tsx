import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HostelBookingPage from "./pages/HostelBookingPage";
import CurrentBookingPage from "./pages/CurrentBookingPage";
import HostelFormPage from "./pages/HostelFormPage"; // Import the new HostelFormPage
import ChangePassword from "./pages/ChangePassword"; // Import ChangePassword component
import "./App.css"; // Import global styles
import PaymentPage from "./pages/PaymentPage"; // Import PaymentPage     

// Define the BookingInfo interface
interface BookingInfo {
  block: string;
  floor: string;
  roomNumber: string;
  bed: string;
  roomKey: string;
}

// Create a wrapper component to reset state on location change
const LocationAwareApp: React.FC = () => {
  const location = useLocation();
  const [currentUserBooking, setCurrentUserBooking] = useState<BookingInfo | null>(null);
  const [occupiedBeds, setOccupiedBeds] = useState<Record<string, boolean>>({});
  // Track the current application number to detect user changes
  const [currentApplicationNo, setCurrentApplicationNo] = useState<string | null>(null);
  // Add state to track completed steps
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Load booking information when the app initializes or location changes
  useEffect(() => {
    const loadBookingInfo = async () => {
      const userRole = localStorage.getItem("userRole") || "";
      const userId = localStorage.getItem(`${userRole}_userId`) || "";
      const applicationNo = localStorage.getItem("applicationNo") || "";
      
      // Check if user has changed
      const userChanged = currentApplicationNo !== applicationNo;
      if (userChanged) {
        // Reset state when user changes
        setCurrentUserBooking(null);
        setOccupiedBeds({});
        setCompletedSteps([]);
        setCurrentApplicationNo(applicationNo);
      }
      
      if (applicationNo) {        try {
          // Get the overall progress from backend - this is the single source of truth
          const response = await fetch(`http://localhost:5000/api/progress/${applicationNo}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              // Load completed steps from backend
              const backendCompletedSteps = data.progress.completedSteps || [];
              setCompletedSteps(backendCompletedSteps);
              
              // Store in localStorage for persistence
              localStorage.setItem("completedSteps", JSON.stringify(backendCompletedSteps));
              
              // Set form and payment completion flags in localStorage based on backend data
              if (data.progress.formCompleted) {
                localStorage.setItem("formCompleted", "true");
              } else {
                localStorage.removeItem("formCompleted");
              }
              
              if (data.progress.paymentCompleted) {
                localStorage.setItem("paymentCompleted", "true");
              } else {
                localStorage.removeItem("paymentCompleted");
              }
              
              if (data.progress.roomBooked && data.progress.bookingDetails) {
                const bookingFromBackend: BookingInfo = {
                  block: data.progress.bookingDetails.block,
                  floor: data.progress.bookingDetails.floor,
                  roomNumber: data.progress.bookingDetails.roomNumber,
                  bed: data.progress.bookingDetails.bed,
                  roomKey: data.progress.bookingDetails.roomKey
                };
                
                // Save to state
                setCurrentUserBooking(bookingFromBackend);
                
                // Also save to localStorage with user-specific key
                if (userId) {
                  const bookingKey = `${userRole}_${userId}_userBooking`;
                  localStorage.setItem(bookingKey, JSON.stringify(bookingFromBackend));
                  
                  // Mark this bed as occupied
                  const bedKey = `${bookingFromBackend.block}_${bookingFromBackend.floor}_${bookingFromBackend.roomNumber}_${bookingFromBackend.bed}`;
                  setOccupiedBeds(prev => ({
                    ...prev,
                    [bedKey]: true
                  }));
                  
                  // Save occupied beds to localStorage
                  localStorage.setItem(`occupiedBeds_${userId}`, JSON.stringify({
                    [bedKey]: true
                  }));
                }
              }
            }
          }
        } catch (error) {
          console.error("Error fetching data from backend:", error);
        }
      }
    };
    
    loadBookingInfo();
  }, [location.pathname, currentApplicationNo]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard      
        currentUserBooking={currentUserBooking}
        setCurrentUserBooking={setCurrentUserBooking}
      />} />
      <Route path="/warden-dashboard" element={<WardenDashboard />} /> 
      <Route path="/admin-dashboard" element={<AdminDashboard />} />   
      <Route path="/login" element={<LoginPage />} />
      
      {/* Add route for our new Hostel Form Page */}
      <Route path="/hostel-form" element={<HostelFormPage />} />
      
      {/* Add route for changing password */}
      <Route path="/change-password" element={<ChangePassword />} />
      
      {/* Hostel Booking Routes */}
      <Route
        path="/hostel-booking"
        element={
          <HostelBookingPage
            currentUserBooking={currentUserBooking}
            setCurrentUserBooking={setCurrentUserBooking}
            occupiedBeds={occupiedBeds}
            setOccupiedBeds={setOccupiedBeds}
          />
        }
      />
      <Route
        path="/current-booking"
        element={
          <CurrentBookingPage
            currentUserBooking={currentUserBooking}
            setCurrentUserBooking={setCurrentUserBooking}
            occupiedBeds={occupiedBeds}
            setOccupiedBeds={setOccupiedBeds}
          />
        }
      />

      {/* Payment Route from HEAD branch */}
      <Route path="/payment" element={<PaymentPage />} /> {/* Add route for PaymentPage */}

      {/* Adding missing routes from floor-layouts branch */}
      <Route path="/notices" element={<div>Notices Page (Coming Soon)</div>} />
      <Route path="/complaints" element={<div>Complaints Page (Coming Soon)</div>} />
      <Route path="/profile" element={<div>Profile Page (Coming Soon)</div>} />
      <Route path="/students" element={<div>Students Management (Coming Soon)</div>} />
      <Route path="/rooms" element={<div>Rooms Management (Coming Soon)</div>} />
      <Route path="/users" element={<div>Users Management (Coming Soon)</div>} />
      <Route path="/hostel-management" element={<div>Hostel Management (Coming Soon)</div>} />
      <Route path="/reports" element={<div>Reports Page (Coming Soon)</div>} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <LocationAwareApp />
    </Router>
  );
};

export default App;
