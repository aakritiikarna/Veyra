import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, RotateCcw, RotateCw } from 'lucide-react';
import { allProducts, heroProduct } from '../data/catalog.js';
import { getHeadlineOffer } from '../data/promotions.js';
import ShoePlaceholder from './ShoePlaceholder.jsx';

const EASE = [0.22, 1, 0.36, 1];

// The featured sneaker stays perfectly still. An orange "moon" travels around it on a circular orbit.
// The orbit itself is pure CSS (see .hero-orbit__track in premium.css): one full 360° turn every
// 14 seconds. Change the speed there (animation-duration). Nothing else on the page moves with it.
export default function HeroSection({ onAddToBag, onQuickView }) {
  const [activeColor, setActiveColor] = useState(heroProduct.colors[0]);
  const [direction, setDirection] = useState(1); // 1 = clockwise, -1 = anticlockwise
  const reduceMotion = useReducedMotion();
  const offer = getHeadlineOffer(allProducts);

  const selectedVariant = {
    ...heroProduct,
    image: activeColor.image,
    selectedColor: activeColor.label,
    selectedColorId: activeColor.id,
    placeholder: activeColor.placeholder,
    tone: 'hero',
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-inner page-shell">
        {offer && (
          <motion.a
            href="#deals"
            className="hero-offer"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="hero-offer__dot" aria-hidden="true" />
            {offer.campaign.name} · Up to {offer.maxPercent}% OFF{offer.campaign.isSample ? ' (sample)' : ''}
            <ArrowRight size={15} />
          </motion.a>
        )}
        <motion.h1
          className="hero-tagline"
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span>Step beyond</span>
          <span>ordinary.</span>
        </motion.h1>

        <div className="hero-stage" aria-label="Featured product presentation">
          <motion.div
            className="hero-orbit"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          >
            <div className="hero-orbit__glow" aria-hidden="true" />
            <div className="hero-orbit__ring" aria-hidden="true" />
            <div className="hero-orbit__ring hero-orbit__ring--inner" aria-hidden="true" />
            {/* The orbiting element: a track the size of the orbit that turns, carrying the moon on its edge. */}
            <div className={`hero-orbit__track ${direction === -1 ? 'is-reverse' : ''}`} aria-hidden="true">
              <span className="hero-orbit__moon" />
            </div>
            <div className="hero-float">
              <div className="hero-disc" role="img" aria-label={`${heroProduct.name} in ${activeColor.label}`}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeColor.id}
                    className="hero-disc__layer"
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                  >
                    {activeColor.image
                      ? <img className="hero-disc__img" src={activeColor.image} alt="" draggable="false" />
                      : <ShoePlaceholder label={activeColor.placeholder.toUpperCase()} tone="hero" />}
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="hero-disc__gloss" aria-hidden="true" />
            </div>
            <div className="hero-orbit__shadow" aria-hidden="true" />
            <div className="spin-controls" role="group" aria-label="Orbit direction">
              <button type="button" aria-label="Orbit clockwise" title="Orbit clockwise" aria-pressed={direction === 1} onClick={() => setDirection(1)} className={direction === 1 ? 'spin-control is-active' : 'spin-control'}><RotateCw size={18} /></button>
              <button type="button" aria-label="Orbit anticlockwise" title="Orbit anticlockwise" aria-pressed={direction === -1} onClick={() => setDirection(-1)} className={direction === -1 ? 'spin-control is-active' : 'spin-control'}><RotateCcw size={18} /></button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-panel"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
        >
          <div className="hero-panel__details">
            <span className="product-badge">{heroProduct.badge}</span>
            <h2>{heroProduct.name}</h2>
            <p className="hero-product-category">{heroProduct.category} <span>·</span> {heroProduct.price}</p>
            <p className="hero-product-description">{heroProduct.description}</p>
          </div>

          <div className="hero-panel__colours">
            <p className="eyebrow eyebrow--small">Colour: <strong>{activeColor.label}</strong></p>
            <div className="colour-options" role="group" aria-label="Choose a sneaker colour">
              {heroProduct.colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setActiveColor(color)}
                  aria-label={`Select ${color.label}${activeColor.id === color.id ? ', selected' : ''}`}
                  aria-pressed={activeColor.id === color.id}
                  className={`colour-swatch ${activeColor.id === color.id ? 'is-selected' : ''}`}
                >
                  <span className="colour-swatch__dot" style={{ backgroundColor: color.hex }} />
                  <span className="colour-swatch__name">{color.label}</span>
                </button>
              ))}
            </div>
            <p className="colour-photo-note">Preview photos are temporary stand-ins</p>
          </div>

          <div className="hero-panel__actions">
            <motion.a href="#shop-all" className="button button--orange" whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>Shop Now <ArrowRight size={18} /></motion.a>
            <motion.button className="button button--outline" type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }} onClick={() => onAddToBag(selectedVariant)}>Add to Cart <ArrowUpRight size={18} /></motion.button>
            <button className="text-link hero-view-link" type="button" onClick={() => onQuickView(selectedVariant)}>View product details</button>
          </div>
        </motion.div>
      </div>
      <a className="scroll-cue" href="#deals" aria-label="Scroll to offers"><span>Scroll to explore</span><ArrowDown size={16} /></a>
      <span className="hero-watermark" aria-hidden="true">V</span>
    </section>
  );
}
