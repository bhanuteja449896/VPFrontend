import React, { useState } from 'react';
import './css/Navbar.css';

const Navbar = ({ setActiveComponent }) => {
  const handleLogout = () => {
    localStorage.removeItem('userMobile');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">VP Systems</div>
      <ul className="navbar-nav">
        <li><button onClick={() => setActiveComponent('Home')}>Home</button></li>
        <li><button onClick={() => setActiveComponent('Transactions')}>Transactions</button></li>
        <li><button onClick={() => setActiveComponent('About')}>About</button></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;