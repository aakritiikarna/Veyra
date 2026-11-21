import { ArrowUpRight } from 'lucide-react';
import { ProductGrid, SectionHeading } from './ProductSections.jsx';

// One reusable section for Men's, Women's and Running. Data comes from `collections` in catalog.js.
export default function CollectionSection({ collection, alt = false, onQuickView, favorites, onToggleFavorite }) {
  const grid = (
    <>
      <SectionHeading index={collection.index} eyebrow={collection.title.split(' ')[0]} title={collection.title} note={collection.note} href="#shop-all" />
      <ProductGrid
        products={collection.products}
        onQuickView={onQuickView}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        className={`product-grid--count-${collection.products.length}`}
      >
        {/* Two products leave an empty third column, so fill it with a call-to-action tile. */}
        {collection.products.length === 2 && (
          <a className="collection-cta" href="#shop-all"><span>New styles land here first</span><strong>Explore new arrivals <ArrowUpRight size={20} /></strong></a>
        )}
      </ProductGrid>
    </>
  );

  // `alt` gives alternate sections a slightly lighter full-width band so the page has rhythm.
  return alt
    ? <section className="catalog-section bestseller-section" id={collection.id}><div className="page-shell">{grid}</div></section>
    : <section className="catalog-section page-shell" id={collection.id}>{grid}</section>;
}
