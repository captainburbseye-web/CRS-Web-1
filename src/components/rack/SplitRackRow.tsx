import React from 'react';
import { RackModule, RackModuleProps } from './RackModule';

/**
 * SplitRackRow: Displays two rack modules side-by-side
 * Used for Row 3 (Rehearsal) and Row 4 (Control Room)
 */

interface SplitRackRowProps {
  left: RackModuleProps;
  right: RackModuleProps;
}

export function SplitRackRow({ left, right }: SplitRackRowProps) {
  return (
    <div className="split-rack-row">
      <div className="split-rack-module">
        <RackModule {...left} />
      </div>
      <div className="split-rack-module">
        <RackModule {...right} />
      </div>
    </div>
  );
}
