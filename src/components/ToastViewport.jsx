import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Info, X } from 'lucide-react';

function ToastItem({ toast, onDismiss, reduceMotion }) {
  useEffect(() => {
    const timeout = window.setTimeout(() => onDismiss(toast.id), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast.id, onDismiss]);

  const Icon = toast.tone === 'info' ? Info : Check;

  return (
    <motion.div
      className={`shopping-toast shopping-toast--${toast.tone || 'success'}`}
      role="status"
      initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 12, scale: 0.98 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.24, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <span className="shopping-toast__icon"><Icon size={15} /></span>
      <span className="shopping-toast__message">{toast.message}</span>
      <button type="button" className="shopping-toast__close" onClick={() => onDismiss(toast.id)} aria-label="Dismiss notification"><X size={15} /></button>
    </motion.div>
  );
}

export default function ToastViewport({ toasts, onDismiss }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="shopping-toast-viewport" aria-live="polite" aria-relevant="additions removals">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} reduceMotion={reduceMotion} />)}
      </AnimatePresence>
    </div>
  );
}
