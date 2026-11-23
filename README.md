# Meera & Aarav — Premium Wedding Invitation

A mobile-first, animated Indian wedding invitation built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons. The invitation includes a cinematic opening, live countdown, event timeline, venue directions, couple story, family message, WhatsApp RSVP, and a closing blessing.

The sample names, dates, phone number, and venues are fictional placeholders. Personalize them before sharing the site.

## Start locally

You need a current Node.js LTS release (Node 20 or later is recommended).

```bash
npm install
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`. Open it in a browser. Changes appear immediately while the development server is running.

Useful commands:

```bash
npm run build    # production build in dist/
npm run preview  # preview the production build
npm run lint     # code-quality checks
```

## Personalize the invitation

All guest-facing wedding content lives in [`src/data/weddingData.js`](src/data/weddingData.js). Change that file instead of editing text in individual components.

Key fields include:

- `couple`: names, parents, and monogram
- `wedding`: the ISO countdown date, display date, and time
- `events`: Mehendi, Haldi, Sangeet, wedding, and reception details
- `venue`: venue name, full address, and Google Maps link
- `story`: story copy and memorable moments
- `families`: the joint family invitation
- `images`: hero, story, social-preview paths, and accessible alt text
- `rsvp.whatsappNumber`: RSVP destination in international format
- `theme`: the invitation color palette
- `features`: optional section and effect switches
- `share`: title, description, and canonical URL

### Dates and time zones

Use a complete ISO-8601 value for `wedding.dateTime`, including the time-zone offset. For India, use `+05:30`:

```js
dateTime: '2027-02-14T18:30:00+05:30'
```

This keeps the countdown accurate for guests viewing the invitation abroad. Once the date passes, the interface automatically replaces the timer with a celebration message.

### Images

The generated hero and story artwork lives in `src/assets/` and is imported by `weddingData.js`:

```text
src/assets/hero-palace.jpg
src/assets/couple-story.jpg
public/og-wedding-preview.jpg
```

Keep the same filenames to swap images without changing code, or update the imports and `images.socialPreview` path in `weddingData.js`. Recommended sizes:

- Hero: at least 1920 × 1200 px, landscape, with quiet space near the center
- Story portrait: at least 1200 × 1600 px, portrait
- WhatsApp/Open Graph preview: 1200 × 630 px JPG, ideally under 500 KB

Compress replacement images before deployment and keep meaningful `heroAlt` and `storyAlt` text for accessibility. The website lazy-loads below-the-fold images.

### Colors and fonts

The editable palette is stored in `weddingData.theme`. The visual system is implemented with CSS custom properties, so update any matching variables in the global stylesheet if you want the palette to affect every decorative treatment.

Fonts are loaded in the site stylesheet. To self-host fonts, place WOFF2 files in `public/fonts/`, declare them with `@font-face`, and remove the external font import.

### WhatsApp RSVP

Set `rsvp.whatsappNumber` to a WhatsApp-enabled number using international digits only—no `+`, spaces, brackets, or dashes:

```js
whatsappNumber: '919876543210'
```

The RSVP form runs entirely in the browser. Submitting it opens WhatsApp with the guest name, attendance choice, guest count, and optional note pre-filled. No responses are stored by this project, so the WhatsApp chat is the source of truth.

Test the flow on both a phone and a desktop browser before sharing it.

## WhatsApp and social link previews

WhatsApp crawlers read static metadata from `index.html`; they do not run the React app. Before launch:

1. Replace the title, description, `og:url`, and `og:image` values in `index.html` with the real couple details and public HTTPS URL.
2. Replace `public/og-wedding-preview.jpg` with a 1200 × 630 px share image.
3. Use an absolute deployed image URL for `og:image`, such as `https://invite.example.com/og-wedding-preview.jpg`.
4. Deploy, then paste the public URL into a new WhatsApp chat to refresh and verify the preview.

If a stale image persists, change the image filename or add a harmless query version to its URL after redeploying.

## Production build

Run:

```bash
npm run build
npm run preview
```

The deployable static site is generated in `dist/`. Verify the opening interaction, countdown, map link, RSVP link, reduced-motion behavior, and layouts at 320, 375, 390, and 430 px before publishing.

## Deploy

### Vercel

1. Push the project to a Git repository and import it in Vercel.
2. Select the Vite preset.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Deploy, add the final domain to the social metadata, and redeploy.

Vercel can also be used from the CLI with `npx vercel`, followed by `npx vercel --prod` when the preview is approved.

### Netlify

1. Import the repository in Netlify.
2. Set the build command to `npm run build`.
3. Set the publish directory to `dist`.
4. Deploy, update the social metadata to the final HTTPS URL, and redeploy.

For a manual one-off deployment, drag the generated `dist/` folder into Netlify Drop.

### GitHub Pages

This invitation is a single page and does not require a routing fallback. If publishing at `https://username.github.io/repository-name/`, set Vite's `base` to the repository path in `vite.config.js`:

```js
export default defineConfig({
  base: '/repository-name/',
  plugins: [react(), tailwindcss()],
})
```

For a user site or custom domain served at the root, keep `base: '/'` (the default). Build with `npm run build` and publish `dist/` using a GitHub Actions Pages workflow or the `gh-pages` package.

## Share the final invitation

After deployment:

1. Open the final HTTPS link in an incognito browser and complete the full invitation flow.
2. Confirm the hero and story images load on mobile data.
3. Send a test RSVP and check that it reaches the intended WhatsApp number.
4. Share the link in a private WhatsApp chat and confirm the title, date, description, and preview image.
5. Only then send it to relatives or wedding groups.

## Accessibility and performance notes

- The experience respects `prefers-reduced-motion` and keeps essential content available without animation.
- Buttons and inputs are touch friendly and keyboard accessible.
- Decorative artwork is hidden from screen readers; meaningful photography includes editable alt text.
- Below-the-fold images should use modern formats and remain compressed to keep mobile loading fast.
- Avoid adding autoplay audio. If music is enabled later, always provide a visible pause control and remember the visitor's preference.
