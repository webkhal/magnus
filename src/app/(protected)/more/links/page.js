'use client';

import React, { useState } from 'react';
import Image from 'next/image';

function LinksPage() {
  const [activeTab, setActiveTab] = useState('working');

  const tabLabels = {
    working: 'Working Links',
    broken: 'Broken Links',
    image: 'Image Links',
    status: 'Status Codes',
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '20px' }}>Links</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.keys(tabLabels).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px',
              backgroundColor: activeTab === tab ? '#3498db' : 'white',
              color: activeTab === tab ? 'white' : '#3498db',
              border: '1px solid #3498db',
              cursor: 'pointer',
              fontWeight: 'bold',
              borderRadius: '6px',
            }}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'working' && (
          <div style={{ fontSize: '18px' }}>
            <a href="https://react.dev" target="_blank" rel="noreferrer" style={{ color: 'red', marginRight: '20px' }}>
              Link 1
            </a>
            <a href="https://nextjs.org" target="_blank" rel="noreferrer" style={{ color: 'blue', marginRight: '20px' }}>
              Link 2
            </a>
            <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer" style={{ color: 'green' }}>
              Link 3
            </a>
          </div>
        )}

        {activeTab === 'broken' && (
          <div style={{ fontSize: '18px' }}>
            <a href="https://example.com/broken1" target="_blank" rel="noreferrer" style={{ color: 'red', marginRight: '20px' }}>
              Link 1
            </a>
            <a href="https://notarealwebsite123456.com" target="_blank" rel="noreferrer" style={{ color: 'blue', marginRight: '20px' }}>
              Link 2
            </a>
            <a href="https://404page.invalid" target="_blank" rel="noreferrer" style={{ color: 'green' }}>
              Link 3
            </a>
          </div>
        )}

        {activeTab === 'image' && (
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <Image src="https://reactjs.org/logo-og.png" alt="React" width={100} height={100} />
            </a>
            <a href="https://nextjs.org" target="_blank" rel="noreferrer">
              <Image src="https://nextjs.org/static/twitter-cards/home.jpg" alt="Next.js" width={100} height={100} />
            </a>
            <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">
              <Image src="https://developer.mozilla.org/mdn-social-share.0ca9dbda.png" alt="MDN" width={100} height={100} />
            </a>
            <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer">
              <Image src="https://www.typescriptlang.org/images/og-image.png" alt="TS" width={100} height={100} />
            </a>
          </div>
        )}

        {activeTab === 'status' && (
          <div style={{ fontSize: '18px' }}>
            <a href="https://httpstat.us/200" target="_blank" rel="noreferrer" style={{ color: 'green', marginRight: '20px' }}>
              200
            </a>
            <a href="https://httpstat.us/400" target="_blank" rel="noreferrer" style={{ color: 'orange', marginRight: '20px' }}>
              400
            </a>
            <a href="https://httpstat.us/500" target="_blank" rel="noreferrer" style={{ color: 'red' }}>
              500
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinksPage;

