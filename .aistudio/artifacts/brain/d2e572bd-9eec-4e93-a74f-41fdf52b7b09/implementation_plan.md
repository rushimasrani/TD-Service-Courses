# Update TechDefends Website Footer: Contact Information & Social Media Links

Targeted update of the TechDefends website footer to update office contact information and social media links according to official specifications.

---

### User Review & Decisions

> [!NOTE]
> - **Centralized Contact Information**: Update `constants.ts` (`COMPANY_ADDRESS` and `COMPANY_PHONE`) so the new address and telephone number are synchronized across the footer, Contact page, WhatsApp button, and Chat Widget.
> - **Clickable Phone Link**: Ensure phone number in the footer is rendered with a functional `tel:` link (`tel:+919429405607`) for direct mobile calling.
> - **Social Media Platforms**:
>   1. **LinkedIn**: `https://www.linkedin.com/company/techdefends/`
>   2. **X (Twitter)**: `https://x.com/techdefends`
>   3. **YouTube**: `https://youtube.com/@techdefendsacademy?si=-WX23BF05pyRxoAf`
>   4. **Instagram**: `https://www.instagram.com/techdefends?vrfl=cTU3bDU5NG95ZHc4`
> - **Removal**: Completely remove the Facebook icon.
> - **Attributes**: Add `target="_blank"`, `rel="noopener noreferrer"`, and screen-reader `aria-label` attributes for accessibility.
> - **Styling**: Preserve the circular icon buttons, dark slate background, sizing, spacing, and hover animations.

---

### 1. File Modifications

#### A. Central Contact Constants (`constants.ts`)
- Update `COMPANY_ADDRESS`:
  `E-202, PNTC, Times of India Press Road, Vejalpur, Ahmedabad, Gujarat 380051`
- Update `COMPANY_PHONE`:
  `+91 94294 05607`
- Keep `COMPANY_EMAIL`:
  `info@techdefends.com` (unchanged)

#### B. Footer Component (`components/Footer.tsx`)
- Import `Youtube` from `lucide-react` (remove `Facebook`).
- Render official brand icons:
  - LinkedIn (`<Linkedin size={18} />`)
  - X (official vector SVG brand logo, size 18)
  - YouTube (`<Youtube size={18} />`)
  - Instagram (`<Instagram size={18} />`)
- Update each `<a>` tag with official URLs, `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label`.
- Make phone number clickable:
  `<a href="tel:+919429405607" className="text-slate-400 hover:text-brand-500 text-sm transition-colors">{COMPANY_PHONE}</a>`
- Make email address clickable:
  `<a href="mailto:info@techdefends.com" className="text-slate-400 hover:text-brand-500 text-sm transition-colors">{COMPANY_EMAIL}</a>`

---

### 2. Verification Plan

1. Verify `constants.ts` contains the updated address and phone number.
2. Verify `components/Footer.tsx` renders the new office address.
3. Verify the phone number displays `+91 94294 05607` and links to `tel:+919429405607`.
4. Verify the email address remains `info@techdefends.com`.
5. Verify the 4 social links in exact order (LinkedIn, X, YouTube, Instagram) with correct URLs, `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label`.
6. Verify Facebook icon is completely removed.
7. Run `compile_applet` to verify compilation with zero errors.
