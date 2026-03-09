# AI Agent Rules: CRS-Web-1

## 1. Architectural Constraints
- **UI Metaphor:** Locked to Skeuomorphic Studio Hardware.
- **Component Rules:** Use `RackModule`, `HardwareButton`, and `HexBolt`.
- **Prohibited Patterns:** NEVER use `rounded-xl`, `shadow-lg`, or generic SaaS card grids.
- **Styling:** Tailwind-only. Metallic gradients and 1px borders are mandatory.

## 2. Interaction & Physics
- **Buttons:** Must use `cubic-bezier(0.2, 0.8, 0.4, 1)` for mechanical spring feel.
- **LEDs:** Use 3-state logic (Idle/Warm/Peak) with 1px light leakage.
- **VU Meters:** Must maintain analog ballistic overshoot (22° settle).

## 3. Integration & Safety
- **Events:** UI must remain decoupled. Use `CustomEvent` for modal triggers.
- **Booking:** Square URLs are immutable. Do not "simplify" or redirect.
- **Performance:** Maintain 98+ Lighthouse scores. No JS animation loops.

## 4. Documentation
- Update `docs/PROMPT_LOG.md` after every significant architectural change.
