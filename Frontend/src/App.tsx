import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HostelBookingPage from "./pages/HostelBookingPage";
import CurrentBookingPage from "./pages/CurrentBookingPage";
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

const App: React.FC = () => {
  // Global state for booking system with proper typing
  const [currentUserBooking, setCurrentUserBooking] = useState<BookingInfo | null>(null);
  const [occupiedBeds, setOccupiedBeds] = useState<Record<string, boolean>>({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard      
          currentUserBooking={currentUserBooking}
        />} />
        <Route path="/warden-dashboard" element={<WardenDashboard />} /> 
        <Route path="/admin-dashboard" element={<AdminDashboard />} />   
        <Route path="/login" element={<LoginPage />} />
        
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
    </Router>
  );
};

export default App;
