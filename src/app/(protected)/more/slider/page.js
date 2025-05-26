'use client';

import React, { useState } from 'react';

export default function Page() {
  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <h1>Slider </h1>
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: '10px', fontSize: '18px' }}>
        Current Value: {value}
      </div>
    </div>
  );
}
