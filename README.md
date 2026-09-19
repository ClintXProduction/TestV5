# CLTX4 Marketplace

A cool GitHub-ready digital website marketplace with a browser-based admin panel.

## Files
- `index.html` — storefront
- `admin.html` — admin dashboard
- `style.css` — responsive dark/cyan design
- `app.js` — storefront rendering
- `admin.js` — admin CRUD + local storage

## Run
Open `index.html` locally, or upload the folder to a GitHub repository and enable GitHub Pages.

## Important security note
The requested admin password is included in `admin.js` because this is a static demo. Anyone who can inspect the JavaScript can recover it. GitHub Pages cannot securely protect a secret by itself. For a real shop, use a backend/auth provider and keep the password hashed/server-side.

Admin password for this demo: `134270911`
