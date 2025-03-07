import React, { useState } from 'react';
import Navbar from './Navbar';
import Pay from './Pay'; // Payment component
import Payment from './Transaction'; // Transactions component
import About from './About'; // About component
import './css/Home.css';

const Home = () => {
  const [activeComponent, setActiveComponent] = useState('Home'); // Default to Home

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Home':
        return <Pay />;
      case 'Transactions':
        return <Payment />;
      case 'About':
        return <About />;
      default:
        return <h1>Welcome to VP Systems</h1>;
    }
  };

  return (
    <div>
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Home;