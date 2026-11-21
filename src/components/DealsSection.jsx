import { ArrowRight } from 'lucide-react';
import { allProducts, featuredProducts, products } from '../data/catalog.js';
import { getActiveCampaigns, getDealProducts, getHeadlineOffer } from '../data/promotions.js';
import { ProductGrid } from './ProductSections.jsx';
import SaleCountdown from './SaleCountdown.jsx';
import Reveal from './Reveal.jsx';

// Sits right under the hero. Shows the live sale when a configured campaign is active; otherwise a
// regular featured-products section. Nothing here is invented: it all comes from data/promotions.js.
export default function DealsSection({ onQuickView, favorites, onToggleFavorite }) {
  const headline = getHeadlineOffer(allProducts);
  const deals = getDealProducts(products).slice(0, 3);

  if (!headline || deals.length === 0) {
    return (
      <section className="catalog-section page-shell deals-section deals-section--featured" id="deals">
        <Reveal className="section-heading">
          <div><p className="section-index">01 <span>/</span> Featured</p><h2>Featured footwear</h2></div>
          <div className="section-heading__aside"><p>A few favourites from the VEYRA collection.</p><a href="#shop-all" className="text-link">Shop all <ArrowRight size={15} /></a></div>
        </Reveal>
        <ProductGrid products={featuredProducts} onQuickView={onQuickView} favorites={favorites} onToggleFavorite={onToggleFavorite} />
      </section>
    );
  }

  const { campaign, maxPercent } = headline;
  const endDate = new Date(campaign.endsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const campaignCount = getActiveCampaigns().length;

  return (
    <section className="deals-section page-shell" id="deals" aria-label={campaign.name}>
      <Reveal className="deals-banner">
        <div className="deals-banner__copy">
          <p className="deals-banner__eyebrow"><span /> {campaign.name}{campaign.isSample && <em>Sample offer</em>}</p>
          <h2>{campaign.headline}<strong>Up to {maxPercent}% OFF</strong></h2>
          <p className="deals-banner__text">{campaign.tagline} Valid until {endDate}{campaignCount > 1 ? ` · ${campaignCount} offers running` : ''}.</p>
          <a href="#shop-all" className="button button--orange">Shop the sale <ArrowRight size={18} /></a>
        </div>
        <SaleCountdown endsAt={campaign.endsAt} />
      </Reveal>
      <ProductGrid products={deals} onQuickView={onQuickView} favorites={favorites} onToggleFavorite={onToggleFavorite} />
    </section>
  );
}
