import { motion, useReducedMotion } from 'framer-motion';
import { allProducts } from '../data/catalog.js';
import { getMarqueeMessages } from '../data/promotions.js';

const MESSAGES = getMarqueeMessages(allProducts);

export default function PromotionalMarquee() {
  const reduceMotion = useReducedMotion();
  const copies = reduceMotion ? [0] : [0, 1];

  return (
    <section className="promotional-marquee" aria-label="Sample promotional messages">
      <div className="promotional-marquee__inner page-shell">
        <span className="promotional-marquee__label">Sample offers</span>
        <div className="promotional-marquee__clip">
          <motion.div
            className="promotional-marquee__track"
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={reduceMotion ? undefined : { duration: 32, ease: 'linear', repeat: Infinity }}
          >
            {copies.map((copy) => (
              <div className="promotional-marquee__group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
                {MESSAGES.map((message) => (
                  <span className="promotional-marquee__item" key={`${copy}-${message}`}>
                    <i aria-hidden="true" />{message}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <p className="promotional-marquee__disclaimer">Sample offers shown for design preview · edit in data/promotions.js</p>
    </section>
  );
}
