import React from 'react';
import './css/Navbar.css';

const Navbar = ({ setActiveComponent, activeComponent }) => {
  const handleLogout = () => {
    localStorage.removeItem('userMobile');
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">VP Systems</div>
      <ul className="navbar-nav">
        <li>
          <button
            onClick={() => setActiveComponent('Home')}
            className={activeComponent === 'Home' ? 'active' : ''}
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('Transactions')}
            className={activeComponent === 'Transactions' ? 'active' : ''}
          >
            Transactions
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('About')}
            className={activeComponent === 'About' ? 'active' : ''}
          >
            About
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;