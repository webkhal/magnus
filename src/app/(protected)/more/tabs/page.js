'use client';
import React, { useState } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Tab One', 'Tab Two', 'Tab Three'];
  const tabContents = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
    'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.',
    'Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Multi Tab Component</h2>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: activeTab === index ? '#0070f3' : '#eee',
              color: activeTab === index ? 'white' : 'black',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          borderRadius: '8px',
          minHeight: '100px',
        }}
      >
        <p>{tabContents[activeTab]}</p>
      </div>
    </div>
  );
}
