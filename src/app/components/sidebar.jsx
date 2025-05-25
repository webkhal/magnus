'use client';
import { useState } from 'react';
import '../styles/sidebar.css'; // Assuming you have a CSS file for styling

// Import icons
import { FaHome, FaUsers, FaPlus, FaSearch, FaCogs, FaBars } from 'react-icons/fa';

export default function Sidebar() {
  const [showEmployee, setShowEmployee] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <aside className="sidebar">
      <ul>
        <li>
          <a href="/home"><FaHome className="icon" /> Home</a>
        </li>

        <li>
          <a onClick={() => setShowEmployee(!showEmployee)} style={{ cursor: 'pointer' }}>
            <FaUsers className="icon" /> Employee <span style={{ marginLeft: 'auto' }}>{showEmployee ? '▾' : '▸'}</span>
          </a>
          {showEmployee && (
            <ul className="submenu">
              <li><a href="/employee/create"><FaPlus className="icon" /> Create</a></li>
              <li><a href="/employee/search"><FaSearch className="icon" /> Search</a></li>
            </ul>
          )}
        </li>

        <li>
          <a onClick={() => setShowMore(!showMore)} style={{ cursor: 'pointer' }}>
            <FaBars className="icon" /> More <span style={{ marginLeft: 'auto' }}>{showMore ? '▾' : '▸'}</span>
          </a>
          {showMore && (
            <ul className="submenu">
              <li><a href="/more/tabs">Multiple Tabs</a></li>
              <li><a href="/more/menu">Menu</a></li>
              <li><a href="/more/autocomplete">Autocomplete</a></li>
              <li><a href="/more/collapsible-content">Collapsible Content</a></li>
              <li><a href="/more/images">Images</a></li>
              <li><a href="/more/slider">Slider</a></li>
              <li><a href="/more/tooltips">Tooltips</a></li>
              <li><a href="/more/popups">Popups</a></li>
              <li><a href="/more/links">Links</a></li>
              <li><a href="/more/css-properties">CSS Properties</a></li>
              <li><a href="/more/iframes">iFrames</a></li>
            </ul>
          )}
        </li>

        <li>
          <a href="/settings"><FaCogs className="icon" /> Settings</a>
        </li>
      </ul>
    </aside>
  );
}
