import { formatNpr } from './promotions.js';

// Keep product text, prices, colors, and image slots in this file so future updates stay simple.
// To swap a photo: drop the new file in public/images/... and change the matching `image` path here.
// Prices: edit `priceNpr` only (a number). The display text and any discount are calculated from it.
// All prices and product descriptions are placeholders for the design preview.

// ---- Featured (hero) sneaker -------------------------------------------------------------
// NOTE: The four colour photos below are TEMPORARY STAND-INS (different shoes, not true colourways).
export const heroProduct = {
  id: 'motion-x',
  name: 'VEYRA MOTION X',
  category: 'Premium Sneakers',
  priceNpr: 5299,
  price: formatNpr(5299),
  badge: 'BEST SELLER',
  description: 'A clean, considered silhouette made for unhurried miles and everyday movement.',
  colors: [
    { id: 'teal', label: 'Forest Teal', hex: '#3f7d70', image: '/images/hero/veyra-hero-teal.jpg', placeholder: 'Teal image placeholder' },
    { id: 'navy', label: 'Midnight Navy', hex: '#27406f', image: '/images/hero/veyra-hero-navy.jpg', placeholder: 'Navy image placeholder' },
    { id: 'sand', label: 'Desert Sand', hex: '#b8956f', image: '/images/hero/veyra-hero-sand.jpg', placeholder: 'Sand image placeholder' },
    { id: 'white', label: 'Cloud White', hex: '#e8e6e1', image: '/images/hero/veyra-hero-white.jpg', placeholder: 'Cloud White image placeholder' },
  ],
};

// ---- Products ----------------------------------------------------------------------------
// kind: sneakers | running | heels-flats | boots-sandals  (drives the filter tabs in "Shop all")
// position: CSS object-position so the card crop keeps the shoes in frame.
const product = (p) => ({ tone: 'stone', position: '50% 50%', ...p, price: formatNpr(p.priceNpr) });

