'use client';

import { useState, useEffect } from 'react';

export default function CreateEmployeePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: 'male',
    address: '',
    country: '',
    state: '',
    city: '',
    otherCity: false,
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load countries on mount
  useEffect(() => {
    fetch('/api/location/countries')
      .then(res => res.json())
      .then(setCountries)
      .catch(err => console.error('Error fetching countries:', err));
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (!formData.country) {
      setStates([]);
      setFormData(prev => ({ ...prev, state: '', city: '' }));
      return;
    }

    fetch(`/api/location/states?countryId=${formData.country}`)
      .then(res => res.json())
      .then(setStates)
      .catch(err => console.error('Error fetching states:', err));

    setFormData(prev => ({ ...prev, state: '', city: '' }));
    setCities([]);
  }, [formData.country]);

  // Load cities when state changes
  useEffect(() => {
    if (!formData.state) {
      setCities([]);
      setFormData(prev => ({ ...prev, city: '' }));
      return;
    }

    fetch(`/api/location/cities?stateId=${formData.state}`)
      .then(res => res.json())
      .then(setCities)
      .catch(err => console.error('Error fetching cities:', err));

    setFormData(prev => ({ ...prev, city: '' }));
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
     

    try {
      const res = await fetch('/api/protected/employee/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSuccessMessage('Employee created successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          dob: '',
          gender: 'male',
          address: '',
          country: '',
          state: '',
          city: '',
          otherCity: false,
        });
        setStates([]);
        setCities([]);
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      setErrorMessage('Server error. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>
        Employee <small style={{ color: '#666' }}>Create</small>
      </h2>

      <form onSubmit={handleSubmit}>
        <fieldset style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <legend>Details</legend>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="mobile" type="text" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
            <input name="dob" type="text" placeholder="DOB (dd/mm/yyyy)" value={formData.dob} onChange={handleChange} required />
          </div>

          <div style={{ marginTop: '1rem' }}>
            Gender:
            <label style={{ marginLeft: '1rem' }}>
              <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male
            </label>
            <label style={{ marginLeft: '1rem' }}>
              <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female
            </label>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%' }}
              required
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <select name="country" value={formData.country} onChange={handleChange} required>
              <option value="">--Select Country--</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select name="state" value={formData.state} onChange={handleChange} required disabled={!states.length}>
              <option value="">--Select State--</option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select name="city" value={formData.city} onChange={handleChange} required disabled={!cities.length}>
              <option value="">--Select City--</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>{city.name}</option>
              ))}
            </select>

            <label>
              <input name="otherCity" type="checkbox" checked={formData.otherCity} onChange={handleChange} /> Other City
            </label>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            {errorMessage && (
              <p style={{ color: 'red', marginBottom: '0.5rem' }}>{errorMessage}</p>
            )}
            {successMessage && (
              <p style={{ color: 'green', marginBottom: '0.5rem' }}>{successMessage}</p>
            )}
            <button type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
