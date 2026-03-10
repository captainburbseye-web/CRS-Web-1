import React, { useState } from 'react';

// ==========================================
// HARDWARE RACK INTERFACE
// Flat orthographic 2U rack unit design
// ==========================================

const RackBolt = () => (
  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_3px_rgba(0,0,0,0.8)]" aria-hidden="true">
    <div className="w-full h-full rounded-full flex items-center justify-center">
      <div className="w-1 h-1 bg-gray-900 rounded-full" />
    </div>
  </div>
);

const PatchSocket = () => (
  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]" aria-hidden="true">
    <div className="w-full h-full rounded-full border border-gray-600" />
  </div>
);

const LedIndicator = ({ active = false, color = "green" }) => {
  const colors = {
    green: active ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" : "bg-green-900/40",
    red: active ? "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.9)]" : "bg-red-900/40",
    yellow: active ? "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.9)]" : "bg-yellow-900/40"
  };
  
  return (
    <div className={`w-2 h-2 rounded-full border border-black ${colors[color]} transition-all duration-200`} aria-hidden="true" />
  );
};

const VuMeterNeedle = ({ active = false }) => (
  <div className="relative w-16 h-12 bg-black rounded border border-gray-800" aria-hidden="true">
    <div className="absolute inset-[2px] bg-[#1a1a1a] rounded-sm">
      {/* Scale markings */}
      <svg viewBox="0 0 60 40" className="absolute inset-0 w-full h-full">
        <path d="M 10 35 Q 30 15 50 35" fill="none" stroke="#333" strokeWidth="0.5" />
        <line x1="15" y1="32" x2="15" y2="28" stroke="#333" strokeWidth="0.5" />
        <line x1="22" y1="27" x2="22" y2="24" stroke="#333" strokeWidth="0.5" />
        <line x1="30" y1="24" x2="30" y2="20" stroke="#555" strokeWidth="1" />
        <line x1="38" y1="27" x2="38" y2="24" stroke="#a00" strokeWidth="0.5" />
        <line x1="45" y1="32" x2="45" y2="28" stroke="#a00" strokeWidth="1" />
      </svg>
      {/* Needle */}
      <div 
        className={`absolute bottom-0 left-1/2 w-[1px] h-10 bg-red-600 origin-bottom transition-transform duration-300 ${active ? 'rotate-[25deg]' : '-rotate-[35deg]'}`}
        style={{ transformOrigin: '50% 100%' }}
      />
      <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-gray-800 rounded-full -translate-x-1/2 border border-gray-900" />
    </div>
  </div>
);

const EngravedLabel = ({ children }) => (
  <div 
    className="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-wider"
    style={{ textShadow: "0 1px 0 rgba(0,0,0,0.8), 0 -1px 0 rgba(255,255,255,0.1)" }}
  >
    {children}
  </div>
);

