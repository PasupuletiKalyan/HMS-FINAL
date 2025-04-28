import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const PaymentPage: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const expiryDateRef = useRef<HTMLInputElement>(null); // Reference for expiryDate input
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Restrict input for specific fields
    if (name === "cardNumber") {
      if (!/^\d*$/.test(value)) return; // Allow only digits
      if (value.length > 16) return; // Limit to 16 characters
    }
    if (name === "expiryDate") {
      let formattedValue = value.replace(/\D/g, ""); // Remove non-digit characters
      if (formattedValue.length === 1) {
        const firstDigit = formattedValue[0];
        if (firstDigit !== "0" && firstDigit !== "1") return; // Restrict first digit to 0 or 1
      }
      if (formattedValue.length === 2) {
        const firstDigit = formattedValue[0];
        const secondDigit = formattedValue[1];
        if (firstDigit === "1" && parseInt(secondDigit, 10) > 2) return; // Restrict second digit if first is 1
      }
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4); // Add slash after 2 digits
      }
      setPaymentDetails((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }
    if (name === "cvv") {
      if (!/^\d*$/.test(value)) return; // Allow only digits
      if (value.length > 3) return; // Limit to 3 characters
    }

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="payment-page">
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit}>
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
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
        </div>
        <div className="form-group">
          <label>Expiry Date (MM/YY)</label>
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={paymentDetails.expiryDate}
            onChange={handleInputChange}
            ref={expiryDateRef}
            required
          />
          {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}
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
          {errors.cvv && <p className="error-message">{errors.cvv}</p>}
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
          {errors.cardHolderName && <p className="error-message">{errors.cardHolderName}</p>}
        </div>
        <button type="submit" className="submit-button">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
