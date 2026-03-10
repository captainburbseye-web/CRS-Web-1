/** @jsxImportSource react */
import React, { useState } from 'react';

// ==========================================
// 1. HARDWARE PRIMITIVES & MICRO-BRANDING
// ==========================================

const HexBolt = ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => (
  <svg viewBox="0 0 100 100" className={`drop-shadow-md ${className}`} aria-hidden="true">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#444" stroke="#111" strokeWidth="4"/>
    <circle cx="50" cy="50" r="25" fill="#222" />
    <circle cx="50" cy="50" r="15" fill="#111" />
  </svg>
);

const BrandBadge = ({ kind, className = "" }) => {
  if (kind === "crs") {
    return (
      <div aria-hidden="true" className={`w-6 h-6 shrink-0 rounded-sm border border-black/70 bg-gradient-to-b from-green-600 to-green-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" className="w-full h-full p-0.5">
          <path d="M4 4 L12 2 L20 4 L20 12 L12 22 L4 12 Z" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="bevel"/>
          <circle cx="12" cy="12" r="3" fill="white"/>
        </svg>
      </div>
    );
  }
  if (kind === "cricket") {
    return (
      <div aria-hidden="true" className={`w-6 h-6 shrink-0 rotate-45 rounded-[2px] border border-black/70 bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 24 24" className="-rotate-45 w-full h-full p-1">
          <rect x="6" y="6" width="12" height="12" fill="none" stroke="black" strokeWidth="2" rx="1"/>
          <circle cx="12" cy="12" r="3" fill="black"/>
        </svg>
      </div>
    );
  }
  if (kind === "odro") {
    return (
      <div aria-hidden="true" className={`w-6 h-6 shrink-0 rounded-sm border border-black/70 bg-gradient-to-b from-orange-500 to-orange-700 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] flex items-center justify-center ${className}`}>
        <span className="text-[8px] font-black text-white tracking-tighter">AV</span>
      </div>
    );
  }
  if (kind === "cafe") {
    return (
      <div aria-hidden="true" className={`w-6 h-6 shrink-0 rounded-full border border-black/70 bg-gradient-to-b from-[#d4af37] to-[#997a00] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] flex items-center justify-center ${className}`}>
        <span className="text-[8px] font-black text-black tracking-tighter">W/C</span>
      </div>
    );
  }
  return null;
};

const LedIndicator = ({ variant, active = false }) => {
  const styles = {
    crs: active ? "bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.7)]" : "bg-green-950 shadow-inner",
    cricket: active ? "bg-yellow-300 shadow-[0_0_8px_2px_rgba(253,224,71,0.7)]" : "bg-yellow-900 shadow-inner",
    odro: active ? "bg-orange-400 shadow-[0_0_8px_2px_rgba(251,146,60,0.7)]" : "bg-orange-950 shadow-inner",
    neutral: active ? "bg-slate-300 shadow-[0_0_8px_2px_rgba(203,213,225,0.5)]" : "bg-slate-800 shadow-inner",
  };
  return (
    <div aria-hidden="true" className={`w-3 h-3 shrink-0 rounded-full border border-black/80 transition-all duration-150 ${styles[variant]}`} />
  );
};

const EngravedLabel = ({ children, id, className = "", style = {} }) => (
  <h2 
    id={id} 
    className={`font-sans font-black tracking-widest uppercase ${className}`}
    style={{ textShadow: "0 1px 1px rgba(255,255,255,0.1), 0 -1px 1px rgba(0,0,0,0.8)", ...style }}
  >
    {children}
  </h2>
);

// ==========================================
// 2. IDENTITY MODULES — MANUFACTURER PLATE
// ==========================================

const SignalStripe = () => (
  <div className="flex gap-[3px] items-center" aria-hidden="true">
    <div className="w-[3px] h-[3px] bg-[#dc2626] shadow-[inset_0_1px_0_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.2)]" />
    <div className="w-[3px] h-[3px] bg-[#d4a017] shadow-[inset_0_1px_0_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.2)]" />
    <div className="w-[3px] h-[3px] bg-[#2d3e2f] shadow-[inset_0_1px_0_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.2)]" />
  </div>
);

const CRSBlockLogo = () => (
  <div className="flex items-stretch border-[2px] border-black rounded-[2px] shadow-[0_4px_6px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden shrink-0" aria-label="CRS Logo">
    
    {/* Left Block: CR (Cream/White) */}
    <div className="relative flex flex-col items-center justify-center bg-[#f2efe4] px-2 sm:px-3 py-1 sm:py-1.5 border-r-[2px] border-black">
      <span 
        className="font-sans font-black text-black text-lg sm:text-2xl leading-none tracking-tighter" 
        style={{ transform: 'scaleY(1.15)' }}
      >
        CR
      </span>
      {/* Green Underline */}
      <div className="absolute bottom-1 w-[60%] h-[3px] sm:h-[4px] bg-[#3a7d28]"></div>
    </div>

    {/* Right Block: S (Mustard Yellow) */}
    <div className="flex items-center justify-center bg-[#dcae1d] px-2.5 sm:px-4 py-1 sm:py-1.5 shadow-[inset_2px_0_4px_rgba(255,255,255,0.1)]">
      <span 
        className="font-sans font-black text-black text-lg sm:text-2xl leading-none" 
        style={{ transform: 'scaleY(1.15)' }}
      >
        S
      </span>
    </div>

  </div>
);

const MasterFaceplate = () => (
  <div className="relative px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-[#2a3428] to-[#1c2318] border-b-2 border-black shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 sm:gap-4">
        <CRSBlockLogo />
        <div className="flex flex-col gap-1">
          <h1 
            className="text-[10px] sm:text-xs font-mono font-black tracking-[0.18em] uppercase"
            style={{ 
              color: '#8a9479',
              textShadow: "0 1px 0 rgba(255,255,255,0.08), 0 -1px 0 rgba(0,0,0,0.9)",
              letterSpacing: "0.18em"
            }}
          >
            COWLEY ROAD STUDIOS
          </h1>
          <div className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase" style={{ color: '#5a6350' }}>
            Oxford • Studio Services Rack
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <SignalStripe />
          <div 
            className="text-[8px] sm:text-[9px] font-mono font-bold tracking-wider uppercase"
            style={{ color: '#6a7360', textShadow: "0 1px 0 rgba(0,0,0,0.8)" }}
          >
            CRS-CONSOLE-01
          </div>
        </div>
        <div className="text-[6px] sm:text-[7px] font-mono tracking-wider uppercase" style={{ color: '#4a5340' }}>
          Audio • Rehearsal • Control
        </div>
      </div>
    </div>
  </div>
);

const StatusPlacard = () => (
  <div className="relative px-4 sm:px-8 py-4 sm:py-5 bg-gradient-to-b from-[#13160f] to-[#0b0d09] border-b-2 border-black">
    <div className="relative p-3 sm:p-4 bg-black/70 rounded border border-black/90 shadow-[inset_0_3px_8px_rgba(0,0,0,0.95)]">
      <div className="font-mono text-[9px] sm:text-[10px] leading-relaxed tracking-wide space-y-1.5">
        <div className="font-bold uppercase" style={{ color: '#7a9c68', textShadow: "0 0 6px rgba(122,156,104,0.5)" }}>
          SELECT SERVICE MODULE
        </div>
        <div className="flex items-center gap-2" style={{ color: '#6a7860' }}>
          <span style={{ color: '#7a9c68' }}>●</span>
          <span>CRS = LEFT CHANNEL</span>
        </div>
        <div className="flex items-center gap-2" style={{ color: '#6a7860' }}>
          <span style={{ color: '#d4a017' }}>●</span>
          <span>CRICKET = RIGHT CHANNEL</span>
        </div>
        <div className="text-[7px] sm:text-[8px] mt-2 pt-2 border-t" style={{ color: '#4a5340', borderColor: 'rgba(70,83,65,0.3)' }}>
          SIGNAL ROUTING • BOOKING BUS
        </div>
      </div>
    </div>
  </div>
);

const VuMeter = ({ label = "VU" }) => (
  <div className="relative flex flex-col items-center" aria-hidden="true">
    <div className="w-20 h-14 sm:w-24 sm:h-16 bg-gradient-to-b from-[#222] to-[#111] p-[3px] rounded border border-black shadow-[0_4px_6px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]">
      <div className="relative w-full h-full bg-[#fcf9e3] rounded-sm overflow-hidden shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 bg-yellow-400/5 animate-[pulse_4s_ease-in-out_infinite] group-hover:bg-yellow-500/20 transition-colors duration-500" />
        
        <svg viewBox="0 0 100 50" className="absolute top-1 left-0 w-full h-full opacity-70">
          <path d="M 15 45 A 35 35 0 0 1 85 45" fill="none" stroke="#222" strokeWidth="0.5" />
          <line x1="22" y1="32" x2="24" y2="35" stroke="#222" strokeWidth="1" />
          <line x1="35" y1="20" x2="36" y2="24" stroke="#222" strokeWidth="1" />
          <line x1="50" y1="15" x2="50" y2="20" stroke="#222" strokeWidth="1.5" />
          <line x1="65" y1="20" x2="64" y2="24" stroke="#222" strokeWidth="1" />
          <line x1="78" y1="32" x2="76" y2="35" stroke="#dc2626" strokeWidth="1.5" />
          <path d="M 72 26 A 35 35 0 0 1 85 45" fill="none" stroke="#dc2626" strokeWidth="2" />
        </svg>

        <div className="absolute bottom-[-4px] left-1/2 w-[1.5px] h-[110%] bg-[#111] origin-bottom -translate-x-1/2 -rotate-[40deg] group-hover:rotate-[15deg] group-active:rotate-[40deg] transition-transform duration-700 group-hover:duration-75 ease-out shadow-[-2px_0_2px_rgba(0,0,0,0.2)] z-10">
           <div className="w-full h-1/3 bg-red-600" />
        </div>
        <div className="absolute bottom-[-6px] left-1/2 w-4 h-4 bg-gradient-to-b from-[#333] to-[#111] rounded-full border border-black -translate-x-1/2 z-20 shadow-md" />
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] sm:text-[8px] font-sans font-black text-black/50 tracking-widest">{label}</span>
        <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/30 to-transparent rounded-t-sm pointer-events-none z-30" />
      </div>
    </div>
  </div>
);

