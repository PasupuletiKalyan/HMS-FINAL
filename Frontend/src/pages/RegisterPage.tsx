import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AuthStyles.css";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    applicationNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering User:", formData);
    alert("Form submitted! (Backend not connected yet)");
  };

  return (
    <div className="auth-container">
      <video autoPlay loop muted className="background-video">
        <source
          src="https://drive.google.com/uc?id=12_TRG8Xol_cPuAKWWDcB3VIjG_9C-RzI"
          type="video/mp4"
        />
      </video>

      <div className="register-box">
        <img src="/college-logo.jpg" alt="College Logo" className="logo" />
        {/* Title added below the logo */}
        <h3 className="title">Hostel Allocation System</h3>
        <h2 className="page-heading">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Application Number</label>
            <input
              type="text"
              name="applicationNumber"
              placeholder="Enter your application number"
              value={formData.applicationNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="login-prompt">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
