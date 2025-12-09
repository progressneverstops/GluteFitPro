# Deployment Guide

## Testing Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

3. **Test production build locally:**
   ```bash
   npm run build
   npm start
   ```
   This builds and runs the production version locally.

## Deploying to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Enable GitHub Actions:**
   - Go to your repository: https://github.com/progressneverstops/GluteFitPro
   - Go to Settings → Actions → General
   - Enable "Allow all actions and reusable workflows"
   - Save

2. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"
   - Save

3. **Push to trigger deployment:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

4. **Wait for deployment:**
   - Go to Actions tab in your repository
   - Watch the workflow run
   - Once complete, your site will be live at:
     `https://progressneverstops.github.io/GluteFitPro/`

### Option 2: Manual Deployment

1. **Build the static site:**
   ```bash
   npm run build
   ```
   This creates an `out` folder with static files.

2. **Push to gh-pages branch:**
   ```bash
   git add out
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix out origin gh-pages
   ```

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Select "gh-pages" branch
   - Save

## Alternative: Deploy to Vercel (Easier)

Vercel is the easiest way to deploy Next.js apps:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   Follow the prompts to connect your GitHub repository.

3. **Automatic deployments:**
   - Every push to `main` will automatically deploy
   - Get a custom domain and HTTPS automatically

Or use the web interface:
- Go to https://vercel.com
- Import your GitHub repository
- Deploy automatically

## Testing the Static Export

To test the static export locally before deploying:

```bash
# Build static files
npm run build

# Serve the static files (install serve globally first: npm i -g serve)
serve out

# Or use Python's built-in server
cd out
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Troubleshooting

- **404 errors:** Make sure `trailingSlash: true` is set in `next.config.js`
- **Images not loading:** Ensure `images: { unoptimized: true }` is set
- **Routes not working:** All routes must be statically generated at build time

