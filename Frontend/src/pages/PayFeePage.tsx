import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PayFeeStyles.css";

const PayFeePage: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Payment successful!");
      // Store payment completion in localStorage
      localStorage.setItem("paymentCompleted", "true");
      // Store the completed step
      const completedSteps = JSON.parse(localStorage.getItem("completedSteps") || "[]");
      completedSteps.push(2); // Mark payment (step 2) as completed
      localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
      // Navigate back to dashboard
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="pay-fee-container">
      <h1>Pay Hostel Fee</h1>
      <form onSubmit={handleFormSubmit} className="pay-fee-form">
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="Enter your 16-digit card number"
            maxLength={16}
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            required
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
        </div>
        <div className="form-group">
          <label>Expiry Date (MM/YY)</label>
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            maxLength={5}
            value={paymentDetails.expiryDate}
            onChange={handleInputChange}
            required
          />
          {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="password"
            name="cvv"
            placeholder="Enter your CVV"
            maxLength={3}
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            required
          />
          {errors.cvv && <p className="error-message">{errors.cvv}</p>}
        </div>
        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            name="cardHolderName"
            placeholder="Enter the name on the card"
            value={paymentDetails.cardHolderName}
            onChange={handleInputChange}
            required
          />
          {errors.cardHolderName && <p className="error-message">{errors.cardHolderName}</p>}
        </div>
        <button type="submit" className="pay-button">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PayFeePage;
