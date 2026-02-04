import React from 'react';
import './rack-console.css';

const RackPage: React.FC = () => {
  return (
    <div className="rack-container">
      <div className="vertical-rail"></div>
      <div className="phase phase-01">Rehearsals</div>
      <div className="phase phase-02">Control Room</div>
      <div className="phase phase-03">AV</div>
      <div className="phase phase-04">Café</div>
      <div className="phase phase-05">Contact</div>
    </div>
  );
};

export default RackPage;
