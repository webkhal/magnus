'use client';

import React, { useState } from 'react';

function PopupPage() {
  const [showModal, setShowModal] = useState(false);

  const handleDuplicateTab = () => {
    window.open(window.location.href, '_blank');
  };

  const handleGoogleTab = () => {
    window.open('https://www.google.com', '_blank');
  };

  const handleCustomLinks = () => {
    window.open('https://example1.com', '_blank'); // replace with your first link
    window.open('https://example2.com', '_blank'); // replace with your second link
  };

  const handleAlert = () => {
    alert('This is an alert popup!');
  };

  const handleConfirm = () => {
    const result = confirm('Do you confirm this action?');
    console.log('Confirm result:', result);
  };

  const handlePrompt = () => {
    const name = prompt('What is your name?', 'Guest');
    console.log('Prompt input:', name);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Popup Demo Page</h2>

      {/* In-window modal popup */}
      <button onClick={() => setShowModal(true)} style={buttonStyle}>
        In-Window Popup
      </button>

      {/* Duplicate tab */}
      <button onClick={handleDuplicateTab} style={buttonStyle}>
        Duplicate This Tab
      </button>

      {/* Google tab */}
      <button onClick={handleGoogleTab} style={buttonStyle}>
        Open Google Tab
      </button>

      {/* Two custom tabs */}
      <button onClick={handleCustomLinks} style={buttonStyle}>
        Open Two Custom Tabs
      </button>

      {/* Alert popup */}
      <button onClick={handleAlert} style={buttonStyle}>
        Alert Popup
      </button>

      {/* Confirm popup */}
      <button onClick={handleConfirm} style={buttonStyle}>
        Confirm Popup
      </button>

      {/* Prompt popup */}
      <button onClick={handlePrompt} style={buttonStyle}>
        Prompt Popup
      </button>

      {/* Modal Component */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <p>This is an in-window popup!</p>
            <button onClick={() => setShowModal(false)} style={buttonStyle}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
};

export default PopupPage;
