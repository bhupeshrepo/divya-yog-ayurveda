# Divya Yog Ayurvedic Chikitsalaya — Website

Single-page, bilingual (English / हिंदी) marketing site for **Divya Yog Ayurvedic Chikitsalaya, Rohtak**.
Built as a static site — no build step, no server — so it hosts free on **GitHub Pages** and connects to a **GoDaddy** domain.

Focus: **Paralysis / Lakwa recovery support** and **Migraine / recurrent headache care**.
Leads arrive via an **email form** and **WhatsApp / call**.

---

## 1. Files

```
index.html            # the whole site (bilingual content inline)
assets/css/styles.css # styles
assets/js/main.js      # language toggle, mobile nav, form, animations
favicon.svg           # tab icon
assets/img/           # brand images:
  profile-picture.png #   512x512 — Gmail / Google / WhatsApp profile pic
  logo-horizontal.png #   transparent logo (letterhead, docs, WhatsApp)
  og-cover.png        #   1200x630 — link preview (WhatsApp/Facebook share)
  gbp-cover.png       #   1280x720 — Google Business Profile cover
GOOGLE-BUSINESS-PROFILE.md  # full Google Business setup pack (copy-paste ready)
robots.txt            # SEO
sitemap.xml           # SEO
.nojekyll             # tells GitHub Pages to serve files as-is
CNAME                 # your custom domain (create in step 4)
```

---

## 2. Preview locally

Just open `index.html` in a browser. (Optional local server:)

```bash
npx serve .
# or
python -m http.server 8080
```

---

## 3. Make the email form work (5 minutes)

The form uses **[Web3Forms](https://web3forms.com)** — free, no backend, sends leads straight to an email inbox.

1. Go to https://web3forms.com → enter the clinic's lead inbox **`divyayogayurveda379@gmail.com`** → you get an **Access Key** by email.
2. Open `index.html`, find:
   ```html
   <input type="hidden" name="access_key" value="REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY" />
   ```
   Replace the value with your key.
3. Done. Submissions now email the clinic.

> **Until a key is added, the form auto-falls back to WhatsApp** — it opens WhatsApp with the filled details prewritten, so no lead is lost. Call and WhatsApp buttons already work with no setup.

**Number wired in:** Call/WhatsApp `+91 8814853189`. Leads email to `divyayogayurveda379@gmail.com`.

---

## 4. Add the Vaidya intro video (YouTube)

A face-to-camera video of Vaidya ji (intro, family lineage, experience, approach) sits in the **About Vaidya** section — the biggest trust-builder for cold ad traffic.

1. Upload the video to a **YouTube** channel (set to **Public** or **Unlisted**).
2. Copy the **video ID** — the part after `watch?v=` or `youtu.be/` (e.g. `dQw4w9WgXcQ`).
3. In `index.html`, find:
   ```html
   <div class="video-facade" id="vaidyaVideo" data-video-id="" ...>
   ```
   Put the ID inside the quotes: `data-video-id="dQw4w9WgXcQ"`.
4. Commit & push. The section now shows a clean poster with a Play button; YouTube only loads when a visitor clicks (keeps the page fast).

> Keep the video ad-safe too: say "recovery support / care / we have helped many patients" — **not** "100% cure / guaranteed / permanent" (Meta & Google can review the landing video, and India's Drugs & Magic Remedies Act covers paralysis claims). Record primarily in **Hindi** for the Rohtak audience.

---

## 5. Host on GitHub Pages

1. Create a **free GitHub account** (if needed) and a **new repository** — e.g. `divya-yog-website` (public).
2. Push this folder:
   ```bash
   git init
   git add .
   git commit -m "Divya Yog website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/divya-yog-website.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `main` / `root` → Save.**
4. In a minute the site is live at `https://<your-username>.github.io/divya-yog-website/`.

---

## 6. Connect your GoDaddy domain

Decide your domain, e.g. `divyayogrohtak.com` (buy on GoDaddy if you haven't).

### a) Tell GitHub the domain
- **Settings → Pages → Custom domain →** enter `www.divyayogrohtak.com` → Save.
  (This creates/updates the `CNAME` file automatically. Tick **Enforce HTTPS** once available.)

### b) Set DNS in GoDaddy
GoDaddy → **My Products → DNS** for your domain → add these records:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| CNAME | www  | `<your-username>.github.io` |
| A     | @    | 185.199.108.153          |
| A     | @    | 185.199.109.153          |
| A     | @    | 185.199.110.153          |
| A     | @    | 185.199.111.153          |

(The four A records point the naked domain `divyayogrohtak.com` at GitHub Pages; the CNAME points `www`.)

DNS can take 10 minutes to a few hours. Then `https://www.divyayogrohtak.com` shows the site.

### c) Update the domain in the code
The site currently uses `www.divyayogrohtak.com` in the SEO tags. **If your real domain differs**, search-replace `www.divyayogrohtak.com` in `index.html`, `robots.txt`, and `sitemap.xml` with your domain, then commit & push.

---

## 7. Run ads (the goal)

- **Google Ads** → point the Final URL to your domain. Approved-style headlines and descriptions are in `website-context.txt` (use "Care" / "Consultation", avoid "cure/guaranteed/treatment").
- **Meta Ads** → don't imply the viewer personally has a condition. Approved primary-text options are in `website-context.txt`.
- Consider adding a **Google Business Profile** (free) for the clinic — huge for local "near me" searches.

---

## 8. Recommended next steps (optional, high-impact)

- **Google Analytics / Meta Pixel** — add tracking so you can measure ad conversions (form + WhatsApp clicks). Ask and this can be wired in.
- **Real photos** — clinic exterior, Vaidya ji, reception — replace the placeholder About block; big trust boost.
- **Patient testimonials** (with consent) — strong for local conversions.
- **Exact Google Maps pin** — replace the map query with the clinic's precise "share → embed" link once the Business Profile exists.
- **WhatsApp Business** — auto-greeting + catalogue for incoming leads.

---

*Medical/ads compliance note baked into the site: no "100% cure / guaranteed / permanent" claims, a visible stroke-emergency warning, and a footer disclaimer — aligned with Google/Meta healthcare policies and India's Drugs & Magic Remedies Act.*