const MechanicalButton = ({ label, sublabel, active, hovered, onPress, onRelease, onHover, onLeave, href, external }) => {
  const [pressed, setPressed] = useState(false);
  
  const handleMouseDown = () => {
    setPressed(true);
    onPress?.();
  };
  
  const handleMouseUp = () => {
    setPressed(false);
    onRelease?.();
  };

  const content = (
    <div 
      className={`
        relative min-w-[140px] h-12 
        bg-gradient-to-b from-gray-700 to-gray-900 
        border border-black 
        shadow-[0_4px_0_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]
        ${pressed ? 'translate-y-[2px] shadow-[0_2px_0_rgba(0,0,0,0.8),inset_0_3px_6px_rgba(0,0,0,0.9)]' : ''}
        transition-all duration-75
        cursor-pointer
      `}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={onHover}
      onMouseLeave={() => { onLeave?.(); setPressed(false); }}
    >
      {/* Button face */}
      <div className="absolute inset-0.5 bg-gradient-to-b from-gray-600 to-gray-800 flex flex-col items-center justify-center gap-0.5 px-2">
        <EngravedLabel>{label}</EngravedLabel>
        {sublabel && (
          <div className="text-[6px] font-mono text-gray-600 uppercase tracking-wide">
            {sublabel}
          </div>
        )}
      </div>
      
      {/* LED indicator */}
      <div className="absolute top-1 right-1">
        <LedIndicator active={active || hovered} color="green" />
      </div>
    </div>
  );

  if (href) {
    return (
      <a 
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return <button type="button">{content}</button>;
};

const RackPanel = ({ title, children, unit = "2U" }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="relative bg-gradient-to-b from-gray-800 to-gray-900 border-y border-black shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rack ear left */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-700 to-gray-800 border-r border-black flex flex-col justify-between items-center py-2">
        <RackBolt />
        <RackBolt />
      </div>
      
      {/* Panel content */}
      <div className="ml-12 mr-12 px-6 py-4 flex items-center gap-6">
        {/* Title section */}
        <div className="flex flex-col gap-2 min-w-[120px]">
          <div className="flex items-center gap-2">
            <EngravedLabel>{title}</EngravedLabel>
            <div className="text-[6px] font-mono text-gray-600">{unit}</div>
          </div>
          <div className="flex gap-2">
            <PatchSocket />
            <PatchSocket />
          </div>
        </div>
        
        {/* Button array */}
        <div className="flex-1 flex flex-wrap gap-3">
          {children}
        </div>
        
        {/* VU meters */}
        <div className="flex gap-2 shrink-0">
          <VuMeterNeedle active={hovered} />
        </div>
      </div>
      
      {/* Rack ear right */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-700 to-gray-800 border-l border-black flex flex-col justify-between items-center py-2">
        <RackBolt />
        <RackBolt />
      </div>
    </div>
  );
};

export default function StudioServicesRack() {
  const [activeButton, setActiveButton] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleOpenTermsModal = () => {
    window.dispatchEvent(new CustomEvent('OPEN_ODRO_MODAL'));
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Rack chassis */}
        <div className="bg-black p-1 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-gray-900">
          
          {/* Recording Panel */}
          <RackPanel title="RECORDING" unit="2U">
            <MechanicalButton
              label="CRS STUDIO"
              sublabel="Cowley Road"
              active={activeButton === 'crs-recording'}
              hovered={hoveredButton === 'crs-recording'}
              onPress={() => setActiveButton('crs-recording')}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('crs-recording')}
              onLeave={() => setHoveredButton(null)}
              href="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX"
              external={true}
            />
            <MechanicalButton
              label="CRICKET STUDIO"
              sublabel="Cricket Road"
              active={activeButton === 'cricket-recording'}
              hovered={hoveredButton === 'cricket-recording'}
              onPress={() => setActiveButton('cricket-recording')}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('cricket-recording')}
              onLeave={() => setHoveredButton(null)}
              href="https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX"
              external={true}
            />
          </RackPanel>

          {/* Rehearsal Panel */}
          <RackPanel title="REHEARSAL" unit="2U">
            <MechanicalButton
              label="CRS ROOMS"
              sublabel="Cowley Road"
              active={activeButton === 'crs-rehearsal'}
              hovered={hoveredButton === 'crs-rehearsal'}
              onPress={() => setActiveButton('crs-rehearsal')}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('crs-rehearsal')}
              onLeave={() => setHoveredButton(null)}
              href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX"
              external={true}
            />
            <MechanicalButton
              label="CRICKET ROOMS"
              sublabel="Cricket Road"
              active={activeButton === 'cricket-rehearsal'}
              hovered={hoveredButton === 'cricket-rehearsal'}
              onPress={() => setActiveButton('cricket-rehearsal')}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('cricket-rehearsal')}
              onLeave={() => setHoveredButton(null)}
              href="https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX"
              external={true}
            />
          </RackPanel>

          {/* Control Room Panel */}
          <RackPanel title="CONTROL ROOM" unit="2U">
            <MechanicalButton
              label="CRS HYBRID"
              sublabel="Cowley Road"
              active={activeButton === 'crs-control'}
              hovered={hoveredButton === 'crs-control'}
              onPress={() => setActiveButton('crs-control')}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('crs-control')}
              onLeave={() => setHoveredButton(null)}
              href="https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX"
              external={true}
            />
            <MechanicalButton
              label="CRICKET HYBRID"
              sublabel="Cricket Road"
              active={activeButton === 'cricket-control'}
              hovered={hoveredButton === 'cricket-control'}
              onPress={() => setActiveButton('cricket-control')}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('cricket-control')}
              onLeave={() => setHoveredButton(null)}
              href="https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX"
              external={true}
            />
          </RackPanel>

          {/* ODRO Panel */}
          <RackPanel title="ODRO REPAIR" unit="1U">
            <MechanicalButton
              label="TERMS"
              sublabel="T&C"
              active={activeButton === 'odro-terms'}
              hovered={hoveredButton === 'odro-terms'}
              onPress={() => { setActiveButton('odro-terms'); handleOpenTermsModal(); }}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('odro-terms')}
              onLeave={() => setHoveredButton(null)}
            />
            <MechanicalButton
              label="REQUEST"
              sublabel="Repair Form"
              active={activeButton === 'odro-request'}
              hovered={hoveredButton === 'odro-request'}
              onPress={() => setActiveButton('odro-request')}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('odro-request')}
              onLeave={() => setHoveredButton(null)}
              href="/contact?service=repairs"
              external={false}
            />
            <MechanicalButton
              label="CONTACT"
              sublabel="Info"
              active={activeButton === 'odro-contact'}
              hovered={hoveredButton === 'odro-contact'}
              onPress={() => setActiveButton('odro-contact')}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('odro-contact')}
              onLeave={() => setHoveredButton(null)}
              href="/contact"
              external={false}
            />
          </RackPanel>

          {/* Workshop Café Panel */}
          <RackPanel title="WORKSHOP CAFE" unit="1U">
            <MechanicalButton
              label="BOOK CAFE"
              sublabel="Coffee & Co-Work"
              active={activeButton === 'cafe'}
              hovered={hoveredButton === 'cafe'}
              onPress={() => setActiveButton('cafe')}
              onRelease={() => setActiveButton(null)}
              onHover={() => setHoveredButton('cafe')}
              onLeave={() => setHoveredButton(null)}
              href="https://crsoxford.com/book"
              external={true}
            />
          </RackPanel>

        </div>
      </div>
    </main>
  );
}
