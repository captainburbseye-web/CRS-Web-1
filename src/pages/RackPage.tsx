import React from 'react';
import { Link } from 'react-router-dom';

const RackPage: React.FC = () => {
  return (
    <div className="rack-container">
      <div className="vertical-rail"></div>
      <Link to="/booking/cowley" className="phase phase-01"><span className="phase-label">BOOK COWLEY ROAD</span></Link>
      <Link to="/contact?ref=recording" className="phase phase-02"><span className="phase-label">STUDIO TRACKING</span></Link>
      <Link to="/av" className="phase phase-03"><span className="phase-label">AV</span></Link>
      <Link to="/cafe" className="phase phase-04"><span className="phase-label">Café</span></Link>
      <Link to="/contact" className="phase phase-05"><span className="phase-label">Contact</span></Link>
    </div>
  );
};

export default RackPage;
