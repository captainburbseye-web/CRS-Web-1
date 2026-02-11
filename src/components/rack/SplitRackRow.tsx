import { RackModule, RackModuleProps } from './RackModule';

/**
 * SplitRackRow: Displays two rack modules side-by-side
 * Used for Row 3 (Rehearsal) and Row 4 (Control Room)
 * Manus's Clean Implementation
 */

interface SplitRackRowProps {
  left: RackModuleProps;
  right: RackModuleProps;
}

export const SplitRackRow = ({ left, right }: SplitRackRowProps) => {
  return (
    <div class="split-rack-row">
      <div class="split-rack-module">
        <RackModule {...left} />
      </div>
      <div class="split-rack-module">
        <RackModule {...right} />
      </div>
    </div>
  );
};
