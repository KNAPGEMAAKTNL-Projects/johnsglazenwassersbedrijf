# Design Reference - John's Glazenwassersbedrijf

## Colors

### CSS Custom Properties

```css
@theme {
  --color-primary: #0EA5E9;       /* Sky Blue 500 */
  --color-primary-dark: #0284C7;  /* Sky Blue 600 */
  --color-accent: #FACC15;        /* Yellow 400 */
  --color-accent-dark: #EAB308;   /* Yellow 500 */
  --color-navy: #0F172A;          /* Slate 900 */
  --color-navy-light: #1E293B;    /* Slate 800 */
  --font-heading: 'Outfit', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
}
```

### Color Usage

| Role             | Value       | Tailwind Class     | Usage                                    |
| ---------------- | ----------- | ------------------ | ---------------------------------------- |
| Primary          | `#0EA5E9`   | `bg-primary`       | Buttons, links, hero background, icons   |
| Primary Dark     | `#0284C7`   | `bg-primary-dark`  | Hover states, gradients                  |
| Accent           | `#FACC15`   | `bg-accent`        | Highlights, badges, secondary CTAs       |
| Accent Dark      | `#EAB308`   | `bg-accent-dark`   | Hover states                             |
| Navy             | `#0F172A`   | `bg-navy`          | Headings, footer, dark backgrounds       |
| Navy Light       | `#1E293B`   | `bg-navy-light`    | Layered dark backgrounds                 |
| White            | `#FFFFFF`   | `bg-white`         | Main backgrounds, card backgrounds       |
| Light Gray       | `#F9FAFB`   | `bg-gray-50`       | Alternating section backgrounds          |
| Border Gray      | `#E5E7EB`   | `border-gray-200`  | Card borders, form borders               |
| Body Text        | `#4B5563`   | `text-gray-600`    | Paragraph text                           |
| Secondary Text   | `#6B7280`   | `text-gray-500`    | Captions, helper text                    |
| Success          | `#10B981`   | `text-emerald-500` | Checkmarks, confirmations                |

### Gradients

- Hero overlay: `bg-gradient-to-r from-primary-dark/90 to-primary/70`

---

## Typography

### Font Families

- **Headings**: `Outfit` (variable: `--font-heading`) -- weights 600, 700, 800
- **Body**: `Inter` (variable: `--font-body`) -- weights 400, 600, 700

### Scale

| Element      | Size               | Weight     | Class                                 |
| ------------ | ------------------ | ---------- | ------------------------------------- |
| H1           | 48-60px            | 800        | `text-5xl md:text-6xl font-extrabold` |
| H2           | 30-36px            | 700        | `text-3xl md:text-4xl font-bold`      |
| H3           | 20-24px            | 700        | `text-xl md:text-2xl font-bold`       |
| Body Large   | 20px               | 400        | `text-xl`                             |
| Body         | 18px               | 400        | `text-lg`                             |
| Body Small   | 16px               | 400        | `text-base`                           |
| Caption      | 14px               | 400        | `text-sm`                             |
| Label        | 14px               | 600-700    | `text-sm font-semibold uppercase`     |

### Line Height

- Headings: `leading-tight`
- Body: `leading-relaxed`

### Special Text

- Section labels: `uppercase tracking-wide text-sm font-semibold text-accent`
- Hero text shadow: `text-shadow: 0 4px 12px rgba(0,0,0,0.15)`

---

## Spacing

### Section Padding

- Mobile: `py-16 px-4` (64px vertical)
- Desktop: `py-20 px-4` or `py-24 px-4` (80-96px vertical)
- Hero: `pt-32 pb-20 md:pt-48 md:pb-28`

### Component Gaps

| Context           | Gap     |
| ----------------- | ------- |
| Icon + text       | `gap-2` |
| Inline elements   | `gap-3` |
| Card content      | `gap-4` |
| Grid items        | `gap-6` to `gap-8` |
| Sections          | `gap-12` |

### Container

- `container mx-auto px-4`
- Narrow content: `max-w-3xl` or `max-w-4xl`

---

## Layout

### Grid Patterns

| Columns | Classes                                   | Usage                |
| ------- | ----------------------------------------- | -------------------- |
| 2       | `grid-cols-1 md:grid-cols-2`              | Content + image      |
| 3       | `grid-cols-1 md:grid-cols-3`              | Service cards        |
| 4       | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | Feature grid      |
| 5       | `grid-cols-1 md:grid-cols-2 lg:grid-cols-5` | Footer columns    |

### Breakpoints (Tailwind defaults)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Z-Index

- Header: `z-50`
- Wave separator: `z-20`
- Step indicators: `z-10`

