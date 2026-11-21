import { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar.jsx';
import AuthMenu from './AuthMenu.jsx';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Men', href: '#men' },
  { label: 'Women', href: '#women' },
  { label: 'New Arrivals', href: '#new-arrivals' },
  { label: 'Best Sellers', href: '#best-sellers' },
  { label: 'Collections', href: '#collections' },
];

function BrandMark() {
  return (
    <a href="#home" className="brand-lockup" aria-label="VEYRA home">
      <svg viewBox="0 0 40 40" className="brand-mark" aria-hidden="true">
        <path d="M5 8 17.5 32 26 15.6 34.5 32 39 8h-6l-6.9 18L19.5 15 13 26 7 8H5Z" fill="currentColor" />
      </svg>
      <span>VEYRA</span>
    </a>
  );
}

export default function SiteHeader({ bagCount, favoriteCount, user, onLogin, onSignup, onLogout, onOpenSearch, onOpenWishlist, onOpenBag }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <div className="site-header__inner page-shell">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => <a key={link.label} href={link.href} className="nav-link">{link.label}</a>)}
          </nav>
          <div className="header-actions">
            <AuthMenu user={user} onLogin={onLogin} onSignup={onSignup} onLogout={onLogout} />
            <button className="icon-button header-icon" type="button" aria-label="Search products" onClick={onOpenSearch}><Search size={18} strokeWidth={1.55} /></button>
            <button className="icon-button header-icon" type="button" aria-label={`Open wishlist${favoriteCount ? `, ${favoriteCount} saved` : ''}`} onClick={onOpenWishlist}>
              <Heart size={18} strokeWidth={1.55} />{favoriteCount > 0 && <span className="icon-count">{favoriteCount}</span>}
            </button>
            <button className="icon-button header-icon bag-button" type="button" aria-label={`Open shopping bag, ${bagCount} items`} onClick={onOpenBag}>
              <ShoppingBag size={18} strokeWidth={1.55} /><span className="icon-count">{bagCount}</span>
            </button>
            <button className="icon-button mobile-menu-button" type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-nav-panel">
            <nav aria-label="Mobile navigation">
              {links.map((link, index) => (
                <a key={link.label} href={link.href} onClick={closeMenu} className="mobile-nav-link">
                  <span className="mobile-nav-index">0{index + 1}</span><span>{link.label}</span><span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
            <div className="mobile-auth">
              {user
                ? <><span>Signed in as {user.name} (demo)</span><button type="button" onClick={() => { closeMenu(); onLogout(); }}>Logout</button></>
                : <><button type="button" onClick={() => { closeMenu(); onLogin(); }}>Login</button><button type="button" onClick={() => { closeMenu(); onSignup(); }}>Sign Up</button></>}
            </div>
            <p className="mobile-nav-note">Made for motion. Made to move with you.</p>
          </div>
        )}
      </header>
    </>
  );
}
