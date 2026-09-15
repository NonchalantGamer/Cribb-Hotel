import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isStaffEmail } from '../lib/hotelDatabaseService';

export type AuthModalMode = 'signin' | 'signup' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthModalMode;
  initialEmail?: string;
  onOpenStaffPortal?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  initialEmail = '',
  onOpenStaffPortal
}) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, sendResetPassword } = useAuth();

  const [mode, setMode] = useState<AuthModalMode>(initialMode);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Sync initial state when modal opens and prevent background scroll
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      if (initialEmail) setEmail(initialEmail);
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      setSuccessMessage('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialMode, initialEmail]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      setSuccessMessage('Welcome! You have successfully authenticated via Google.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        console.error('Google Sign In error:', err);
        setErrorMessage(err?.message || 'Google authentication failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Check if staff email was entered
    if (isStaffEmail(email) && mode === 'signin' && onOpenStaffPortal) {
      onClose();
      onOpenStaffPortal();
      return;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters in length.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
        setSuccessMessage('Welcome back! You are now signed in to Cribb Hotels.');
        setTimeout(() => {
          onClose();
        }, 1000);
      } else if (mode === 'signup') {
        await signUpWithEmail(email, password, displayName);
        setSuccessMessage('Account created! Welcome to Cribb Rewards with 2,500 bonus points.');
        setTimeout(() => {
          onClose();
        }, 1200);
      } else if (mode === 'forgot') {
        await sendResetPassword(email);
        setSuccessMessage(`Password recovery link sent to ${email}. Check your inbox or spam folder.`);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      const code = err?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
        setErrorMessage('Invalid email address or password. Please verify your credentials.');
      } else if (code === 'auth/wrong-password') {
        setErrorMessage('Incorrect password. Please try again or request a reset link.');
      } else if (code === 'auth/email-already-in-use') {
        setErrorMessage('An account with this email already exists. Please sign in instead.');
      } else if (code === 'auth/weak-password') {
        setErrorMessage('Password is too weak. Please use at least 6 characters.');
      } else if (code === 'auth/invalid-email') {
        setErrorMessage('Please enter a valid email address.');
      } else {
        setErrorMessage(err?.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-[#17283c] border border-stone-700 text-white w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8 overflow-hidden rounded-sm"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#f8dec3] via-[#e2c19d] to-[#f8dec3]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Brand Section */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <img
                src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
                alt="Cribb Hotel Crest"
                className="w-12 h-12 object-contain drop-shadow"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[#f8dec3] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase">
                Cribb Rewards &amp; Folio
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              {mode === 'signin' && 'Sign In to Your Account'}
              {mode === 'signup' && 'Join Cribb Rewards'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h3>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
              {mode === 'signin' && 'Access member reservations, digital room keys, and elite benefits.'}
              {mode === 'signup' && 'Earn 2,500 complimentary welcome points, best rate guarantees & suite upgrades.'}
              {mode === 'forgot' && 'Enter your email address to receive password recovery instructions.'}
            </p>
          </div>

          {/* Alert / Status Messages */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5 rounded-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
              <div className="flex-1 leading-snug">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-2.5 rounded-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
              <div className="flex-1 leading-snug">{successMessage}</div>
            </div>
          )}

          {/* Social Auth: Google Authentication */}
          {mode !== 'forgot' && (
            <div className="space-y-3 mb-5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-3 border border-stone-300 shadow-sm disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>
                  {mode === 'signin' ? 'Sign In with Google' : 'Sign Up with Google'}
                </span>
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-stone-700" />
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">
                  or continue with email
                </span>
                <div className="flex-1 h-px bg-stone-700" />
              </div>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alexander Wright"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 bg-white/10 border border-stone-600 focus:border-[#f8dec3] text-sm text-white focus:outline-none placeholder:text-stone-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="guest@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 bg-white/10 border border-stone-600 focus:border-[#f8dec3] text-sm text-white focus:outline-none placeholder:text-stone-500"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setErrorMessage('');
                        setSuccessMessage('');
                      }}
                      className="text-[11px] text-[#f8dec3] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-9 pr-10 bg-white/10 border border-stone-600 focus:border-[#f8dec3] text-sm text-white focus:outline-none placeholder:text-stone-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-stone-400 hover:text-white cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === 'signup' && (
                  <p className="text-[10px] text-stone-400 mt-1">
                    Must be at least 6 characters.
                  </p>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 bg-white/10 border border-stone-600 focus:border-[#f8dec3] text-sm text-white focus:outline-none placeholder:text-stone-500"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2 shadow-md"
            >
              <span>
                {isSubmitting
                  ? 'Processing...'
                  : mode === 'signin'
                  ? 'Sign In to Account'
                  : mode === 'signup'
                  ? 'Create Free Rewards Account'
                  : 'Send Password Reset'}
              </span>
              {!isSubmitting && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 pt-5 border-t border-stone-700 text-center text-xs text-stone-300 space-y-2">
            {mode === 'signin' && (
              <p>
                Don't have a Cribb account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-[#f8dec3] font-bold hover:underline cursor-pointer"
                >
                  Join Rewards &amp; Sign Up
                </button>
              </p>
            )}

            {mode === 'signup' && (
              <p>
                Already have a membership or account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-[#f8dec3] font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-[#f8dec3] font-bold hover:underline cursor-pointer"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
