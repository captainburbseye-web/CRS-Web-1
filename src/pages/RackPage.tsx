import React from 'react';
import { Link } from 'react-router-dom';

const RackPage: React.FC = () => {
  return (
    <div className="rack-container">
      <img src="/path/to/header-logo.png" alt="Header Logo" className="header-logo" />
      <div className="vertical-rail"></div>
      <Link to="/booking/cowley" className="phase phase-01"><span className="phase-label nav-link">BOOK COWLEY ROAD</span></Link>
      <Link to="/contact?ref=podcast" className="phase phase-02"><span className="phase-label nav-link">PODCAST</span></Link>
      <Link to="/contact?ref=repair" className="phase phase-03"><span className="phase-label nav-link">BOOK REPAIR</span></Link>
      <Link to="/cafe" className="phase phase-04"><span className="phase-label nav-link">Café</span></Link>
      <Link to="/contact" className="phase phase-05"><span className="phase-label nav-link">Contact</span></Link>
    </div>
  );
};

export default RackPage;
