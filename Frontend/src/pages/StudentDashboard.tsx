import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import defaultProfilePic from "../assets/default-profile-pic.jpg";
import ResetStudentProgress from "../components/ResetStudentProgress"; // Import the reset component
import ProfilePhotoUploader from "../components/ProfilePhotoUploader"; // Import the ProfilePhotoUploader component
import antiDrugPolicy from "../assets/ANTI DRUG.pdf"; // Import the anti-drug policy PDF
import annexureAntiDrug from "../assets/Annexure Anti Drug.pdf"; // Import the annexure PDF

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
  setCurrentUserBooking: React.Dispatch<React.SetStateAction<BookingInfo | null>>;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUserBooking: propCurrentUserBooking,
  setCurrentUserBooking
}) => {const [selectedSection, setSelectedSection] = useState("Dashboard"); // Track the selected section
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Track profile dropdown visibility
  const [currentStep, setCurrentStep] = useState<number>(1); // Track the current step (1, 2, or 3)
  const [showForm, setShowForm] = useState(false); // Track whether the form is displayed
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Track payment form visibility
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false); // State for welcome popup
  const [showHostelInfoPopup, setShowHostelInfoPopup] = useState<boolean>(false); // State for hostel information popup
  // Add state to track booking details locally
  const [localCurrentUserBooking, setLocalCurrentUserBooking] = useState<BookingInfo | null>(propCurrentUserBooking);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]); // Track completed steps
  const [studentComplaints, setStudentComplaints] = useState<any[]>([]); // Track complaints submitted by the student
  const [studentFormData, setStudentFormData] = useState<any>(null); // Track student form data
  const navigate = useNavigate();
    // Room change request form states
  const [roomChangeForm, setRoomChangeForm] = useState({
    reason: '',
    customReason: '',
    preferredBlock: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };
  const profileRef = useRef<HTMLDivElement | null>(null); // Reference for the profile dropdown
  const userName = localStorage.getItem("student_userName") || "Student";
  const applicationNumber = localStorage.getItem("applicationNo") || "N/A"; // Use actual application number from login
  const [profilePic, setProfilePic] = useState<string>("");  // Initialize with empty string

  // Add a new useEffect to load the profile photo first thing when component mounts
  useEffect(() => {
    const loadProfilePhoto = async () => {
      try {
        if (!applicationNumber || applicationNumber === 'N/A') {
          setProfilePic(defaultProfilePic);
          return;
        }
        
        const response = await fetch(`http://localhost:5000/api/students/${applicationNumber}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.student && data.student.profilePhoto) {
            const photoUrl = `http://localhost:5000${data.student.profilePhoto}`;
            setProfilePic(photoUrl);
            localStorage.setItem("profilePic", photoUrl);
            
            // Update all profile images in the DOM
            setTimeout(() => {
              const profileElements = document.querySelectorAll('.profile-circle-image');
              profileElements.forEach(el => {
                (el as HTMLImageElement).src = photoUrl;
              });
            }, 10);
          } else {
            // Only set default if we can't find a profile photo
            setProfilePic(defaultProfilePic);
          }
        } else {
          setProfilePic(defaultProfilePic);
        }
      } catch (error) {
        console.error("Error loading profile photo:", error);
        setProfilePic(defaultProfilePic);
      }
    };
      loadProfilePhoto();
  }, [applicationNumber]);

  // Handle profile photo updates
  const handleProfilePhotoUpdate = (photoUrl: string) => {
    setProfilePic(photoUrl);
    localStorage.setItem("profilePic", photoUrl);
    
    // Update all profile images in the DOM
    const profileElements = document.querySelectorAll('.profile-circle-image');
    profileElements.forEach(el => {
      (el as HTMLImageElement).src = photoUrl;
    });
    
    // Force a re-render of components that might use this image
    window.dispatchEvent(new Event('storage'));
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
  // Add useEffect to show the welcome popup when the component mounts (if first login)
  useEffect(() => {
    // Check if this is the first login by checking localStorage
    const hasShownWelcome = localStorage.getItem('hasShownWelcomePopup');
    if (!hasShownWelcome) {
      // If it's the first login, show the popup
      setShowWelcomePopup(true);
      // Mark as shown for future visits
      localStorage.setItem('hasShownWelcomePopup', 'true');
    }
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
              // Load completed steps from backend
              const backendCompletedSteps = data.progress.completedSteps || [];
              setCompletedSteps(backendCompletedSteps);
              
              // Store completed steps in localStorage for consistency
              localStorage.setItem("completedSteps", JSON.stringify(backendCompletedSteps));
              
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
                
                // Set the booking in our local state and update parent state
                setLocalCurrentUserBooking(bookingFromBackend);
                setCurrentUserBooking(bookingFromBackend);
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
  }, [applicationNumber, setCurrentUserBooking]);

  // Add effect to handle navigation from form pages
  useEffect(() => {
    // Check if we're returning from a canceled form
    const handleLocationChange = () => {
      const location = window.location;
      const state = window.history.state;
      if (location.pathname === '/student-dashboard' && state && state.formCanceled) {
        // Reset the state to ensure properly tracking form status
        setCurrentStep(1);
        // Clear the state to avoid repeated handling
        window.history.replaceState({}, document.title);
      }
    };
    
    // Call once when component mounts to handle any existing state
    handleLocationChange();
    
    // Add event listener for future location changes
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleStepClick = (step: number) => {
    // Check if we're trying to access the form and if it's completed
    if (step === 1) {
      // For the first step (form), always navigate to the form page
      navigate("/hostel-form");
      return;
    }
    
    // Check if previous steps are completed before allowing navigation to step 2 or 3
    if (step > 1 && !completedSteps.includes(step - 1)) {
      alert("Please complete the previous steps first!");
      return;
    }    // Set the current step for visual indication
    setCurrentStep(step);
    
    // Handle navigation for steps 2 and 3
    if (step === 2) {
      navigate("/payment");
    } else if (step === 3) {
      // Show the hostel information popup first, then navigate to booking page
      setShowHostelInfoPopup(true);
    }
  };

  // Function to handle continuing to hostel booking after viewing info popup
  const handleContinueToBooking = () => {
    setShowHostelInfoPopup(false);
    navigate("/hostel-booking");
  };

  const handleFormSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get all form data
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: {[key: string]: string} = {};
    
    // Convert FormData to regular object
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    
    // Add applicationNo to form data
    formValues.applicationNo = applicationNumber;
    
    // Validate phone numbers
    const phoneFields = ["student_mobile", "father_mobile", "mother_mobile", "emergency_contact"];
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
        // First, save the form data
        const formResponse = await fetch('http://localhost:5000/api/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });
        
        if (!formResponse.ok) {
          const errorData = await formResponse.json();
          throw new Error(errorData.error || "Form submission failed");
        }
        
        // After form is saved, update the progress
        const progressResponse = await fetch(`http://localhost:5000/api/progress/${applicationNumber}/form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completedAt: new Date().toISOString()
          }),
        });

        if (progressResponse.ok) {
          const data = await progressResponse.json();
          if (data.success) {
            alert("Form submitted successfully!");
            setShowForm(false);
            setCompletedSteps(prev => [...prev, 1]); // Update local state
            setCurrentStep(2); // Move to the next step
          } else {
            alert("There was an error updating your progress. Please try again.");
          }
        } else {
          alert("Failed to update progress. Please try again later.");
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
      });      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCompletedSteps(prev => [...prev, 2]); // Update local state
          setCurrentStep(3); // Move to the next step
          
          // Show hostel info popup instead of navigating directly
          setShowHostelInfoPopup(true);
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
    }  };

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
  // Function to fetch student form data
  const fetchStudentFormData = async () => {
    if (applicationNumber && applicationNumber !== 'N/A') {
      try {
        const response = await fetch(`http://localhost:5000/api/form/${applicationNumber}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.formData) {
            setStudentFormData(data.formData);
          }
        }
      } catch (error) {
        console.error("Error fetching student form data:", error);
      }
    }
  };

  // Fetch form data when selectedSection changes to "Profile"
  useEffect(() => {
    if (selectedSection === "Profile") {
      fetchStudentFormData();
    }
  }, [selectedSection, applicationNumber]);

  return (
    <>
      <div className="dashboard-container">
        {/* TOP NAVIGATION BAR */}
        <div className="dashboard-top-nav">
          <div className="profile-section-top">
            <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
          </div>          <ul className="top-menu">
            { [
              "Dashboard",
              "My Booking",
              "Virtual Tour",
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
              {/* Room Change Request as section */}
            <li
              className={`top-menu-item ${selectedSection === "Room Change Request" ? "active" : ""}`}
              onClick={() => {
                if (localCurrentUserBooking) {
                  setSelectedSection("Room Change Request");
                } else {
                  alert('You need to have an active room booking before you can request a room change.');
                }
              }}
            >
              Room Change Request
            </li>
            <li 
              className={`top-menu-item ${selectedSection.includes("Complaints") ? "active" : ""}`}
            >
              Complaints
              <ul className="dropdown-bullets-top">
                <li onClick={() => setSelectedSection("Complaints-New")}>New Complaints</li>
                <li onClick={() => setSelectedSection("Complaints-Old")}>Old Complaints</li>
              </ul>
            </li>
            <li
              key="About"
              className={`top-menu-item ${selectedSection === "About" ? "active" : ""}`}
              onClick={() => setSelectedSection("About")}
            >
              About
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
            <>              {/* Show Form */}
              {showForm ? (
                <div className="form-container">
                  {/* Form Header with Back Button and Print Button */}
                  <div className="form-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '15px 0',
                    borderBottom: '2px solid #c23535'
                  }}>
                    <button
                      type="button"
                      className="back-button"
                      onClick={() => {
                        // Only hide the form without changing step status
                        setShowForm(false);
                        // Don't modify currentStep or completedSteps when cancelling
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ← Back to Dashboard
                    </button>
                    
                    <h2 style={{margin: 0, color: '#c23535'}}>Hostel Application Form</h2>
                    
                    <button
                      type="button"
                      onClick={() => window.print()}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      🖨️ Print Form
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit2} className="hostel-form">
                    {/* Hostel Form Fields */}
                    {[
                      { name: "hall_ticket_no", label: "Hall Ticket Number", type: "text", placeholder: "Enter your hall ticket number" },
                    { name: "batch", label: "Batch", type: "text", placeholder: "Enter your batch (e.g., 2023-2027)" },
                    { name: "programme", label: "Programme", type: "text", placeholder: "Enter your programme (e.g., B.Tech)" },
                    { name: "school", label: "School", type: "text", placeholder: "Enter your school name (e.g., ECOLE,SOM)" },
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
                    <label>Student Mobile</label>
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
                        name="student_mobile"
                        placeholder="Enter your mobile number"
                        maxLength={10}
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          validatePhoneNumber(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    {errors.student_mobile && <p className="error-message">{errors.student_mobile}</p>}
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
                        <option value="+61">+61 (Australia)"</option>
                        <option value="+81">+81 (Japan)"</option>
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
                        <option value="+81">+81 (Japan)"</option>
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
                      // Only hide the form without changing step status
                      setShowForm(false);
                      // Don't modify currentStep or completedSteps when cancelling
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
                  <p><strong>Room Number:</strong> {localCurrentUserBooking.floor}-{localCurrentUserBooking.roomNumber}</p>
                  <p><strong>Bed:</strong> {localCurrentUserBooking.bed}</p>
                  {localCurrentUserBooking.allottedBy && (
                    <>
                      <p><strong>Allotted By:</strong> {localCurrentUserBooking.allottedBy}</p>
                      <p><strong>Allotment Date:</strong> {new Date(localCurrentUserBooking.allotmentDate!).toLocaleDateString()}</p>
                      <p><strong>Reason:</strong> {localCurrentUserBooking.allotmentReason}</p>
                    </>
                  )}
                  <p><strong>Note:</strong> Please collect your room key from the hostel office.</p>
                  
                  {/* Anti-Drug Policy and Affidavit Section */}
                  <div className="policy-section" style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0'
                  }}>
                    <h3 style={{color: '#c23535', marginBottom: '15px'}}>Important: Anti-Drug Policy Documentation</h3>
                    
                    <p>Before collecting your room key, you must review, download, and submit the following documents:</p>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                      marginTop: '20px'
                    }}>
                      <div style={{
                        padding: '15px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0'}}>Anti-Drug, Substance & Alcohol Use Policy</h4>
                          <p style={{margin: '0', fontSize: '14px', color: '#666'}}>
                            Review university policy on prohibited substances and disciplinary actions
                          </p>
                        </div>
                        <a 
                          href={antiDrugPolicy} 
                          download="Mahindra_University_Anti_Drug_Policy.pdf"
                          style={{
                            backgroundColor: '#c23535',
                            color: 'white',
                            padding: '8px 15px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}
                        >
                          Download Policy
                        </a>
                      </div>
                      
                      <div style={{
                        padding: '15px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <h4 style={{margin: '0 0 5px 0'}}>Annexure: Affidavit Form</h4>
                          <p style={{margin: '0', fontSize: '14px', color: '#666'}}>
                            Download, print and get signed by both student and parent/guardian
                          </p>
                        </div>
                        <a 
                          href={annexureAntiDrug} 
                          download="Mahindra_University_Affidavit_Form.pdf"
                          style={{
                            backgroundColor: '#c23535',
                            color: 'white',
                            padding: '8px 15px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}
                        >
                          Download Affidavit
                        </a>
                      </div>
                    </div>
                    
                    <div style={{
                      marginTop: '20px',
                      padding: '15px',
                      backgroundColor: '#fff8f8',
                      borderRadius: '5px',
                      borderLeft: '4px solid #c23535'
                    }}>
                      <h4 style={{margin: '0 0 10px 0', color: '#c23535'}}>Submission Process:</h4>
                      <ol style={{margin: '0', paddingLeft: '20px'}}>
                        <li>Download both documents</li>
                        <li>Print the Affidavit Form</li>
                        <li>Fill in all required details</li>
                        <li>Get signatures from both student and parent/guardian</li>
                        <li>Submit the signed Affidavit to the hostel warden upon arrival</li>
                        <li>Receive your room key after the warden verifies your documentation</li>
                      </ol>
                    </div>
                    
                    <p style={{marginTop: '20px', fontStyle: 'italic', fontSize: '14px', color: '#666'}}>
                      Note: Failure to submit the signed Affidavit may result in delayed room key issuance.
                    </p>
                  </div>
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
              <h2>Virtual Tour</h2>
              <p>Experience a 360° view of our College.</p>
              
              {/* Simple loading container for virtual tour iframe */}
              <div className="tour-iframe-container" style={{
                width: '100%',
                height: '600px',
                marginTop: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div className="loading-overlay" id="tour-loading" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}>
                  <div className="spinner" style={{
                    width: '50px',
                    height: '50px',
                    border: '5px solid #f3f3f3',
                    borderTop: '5px solid #c23535',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '15px'
                  }}></div>
                  
                  <p style={{fontWeight: 'bold'}}>Loading Virtual Tour...</p>
                  
                  {/* Simple progress bar */}
                  <div style={{
                    width: '200px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    height: '10px',
                    margin: '10px 0'
                  }}>
                    <div id="loading-progress-bar" style={{
                      width: '10%',
                      height: '100%',
                      backgroundColor: '#c23535',
                      borderRadius: '4px',
                      transition: 'width 0.5s'
                    }}></div>
                  </div>
                </div>
                
                <iframe 
                  src="https://www.mahindrauniversity.edu.in/sites/virtual-tour-of-mu-campus.html" 
                  title="Mahindra University Virtual Tour"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allowFullScreen
                  onLoad={() => {
                    const loadingElement = document.getElementById('tour-loading');
                    if (loadingElement) {
                      loadingElement.style.display = 'none';
                    }
                  }}
                ></iframe>
              </div>
              
              {/* Add spinner animation */}
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
              
              {/* Simple progress simulation */}
              <div dangerouslySetInnerHTML={{ __html: `
                <script>
                  (function() {
                    const progressBar = document.getElementById('loading-progress-bar');
                    let width = 10;
                    
                    const interval = setInterval(() => {
                      width += 10;
                      if (width >= 100) {
                        clearInterval(interval);
                        width = 100;
                      }
                      
                      if (progressBar) progressBar.style.width = width + '%';
                    }, 800);
                    
                    setTimeout(() => {
                      const loadingElement = document.getElementById('tour-loading');
                      if (loadingElement) loadingElement.style.display = 'none';
                    }, 10000);
                  })();
                </script>
              `}}></div>
              
              <div className="tour-note" style={{
                backgroundColor: '#f7f7f7',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px',
                textAlign: 'center'
              }}>
                <p style={{fontWeight: 'bold', color: '#c23535'}}>
                  Click on hotspots to navigate between different locations in the tour.
                </p>
                <p style={{marginTop: '12px', fontSize: '14px', fontStyle: 'italic', color: '#555'}}>
                  Virtual tour created by Dr. Venkata Rajesh Kumar Tavva(Assistant professor, CSE)
                </p>
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
                  
                  // Use room details from the booking
                  const block = localCurrentUserBooking?.block || '';
                  const floor = localCurrentUserBooking?.floor || '';
                  const roomNumber = localCurrentUserBooking?.roomNumber || '';
                  
                  if (!block || !floor || !roomNumber) {
                    alert('No room booking found. Please book a room before submitting a complaint.');
                    return;
                  }
                  
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
                  
                  {/* Room details - Display from booking (read-only) */}
                  <div className="room-details-section" style={{
                    padding: '15px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    marginTop: '20px'
                  }}>
                    <h3 style={{marginBottom: '15px', fontSize: '16px', color: '#666'}}>Room Details</h3>
                    
                    {localCurrentUserBooking ? (
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
                            value={localCurrentUserBooking.block}
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
                        
                        <div className="form-group" style={{flex: '1', minWidth: '150px'}}>
                          <label htmlFor="input-floor">Floor</label>
                          <input 
                            type="text" 
                            id="input-floor" 
                            value={localCurrentUserBooking.floor}
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
                        
                        <div className="form-group" style={{flex: '1', minWidth: '150px'}}>
                          <label htmlFor="input-room">Room Number</label>
                          <input 
                            type="text" 
                            id="input-room" 
                            value={`${localCurrentUserBooking.floor}-${localCurrentUserBooking.roomNumber}`}
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
                      </div>
                    ) : (
                      <div style={{
                        padding: '15px',
                        backgroundColor: '#fff3e0',
                        borderRadius: '8px',
                        textAlign: 'center',
                        color: '#e65100'
                      }}>
                        <p style={{margin: 0, fontSize: '14px'}}>
                          <strong>No room booking found.</strong> Please book a room before submitting a complaint.
                        </p>
                      </div>
                    )}
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
                  disabled={!localCurrentUserBooking}
                >
                  Submit Complaint
                </button>
                
                {!localCurrentUserBooking && (
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                    textAlign: 'center'
                  }}>
                    <p style={{margin: 0, color: '#666'}}>
                      You need to have an active room booking to submit a complaint.
                    </p>
                  </div>
                )}
              </form>
            </div>
          )}
          
          {/* Complaints - Old */}
          {selectedSection === "Complaints-Old" && (
            <div className="complaints-history-section">
              <h2>Complaint History</h2>
                <div className="filter-controls" style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                margin: '20px 0',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }}>
                <div className="search-box">
                  <input 
                    type="text" 
                    placeholder="Search complaints..."
                    style={{
                      padding: '8px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      width: '200px'
                    }}
                  />
                </div>
              </div>
              
              <div className="complaints-list" style={{
                maxWidth: '900px',
                margin: '0 auto'
              }}>
                {studentComplaints && studentComplaints.length > 0 ? (
                  studentComplaints.map((complaint, index) => (
                    <div key={index} className="complaint-card" style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      marginBottom: '15px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      border: '1px solid #e0e0e0'
                    }}>
                      <div className="complaint-header" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px',
                        borderBottom: '1px solid #f0f0f0',
                        paddingBottom: '10px'
                      }}>
                        <h4 style={{margin: 0, color: '#333', fontSize: '18px'}}>{complaint.subject}</h4>
                        <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`} style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: complaint.status === 'Pending' ? '#fff3e0' : 
                                          complaint.status === 'In Progress' ? '#e3f2fd' :
                                          complaint.status === 'Resolved' ? '#e8f5e8' : '#f3e5f5',
                          color: complaint.status === 'Pending' ? '#e65100' :
                                 complaint.status === 'In Progress' ? '#1976d2' :
                                 complaint.status === 'Resolved' ? '#388e3c' : '#7b1fa2'
                        }}>
                          {complaint.status}
                        </span>
                      </div>
                      
                      <div className="complaint-details" style={{marginBottom: '15px'}}>
                        <p style={{margin: '0 0 10px 0', color: '#666', lineHeight: '1.6'}}>
                          <strong>Description:</strong> {complaint.description}
                        </p>
                        <div className="complaint-meta" style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                          gap: '10px',
                          fontSize: '14px',
                          color: '#888'
                        }}>
                          <div><strong>Priority:</strong> {complaint.priority}</div>
                          <div><strong>Date:</strong> {complaint.date}</div>
                          <div><strong>Room:</strong> {complaint.roomDetails ? 
                            `${complaint.roomDetails.block}-${complaint.roomDetails.floor}-${complaint.roomDetails.roomNumber}` : 
                            'Not specified'}</div>
                        </div>
                      </div>
                      
                      {complaint.wardenResponse && (
                        <div className="warden-response" style={{
                          backgroundColor: '#f8f9fa',
                          padding: '15px',
                          borderRadius: '5px',
                          marginTop: '15px',
                          border: '1px solid #e9ecef'
                        }}>
                          <h5 style={{margin: '0 0 8px 0', color: '#495057', fontSize: '14px'}}>Warden Response:</h5>
                          <p style={{margin: 0, color: '#495057', fontSize: '14px', lineHeight: '1.5'}}>
                            {complaint.wardenResponse}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
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
            {/* Profile Section */}
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
                {/* Profile Header with Photo */}
                <div className="profile-header" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '30px',
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  <div className="current-profile-pic" style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    marginRight: '20px',
                    overflow: 'hidden',
                    border: '3px solid #c23535',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {profilePic && profilePic !== defaultProfilePic ? (
                      <img 
                        src={profilePic} 
                        alt="Profile" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        backgroundColor: '#c23535',
                        color: 'white',
                        fontSize: '48px',
                        fontWeight: 'bold',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 style={{margin: '0 0 5px 0'}}>{userName}</h3>
                    <p style={{margin: 0, color: '#666'}}>Application No: {applicationNumber}</p>
                  </div>
                </div>

                {/* Profile Photo Management Section */}
                {profilePic === defaultProfilePic || !profilePic ? (
                  <div className="profile-photo-upload" style={{marginBottom: '30px'}}>
                    <h3 style={{marginBottom: '15px'}}>Upload Profile Photo</h3>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}>
                      <ProfilePhotoUploader 
                        applicationNumber={applicationNumber} 
                        onPhotoUpdate={handleProfilePhotoUpdate}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="profile-photo-update" style={{marginBottom: '30px'}}>
                    <h3 style={{marginBottom: '15px'}}>Update Profile Photo</h3>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}>
                      <ProfilePhotoUploader 
                        applicationNumber={applicationNumber} 
                        onPhotoUpdate={handleProfilePhotoUpdate}
                      />
                    </div>
                  </div>
                )}

                {/* Student Form Data Display */}
                {studentFormData && (
                  <div className="form-data-section" style={{marginBottom: '30px'}}>
                    <h3 style={{marginBottom: '20px', color: '#333', borderBottom: '2px solid #c23535', paddingBottom: '10px'}}>
                      Personal Information
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                      gap: '15px'
                    }}>
                      {Object.entries(studentFormData)
                        .filter(([key]) => !['_id', '__v', 'applicationNo', 'createdAt', 'updatedAt'].includes(key))
                        .map(([key, value]) => {
                          // Format the key for display
                          const displayLabel = key
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, l => l.toUpperCase());
                          
                          return (
                            <div key={key} style={{
                              display: 'flex',
                              padding: '12px',
                              backgroundColor: '#f8f9fa',
                              borderRadius: '5px',
                              border: '1px solid #e9ecef'
                            }}>
                              <div style={{
                                fontWeight: 'bold',
                                color: '#495057',
                                minWidth: '140px',
                                marginRight: '10px'
                              }}>
                                {displayLabel}:
                              </div>
                              <div style={{
                                flex: 1,
                                color: '#333'
                              }}>
                                {typeof value === 'string' ? value : String(value || '')}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {!studentFormData && (
                  <div style={{
                    textAlign: 'center',
                    padding: '30px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '30px'
                  }}>
                    <p style={{color: '#666', fontSize: '16px'}}>
                      No form data available. Please complete the hostel form first.
                    </p>
                  </div>
                )}

                <div className="photo-guidelines" style={{
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

          {/* About Section */}
          {selectedSection === "About" && (
            <div className="about-section">
              <h2>About Hostel Management System</h2>
              
              <div className="about-container" style={{
                maxWidth: '800px',
                margin: '20px auto',
                padding: '25px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <div className="about-content">
                  <h3 style={{color: '#d32f2f', marginBottom: '20px', fontSize: '1.5rem', borderBottom: '2px solid #d32f2f', paddingBottom: '10px'}}>About Mahindra University Hostel Management System</h3>
                  
                  <section className="about-section" style={{marginBottom: '30px'}}>
                    <h4 style={{fontSize: '1.2rem', color: '#333', marginBottom: '15px'}}>Enterprise Solution</h4>
                    <p style={{lineHeight: '1.8', fontSize: '1rem'}}>
                      The Mahindra University Hostel Management System is an enterprise-grade solution built to transform 
                      residential facility management in higher education. Developed in collaboration with industry experts 
                      and institutional stakeholders, our system delivers a comprehensive platform that addresses the complex 
                      needs of modern university accommodations while maintaining the highest standards of security and performance.
                    </p>
                  </section>
                  
                  <section className="vision-mission" style={{marginBottom: '30px'}}>
                    <h4 style={{fontSize: '1.2rem', color: '#333', marginBottom: '15px'}}>Our Vision</h4>
                    <p style={{lineHeight: '1.8', fontSize: '1rem', marginBottom: '15px', fontStyle: 'italic', color: '#444'}}>
                      "To create the industry's leading residential management platform that transforms the higher education
                      housing experience through innovative technology, enhanced security, and exceptional user satisfaction."
                    </p>
                  </section>
                  
                  <section className="project-overview" style={{marginBottom: '30px', backgroundColor: '#f7f7f7', padding: '20px', borderRadius: '8px'}}>
                    <h4 style={{fontSize: '1.2rem', color: '#333', marginBottom: '15px'}}>Enterprise Solution Overview</h4>
                    <p style={{lineHeight: '1.6', fontSize: '1rem', marginBottom: '15px'}}>
                      Our system delivers an enterprise-grade solution tailored precisely for the demanding requirements of Mahindra University's 
                      residential ecosystem. Through seamless integration of advanced technologies and human-centered design principles, 
                      we've developed a comprehensive platform that optimizes all facets of hostel operations and management:
                    </p>
                    
                    <div className="features-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '20px',
                      marginTop: '20px'
                    }}>
                      <div className="feature-card" style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: '1px solid #eee'
                      }}>
                        <h5 style={{color: '#d32f2f', marginBottom: '10px'}}>Student Information Management</h5>
                        <p>Comprehensive digital student records with photo ID verification and secure storage of personal information</p>
                      </div>
                      
                      <div className="feature-card" style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: '1px solid #eee'
                      }}>
                        <h5 style={{color: '#d32f2f', marginBottom: '10px'}}>Room Allocation System</h5>
                        <p>Interactive floor plans with real-time availability updates and intelligent room assignment algorithms</p>
                      </div>
                      
                      <div className="feature-card" style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: '1px solid #eee'
                      }}>
                        <h5 style={{color: '#d32f2f', marginBottom: '10px'}}>Fee Management</h5>
                        <p>Secure online payment processing with multiple payment options and automated receipt generation</p>
                      </div>
                      
                      <div className="feature-card" style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: '1px solid #eee'
                      }}>
                        <h5 style={{color: '#d32f2f', marginBottom: '10px'}}>Complaint Management</h5>
                        <p>Streamlined submission, tracking, and resolution system for maintenance requests and student concerns</p>
                      </div>
                      
                      <div className="feature-card" style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: '1px solid #eee'
                      }}>
                        <h5 style={{color: '#d32f2f', marginBottom: '10px'}}>Room Change Management</h5>
                        <p>Formal request and approval workflow for room changes with justification and documentation</p>
                      </div>
                      
                      <div className="feature-card" style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: '1px solid #eee'
                      }}>
                        <h5 style={{color: '#d32f2f', marginBottom: '10px'}}>Administrative Dashboards</h5>
                        <p>Role-specific interfaces for wardens and administrators with real-time analytics and reporting</p>
                      </div>
                    </div>
                  </section>
                  
                  <section className="tech-section" style={{marginBottom: '40px'}}>
                    <h4 style={{fontSize: '1.2rem', color: '#333', marginBottom: '15px'}}>Enterprise Architecture</h4>
                    <p style={{lineHeight: '1.8', fontSize: '1rem', marginBottom: '20px'}}>
                      Built on a robust technological foundation utilizing React.js for dynamic frontend interfaces, Node.js for scalable backend services, 
                      and MongoDB for high-performance data management. Our architecture ensures optimal performance, security, and scalability to meet 
                      the evolving needs of a growing university community.
                    </p>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '15px',
                      marginTop: '20px'
                    }}>
                      {[
                        {title: 'Frontend', tech: 'React.js + TypeScript', desc: 'Modern, responsive user interfaces'},
                        {title: 'Backend', tech: 'Node.js + Express', desc: 'Scalable server-side architecture'},
                        {title: 'Database', tech: 'MongoDB Atlas', desc: 'Cloud-based document database'},
                        {title: 'Deployment', tech: 'Production Ready', desc: 'Optimized for enterprise deployment'}
                      ].map((item, index) => (
                        <div key={index} style={{
                          backgroundColor: '#f8f9fa',
                          padding: '15px',
                          borderRadius: '8px',
                          textAlign: 'center',
                          border: '1px solid #e9ecef'
                        }}>
                          <h6 style={{color: '#d32f2f', margin: '0 0 8px 0'}}>{item.title}</h6>
                          <p style={{fontWeight: 'bold', margin: '0 0 5px 0', fontSize: '0.9rem'}}>{item.tech}</p>
                          <p style={{margin: 0, fontSize: '0.8rem', color: '#666'}}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section className="implementation-section" style={{marginBottom: '40px'}}>
                    <h4 style={{fontSize: '1.2rem', color: '#333', marginBottom: '15px'}}>Implementation & Deployment</h4>
                    <p style={{lineHeight: '1.8', fontSize: '1rem'}}>
                      Our solution follows industry best practices throughout the software development lifecycle. From initial requirements 
                      gathering to continuous deployment, we've implemented rigorous quality assurance processes to ensure a robust, 
                      secure, and user-friendly system. The platform undergoes regular security audits and performance optimizations to 
                      maintain optimal operation even during peak usage periods.
                    </p>
                    
                    <div style={{marginTop: '25px', backgroundColor: '#f7f7f7', padding: '15px', borderRadius: '8px', border: '1px solid #eee'}}>
                      <h5 style={{color: '#d32f2f', marginBottom: '12px', fontSize: '1rem'}}>Key Implementation Highlights</h5>
                      <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                        <li>Comprehensive security measures including data encryption and access controls</li>
                        <li>Responsive design ensuring seamless experience across all devices and screen sizes</li>
                        <li>Real-time data synchronization for instant updates across all user interfaces</li>
                        <li>Automated backup and disaster recovery systems for data protection</li>
                        <li>Performance optimization for handling high concurrent user loads</li>
                      </ul>
                    </div>
                  </section>
                  
                  <section className="team-section" style={{marginBottom: '30px'}}>
                    <h4 style={{fontSize: '1.2rem', color: '#333', marginBottom: '20px'}}>Development Team</h4>
                    <p style={{marginBottom: '20px', lineHeight: '1.6'}}>
                      This enterprise solution was developed by a dedicated team of software engineers from Mahindra University, 
                      combining expertise across multiple domains to deliver a world-class hostel management platform.
                    </p>
                    
                    <div className="team-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '20px',
                      marginTop: '25px'
                    }}>
                      <div className="team-member-card" style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        transition: 'transform 0.3s',
                        border: '1px solid #eee'
                      }}>
                        <div className="member-photo" style={{
                          height: '150px',
                          backgroundColor: '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#c23535',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem'
                          }}>OV</div>
                        </div>
                        <div className="member-info" style={{padding: '15px'}}>
                          <h4 style={{margin: '0 0 5px 0', color: '#333'}}>Om Sai Vikranth</h4>
                          <p style={{margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem'}}>Project Lead & Full Stack Developer</p>
                          <p style={{margin: '0', fontSize: '0.8rem', color: '#888'}}>SE22UCSE154@mahindrauniversity.edu.in</p>
                        </div>
                      </div>
                      
                      <div className="team-member-card" style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        transition: 'transform 0.3s',
                        border: '1px solid #eee'
                      }}>
                        <div className="member-photo" style={{
                          height: '150px',
                          backgroundColor: '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#3f51b5',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem'
                          }}>SM</div>
                        </div>
                        <div className="member-info" style={{padding: '15px'}}>
                          <h4 style={{margin: '0 0 5px 0', color: '#333'}}>Srujan Madduri</h4>
                          <p style={{margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem'}}>Backend Developer & Database Architect</p>
                          <p style={{margin: '0', fontSize: '0.8rem', color: '#888'}}>SE22UCSE009@mahindrauniversity.edu.in</p>
                        </div>
                      </div>
                      
                      <div className="team-member-card" style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        transition: 'transform 0.3s',
                        border: '1px solid #eee'
                      }}>
                        <div className="member-photo" style={{
                          height: '150px',
                          backgroundColor: '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#009688',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem'
                          }}>PS</div>
                        </div>
                        <div className="member-info" style={{padding: '15px'}}>
                          <h4 style={{margin: '0 0 5px 0', color: '#333'}}>Sriroop Palacharla</h4>
                          <p style={{margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem'}}>Frontend Developer & UI/UX Designer</p>
                          <p style={{margin: '0', fontSize: '0.8rem', color: '#888'}}>SE22UCSE005@mahindrauniversity.edu.in</p>
                        </div>
                      </div>
                      
                      <div className="team-member-card" style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        transition: 'transform 0.3s',
                        border: '1px solid #eee'
                      }}>
                        <div className="member-photo" style={{
                          height: '150px',
                          backgroundColor: '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#607d8b',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem'
                          }}>P</div>
                        </div>
                        <div className="member-info" style={{padding: '15px'}}>
                          <h4 style={{margin: '0 0 5px 0', color: '#333'}}>Punith</h4>
                          <p style={{margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem'}}>QA & Testing Lead</p>
                          <p style={{margin: '0', fontSize: '0.8rem', color: '#888'}}>SE22UCSE789@mahindrauniversity.edu.in</p>                        </div>
                      </div>
                    </div>
                  </section>
                  
                  <div style={{
                    textAlign: 'center',
                    marginTop: '30px',
                    padding: '15px',
                    backgroundColor: '#efefef',
                    borderRadius: '8px'
                  }}>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#555',
                      fontStyle: 'italic',
                      margin: '0'
                    }}>
                      This enterprise-grade hostel management system was developed by a cross-functional team of software engineers 
                      from Mahindra University's School of Computing, combining expertise in frontend and backend development, 
                      database design, UI/UX principles, and quality assurance.
                    </p>
                  </div>
                  
                  <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    textAlign: 'center'
                  }}>
                    <h4 style={{color: '#333', marginBottom: '15px', fontSize: '1.1rem'}}>System Support</h4>
                    <p style={{margin: '0 0 15px 0', fontSize: '0.95rem'}}>For technical support or inquiries about the Hostel Management System, please contact:</p>
                    <div style={{
                      backgroundColor: '#f9f9f9',
                      padding: '15px',
                      display: 'inline-block',
                      borderRadius: '8px',
                      border: '1px solid #eee'
                    }}>
                      <p style={{margin: '0 0 5px 0', fontWeight: 'bold'}}>Technical Support Team</p>
                      <p style={{margin: '0 0 5px 0'}}>Email: <a href="mailto:hostel.support@mahindrauniversity.edu.in" style={{color: '#d32f2f'}}>hostel.support@mahindrauniversity.edu.in</a></p>
                      <p style={{margin: '0'}}>Phone: +91 40 6722 9000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
            {/* Room Change Request Section */}
          {selectedSection === "Room Change Request" && (
            <div className="room-change-section">
              <h2>Room Change Request</h2>
              
              <div className="room-change-container" style={{
                maxWidth: '800px',
                margin: '20px auto',
                padding: '25px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                {localCurrentUserBooking ? (
                  <form className="room-change-form" 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      
                      const reason = formData.get('reason') as string;
                      const preferredBlock = formData.get('preferredBlock') as string;
                      
                      try {
                        const response = await fetch('http://localhost:5000/api/room-change-requests', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            applicationNo: applicationNumber,
                            studentName: userName,
                            currentRoom: {
                              block: localCurrentUserBooking.block,
                              floor: localCurrentUserBooking.floor,
                              roomNumber: localCurrentUserBooking.roomNumber,
                              bed: localCurrentUserBooking.bed
                            },
                            reason: reason,
                            preferredBlock: preferredBlock || 'No preference',
                            status: 'Pending',
                            dateSubmitted: new Date().toISOString().split('T')[0]
                          }),
                        });
                        
                        if (response.ok) {
                          alert('Room change request submitted successfully! You will be notified once it is reviewed.');
                          form.reset();                          // Reset form state
                          setRoomChangeForm({
                            reason: '',
                            customReason: '',
                            preferredBlock: ''
                          });
                        } else {
                          alert('Failed to submit room change request. Please try again.');
                        }
                      } catch (error) {
                        console.error('Error submitting room change request:', error);
                        alert('An error occurred. Please try again later.');
                      }
                    }}
                  >
                    {/* Current Room Information */}
                    <div className="current-room-info" style={{
                      backgroundColor: '#f8f9fa',
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef'
                    }}>
                      <h3 style={{marginBottom: '15px', color: '#495057', fontSize: '18px'}}>Current Room Details</h3>                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
                        gap: '15px',
                        fontSize: '14px'
                      }}>
                        <div>
                          <span style={{fontWeight: 'bold', color: '#6c757d'}}>Block:</span>
                          <div style={{marginTop: '5px', color: '#495057'}}>{localCurrentUserBooking.block}</div>
                        </div>
                        <div>
                          <span style={{fontWeight: 'bold', color: '#6c757d'}}>Floor:</span>
                          <div style={{marginTop: '5px', color: '#495057'}}>{localCurrentUserBooking.floor}</div>
                        </div>
                        <div>
                          <span style={{fontWeight: 'bold', color: '#6c757d'}}>Room:</span>
                          <div style={{marginTop: '5px', color: '#495057'}}>{localCurrentUserBooking.floor}-{localCurrentUserBooking.roomNumber}</div>
                        </div>
                        <div>
                          <span style={{fontWeight: 'bold', color: '#6c757d'}}>Bed:</span>
                          <div style={{marginTop: '5px', color: '#495057'}}>{localCurrentUserBooking.bed}</div>
                        </div>
                      </div>
                    </div>

                    {/* Student Information */}
                    <div style={{display: 'flex', gap: '20px'}}>
                      <div className="form-group" style={{flex: 1}}>
                        <label htmlFor="student-name" style={{fontWeight: '600', marginBottom: '8px', color: '#333'}}>
                          Student Name
                        </label>
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

                      <div className="form-group" style={{flex: 1}}>
                        <label htmlFor="application-no" style={{fontWeight: '600', marginBottom: '8px', color: '#333'}}>
                          Application Number
                        </label>
                        <input 
                          type="text" 
                          id="application-no" 
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
                    </div>

                    {/* Reason for Room Change */}
                    <div className="form-group">
                      <label htmlFor="reason" style={{fontWeight: '600', marginBottom: '8px', color: '#333'}}>
                        Reason for Room Change *
                      </label>
                      <textarea 
                        name="reason"
                        id="reason" 
                        placeholder="Please provide the reason for your room change request..."
                        rows={4}
                        required
                        value={roomChangeForm.reason}
                        onChange={(e) => setRoomChangeForm(prev => ({...prev, reason: e.target.value}))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '5px',
                          border: '1px solid #c23535',
                          marginTop: '8px',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    {/* Preferred Block */}
                    <div className="form-group">
                      <label htmlFor="preferredBlock" style={{fontWeight: '600', marginBottom: '8px', color: '#333'}}>
                        Preferred Block (Optional)
                      </label>
                      <select 
                        name="preferredBlock"
                        id="preferredBlock"
                        value={roomChangeForm.preferredBlock}
                        onChange={(e) => setRoomChangeForm(prev => ({...prev, preferredBlock: e.target.value}))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '5px',
                          border: '1px solid #ddd',
                          marginTop: '8px'
                        }}
                      >
                        <option value="">No preference</option>
                        <option value="Phase 1">Phase 1 (Boys)</option>
                        <option value="Phase 1 E-Wing">Phase 1 E-Wing (Boys)</option>
                        <option value="Phase 2">Phase 2 (Boys)</option>
                        <option value="Phase 2 Part 5">Phase 2 Part 5 (Boys)</option>
                        <option value="Phase 4A">Phase 4A (Boys)</option>
                        <option value="Phase 4B">Phase 4B (Boys)</option>
                        <option value="Phase 3 North Wing">Phase 3 North Wing (Girls)</option>
                        <option value="Phase 3 South Wing">Phase 3 South Wing (Girls)</option>
                        <option value="Aravali">Aravali (Girls)</option>
                        <option value="Himalaya">Himalaya (Girls)</option>
                        <option value="Ajanta">Ajanta (Girls)</option>
                        <option value="Shivalik">Shivalik (Girls)</option>
                        <option value="Vindya">Vindya (Girls)</option>
                        <option value="Niligiri">Niligiri (Girls)</option>
                        <option value="Satpura">Satpura (Girls)</option>
                        <option value="Kailash">Kailash (Girls)</option>
                      </select>
                      
                      {/* Warning for designated blocks */}
                      <div style={{
                        marginTop: '8px',
                        padding: '10px',
                        backgroundColor: '#fff3e0',
                        borderRadius: '5px',
                        border: '1px solid #ffcc80',
                        fontSize: '14px',
                        color: '#e65100'
                      }}>
                        <strong>Important:</strong> Please choose designated blocks only based on your gender. Boys should select boys' hostels and girls should select girls' hostels.
                      </div>
                    </div>

                    {/* Important Notice */}
                    <div className="notice-section" style={{
                      backgroundColor: '#fff3cd',
                      padding: '15px',
                      borderRadius: '8px',
                      border: '1px solid #ffeaa7',
                      marginTop: '10px'
                    }}>
                      <h4 style={{margin: '0 0 10px 0', color: '#856404', fontSize: '16px'}}>Important Notice:</h4>
                      <ul style={{margin: '0', paddingLeft: '20px', color: '#856404', fontSize: '14px'}}>
                        <li>Room change requests are subject to availability and approval</li>
                        <li>Processing time may take 5-7 business days</li>
                      </ul>
                    </div>

                    {/* Submit Button */}                    <button 
                      type="submit"
                      style={{
                        backgroundColor: '#c23535',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: 'auto',
                        alignSelf: 'center',
                        marginTop: '10px',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#a12525'}
                      onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#c23535'}
                    >
                      Submit Room Change Request
                    </button>
                  </form>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    color: '#6c757d'
                  }}>
                    <h3 style={{color: '#dc3545', marginBottom: '15px'}}>No Active Booking Found</h3>
                    <p>You need to have an active room booking before you can request a room change.</p>
                    <p>Please complete your hostel booking first.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Privacy Policy Section */}
          {selectedSection === "Privacy" && (
            <div className="privacy-section">
              <h2>Privacy Policy</h2>
              
              <div className="privacy-container" style={{
                maxWidth: '800px',
                margin: '20px auto',
                padding: '25px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <p style={{marginBottom: '15px'}}>
                  <strong>Last Updated: May 2025</strong>
                </p>
                
                <p>
                  This privacy policy describes how the Hostel Management System collects, uses, 
                  and shares your personal information in connection with your use of our services.
                </p>
                
                <h3 style={{marginTop: '20px'}}>Information We Collect</h3>
                <p>
                  We collect information you provide directly to us when you:
                </p>
                <ul>
                  <li>Register and create an account</li>
                  <li>Fill out student information forms</li>
                  <li>Submit hostel booking requests</li>
                  <li>Make payments through our system</li>
                  <li>Submit maintenance complaints</li>
                  <li>Upload profile photos</li>
                  <li>Contact our support team</li>
                </ul>
                
                <h3 style={{marginTop: '20px'}}>How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide and maintain our services</li>
                  <li>Process hostel allocations</li>
                  <li>Manage room bookings and facility maintenance</li>
                  <li>Communicate with you about your requests</li>
                  <li>Respond to your inquiries and provide support</li>
                  <li>Improve our services and develop new features</li>
                </ul>
                
                <h3 style={{marginTop: '20px'}}>Data Security</h3>
                <p>
                  We implement reasonable security measures to protect your personal information from unauthorized access,
                  destruction, use, modification, or disclosure. However, no security system is impenetrable, and we cannot
                  guarantee the security of our systems 100%.
                </p>
                
                <h3 style={{marginTop: '20px'}}>Data Sharing</h3>
                <p>
                  Your information is shared only with Mahindra University administrators and hostel management staff 
                  who need access to provide you with services. We do not sell your personal information to third parties.
                </p>
                
                <h3 style={{marginTop: '20px'}}>Your Rights</h3>
                <p>
                  You have the right to access, update, or delete your personal information. You can manage most of your information
                  through your account settings or by contacting the hostel administration office.
                </p>
                
                <h3 style={{marginTop: '20px'}}>Contact Us</h3>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                  <br />
                  <a href="mailto:hostelcom@mahindrauniversity.edu.i">hostelcom@mahindrauniversity.edu.in</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Welcome Popup */}
      {showWelcomePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="popup-close" onClick={() => setShowWelcomePopup(false)}>×</span>
            <h2 className="popup-title">Welcome to Hostel Management System!</h2>
            <p>Complete your hostel booking step-by-step — each step unlocks only after you finish the previous one, and must be followed in order.</p>
            
            <div className="popup-steps">
              <div className="popup-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <div className="step-title">Submit Student Information Form</div>
                  <div className="step-description">Fill out all your personal and contact details to help us serve you better.</div>
                </div>
              </div>
              
              <div className="popup-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <div className="step-title">Complete Fee Payment</div>
                  <div className="step-description">Pay your hostel fees securely through our payment portal.</div>
                </div>
              </div>
              
              <div className="popup-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <div className="step-title">Book Your Hostel Room</div>
                  <div className="step-description">Choose your preferred room from available options using our interactive floor plan.</div>
                </div>
              </div>
            </div>
            
            <div className="popup-buttons">
              <button className="popup-button primary" onClick={() => setShowWelcomePopup(false)}>Get Started</button>
            </div>
          </div>
        </div>
      )}

      {/* Hostel Information Popup */}
      {showHostelInfoPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="popup-close" onClick={() => setShowHostelInfoPopup(false)}>×</span>
            <h2 className="popup-title">Hostel Information</h2>
            <p style={{marginBottom: '20px'}}>Please review the hostel blocks available based on your gender before proceeding to room selection.</p>
            
            <div className="hostel-blocks-info" style={{display: 'flex', gap: '20px', marginBottom: '25px'}}>
              <div className="hostel-block boys">
                <h3>Boys Hostel</h3>
                <p><strong>Blocks:</strong> Phase 1, Phase 1 E-Wing, Phase 2, Phase 2 Part 5, Phase 4A, Phase 4B</p>
              </div>
              
              <div className="hostel-block girls">
                <h3>Girls Hostel</h3>
                <p><strong>Blocks:</strong> Phase 3 North Wing, Phase 3 South Wing, Aravali, Himalaya, Ajanta, Shivalik, Vindya, Niligiri, Satpura, Kailash</p>
              </div>
            </div>
            
            <p><strong>Note:</strong> Please Book Rooms based on your gender. Each room has 2 beds.</p>
            
            <div className="popup-buttons">
              <button className="popup-button secondary" onClick={() => setShowHostelInfoPopup(false)}>Cancel</button>
              <button className="popup-button primary" onClick={handleContinueToBooking}>Continue to Booking</button>
            </div>
          </div>
        </div>
      )}
    
      {/* FOOTER */}
      <footer className="footer">
        <div style={{marginBottom: '15px'}}>
          <p>&copy; {new Date().getFullYear()} Mahindra University Hostel Management System. All rights reserved.</p>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <a href="#" onClick={(e) => {e.preventDefault(); setSelectedSection("Contact")}}>Contact</a>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{fontSize: '14px'}}>📧</span>
            <a href="mailto:hostelcom@mahindrauniversity.edu.in" style={{color: '#fff'}}>
              hostelcom@mahindrauniversity.edu.in
            </a>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{fontSize: '14px'}}>📞</span>
            <span style={{color: '#fff'}}>+91 40 6722 9000</span>
          </div>
          <a href="#" onClick={(e) => {e.preventDefault(); setSelectedSection("Privacy")}}>Privacy Policy</a>
        </div>
      </footer>
    </>
  );
};

export default StudentDashboard;
