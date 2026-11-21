# VEYRA — Step Beyond Ordinary

A responsive, frontend-only sneaker-brand homepage built with React, Vite, JavaScript, Tailwind CSS, Framer Motion, and Lucide React. There is no backend, account system, database, or payment flow. Bag and wishlist changes are held in React state for the current browser session.

## Run it locally

Install Node.js and pnpm, then run these commands from this project folder:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). To make a production build, run `pnpm build`; the static files are written to `dist/`.

## Where things live

| File or folder | Purpose |
| --- | --- |
| `src/App.jsx` | Composes the homepage and connects local bag, wishlist, search, and quick-view interactions. |
| `src/components/SiteHeader.jsx` | Sticky desktop navigation, mobile menu, and shopping controls. |
| `src/components/HeroSection.jsx` | Featured product, animated product-only rotation, direction controls, color choices, and calls to action. |
| `src/components/ShoePlaceholder.jsx` | Clearly labelled illustrated placeholder used until authentic product photos are ready. |
| `src/components/ProductSections.jsx` and `ProductCard.jsx` | New Arrivals and Best Sellers grids, product hover states, favorites, and Quick View. |
| `src/components/CategorySection.jsx` | Men, Women, Running, and Lifestyle editorial tiles. |
| `src/components/PromoBanner.jsx` and `ReviewSection.jsx` | Promotional campaign and customer-review sections. |
| `src/components/SiteOverlays.jsx` | Search, shopping-bag, wishlist, and Quick View panels. |
| `src/components/Reveal.jsx` and `src/index.css` | Shared scroll reveals, layout, responsive styling, and reduced-motion fallback. |
| `src/data/catalog.js` | Product details, color options, category art, campaign image, and review copy. |

## Replace the shoe images

Product photography is intentionally a placeholder; the displayed line drawing is labelled as an illustrative guide, not a real shoe photo. Add your transparent PNG/WebP files under `public/images/` and reference them with a root-relative path such as `/images/motion-x-white.png`.

For the hero, open `src/data/catalog.js` and set the `image` field for each color in `heroProduct.colors`. For New Arrivals or Best Sellers, set the matching product object's `image` field. Keep each color linked to its own actual photo; leave it as `null` until that specific photo exists. The category and campaign art use the `categories[].image` and `campaignImage` entries in the same file and can also be replaced there.

## Change product colors or details

Edit the `heroProduct.colors` array in `src/data/catalog.js`. Each entry has an `id`, customer-facing `label`, swatch `hex`, unique `image` path (or `null` for a labelled placeholder), and placeholder caption. Update the color name, swatch hex, and corresponding photo together. Product names, NPR prices, badges, and descriptions are in the same data file.

## Animations

The hero's continuous clockwise/anticlockwise spin, hover pause, floating effect, and color transitions are in `src/components/HeroSection.jsx`. Section reveals are shared through `Reveal.jsx`; product-card hover effects are in `ProductCard.jsx`; the campaign headline animation is in `PromoBanner.jsx`; global spacing, motion and responsive rules are in `src/index.css`. Motion follows the browser's reduced-motion preference.


## Sample promotions and notifications

All promotional content is a frontend demonstration only. No sale, free-shipping promise, coupon redemption, checkout, or payment is active. The announcement strip, marquee, countdown, welcome coupon and campaign banner say this in the interface.

Edit `src/data/promotions.js` to change the rotating announcement and marquee text, sample coupon code (`SAMPLE_COUPON_CODE`), coupon percent (`SAMPLE_COUPON_PERCENT`), maximum sample markdown (`MAX_SAMPLE_DISCOUNT_PERCENT`), and free-shipping threshold. The announcement and marquee coupon copy is derived from those constants so changing the coupon code or percentage updates it automatically.

Sample product markdowns are listed in `SAMPLE_PRODUCT_DISCOUNTS` in the same file, keyed by catalog product ID. Set each `originalPrice` and `discountPercent`; the app calculates the rounded whole-NPR preview price with `Math.round(originalPrice * (100 - discountPercent) / 100)`. `ProductPrice.jsx` displays the original price struck through, the calculated sample price, and a preview-only label. New/BEST SELLER badges continue to come from `src/data/catalog.js`.

The countdown starts a 48-hour sample timer on first visit and saves its end time in browser localStorage under `SAMPLE_COUNTDOWN_END_KEY` (with sessionStorage fallback); it does not restart on refresh or after expiry. Change `SAMPLE_COUNTDOWN_DURATION_MS` for a fresh sample duration (or clear that key in the browser to start a new local preview). The welcome popup is shown after a short delay once, and its dismissal is saved in localStorage with a sessionStorage fallback. `AnnouncementBar.jsx`, `PromotionalMarquee.jsx`, `SaleCountdown.jsx`, `WelcomeCouponModal.jsx`, and `ToastViewport.jsx` are the reusable presentation components; `src/App.jsx` connects shopping and sample-coupon notifications to the existing cart and wishlist actions.


