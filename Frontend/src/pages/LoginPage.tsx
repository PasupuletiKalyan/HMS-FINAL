import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthStyles.css";
import collegeLogo from "../assets/college-logo.jpg";

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        identifier,
        password,
      });

      console.log("🔍 Server Response:", response.data);

      if (response.data.success) {
        const { role, name, userId, applicationNo } = response.data;
        const normalizedRole = role.toLowerCase(); // normalize for consistency

        console.log("✅ User Logged In:", name, "Role:", normalizedRole);

        localStorage.clear();

        const sessionKey = `user_${normalizedRole}_${Date.now()}`;
        localStorage.setItem(`${normalizedRole}_userName`, name);
        localStorage.setItem(`${normalizedRole}_userId`, userId);
        localStorage.setItem("currentRole", normalizedRole);
        localStorage.setItem("userRole", normalizedRole);
        localStorage.setItem("sessionKey", sessionKey);

        if (normalizedRole === "student" && applicationNo) {
          localStorage.setItem("applicationNo", applicationNo);
        }

        console.log("📌 Stored in Localstorage:", localStorage.getItem(`${normalizedRole}_userName`));

        setTimeout(() => {
          setIsLoading(false);
          switch (normalizedRole) {
            case "student":
              navigate("/student-dashboard");
              break;
            case "warden":
              navigate("/warden-dashboard");
              break;
            case "admin":
              navigate("/admin-dashboard");
              break;
            default:
              setError("Unauthorized role");
              break;
          }
        }, 500);
      } else {
        setIsLoading(false);
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("🔥 Fetch Error:", err);
      setIsLoading(false);
      setError("Invalid credentials");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <video autoPlay loop muted className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div className="auth-box">
        <img src={collegeLogo} alt="College Logo" className="logo" />
        <h3 className="title">Hostel Allocation System</h3>
        <h2 className="page-heading">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email / Application Number</label>
            <div className="input-container" style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                placeholder="Enter your email or application number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={{ width: '100%' }}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-input-container" style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', paddingRight: '40px' }}
                required
              />
              <span 
                className="password-toggle-icon" 
                onClick={togglePasswordVisibility}
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
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div style={{ marginTop: '30px' }}> {/* Added spacing container */}
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
