import React from 'react';

/**
 * Component to reset student progress (form filling and payment status)
 * This is primarily for testing purposes
 */
const ResetStudentProgress: React.FC = () => {
  const resetAllProgress = () => {
    // Clear form completion status
    localStorage.removeItem('formCompleted');
    
    // Clear payment completion status
    localStorage.removeItem('paymentCompleted');
    
    // Clear completed steps array
    localStorage.removeItem('completedSteps');
    
    alert('All student progress has been reset successfully! The page will now reload.');
    window.location.reload();
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
        Use the button below to reset all student progress (form filling and payment status).
        <br />
        <strong>Warning:</strong> This will clear all progress and cannot be undone.
      </p>
      <button
        onClick={resetAllProgress}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Reset All Progress
      </button>
    </div>
  );
};

export default ResetStudentProgress;