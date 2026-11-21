import { formatNpr, getPricing } from '../data/promotions.js';

// Regular price, or the full discount breakdown when an active campaign discounts this product.
export default function ProductPrice({ product, className = '' }) {
  const pricing = getPricing(product);
  const classes = ['price-display', className].filter(Boolean).join(' ');

  if (!pricing) {
    return <span className={classes}><span className="price-display__regular">{formatNpr(product.priceNpr)}</span></span>;
  }

  const { originalPrice, discountPercent, discountedPrice, savings, campaignName, isSample } = pricing;
  return (
    <span className={classes} aria-label={`${campaignName}: was ${formatNpr(originalPrice)}, now ${formatNpr(discountedPrice)}, ${discountPercent} percent off, you save ${formatNpr(savings)}${isSample ? '. Sample price for preview only' : ''}`}>
      <span className="price-display__row">
        <del className="price-display__original">{formatNpr(originalPrice)}</del>
        <strong className="price-display__current">{formatNpr(discountedPrice)}</strong>
        <em className="price-display__pct">{discountPercent}% OFF</em>
      </span>
      <small className="price-display__save">You save {formatNpr(savings)}</small>
      {isSample && <small className="price-display__sample">Sample price · preview only</small>}
    </span>
  );
}
