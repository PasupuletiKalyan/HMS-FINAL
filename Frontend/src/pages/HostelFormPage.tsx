import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../config/api";
import "../styles/StudentDashboardStyles.css"; // Reuse student dashboard styles for now
import collegeLogo from "../assets/college-logo.jpg";
import defaultProfilePic from "../assets/default-profile-pic.jpg";

const HostelFormPage: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const userName = localStorage.getItem("student_userName") || "Student";
  const applicationNumber = localStorage.getItem("applicationNo") || "N/A";
  const [profilePic, setProfilePic] = useState<string>("");

  // Add useEffect to load profile photo on component mount
  useEffect(() => {
    const loadProfilePhoto = async () => {
      try {
        if (!applicationNumber || applicationNumber === 'N/A') {
          setProfilePic(defaultProfilePic);
          return;
        }
        
        const response = await fetch(buildApiUrl(`/api/students/${applicationNumber}`));
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.student && data.student.profilePhoto) {
            const photoUrl = `${buildApiUrl('')}${data.student.profilePhoto}`;
            setProfilePic(photoUrl);
            localStorage.setItem("profilePic", photoUrl);
          } else {
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

  // Form validation functions
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        const formResponse = await fetch(buildApiUrl('/api/form'), {
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
        const progressResponse = await fetch(buildApiUrl(`/api/progress/${applicationNumber}/form`), {
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
            // Update local state for completed steps
            const completedSteps = JSON.parse(localStorage.getItem("completedSteps") || "[]");
            if (!completedSteps.includes(1)) {
              completedSteps.push(1);
              localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
            }
            localStorage.setItem("formCompleted", "true");
            // Redirect back to the student dashboard
            navigate("/student-dashboard");
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

  return (
    <div className="dashboard-container">
      {/* TOP NAVIGATION BAR */}
      <div className="dashboard-top-nav">
        <div className="profile-section-top">
          <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
        </div>
        <div className="page-title" style={{
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: '#333'
        }}>
          Student Information Form
        </div>
        <div className="profile-section" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <img src={profilePic} alt="Profile" className="profile-circle-image" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover'
          }} />
          <p className="profile-name">{userName}</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-content">
        <div className="form-container" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#c23535'}}>Student Information Form</h2>
          <p style={{textAlign: 'center', marginBottom: '30px', color: '#666'}}>
            Please fill out all required information. This information will be used for your hostel allocation.
          </p>

          <form onSubmit={handleFormSubmit} className="hostel-form">
            {/* Hostel Form Fields */}
            {[
              { name: "admission_no", label: "Admission Number", type: "text", placeholder: "Enter your admission number", defaultValue: applicationNumber },
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
              { name: "local_guardian", label: "Local Guardian (Optional)", type: "text", placeholder: "Enter your local guardian's name (optional)" },
            ].map((field) => (
              <div className="form-group" key={field.name}>
                <label>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    className="no-resize"
                    required={field.name !== "local_guardian"}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.name !== "local_guardian"}
                    defaultValue={field.defaultValue}
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

            <div className="button-container" style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
              gap: '20px'
            }}>
              <button
                type="button"
                className="back-button"
                onClick={() => {
                  // Just navigate back without updating any completion status
                  navigate("/student-dashboard", { state: { formCanceled: true } });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Back to Dashboard
              </button>
              <button 
                type="submit" 
                className="submit-button"
                style={{
                  flex: 2,
                  padding: '12px',
                  backgroundColor: '#c23535',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer" style={{ marginTop: '40px' }}>
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        <p>
          <a href="/about">About</a> | <a href="/contact">Contact</a> |{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default HostelFormPage;