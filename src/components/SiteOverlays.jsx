import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Heart, Search, ShoppingBag, X } from 'lucide-react';
import ProductPrice from './ProductPrice.jsx';
import ShoePlaceholder from './ShoePlaceholder.jsx';

function OverlayFrame({ children, onClose, panelClass = '' }) {
  return (
    <motion.div className="overlay-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.aside className={`overlay-panel ${panelClass}`} role="dialog" aria-modal="true" initial={{ x: '6%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '6%', opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.aside>
    </motion.div>
  );
}

function ProductRow({ product, onQuickView, onAddToBag }) {
  return (
    <div className="overlay-product-row">
      <div className="overlay-product-thumb">
        {product.image ? <img src={product.image} alt="" /> : <ShoePlaceholder label="PHOTO SLOT" tone={product.tone || 'stone'} />}
      </div>
      <div className="overlay-product-copy"><span>{product.category}{product.selectedColor ? ` · ${product.selectedColor}` : ''}</span><strong>{product.name}</strong><ProductPrice product={product} className="overlay-price" /></div>
      <button type="button" className="overlay-row-action" aria-label={`View ${product.name}`} onClick={() => onQuickView(product)}><ArrowUpRight size={16} /></button>
      {onAddToBag && <button type="button" className="overlay-row-add" onClick={() => onAddToBag(product)}>Add</button>}
    </div>
  );
}

function DrawerHeader({ eyebrow, title, count, onClose }) {
  return (
    <div className="overlay-heading">
      <div><span className="section-index">{eyebrow}</span><h2>{title}{count !== undefined && <small> ({count})</small>}</h2></div>
      <button type="button" className="icon-button overlay-close" onClick={onClose} aria-label="Close panel"><X size={20} /></button>
    </div>
  );
}

function SearchPanel({ products, onClose, onQuickView }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(term)) : products.slice(0, 4);
  }, [products, query]);

  return (
    <OverlayFrame onClose={onClose} panelClass="overlay-panel--search">
      <DrawerHeader eyebrow="Find your form" title="Search VEYRA" onClose={onClose} />
      <label className="search-field"><Search size={18} /><input autoFocus type="search" placeholder="Try “Motion X” or “Running”" value={query} onChange={(event) => setQuery(event.target.value)} /><span>ENTER</span></label>
      <p className="overlay-caption">{query ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Popular right now'}</p>
      <div className="overlay-product-list">
        {results.map((product) => <ProductRow key={product.id} product={product} onQuickView={onQuickView} />)}
        {results.length === 0 && <p className="empty-state">Nothing found just yet. Try another search.</p>}
      </div>
    </OverlayFrame>
  );
}

function BagPanel({ items, onClose, onQuickView }) {
  const count = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <OverlayFrame onClose={onClose}>
      <DrawerHeader eyebrow="Your selection" title="Shopping bag" count={count} onClose={onClose} />
      <div className="overlay-product-list">
        {items.map(({ product, quantity, cartKey }) => <div className="bag-item" key={cartKey || product.id}><ProductRow product={product} onQuickView={onQuickView} /><span className="bag-quantity">Qty {quantity}</span></div>)}
        {items.length === 0 && <div className="empty-state empty-state--large"><ShoppingBag size={26} strokeWidth={1.3} /><p>Your bag is taking a little breathing room.</p><span>Discover a pair to make it yours.</span></div>}
      </div>
      <div className="bag-note"><span>Frontend preview</span><p>Your bag is saved for this browsing session. Checkout is not connected.</p></div>
      <a className="button button--dark overlay-continue" href="#new-arrivals" onClick={onClose}>Continue exploring <ArrowRight size={16} /></a>
    </OverlayFrame>
  );
}

function WishlistPanel({ products, onClose, onQuickView, onAddToBag }) {
  return (
    <OverlayFrame onClose={onClose}>
      <DrawerHeader eyebrow="Saved for later" title="Wishlist" count={products.length} onClose={onClose} />
      <div className="overlay-product-list">
        {products.map((product) => <ProductRow key={product.id} product={product} onQuickView={onQuickView} onAddToBag={onAddToBag} />)}
        {products.length === 0 && <div className="empty-state empty-state--large"><Heart size={26} strokeWidth={1.3} /><p>A little room for the things you love.</p><span>Tap the heart on a product to save it.</span></div>}
      </div>
    </OverlayFrame>
  );
}

function QuickView({ product, onClose, onAddToBag }) {
  return (
    <motion.div className="quickview-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.div className="quickview-card" role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`} initial={{ y: 18, opacity: 0, scale: 0.985 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.28 }}>
        <button type="button" className="icon-button quickview-close" onClick={onClose} aria-label="Close quick view"><X size={20} /></button>
        <div className="quickview-visual">{product.image ? <img src={product.image} alt={`${product.name}${product.selectedColor ? ` in ${product.selectedColor}` : ''} product`} /> : <ShoePlaceholder label={product.selectedColor ? `${product.selectedColor.toUpperCase()} PHOTO PLACEHOLDER` : `${product.name} · PHOTO PLACEHOLDER`} tone={product.tone || 'stone'} />}</div>
        <div className="quickview-details">
          <span className="product-badge">{product.badge || 'VEYRA FORM'}</span>
          <p className="product-card__category">{product.category}</p>
          <h2>{product.name}</h2>
          {product.selectedColor && <p className="quickview-selected-color">Selected color: {product.selectedColor}</p>}
          <ProductPrice product={product} className="quickview-price" />
          {product.description && <p className="quickview-description">{product.description}</p>}
          <dl className="quickview-specs">
            <div><dt>Style</dt><dd>{product.category}</dd></div>
            {product.selectedColor && <div><dt>Colour</dt><dd>{product.selectedColor}</dd></div>}
            <div><dt>Shipping</dt><dd>Free above NPR 5,000 (sample offer)</dd></div>
          </dl>
          <p className="quickview-note">Product details and prices are placeholders for this design preview.</p>
          <button type="button" className="button button--dark" onClick={() => onAddToBag(product)}>Add to Cart <ArrowUpRight size={16} /></button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SiteOverlays({ overlay, onClose, products, bagItems, wishlistProducts, onQuickView, onAddToBag }) {
  return (
    <AnimatePresence>
      {overlay?.type === 'search' && <SearchPanel key="search" products={products} onClose={onClose} onQuickView={onQuickView} />}
      {overlay?.type === 'bag' && <BagPanel key="bag" items={bagItems} onClose={onClose} onQuickView={onQuickView} />}
      {overlay?.type === 'wishlist' && <WishlistPanel key="wishlist" products={wishlistProducts} onClose={onClose} onQuickView={onQuickView} onAddToBag={onAddToBag} />}
      {overlay?.type === 'quickview' && <QuickView key={`quick-${overlay.product.id}`} product={overlay.product} onClose={onClose} onAddToBag={onAddToBag} />}
    </AnimatePresence>
  );
}