---

## Premium upgrade (frontend only)

**Run it:** `pnpm install` then `pnpm dev` (opens at http://localhost:3000).

**Homepage hero.** The featured sneaker sits in the centre inside a circular disc. Only the disc moves:
it turns clockwise once every 48 seconds, floats gently, and every few seconds drifts slightly the other
way and back. Tune it with the constants at the top of `src/components/HeroSection.jsx`
(`SPIN_SECONDS`, `NUDGE_DEGREES`, `NUDGE_PAUSE`, `FLOAT_PIXELS`). It is a flat 2D image rotation, not a 3D
model, so shoes pass upside-down during each turn. Hover or focus pauses it; reduced-motion users get a static disc.

**Images.** Organised under `public/images/{hero,products,categories,lifestyle}`; untouched originals are in
`source-images/`. To swap a photo, drop the new file in `public/images/...` and edit its `image` path in
`src/data/catalog.js`. Hero photos should be square (they are shown in a circle) with the shoes well inside the frame.
Product photos work best at 4:5. A missing file falls back to the labelled placeholder.

**Temporary content.** The four hero colour photos are different shoes used as stand-ins, not real colourways.
`reviews` in `catalog.js` are DEMO reviews (flagged by `REVIEWS_ARE_DEMO`), not real testimonials.
Prices and sale badges remain sample preview content.

**Demo login.** `src/hooks/useDemoAuth.js` is a front-end demo only: no server, no real authentication.
The password field is never read or stored; only name and email are kept in localStorage until Logout.

**Styles.** `src/premium.css` loads after `src/index.css` and overrides the old tiny type sizes. Some older hero
rules in `index.css` are now unused and can be removed once you are happy with the design.

**Image rights.** The sample photos show third-party brands (Adidas, Nike, Puma). Confirm you have the rights
to use them, or replace them with your own product photography, before any public launch.

---

## Round two: orbit, offers, products, account pages

**Hero orbit.** The central sneaker disc is completely still. An orange sphere with a comet trail travels around it on a
true circle, one 360° lap every 14 seconds. It is pure CSS (`.hero-orbit__track` in `src/premium.css`), so it runs
smoothly on phones too. Change the speed with `animation-duration` on that rule. The two small buttons under the disc
reverse the direction. With "reduce motion" enabled the sphere stops and stays at a fixed point on the orbit.

**Offers (everything is driven by `src/data/promotions.js`).** A campaign shows only when `enabled` is true AND today is
between `startsAt` and `endsAt`. Only product ids listed in a campaign's `offers` get a discount; nothing is random.
Prices are never typed in: each product has one numeric `priceNpr` (in `src/data/catalog.js`) and the final price is
calculated (`final = round(price x (100 - percent) / 100)`, `you save = price - final`). Example: NPR 5,000 at 20% ->
NPR 4,000, you save NPR 1,000. When no campaign is active the sale banner, hero pill, announcement sale message and all
discount badges disappear and a regular "Featured footwear" section is shown instead.
The included "Winter Collection Sale" is marked `isSample: true`, which keeps a visible "sample" tag. Set it to `false`
(or replace the campaign) when the offer is a real one. The percentages in the file are placeholders.

**Products.** 19 products, named to match their photos, grouped into Men's, Women's, Running, Elegant Footwear, New
Arrivals, Best Sellers and a filterable "Shop all footwear". Add or edit products in the `products` array in `catalog.js`
(prices and descriptions there are placeholders). Product photos are in `public/images/products/`.

**Account pages.** `#login`, `#signup` and `#forgot-password` show a full account page (no router library needed).
This is still a FRONT-END DEMO: there is no server, no password is checked or stored, no account is really created and
no email is sent. The forms validate input, then start a local demo session (name/email only, in localStorage).
"Continue with Google" is NOT connected and says so when clicked. To make authentication real you need a backend
(for example an auth service or your own API) that stores accounts safely and verifies passwords; for Google you also
need a Google Cloud OAuth client ID and a server that verifies the Google ID token. Connect those in
`src/hooks/useDemoAuth.js` (session) and `src/components/AuthPage.jsx` (forms and the Google button).

**Login artwork.** The pen sketches in `public/images/auth/` were generated from the supplied footwear photos with an
edge-line filter. Replace the five `sk-*.png` files (transparent PNGs, light lines) to change the artwork.

**Image rights.** Many sample photos show third-party brands. Confirm you have the right to use them, or replace them
with your own photography, before any public launch.
