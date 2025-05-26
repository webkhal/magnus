'use client';

import React, { useState } from 'react';

export default function CssPropertiesPage() {
  const [activeTab, setActiveTab] = useState('links');

  const tabLabels = {
    links: 'Links',
    labels: 'Labels',
    buttons: 'Buttons',
    alerts: 'Alerts',
    progress: 'Progress Bars',
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '20px' }}>Css Properties</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.entries(tabLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: '10px 16px',
              backgroundColor: activeTab === key ? '#3498db' : 'white',
              color: activeTab === key ? 'white' : '#3498db',
              border: '1px solid #3498db',
              cursor: 'pointer',
              fontWeight: 'bold',
              borderRadius: '6px',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content per tab */}
      <div style={{ fontSize: '18px' }}>
        {activeTab === 'links' && (
          <div>
            <a href="https://react.dev" style={{ color: 'red', marginRight: '20px' }}>Link 1</a>
            <a href="https://nextjs.org" style={{ color: 'blue', marginRight: '20px' }}>Link 2</a>
            <a href="https://developer.mozilla.org" style={{ color: 'green', marginRight: '20px' }}>Link 3</a>
            <a href="https://typescriptlang.org" style={{ color: 'orange', marginRight: '20px' }}>Link 4</a>
            <a href="https://nodejs.org" style={{ color: 'purple' }}>Link 5</a>
          </div>
        )}

        {activeTab === 'labels' && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ background: '#3498db', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>Primary</span>
            <span style={{ background: '#2ecc71', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>Success</span>
            <span style={{ background: '#e74c3c', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>Danger</span>
            <span style={{ background: '#f39c12', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>Warning</span>
            <span style={{ background: '#9b59b6', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>Info</span>
          </div>
        )}

        {activeTab === 'buttons' && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '8px 12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}>Click Me</button>
            <button style={{ padding: '8px 12px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px' }}>Submit</button>
            <button style={{ padding: '8px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '10px', background: '#dff0d8', color: '#3c763d', borderRadius: '4px' }}>Success Alert!</div>
            <div style={{ padding: '10px', background: '#f2dede', color: '#a94442', borderRadius: '4px' }}>Danger Alert!</div>
            <div style={{ padding: '10px', background: '#fcf8e3', color: '#8a6d3b', borderRadius: '4px' }}>Warning Alert!</div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div style={{ width: '300px' }}>
            <div style={{ marginBottom: '10px' }}>HTML</div>
            <div style={{ background: '#e0e0e0', borderRadius: '4px' }}>
              <div style={{ width: '80%', background: '#3498db', padding: '4px 0', borderRadius: '4px', color: 'white', textAlign: 'center' }}>
                80%
              </div>
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>CSS</div>
            <div style={{ background: '#e0e0e0', borderRadius: '4px' }}>
              <div style={{ width: '60%', background: '#2ecc71', padding: '4px 0', borderRadius: '4px', color: 'white', textAlign: 'center' }}>
                60%
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>JS</div>
            <div style={{ background: '#e0e0e0', borderRadius: '4px' }}>
              <div style={{ width: '40%', background: '#e67e22', padding: '4px 0', borderRadius: '4px', color: 'white', textAlign: 'center' }}>
                40%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
