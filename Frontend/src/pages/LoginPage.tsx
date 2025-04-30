import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthStyles.css";
import collegeLogo from "../assets/college-logo.jpg";

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        identifier,
        password,
      });

      console.log("🔍 Server Response:", response.data);

      if (response.data.success) {
        const { role, name, userId, applicationNo } = response.data;
        console.log("✅ User Logged In:", name);

        // Clear any existing user data first
        localStorage.clear();
        
        // Create a session key based on role to prevent interference between roles
        const sessionKey = `user_${role}_${Date.now()}`;
        
        // Store user details in localStorage with role-specific keys
        localStorage.setItem(`${role}_userName`, name);
        localStorage.setItem(`${role}_userId`, userId);
        localStorage.setItem("currentRole", role);
        localStorage.setItem("userRole", role); // Add this line to store role explicitly
        localStorage.setItem("sessionKey", sessionKey);
        
        // Store application number only for students
        if (role === "student" && applicationNo) {
          localStorage.setItem("applicationNo", applicationNo);
        }

        console.log("📌 Stored in Localstorage:", localStorage.getItem(`${role}_userName`));

        setTimeout(() => {
          if (role === "student") {
            navigate("/student-dashboard");
          } else if (role === "warden") {
            navigate("/warden-dashboard"); 
          } else if (role === "admin") {
            navigate("/admin-dashboard");
          } else {
            setError("Unauthorized role");
          }
        }, 500);
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("🔥 Fetch Error:", err);
      setError("Invalid credentials");
    }
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
            <input
              type="text"
              placeholder="Enter your email or application number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
