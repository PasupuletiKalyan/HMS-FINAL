import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../config/api";
import "../styles/StudentDashboardStyles.css"; // Reuse student dashboard styles for now
import collegeLogo from "../assets/college-logo.jpg";
import defaultProfilePic from "../assets/default-profile-pic.jpg";

const HostelFormPage: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
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
    
    loadProfilePhoto();  }, [applicationNumber]);

  // Show warning dialog when component mounts
  useEffect(() => {
    setShowWarningDialog(true);
  }, []);
  
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
          // Update local state for completed steps
          const completedSteps = JSON.parse(localStorage.getItem("completedSteps") || "[]");
          if (!completedSteps.includes(1)) {
            completedSteps.push(1);
            localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
          }
          localStorage.setItem("formCompleted", "true");
          
          // Show success dialog instead of alert
          setShowSuccessDialog(true);        } else {
          alert("There was an error updating your progress. Please try again.");
        }
      } else {
        alert("Failed to update progress. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please check your connection and try again.");
    }
  };

  return (
    <div className="dashboard-container">      {/* Print-only professional header */}
      <div className="print-header" style={{
        display: 'none'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '3px solid #c23535'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>            <img src={collegeLogo} alt="University Logo" style={{
              width: '120px',
              height: '120px',
              objectFit: 'contain'
            }} />
            <div style={{
              flex: 1,
              textAlign: 'center'
            }}>              <h1 style={{
                color: '#c23535',
                fontSize: '28px',
                fontWeight: 'bold',
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Mahindra University
              </h1>
            </div>
            <div style={{
              textAlign: 'center'
            }}>              <img src={profilePic} alt="Student Photo" style={{
                width: '80px',
                height: '100px',
                objectFit: 'cover',
                border: '2px solid #c23535',
                borderRadius: '8px'
              }} />
              <p style={{
                margin: '8px 0 0 0',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                {userName}
              </p>
              <p style={{
                margin: '2px 0 0 0',
                fontSize: '10px',
                color: '#666'
              }}>
                {applicationNumber}
              </p>
            </div>
          </div>
        </div>
      </div>      {/* Add print styles */}
      <style dangerouslySetInnerHTML={{
        __html: `          @media print {
            * {
              box-sizing: border-box;
            }
            
            html, body {
              margin: 0;
              padding: 0;
              height: auto;
              background: white !important;
            }
            
            .dashboard-top-nav,
            .footer,
            .back-button,
            button[onclick*="print"],
            .button-container,
            .submit-button {
              display: none !important;
            }
              /* Hide all dialog overlays and modals during print */
            div[style*="position: fixed"],
            div[style*="z-index: 1000"],
            div[style*="rgba(0, 0, 0, 0.5)"],
            .dialog-overlay,
            .modal-overlay {
              display: none !important;
              visibility: hidden !important;
            }
            
            /* Show only the form container */
            .form-container {
              display: block !important;
              visibility: visible !important;
            }
            
            /* Hide all dialog overlays and modals when printing */
            div[style*="position: fixed"],
            div[style*="position:fixed"] {
              display: none !important;
            }
            
            .print-header {
              display: block !important;
              page-break-inside: avoid;
              margin-bottom: 30px !important;
              position: relative;
            }
            
            .dashboard-container {
              background: white !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
              min-height: auto !important;
            }
            
            .dashboard-content {
              padding: 0 !important;
              margin: 0 !important;
            }
            
            .form-container {
              box-shadow: none !important;
              border: none !important;
              margin: 0 !important;
              max-width: 100% !important;
              padding: 20px 30px !important;
              page-break-inside: auto;
            }
            
            .form-header {
              display: none !important;
            }
            
            .form-group {
              margin-bottom: 12px !important;
              page-break-inside: avoid;
              break-inside: avoid;
            }
              .form-group label {
              font-weight: bold !important;
              color: #333 !important;
              font-size: 14px !important;
              display: block !important;
              margin-bottom: 5px !important;
            }
            
            .form-group input,
            .form-group textarea,
            .form-group select {
              border: 1px solid #333 !important;
              background: white !important;
              color: #333 !important;
              font-size: 13px !important;
              padding: 6px 8px !important;
              width: 100% !important;
              box-sizing: border-box !important;
              min-height: 28px !important;
              vertical-align: top !important;
            }
              .phone-number-container {
              display: flex !important;
              gap: 8px !important;
              align-items: flex-start !important;
            }
            
            .phone-number-container select {
              width: 80px !important;
              flex-shrink: 0 !important;
              height: 28px !important;
            }
            
            .phone-number-container input {
              flex: 1 !important;
              height: 28px !important;
            }
              .hostel-form {
              display: block !important;
              column-count: 2;
              column-gap: 25px;
              column-fill: balance;
            }
            
            .hostel-form .form-group {
              break-inside: avoid;
              page-break-inside: avoid;
              display: inline-block;
              width: 100%;
              margin-bottom: 15px;
              vertical-align: top;
            }
              /* Signature section */
            .print-signature-section {
              display: block !important;
              margin-top: 40px !important;
              page-break-inside: avoid;
              column-span: all;
            }
            
            /* Print footer */
            .print-footer {
              display: block !important;
              position: fixed;
              bottom: 20px;
              left: 0;
              right: 0;
              text-align: center;
              font-size: 10px;
              color: #666;
              border-top: 1px solid #ddd;
              padding: 10px;
              background: white;
            }
            
            @page {
              margin: 0.5in;
              size: A4;
            }
            
            body {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
          
          /* Hide print header on screen */
          .print-header {
            display: none;
          }
        `
      }} />

      {/* Print footer */}
      <div className="print-footer" style={{ display: 'none' }}>
        <p>This is a computer-generated form. For queries, contact the hostel administration.</p>
        <p>Printed on: {new Date().toLocaleDateString()}</p>
      </div>

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

      {/* MAIN CONTENT */}      <div className="dashboard-content">        <div className="form-container" style={{
          maxWidth: '700px',
          margin: '20px auto',
          padding: '30px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid #e0e6ed',
          position: 'relative'
        }}>          {/* Professional Header Design */}
          <div className="form-header" style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
            padding: '20px 0',
            borderBottom: '3px solid #c23535',
            position: 'relative'
          }}>
            {/* Decorative Elements */}
            <div style={{
              position: 'absolute',
              bottom: '-3px',
              left: '0',
              width: '60px',
              height: '3px',
              backgroundColor: '#28a745',
              borderRadius: '2px'
            }}></div>
              {/* Back button positioned at far left */}
            <button
              type="button"
              className="back-button"
              onClick={() => {
                navigate("/student-dashboard", { state: { formCanceled: true } });
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                minWidth: 'auto',
                whiteSpace: 'nowrap',
                width: 'fit-content',
                position: 'absolute',
                left: '0',
                fontWeight: 'bold'
              }}
            >
              ←
            </button>
              {/* Centered title */}
            <h2 style={{
              margin: 0, 
              color: '#c23535', 
              fontSize: '24px', 
              fontWeight: '600',
              flex: 1,
              textAlign: 'center'
            }}>
              Student Information Form
            </h2>            {/* Print button removed - will be shown only after form submission */}
          </div>

          <form onSubmit={handleFormSubmit} className="hostel-form" style={{
            display: 'grid',
            gap: '24px'
          }}>
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
            
            {/* Print-only signature section */}
            <div className="print-signature-section" style={{ display: 'none' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '1px solid #ddd'
              }}>
                <div>
                  <p style={{ margin: '0 0 30px 0', fontSize: '12px', fontWeight: 'bold' }}>Student's Signature:</p>
                  <div style={{ borderBottom: '1px solid #333', height: '20px', marginBottom: '5px' }}></div>
                  <p style={{ margin: '0', fontSize: '10px', color: '#666' }}>Date: _______________</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 30px 0', fontSize: '12px', fontWeight: 'bold' }}>Parent's Signature:</p>
                  <div style={{ borderBottom: '1px solid #333', height: '20px', marginBottom: '5px' }}></div>
                  <p style={{ margin: '0', fontSize: '10px', color: '#666' }}>Date: _______________</p>
                </div>
              </div>
                <div style={{
                marginTop: '30px',
                padding: '15px',
                border: '1px solid #ddd',
                backgroundColor: '#f8f9fa'
              }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 'bold' }}>For Office Use Only:</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '5px 0', fontSize: '10px' }}>Verified by: ________________________</p>
                    <p style={{ margin: '5px 0', fontSize: '10px' }}>Date: ________________</p>
                  </div>
                </div>
                <p style={{ margin: '10px 0 0 0', fontSize: '10px' }}>Remarks: ________________________________________________</p>
              </div>
            </div>

            <div className="button-container" style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '40px'
            }}>
              <button 
                type="submit" 
                className="submit-button"
                style={{
                  padding: '12px 40px',
                  backgroundColor: '#c23535',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  boxShadow: '0 4px 8px rgba(194, 53, 53, 0.2)',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#a12525';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(194, 53, 53, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#c23535';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(194, 53, 53, 0.2)';
                }}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>      {/* FOOTER */}
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
          <a href="#" onClick={(e) => {e.preventDefault();}}>Feedback</a>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{fontSize: '14px'}}></span>
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
        </div>
      </footer>

      {/* Warning Dialog Popup */}
      {showWarningDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            maxWidth: '450px',
            width: 'auto',
            minWidth: '350px',
            border: '3px solid #dc3545'
          }}>
            <h2 style={{
              color: '#dc3545',
              marginBottom: '15px',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              Important Warning!
            </h2>            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <strong style={{ fontSize: '16px', color: '#333' }}>Please read carefully:</strong>
            </div>
            <div style={{
              textAlign: 'left',
              fontSize: '16px',
              color: '#333',
              lineHeight: '1.6',
              whiteSpace: 'nowrap'
            }}>
              • Once you submit this form, you <strong>cannot edit</strong> it again
              <br />
              • Double-check all phone numbers and personal details
            </div>
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '25px'
            }}>              <button
                onClick={() => {
                  setShowWarningDialog(false);
                  navigate("/student-dashboard");
                }}
                style={{
                  padding: '8px 6px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '60px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#545b62';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#6c757d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                ← Go Back
              </button>              <button
                onClick={() => {
                  setShowWarningDialog(false);
                }}
                style={{
                  padding: '8px 6px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '90px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#218838';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#28a745';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                I Understand, Continue →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              fontSize: '48px',
              color: '#28a745',
              marginBottom: '20px'
            }}>
              ✅
            </div>
            
            <h2 style={{
              color: '#28a745',
              marginBottom: '15px',
              fontSize: '24px'
            }}>
              Form Submitted Successfully!
            </h2>
            
            <p style={{
              color: '#666',
              marginBottom: '30px',
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              Your hostel application form has been submitted successfully. You can now proceed to the payment step. 
              print a copy of your form for your records
            </p>
            
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => {
                  window.print();
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#218838'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#28a745'}
              >
                🖨️ Print Form
              </button>
              
              <button
                onClick={() => {
                  setShowSuccessDialog(false);
                  navigate("/student-dashboard");
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#c23535',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#a12525'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#c23535'}
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelFormPage;