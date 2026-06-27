# MedLingo — PRD

## Original problem statement
> "Check out my medlingo-website that I attached the repo for; it looks old. Make it newer and modern. The first thing that you have to do is check out the website, then make it modern, add dark mode, and add animations and animated cards. First show me your design; when I approve it, you will start."

## User-approved design choices (locked)
- **Default theme:** Light, with dark-mode toggle (persisted in `localStorage`)
- **Aesthetic:** Soft & premium — warm cream / warm-espresso, mint + coral accents, glowing cards
- **Animation intensity:** Rich — 3D card tilts, animated gradients, magnetic buttons, scroll-driven reveals
- **Content scope:** Visual redesign only (no new sections, no removed/restructured content)

## Architecture
- **Stack:** React 19 + Vite 8, plain CSS per component (no Tailwind/UI lib)
- **Layout:** Single-page marketing site, anchor-based navigation
- **Theme system:** CSS variables under `:root` and `[data-theme="dark"]`
- **Hooks created:** `useTheme`, `useTilt`, `useMagnetic`, `useScrollReveal` (existing)
- **Fonts:** Outfit (display) + Manrope (body) + JetBrains Mono (accents) — distinctive, non-generic
- **External integrations:** Formspree (`https://formspree.io/f/mkoaqgbr`) for waitlist (existing, untouched)

## Sections (all preserved)
1. Navbar — glass blur on scroll, theme toggle, magnetic CTA
2. Hero — animated aurora background, gradient text, flip flashcard with 3D tilt + float
3. Problem — 3 animated cards (tilt + spotlight glow)
4. Activities — 7 animated cards, Speaking has pulsing "Key Feature" badge
5. Modules — Phase 1/2 segmented tabs with glider; Phase 2 cards have frosted lock overlay
6. Team — 2 cards with glowing accent gradients + dashed avatar ring
7. Waitlist — glowing card, Formspree form, animated counter to 124
8. Footer — clean two-row layout
9. Floating back-to-top with bounce keyframe

## What's been implemented (2026-01-27)
- Full visual redesign across every component
- Light & dark theme with smooth 0.45s color transition
- Animations: aurora-shift, float-y, pulse-glow, gradient-shimmer, badge-pulse, spin-slow, bounce-soft, drop-in
- Interactive: 3D mouse tilt on all cards, spotlight glow following cursor, magnetic pull on primary CTAs, flip-card 3D, animated counter, animated tab glider
- Accessibility: prefers-reduced-motion guards, focus-visible rings, aria-labels, semantic markup
- `data-testid` attributes on every interactive/critical element
- Theme persists via `localStorage` key `medlingo-theme`; no flash thanks to inline bootstrap script in `index.html`

## Testing
- `/app/test_reports/iteration_1.json` — 100% pass, 0 console errors, 14/14 flows verified

## Prioritized backlog (P0/P1/P2)
- **P0:** None — core work complete.
- **P1:** Logo asset is slightly low-res in screenshots; consider providing a higher-res SVG/PNG for crisp navbar/footer rendering at all breakpoints.
- **P2:** Add a small i18n switcher (UZ/RU/EN) to demo the localised tone of the product.
- **P2:** Add a FAQ accordion section between Team and Waitlist for SEO + conversion.
- **P2:** Connect waitlist counter to a real source (Formspree count via Zapier, or a small JSON endpoint) so it grows truthfully over time.

## Next tasks
- Await user feedback after they preview the redesign.
