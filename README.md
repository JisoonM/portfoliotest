# Mark Jason B. Ramos: Portfolio

A responsive, single-page portfolio built with plain **HTML, CSS and JavaScript**. There is no build step and no dependencies, so it deploys anywhere static files can be served.

## Structure

```
portfolio/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
│   ├── favicon.svg
│   └── resume.pdf
├── vercel.json
└── README.md
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy to Vercel

**Option A: GitHub (recommended)**
1. Push this folder to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Click **Deploy**.

**Option B: CLI**
```bash
npm i -g vercel
vercel --prod
```

## Deploy to GitHub Pages

1. Push to a GitHub repository.
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch**, Branch: `main`, Folder: `/ (root)`. Save.

All asset paths are relative, so the site also works under a repo sub-path such as `username.github.io/portfolio/`.

## Customize

- **Content:** edit the sections in `index.html`.
- **Colors:** change the tokens at the top of `css/styles.css` (`--accent`, `--accent-2`).
- **Resume:** replace `assets/resume.pdf` and keep the file name.
- **Contact:** search for `mrk.ramos118@gmail.com` and update if needed.
- **Add a photo:** place `assets/profile.jpg` and add an `<img>` in the hero section.