export const products = [
  product({ id: 'motion-x-card', name: 'Terrace Suede Sneakers', category: 'Motion X · Unisex', kind: 'sneakers', priceNpr: 5299, badge: 'BEST SELLER', featured: true, image: '/images/products/motion-x-teal.jpg', position: '50% 55%', description: 'Teal suede terrace sneakers with white three-stripe detailing and a classic gum sole.' }),
  product({ id: 'arc-one', name: 'Navy Suede Heritage Trainers', category: 'Arc One · Men’s', kind: 'sneakers', priceNpr: 5890, badge: 'VEYRA ICON', image: '/images/products/arc-one-navy.jpg', position: '50% 55%', description: 'Navy suede trainers with cream side stripes and a dark grounded sole.' }),
  product({ id: 'form-low', name: 'Sand Suede Court Sneakers', category: 'Form Low · Women’s', kind: 'sneakers', priceNpr: 5690, badge: 'JUST IN', image: '/images/products/form-low-sand.jpg', position: '50% 72%', description: 'Soft sand suede low-tops with a contrast side panel and tonal laces.' }),
  product({ id: 'trace-01', name: 'White & Black Court Low Sneakers', category: 'Trace 01 · Unisex', kind: 'sneakers', priceNpr: 4890, badge: 'NEW ARRIVAL', image: '/images/products/trace-01-white-black.jpg', position: '50% 60%', description: 'Clean white leather court sneakers with a bold black side accent.' }),
  product({ id: 'panda-low', name: 'Black & White Low-Top Sneakers', category: 'Street Low · Unisex', kind: 'sneakers', priceNpr: 6190, badge: 'POPULAR', image: '/images/products/panda-low.jpg', description: 'High-contrast black and white leather low-tops, a streetwear staple.' }),
  product({ id: 'navy-low', name: 'Midnight Low-Top Sneakers', category: 'Street Low · Men’s', kind: 'sneakers', priceNpr: 6190, badge: 'NEW COLOUR', featured: true, image: '/images/products/navy-low.jpg', position: '50% 50%', description: 'Deep navy and cream leather low-tops with a clean, sculpted profile.' }),
  product({ id: 'burgundy-low', name: 'Burgundy Low-Top Sneakers', category: 'Street Low · Women’s', kind: 'sneakers', priceNpr: 6390, badge: 'NEW ARRIVAL', image: '/images/products/burgundy-low.jpg', description: 'Rich burgundy and white leather low-tops, a warm take on the everyday sneaker.' }),
  product({ id: 'hi-top-canvas', name: 'Classic Canvas Hi-Top Sneakers', category: 'Canvas Hi · Unisex', kind: 'sneakers', priceNpr: 4590, badge: 'CLASSIC', image: '/images/products/hi-top-canvas.jpg', description: 'Navy canvas high-tops with white laces and a rubber toe cap.' }),
  product({ id: 'rosewood-terrace', name: 'Rosewood Terrace Trainers', category: 'Terrace · Women’s', kind: 'sneakers', priceNpr: 5490, badge: 'JUST IN', featured: true, image: '/images/products/rosewood-terrace.jpg', description: 'Brown suede trainers with soft pink stripes and a warm gum sole.' }),
  product({ id: 'skate-low', name: 'Black Skate Low Sneakers', category: 'Skate Low · Unisex', kind: 'sneakers', priceNpr: 4290, badge: 'EVERYDAY', image: '/images/products/skate-low.jpg', position: '50% 60%', description: 'Black canvas skate-style low-tops with a white side stripe.' }),
  product({ id: 'pace-lite', name: 'Sculpted Cream Runners', category: 'Pace Lite · Running', kind: 'running', priceNpr: 6299, badge: 'NEW COLOUR', image: '/images/products/pace-lite-cream.jpg', description: 'Cream running sneakers with a sculpted upper and a bright white sole.' }),
  product({ id: 'drift-runner', name: 'Retro Suede Runner Sneakers', category: 'Drift Runner · Running', kind: 'running', priceNpr: 6490, badge: 'POPULAR', image: '/images/products/drift-runner-blue.jpg', position: '50% 85%', description: 'Blue suede retro runners with a white swoosh panel and a gum sole.' }),
  product({ id: 'cream-cocoa-runner', name: 'Cream & Cocoa Retro Runners', category: 'Cloud Run · Running', kind: 'running', priceNpr: 5990, badge: 'NEW ARRIVAL', image: '/images/products/cream-cocoa-runner.jpg', description: 'Retro-style runners in cream and cocoa with a chunky cushioned sole.' }),
  product({ id: 'cherry-ballet', name: 'Cherry Patent Ballet Flats', category: 'Dress · Women’s', kind: 'heels-flats', priceNpr: 3890, badge: 'ELEGANT', image: '/images/products/cherry-ballet.jpg', description: 'Glossy cherry patent ballet flats finished with a small bow.' }),
  product({ id: 'ruby-mary-jane', name: 'Ruby Mary Jane Block Heels', category: 'Dress · Women’s', kind: 'heels-flats', priceNpr: 4990, badge: 'ELEGANT', image: '/images/products/ruby-mary-jane.jpg', position: '50% 55%', description: 'Ruby red Mary Jane shoes with a closed toe, ankle strap and low block heel.' }),
  product({ id: 'strappy-stiletto', name: 'Burgundy Strappy Stiletto Heels', category: 'Evening · Women’s', kind: 'heels-flats', priceNpr: 5490, badge: 'EVENING', image: '/images/products/strappy-stiletto.jpg', position: '50% 60%', description: 'Burgundy patent stilettos with square toes and wrap-around ankle straps.' }),
  product({ id: 'noir-stiletto', name: 'Noir Ankle-Strap Stilettos', category: 'Evening · Women’s', kind: 'heels-flats', priceNpr: 4790, badge: 'EVENING', image: '/images/products/noir-stiletto.jpg', position: '50% 55%', description: 'Black patent ankle-strap stilettos with a slim heel and open toe.' }),
  product({ id: 'bordeaux-boot', name: 'Bordeaux Leather Ankle Boots', category: 'Boots · Women’s', kind: 'boots-sandals', priceNpr: 9890, badge: 'NEW ARRIVAL', image: '/images/products/bordeaux-boot.jpg', description: 'Bordeaux leather ankle boots with a pointed toe and a stacked block heel.' }),
  product({ id: 'cork-sandal', name: 'Cork Footbed Double-Strap Sandals', category: 'Sandals · Unisex', kind: 'boots-sandals', priceNpr: 3490, badge: 'COMFORT', image: '/images/products/cork-sandal.jpg', description: 'Brown double-strap sandals with buckle fastenings and a contoured cork footbed.' }),
];

