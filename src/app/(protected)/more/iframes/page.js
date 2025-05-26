'use client';

import React from 'react';

export default function IframesPage() {
  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '20px' }}>Iframes Page</h2>

      {/* Example 1 - YouTube */}
      <div style={{ marginBottom: '30px' }}>
        <h4>YouTube Embed</h4>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Example 2 - Google */}
      <div style={{ marginBottom: '30px' }}>
        <h4>Google (won’t load due to X-Frame-Options)</h4>
        <iframe
          src="https://www.google.com"
          width="600"
          height="400"
          title="Google"
        ></iframe>
      </div>

      {/* Example 3 - Wikipedia */}
      <div>
        <h4>Wikipedia</h4>
        <iframe
          src="https://en.wikipedia.org/wiki/Main_Page"
          width="100%"
          height="400px"
          title="Wikipedia"
        ></iframe>
      </div>
    </div>
  );
}
