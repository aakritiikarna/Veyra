import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';

// Header account control: "Login / Sign Up" for visitors, "Account / Logout" once logged in (demo).
export default function AuthMenu({ user, onLogin, onSignup, onLogout }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => { if (!wrapRef.current?.contains(event.target)) setOpen(false); };
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', onKey); };
  }, [open]);

  if (!user) {
    return (
      <div className="auth-menu auth-menu--guest">
        <button type="button" className="auth-link" onClick={onLogin}><User size={18} strokeWidth={1.7} /><span>Login</span></button>
        <button type="button" className="auth-signup" onClick={onSignup}>Sign Up</button>
      </div>
    );
  }

  return (
    <div className="auth-menu" ref={wrapRef}>
      <button type="button" className="auth-link auth-link--user" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="auth-avatar" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</span>
        <span className="auth-name">Account</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="auth-dropdown" role="menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
            <p className="auth-dropdown__who"><strong>{user.name}</strong><small>{user.email || 'Username sign-in'}</small></p>
            <span className="auth-dropdown__demo">Demo account · not a real login</span>
            <button type="button" role="menuitem" onClick={() => { setOpen(false); onLogout(); }}><LogOut size={16} /> Logout</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
