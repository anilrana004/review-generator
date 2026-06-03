# Design Brief

## Tone
Premium, minimal, focused. A productivity tool — not decorative. Like Linear, Vercel, Stripe. Dark-first aesthetic reduces visual fatigue.

## Differentiation
Coffee-inspired warmth (terracotta accent, not generic blue). Review card feels like premium paper — tactile elevation. Sharp typography with crisp edges.

## Color Palette
| Token | Value | Purpose |
|-------|-------|---------|
| Background | `0.12 0 0` (dark charcoal) | Near-black foundation for focus |
| Foreground | `0.92 0 0` (warm white) | Text with slight warmth |
| Card | `0.18 0 0` (darker charcoal) | Elevated surface for review output |
| Accent | `0.65 0.15 32` (muted terracotta) | Action buttons, highlights, copy affordance |
| Muted | `0.22 0 0` (mid-grey) | Secondary UI, disabled states |
| Destructive | `0.65 0.19 22` (warm red) | Error/warning states if needed |

## Typography
- **Display**: Geist Mono (sharp, tech-forward, geometric)
- **Body**: DM Sans (neutral, highly readable, modern)
- **Rhythm**: Display for titles/labels; body for descriptions and review text

## Elevation & Depth
- Background: base layer
- Cards: subtle elevation via `shadow-md` / `shadow-lg`
- Borders: minimal, near-invisible (low contrast with background)
- Review card: tactile feel via shadow and warm card background

## Structural Zones
| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header | `bg-background` with `border-b` | Branding, minimal |
| Controls (business type, rating) | `bg-background` buttons | Primary interaction zone |
| Review output | `bg-card` with `shadow-md` | Content centerpiece, paper-like |
| Actions (Copy, Generate) | Accent color buttons | Secondary affordances |

## Spacing & Rhythm
- Radius: 6px (crisp, not rounded)
- Density: Cards have internal padding, outer margin for rhythm
- Breakpoints: Mobile-first, responsive to tablet/desktop

## Component Patterns
- Buttons: Accent color for primary actions, secondary for reset/cancel
- Cards: Consistent shadow hierarchy (md for content, sm for secondary)
- Inputs: Clean borders, high contrast with background
- States: Hover/active use accent with higher chroma or brightness

## Motion
- Transitions: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` for smooth interactions
- No animations by default; add on-demand for generate/copy feedback
- Micro-interactions on button hover/active (subtle scale or opacity)

## Constraints
- Dark mode only (intentional for premium feel)
- No gradients (flat color palette with depth via shadow and layout)
- No decorative elements (focus on content)
- Typography limited to 2 families
- Accent used sparingly (highlights, CTAs, active states only)