// ==========================================
// 2. CORE ARCHITECTURE COMPONENTS
// ==========================================

const HardwareButton = ({ variant, serviceName, locationName, href, onClick, external = false, ariaLabel, icon, ledMode = "hover-on" }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isLink = Boolean(href);
  const Element = isLink ? "a" : "button";

  const variantStyles = {
    crs: "bg-gradient-to-b from-[#4a6d3c] to-[#2d4228] text-[#d8e6cc] hover:from-[#557a46] hover:to-[#385230]",
    cricket: "bg-gradient-to-b from-[#6b4a8e] to-[#4a3062] text-[#f5e6a0] hover:from-[#7a5aa0] hover:to-[#573870]",
    neutral: "bg-gradient-to-b from-[#4a5340] to-[#2a3020] text-[#c8d0b8] hover:from-[#5a6350] hover:to-[#3a4030]",
  };

  const activeLed = ledMode === "always-on" ? true : ledMode === "hover-on" ? hovered || pressed : false;

  const sharedProps = {
    className: `
      relative w-full sm:flex-1 flex items-center justify-between gap-2 sm:gap-3
      px-2 py-3 sm:px-6 sm:py-5
      border border-black/80 ring-1 ring-black/40
      shadow-[inset_0_2px_4px_rgba(255,255,255,0.14),0_4px_6px_rgba(0,0,0,0.6)]
      active:translate-y-[2px] active:shadow-[inset_0_6px_10px_rgba(0,0,0,0.8)]
      transition-all duration-100 cursor-pointer
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]
      ${variantStyles[variant]}
    `,
    "aria-label": ariaLabel,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onFocus: () => setHovered(true),
    onBlur: () => { setHovered(false); setPressed(false); },
  };

  const content = (
    <>
      <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
        {icon && <BrandBadge kind={icon} />}
        <div className="flex flex-col min-w-0 text-left">
          <span className="font-mono font-bold tracking-wide sm:tracking-widest uppercase text-xs sm:text-base leading-tight drop-shadow-md truncate">
            {serviceName}
          </span>
          {locationName && (
            <span className="font-mono text-[9px] sm:text-xs uppercase tracking-wide sm:tracking-[0.2em] opacity-80 truncate">
              {locationName}
            </span>
          )}
        </div>
      </div>
      <LedIndicator variant={variant} active={activeLed} />
    </>
  );

  if (isLink) {
    return (
      <Element {...sharedProps} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </Element>
    );
  }

  return (
    <Element {...sharedProps} type="button" onClick={onClick}>
      {content}
    </Element>
  );
};

