# CH3 & CH6 Asset Specifications

## Required Assets

### CH3: COWLEY PODS (Zone Controller)
- **Filename**: `cowley-pods-rack.webp`
- **Dimensions**: 1920x1080 (16:9)
- **Target Size**: <200KB WebP
- **Color Theme**: Charcoal Grey + Caution Yellow (#FFD700)
- **Key Elements**:
  * Large rotary dial (POD 1) with green LED
  * Two toggle switches (POD 2, POD 3) with amber LEDs
  * Industrial safety striping
  * Worn metal texture

### CH6: CONTACT & LOCATION (Communications Patch Bay)
- **Filename**: `contact-patchbay-rack.webp`
- **Dimensions**: 1920x1080 (16:9)
- **Target Size**: <200KB WebP
- **Color Theme**: Black Metal + Amber Glow (#FF8C00)
- **Key Elements**:
  * Two 1/4" TRS jacks (EMAIL, PHONE)
  * Amber CRT screen with map display
  * Brushed aluminum texture
  * Professional broadcast aesthetic

## Ghost Hitbox Coordinates

### CH3 (3 Hitboxes)
```tsx
// POD 1: Main Suite (Green - Active)
{
  position: 'absolute',
  bottom: '18%',
  left: '36.5%',
  width: '15.5%',
  height: '34%',
  borderRadius: '4px'
}

// POD 2: Vocal A (Amber - Standby)
{
  position: 'absolute',
  top: '26%',
  right: '16.5%',
  width: '10.5%',
  height: '26%',
  borderRadius: '4px'
}

// POD 3: Vocal B (Amber - Standby)
{
  position: 'absolute',
  bottom: '18%',
  right: '16.5%',
  width: '10.5%',
  height: '26%',
  borderRadius: '4px'
}
```

### CH6 (3 Hitboxes)
```tsx
// EMAIL Jack (Top)
{
  position: 'absolute',
  top: '24%',
  left: '7.5%',
  width: '11%',
  height: '26%',
  borderRadius: '50%'
}

// PHONE Jack (Bottom)
{
  position: 'absolute',
  bottom: '18%',
  left: '7.5%',
  width: '11%',
  height: '26%',
  borderRadius: '50%'
}

// MAP Screen (Right)
{
  position: 'absolute',
  top: '21%',
  right: '14.5%',
  width: '43%',
  height: '57%',
  borderRadius: '2px'
}
```

## Integration Checklist

- [x] CH3 code structure complete
- [x] CH6 code structure complete
- [x] Waveform animations configured
- [x] Ghost hitboxes mapped
- [x] Service stack reordered
- [ ] CH3 asset uploaded
- [ ] CH6 asset uploaded
- [ ] Assets optimized to WebP
- [ ] Production deployment
- [ ] Hitbox alignment verified

## Current Status

**Code Ready**: ✅ All components wired and tested
**Assets Pending**: ⏳ Awaiting CH3 & CH6 images
**Deployment Ready**: 🚀 Deploy immediately once assets arrive

