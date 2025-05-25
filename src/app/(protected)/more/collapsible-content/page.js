'use client';

import React, { useState } from 'react';

const collapsibles = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Pellentesque vitae velit ex. Mauris dapibus risus quis suscipit vulputate.`,
  },
  {
    title: "Consectetur Adipiscing Elit",
    content: `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.`,
  },
  {
    title: "Ut Enim Ad Minim Veniam",
    content: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident.`,
  },
];

function Page() {
  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggle = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <div style={{ padding: 40, background: '#f0f2f5', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: 20 }}>Collapsible Content</h2>

      {collapsibles.map((item, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <div
            onClick={() => toggle(index)}
            style={{
              backgroundColor: '#3498db',
              color: '#fff',
              padding: '14px 20px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 'bold',
              borderRadius: '4px 4px 0 0'
            }}
          >
            {item.title}
            <span style={{ fontSize: 18 }}>{activeIndexes.includes(index) ? '-' : '+'}</span>
          </div>

          {activeIndexes.includes(index) && (
            <div
              style={{
                backgroundColor: '#fff',
                padding: '16px 20px',
                border: '1px solid #ccc',
                borderTop: 'none',
                whiteSpace: 'pre-line',
                borderRadius: '0 0 4px 4px'
              }}
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Page;
