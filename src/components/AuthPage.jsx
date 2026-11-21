import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Info } from 'lucide-react';
import AuthArt from './AuthArt.jsx';

// ---- Validation (runs in the browser; a real backend must validate again) ----------------------
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const USERNAME = /^[A-Za-z0-9._-]{3,}$/;

const checkIdentifier = (value) => {
  const text = value.trim();
  if (!text) return 'Enter your email or username.';
  if (text.includes('@') ? !EMAIL.test(text) : !USERNAME.test(text)) return 'Enter a valid email, or a username of 3+ letters or numbers.';
  return '';
};
const checkEmail = (value) => (!value.trim() ? 'Enter your email address.' : !EMAIL.test(value.trim()) ? 'Enter a valid email address, like name@example.com.' : '');

// ---- Small building blocks ---------------------------------------------------------------------
function Field({ label, name, error, hint, children }) {
  const describedBy = [error && `${name}-error`, hint && `${name}-hint`].filter(Boolean).join(' ') || undefined;
  return (
    <div className="auth-field">
      <label htmlFor={name}>{label}</label>
      {children({ id: name, name, 'aria-invalid': error ? 'true' : 'false', 'aria-describedby': describedBy })}
      {hint && !error && <small id={`${name}-hint`} className="auth-field__hint">{hint}</small>}
      {error && <small id={`${name}-error`} className="auth-field__error" role="alert">{error}</small>}
    </div>
  );
}

function PasswordInput({ inputProps, value, onChange, autoComplete, placeholder }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="auth-password">
      <input {...inputProps} type={shown ? 'text' : 'password'} value={value} onChange={onChange} autoComplete={autoComplete} placeholder={placeholder} />
      <button type="button" onClick={() => setShown(!shown)} aria-label={shown ? 'Hide password' : 'Show password'} aria-pressed={shown}>{shown ? <EyeOff size={18} /> : <Eye size={18} />}</button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

// Google sign-in is NOT connected. It needs a Google OAuth client ID plus a server that verifies the
// Google token. Until that exists this button says so honestly instead of pretending to sign anyone in.
function GoogleButton({ label }) {
  const [message, setMessage] = useState('');
  return (
    <>
      <button type="button" className="auth-google" onClick={() => setMessage('Google sign-in is not set up yet. It needs a Google client ID and a server to verify the sign-in, so no Google account was used.')}>
        <GoogleIcon /> {label}
      </button>
      <p className="auth-status" role="status" aria-live="polite">{message}</p>
    </>
  );
}

const DemoNotice = () => (
  <p className="auth-demo-note"><Info size={16} aria-hidden="true" /><span><strong>Demo mode.</strong> No server is connected: nothing you type is sent anywhere, no password is stored or checked, and no real account is created.</span></p>
);

// ---- Views -------------------------------------------------------------------------------------
function LoginForm({ onSubmit, onNavigate }) {
  const [values, setValues] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const next = { identifier: checkIdentifier(values.identifier), password: values.password ? '' : 'Enter your password.' };
    setErrors(next);
    if (next.identifier || next.password) return;
    const identifier = values.identifier.trim();
    onSubmit({ mode: 'login', identifier, email: identifier.includes('@') ? identifier : '' });
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <Field label="Email or username" name="login-identifier" error={errors.identifier}>
        {(p) => <input {...p} type="text" value={values.identifier} onChange={set('identifier')} autoComplete="username" placeholder="you@example.com" autoFocus />}
      </Field>
      <Field label="Password" name="login-password" error={errors.password}>
        {(p) => <PasswordInput inputProps={p} value={values.password} onChange={set('password')} autoComplete="current-password" placeholder="Your password" />}
      </Field>
      <div className="auth-row"><button type="button" className="auth-link-button" onClick={() => onNavigate('forgot')}>Forgot password?</button></div>
      <button type="submit" className="button button--orange auth-submit">Login</button>
      <div className="auth-divider"><span>or</span></div>
      <GoogleButton label="Continue with Google" />
      <p className="auth-switch">New to VEYRA? <button type="button" className="auth-link-button" onClick={() => onNavigate('signup')}>Create account</button></p>
    </form>
  );
}

