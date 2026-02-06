# Click Sound FX Specification

**Location:** `/public/assets/click.wav`

**Purpose:** Authentic hardware toggle click for power-switch buttons on /rack page

## Audio Specifications

- **Format:** WAV (uncompressed)
- **Sample Rate:** 44.1 kHz or 48 kHz
- **Bit Depth:** 16-bit or 24-bit
- **Channels:** Mono
- **Duration:** 50-150ms
- **Peak Level:** -6dB to -3dB

## Sound Character

**Reference:** Tascam-style analog toggle or Roland micro-click

**Characteristics:**
- High-frequency transient (2-8kHz emphasis)
- Short decay (under 100ms)
- Crisp, mechanical "snap"
- Minimal low-frequency content
- No reverb or ambience

## Sourcing Options

1. **Record from actual hardware:**
   - Tascam mixer channel strip toggle
   - Roland TR-808/909 button press
   - Neve console switch actuation

2. **Sound libraries:**
   - Search: "mechanical switch click", "toggle switch", "relay click"
   - Avoid: soft/plastic clicks, long decay, electronic beeps

3. **Synthesis:**
   - Short noise burst (white/pink)
   - High-pass filter at 1kHz
   - Fast attack (0-2ms), fast release (20-50ms)
   - Optional: layer with short sine wave transient (3-5kHz)

## Implementation

Once sourced, place file at:
```
/public/assets/click.wav
```

The audio element is already configured in Rack.tsx:
```html
<audio id="click-sfx" src="/assets/click.wav" preload="auto"></audio>
```

## Testing

Test on:
- Desktop browsers (Chrome, Firefox, Safari)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Verify autoplay policy compliance (user-initiated playback only)
