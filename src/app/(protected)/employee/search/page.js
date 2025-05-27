'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [countries, setCountries] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchAllEmployees();
    fetchCountries();
  }, []);

  async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, { ...options, credentials: 'include' });
        if (!res.ok) throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        return await res.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  async function fetchAllEmployees() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithRetry('/api/protected/employee/search');
      const ids = data.map(emp => emp.id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        setError('Data error: Duplicate employee IDs detected.');
      } else if (ids.some(id => !id)) {
        setError('Data error: Some employees are missing IDs.');
      }
      setResults(data);
    } catch (error) {
      setError(`Failed to load employees: ${error.message}`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCountries() {
    try {
      const data = await fetchWithRetry('/api/location/countries');
      const countryMap = {};
      data.forEach(country => {
        countryMap[country._id] = country.name;
      });
      setCountries(countryMap);
    } catch (error) {
      setError(`Failed to load countries: ${error.message}`);
    }
  }

  async function handleSearch() {
    if (!query.trim()) {
      alert('Please enter something to search');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithRetry(`/api/protected/employee/search?q=${encodeURIComponent(query)}`);
      setResults(data);
    } catch (error) {
      setError(`Search failed: ${error.message}`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setQuery('');
    fetchAllEmployees();
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/protected/employee/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.statusText}`);
      alert('Employee deleted');
      fetchAllEmployees();
    } catch (error) {
      setError(`Error deleting employee: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(emp) {
    const updatedData = {
      firstName: prompt('Edit First Name', emp.firstName) || emp.firstName,
      lastName: prompt('Edit Last Name', emp.lastName) || emp.lastName,
      email: prompt('Edit Email', emp.email) || emp.email,
      mobile: prompt('Edit Mobile', emp.mobile) || emp.mobile,
      dob: emp.dob,
      gender: emp.gender,
      address: emp.address,
      country: emp.country,
      city: emp.city,
      otherCity: emp.otherCity,
    };
    await updateEmployee(emp.id, updatedData);
  }

  async function updateEmployee(id, data) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/protected/employee/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Update failed: ${res.statusText}`);
      alert('Employee updated');
      fetchAllEmployees();
    } catch (error) {
      setError(`Error updating employee: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '1rem', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2>Search Employees</h2>
        {error && <div style={{ color: '#ff0000', marginBottom: '1rem' }}>{error}</div>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => router.push('/employee/create')}
          style={{
            backgroundColor: '#0070f3',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            border: 'none',
            fontSize: '1rem',
            ...(loading && { opacity: 0.65, cursor: 'not-allowed' }),
          }}
        >
          + Create Employee
        </button>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '300px',
              maxWidth: '100%',
              padding: '0.5rem',
              border: '1px solid #dddddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: '#4caf50',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              border: 'none',
              fontSize: '1rem',
              ...(loading && { opacity: 0.65, cursor: 'not-allowed' }),
            }}
            disabled={loading}
          >
            Search
          </button>
          <button
            onClick={handleClear}
            style={{
              backgroundColor: '#f44336',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              border: 'none',
              fontSize: '1rem',
              ...(loading && { opacity: 0.65, cursor: 'not-allowed' }),
            }}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </div>

      <div>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#333' }}>Loading employees...</div>
        ) : results.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#333' }}>No employees found</div>
        ) : (
          <div style={{ overflowX: 'auto', maxWidth: '800px', marginLeft: '1rem' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                tableLayout: 'auto',
              }}
            >
              <thead
                style={{
                  backgroundColor: '#f8f9fa',
                  borderBottom: '1px solid #dddddd',
                }}
              >
                <tr>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 600, width: '150px' }}>Name</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 600 }}>Email</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 600 }}>Mobile</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 600 }}>DOB</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 600 }}>Gender</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 600 }}>Address</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 600 }}>Country</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 600 }}>City</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((emp) => (
                  <tr
                    key={emp.id}
                    style={{ borderBottom: '1px solid #dddddd' }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                  >
                    <td style={{ padding: '12px 15px', width: '150px' }}>{emp.firstName} {emp.lastName}</td>
                    <td style={{ padding: '12px 15px' }}>{emp.email}</td>
                    <td style={{ padding: '12px 15px' }}>{emp.mobile}</td>
                    <td style={{ padding: '12px 15px' }}>
                      {emp.dob ? new Date(emp.dob).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ padding: '12px 15px' }}>{emp.gender || 'N/A'}</td>
                    <td style={{ padding: '12px 15px' }}>{emp.address || 'N/A'}</td>
                    <td style={{ padding: '12px 15px' }}>{countries[emp.country] || emp.country || 'N/A'}</td>
                    <td style={{ padding: '12px 15px' }}>{emp.city || 'N/A'}</td>
                    <td
                      style={{
                        padding: '12px 15px',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <button
                        onClick={() => handleEdit(emp)}
                        style={{
                          backgroundColor: '#4caf50',
                          color: '#ffffff',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          border: 'none',
                          fontSize: '0.9rem',
                          ...(loading && { opacity: 0.65, cursor: 'not-allowed' }),
                        }}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        style={{
                          backgroundColor: '#f44336',
                          color: '#ffffff',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          border: 'none',
                          fontSize: '0.9rem',
                          ...(loading && { opacity: 0.65, cursor: 'not-allowed' }),
                        }}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}