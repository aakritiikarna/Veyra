import { useCallback, useEffect, useMemo, useState } from 'react';
import SiteHeader from './components/SiteHeader.jsx';
import HeroSection from './components/HeroSection.jsx';
import { NewArrivalsSection, BestSellersSection } from './components/ProductSections.jsx';
import CategorySection from './components/CategorySection.jsx';
import PromoBanner from './components/PromoBanner.jsx';
import PromotionalMarquee from './components/PromotionalMarquee.jsx';
import DealsSection from './components/DealsSection.jsx';
import ShopAllSection from './components/ShopAllSection.jsx';
import AuthPage from './components/AuthPage.jsx';
import useAuthRoute from './hooks/useAuthRoute.js';
import { ShopActions } from './context/ShopActions.js';
import ReviewSection from './components/ReviewSection.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import SiteOverlays from './components/SiteOverlays.jsx';
import ToastViewport from './components/ToastViewport.jsx';
import WelcomeCouponModal from './components/WelcomeCouponModal.jsx';
import CollectionSection from './components/CollectionSection.jsx';
import useDemoAuth from './hooks/useDemoAuth.js';
import { allProducts, collections } from './data/catalog.js';
import { SAMPLE_COUPON_CODE } from './data/promotions.js';

const catalog = allProducts;

export default function App() {
  const [overlay, setOverlay] = useState(null);
  const [bagItems, setBagItems] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(() => new Set());
  const [toasts, setToasts] = useState([]);
  const { view: authView, navigate: goTo } = useAuthRoute(); // #login, #signup, #forgot-password
  const { user, login, logout } = useDemoAuth(); // demo only: no real authentication

  const bagCount = bagItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistProducts = useMemo(() => catalog.filter((product) => favoriteIds.has(product.id)), [favoriteIds]);

  const showToast = useCallback((message, tone = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((current) => [...current.slice(-2), { id, message, tone }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const handleAuthSubmit = ({ name, email, identifier, mode }) => {
    const demoUser = login({ name, email, identifier });
    goTo(null);
    showToast(mode === 'signup' ? `Demo account created. Welcome, ${demoUser.name}.` : `Demo login: signed in as ${demoUser.name}.`, 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('You have been logged out of the demo.', 'info');
  };

  // After switching screens, jump to the requested section (or the top) once the new screen is on the page.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      const target = !authView && id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [authView]);

  const openQuickView = (product) => setOverlay({ type: 'quickview', product });

  const addToBag = (product) => {
    const cartKey = `${product.id}:${product.selectedColorId ?? 'default'}`;
    setBagItems((current) => {
      const existing = current.find((item) => item.cartKey === cartKey);
      if (existing) return current.map((item) => item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { product, quantity: 1, cartKey }];
    });
    showToast(`${product.name} added to your bag.`, 'success');
    setOverlay({ type: 'bag' });
  };

  const toggleFavorite = (product) => {
    const alreadySaved = favoriteIds.has(product.id);
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
    showToast(alreadySaved ? `${product.name} removed from your wishlist.` : `${product.name} added to your wishlist.`, alreadySaved ? 'info' : 'success');
  };

  const applySampleCoupon = (code = SAMPLE_COUPON_CODE) => {
    showToast(`Sample coupon ${code} applied in this preview only.`, 'sample');
  };

  if (authView) {
    return (
      <div className="app-shell min-h-screen bg-veyra-paper text-veyra-ink">
        <AuthPage view={authView} onNavigate={goTo} onAuthSuccess={handleAuthSubmit} />
        <ToastViewport toasts={toasts} onDismiss={dismissToast} />
      </div>
    );
  }

  return (
    <ShopActions.Provider value={{ addToBag }}>
    <div className="app-shell min-h-screen bg-veyra-paper text-veyra-ink">
      <SiteHeader
        bagCount={bagCount}
        favoriteCount={wishlistProducts.length}
        user={user}
        onLogin={() => goTo('login')}
        onSignup={() => goTo('signup')}
        onLogout={handleLogout}
        onOpenSearch={() => setOverlay({ type: 'search' })}
        onOpenWishlist={() => setOverlay({ type: 'wishlist' })}
        onOpenBag={() => setOverlay({ type: 'bag' })}
      />
      <main className="w-full">
        <HeroSection onAddToBag={addToBag} onQuickView={openQuickView} />
        <DealsSection onQuickView={openQuickView} favorites={favoriteIds} onToggleFavorite={toggleFavorite} />
        <PromotionalMarquee />
        <CategorySection />
        <CollectionSection collection={collections.men} onQuickView={openQuickView} favorites={favoriteIds} onToggleFavorite={toggleFavorite} />
        <CollectionSection collection={collections.women} alt onQuickView={openQuickView} favorites={favoriteIds} onToggleFavorite={toggleFavorite} />
        <CollectionSection collection={collections.running} onQuickView={openQuickView} favorites={favoriteIds} onToggleFavorite={toggleFavorite} />
        <CollectionSection collection={collections.elegant} alt onQuickView={openQuickView} favorites={favoriteIds} onToggleFavorite={toggleFavorite} />
        <NewArrivalsSection onQuickView={openQuickView} favorites={favoriteIds} onToggleFavorite={toggleFavorite} />
        <BestSellersSection onQuickView={openQuickView} favorites={favoriteIds} onToggleFavorite={toggleFavorite} />
        <ShopAllSection onQuickView={openQuickView} favorites={favoriteIds} onToggleFavorite={toggleFavorite} />
        <PromoBanner />
        <ReviewSection />
      </main>
      <SiteFooter />
      <SiteOverlays overlay={overlay} onClose={() => setOverlay(null)} products={catalog} bagItems={bagItems} wishlistProducts={wishlistProducts} onQuickView={openQuickView} onAddToBag={addToBag} />
      <WelcomeCouponModal onToast={showToast} onApplyCoupon={applySampleCoupon} />
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </div>
    </ShopActions.Provider>
  );
}
