import { useCallback, useEffect, useState } from 'react';

// Tiny hash router for the three account screens, so the site needs no routing library.
// #login, #signup and #forgot-password show the account page; any other hash is the normal homepage.
const HASH_TO_VIEW = { '#login': 'login', '#signup': 'signup', '#forgot-password': 'forgot' };
const VIEW_TO_HASH = { login: 'login', signup: 'signup', forgot: 'forgot-password' };

const readView = () => HASH_TO_VIEW[window.location.hash] || null;

export default function useAuthRoute() {
  const [view, setView] = useState(readView);

  useEffect(() => {
    const onChange = () => setView(readView());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  // navigate('login' | 'signup' | 'forgot') opens an account screen; navigate(null) returns to the store.
  const navigate = useCallback((next) => {
    window.location.hash = next ? VIEW_TO_HASH[next] : 'home';
  }, []);

  return { view, navigate };
}
