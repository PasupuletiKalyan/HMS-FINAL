import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import defaultProfilePic from "../assets/default-profile-pic.jpg";
import ResetStudentProgress from "../components/ResetStudentProgress"; // Import the reset component
import ProfilePhotoUploader from "../components/ProfilePhotoUploader"; // Import our new component
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
  occupiedBeds: Record<string, boolean>;
  setOccupiedBeds: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUserBooking: propCurrentUserBooking,
  setCurrentUserBooking,
  occupiedBeds,
  setOccupiedBeds
}) => {  const [selectedSection, setSelectedSection] = useState("Dashboard"); // Track the selected section
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
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]); // Track completed steps
  const [studentComplaints, setStudentComplaints] = useState<any[]>([]); // Track complaints submitted by the student
  const navigate = useNavigate();
  const [studentFormData, setStudentFormData] = useState<any>(null); // Add state for storing student form data

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
                // Store in localStorage that all steps are complete
                localStorage.setItem("formCompleted", "true");
                localStorage.setItem("paymentCompleted", "true");
              } else if (data.progress.paymentCompleted) {
                setCurrentStep(3); // Move to hostel booking step
                setShowForm(false); // Don't show form since payment is complete
                localStorage.setItem("formCompleted", "true");
                localStorage.setItem("paymentCompleted", "true");
              } else if (data.progress.formCompleted) {
                setCurrentStep(2); // Move to payment step
                setShowForm(false); // Don't show form since it's already completed
                localStorage.setItem("formCompleted", "true");
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
    }
  };
  // Add function to mark booking as complete
  const markBookingComplete = async (bookingDetails: BookingInfo) => {
    try {
      // Call API to mark booking as completed for this student
      const response = await fetch(`http://localhost:5000/api/progress/${applicationNumber}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completedAt: new Date().toISOString(),
          bookingDetails: bookingDetails
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCompletedSteps(prev => [...prev, 3]); // Mark step 3 as completed
          // Update both local and parent state with booking info
          setLocalCurrentUserBooking(bookingDetails);
          setCurrentUserBooking(bookingDetails);
        } else {
          alert("There was an error saving your booking. Please try again.");
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to save booking. Please try again later.");
      }
    } catch (error) {
      console.error("Error marking booking as complete:", error);
      alert("An error occurred while saving your booking. Please check your connection and try again.");
    }
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

  // Function to fetch student form data
  const fetchStudentFormData = async () => {
    if (applicationNumber && applicationNumber !== 'N/A') {
      try {
        const response = await fetch(`http://localhost:5000/api/form/${applicationNumber}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setStudentFormData(data.form);
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
          </div>
          <ul className="top-menu">
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

        {/* Banner Section */}
        <div className="banner-section">
          <div className="banner-image-container">
            <img src="/Pics/MU_CAMPUS_NV.jpg" alt="Campus View 1" className="banner-image" />
            <img src="/Pics/MU_CAMPUS_NV_2.jpg" alt="Campus View 2" className="banner-image" />
          </div>
          <div className="banner-overlay">
            <h1>Welcome to MU Hostels</h1>
            <p>Your Home Away From Home</p>
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

              {/* Campus Photo Showcase */}
              <div className="campus-showcase">
                <h3 className="showcase-title">
                  <i className="fas fa-university"></i>
                  MU Hostels
                </h3>
                <div className="showcase-grid">
                  <div className="showcase-item">
                    <img src="/Pics/hostel_4.JPG" alt="Campus View" className="showcase-image" />
                    <div className="showcase-overlay">
                      <p>Girls Hostels</p>
                    </div>
                  </div>
                  <div className="showcase-item">
                    <img src="/Pics/hostel_1.JPG" alt="Hostel Building" className="showcase-image" />
                    <div className="showcase-overlay">
                      <p>Boys Hostels</p>
                    </div>
                  </div>
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

                {/* Display student form data */}
                {studentFormData && (
                  <div className="form-data-container" style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px'
                  }}>
                    <h3 style={{marginBottom: '20px', color: '#333'}}>Student Information Form Data</h3>
                    <div className="form-data-fields" style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '15px'
                    }}>
                      {Object.entries(studentFormData)
                        .filter(([key]) => {
                          // Filter out technical ID fields
                          if (['_id', '__v', 'id'].includes(key)) return false;
                          
                          // If key is applicationNo and admission_no exists and is not empty, skip applicationNo
                          if (key === 'applicationNo' && 
                              studentFormData.admission_no && 
                              studentFormData.admission_no.trim() !== '') {
                            return false;
                          }
                          
                          return true;
                        })
                        .map(([key, value]) => {
                          // Format key for display
                          const formattedKey = key
                            .replace(/_/g, ' ')
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');
                          
                          // For admission number, clarify it's also the application number if they match
                          let displayLabel = formattedKey;
                          if (key === 'admission_no' && 
                              studentFormData.applicationNo && 
                              studentFormData.applicationNo === studentFormData.admission_no) {
                            displayLabel = 'Application/Admission Number';
                          }
                          
                          return (
                            <div key={key} style={{
                              padding: '12px 15px',
                              backgroundColor: '#fff',
                              borderRadius: '5px',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                              display: 'flex'
                            }}>
                              <div style={{
                                width: '200px',
                                fontWeight: 'bold',
                                color: '#555',
                                flexShrink: 0
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
                  <h3>Our Project</h3>
                  <p>
                    The Hostel Management System is a comprehensive web-based application designed to streamline and automate 
                    the entire hostel management process at Mahindra University. Our platform provides an end-to-end solution 
                    for students, wardens, and administrators to manage hostel allocations, room bookings, complaints, and more.
                  </p>
                  
                  <h3 style={{marginTop: '25px'}}>Key Features</h3>
                  <ul style={{
                    paddingLeft: '20px',
                    lineHeight: '1.6'
                  }}>
                    <li><strong>Online Form Submission:</strong> Digital student registration with all necessary information</li>
                    <li><strong>Fee Payment:</strong> Secure online payment processing for hostel fees</li>
                    <li><strong>Room Selection:</strong> Interactive floor plans for students to select and book rooms</li>
                    <li><strong>Complaint Management:</strong> Digital system for submitting and tracking maintenance requests</li>
                    <li><strong>Warden Dashboard:</strong> Comprehensive tools for wardens to manage student allocations</li>
                    <li><strong>Admin Controls:</strong> Advanced features for system administrators</li>
                    <li><strong>Profile Management:</strong> Personalized profiles for students with photo upload capability</li>
                  </ul>
                  
                  <h3 style={{marginTop: '25px'}}>Technologies Used</h3>
                  <div className="tech-stack" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginTop: '15px'
                  }}>
                    {['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT Authentication'].map(tech => (
                      <div key={tech} style={{
                        padding: '8px 12px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '20px',
                        fontSize: '14px'
                      }}>
                        {tech}
                      </div>
                    ))}
                  </div>
                  
                  <h3 style={{marginTop: '25px'}}>Our Goal</h3>
                  <p>
                    Our project aims to transform the traditional hostel management process by eliminating paperwork,
                    reducing administrative overhead, and providing a seamless experience for all stakeholders. 
                    We've focused on creating an intuitive interface with real-time updates and interactive elements
                    to make hostel allocation more efficient and transparent.
                  </p>
                </div>
                
                <div className="team-section" style={{
                  marginTop: '30px',
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Project Team</h3>
                  <div className="team-members" style={{
                    display: 'flex',
                    justifyContent: 'center',                    flexWrap: 'wrap',
                    gap: '20px'
                  }}>
                    <div className="team-member" style={{textAlign: 'center'}}>
                      <h4 style={{margin: '5px 0'}}>Om Sai Vikranth</h4>
                      <p style={{margin: '5px 0', color: '#666'}}>SE22UCSE009</p>
                    </div>
                    
                    <div className="team-member" style={{textAlign: 'center'}}>
                      <h4 style={{margin: '5px 0'}}>Palacharla Sriroop</h4>
                      <p style={{margin: '5px 0', color: '#666'}}>SE22UCSE190</p>
                    </div>
                    
                    <div className="team-member" style={{textAlign: 'center'}}>
                      <h4 style={{margin: '5px 0'}}>Kalyan Krishna</h4>
                      <p style={{margin: '5px 0', color: '#666'}}>SE22UCSE302</p>
                    </div>
                    
                    <div className="team-member" style={{textAlign: 'center'}}>
                      <h4 style={{margin: '5px 0'}}>Chandra</h4>
                      <p style={{margin: '5px 0', color: '#666'}}>SE22UCSE134</p>
                    </div>
                    
                    <div className="team-member" style={{textAlign: 'center'}}>
                      <h4 style={{margin: '5px 0'}}>Mohana Krishna</h4>
                      <p style={{margin: '5px 0', color: '#666'}}>SE22UCSE173</p>
                    </div>
                    
                    <div className="team-member" style={{textAlign: 'center'}}>
                      <h4 style={{margin: '5px 0'}}>Varun</h4>
                      <p style={{margin: '5px 0', color: '#666'}}>SE22UCSE069</p>
                    </div>
                    
                    <div className="team-member" style={{textAlign: 'center'}}>
                      <h4 style={{margin: '5px 0'}}>Mukund</h4>
                      <p style={{margin: '5px 0', color: '#666'}}>SE22UCSE075</p>
                    </div>
                    
                    <div className="team-member" style={{textAlign: 'center'}}>
                      <h4 style={{margin: '5px 0'}}>Tejas</h4>
                      <p style={{margin: '5px 0', color: '#666'}}>SE22UCSE270</p>
                    </div>
                  </div>
                  
                  <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#555'
                  }}>
                    <p>Our team of 8 members collaborated across frontend development, backend architecture, database design, UI/UX, and testing to deliver this comprehensive hostel management solution.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Contact Section */}
          {selectedSection === "Contact" && (
            <div className="contact-section">
              <h2>Contact Us</h2>
              
              <div className="contact-container" style={{
                maxWidth: '800px',
                margin: '20px auto',
                padding: '25px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <div className="contact-info">
                  <h3>Development Team</h3>
                  <p>If you have any technical issues, suggestions, or questions about the Hostel Management System, please feel free to contact our development team:</p>
                  
                  <div className="developer-contacts" style={{
                    marginTop: '20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                  }}>                    <div className="developer-card" style={{
                      padding: '15px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #eee'
                    }}>
                      <h4>Om Sai Vikranth</h4>
                      <p style={{
                        margin: '10px 0',
                        fontSize: '14px'
                      }}>
                        <strong>Email:</strong> <a href="mailto:se22ucse009@mahindrauniversity.edu.in">se22ucse009@mahindrauniversity.edu.in</a>
                      </p>
                      <p style={{
                        margin: '5px 0 10px 0',
                        fontSize: '14px'
                      }}>
                        <strong>Phone:</strong> <a href="tel:9390788239">9390788239</a>
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#666'
                      }}>Backend Developer, Database Management</p>
                    </div>
                      <div className="developer-card" style={{
                      padding: '15px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #eee'
                    }}>
                      <h4>Palacharla Sriroop</h4>
                      <p style={{
                        margin: '10px 0',
                        fontSize: '14px'
                      }}>
                        <strong>Email:</strong> <a href="mailto:se22ucse190@mahindrauniversity.edu.in">se22ucse190@mahindrauniversity.edu.in</a>
                      </p>
                      <p style={{
                        margin: '5px 0 10px 0',
                        fontSize: '14px'
                      }}>
                        <strong>Phone:</strong> <a href="tel:7893956059">7893956059</a>
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#666'
                      }}>Fronted Developer</p>
                    </div>
                      <div className="developer-card" style={{
                      padding: '15px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #eee'
                    }}>
                      <h4>Kalyan Krishna Pasupuleti</h4>
                      <p style={{
                        margin: '10px 0',
                        fontSize: '14px'
                      }}>
                        <strong>Email:</strong> <a href="mailto:se22ucse302@mahindrauniversity.edu.in">se22ucse302@mahindrauniversity.edu.in</a>
                      </p>
                      <p style={{
                        margin: '5px 0 10px 0',
                        fontSize: '14px'
                      }}>
                        <strong>Phone:</strong> <a href="tel:9490073264">9490073264</a>
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#666'
                      }}>Frontend Developer, UI/UX</p>
                    </div>
                  </div>
                </div>
                
                <div className="hostel-contact" style={{
                  marginTop: '30px',
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  <h3>Hostel Administration Contact</h3>
                  <p>For general inquiries related to hostel administration:</p>
                  
                  <div className="contact-details" style={{marginTop: '15px'}}>
                    <p><strong>Hostel Office:</strong> Student Affairs Office Main Block, Mahindra University</p>
                    <p><strong>Email:</strong> hostelcom@mahindrauniversity.edu.in</p>
                    <p><strong>Phone:</strong> +91 9100947891</p>
                  </div>
                  
                  <p style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#e8f4fd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}>
                    <strong>Note:</strong> For urgent issues outside office hours, please contact your floor warden directly.
                  </p>
                </div>
                
                <div className="feedback-section" style={{marginTop: '30px'}}>
                  <h3>Feedback Form</h3>
                  <p>We value your feedback! Please share your thoughts about the Hostel Management System:</p>
                  
                  <form className="feedback-form" style={{marginTop: '15px'}}>
                    <div className="form-group">
                      <label htmlFor="feedback-name">Name (Optional)</label>
                      <input 
                        type="text" 
                        id="feedback-name" 
                        placeholder="Your Name"
                        style={{
                          width: '100%',
                          padding: '10px',
                          margin: '5px 0 15px',
                          borderRadius: '5px',
                          border: '1px solid #ddd'
                        }}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="feedback-email">Email (Optional)</label>
                      <input 
                        type="email" 
                        id="feedback-email" 
                        placeholder="Your Email"
                        style={{
                          width: '100%',
                          padding: '10px',
                          margin: '5px 0 15px',
                          borderRadius: '5px',
                          border: '1px solid #ddd'
                        }}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="feedback-type">Feedback Type</label>
                      <select 
                        id="feedback-type"
                        style={{
                          width: '100%',
                          padding: '10px',
                          margin: '5px 0 15px',
                          borderRadius: '5px',
                          border: '1px solid #ddd'
                        }}
                      >
                        <option value="">Select type</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                        <option value="improvement">Improvement Suggestion</option>
                        <option value="general">General Feedback</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="feedback-message">Your Feedback</label>
                      <textarea 
                        id="feedback-message" 
                        placeholder="Please share your thoughts, suggestions, or report issues..."
                        rows={5}
                        style={{
                          width: '100%',
                          padding: '10px',
                          margin: '5px 0 15px',
                          borderRadius: '5px',
                          border: '1px solid #ddd',
                          resize: 'vertical'
                        }}
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      style={{
                        backgroundColor: '#c23535',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Thank you for your feedback! We will review it shortly.');
                        // Reset form
                        const form = e.target as HTMLFormElement;
                        form.reset();
                      }}
                    >
                      Submit Feedback
                    </button>
                  </form>
                </div>
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
          )}        </div>
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
                  <div className="step-title">Book Your Room</div>
                  <div className="step-description">Select your preferred hostel block, floor, room, and bed.</div>
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
            <h2 className="popup-title">Available Hostel Blocks</h2>
            <p>Please review the hostel blocks before proceeding to book your room:</p>
            
            <div className="hostel-info-grid">              <div className="hostel-block boys">
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
        <p>&copy; {new Date().getFullYear()} Hostel Management System. All rights reserved.</p>
        <p>
          <a href="/about" onClick={(e) => {e.preventDefault(); setSelectedSection("About")}}>About</a> | 
          <a href="/contact" onClick={(e) => {e.preventDefault(); setSelectedSection("Contact")}}>Contact</a>
        </p>
      </footer>
    </>
  );
};

export default StudentDashboard;