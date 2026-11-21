// =============================================================================================
// PROMOTIONS: the single source of truth for every discount shown on the site.
//
// A campaign is only shown when ALL of these are true: enabled === true AND the current time is
// between startsAt and endsAt. Nothing is ever discounted unless a product id is listed in `offers`.
// Discounted prices are calculated from the product's real `priceNpr` (see catalog.js), never typed in.
//
// `isSample: true` keeps a visible "sample" tag on every price and banner. Set it to false (or edit /
// replace the campaign) once the offer is a real, live store promotion.
// =============================================================================================
export const CAMPAIGNS = [
  {
    id: 'winter-2026',
    name: 'Winter Collection Sale',
    headline: 'Seasonal Sale',
    tagline: 'Special winter savings on selected footwear.',
    enabled: true,
    isSample: true,
    startsAt: '2026-11-15T00:00:00+05:45', // Nepal time
    endsAt: '2026-12-31T23:59:59+05:45',
    // productId: percent off. Only products listed here are discounted.
    offers: {
      'form-low': 40,
      'bordeaux-boot': 30,
      'drift-runner': 25,
      'motion-x-card': 20,
      'ruby-mary-jane': 20,
      'trace-01': 15,
      'hi-top-canvas': 15,
    },
  },
];

// Sample store-wide extras (not tied to a campaign). They stay labelled as samples.
export const SAMPLE_COUPON_CODE = 'VEYRA10';
export const SAMPLE_COUPON_PERCENT = 10;
export const FREE_SHIPPING_THRESHOLD_NPR = 5000;
export const WELCOME_DISMISSED_KEY = 'veyra.welcome-dismissed.v1';

export function formatNpr(amount) {
  return `NPR ${Math.round(amount).toLocaleString('en-US')}`;
}

const isValidPercent = (value) => Number.isFinite(value) && value > 0 && value < 100;

export function getActiveCampaigns(now = new Date()) {
  const time = now.getTime();
  return CAMPAIGNS.filter((campaign) => (
    campaign.enabled
    && time >= new Date(campaign.startsAt).getTime()
    && time <= new Date(campaign.endsAt).getTime()
  ));
}

/**
 * Price breakdown for one product, or null when no active campaign discounts it.
 * Example: priceNpr 5000 + 20% -> { originalPrice: 5000, discountPercent: 20, discountedPrice: 4000, savings: 1000 }
 * `savings` is original - final, so original = final + savings always holds exactly.
 */
export function getPricing(product, now = new Date()) {
  const originalPrice = product?.priceNpr;
  if (!Number.isFinite(originalPrice) || originalPrice <= 0) return null;

  let best = null;
  for (const campaign of getActiveCampaigns(now)) {
    const percent = campaign.offers[product.id];
    if (isValidPercent(percent) && (!best || percent > best.percent)) best = { percent, campaign };
  }
  if (!best) return null;

  const discountedPrice = Math.round(originalPrice * (100 - best.percent) / 100);
  return {
    originalPrice,
    discountPercent: best.percent,
    discountedPrice,
    savings: originalPrice - discountedPrice,
    campaignName: best.campaign.name,
    isSample: Boolean(best.campaign.isSample),
  };
}

// Products with a live discount, biggest saving first.
export function getDealProducts(products, now = new Date()) {
  return products
    .map((product) => ({ product, pricing: getPricing(product, now) }))
    .filter((entry) => entry.pricing)
    .sort((a, b) => b.pricing.discountPercent - a.pricing.discountPercent)
    .map((entry) => entry.product);
}

// The campaign to feature (largest "up to" discount among products that exist), or null when none is live.
export function getHeadlineOffer(products, now = new Date()) {
  let top = null;
  for (const campaign of getActiveCampaigns(now)) {
    const percents = products.map((product) => campaign.offers[product.id]).filter(isValidPercent);
    if (!percents.length) continue;
    const maxPercent = Math.max(...percents);
    if (!top || maxPercent > top.maxPercent) top = { campaign, maxPercent };
  }
  return top;
}

const shippingText = FREE_SHIPPING_THRESHOLD_NPR.toLocaleString('en-US');

export function getAnnouncementMessages(products, now = new Date()) {
  const top = getHeadlineOffer(products, now);
  return [
    ...(top ? [{ id: 'sale', text: `${top.campaign.name.toUpperCase()} — UP TO ${top.maxPercent}% OFF` }] : []),
    { id: 'shipping', text: `FREE SHIPPING ON ORDERS ABOVE NPR ${shippingText}` },
    { id: 'coupon', text: `USE CODE ${SAMPLE_COUPON_CODE} FOR ${SAMPLE_COUPON_PERCENT}% OFF` },
  ];
}

export function getMarqueeMessages(products, now = new Date()) {
  const top = getHeadlineOffer(products, now);
  return [
    ...(top ? [`${top.campaign.name.toUpperCase()} · UP TO ${top.maxPercent}% OFF`] : []),
    `FREE SHIPPING ABOVE NPR ${shippingText} · SAMPLE OFFER`,
    'NEW ARRIVALS · FRESH VEYRA FORMS',
    `SAMPLE COUPON · ${SAMPLE_COUPON_CODE} FOR ${SAMPLE_COUPON_PERCENT}% OFF`,
  ];
}
