import React, { useState } from 'react';
import { buildApiUrl } from '../config/api';

/**
 * Component to reset student progress (form filling and payment status)
 * This is primarily for testing purposes
 */
const ResetStudentProgress: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  // Reset local storage for current user
  const resetLocalProgress = () => {
    // Clear form completion status
    localStorage.removeItem('formCompleted');
    
    // Clear payment completion status
    localStorage.removeItem('paymentCompleted');
    
    // Clear completed steps array
    localStorage.removeItem('completedSteps');

    // Clear any booking information
    const userRole = localStorage.getItem("userRole") || "student";
    const userId = localStorage.getItem(`${userRole}_userId`);
    if (userId) {
      localStorage.removeItem(`${userRole}_${userId}_userBooking`);
      localStorage.removeItem(`occupiedBeds_${userId}`);
    }
    
    setMessage('Local progress reset successfully! The page will now reload.');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  // Reset progress for all students in the database
  const resetAllStudentsProgress = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "WARNING: This will reset all students' progress, including form submissions, payments, and room bookings. This action cannot be undone. Are you sure you want to proceed?"
    );
    
    if (!confirmed) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch(buildApiUrl('/api/progress/reset/all'), {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ ${data.message}`);
        // Also clear local storage
        resetLocalProgress();
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error resetting all student progress:', error);
      setMessage('❌ Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset all occupied beds
  const resetAllOccupiedBeds = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "WARNING: This will clear all bed bookings in the system. This action cannot be undone. Are you sure you want to proceed?"
    );
    
    if (!confirmed) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch(buildApiUrl('/api/occupied-beds'), {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error resetting all occupied beds:', error);
      setMessage('❌ Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ marginBottom: '15px', color: '#dc3545' }}>Administration Tools</h3>
      <p style={{ marginBottom: '15px' }}>
        Use these buttons to reset student progress (form filling, payment status, and room bookings).
        <br />
        <strong>Warning:</strong> This will clear all progress and cannot be undone.
      </p>
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
        <button
          onClick={resetLocalProgress}
          style={{
            backgroundColor: '#f0ad4e',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          disabled={isLoading}
        >
          Reset Current User Progress
        </button>
        
        <button
          onClick={resetAllStudentsProgress}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset ALL Students Progress'}
        </button>

        <button
          onClick={resetAllOccupiedBeds}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset ALL Occupied Beds'}
        </button>
      </div>
      
      {message && (
        <div style={{
          padding: '10px 15px',
          backgroundColor: message.includes('❌') ? '#f8d7da' : '#d4edda',
          color: message.includes('❌') ? '#721c24' : '#155724',
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ResetStudentProgress;