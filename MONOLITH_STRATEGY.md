# RACK MONOLITH - AI GENERATION PROMPT

## The Prompt

```
A full vertical tower stack of professional 19-inch rack mount audio equipment, encased in a dark steel frame. 

View: Orthographic straight-on flat view (2D UI style). 
Aspect Ratio: Tall vertical (1:3). 

Content: A cohesive stack of 6 distinct units from top to bottom:

(Top Unit): A military-grade Nettle Green analog unit with heavy toggle switches and a warm VU meter.

(Second Unit): A high-tech dark grey recording interface with a central glass screen and amber status LEDs.

(Third Unit): A sleek matte black broadcast processor with magenta cabling and digital readouts.

(Fourth Unit): A steampunk-inspired Mustard Yellow unit with brass pressure gauges and warm tungsten lights.

(Fifth Unit): A raw, unpainted steel patchbay with visible weld marks and input jacks.

(Bottom Unit): A massive dark metal power supply with horizontal ventilation grilles and a heavy rotary switch.

Style: Hyper-realistic, 8k resolution, industrial texture, edge-to-edge metal. 
Lighting: Cinematic studio lighting. 
Background: Isolated on black. 

--ar 9:21 --style raw --v 6.0
```

## Recommended Tools

1. **Midjourney** (best for photorealistic hardware)
2. **DALL-E 3** (via ChatGPT Plus)
3. **Stable Diffusion XL** (with photorealism checkpoint)

## Target Specs

- **Width**: 1048px (to match current chassis)
- **Height**: ~3000px (tall vertical stack)
- **Format**: WEBP or PNG (with transparency if possible)
- **File size**: Under 500KB (optimize after generation)

## Unit Mapping

After generation, measure the Y positions of each unit:

1. **Top Unit (Rehearsal)**: ~2-16% from top
2. **Second Unit (Control Room)**: ~18-32%
3. **Third Unit (Podcast)**: ~34-48%
4. **Fourth Unit (Café)**: ~50-64%
5. **Fifth Unit (Contact)**: ~66-80%
6. **Bottom Unit (Status)**: ~82-96%

Use these percentages to position the hitboxes in the code.

## The Advantage

- **Zero gaps**: One image = perfect alignment
- **Perfect lighting**: AI generates cohesive shadows
- **Consistent aesthetic**: All units match in style
- **Fast loading**: One HTTP request vs 7+
- **Easy maintenance**: Replace one image to update entire rack

## Fallback Plan

If AI generation doesn't produce perfect results, you can:
1. Generate the 6 units separately
2. Composite them in Photoshop/Figma with perfect alignment
3. Export as one unified image
4. Use the same hitbox approach

This gives you manual control over the final composition while still maintaining the zero-gap advantage.
