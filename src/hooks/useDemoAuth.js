import { useCallback, useState } from 'react';

// DEMO ONLY. There is no server and no real authentication here.
// Only a display name and email are kept in this browser's localStorage so the demo can remember
// that you are "logged in". A password is never read, stored or sent anywhere.
const STORAGE_KEY = 'veyra.demo-user.v1';

function readSavedUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null; // storage blocked or corrupted: just start logged out
  }
}

export default function useDemoAuth() {
  const [user, setUser] = useState(readSavedUser);

  const login = useCallback(({ name, email, identifier }) => {
    const cleanEmail = (email || '').trim();
    const fallbackName = cleanEmail ? cleanEmail.split('@')[0] : (identifier || 'Guest').trim();
    const demoUser = { name: name?.trim() || fallbackName, email: cleanEmail };
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser)); } catch { /* ignore */ }
    setUser(demoUser);
    return demoUser;
  }, []);

  const logout = useCallback(() => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setUser(null);
  }, []);

  return { user, login, logout };
}
