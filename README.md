# Nur Cinema – Next.js Islamic Movies Website

Next.js 14 (App Router) + TMDB API. Movies, series, search, detail pages with trailers, and a "My list" saved in the browser.

## Run
1. Install Node.js 18.17+ (https://nodejs.org)
2. Get a free key: https://www.themoviedb.org/settings/api  ("API Key (v3 auth)")
3. Copy `.env.example` to `.env.local` and paste the key
4. In the VS Code terminal:
   ```
   npm install
   npm run dev
   ```
   Open http://localhost:3000

## Deploy (free)
Push to GitHub, import on https://vercel.com, add `TMDB_API_KEY` in Environment Variables, deploy.

## Customize
- Which titles appear: `KEYWORDS` and `FEATURED` in `lib/tmdb.js`
- Colors: top of `app/globals.css`
- Pages: `app/` folder (`/movies`, `/series`, `/search`, `/my-list`, `/title/[type]/[id]`)

Data and images from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
