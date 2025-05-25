'use client';

import React, { useState } from 'react';

function Page() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Convert file to base64 string
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async () => {
    if (!file || !fileName) return alert('Please select a file and enter a file name');

    setLoading(true);

    try {
      const base64String = await toBase64(file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, base64: base64String }),
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();

      // Use returned base64 string for immediate display
      setImages((prev) => [
        ...prev,
        { name: data.image.fileName, url: data.image.base64 },
      ]);

      setFile(null);
      setFileName('');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#eef2f7', minHeight: '100vh', padding: '40px' }}>
      <h2>Uploading/Downloading Image</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
        <div>
          <label>
            <strong>Select File :</strong>
          </label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ padding: '10px', marginTop: '10px' }}
          />
        </div>

        <div>
          <label>
            <strong>File Name :</strong>
          </label>
          <br />
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="File Name"
            style={{ padding: '10px', width: '300px', marginTop: '10px' }}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            backgroundColor: '#0a9f4d',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            marginTop: '28px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <div style={{ marginTop: '60px' }}>
        <h3>List Of Images :</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          {images.map((img, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <img
                src={img.url}
                alt={img.name}
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <p>{img.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
