import React from 'react';
import './rack-console.css';

const RackPage: React.FC = () => {
  return (
    <div className="rack-container">
      <div className="vertical-rail"></div>
      <div className="phase phase-01">
        <div className="module-label">Rehearsals</div>
      </div>
      <div className="phase phase-02">
        <div className="module-label">Control Room</div>
      </div>
      <div className="phase phase-03">
        <div className="module-label">AV</div>
      </div>
      <div className="phase phase-04">
        <div className="module-label">Café</div>
      </div>
      <div className="phase phase-05">
        <div className="module-label">Contact</div>
      </div>
    </div>
  );
};

export default RackPage;
