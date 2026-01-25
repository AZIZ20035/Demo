# PrepAcademy Design System

## Design Tokens

### Colors

#### Light Theme
```css
/* Primary Brand */
--brand-primary: #6366f1;        /* Indigo 500 */
--brand-secondary: #8b5cf6;      /* Violet 500 */
--brand-accent: #a855f7;         /* Purple 500 */

/* Backgrounds */
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;         /* Gray 50 */
--bg-tertiary: #f3f4f6;          /* Gray 100 */
--bg-glass: rgba(255, 255, 255, 0.8);

/* Text */
--text-primary: #111827;         /* Gray 900 */
--text-secondary: #6b7280;       /* Gray 500 */
--text-muted: #9ca3af;           /* Gray 400 */

/* Semantic Colors */
--success: #10b981;              /* Green 500 */
--success-bg: #d1fae5;           /* Green 100 */
--danger: #ef4444;               /* Red 500 */
--danger-bg: #fee2e2;            /* Red 100 */
--warning: #f59e0b;              /* Amber 500 */
--warning-bg: #fef3c7;           /* Amber 100 */

/* Borders & Dividers */
--border-subtle: #e5e7eb;        /* Gray 200 */
--border-default: #d1d5db;       /* Gray 300 */
--border-focus: #6366f1;
```

#### Dark Theme
```css
/* Primary Brand (same) */
--brand-primary: #818cf8;        /* Indigo 400 - slightly lighter */
--brand-secondary: #a78bfa;      /* Violet 400 */
--brand-accent: #c084fc;         /* Purple 400 */

/* Backgrounds */
--bg-primary: #0a0e1a;
--bg-secondary: #111827;         /* Gray 900 */
--bg-tertiary: #1f2937;          /* Gray 800 */
--bg-glass: rgba(17, 24, 39, 0.8);

/* Text */
--text-primary: #f8fafc;         /* Slate 50 */
--text-secondary: #cbd5e1;       /* Slate 300 */
--text-muted: #94a3b8;           /* Slate 400 */

/* Semantic Colors */
--success: #34d399;              /* Green 400 */
--success-bg: rgba(16, 185, 129, 0.15);
--danger: #f87171;               /* Red 400 */
--danger-bg: rgba(239, 68, 68, 0.15);
--warning: #fbbf24;              /* Amber 400 */
--warning-bg: rgba(245, 158, 11, 0.15);

/* Borders & Dividers */
--border-subtle: rgba(255, 255, 255, 0.08);
--border-default: rgba(255, 255, 255, 0.12);
--border-focus: #818cf8;
```

### Typography

#### Font Family
```css
--font-primary: 'Tajawal', system-ui, -apple-system, sans-serif;
--font-mono: 'Courier New', monospace;
```

#### Font Sizes
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
```

#### Font Weights
```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

#### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
--leading-loose: 2;
```

### Spacing
```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
```

### Border Radius
```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

### Shadows
```css
/* Light Theme */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.15);
--shadow-glow: 0 0 20px rgba(99, 102, 241, 0.4);

/* Dark Theme */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.35);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.45);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 30px rgba(129, 140, 248, 0.5);
```

### Transitions
```css
--transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-normal: 300ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-slow: 500ms cubic-bezier(0.16, 1, 0.3, 1);
```

## Component Guidelines

### Buttons

#### Primary Button
- Background: gradient from `--brand-primary` to `--brand-secondary`
- Text: white
- Padding: 12px 24px (medium), 16px 32px (large)
- Border radius: `--radius-lg`
- Shadow: `--shadow-sm` with glow on hover
- Hover: lift effect (translateY -2px) + stronger glow
- Active: scale(0.98)

#### Secondary/Ghost Button
- Background: transparent / `--bg-glass`
- Text: `--text-primary`
- Border: 1px solid `--border-default`
- Same padding as primary
- Hover: background `--bg-tertiary`

#### Success Button
- Background: `--success`
- Text: white
- Use for positive CTAs (e.g., "Start Test")

### Cards
- Background: `--bg-secondary` (light) / `--bg-tertiary` (dark)
- Border: 1px solid `--border-subtle`
- Border radius: `--radius-2xl`
- Padding: 24px - 32px
- Shadow: `--shadow-md`
- Hover: lift effect + shadow increase
- Add subtle top border gradient for premium feel

### Form Elements

#### Input Fields
- Background: `--bg-primary`
- Border: 1.5px solid `--border-default`
- Border radius: `--radius-lg`
- Padding: 12px 16px
- Focus: border color changes to `--border-focus` with glow

#### Option Buttons (Quiz)
- Display as cards with radio indication
- Background: `--bg-glass`
- Border: 2px solid `--border-subtle`
- Selected state: border `--brand-primary`, background tinted
- Hover: subtle transform and glow

### Progress/Status Indicators

#### Progress Bar
- Height: 8px
- Background: `--bg-tertiary`
- Fill: gradient `--brand-primary` to `--brand-secondary`
- Border radius: `--radius-full`
- Animated shimmer effect on fill

#### Timer
- Monospace font
- Normal: `--text-primary`
- Warning (< 10s): `--danger` with pulse animation
- Display in badge format

#### Status Badges
- Correct: `--success` background, white text
- Wrong: `--danger` background, white text
- Unanswered: `--warning` background, dark text
- Border radius: `--radius-full`
- Padding: 4px 12px

## Layout Guidelines

### Container
- Max width: 1200px
- Padding: 24px (mobile), 40px (desktop)
- Centered horizontally

### Spacing System
- Use multiples of 4px (--space-* tokens)
- Component margins: 16px - 32px
- Section spacing: 48px - 80px
- Maintain consistent vertical rhythm

### Grid
- Feature cards: 3 columns on desktop, 1 on mobile
- Use CSS Grid with `auto-fit` for responsiveness

## Motion Guidelines

### Micro-interactions
- Button hover: 150ms ease-out
- Card entrance: staggered 100ms delays
- Option selection: immediate (<100ms)

### Page Transitions
- Fade + blur: 300-400ms
- Avoid jarring movements
- Maintain scroll position when appropriate

### Loading States
- Skeleton screens for content
- Pulse animation for loading elements
- Spinner only for API calls

## Accessibility

### Focus States
- Clearly visible focus ring (2px offset, `--border-focus`)
- Never remove focus styles

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text and UI elements
- Test both themes for WCAG AA compliance

### Motion
- Respect `prefers-reduced-motion`
- Provide non-animated alternatives

## Sound Design

### Countdown Audio
- Tick sound: subtle, short (50-100ms)
- Volume: 40% of max
- Format: MP3 or WebM
- Fallback: visual-only mode

### Controls
- Mute toggle in navbar
- Persist preference in localStorage
- Icon: 🔊 (unmuted) / 🔇 (muted)

## Theme Switching

### Implementation
- Toggle in navbar (sun/moon icon)
- Smooth transition: 200ms
- Save preference in localStorage
- Default: follow system preference (`prefers-color-scheme`)
- Class-based: `<html class="light">` or `<html class="dark">`

## Export Notes
All design tokens should be exported as:
- CSS custom properties (for web)
- JSON format (for tooling)
- TypeScript types (for type safety)
