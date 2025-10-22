# Design Guidelines: College Complaint Registration System

## Design Approach
**Hybrid System-Based Approach**: Material Design principles combined with open-source platform aesthetics (GitHub, GitLab, Linear). This balances modern usability with the collaborative, transparent feel of open-source communities.

**Key Design Principles:**
- Transparency and accessibility (open-source ethos)
- Efficiency-first with delightful micro-interactions
- Clear information hierarchy for complaint tracking
- Professional yet approachable interface

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 217 91% 60% (Trust blue - inspired by GitHub's blue)
- Background: 0 0% 100% (Pure white)
- Surface: 210 20% 98% (Subtle gray surface)
- Text Primary: 222 47% 11% (Deep charcoal)
- Text Secondary: 215 16% 47% (Muted gray)
- Success: 142 71% 45% (Resolved status)
- Warning: 38 92% 50% (Pending status)
- Border: 214 32% 91% (Subtle borders)

**Dark Mode:**
- Primary: 217 91% 65%
- Background: 222 47% 11%
- Surface: 217 19% 18%
- Text Primary: 210 20% 98%
- Text Secondary: 215 16% 65%
- Success: 142 71% 55%
- Warning: 38 92% 60%
- Border: 217 19% 27%

### B. Typography

**Font Stack:**
- Primary: 'Inter' via Google Fonts (system-ui fallback)
- Monospace: 'JetBrains Mono' for complaint IDs and technical fields

**Type Scale:**
- Hero/Page Title: text-4xl font-bold (36px)
- Section Headings: text-2xl font-semibold (24px)
- Card Titles: text-lg font-medium (18px)
- Body: text-base (16px)
- Small/Meta: text-sm (14px)
- Captions: text-xs (12px)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing: gap-2, p-2
- Standard spacing: p-4, gap-4, m-6
- Section spacing: py-8, py-12
- Large spacing: py-16

**Grid System:**
- Max container width: max-w-7xl
- Form containers: max-w-2xl
- Complaint cards: grid with grid-cols-1 lg:grid-cols-2 gap-6

### D. Component Library

**1. Complaint Submission Form**
- Large card container with shadow-lg and rounded-xl
- Floating label inputs with smooth transitions
- Input groups with proper spacing (space-y-6)
- Department dropdown with search functionality
- Multi-line textarea for description (min-h-32)
- Primary submit button: Large, full-width on mobile, fixed-width on desktop
- Form validation states with color-coded borders
- Success animation on submission (scale + fade)

**2. Complaint Cards/List**
- Card-based layout with hover elevation effect (hover:shadow-xl transition)
- Header section: Complaint ID (monospace) + Timestamp + Status badge
- Body: Issue title (font-semibold), Department tag, Description preview
- Footer: Student name, action buttons for admins
- Status badges: Pill-shaped with icon, color-coded (success/warning)
- Skeleton loading states for data fetch

**3. Navigation**
- Clean horizontal navbar with logo/title left, navigation center, user actions right
- Sticky positioning (sticky top-0 z-50)
- Backdrop blur effect (backdrop-blur-md)
- Mobile: Hamburger menu with slide-in drawer

**4. Admin Controls**
- Floating action buttons or dropdown menus on complaint cards
- Confirmation modals with backdrop blur
- Toggle switches for status updates
- Permission-based visibility

**5. Status Indicators**
- Pending: Amber/yellow badge with clock icon
- Resolved: Green badge with checkmark icon
- Pill shape with px-3 py-1, rounded-full
- Icons from Heroicons (use CDN)

**6. Data Display**
- Table view option with sortable columns
- Filter chips for departments and status
- Search bar with magnifying glass icon
- Pagination or infinite scroll for large datasets

### E. Animations

**Strategic Use (Minimal but Impactful):**
- Form input focus: Border color transition (duration-200)
- Button interactions: Scale on active state (active:scale-95)
- Card hover: Subtle lift effect (transform transition-all duration-300)
- Form submission: Success checkmark animation (scale + rotate)
- Page transitions: Fade in content (opacity-0 to opacity-100)
- Status badge updates: Pulse effect on change
- Loading states: Skeleton shimmer or subtle spinner

**Avoid:** Excessive scroll animations, distracting background effects

---

## Page-Specific Guidelines

**Landing/Home Page:**
- Hero section (60vh): Large heading "Student Complaint Portal", subheading explaining the system, primary CTA "Submit Complaint"
- Background: Subtle gradient or geometric pattern in brand colors
- Quick stats section: Total complaints, resolved count, pending count (3-column grid)
- Recent complaints preview (3-4 cards)
- CTA section: Encourage submission with reassurance about anonymity/action

**Complaint Form Page:**
- Centered form card on clean background
- Progress indicator if multi-step
- Real-time validation feedback
- Character count for description field
- Department icons next to each option

**Dashboard/All Complaints Page:**
- Filter bar at top: Department filter, Status filter, Search
- View toggle: Card view / Table view
- Complaint cards in responsive grid
- Empty state with illustration if no complaints

**Admin Panel:**
- Distinct color accent to indicate admin mode
- Batch action controls
- Analytics cards showing resolution rates
- Priority sorting options

---

## Images

**Hero Section Image:**
- Large hero image: YES
- Type: Abstract illustration of students/college campus or collaborative/communication theme
- Placement: Right side of hero section (2-column layout on desktop)
- Style: Modern, flat illustration with brand color palette
- Fallback: Geometric pattern background if no suitable image

**Additional Images:**
- Empty state illustrations for "no complaints" view
- Success confirmation graphic after submission
- Optional: Small icons for each department category

---

## Accessibility & Responsiveness

- Form inputs with proper labels and aria-attributes
- Color contrast ratios meeting WCAG AA standards
- Keyboard navigation for all interactive elements
- Mobile-first responsive design
- Touch-friendly targets (min 44x44px)
- Dark mode toggle with consistent implementation across all inputs and surfaces