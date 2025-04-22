import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthStyles.css";
import collegeLogo from "../assets/college-logo.jpg"; // ✅ Import logo

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState(""); // Student: Application No | Warden: Email
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
        const { role, name, userId } = response.data;
        console.log("✅ User Logged In:", name);

        // ✅ Store user details in localStorage (Corrected)
        localStorage.setItem("userName", name); // Ensure correct key
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", userId);

        console.log("📌 Stored in LocalStorage:", localStorage.getItem("userName"));

        setTimeout(() => {
          if (role === "student") {
            navigate("/student-dashboard");
          } else if (role === "warden") {
            navigate("/admin-dashboard"); // ✅ Redirect wardens to Admin Dashboard
          } else {
            setError("Unauthorized role");
          }
        }, 500);
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("🔥 Fetch Error:", err);
      setError("Something went wrong. Please try again.");
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
