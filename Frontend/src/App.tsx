import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
// Fix the imports by including the correct file extension
import HostelBookingPage from "./pages/HostelBookingPage";
import CurrentBookingPage from "./pages/CurrentBookingPage.tsx";
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
        <Route path="/payment" element={<PaymentPage />} /> {/* Add route for PaymentPage */}
      </Routes>
    </Router>
  );
};

export default App;