const ServiceButtonGroup = ({ children }) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full p-3 sm:p-4 bg-black/40 rounded border border-black/60 shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)]">
    {children}
  </div>
);

const RackModule = ({ title, subtitle, theme = "standard", meters = true, children }) => {
  const labelId = `module-${title.replace(/\s+/g, "-").toLowerCase()}`;
  
  const themeStyles = {
    standard: "bg-gradient-to-b from-[#465341] to-[#2f3a28] shadow-[inset_0_2px_0_rgba(255,255,255,0.08),inset_0_-4px_8px_rgba(0,0,0,0.85)]",
    dark: "bg-gradient-to-b from-[#1c2018] to-[#13160f] shadow-[inset_0_2px_0_rgba(255,255,255,0.04),inset_0_-4px_8px_rgba(0,0,0,0.90)]"
  };
  
  return (
    <section 
      className={`group relative border-b-[3px] border-black/95 p-4 sm:p-8 flex flex-col gap-4 sm:gap-5 ${themeStyles[theme]}`}
      aria-labelledby={labelId}
    >
      <div className="flex justify-between items-end px-2">
        <div className="min-w-0 pr-2">
          <EngravedLabel id={labelId} className="text-base sm:text-xl truncate" style={{ color: theme === "dark" ? "#5a6350" : "#8a9479" }}>{title}</EngravedLabel>
          {subtitle && <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest mt-1 truncate" style={{ color: theme === "dark" ? "#3a4330" : "#5a6350" }}>{subtitle}</p>}
        </div>
        {meters && (
          <div className="flex gap-2 sm:gap-4 items-end pb-1 shrink-0">
            <VuMeter label="L" />
            <VuMeter label="R" />
          </div>
        )}
      </div>
      {children}
    </section>
  );
};

const RackChassis = ({ children }) => (
  <div className="max-w-5xl mx-auto bg-black p-0.5 sm:p-1 flex shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden">
    
    <div className="w-3 sm:w-10 bg-gradient-to-r from-gray-900 to-gray-700 border-r border-black flex flex-col justify-between py-4 sm:py-6 px-[1px] sm:px-1 items-center shadow-inner z-10" aria-hidden="true">
      {[...Array(6)].map((_, i) => <HexBolt key={`m-l-${i}`} className="sm:hidden w-2 h-2" />)}
      {[...Array(12)].map((_, i) => <HexBolt key={`d-l-${i}`} className="hidden sm:block w-4 h-4 sm:w-5 sm:h-5" />)}
    </div>
    
    <div className="flex-1 flex flex-col gap-0 bg-[#1a1a1a] min-w-0">
      {children}
    </div>
    
    <div className="w-3 sm:w-10 bg-gradient-to-l from-gray-900 to-gray-700 border-l border-black flex flex-col justify-between py-4 sm:py-6 px-[1px] sm:px-1 items-center shadow-inner z-10" aria-hidden="true">
      {[...Array(6)].map((_, i) => <HexBolt key={`m-r-${i}`} className="sm:hidden w-2 h-2" />)}
      {[...Array(12)].map((_, i) => <HexBolt key={`d-r-${i}`} className="hidden sm:block w-4 h-4 sm:w-5 sm:h-5" />)}
    </div>
    
  </div>
);

// ==========================================
// 3. MAIN PAGE ASSEMBLY
// ==========================================

export default function StudioServicesRack() {
  const handleOpenTermsModal = () => {
    window.dispatchEvent(new CustomEvent('OPEN_ODRO_MODAL'));
  };

  return (
    <main className="min-h-screen bg-[#111] py-8 sm:py-12 px-0 sm:px-6">
      <RackChassis>
        
        <MasterFaceplate />
        <StatusPlacard />
        
        <RackModule title="Recording" subtitle="Studio Session Booking" meters={true}>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="crs"
              serviceName="Recording" 
              locationName="Cowley Road"
              href="https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book CRS Recording Session at Cowley Road"
            />
            <HardwareButton 
              variant="cricket" 
              icon="cricket"
              serviceName="Recording"
              locationName="Cricket Road" 
              href="https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book Cricket Recording Session at Cricket Road"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="Rehearsal" subtitle="Band Practice Rooms" meters={false}>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="crs"
              serviceName="Rehearsal" 
              locationName="Cowley Road"
              href="https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book CRS Rehearsal Room at Cowley Road"
            />
            <HardwareButton 
              variant="cricket" 
              icon="cricket"
              serviceName="Rehearsal"
              locationName="Cricket Road" 
              href="https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book Cricket Rehearsal Room at Cricket Road"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="Control Room" subtitle="Hybrid Studio Hire" meters={true}>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="crs"
              serviceName="Control Room"
              locationName="Cowley Road" 
              href="https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book CRS Control Room Hire at Cowley Road"
            />
            <HardwareButton 
              variant="cricket" 
              icon="cricket"
              serviceName="Control Room"
              locationName="Cricket Road" 
              href="https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX" 
              external={true}
              ariaLabel="Book Cricket Control Room Hire at Cricket Road"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="ODRO Electronics Repair" subtitle="AV & Instrument Servicing" theme="dark" meters={false}>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="neutral" 
              icon="odro"
              serviceName="Terms" 
              onClick={handleOpenTermsModal} 
              ariaLabel="View ODRO repair terms and conditions"
            />
            <HardwareButton 
              variant="neutral" 
              serviceName="Repair Request" 
              href="/contact?service=repairs" 
              external={false}
              ariaLabel="Submit an electronics repair request to ODRO"
            />
            <HardwareButton 
              variant="neutral" 
              serviceName="Contact" 
              href="/contact" 
              external={false}
              ariaLabel="Contact ODRO repairs"
            />
          </ServiceButtonGroup>
        </RackModule>

        <RackModule title="Workshop Café" subtitle="Coffee & Co-Working" theme="dark" meters={false}>
          <ServiceButtonGroup>
            <HardwareButton 
              variant="crs" 
              icon="cafe"
              serviceName="Book Café" 
              locationName="Workshop Café"
              href="https://crsoxford.com/book" 
              external={true}
              ariaLabel="Book a table at the Workshop Café"
            />
          </ServiceButtonGroup>
        </RackModule>

      </RackChassis>
    </main>
  );
}
