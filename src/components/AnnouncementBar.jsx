import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { allProducts } from '../data/catalog.js';
import { getAnnouncementMessages } from '../data/promotions.js';

const ROTATION_INTERVAL_MS = 5200;
const MESSAGES = getAnnouncementMessages(allProducts);

export default function AnnouncementBar() {
  const [messageIndex, setMessageIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const currentMessage = MESSAGES[messageIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % MESSAGES.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="announcement-bar">
      <div className="announcement-inner page-shell">
        <span className="announcement-label">Sample promotions</span>
        <div className="announcement-message" aria-live="off">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentMessage.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentMessage.text}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="announcement-status"><i aria-hidden="true" /> Sample content · preview</span>
      </div>
    </div>
  );
}
