import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../config/api";
import "../styles/AuthStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import defaultProfilePic from "../assets/default-profile-pic.jpg";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const userRole = localStorage.getItem("userRole") || "student";
  const userId = localStorage.getItem(`${userRole}_userId`) || "";
  const userName = localStorage.getItem(`${userRole}_userName`) || "User";
  const applicationNo = localStorage.getItem("applicationNo") || "";
  const profilePic = localStorage.getItem("profilePic") || defaultProfilePic;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset message
    setMessage("");
    setIsError(false);
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields");
      setIsError(true);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      setIsError(true);
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setIsError(true);
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch(buildApiUrl("/api/users/change-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          applicationNo,
          currentPassword,
          newPassword
        })
      });
      
      const data = await response.json();
      setIsLoading(false);
      
      if (response.ok && data.success) {
        setMessage("Password changed successfully");
        setIsError(false);
        
        // Clear form fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
        // Redirect after 2 seconds
        setTimeout(() => {
          if (userRole === 'warden') {
            navigate("/warden-dashboard");
          } else if (userRole === 'admin') {
            navigate("/admin-dashboard");
          } else {
            navigate("/student-dashboard");
          }
        }, 2000);
      } else {
        setMessage(data.message || "Failed to change password");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred while changing password");
      setIsError(true);
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
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
          Change Password
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
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#c23535'}}>Change Your Password</h2>
          <p style={{textAlign: 'center', marginBottom: '30px', color: '#666'}}>
            Enter your current password and a new password to update your credentials.
          </p>

          {message && (
            <div className={`message ${isError ? 'error' : 'success'}`} style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              backgroundColor: isError ? '#ffebee' : '#e8f5e9',
              color: isError ? '#c62828' : '#2e7d32',
              border: `1px solid ${isError ? '#ef9a9a' : '#a5d6a7'}`
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <div className="password-input-container" style={{ position: 'relative', width: '100%' }}>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  style={{ width: '100%', paddingRight: '40px' }}
                  required
                />
                <span 
                  className="password-toggle-icon" 
                  onClick={() => togglePasswordVisibility('current')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontSize: '18px',
                    color: '#666',
                    zIndex: 2
                  }}
                >
                  {showCurrentPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <div className="password-input-container" style={{ position: 'relative', width: '100%' }}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  style={{ width: '100%', paddingRight: '40px' }}
                  required
                />
                <span 
                  className="password-toggle-icon" 
                  onClick={() => togglePasswordVisibility('new')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontSize: '18px',
                    color: '#666',
                    zIndex: 2
                  }}
                >
                  {showNewPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <div className="password-input-container" style={{ position: 'relative', width: '100%' }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  style={{ width: '100%', paddingRight: '40px' }}
                  required
                />
                <span 
                  className="password-toggle-icon" 
                  onClick={() => togglePasswordVisibility('confirm')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontSize: '18px',
                    color: '#666',
                    zIndex: 2
                  }}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
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
                  if (userRole === 'warden') {
                    navigate("/warden-dashboard");
                  } else if (userRole === 'admin') {
                    navigate("/admin-dashboard");
                  } else {
                    navigate("/student-dashboard");
                  }
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
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
                style={{
                  flex: 2,
                  padding: '12px',
                  backgroundColor: '#c23535',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? "Processing..." : "Change Password"}
              </button>
            </div>
          </form>
          
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '5px',
            fontSize: '14px'
          }}>
            <p style={{margin: 0, color: '#666'}}>
              <strong>Note:</strong> For security reasons, please choose a strong password with at least 6 characters,
              including numbers, letters, and special characters.
            </p>
          </div>
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

export default ChangePassword;