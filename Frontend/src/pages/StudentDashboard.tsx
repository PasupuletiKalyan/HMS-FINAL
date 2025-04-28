import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation control
import "../styles/StudentDashboardStyles.css"; // Use the same styles as AdminDashboard
import collegeLogo from "../assets/college-logo.jpg";
import defaultProfilePic from "../assets/default-profile-pic.jpg"; // Placeholder for student profile picture

// Define proper BookingInfo interface instead of using 'any'
interface BookingInfo {
  block: string;
  floor: string;
  roomNumber: string;
  bed: string;
  roomKey: string;
}

interface StudentDashboardProps {
  currentUserBooking: BookingInfo | null;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ currentUserBooking }) => {
  const [selectedSection, setSelectedSection] = useState("Dashboard"); // Track the selected section
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Track profile dropdown visibility
  const [currentStep, setCurrentStep] = useState<number>(1); // Track the current step (1, 2, or 3)
  const [showForm, setShowForm] = useState(false); // Track whether the form is displayed
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Track payment form visibility
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]); // Track completed steps
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format.";
    }
    if (!/^\d{3}$/.test(paymentDetails.cvv)) {
      newErrors.cvv = "CVV must be 3 digits.";
    }
    if (!paymentDetails.cardHolderName.trim()) {
      newErrors.cardHolderName = "Cardholder name is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const profileRef = useRef<HTMLDivElement | null>(null); // Reference for the profile dropdown
  const userName = localStorage.getItem("userName") || "Student";
  const applicationNumber = localStorage.getItem("applicationNumber") || "123456"; // Placeholder for application number
  const profilePic = localStorage.getItem("profilePic") || defaultProfilePic; // Use default image if no profile picture is available

  // Close the profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Load completed steps from localStorage when component mounts
    const savedSteps = localStorage.getItem("completedSteps");
    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }
    
    // Check individual step completion
    const isFormCompleted = localStorage.getItem("formCompleted") === "true";
    const isPaymentCompleted = localStorage.getItem("paymentCompleted") === "true";
    
    if (isFormCompleted && !completedSteps.includes(1)) {
      setCompletedSteps(prev => [...prev, 1]);
    }
    if (isPaymentCompleted && !completedSteps.includes(2)) {
      setCompletedSteps(prev => [...prev, 2]);
      setCurrentStep(3); // Set current step to hostel booking
    }
  }, []);

  const handleStepClick = (step: number) => {
    // Check if previous steps are completed
    if (step > 1 && !completedSteps.includes(step - 1)) {
      alert("Please complete the previous steps first!");
      return;
    }

    setCurrentStep(step);
    switch (step) {
      case 1:
        setShowForm(true);
        setShowPaymentForm(false);
        break;
      case 2:
        if (!completedSteps.includes(1)) {
          alert("Please fill the form first!");
          return;
        }
        navigate("/payment");
        break;
      case 3:
        if (!completedSteps.includes(2)) {
          alert("Please complete the payment first!");
          return;
        }
        navigate("/hostel-booking");
        break;
    }
  };

  const handleFormSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate phone numbers
    const phoneFields = ["phone_number", "father_mobile", "mother_mobile", "emergency_contact"];
    for (const field of phoneFields) {
      const input = (e.target as HTMLFormElement)[field] as HTMLInputElement;
      if (!/^\d{10}$/.test(input.value)) {
        alert(`Please enter a valid 10-digit number for ${field.replace("_", " ")}`);
        return;
      }
    }

    alert("Form submitted successfully!");
    setShowForm(false);
    setCompletedSteps(prev => [...prev, 1]); // Mark step 1 as completed
    setCurrentStep(2);
    localStorage.setItem("formCompleted", "true"); // Store form completion
  };
  
  // Add function to mark payment as complete
  const markPaymentComplete = () => {
    const newCompletedSteps = [...completedSteps, 2];
    setCompletedSteps(newCompletedSteps);
    localStorage.setItem("completedSteps", JSON.stringify(newCompletedSteps));
    localStorage.setItem("paymentCompleted", "true");
    setCurrentStep(3);
    navigate("/hostel-booking");
  };

  // Add function to mark booking as complete
  const markBookingComplete = () => {
    setCompletedSteps(prev => [...prev, 3]); // Mark step 3 as completed
  };

  const validatePhoneNumber = (name: string, value: string) => {
    if (value === "" || /^\d{10}$/.test(value)) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev; // Remove error if input is valid or empty
        return rest;
      });
    } else {
      setErrors((prev) => ({ ...prev, [name]: "Phone number must be 10 digits" }));
    }
  };

  // Ensure the browser's back button navigates to the dashboard
  useEffect(() => {
    // Push the current state to the history stack when the form is shown
    if (showForm) {
      navigate("/student-dashboard", { replace: false });
    }

    const handlePopState = () => {
      setShowForm(false); // Ensure the form is hidden
      setSelectedSection("Dashboard"); // Set the section to Dashboard
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [showForm, navigate]);

  useEffect(() => {
    setCurrentStep(1); // Default to step 1
    setShowForm(false); // Ensure no form is shown initially
    setShowPaymentForm(false); // Ensure no payment form is shown initially
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored user data
    navigate("/login"); // Redirect to the login page
  };

  return (
    <>
      <div className="dashboard-container">
        {/* TOP NAVIGATION BAR */}
        <div className="dashboard-top-nav">
          <div className="profile-section-top">
            <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
          </div>
          <ul className="top-menu">
            {[
              "Dashboard",
              "My Booking",
              "Notices",
              "Messages",
              "Complaints",
            ].map((item) => (
              <li
                key={item}
                className={`top-menu-item ${selectedSection === item ? "active" : ""}`}
                onClick={() => {
                  if (item === "My Booking") {
                    navigate("/current-booking"); // Navigate to CurrentBookingPage
                  } else {
                    setSelectedSection(item); // Update the selected section
                  }
                }}
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="profile-button-container" ref={profileRef}>
            <button
              className="profile-clickable"
              onClick={() => setShowProfileDropdown((prev) => !prev)}
            >
              <img src={profilePic} alt="Profile" className="profile-circle-image" />
              <p className="profile-name">{userName}</p>
            </button>
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <p>
                    <strong>Application Number:</strong> {applicationNumber}
                  </p>
                </div>
                <ul>
                  <li onClick={() => navigate("/change-password")}>
                    Change Password
                  </li>
                  <li onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="dashboard-content">
          {/* Render heading based on the current state */}
          {selectedSection === "Dashboard" && (
            <>
              <div className="welcome-section">
                <p className="welcome-message">Hi, {userName}! Welcome to your dashboard.</p>
                <p className="salutation" style={{ 
                  fontSize: "18px", 
                  color: "#555", 
                  marginTop: "10px",
                  fontWeight: "bold" 
                }}>
                  Hope you're having a great day!
                </p>
              </div>

              {/* Announcements Section */}
              <div className="announcements-section">
                <h3 style={{ 
                  marginBottom: "15px", 
                  color: "#007bff", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  gap: "8px"
                }}>
                  <i className="fas fa-bullhorn" style={{ fontSize: "20px" }}></i>
                  Latest Announcements
                </h3>
                <div className="slidin-container" style={{ 
                  margin: "0 auto",
                  maxWidth: "800px",
                  background: "linear-gradient(to right, #f8f9fa, #ffffff, #f8f9fa)",
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e9ecef"
                }}>
                  <iframe
                    src="/src/assets/slidin.html"
                    title="Important Announcements"
                    className="slidin-iframe"
                    scrolling="no"
                    style={{
                      width: "100%",
                      height: "180px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "transparent"
                    }}
                  ></iframe>
                </div>
              </div>

              {/* Add some spacing before Step Progress */}
              <div style={{ height: "30px" }}></div>
              
              {/* Step Progress Indicator */}
              <div className="step-progress">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    {step > 1 && (
                      <div
                        className={`step-line ${
                          completedSteps.includes(step - 1) ? "completed" : ""
                        }`}
                      />
                    )}
                    <div
                      className={`step-dot ${
                        completedSteps.includes(step)
                          ? "completed"
                          : currentStep === step
                          ? "current"
                          : ""
                      }`}
                    />
                  </React.Fragment>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons" style={{ marginTop: "30px", textAlign: "center" }}>
                <h3 style={{ marginBottom: "15px", color: "#007bff" }}>Actions</h3>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                  <button
                    className={`${completedSteps.includes(1) ? "completed" : ""} ${
                      currentStep === 1 ? "current" : ""
                    }`}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: completedSteps.includes(1) ? "not-allowed" : "pointer",
                    }}
                    onClick={() => handleStepClick(1)}
                    disabled={completedSteps.includes(1)}
                  >
                    Fill Form
                  </button>
                  <button
                    className={`${completedSteps.includes(2) ? "completed" : ""} ${
                      currentStep === 2 ? "current" : ""
                    }`}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: !completedSteps.includes(1) || completedSteps.includes(2) ? "not-allowed" : "pointer",
                    }}
                    onClick={() => handleStepClick(2)}
                    disabled={!completedSteps.includes(1) || completedSteps.includes(2)}
                  >
                    Pay Fee
                  </button>
                  <button
                    className={`${completedSteps.includes(3) ? "completed" : ""} ${
                      currentStep === 3 ? "current" : ""
                    }`}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#ffc107",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: !completedSteps.includes(2) || completedSteps.includes(3) ? "not-allowed" : "pointer",
                    }}
                    onClick={() => handleStepClick(3)}
                    disabled={!completedSteps.includes(2) || completedSteps.includes(3)}
                  >
                    Book Hostel Room
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Show Form and Status Bar only for Dashboard */}
          {selectedSection === "Dashboard" && (
            <>
              {/* Show Form */}
              {showForm ? (
                <form onSubmit={handleFormSubmit2} className="hostel-form">
                  {/* Hostel Form Fields */}
                  {[
                    { name: "admission_no", label: "Admission Number", type: "text", placeholder: "Enter your admission number" },
                    { name: "hall_ticket_no", label: "Hall Ticket Number", type: "text", placeholder: "Enter your hall ticket number" },
                    { name: "batch", label: "Batch", type: "text", placeholder: "Enter your batch (e.g., 2023-2027)" },
                    { name: "programme", label: "Programme", type: "text", placeholder: "Enter your programme (e.g., B.Tech)" },
                    { name: "school", label: "School", type: "text", placeholder: "Enter your school name" },
                    { name: "student_name", label: "Student Name", type: "text", placeholder: "Enter your full name" },
                    { name: "student_email", label: "Student Email", type: "email", placeholder: "Enter your email address" },
                    { name: "father_name", label: "Father's Name", type: "text", placeholder: "Enter your father's name" },
                    { name: "mother_name", label: "Mother's Name", type: "text", placeholder: "Enter your mother's name" },
                    { name: "dob_place", label: "Place of Birth", type: "text", placeholder: "Enter your place of birth" },
                    { name: "blood_group", label: "Blood Group", type: "text", placeholder: "Enter your blood group (e.g., O+)" },
                    { name: "medical_history", label: "Medical History", type: "textarea", placeholder: "Enter any medical history" },
                    { name: "permanent_address", label: "Permanent Address", type: "textarea", placeholder: "Enter your permanent address" },
                    { name: "local_guardian", label: "Local Guardian", type: "text", placeholder: "Enter your local guardian's name" },
                  ].map((field) => (
                    <div className="form-group" key={field.name}>
                      <label>{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          placeholder={field.placeholder}
                          className="no-resize"
                          required
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          required
                        />
                      )}
                    </div>
                  ))}

                  <div className="form-group">
                    <label>Date Of Birth</label>
                    <input type="date" name="dob" required />
                  </div>

                  <div className="form-group">
                    <label>Nationality</label>
                    <select name="nationality" required defaultValue="">
                      <option value="" disabled>
                        Select your nationality
                      </option>
                      <option value="Indian">Indian</option>
                      <option value="NRI">NRI</option>
                    </select>
                  </div>

                  {/* Phone Number Fields */}
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="phone-number-container" style={{ display: "flex", alignItems: "center" }}>
                      <select
                        name="country_code"
                        required
                        style={{ width: "80px", marginRight: "10px" }}
                        defaultValue="+91"
                      >
                        {[
                          { value: "+1", label: "+1 (USA)" },
                          { value: "+91", label: "+91 (India)" },
                          { value: "+44", label: "+44 (UK)" },
                          { value: "+61", label: "+61 (Australia)" },
                          { value: "+81", label: "+81 (Japan)" },
                        ].map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone_number"
                        placeholder="Enter your phone number"
                        maxLength={10}
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          validatePhoneNumber(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    {errors.phone_number && <p className="error-message">{errors.phone_number}</p>} {/* Show error */}
                  </div>

                  <div className="form-group">
                    <label>Father's Mobile</label>
                    <div className="phone-number-container" style={{ display: "flex", alignItems: "center" }}>
                      <select
                        name="country_code_father"
                        required
                        style={{ width: "80px", marginRight: "10px" }} // Small dropdown to the left
                      >
                        <option value="+1">+1 (USA)</option>
                        <option value="+91" selected>+91 (India)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+61">+61 (Australia)</option>
                        <option value="+81">+81 (Japan)</option>
                        {/* Add more country codes as needed */}
                      </select>
                      <input
                        type="tel"
                        name="father_mobile"
                        placeholder="Enter your father's mobile number"
                        maxLength={10} // Restrict to 10 digits
                        required
                        onChange={(e) => validatePhoneNumber(e.target.name, e.target.value)} // Validate on change
                      />
                    </div>
                    {errors.father_mobile && <p className="error-message">{errors.father_mobile}</p>} {/* Show error */}
                  </div>

                  <div className="form-group">
                    <label>Mother's Mobile</label>
                    <div className="phone-number-container" style={{ display: "flex", alignItems: "center" }}>
                      <select
                        name="country_code_mother"
                        required
                        style={{ width: "80px", marginRight: "10px" }} // Small dropdown to the left
                      >
                        <option value="+1">+1 (USA)</option>
                        <option value="+91" selected>+91 (India)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+61">+61 (Australia)</option>
                        <option value="+81">+81 (Japan)</option>
                        {/* Add more country codes as needed */}
                      </select>
                      <input
                        type="tel"
                        name="mother_mobile"
                        placeholder="Enter your mother's mobile number"
                        maxLength={10} // Restrict to 10 digits
                        required
                        onChange={(e) => validatePhoneNumber(e.target.name, e.target.value)} // Validate on change
                      />
                    </div>
                    {errors.mother_mobile && <p className="error-message">{errors.mother_mobile}</p>} {/* Show error */}
                  </div>

                  <div className="form-group">
                    <label>Emergency Contact</label>
                    <div className="phone-number-container" style={{ display: "flex", alignItems: "center" }}>
                      <select
                        name="country_code_emergency"
                        required
                        style={{ width: "80px", marginRight: "10px" }} // Small dropdown to the left
                      >
                        <option value="+1">+1 (USA)</option>
                        <option value="+91" selected>+91 (India)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+61">+61 (Australia)</option>
                        <option value="+81">+81 (Japan)</option>
                        {/* Add more country codes as needed */}
                      </select>
                      <input
                        type="tel"
                        name="emergency_contact"
                        placeholder="Enter an emergency contact number"
                        maxLength={10} // Restrict to 10 digits
                        required
                        onChange={(e) => validatePhoneNumber(e.target.name, e.target.value)} // Validate on change
                      />
                    </div>
                    {errors.emergency_contact && <p className="error-message">{errors.emergency_contact}</p>} {/* Show error */}
                  </div>

                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => {
                      setShowForm(false); // Hide the form
                      setCurrentStep(1); // Reset to the first step
                    }}
                  >
                    Back to Dashboard
                  </button>
                </form>
              ) : showPaymentForm ? (
                <form onSubmit={(e) => e.preventDefault()} className="payment-form">
                  {/* Payment Form Fields */}
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Enter your card number"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="Enter CVV"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      name="cardHolderName"
                      placeholder="Enter cardholder name"
                      value={paymentDetails.cardHolderName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-button" onClick={markPaymentComplete}>
                    Proceed to Payment
                  </button>
                </form>
              ) : null}
            </>
          )}

          {/* My Booking Section */}
          {selectedSection === "My Booking" && (
            <div className="my-booking-section">
              {currentUserBooking ? (
                <div className="booking-details">
                  <h2>Your Current Booking</h2>
                  <p><strong>Block:</strong> {currentUserBooking.block}</p>
                  <p><strong>Floor:</strong> {currentUserBooking.floor}</p>
                  <p><strong>Room Number:</strong> {currentUserBooking.roomNumber}</p>
                  <p><strong>Bed:</strong> {currentUserBooking.bed}</p>
                </div>
              ) : (
                <div className="no-booking-message">
                  <h2>No Active Bookings</h2>
                  <p>You currently have no active bookings. Please book a room to see details here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        <p>
          <a href="/about">About</a> | <a href="/contact">Contact</a> |{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </>
  );
};

export default StudentDashboard;