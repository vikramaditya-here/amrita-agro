# Amrita Agro Industries — Website

**Stack:** React 18 · Vite 5 · Framer Motion · Lucide React  
**Deploy:** Netlify (zero-config with `netlify.toml`)

---

## Folder Structure

```
amrita-agro/                        ← Root of your project
│
├── index.html                      ← Vite HTML entry (DO NOT MOVE)
├── vite.config.js                  ← Vite config
├── package.json                    ← Dependencies
├── netlify.toml                    ← Netlify build + redirect rules
├── .gitignore
│
├── src/                            ← React source code
│   ├── main.jsx                    ← ReactDOM.render entry
│   └── App.jsx                     ← Entire main website (AmritaAgro.jsx renamed)
│
└── public/                         ← Static files (copied as-is into dist/)
    ├── gallery.html                ← Gallery sub-page (plain HTML, no React)
    └── photos/
        ├── logo-main.jpeg          ← ⭐ YOUR LOGO (used in header + favicon)
        ├── README.md               ← Image guide
        └── gallery/
            ├── factory-1.jpeg      ← Factory photo 1
            ├── factory-2.jpeg      ← Factory photo 2
            ├── factory-3.jpeg      ← Factory photo 3
            ├── products-1.jpeg     ← Product photo 1
            ├── products-2.jpeg     ← Product photo 2
            └── products-3.jpeg     ← Product photo 3
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## Deploy to Netlify

### Option A — Drag & Drop (Easiest)
1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com) → **Add new site → Deploy manually**
3. Drag the **`dist/`** folder into the Netlify drop zone
4. Done — your site is live!

### Option B — GitHub + Auto Deploy (Recommended)
1. Push this entire project folder to a GitHub repository
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Connect your GitHub account and select the repo
4. Netlify reads `netlify.toml` automatically — **no manual settings needed**
5. Every `git push` to `main` will auto-deploy

### Build settings (if asked manually):
| Setting        | Value           |
|----------------|-----------------|
| Build command  | `npm run build` |
| Publish dir    | `dist`          |
| Node version   | 18 (or higher)  |

---

## Adding More Gallery Photos

1. Drop images into `public/photos/gallery/`
2. Name them: `factory-4.jpeg`, `products-4.jpeg`, etc.
3. Open `public/gallery.html`
4. Copy an existing `<div class="card">` block and update:
   - `src="photos/gallery/YOUR-FILE.jpeg"`
   - `data-title="Your Title"`
   - `data-sub="Your subtitle"`
5. Commit & push — Netlify deploys automatically

---

## Replacing the Logo

Simply replace `public/photos/logo-main.jpeg` with your actual logo file.  
Keep the filename exactly the same. Square images (1:1 ratio) work best.
