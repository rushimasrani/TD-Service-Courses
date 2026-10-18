# Integrate Official TechDefends Logo into Header and Footer

Integrate the official TechDefends logo—featuring the metallic black-and-red shield, circuit traces, and TD monogram—into the website Header (Navbar) and Footer, ensuring it is always presented against a crisp white background across all navbar states and the dark footer.

---

### Provided Logo Asset

![Official TechDefends Logo](Gemini_Generated_Image_q9t2hjq9t2hjq9t2.png)

*Official TechDefends metallic shield emblem with brushed black & red TD monogram and circuit board traces on a white background.*

---

### Proposed Changes

#### 1. Asset Preparation & Storage (`public/assets/techdefends-logo.png`)
- Store the official TechDefends logo asset in `public/assets/techdefends-logo.png` (and ensure high-resolution SVG/PNG representations are available).
- Crop excessive whitespace around the shield so the metallic emblem and TD monogram remain sharp and legible even at navbar dimensions.
- Preserve the authentic metallic brushed textures, black-and-ruby-red coloration, and white circuit-trace backdrop.

#### 2. Shared Logo Component (`components/Logo.tsx`)
- Update `components/Logo.tsx` to render the official TechDefends logo image asset:
  - Add `alt="TechDefends Logo"` for accessibility.
  - Accept `size`, `className`, and optional `variant` props.
  - Include an explicit aspect ratio and clean white container styling where needed to prevent layout shifts.

#### 3. Header / Navbar Integration (`components/Navbar.tsx`)
- Update the brand link in the desktop and mobile navbar:
  - **Transparent Navbar State (Dark Hero)**: Place the logo inside a compact, elegant white container (`bg-white p-1 rounded-xl shadow-sm border border-slate-100/30 ring-1 ring-black/5`) so the metallic shield is immediately legible from the first render without scrolling.
  - **Scrolled / Solid White Navbar State**: Seamlessly blend the logo container with the white navbar background.
  - **Preserved Structure**: Maintain the 64px (`h-16`) navbar height, brand wordmark (`TechDefends`), tagline (`Secure Today, Scale Tomorrow`), navigation links, dropdowns, and mobile menu without any layout shift.

#### 4. Footer Integration (`components/Footer.tsx`)
- In the existing dark footer (`bg-slate-900`):
  - Place the official logo in a dedicated, well-proportioned white panel/container (`bg-white p-2 rounded-xl shadow-md border border-slate-700/50 inline-flex items-center justify-center`).
  - Maintain the existing brand text, typography, Contact Info, social links (LinkedIn, X, YouTube, Instagram), and 5-column layout.
  - Prevent any awkward sizing or overflow.

---

### Verification Plan

1. **Asset Verification**: Ensure `public/assets/techdefends-logo.png` exists, is optimized, and loads with HTTP 200.
2. **Navbar States**:
   - Initial render on Home (dark hero) $\rightarrow$ Logo is enclosed in clean white container and clearly visible.
   - Initial render on light pages (e.g. `/trainings`, `/trainings/internship`, `/courses`) $\rightarrow$ Logo blends naturally with white navbar.
   - Scrolled state $\rightarrow$ Logo remains crisp with stable layout.
3. **Footer**:
   - Logo renders inside white container against dark slate footer.
   - Layout, contact info, and social links remain perfectly aligned.
4. **Mobile & Tablet**:
   - Verify mobile navbar and drawer layout (375px viewport).
5. **Compilation & Build**:
   - Run `compile_applet` to ensure zero build or runtime errors.
