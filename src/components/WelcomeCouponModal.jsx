import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Copy, Sparkles, X } from 'lucide-react';
import { SAMPLE_COUPON_CODE, SAMPLE_COUPON_PERCENT, WELCOME_DISMISSED_KEY } from '../data/promotions.js';

function wasDismissed() {
  try { if (window.localStorage.getItem(WELCOME_DISMISSED_KEY) === 'yes') return true; } catch { /* Check session storage next. */ }
  try { return window.sessionStorage.getItem(WELCOME_DISMISSED_KEY) === 'yes'; } catch { return false; }
}

function rememberDismissal() {
  try { window.localStorage.setItem(WELCOME_DISMISSED_KEY, 'yes'); } catch { /* Keep the session respectful even without storage. */ }
  try { window.sessionStorage.setItem(WELCOME_DISMISSED_KEY, 'yes'); } catch { /* Storage can be disabled by the browser. */ }
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();
  if (!copied) throw new Error('Clipboard access is unavailable.');
}

export default function WelcomeCouponModal({ onToast, onApplyCoupon }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (wasDismissed()) return undefined;
    const timeout = window.setTimeout(() => setOpen(true), 1600);
    return () => window.clearTimeout(timeout);
  }, []);

  const close = () => {
    rememberDismissal();
    setOpen(false);
  };

  const handleCopy = async () => {
    try {
      await copyText(SAMPLE_COUPON_CODE);
      onToast('Sample coupon copied to clipboard.', 'success');
      close();
    } catch {
      onToast(`Copy unavailable — your sample code is ${SAMPLE_COUPON_CODE}.`, 'info');
    }
  };

  const handleApply = () => {
    onApplyCoupon(SAMPLE_COUPON_CODE);
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="welcome-coupon-backdrop"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && close()}
        >
          <motion.section
            className="welcome-coupon-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-coupon-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0.14 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="welcome-coupon-close" onClick={close} aria-label="Close welcome coupon"><X size={18} /></button>
            <span className="welcome-coupon-kicker"><Sparkles size={14} /> A VEYRA welcome sample</span>
            <h2 id="welcome-coupon-title">A little something<br /><em>for your next step.</em></h2>
            <p className="welcome-coupon-intro">A sample {SAMPLE_COUPON_PERCENT}% coupon for this design preview.</p>
            <div className="welcome-coupon-code">
              <span>Sample code</span>
              <strong>{SAMPLE_COUPON_CODE}</strong>
              <small>{SAMPLE_COUPON_PERCENT}% OFF</small>
            </div>
            <div className="welcome-coupon-actions">
              <button type="button" className="button button--orange" onClick={handleCopy}><Copy size={15} /> Copy coupon</button>
              <button type="button" className="button button--outline" onClick={handleApply}>Apply sample code</button>
            </div>
            <p className="welcome-coupon-disclaimer">Preview only. This coupon is not active and does not change checkout prices.</p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
