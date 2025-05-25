'use client';

import { useEffect, useState } from 'react';

export default function SearchEmployeePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  async function fetchAllEmployees() {
    setLoading(true);
    try {
      const res = await fetch('/api/protected/employee/search');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    if (!query.trim()) {
      alert('Please enter email or phone to search');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/protected/employee/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      alert('Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setQuery('');
    fetchAllEmployees();
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Search Employees</h2>

      <input
        type="text"
        placeholder="Search by email or phone"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '300px', padding: '0.5rem', marginRight: '1rem' }}
      />

      <button onClick={handleSearch} style={{ marginRight: '0.5rem' }}>
        Search
      </button>

      <button onClick={handleClear}>Clear</button>

      <div style={{ marginTop: '1rem' }}>
        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {results.map((emp) => (
              <div
                key={emp.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1rem',
                  width: '250px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                <h3>
                  {emp.firstName} {emp.lastName}
                </h3>
                <p><strong>Email:</strong> {emp.email}</p>
                <p><strong>Mobile:</strong> {emp.mobile}</p>
                <p><strong>DOB:</strong> {emp.dob}</p>
                <p><strong>Gender:</strong> {emp.gender}</p>
                <p><strong>Address:</strong> {emp.address}</p>
                <p><strong>Country:</strong> {emp.country}</p>
                <p><strong>City:</strong> {emp.city}</p>
                <p><strong>Other City:</strong> {emp.otherCity ? 'Yes' : 'No'}</p>
                <p><small>Created At: {new Date(emp.createdAt).toLocaleDateString()}</small></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
