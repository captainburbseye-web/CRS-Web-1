# AI Prompt Log

## Purpose
Track all AI-assisted development work on CRS-Web-1 to prevent regressions and maintain architectural integrity.

---

## Entry Format
```
### [Date] - [Agent] - [Branch] - [Scope]
**Prompt**: Brief description
**Constraints**: Non-negotiable requirements
**Accepted**: What was implemented
**Rejected**: What was explicitly NOT done
**Integration Points**: Dependencies or wiring needed
```

---

## Log Entries

### 2026-03-09 - Claude Dev - feature/studio-rack-ui - Studio Rack Component
**Prompt**: Build skeuomorphic hardware rack booking UI for CRS/Cricket services

**Constraints**:
- Preserve rack metaphor (19" equipment rack aesthetic)
- No redesign of booking flow
- Keep all existing Square URLs unchanged
- No new dependencies beyond React + Tailwind
- Maintain component hierarchy: HexBolt → BrandBadge → LedIndicator → HardwareButton → ServiceButtonGroup → RackModule → RackChassis

**Accepted**:
- Brand SVG badges (CRS shield, Cricket diamond) as inline SVGs
- LED indicators with 3-state logic: off (idle) → dimmed (hover) → full (active)
- VU meters with idle pulse (4s) and ballistic overshoot animation (220ms)
- Hardware button spring physics (cubic-bezier timing, 1px translate, 75ms duration)
- ODRO Terms button dispatches `OPEN_ODRO_MODAL` CustomEvent
- Mobile typography with text truncation below 375px
- Full WCAG 2.1 AA accessibility (ARIA labels, keyboard nav, focus-visible)
- 5 service modules: Recording, Rehearsal, Control Room, ODRO Repair, Workshop Café

**Rejected**:
- No separate modal component (uses existing app modal system via event)
- No placeholder alert() or console.log in production code
- No markdown-style hrefs
- No additional animation libraries
- No redesign of component architecture after initial build

**Integration Points**:
- Requires ODRO modal event listener in App.jsx or Layout.jsx:
  ```jsx
  useEffect(() => {
    const openModal = () => setOdroModalOpen(true);
    window.addEventListener('OPEN_ODRO_MODAL', openModal);
    return () => window.removeEventListener('OPEN_ODRO_MODAL', openModal);
  }, []);
  ```
- Component location: `src/components/StudioServicesRack.jsx`
- CSS animations in: `src/index.css` (vuHit, rackIdle keyframes)

**Known Limitations**:
- LED light leakage effect (outline halo) may need adjustment for high-contrast displays
- VU meter overshoot timing calibrated for 60fps displays
- Button spring physics assumes standard pointer device (not pen/stylus)

**Files Modified**:
- `src/components/StudioServicesRack.jsx` (346 lines)
- `src/index.css` (added hardware physics keyframes)

**Commits**:
- `517c5ab` - feat: Add Studio Services Rack component
- `[pending]` - feat: hardware physics interaction pass

---

## Agent Branch Isolation Pattern

All AI work MUST follow this pattern:

```
feature/your-feature
  └── ai/agent-work-pass
```

**Never let AI agents commit directly to feature branches.**

After AI work completes:
1. Review diff: `git diff feature/your-feature`
2. Check for red flags: console.log, alert(), placeholder logic, architecture drift
3. Merge if safe: `git checkout feature/your-feature && git merge ai/agent-work-pass`
4. Delete agent branch: `git branch -d ai/agent-work-pass`

This protects against:
- AI rewriting working code
- Messy commit history
- Accidental architecture changes
- Difficult rollbacks

---

## Conventions

### Commit Messages
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructure (no behavior change)
- `docs:` - Documentation only
- `style:` - Formatting, whitespace
- `test:` - Test additions/changes
- `chore:` - Build process, tooling

### Branch Naming
- `feature/descriptive-name` - New features
- `fix/issue-description` - Bug fixes
- `ai/agent-task-name` - AI work isolation

### Red Flags in AI Output
- `console.log` or `alert()` in production code
- Markdown-style URLs in JSX (`[text](url)`)
- Placeholder functions (`// TODO:`, `throw new Error('Not implemented')`)
- New dependencies not discussed in prompt
- Architecture changes beyond prompt scope
- Removal of existing working features

---

## Review Checklist

Before merging AI work:
- [ ] No console.log or alert() calls
- [ ] All hrefs are plain strings
- [ ] No placeholder logic remains
- [ ] Component architecture unchanged (unless explicitly requested)
- [ ] Accessibility maintained (ARIA, keyboard nav)
- [ ] Mobile responsive (test <375px)
- [ ] No new dependencies added
- [ ] Git history is clean (squash if needed)
- [ ] Integration points documented
- [ ] Known limitations noted

---

Last updated: 2026-03-09
