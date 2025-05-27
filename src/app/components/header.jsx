"use client";

export default function Header() {
  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <header
      style={{
        background: '#0070f3',
        color: 'white',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Magnus Dashboard</h1>
      <button
        style={{
          backgroundColor: '#005bb5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '0.4rem 0.8rem',
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}
