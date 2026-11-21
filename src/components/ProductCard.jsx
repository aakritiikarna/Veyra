import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductPrice from './ProductPrice.jsx';
import ProductImage from './ProductImage.jsx';
import { getPricing } from '../data/promotions.js';
import { ShopActions } from '../context/ShopActions.js';

export default function ProductCard({ product, onQuickView, isFavorite, onToggleFavorite, index = 0 }) {
  const { addToBag } = useContext(ShopActions);
  const pricing = getPricing(product);
  const badgeType = product.badge?.toLowerCase().includes('best') ? 'best' : /new|just/.test(product.badge?.toLowerCase() || '') ? 'new' : 'standard';

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <div className="product-card__visual">
        <ProductImage product={product} alt={`${product.name} product`} className="product-card__image" placeholderClassName="product-card__placeholder" />
        <div className="product-card__badges">
          <span className={`product-card__badge product-card__badge--${badgeType}`}>{product.badge}</span>
          {pricing && <span className="product-card__badge product-card__badge--sale">{pricing.discountPercent}% OFF{pricing.isSample ? ' · SAMPLE' : ''}</span>}
        </div>
        <button className={`product-card__heart ${isFavorite ? 'is-favorite' : ''}`} type="button" onClick={() => onToggleFavorite(product)} aria-label={isFavorite ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={isFavorite}>
          <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={1.6} />
        </button>
      </div>
      <div className="product-card__info">
        <div><span className="product-card__category">{product.category}</span><h3>{product.name}</h3></div>
        <ProductPrice product={product} className="product-card__price" />
        <div className="product-card__actions">
          <motion.button type="button" className="card-button card-button--primary" whileTap={{ scale: 0.97 }} onClick={() => addToBag(product)}><ShoppingBag size={16} /> Add to Cart</motion.button>
          <button type="button" className="card-button" onClick={() => onQuickView(product)} aria-label={`View details for ${product.name}`}>Details</button>
        </div>
      </div>
    </motion.article>
  );
}
