import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import defaultProfilePic from "../assets/default-profile-pic.jpg";
import ResetStudentProgress from "../components/ResetStudentProgress"; // Import the reset component
import ProfilePhotoUploader from "../components/ProfilePhotoUploader"; // Import our new component

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

const StudentDashboard: React.FC<StudentDashboardProps> = ({ currentUserBooking: propCurrentUserBooking }) => {
  const [selectedSection, setSelectedSection] = useState("Dashboard"); // Track the selected section
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Track profile dropdown visibility
  const [currentStep, setCurrentStep] = useState<number>(1); // Track the current step (1, 2, or 3)
  const [showForm, setShowForm] = useState(false); // Track whether the form is displayed
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Track payment form visibility
  // Add state to track booking details locally
  const [localCurrentUserBooking, setLocalCurrentUserBooking] = useState<BookingInfo | null>(propCurrentUserBooking);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]); // Track completed steps
  const [studentComplaints, setStudentComplaints] = useState<any[]>([]); // Track complaints submitted by the student
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
  const userName = localStorage.getItem("student_userName") || "Student";
  const applicationNumber = localStorage.getItem("applicationNo") || "N/A"; // Use actual application number from login
  const [profilePic, setProfilePic] = useState<string>(localStorage.getItem("profilePic") || defaultProfilePic); // Use default image if no profile picture is available

  // Handle profile photo updates
  const handleProfilePhotoUpdate = (photoUrl: string) => {
    setProfilePic(photoUrl);
  };

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
    // Fetch student progress from backend when component mounts
    const fetchStudentProgress = async () => {
      if (applicationNumber && applicationNumber !== 'N/A') {
        try {
          const response = await fetch(`http://localhost:5000/api/progress/${applicationNumber}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              // Set completed steps from backend data
              setCompletedSteps(data.progress.completedSteps || []);
              
              // Check for booking details and set currentUserBooking if exists
              if (data.progress.roomBooked && data.progress.bookingDetails) {
                // Create a BookingInfo object from the backend data
                const bookingFromBackend: BookingInfo = {
                  block: data.progress.bookingDetails.block,
                  floor: data.progress.bookingDetails.floor,
                  roomNumber: data.progress.bookingDetails.roomNumber,
                  bed: data.progress.bookingDetails.bed,
                  roomKey: data.progress.bookingDetails.roomKey
                };
                
                // Save to localStorage for frontend persistence
                const userRole = localStorage.getItem("userRole") || "student";
                const userId = localStorage.getItem(`${userRole}_userId`);
                if (userId) {
                  const bookingKey = `${userRole}_${userId}_userBooking`;
                  localStorage.setItem(bookingKey, JSON.stringify(bookingFromBackend));
                }
                
                // Set the booking in our local state
                setLocalCurrentUserBooking(bookingFromBackend);
              }
              
              // Set current step based on progress
              if (data.progress.roomBooked) {
                setCurrentStep(3);
                // Don't show form since all steps are complete
                setShowForm(false);
              } else if (data.progress.paymentCompleted) {
                setCurrentStep(3); // Move to hostel booking step
                setShowForm(false); // Don't show form since payment is complete
              } else if (data.progress.formCompleted) {
                setCurrentStep(2); // Move to payment step
                setShowForm(false); // Don't show form since it's already completed
              } else {
                setCurrentStep(1);
                // Only show form if user clicks on the form button
              }
            }
          } else {
            console.error('Failed to fetch student progress');
          }
        } catch (error) {
          console.error('Error fetching student progress:', error);
        }
      }
    };
    
    fetchStudentProgress();
  }, [applicationNumber, setLocalCurrentUserBooking]);

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

  const handleFormSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
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

    // Show warning popup before submission
    const confirmSubmission = window.confirm(
      "WARNING: Once submitted, you cannot edit this form again. Are you sure you want to proceed?"
    );

    if (confirmSubmission) {
      try {
        // Call API to mark form as completed for this student
        const response = await fetch(`http://localhost:5000/api/progress/${applicationNumber}/form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Form data could be saved here if needed
            completedAt: new Date().toISOString()
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            alert("Form submitted successfully!");
            setShowForm(false);
            setCompletedSteps(prev => [...prev, 1]); // Update local state
            setCurrentStep(2); // Move to the next step
          } else {
            alert("There was an error submitting the form. Please try again.");
          }
        } else {
          alert("Failed to submit form. Please try again later.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please check your connection and try again.");
      }
    }
    // If user cancels, form stays open for editing
  };
  
  // Add function to mark payment as complete
  const markPaymentComplete = async () => {
    try {
      // Call API to mark payment as completed for this student
      const response = await fetch(`http://localhost:5000/api/progress/${applicationNumber}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCompletedSteps(prev => [...prev, 2]); // Update local state
          setCurrentStep(3); // Move to the next step
          navigate("/hostel-booking");
        } else {
          alert("There was an error processing your payment. Please try again.");
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to process payment. Please try again later.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred while processing your payment. Please check your connection and try again.");
    }
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

  // Fetch student complaints
  useEffect(() => {
    const fetchStudentComplaints = async () => {
      if (applicationNumber && applicationNumber !== 'N/A') {
        try {
          const response = await fetch(`http://localhost:5000/api/complaints/student/${applicationNumber}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setStudentComplaints(data.complaints);
            }
          } else {
            console.error('Failed to fetch complaints');
          }
        } catch (error) {
          console.error('Error fetching complaints:', error);
        }
      }
    };
    
    fetchStudentComplaints();
  }, [applicationNumber, selectedSection]);

  return (
    <>
      <div className="dashboard-container">
        {/* TOP NAVIGATION BAR */}
        <div className="dashboard-top-nav">
          <div className="profile-section-top">
            <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
          </div>
          <ul className="top-menu">
            { [
              "Dashboard",
              "My Booking",
              "Virtual Tour",
              "Hostel Layout",
            ].map((item) => (
              <li
                key={item}
                className={`top-menu-item ${selectedSection === item ? "active" : ""} ${
                  // Apply disabled class for My Booking if steps 1 and 2 are not completed
                  (item === "My Booking" && (!completedSteps.includes(1) || !completedSteps.includes(2))) ? 
                    "disabled-step" : ""
                }`}
                onClick={() => {
                  // Check if My Booking should be accessible
                  if (item === "My Booking") {
                    if (completedSteps.includes(1) && completedSteps.includes(2)) {
                      setSelectedSection(item); // Changed to set section instead of navigating
                    } else {
                      alert("Please complete the form submission and fee payment before accessing booking!");
                    }
                  } else {
                    setSelectedSection(item); // Update the selected section
                  }
                }}
              >
                {item}
              </li>
            ))}
            <li 
              className={`top-menu-item ${selectedSection.includes("Complaints") ? "active" : ""}`}
            >
              Complaints
              <ul className="dropdown-bullets-top">
                <li onClick={() => setSelectedSection("Complaints-New")}>New Complaints</li>
                <li onClick={() => setSelectedSection("Complaints-Old")}>Old Complaints</li>
              </ul>
            </li>
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
                  <li onClick={() => setSelectedSection("Profile")}>
                    Profile Photo
                  </li>
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
              
              {/* Admin Reset Tool - Only visible to admins */}
              {userName === "Admin" && <ResetStudentProgress />}

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
                      }`
                    }
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
              {localCurrentUserBooking ? (
                <div className="booking-details">
                  <h2>Your Current Booking</h2>
                  <p><strong>Block:</strong> {localCurrentUserBooking.block}</p>
                  <p><strong>Floor:</strong> {localCurrentUserBooking.floor}</p>
                  <p><strong>Room Number:</strong> {localCurrentUserBooking.roomNumber}</p>
                  <p><strong>Bed:</strong> {localCurrentUserBooking.bed}</p>
                  {localCurrentUserBooking.allottedBy && (
                    <>
                      <p><strong>Allotted By:</strong> {localCurrentUserBooking.allottedBy}</p>
                      <p><strong>Allotment Date:</strong> {new Date(localCurrentUserBooking.allotmentDate!).toLocaleDateString()}</p>
                      <p><strong>Reason:</strong> {localCurrentUserBooking.allotmentReason}</p>
                    </>
                  )}
                  <p><strong>Note:</strong> Please collect your room key from the hostel office.</p>
                </div>
              ) : (
                <div className="no-booking-message">
                  <h2>No Active Bookings</h2>
                  <p>You currently have no active bookings. Please book a room to see details here.</p>
                </div>
              )}
            </div>
          )}

          {/* Virtual Tour Section */}
          {selectedSection === "Virtual Tour" && (
            <div className="virtual-tour-section">
              <h2>Virtual Hostel Tour</h2>
              <div className="tour-info">
                <p>Experience a 360° view of our hostel facilities before making your decision.</p>
                
                {/* Embedded iframe for Mahindra University virtual tour */}
                <div className="tour-iframe-container" style={{
                  width: '100%',
                  height: '600px',
                  marginTop: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <iframe 
                    src="https://www.mahindrauniversity.edu.in/sites/virtual-tour-of-mu-campus.html" 
                    title="Mahindra University Virtual Tour"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="tour-note" style={{
                  backgroundColor: '#f7f7f7',
                  padding: '15px',
                  borderRadius: '8px',
                  marginTop: '20px',
                  textAlign: 'center'
                }}>
                  <p style={{fontWeight: 'bold', color: '#c23535'}}>
                    Note: Navigate through the virtual tour using your mouse or touchscreen. 
                    Click on hotspots to move between locations.
                  </p>
                </div>
                
                <div className="tour-highlights" style={{marginTop: '30px'}}>
                  <h3>Tour Highlights</h3>
                  <ul style={{
                    listStyleType: 'none',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '15px',
                    marginTop: '15px'
                  }}>
                    { [
                      { title: 'Room Interiors', desc: 'View sample rooms with different layouts' },
                      { title: 'Common Areas', desc: 'Explore study spaces and lounges' },
                      { title: 'Dining Facilities', desc: 'Check out our mess and canteen' },
                      { title: 'Sports Facilities', desc: 'Tour our sports fields and gym' },
                      { title: 'Laundry Services', desc: 'View washing and drying equipment' },
                      { title: 'Security Features', desc: 'Learn about our safety measures' },
                    ].map((item, index) => (
                      <li key={index} style={{
                        padding: '15px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}>
                        <h4 style={{color: '#c23535', marginBottom: '5px'}}>{item.title}</h4>
                        <p style={{fontSize: '14px', color: '#666'}}>{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Hostel Layout Section */}
          {selectedSection === "Hostel Layout" && (
            <div className="hostel-layout-section">
              <h2>Hostel Layout & Floor Plans</h2>
              
              <div className="layout-selector" style={{marginTop: '20px', marginBottom: '30px'}}>
                <label htmlFor="block-select" style={{marginRight: '10px', fontWeight: 'bold'}}>Select Block:</label>
                <select id="block-select" style={{
                  padding: '8px 15px',
                  borderRadius: '5px',
                  border: '1px solid #c23535',
                  backgroundColor: 'white'
                }}>
                  <option value="phase1">Phase 1</option>
                  <option value="phase2">Phase 2</option>
                  <option value="phase3">Phase 3</option>
                  <option value="phase4">Phase 4</option>
                  <option value="ewing">E-Wing</option>
                </select>
              </div>
              
              <div className="floor-map-container" style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#f9f9f9'
              }}>
                <div className="map-placeholder" style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                  height: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed #ccc',
                  borderRadius: '4px'
                }}>
                  <div style={{textAlign: 'center'}}>
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6H5V10H9V6Z" stroke="#c23535" strokeWidth="2"/>
                      <path d="M19 6H15V10H19V6Z" stroke="#c23535" strokeWidth="2"/>
                      <path d="M9 14H5V18H9V14Z" stroke="#c23535" strokeWidth="2"/>
                      <path d="M19 14H15V18H19V14Z" stroke="#c23535" strokeWidth="2"/>
                      <path d="M13 6H11V18H13V6Z" stroke="#c23535" strokeWidth="2"/>
                      <path d="M21 10H3V14H21V10Z" stroke="#c23535" strokeWidth="2"/>
                    </svg>
                    <p style={{marginTop: '15px', color: '#666'}}>Interactive Floor Plan</p>
                    <p style={{fontSize: '14px', color: '#888', maxWidth: '400px', margin: '10px auto'}}>
                      Click on a room to view more details including occupancy status and facilities
                    </p>
                  </div>
                </div>
                
                <div className="layout-legend" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginTop: '20px'
                }}>
                  { [
                    { color: '#bbf7d0', label: 'Available' },
                    { color: '#fef08a', label: 'Partially Occupied' },
                    { color: '#fecaca', label: 'Fully Occupied' },
                    { color: '#d3d3d3', label: 'Common Areas' },
                    { color: '#f56565', label: 'Washrooms' }
                  ].map((item, index) => (
                    <div key={index} style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: item.color,
                        border: '1px solid #999',
                        borderRadius: '3px'
                      }}></div>
                      <span style={{fontSize: '14px'}}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="download-links" style={{
                marginTop: '25px',
                display: 'flex',
                justifyContent: 'center',
                gap: '15px'
              }}>
                <button style={{
                  padding: '10px 18px',
                  backgroundColor: '#c23535',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <span>📄</span> Download PDF
                </button>
                <button style={{
                  padding: '10px 18px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <span>🖨️</span> Print Layout
                </button>
              </div>
            </div>
          )}
          
          {/* Complaints - New */}
          {selectedSection === "Complaints-New" && (
            <div className="complaints-section">
              <h2>Submit New Complaint</h2>
              <form className="complaint-form" 
                style={{
                  maxWidth: '700px',
                  margin: '20px auto',
                  padding: '25px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const subject = (form.querySelector('#complaint-subject') as HTMLInputElement).value;
                  const description = (form.querySelector('#complaint-description') as HTMLTextAreaElement).value;
                  const priority = (form.querySelector('#complaint-priority') as HTMLSelectElement).value;
                  const block = (form.querySelector('#input-block') as HTMLInputElement).value;
                  const floor = (form.querySelector('#input-floor') as HTMLInputElement).value;
                  const roomNumber = (form.querySelector('#input-room') as HTMLInputElement).value;
                  
                  try {
                    const response = await fetch('http://localhost:5000/api/complaints', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        applicationNo: applicationNumber,
                        studentName: userName,
                        subject,
                        description,
                        priority,
                        roomDetails: {
                          block,
                          floor,
                          roomNumber
                        },
                        status: 'Pending',
                        date: new Date().toISOString().split('T')[0]
                      }),
                    });
                    
                    if (response.ok) {
                      alert('Complaint submitted successfully');
                      form.reset();
                    } else {
                      alert('Failed to submit complaint');
                    }
                  } catch (error) {
                    console.error('Error submitting complaint:', error);
                    alert('An error occurred while submitting the complaint');
                  }
                }}
              >
                {/* Added student identification fields (pre-filled and readonly) */}
                <div className="student-info-section" style={{
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{marginBottom: '15px', fontSize: '16px', color: '#666'}}>Student Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="application-number">Application Number</label>
                    <input 
                      type="text" 
                      id="application-number" 
                      value={applicationNumber}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        backgroundColor: '#f0f0f0',
                        marginTop: '8px'
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="student-name">Student Name</label>
                    <input 
                      type="text" 
                      id="student-name" 
                      value={userName}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        backgroundColor: '#f0f0f0',
                        marginTop: '8px'
                      }}
                    />
                  </div>
                  
                  {/* Room details - Allow manual entry */}
                  <div className="room-details-section" style={{
                    padding: '15px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    marginTop: '20px'
                  }}>
                    <h3 style={{marginBottom: '15px', fontSize: '16px', color: '#666'}}>Room Details</h3>
                    
                    <div className="room-details" style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '15px'
                    }}>
                      <div className="form-group" style={{flex: '1', minWidth: '150px'}}>
                        <label htmlFor="input-block">Block</label>
                        <input 
                          type="text" 
                          id="input-block" 
                          placeholder="Enter block name (e.g., Phase 1, E-Wing)"
                          required
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '5px',
                            border: '1px solid #c23535',
                            marginTop: '8px'
                          }}
                        />
                      </div>
                      
                      <div className="form-group" style={{flex: '1', minWidth: '150px'}}>
                        <label htmlFor="input-floor">Floor</label>
                        <input 
                          type="text" 
                          id="input-floor" 
                          placeholder="Enter floor (e.g., Ground Floor, 1st Floor)"
                          required
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '5px',
                            border: '1px solid #c23535',
                            marginTop: '8px'
                          }}
                        />
                      </div>
                      
                      <div className="form-group" style={{flex: '1', minWidth: '150px'}}>
                        <label htmlFor="input-room">Room Number</label>
                        <input 
                          type="text" 
                          id="input-room" 
                          placeholder="Enter room number"
                          required
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '5px',
                            border: '1px solid #c23535',
                            marginTop: '8px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="complaint-subject">Subject</label>
                  <input 
                    type="text" 
                    id="complaint-subject" 
                    placeholder="Brief description of the issue"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '5px',
                      border: '1px solid #c23535',
                      marginTop: '8px'
                    }}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="complaint-description">Detailed Description</label>
                  <textarea 
                    id="complaint-description" 
                    placeholder="Please provide as much detail as possible about the issue"
                    rows={5}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '5px',
                      border: '1px solid #c23535',
                      marginTop: '8px',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="complaint-image">Upload Images (Optional)</label>
                  <input 
                    type="file" 
                    id="complaint-image" 
                    accept="image/*"
                    multiple
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      marginTop: '8px',
                      backgroundColor: '#f9f9f9'
                    }}
                  />
                  <p style={{fontSize: '12px', color: '#666', marginTop: '5px'}}>
                    Upload images to help us better understand the issue (max 3 images, 5MB each)
                  </p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="complaint-priority">Priority Level</label>
                  <select 
                    id="complaint-priority" 
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '5px',
                      border: '1px solid #c23535',
                      marginTop: '8px'
                    }}
                  >
                    <option value="Low">Low - Can be addressed within a week</option>
                    <option value="Medium">Medium - Requires attention within 2-3 days</option>
                    <option value="High">High - Needs attention within 24 hours</option>
                    <option value="Urgent">Urgent - Immediate attention required</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  style={{
                    backgroundColor: '#c23535',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '12px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginTop: '15px',
                    width: '100%'
                  }}
                >
                  Submit Complaint
                </button>
              </form>
            </div>
          )}

          {/* Complaints - Old */}
          {selectedSection === "Complaints-Old" && (
            <div className="complaints-history-section">
              <h2>Complaint History</h2>
              
              <div className="filter-controls" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '20px 0',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '5px'
              }}>
                <div className="filter-group">
                  <label htmlFor="status-filter" style={{marginRight: '10px'}}>Status:</label>
                  <select id="status-filter" style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="search-filter">
                  <input 
                    type="text" 
                    placeholder="Search complaints..." 
                    style={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      width: '250px'
                    }}
                  />
                </div>
              </div>
              
              <div className="complaints-table-container" style={{overflowX: 'auto'}}>
                {studentComplaints.length > 0 ? (
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '10px',
                    textAlign: 'left'
                  }}>
                    <thead>
                      <tr style={{backgroundColor: '#f2f2f2'}}>
                        <th style={{padding: '12px 15px', borderBottom: '1px solid #ddd'}}>Date</th>
                        <th style={{padding: '12px 15px', borderBottom: '1px solid #ddd'}}>Subject</th>
                        <th style={{padding: '12px 15px', borderBottom: '1px solid #ddd'}}>Status</th>
                        <th style={{padding: '12px 15px', borderBottom: '1px solid #ddd'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentComplaints.map((complaint, index) => (
                        <tr key={index} style={{
                          borderBottom: '1px solid #ddd',
                          backgroundColor: index % 2 === 0 ? 'white' : '#f9f9f9'
                        }}>
                          <td style={{padding: '12px 15px'}}>{new Date(complaint.date).toLocaleDateString()}</td>
                          <td style={{padding: '12px 15px'}}>{complaint.subject}</td>
                          <td style={{padding: '12px 15px'}}>
                            <span style={{
                              padding: '5px 10px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              backgroundColor: 
                                complaint.status === 'Resolved' ? '#d1fae5' : 
                                complaint.status === 'In Progress' ? '#fef3c7' : 
                                complaint.status === 'Pending' ? '#fee2e2' : '#e5e7eb',
                              color:
                                complaint.status === 'Resolved' ? '#047857' : 
                                complaint.status === 'In Progress' ? '#b45309' : 
                                complaint.status === 'Pending' ? '#b91c1c' : '#4b5563'
                            }}>
                              {complaint.status}
                            </span>
                          </td>
                          <td style={{padding: '12px 15px'}}>
                            <button style={{
                              padding: '5px 10px',
                              backgroundColor: 'transparent',
                              border: '1px solid #c23535',
                              color: '#c23535',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              const details = `Description: ${complaint.description}\n` + 
                                             `Priority: ${complaint.priority}\n` +
                                             `${complaint.wardenResponse ? `Warden Response: ${complaint.wardenResponse}` : ''}`;
                              alert(details);
                            }}>
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '30px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                    color: '#666'
                  }}>
                    <p>You haven't submitted any complaints yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Profile Section - New section for profile photo management */}
          {selectedSection === "Profile" && (
            <div className="profile-section">
              <h2>Profile Settings</h2>
              
              <div className="profile-container" style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <div className="profile-header" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '30px',
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: '1'
                  }}>
                    <h3 style={{color: '#333', marginBottom: '20px'}}>Personal Information</h3>
                    <div style={{
                      width: '100%',
                      maxWidth: '400px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '10px 0',
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '5px'
                      }}>
                        <strong>Name:</strong>
                        <span>{userName}</span>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '10px 0',
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '5px'
                      }}>
                        <strong>Application Number:</strong>
                        <span>{applicationNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Profile Photo Uploader Component */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '30px'
                }}>
                  <ProfilePhotoUploader 
                    applicationNumber={applicationNumber} 
                    onPhotoUpdate={handleProfilePhotoUpdate}
                  />
                </div>
                
                <div style={{
                  marginTop: '30px',
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{color: '#666'}}>
                    Your profile photo will be visible to wardens and administrators.
                    Please upload a clear, recent photo of yourself.
                  </p>
                </div>
              </div>
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