---

## Components

### Buttons

| Variant   | Classes                                                                  |
| --------- | ------------------------------------------------------------------------ |
| Primary   | `bg-primary text-white py-3 px-6 rounded-xl shadow-lg hover:bg-primary-dark hover:scale-105 hover:shadow-2xl transition-all` |
| Accent    | `bg-accent text-navy py-3 px-6 rounded-xl shadow-lg hover:bg-accent-dark hover:scale-105 transition-all` |
| Ghost     | `bg-white/10 backdrop-blur-md border border-white/30 text-white py-3 px-6 rounded-xl hover:bg-white/20 transition-all` |
| Text Link | `text-primary hover:underline transition-colors`                         |

### Cards

```
bg-white border border-gray-100 rounded-2xl shadow-sm p-6
hover:shadow-xl hover:-translate-y-2 transition-all duration-300
```

- Service cards: image top (`h-48 overflow-hidden`), icon badge (`absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg`)
- Review cards: `bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md`

### Badges

```
bg-sky-100 text-sky-800 px-4 py-2 rounded-full text-sm font-semibold
```

Variants: `bg-green-50 text-green-800`, `bg-blue-50 text-blue-800`, `bg-white/10 text-white border border-white/20`

### Forms

- Input: `border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent`
- Selected state: `border-primary bg-blue-50`
- Disabled: `opacity-50 cursor-not-allowed`

### Header

- Top bar: `bg-navy text-white text-xs py-2`
- Nav bar: `fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm`
- Logo: `font-heading font-extrabold text-navy text-xl md:text-2xl`

### Footer

- Background: `bg-navy text-white pt-16 pb-8`
- Links: `text-gray-300 hover:text-white transition-colors`
- Headings: `text-accent font-heading font-semibold`
- Divider: `border-t border-gray-800`

---

## Borders & Shadows

### Border Radius

| Size   | Class          | Value  | Usage                       |
| ------ | -------------- | ------ | --------------------------- |
| Small  | `rounded-lg`   | 8px    | Inputs, small elements      |
| Medium | `rounded-xl`   | 12px   | Buttons                     |
| Large  | `rounded-2xl`  | 16px   | Cards, images               |
| Full   | `rounded-full`  | 9999px | Badges, avatars, icons      |

### Shadows

| Size    | Class        | Usage                    |
| ------- | ------------ | ------------------------ |
| Small   | `shadow-sm`  | Header, subtle cards     |
| Medium  | `shadow-md`  | Buttons                  |
| Large   | `shadow-lg`  | Prominent buttons        |
| XL      | `shadow-xl`  | Cards on hover, images   |
| 2XL     | `shadow-2xl` | Prominent hover states   |

### Borders

- Cards: `border border-gray-100`
- Forms: `border-2 border-gray-200`
- Active/selected: `border-2 border-primary`
- Decorative: `border-4 border-white/20` (on images)
- Left accent: `border-l-4 border-primary`

---

## Animations & Effects

### Hover Transitions

- Default: `transition-all duration-300`
- Color only: `transition-colors`
- Transform only: `transition-transform`

### Hover Transforms

- Scale up: `hover:scale-105` (buttons, cards)
- Image zoom: `group-hover:scale-110`
- Lift: `hover:-translate-y-2` (cards), `hover:-translate-y-0.5` (buttons)

### Glass Effects

- Header: `bg-white/95 backdrop-blur-sm`
- Ghost button: `bg-white/10 backdrop-blur-md`

### Wave Separator

- SVG between hero and content
- Responsive height: `h-[40px] md:h-[60px] lg:h-[80px]`
- Fill: `#f9fafb` (gray-50)

---

## Icons

- **Library**: Lucide (`@lucide/astro`)
- **Sizes**: `w-4 h-4` (inline), `w-5 h-5` (standard), `w-6 h-6` (medium), `w-8 h-8` / `w-12 h-12` (feature)
- **Colors**: `text-primary`, `text-accent`, `text-white`, `text-gray-400`, `text-green-500`
- **Common icons**: Phone, Mail, MessageCircle, MapPin, Star, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Zap, Droplets, Sun, Menu, X

---

## Images

- Format: WebP (via Astro Image optimization)
- Border radius: `rounded-2xl`
- Border: `border-4 border-white/20`
- Shadow: `shadow-xl` or `shadow-2xl`
- Loading: `loading="lazy"` (below fold), `loading="eager"` (hero)
- Fit: `object-cover`

---

## Tech Stack

- **Framework**: Astro 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide
- **Animations**: Framer Motion
- **Hosting**: Cloudflare Pages
- **Image optimization**: Sharp + Astro Image
