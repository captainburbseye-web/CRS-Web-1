# CRS HERO RACK — PHOTOREALISTIC IMAGE GENERATION PROMPT
**Master Canonical Prompt for AI Image Generation**

## 🎯 PURPOSE

Generate high-fidelity, photorealistic hero images of CRS branded industrial rack hardware for:
- Website hero banners
- Marketing collateral
- Award submissions
- Print materials

This prompt is **tool-locked** to prevent AI softening into generic tech art.

---

## 1️⃣ MASTER CANONICAL PROMPT (Model-Agnostic)

**Use this as the source of truth. Variants below adapt weighting and syntax.**

```
A high-detail, photorealistic 16:9 cinematic banner depicting a custom industrial 3U rack-mounted hardware unit branded "COWLEY ROAD STUDIOS." The unit is built from dark, weathered charcoal steel with visible wear, exposed hex bolts, and precision-machined edges. On the far left, a square inset control badge displays a bold "CRS" logo split diagonally between matte white and mustard yellow, topped by a thin glowing green status bar. Beneath it are three tactile circular hardware buttons in red, amber, and green with subtle specular highlights.

Centered on the unit are two large rectangular British road-sign plates mounted with industrial fasteners: the top plate is white with "COWLEY ROAD" in black, utilitarian sans-serif lettering; the lower plate is mustard yellow with "STUDIOS" in bold black type, featuring a small cricket-head icon in the corner.

On the right side, a vertical column of round indicator lamps (red, amber, green) sits beside a green physical "Play" button and a row of small grey hardware interface icons (home, music, broadcast/news, user), etched or printed like embedded firmware controls.

Professional studio lighting, controlled highlights on metal surfaces, subtle grime and patina, shallow depth of field, sharp focus on branding and controls. The object feels indestructible, functional, and engineered — not decorative, not futuristic. Shot like high-end industrial product photography.
```

---

## 2️⃣ NEGATIVE PROMPT (CRITICAL — Use Verbatim)

**This prevents "AI slop."**

```
No people, no faces, no hands, no lifestyle photography. No sci-fi UI, no holograms, no neon cyberpunk effects. No glossy Apple-style minimalism. No plastic textures. No rounded toy-like forms. No text distortion. No fantasy symbols. No illustration style. No cartoon lighting. No brand mashups.
```

---

## 3️⃣ TOOL-SPECIFIC REFINEMENTS

### 🟡 Nano Banana (Image-first, texture-forward)

Nano Banana responds well to material emphasis and manufacturing language.

**Add this at the end:**

```
Material realism prioritized. Cold-rolled steel, powder-coated metal, engraved plates, injection-molded buttons. True industrial tolerances. Physical weight implied.
```

**Recommended settings (if exposed):**
- Guidance / CFG: 7–8
- Stylization: Low
- Texture realism: High

---

### 🎥 Veo (Cinematic / motion-capable)

If Veo is used for a hero motion banner or subtle loop:

**Add:**

```
Cinematic framing, locked-off camera with minimal parallax drift. Slight LED flicker on indicator lamps. No camera shake. No dramatic movement.
```

**If motion is allowed:**
- 1–2 second micro-loop only
- LEDs may pulse once, slowly
- Everything else remains static

---

### 🟣 Midjourney-style Models (if applicable)

Use parameter discipline.

**Prompt tail:**

```
industrial hardware photography, brutalist product design, studio rack equipment, British infrastructure aesthetic
```

**Parameters:**

```
--ar 16:9
--style raw
--chaos 5
--stylize 50
```

---

## 4️⃣ WHY THIS PROMPT WORKS (System Truth Check)

This prompt:
- ✅ **Treats the object as infrastructure**, not art
- ✅ **Anchors typography in British civic signage**
- ✅ **Uses color as signal**, not decoration
- ✅ **Avoids lore, narrative, or "vibes"**
- ✅ **Produces something that could plausibly exist on a bench**

It aligns cleanly with:
- **CRS = Engineering Reality**
- **Rack UI = Load-bearing Metaphor**
- **Brewforce Energy = NOT Present Here**

---

## 5️⃣ OPTIONAL VARIANTS (Safe Extensions)

If you want controlled exploration without breaking the system:

### Variant A — "More Worn"

```
Increased patina, micro-scratches, slight discoloration around fasteners, evidence of long-term use.
```

### Variant B — "New Install"

```
Clean but not glossy, factory-fresh hardware with no fingerprints, pristine labeling.
```

**Both stay inside CRS truth.**

---

## 6️⃣ FINAL NOTE (IMPORTANT)

If a model starts:
- Adding glowing UI
- Smoothing edges
- Introducing "concept art" lighting
- Inventing interfaces

**Respond once with:**

> "Too conceptual. Make it heavier, more physical, more like real rack hardware."

**Do not add new ideas.**  
**Just re-anchor to material reality.**

---

## 🎨 DESIGN ELEMENTS BREAKDOWN

### Industrial Foundation
The image uses the aesthetic of **heavy-duty audio or server rack gear**, utilizing dark, cold-rolled steel and industrial fasteners like hex bolts.

### Branding & Typography
- **CRS Logo:** Modern, geometric logo split between **white and mustard yellow**
- **Road Sign Plates:** Anchor the "Cowley Road" identity using high-contrast black text on white and yellow backgrounds to mimic British street signage

### Color Palette
Strictly adheres to CRS brand identity:
- **Mustard Yellow** (#E89B3C)
- **Nettle Green** (#4CAF50)
- **Fire Red** (#DC143C)
- **Dark Grey/Black** (#1a1a1a)

### Tactile Interface
Inclusion of glowing indicator lamps and physical buttons suggests **"Inexpugnable" hardware**—equipment built to last with physical, mechanical feedback.

### The "Crick"
The small cricket-head icon is a subtle nod to the **Cricket Road Studio** partnership and the "Crick" brand within the CRS network.

---

## 📋 USAGE CONTEXTS

1. **Website hero banners** — Above-fold impact on homepage
2. **Marketing collateral** — Posters, flyers, brochures
3. **Award submissions** — Professional institutional presentation
4. **Social media** — Shareable brand identity assets
5. **Print materials** — High-resolution output for physical media

---

## 🔗 EXAMPLE OUTPUT

**Generated Asset:** https://www.genspark.ai/api/files/s/juifKphf?cache_control=3600

This is the current reference implementation of the prompt specification.

---

## 📝 VERSION HISTORY

- **v1.4** (2026-01-20): Refined flat-tactile illustration variant
- **v1.3** (2026-01-20): Added negative prompts and tool-specific refinements
- **v1.2** (2026-01-20): Material realism emphasis
- **v1.1** (2026-01-20): Initial photorealistic specification
- **v1.0** (2026-01-20): Concept draft

---

**END OF HERO RACK IMAGE GENERATION SPECIFICATION**

Any modifications to this prompt require:
1. Documentation update here
2. Test generation to verify output quality
3. Comparison with canonical rack unit UI spec
4. Approval from Danny (brand governance holder)
