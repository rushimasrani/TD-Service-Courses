# Production Migration Plan: Move TechDefends Training Section to academy.techdefends.com (AWS EC2 + GoDaddy)

Implement the application-side architecture, cross-domain routing, server configuration, and GoDaddy DNS deployment guide required to migrate the complete Training section to `https://academy.techdefends.com` on the verified AWS EC2 (Ubuntu) infrastructure.

---

### Verified Architecture & Hosting Stack

- **Code Development:** Google AI Studio (Vite + React 18 SPA + TypeScript)
- **Source Repository:** GitHub (`TD-Service-Courses`, `main` branch)
- **Production Server:** AWS EC2 Instance running Ubuntu Linux
- **Web Server & Reverse Proxy:** Nginx (listening on ports 80 & 443 with Certbot/Let's Encrypt SSL)
- **Application Process:** Node.js Express server (`node dist/server.cjs` on port 3000, managed via PM2 or systemd)
- **Domain & DNS Registrar:** GoDaddy (`techdefends.com`)

---

### Architecture & Domain Division

```
                                  [ GoDaddy DNS ]
                     ┌───────────────────┴───────────────────┐
                     ▼                                       ▼
             techdefends.com                     academy.techdefends.com
           (Apex @ / www CNAME)                     (Subdomain CNAME / A)
                     │                                       │
                     └───────────────────┬───────────────────┘
                                         ▼
                      [ AWS EC2 Public / Elastic IP (Ubuntu) ]
                                         │
                         [ Nginx (Ports 80 & 443 / SSL) ]
                        • academy.techdefends.com block
                        • techdefends.com block
                        • proxy_pass http://127.0.0.1:3000
                                         │
                                         ▼
                 [ Node.js / Express Backend (Port 3000) ]
        ┌────────────────────────────────┬────────────────────────────────┐
        ▼                                ▼                                ▼
[ TechDefends Main Site ]    [ TechDefends Academy Hub ]      [ Shared API & Services ]
• Home, About, Contact       • Root (/) -> Training Hub       • /api/internship-application
• Services (VAPT, SOC...)    • Courses & Career Courses       • MS Graph Email Workflow
• Industries & Case Studies  • Internship Application Form    • Rate Limiting & Validation
• Trainings Dropdown:        • Header: TechDefends Academy    • CORS for both origins
  -> links to Academy        • Link back to Main Corporate
```

---

### Phase 1: Centralized Domain & Navigation Helper (`utils/domain.ts`)

Create a centralized, environment-aware utility to manage links between `techdefends.com` and `academy.techdefends.com` without scattering hardcoded domain strings across components.

1. **Environment Detection:**
   - **Local & Preview Environments** (`localhost`, `127.0.0.1`, `*.run.app`, `ais-dev-...`, `ais-pre-...`):
     - Return relative paths (`/courses/...`, `/trainings/...`, `/`) so preview iframe navigation remains 100% interactive and intact within the sandbox.
   - **Production Environment** (`techdefends.com` / `academy.techdefends.com`):
     - Resolve absolute cross-domain URLs:
       - Main site links $\rightarrow$ `https://techdefends.com`
       - Academy links $\rightarrow$ `https://academy.techdefends.com`
   - Configurable via environment variables: `VITE_MAIN_DOMAIN` (default `https://techdefends.com`) and `VITE_ACADEMY_DOMAIN` (default `https://academy.techdefends.com`).
2. **Helper Functions:**
   - `isAcademyDomain()`: Returns `true` if current browser hostname is `academy.techdefends.com`.
   - `getAcademyUrl(path)`: Returns the appropriate URL (relative in dev, `https://academy.techdefends.com${path}` in prod).
   - `getMainSiteUrl(path)`: Returns the appropriate URL (relative in dev, `https://techdefends.com${path}` in prod).
   - `<CrossDomainLink>`: A drop-in navigation component that renders React Router `<Link>` for same-domain transitions and standard `<a href="...">` for cross-domain jumps.

---

### Phase 2: Academy Subdomain Landing & Routing (`App.tsx`)

1. **Subdomain-Aware Route Resolution:**
   - Detect whether the active host is the Academy domain.
   - **When on `academy.techdefends.com`:**
     - `/` (Subdomain Root) renders the full **Training Hub Catalog** (`<Trainings />`), featuring Short-Term Courses, Career Master Programs, and program overviews.
     - `/courses/:slug` renders individual Course Detail pages.
     - `/trainings/internship` (and `/internship`) renders the full Internship Application form.
     - `/trainings` and `/courses` cleanly render the Training Hub without broken links or unnecessary redirects.
   - **When on `techdefends.com` (Main Site):**
     - `/` renders the Corporate Home page.
     - Services, Industries, Case Studies, About, Contact, Careers, and Privacy Policy routes remain active.
2. **Branding & Top Bar Context:**
   - On the Academy subdomain, update the Header brand text to display **TechDefends Academy** alongside the official metallic logo, and provide a prominent "Main Website" link returning to `https://techdefends.com`.

---

### Phase 3: Header (`Navbar.tsx`) & Footer (`Footer.tsx`) Navigation Updates

1. **Main Website Navigation:**
   - Every item in the **Trainings dropdown** (both desktop mega-menu and mobile drawer):
     - Short-term Courses (`/courses/aws-solution-architect`, etc.)
     - Career Programs (`/courses/devops-master-program`, etc.)
     - Internship Application (`/trainings/internship`)
     - View All Programs (`/trainings` $\rightarrow$ Academy root)
     - Uses `getAcademyUrl(...)` so users transition smoothly to the Academy domain in production.
2. **Academy Navigation:**
   - Logo / Brand title links to Academy home (`/`).
   - Corporate navigation links ("Home / Main Site", "Services", "Industries", "Contact", "Careers") link to `https://techdefends.com` via `getMainSiteUrl(...)`.
   - Training links ("Courses", "Career Programs", "Internship") use native React Router SPA links within the Academy domain for instant client-side transitions.
3. **Course Cards & Detail CTAs:**
   - Internal training links in `Trainings.tsx`, `CourseDetail.tsx`, and `InternshipApplication.tsx` stay within the Academy domain without full page reloads.

---

### Phase 4: Backend API, CORS & Email Submission (`server.ts`)

1. **CORS Configuration:**
   - Configure Express CORS middleware to accept requests from:
     - `https://techdefends.com`
     - `https://www.techdefends.com`
     - `https://academy.techdefends.com`
     - Localhost and development origins.
2. **Preserve Internship Application Flow:**
   - Ensure `/api/internship-application` endpoint works seamlessly when invoked from `academy.techdefends.com`.
   - Retain date validation (Kolkata timezone), required field checks, rate limiting, and Microsoft Graph API email delivery to `pavan@techdefends.com`.
3. **Controlled 301 Migration Redirects (Flag-Gated):**
   - Implement flag-gated redirect in `server.ts`:
     - Gated behind `ENABLE_ACADEMY_REDIRECTS=true` (default `false`).
     - When enabled and request host is `techdefends.com`, requests to `/courses/*` and `/trainings/*` return HTTP 301 to `https://academy.techdefends.com$request_uri`.
     - Remains disabled until DNS and SSL certificates are active on EC2.

---

### Phase 5: AWS EC2 (Ubuntu) & GoDaddy DNS Configuration Guide

#### 1. GoDaddy DNS Configuration (Domain Administrator)
- Navigate to **GoDaddy DNS Management** for `techdefends.com`.
- **Add Subdomain Record:**
  - **Type:** `CNAME`
  - **Name:** `academy`
  - **Value:** `@` (or `techdefends.com`)
  - **TTL:** 1 Hour (or Default)
  *(Alternatively, if an AWS Elastic IP `A` record is preferred: Type: `A`, Name: `academy`, Value: `<EC2-Elastic-IP>`)*
- **CRITICAL:** Do **not** modify or delete existing `@` (apex), `www`, MX, or TXT (SPF/DMARC) records.

#### 2. Nginx Server Configuration on AWS EC2 (`/etc/nginx/sites-available/techdefends`)
Update the Nginx configuration to recognize `academy.techdefends.com`:

```nginx
# Configuration on AWS EC2 (/etc/nginx/sites-available/techdefends)
server {
    listen 80;
    server_name techdefends.com www.techdefends.com academy.techdefends.com;

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 3. Let's Encrypt / Certbot SSL Certificate Command
Run on the EC2 Ubuntu terminal to expand the SSL certificate to cover the new subdomain:
```bash
sudo certbot --nginx -d techdefends.com -d www.techdefends.com -d academy.techdefends.com
```

---

### Verification & Testing Plan

1. **Code & Build Verification:** Run `compile_applet` to ensure zero compilation or bundle errors.
2. **URL Utility Testing:** Unit test `utils/domain.ts` across dev preview (`ais-dev-...` / `localhost`) and production hostnames (`techdefends.com` / `academy.techdefends.com`).
3. **Cross-Domain Navigation:** Verify desktop mega-menu and mobile drawer links.
4. **Academy Landing Page:** Verify root `/` on Academy renders the training catalog, `/courses/:slug` renders course details, and `/trainings/internship` renders the application form.
5. **Backend API & Form Functionality:** Verify `/api/internship-application` accepts submissions and CORS headers allow both domains.
