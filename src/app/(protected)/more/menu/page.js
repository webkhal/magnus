'use client';

import { useState } from 'react';

const simpleMenuItems = [
  { id: 1, label: 'Dashboard', icon: '🏠' },
  { id: 2, label: 'Profile', icon: '👤' },
  { id: 3, label: 'Messages', icon: '✉️' },
];

const submenuItems = [
  {
    id: '1',
    label: 'Settings',
    icon: '⚙️',
    submenu: [
      { id: '1-1', label: 'General' },
      { id: '1-2', label: 'Security' },
      { id: '1-3', label: 'Notifications' },
    ],
  },
  {
    id: '2',
    label: 'Projects',
    icon: '📁',
    submenu: [
      { id: '2-1', label: 'Project A' },
      { id: '2-2', label: 'Project B' },
    ],
  },
  { id: '3', label: 'Help', icon: '❓' }, // no submenu
];

export default function TwoMenus() {
  const [openSubmenuId, setOpenSubmenuId] = useState(null);

  const toggleSubmenu = (id) => {
    setOpenSubmenuId(openSubmenuId === id ? null : id);
  };

  const containerStyle = {
    display: 'flex',
    gap: '30px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  };

  const menuStyle = {
    width: '200px',
    borderRadius: '6px',
    padding: '15px',
    border: '1px solid #ccc', // simple border for structure
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '12px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
  };

  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const liStyle = {
    marginBottom: '10px',
  };

  const iconStyle = {
    marginRight: '10px',
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const submenuUlStyle = {
    listStyle: 'none',
    paddingLeft: '20px',
    marginTop: '6px',
  };

  const submenuLiStyle = {
    marginBottom: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  };

  const arrowStyle = {
    marginLeft: 'auto',
  };

  return (
    <div style={containerStyle}>

      <h2 > Menu </h2>
      {/* Simple Menu */}
      <nav style={menuStyle}>
        <h3 style={titleStyle}>Single Menu</h3>
        <ul style={ulStyle}>
          {simpleMenuItems.map(({ id, icon, label }) => (
            <li key={id} style={liStyle}>
              <span style={iconStyle}>{icon}</span>
              {label}
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu with Submenus */}
      <nav style={menuStyle}>
        <h3 style={titleStyle}>Sub Menus</h3>
        <ul style={ulStyle}>
          {submenuItems.map(({ id, icon, label, submenu }) => (
            <li key={id} style={liStyle}>
              <div
                style={submenu ? menuItemStyle : { display: 'flex', alignItems: 'center' }}
                onClick={() => submenu && toggleSubmenu(id)}
              >
                <span style={iconStyle}>{icon}</span>
                <span>{label}</span>
                {submenu && (
                  <span style={arrowStyle}>{openSubmenuId === id ? '▼' : '▶'}</span>
                )}
              </div>
              {submenu && openSubmenuId === id && (
                <ul style={submenuUlStyle}>
                  {submenu.map(({ id: subId, label: subLabel }) => (
                    <li key={subId} style={submenuLiStyle}>
                      {subLabel}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
