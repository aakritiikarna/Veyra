import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products, shopFilters } from '../data/catalog.js';
import { ProductGrid, SectionHeading } from './ProductSections.jsx';

const INITIAL_COUNT = 12;

// The whole footwear range in one organised place, with category tabs.
export default function ShopAllSection({ onQuickView, favorites, onToggleFavorite }) {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);

  const filtered = filter === 'all' ? products : products.filter((item) => item.kind === filter);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <section className="catalog-section page-shell shop-all-section" id="shop-all">
      <SectionHeading index="08" eyebrow="The full range" title="Shop all footwear" note="Sneakers, runners, heels, boots and sandals, all in one place." href="#shop-all" />
      <div className="shop-filters" role="tablist" aria-label="Filter footwear by type">
        {shopFilters.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} className={filter === item.id ? 'is-active' : ''} onClick={() => { setFilter(item.id); setExpanded(false); }}>
            {item.label}<span>{item.id === 'all' ? products.length : products.filter((p) => p.kind === item.id).length}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={filter + String(expanded)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <ProductGrid products={visible} onQuickView={onQuickView} favorites={favorites} onToggleFavorite={onToggleFavorite} />
        </motion.div>
      </AnimatePresence>
      {filtered.length > INITIAL_COUNT && (
        <div className="shop-all__more"><button type="button" className="button button--outline" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show fewer' : `Show all ${filtered.length} styles`}</button></div>
      )}
    </section>
  );
}
