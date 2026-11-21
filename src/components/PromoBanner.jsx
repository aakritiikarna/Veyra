import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { allProducts, campaignImage } from '../data/catalog.js';
import { getHeadlineOffer } from '../data/promotions.js';

export default function PromoBanner() {
  const reduceMotion = useReducedMotion();
  const offer = getHeadlineOffer(allProducts);

  return (
    <section className="promo-section page-shell" aria-label="VEYRA featured campaign">
      <div className="promo-banner promo-banner--split">
        <div className="promo-banner__grain" aria-hidden="true" />
        <div className="promo-content">
          <p className="promo-eyebrow"><span /> {offer ? `${offer.campaign.name}${offer.campaign.isSample ? ' · sample offer' : ''}` : 'New season'}</p>
          <motion.h2 initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }}>Make room<br /><em>for movement.</em></motion.h2>
          <p className="promo-description">{offer ? `Save up to ${offer.maxPercent}% on selected footwear until ${new Date(offer.campaign.endsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}.` : 'Discover the latest silhouettes, built for everyday movement.'}</p>
          <motion.a href="#shop-all" className="button button--orange" whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>Shop Now <ArrowUpRight size={18} /></motion.a>
        </div>
        <div className="promo-media">
          <img src={campaignImage} alt="Model seated on a stool wearing white sneakers with a red accent" loading="lazy" decoding="async" />
        </div>
        <div className="promo-mark" aria-hidden="true">V/01</div>
      </div>
    </section>
  );
}
