# PrepAcademy UI Guidelines

## Quick Reference

This document provides practical guidelines for implementing the PrepAcademy design system consistently across all screens and components.

---

## Theme Implementation

### HTML Class Structure
```html
<!-- Light theme (default) -->
<html lang="ar" dir="rtl" class="light">
  <body>...</body>
</html>

<!-- Dark theme -->
<html lang="ar" dir="rtl" class="dark">
  <body>...</body>
</html>
```

### CSS Variables Usage
```css
/* Always use design tokens, never hardcoded values */
.button {
  background: var(--brand-primary);  /* ✓ Good */
  background: #6366f1;               /* ✗ Bad */
}
```

### Theme Toggle
```typescript
const toggleTheme = () => {
  const html = document.documentElement;
  const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.classList.remove(currentTheme);
  html.classList.add(newTheme);
  localStorage.setItem('theme', newTheme);
};
```

---

## Component Patterns

### Primary CTA Button
```html
<button class="btn btn-primary btn-lg btn-animate">
  <span>🚀</span>
  ابدأ الاختبار الآن
</button>
```

**Rules:**
- Always include icon/emoji for visual interest
- Use `btn-animate` for micro-interactions
- Large CTAs should use `btn-lg`
- Text should be action-oriented

### Question Card
```html
<div class="card card-body animate-fade-scale">
  <p class="question-text">ما هو عاصمة مصر العربية؟</p>
  <div class="options-grid">
    <!-- Options here -->
  </div>
</div>
```

**Rules:**
- One question per card
- Use semantic `question-text` class
- Options in grid layout for clarity
- Add entrance animation on mount

### Option Button
```html
<button class="option-btn hover-lift press-scale ${selected ? 'selected' : ''}">
  <span class="option-radio"></span>
  <span>القاهرة</span>
</button>
```

**Rules:**
- Always show radio indicator
- Selected state must be clearly visible
- Hover effects required
- Accessible focus states

### Status Badge
```html
<!-- Correct answer -->
<span class="detail-status correct">✓ صحيح</span>

<!-- Wrong answer -->
<span class="detail-status wrong">✗ خطأ</span>

<!-- Unanswered -->
<span class="detail-status unanswered">⊘ لم تُجب</span>
```

**Rules:**
- Use semantic status classes
- Include icon for quick recognition
- Maintain color contrast in both themes

---

## Layout Rules

### Page Structure
```html
<div class="page-transition-wrapper">
  <div class="container">
    <header class="navbar">...</header>
    <main>...</main>
    <footer class="footer">...</footer>
  </div>
</div>
```

**Rules:**
- Always wrap pages in `.page-transition-wrapper`
- Use `.container` for max-width constraint
- Navbar at top, footer at bottom
- Main content in semantic `<main>` tag

### Spacing Hierarchy
- **Micro spacing** (4-8px): Between related elements (icon + text)
- **Component spacing** (16-24px): Between form elements, list items
- **Section spacing** (48-80px): Between major page sections
- **Page margins** (24-40px): Container padding

### Grid Patterns
```css
/* Feature cards - auto-responsive */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-5);
}

/* Two-column layout */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .grid-2 {
    grid-template-columns: 1.2fr 0.8fr;
  }
}
```

---

## Animation Standards

### Entrance Animations
```css
/* Staggered cards */
.card.animate-slide-up { animation-delay: 0ms; }
.card.animate-slide-up.stagger-1 { animation-delay: 100ms; }
.card.animate-slide-up.stagger-2 { animation-delay: 200ms; }
.card.animate-slide-up.stagger-3 { animation-delay: 300ms; }
```

**Rules:**
- Use entrance animations only once (on mount)
- Stagger related elements by 100ms
- Never exceed 400ms total stagger time
- Respect `prefers-reduced-motion`

### Micro-interactions
```css
/* Button interaction */
.btn-animate:hover {
  transform: translateY(-2px);
  transition: var(--transition-fast);
}

.btn-animate:active {
  transform: translateY(0) scale(0.98);
}
```

**Rules:**
- Hover: subtle lift or scale (< 5%)
- Active: press-down effect
- Transition duration: 150-300ms
- Always use easing functions

### Loading States
**Option 1: Skeleton**
```html
<div class="skeleton" style="width: 100%; height: 60px;"></div>
```

**Option 2: Spinner** (for short waits)
```html
<div class="spinner"></div>
```

**Rules:**
- Use skeletons for initial page load
- Use spinners for API calls (< 3 seconds)
- Never show both simultaneously
- Provide visual feedback within 100ms

---

## Sound Design

### Countdown Audio Implementation
```typescript
const playCountdownTick = () => {
  if (isMuted) return;
  
  const audio = new Audio('/sounds/tick.mp3');
  audio.volume = 0.4; // 40% volume
  audio.play().catch(err => {
    console.warn('Audio playback failed:', err);
  });
};
```

**Files Required:**
- `public/sounds/tick.mp3` (100-150ms, subtle beep)
- `public/sounds/go.mp3` (200ms, positive chime)