function SignupForm({ onSubmit, onNavigate }) {
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const next = {
      name: values.name.trim().length < 2 ? 'Enter your full name.' : '',
      email: checkEmail(values.email),
      password: values.password.length < 8 ? 'Use at least 8 characters.' : '',
      confirm: !values.confirm ? 'Confirm your password.' : values.confirm !== values.password ? 'Passwords do not match.' : '',
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    onSubmit({ mode: 'signup', name: values.name.trim(), email: values.email.trim() });
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <Field label="Full name" name="signup-name" error={errors.name}>
        {(p) => <input {...p} type="text" value={values.name} onChange={set('name')} autoComplete="name" placeholder="Your full name" autoFocus />}
      </Field>
      <Field label="Email address" name="signup-email" error={errors.email}>
        {(p) => <input {...p} type="email" value={values.email} onChange={set('email')} autoComplete="email" placeholder="you@example.com" />}
      </Field>
      <Field label="Password" name="signup-password" error={errors.password} hint="At least 8 characters.">
        {(p) => <PasswordInput inputProps={p} value={values.password} onChange={set('password')} autoComplete="new-password" placeholder="Create a password" />}
      </Field>
      <Field label="Confirm password" name="signup-confirm" error={errors.confirm}>
        {(p) => <PasswordInput inputProps={p} value={values.confirm} onChange={set('confirm')} autoComplete="new-password" placeholder="Repeat your password" />}
      </Field>
      <button type="submit" className="button button--orange auth-submit">Create Account</button>
      <div className="auth-divider"><span>or</span></div>
      <GoogleButton label="Sign up with Google" />
      <p className="auth-switch">Already have an account? <button type="button" className="auth-link-button" onClick={() => onNavigate('login')}>Login</button></p>
    </form>
  );
}

function ForgotForm({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const problem = checkEmail(email);
    setError(problem);
    // Honest result: there is no email service, so we never claim a reset link was sent.
    setNotice(problem ? '' : 'Password reset is not available in demo mode: no email service is connected, so no email was sent.');
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <Field label="Email address" name="forgot-email" error={error}>
        {(p) => <input {...p} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" autoFocus />}
      </Field>
      <button type="submit" className="button button--orange auth-submit">Send reset link</button>
      <p className="auth-status auth-status--block" role="status" aria-live="polite">{notice}</p>
      <p className="auth-switch"><button type="button" className="auth-link-button" onClick={() => onNavigate('login')}>Back to login</button></p>
    </form>
  );
}

const COPY = {
  login: { eyebrow: 'Member access', title: 'Welcome back.', sub: 'Login to pick up where you left off.' },
  signup: { eyebrow: 'Join VEYRA', title: 'Create account.', sub: 'Save your favourites and keep your next pair close.' },
  forgot: { eyebrow: 'Account help', title: 'Forgot password?', sub: 'Enter your email and we would send a reset link once email is connected.' },
};

export default function AuthPage({ view, onNavigate, onAuthSuccess }) {
  const reduceMotion = useReducedMotion();
  const copy = COPY[view];

  return (
    <div className="auth-page">
      <aside className="auth-art" aria-label="VEYRA footwear sketches">
        <a className="auth-art__brand brand-lockup" href="#home" onClick={() => onNavigate(null)}><span className="brand-mark" aria-hidden="true" />VEYRA</a>
        <AuthArt />
        <div className="auth-art__caption">
          <p className="eyebrow">Sketchbook · No. 01</p>
          <h2>Every step starts<br />with a sketch.</h2>
        </div>
      </aside>
      <main className="auth-panel">
        <a className="auth-back" href="#home" onClick={() => onNavigate(null)}><ArrowLeft size={18} /> Back to store</a>
        <div className="auth-card-wrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={view}
              className="auth-card-page"
              aria-labelledby="auth-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1 id="auth-heading">{copy.title}</h1>
              <p className="auth-sub">{copy.sub}</p>
              <DemoNotice />
              {view === 'login' && <LoginForm onSubmit={onAuthSuccess} onNavigate={onNavigate} />}
              {view === 'signup' && <SignupForm onSubmit={onAuthSuccess} onNavigate={onNavigate} />}
              {view === 'forgot' && <ForgotForm onNavigate={onNavigate} />}
            </motion.section>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
