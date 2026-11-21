import { ArrowRight } from 'lucide-react';
import { bestSellers, newArrivals } from '../data/catalog.js';
import ProductCard from './ProductCard.jsx';
import Reveal from './Reveal.jsx';

export function SectionHeading({ index, eyebrow, title, note, href }) {
  return (
    <Reveal className="section-heading">
      <div>
        <p className="section-index">{index} <span>/</span> {eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading__aside">
        <p>{note}</p>
        <a href={href} className="text-link">Explore all <ArrowRight size={15} /></a>
      </div>
    </Reveal>
  );
}

export function ProductGrid({ products, onQuickView, favorites, onToggleFavorite, className = '', children }) {
  return (
    <>
      <p className="sample-price-disclaimer">Prices are placeholders for this design preview</p>
      <div className={`product-grid ${className}`}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} onQuickView={onQuickView} isFavorite={favorites.has(product.id)} onToggleFavorite={onToggleFavorite} />
        ))}
        {children}
      </div>
    </>
  );
}

export function NewArrivalsSection({ onQuickView, favorites, onToggleFavorite }) {
  return (
    <section className="catalog-section arrivals-section page-shell" id="new-arrivals">
      <SectionHeading index="06" eyebrow="Just landed" title="New arrivals" note="Fresh forms, considered details. Meet the latest from VEYRA." href="#shop-all" />
      <ProductGrid products={newArrivals} onQuickView={onQuickView} favorites={favorites} onToggleFavorite={onToggleFavorite} />
    </section>
  );
}

export function BestSellersSection({ onQuickView, favorites, onToggleFavorite }) {
  return (
    <section className="catalog-section bestseller-section" id="best-sellers">
      <div className="page-shell">
        <SectionHeading index="07" eyebrow="The VEYRA edit" title="Loved on repeat." note="The pairs that have found their way into the everyday." href="#shop-all" />
        <ProductGrid products={bestSellers} onQuickView={onQuickView} favorites={favorites} onToggleFavorite={onToggleFavorite} className="product-grid--best" />
      </div>
    </section>
  );
}