**Rules:**
- Default: enabled but quiet (40% volume)
- Provide mute toggle in navbar
- Save preference to localStorage
- Never auto-play without user interaction
- Graceful degradation if audio fails

### Audio Toggle UI
```html
<button onclick="toggleMute()" aria-label="Toggle sound">
  <span id="sound-icon">
    {isMuted ? '🔇' : '🔊'}
  </span>
</button>
```

---

## Accessibility Checklist

### Keyboard Navigation
- ✓ All interactive elements are focusable
- ✓ Focus order follows visual layout (RTL)
- ✓ `Tab` / `Shift+Tab` for navigation
- ✓ `Enter` / `Space` activate buttons
- ✓ `Escape` closes modals/drawers

### ARIA Labels
```html
<!-- Timer -->
<div class="exam-timer" role="timer" aria-live="polite">
  <span aria-label="Time remaining">01:23</span>
</div>

<!-- Progress -->
<div role="progressbar" aria-valuenow="5" aria-valuemin="1" aria-valuemax="20">
  السؤال 5 من 20
</div>
```

### Color Contrast
- **Normal text**: minimum 4.5:1
- **Large text** (≥18px): minimum 3:1
- **UI elements**: minimum 3:1
- Test both themes with contrast checker

### Motion Sensitivity
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Breakpoints

```css
/* Mobile-first approach */

/* Small devices (phones) */
@media (min-width: 640px) { }

/* Medium devices (tablets) */
@media (min-width: 768px) { }

/* Large devices (laptops) */
@media (min-width: 1024px) { }

/* Extra large devices (desktops) */
@media (min-width: 1280px) { }
```

### Common Patterns
```css
/* Stack on mobile, row on desktop */
.hero-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .hero-actions {
    flex-direction: row;
    justify-content: center;
  }
}
```

---

## Performance Guidelines

### Critical CSS
Extract and inline critical CSS for above-the-fold content:
- Design tokens
- `.container`, `.navbar`, `.hero`
- Button base styles
- Font declarations

### Image Optimization
- Use WebP format with PNG/JPG fallback
- Provide `srcset` for responsive images
- Lazy load below-the-fold images
- Icons: use SVG or emoji (0 KB)

### Animation Performance
```css
/* GPU-accelerated properties only */
.animate {
  transform: translateY(0);  /* ✓ Good */
  opacity: 1;                /* ✓ Good */
  top: 0;                    /* ✗ Bad - causes reflow */
  background: red;           /* ✗ Bad - causes repaint */
}
```

---

## Common Mistakes to Avoid

### ✗ Don't
```css
/* Hardcoded colors */
.button { background: #6366f1; }

/* Fixed pixel values */
.card { margin: 20px; }

/* Inconsistent spacing */
.section-1 { margin-bottom: 25px; }
.section-2 { margin-bottom: 30px; }

/* Missing hover states */
.button { color: white; }
```

### ✓ Do
```css
/* Use design tokens */
.button { background: var(--brand-primary); }

/* Use spacing tokens */
.card { margin: var(--space-5); }

/* Consistent spacing */
.section { margin-bottom: var(--space-12); }

/* Complete interactive states */
.button {
  color: white;
  transition: var(--transition-fast);
}
.button:hover {
  transform: translateY(-2px);
}
.button:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}
```

---

## File Organization

```
/styles
  ├── globals.css          # Design tokens + base styles
  ├── components/
  │   ├── buttons.css      # All button variants
  │   ├── cards.css        # Card components
  │   ├── forms.css        # Inputs, options
  │   └── badges.css       # Status badges, labels
  ├── layouts/
  │   ├── container.css    # Container, grid
  │   └── navbar.css       # Navigation bar
  └── animations/
      ├── keyframes.css    # @keyframes definitions
      └── utilities.css    # .animate-* classes

/sounds
  ├── tick.mp3             # Countdown tick (100ms)
  └── go.mp3               # Ready/Go sound (200ms)
```

---

## Testing Checklist

Before deploying, verify:

**Visual**
- [ ] Design matches mockups in both themes
- [ ] All colors use design tokens
- [ ] Spacing is consistent throughout
- [ ] Typography hierarchy is clear

**Functional**
- [ ] Theme toggle works correctly
- [ ] Sound toggle saves preference
- [ ] All animations respect reduced-motion
- [ ] Form validation shows appropriate states

**Responsive**
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1440px width)
- [ ] No horizontal scrollbars

**Accessibility**
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Screen reader announces properly
- [ ] Color contrast passes WCAG AA

**Performance**
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] No layout shifts (CLS = 0)
- [ ] Smooth 60fps animations

---

## Quick Tips

1. **Always start with light theme**, then adapt to dark
2. **Mobile-first CSS** - easier to scale up than down
3. **Test with real content** - lorem ipsum hides issues
4. **Consistent hover states** - every clickable element needs one
5. **Subtle is better** - less animation > too much animation
6. **Accessibility first** - it's not optional

---

## Support

For questions or clarifications, refer to:
- `design-system.md` - Complete token reference
- Generated mockups - Visual examples
- Code examples in `components/` - Implementation patterns
