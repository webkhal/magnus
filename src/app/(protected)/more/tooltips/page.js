'use client';

import React, { useState } from 'react';

function TooltipPage() {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const showTooltip = hovered || clicked;

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Tooltip */}
        {showTooltip && (
          <div
            style={{
              backgroundColor: '#333',
              color: '#fff',
              padding: '6px 10px',
              borderRadius: '4px',
              fontSize: '14px',
              position: 'absolute',
              bottom: '125%',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              opacity: 1,
              transition: 'opacity 0.3s',
              zIndex: 1,
            }}
          >
            {clicked ? 'You clicked the button!' : 'Click the button to proceed'}
          </div>
        )}

        {/* Button */}
        <button
          onClick={() => setClicked(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#0070f3',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Click Me
        </button>
      </div>
    </div>
  );
}

export default TooltipPage;