const byId = Object.fromEntries(products.map((item) => [item.id, item]));
const pick = (...ids) => ids.map((id) => byId[id]);

export const newArrivals = pick('rosewood-terrace', 'burgundy-low', 'bordeaux-boot');
export const bestSellers = pick('motion-x-card', 'arc-one', 'drift-runner');
export const featuredProducts = products.filter((item) => item.featured);

export const collections = {
  men: { id: 'men', index: '02', title: "Men's Collection", note: 'Built for forward motion. Structured suedes and grounded soles.', products: pick('arc-one', 'motion-x-card', 'navy-low') },
  women: { id: 'women', index: '03', title: "Women's Collection", note: 'A softer kind of strength. Light, clean and easy to wear.', products: pick('form-low', 'rosewood-terrace', 'burgundy-low') },
  running: { id: 'running', index: '04', title: 'Running Shoes', note: 'Find your own rhythm. Cushioned, light and ready for the road.', products: pick('drift-runner', 'pace-lite', 'cream-cocoa-runner') },
  elegant: { id: 'elegant', index: '05', title: 'Elegant Footwear', note: 'Polished flats, heels and boots for the evenings that matter.', products: pick('cherry-ballet', 'ruby-mary-jane', 'bordeaux-boot') },
};

export const shopFilters = [
  { id: 'all', label: 'All footwear' },
  { id: 'sneakers', label: 'Sneakers' },
  { id: 'running', label: 'Running' },
  { id: 'heels-flats', label: 'Heels & flats' },
  { id: 'boots-sandals', label: 'Boots & sandals' },
];

// Everything that can appear in the bag / wishlist / search (used by App.jsx).
export const allProducts = [heroProduct, ...products];

export const categories = [
  { id: 'men', name: "Men's Collection", number: '01', image: '/images/categories/mens.jpg', note: 'Built for forward motion', href: '#men' },
  { id: 'women', name: "Women's Collection", number: '02', image: '/images/categories/womens.jpg', note: 'A softer kind of strength', href: '#women' },
  { id: 'running', name: 'Running Shoes', number: '03', image: '/images/categories/running.jpg', note: 'Find your own rhythm', href: '#running' },
  { id: 'lifestyle', name: 'Lifestyle Sneakers', number: '04', image: '/images/categories/lifestyle.jpg', note: 'Everyday, reimagined', href: '#shop-all' },
];

export const campaignImage = '/images/lifestyle/promo-court-white-red.jpg';

// ---- DEMO REVIEWS ---------------------------------------------------------------------------
// !!! SAMPLE CONTENT ONLY !!!  These reviews are placeholders written for the design.
// They are NOT verified customer testimonials. Replace them with real reviews before launch.
export const REVIEWS_ARE_DEMO = true;
export const reviews = [
  { id: 'demo-1', name: 'Rhea G.', location: 'Kathmandu', rating: 5, product: 'VEYRA MOTION X', date: '2026-10-04', quote: 'The first pair I reach for on mornings that turn into long days. Quietly comfortable, and somehow works with everything.' },
  { id: 'demo-2', name: 'Aarav K.', location: 'Lalitpur', rating: 5, product: 'ARC ONE', date: '2026-09-21', quote: 'Thoughtful design without trying too hard. The shape feels distinct, but still fits right into my everyday rotation.' },
  { id: 'demo-3', name: 'Manisha T.', location: 'Pokhara', rating: 4, product: 'FORM LOW', date: '2026-09-02', quote: 'A fresh take on a daily sneaker. I love the understated details and the way it feels from the first wear.' },
];
