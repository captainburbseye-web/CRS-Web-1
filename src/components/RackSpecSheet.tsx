/**
 * Rack Spec Sheet Component
 * Console-style service information panels
 * Maintains ODRO/CRS engineering aesthetic
 */

interface SpecSheetProps {
  title: string;
  specs: { label: string; value: string }[];
  description: string;
  className?: string;
}

export const RackSpecSheet = ({ title, specs, description, className = '' }: SpecSheetProps) => {
  // Build spec lines
  const specLines = specs.map(spec => 
    `│ [${spec.label.padEnd(13, ' ')}] ${spec.value.padEnd(26, ' ')} │`
  ).join('\n');
  
  return (
    <div class={`rack-spec-sheet ${className}`}>
      <pre class="spec-content">{`┌─────────────────────────────────────────────┐
│ ${title.padEnd(43, ' ')} │
├─────────────────────────────────────────────┤
${specLines}
├─────────────────────────────────────────────┤
│ ${description.substring(0, 43).padEnd(43, ' ')} │
└─────────────────────────────────────────────┘`}</pre>
    </div>
  );
};

// Service specifications data
export const serviceSpecs = {
  cowleyRecording: {
    title: 'CH-01A :: COWLEY ROAD RECORDING',
    specs: [
      { label: 'CAPACITY', value: '1-5 musicians + engineer' },
      { label: 'ROOM TYPE', value: 'Control + live isolation' },
      { label: 'ENGINEER', value: 'Included in all sessions' },
      { label: 'SESSION', value: 'Half-day / full-day blocks' },
      { label: 'STANDARD', value: 'ODRO Engineering Protocol' },
      { label: 'POLICY', value: 'No Chaos — see /about' }
    ],
    description: 'Professional recording with experienced engineer. Analog & digital hybrid workflow.'
  },
  
  cricketRecording: {
    title: 'CH-01B :: CRICKET ROAD RECORDING',
    specs: [
      { label: 'CAPACITY', value: '1-4 musicians + engineer' },
      { label: 'ROOM TYPE', value: 'Compact control + booth' },
      { label: 'ENGINEER', value: 'Included in all sessions' },
      { label: 'SESSION', value: 'Half-day / full-day blocks' },
      { label: 'STANDARD', value: 'ODRO Engineering Protocol' },
      { label: 'SPECIALTY', value: 'Vocals, overdubs, podcasts' }
    ],
    description: 'Intimate recording space. Perfect for solo artists, voice work.'
  },
  
  cowleyRehearsal: {
    title: 'CH-02A :: COWLEY ROAD REHEARSAL',
    specs: [
      { label: 'CAPACITY', value: '4-6 piece band' },
      { label: 'EQUIPMENT', value: 'Backline provided' },
      { label: 'PA SYSTEM', value: 'Full monitoring available' },
      { label: 'DURATION', value: '2hr / 3hr / 4hr blocks' },
      { label: 'PRICING', value: '£45 (2h) · £60 (3h) · £65 (4h)' },
      { label: 'ACCESS', value: 'Load-in at ground level' }
    ],
    description: 'Full-size rehearsal room with professional backline and PA.'
  },
  
  cricketRehearsal: {
    title: 'CH-02B :: CRICKET ROAD REHEARSAL',
    specs: [
      { label: 'CAPACITY', value: '3-5 piece band' },
      { label: 'EQUIPMENT', value: 'Backline provided' },
      { label: 'PA SYSTEM', value: 'Monitoring available' },
      { label: 'DURATION', value: '2hr / 3hr / 4hr blocks' },
      { label: 'PRICING', value: '£45 (2h) · £60 (3h) · £65 (4h)' },
      { label: 'ACCESS', value: 'Compact load-in' }
    ],
    description: 'Tighter rehearsal space for focused work. Same gear standard.'
  },
  
  controlRoom: {
    title: 'CH-03 :: CONTROL ROOM (ENGINEER-FREE)',
    specs: [
      { label: 'MODE', value: 'Self-operated / BYO engineer' },
      { label: 'EQUIPMENT', value: 'Full control room access' },
      { label: 'USE CASES', value: 'Mixing, mastering, editing' },
      { label: 'SESSION', value: 'Hourly or day rate' },
      { label: 'STANDARD', value: 'ODRO-spec monitoring & signal' },
      { label: 'SUPPORT', value: 'Tech support available' }
    ],
    description: 'For producers and engineers who want the room without our engineer.'
  },
  
  workshopCafe: {
    title: 'CH-04 :: WORKSHOP CAFÉ & COWORKING',
    specs: [
      { label: 'MODE', value: 'Café · Repairs · Workspace' },
      { label: 'HOURS', value: 'TUE-SAT 10:00-18:00' },
      { label: 'COFFEE', value: 'Specialty roast available' },
      { label: 'REPAIRS', value: 'Guitar setup, soldering, mods' },
      { label: 'WORKSPACE', value: 'Desk hire by the day' },
      { label: 'CAPACITY', value: '25 seated / 60 standing' }
    ],
    description: 'Coffee, workbenches, musical curios. Bring your laptop or your broken amp.'
  }
};
