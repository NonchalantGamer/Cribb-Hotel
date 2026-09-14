import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, ArrowLeft, User, ChevronRight, ChevronDown, Calendar, Globe, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { smoothScrollTo } from '../utils/scroll';

interface NavbarProps {
  onOpenReserve: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReserve, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [experienceExpanded, setExperienceExpanded] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  // Prevent background scroll when mobile menu or modal is open
  useEffect(() => {
    if (mobileMenuOpen || showSignInModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, showSignInModal]);

  // Handle ESC key to dismiss menu or modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSignInModal) setShowSignInModal(false);
        else if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, showSignInModal]);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      smoothScrollTo(href);
    }, 280);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail) {
      setAuthSuccess(true);
      setTimeout(() => {
        setAuthSuccess(false);
        setShowSignInModal(false);
        setMobileMenuOpen(false);
      }, 1800);
    }
  };

  const navLinks = [
    { label: "Our Story", href: "#story" },
    { label: "Destinations", href: "#destinations" },
    { label: "Rooms & Suites", href: "#rooms" },
    { label: "Experience", href: "#rooms" },
    { label: "The Cribb Club", href: "#club" },
    { label: "Meetings & Events", href: "#rooms" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Utility Bar (Desktop only) */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-xs tracking-wider uppercase bg-[#17283c] text-stone-300 font-medium">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Globe className="w-3.5 h-3.5 text-[#f8dec3]" /> Global Destinations
          </span>
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f8dec3]" /> Best Rate Guarantee
          </span>
        </div>
        <div className="flex items-center gap-6">
          {onOpenAdmin && (
            <button 
              onClick={onOpenAdmin}
              className="text-[#f8dec3] hover:text-white font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Staff / Admin Portal
            </button>
          )}
          <span 
            onClick={() => setShowSignInModal(true)} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cribb Rewards: Join & Earn
          </span>
          <span className="text-stone-500">|</span>
          <span 
            onClick={() => setShowSignInModal(true)} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </span>
          <span className="text-stone-500">|</span>
          <span className="text-[#f8dec3]">EN / USD ($)</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Menu Trigger Button (Accessible across all viewport widths) */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              id="mobile-nav-toggle-button"
              className="p-2 -ml-2 text-[#17283c] hover:text-[#0f1c2d] focus:outline-none transition-colors group cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 group-hover:scale-105 transition-transform" />
            </button>
          </div>

          {/* Brand Logo / Wordmark */}
          <div className="flex items-center">
            <a href="#" className="flex flex-col items-center group text-center">
              <span className="text-2xl sm:text-3xl font-serif tracking-[0.25em] font-bold text-[#17283c] uppercase leading-none group-hover:text-[#0f1c2d]">
                CRIBB
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#54657a] uppercase mt-1 font-medium">
                Hotels &amp; Resorts
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#17283c] hover:text-[#0f1c2d] tracking-wide relative py-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#f8dec3] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Reserve CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReserve}
              id="header-reserve-button"
              className="px-4 sm:px-6 py-2.5 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-sm transition-all duration-200 active:scale-95 flex items-center gap-2 border border-[#edd0b2]"
            >
              <Calendar className="w-4 h-4 hidden sm:inline-block" />
              <span>Reserve Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu with smooth horizontal sideways in-and-out transition */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <div 
              id="navigation-menu-portal"
              className="fixed inset-0 z-[9999] flex"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              {/* Dimmed backdrop overlay that fades in/out and closes when clicked */}
              <motion.div
                key="menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/75 backdrop-blur-xs"
                aria-hidden="true"
              />

              {/* Drawer Menu sliding strictly sideways (horizontal x-axis only) */}
              <motion.div 
                key="menu-drawer-panel"
                id="mobile-navigation-overlay"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ 
                  duration: 0.38, 
                  ease: [0.32, 0.72, 0, 1] 
                }}
                className="relative z-10 w-full sm:max-w-md md:max-w-lg bg-black text-white flex flex-col min-h-[100dvh] h-[100dvh] shadow-2xl overflow-y-auto"
              >
                {/* Top Header Bar */}
                <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-stone-800/60 bg-black">
                  {/* Back / Close Button (Left) with charcoal container and thin white left arrow */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    id="mobile-nav-back-button"
                    className="w-11 h-11 bg-[#333333] hover:bg-[#404040] active:bg-[#262626] text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                    aria-label="Back to page"
                  >
                    <ArrowLeft className="w-5 h-5 stroke-[2]" />
                  </button>

                  {/* Brand Logo & Circular Emblem (Center) */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 relative flex items-center justify-center mb-0.5">
                      <svg viewBox="0 0 40 40" className="w-full h-full text-white" fill="none" stroke="currentColor">
                        <circle cx="20" cy="20" r="17" strokeWidth="1.2" strokeDasharray="3 2" className="opacity-40" />
                        <path d="M12 28 C9 24 9 16 13 11 C15 9 18 8 20 8 M28 28 C31 24 31 16 27 11 C25 9 22 8 20 8" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M11 16 C9 15 8 13 9 11 C11 11 13 13 13 15 M29 16 C31 15 32 13 31 11 C29 11 27 13 27 15" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 22 C8 21 7 19 8 18 C10 18 11 20 11 21 M30 22 C32 21 33 19 32 18 C30 18 29 20 29 21" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 27 C11 27 10 25 11 24 C13 24 14 25 14 26 M27 27 C29 27 30 25 29 24 C27 24 26 25 26 26" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="absolute font-serif font-bold text-[13px] text-white leading-none">C</span>
                    </div>
                    <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.3em] text-white uppercase">
                      CRIBB
                    </span>
                  </div>

                  {/* User Account Link (Right): Icon + "SIGN IN OR JOIN" */}
                  <button
                    onClick={() => setShowSignInModal(true)}
                    id="mobile-nav-signin-button"
                    className="flex items-center gap-1.5 text-white hover:text-[#fbe1c9] transition-colors py-2 px-1 focus:outline-none cursor-pointer"
                  >
                    <User className="w-4 h-4 text-white" />
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-sans whitespace-nowrap">
                      SIGN IN OR JOIN
                    </span>
                  </button>
                </div>

                {/* Full-width Call-To-Action "RESERVE NOW" Button with soft peach color and flat 90-degree corners */}
                <div className="flex-shrink-0 px-4 sm:px-6 pt-5 pb-8">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenReserve();
                    }}
                    id="mobile-nav-reserve-now-btn"
                    className="w-full py-4 bg-[#fbe1c9] hover:bg-[#edd0b2] active:bg-[#e4c4a4] text-[#111111] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-none transition-all duration-150 active:scale-[0.99] text-center shadow-none border-none cursor-pointer"
                  >
                    RESERVE NOW
                  </button>
                </div>

                {/* Primary Navigation Menu List (Vertically stacked with smooth sideways entry) */}
                <motion.nav 
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.12
                      }
                    },
                    hidden: {
                      transition: {
                        staggerChildren: 0.03,
                        staggerDirection: -1
                      }
                    }
                  }}
                  className="px-5 sm:px-7 space-y-7 sm:space-y-8 flex-1 overflow-y-auto"
                >
                  {/* DESTINATIONS */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <a
                      href="#destinations"
                      onClick={(e) => handleMobileNavClick(e, '#destinations')}
                      className="block text-base sm:text-lg font-bold tracking-[0.12em] text-white uppercase hover:text-[#fbe1c9] transition-colors"
                    >
                      DESTINATIONS
                    </a>
                  </motion.div>

                  {/* EXPERIENCE (with small thin right chevron on the far right) */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <div
                      onClick={() => setExperienceExpanded(!experienceExpanded)}
                      className="flex items-center justify-between text-base sm:text-lg font-bold tracking-[0.12em] text-white uppercase cursor-pointer hover:text-[#fbe1c9] transition-colors"
                    >
                      <span>EXPERIENCE</span>
                      {experienceExpanded ? (
                        <ChevronDown className="w-5 h-5 text-white stroke-[1.5]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-white stroke-[1.5]" />
                      )}
                    </div>

                    {/* Sub-menu accordion when Experience is expanded - horizontal slide animation */}
                    <AnimatePresence>
                      {experienceExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="pl-4 pt-3 space-y-3.5 text-xs uppercase tracking-widest text-stone-300 border-l border-stone-800 ml-1 mt-2"
                        >
                          <a
                            href="#rooms"
                            onClick={(e) => handleMobileNavClick(e, '#rooms')}
                            className="block hover:text-white"
                          >
                            Rooms &amp; Suites
                          </a>
                          <a
                            href="#rooms"
                            onClick={(e) => handleMobileNavClick(e, '#rooms')}
                            className="block hover:text-white"
                          >
                            Dining &amp; Bars
                          </a>
                          <a
                            href="#rooms"
                            onClick={(e) => handleMobileNavClick(e, '#rooms')}
                            className="block hover:text-white"
                          >
                            Meetings &amp; Events
                          </a>
                          <a
                            href="#rooms"
                            onClick={(e) => handleMobileNavClick(e, '#rooms')}
                            className="block hover:text-white"
                          >
                            Spa &amp; Wellness
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* ABOUT US */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <a
                      href="#story"
                      onClick={(e) => handleMobileNavClick(e, '#story')}
                      className="block text-base sm:text-lg font-bold tracking-[0.12em] text-white uppercase hover:text-[#fbe1c9] transition-colors"
                    >
                      ABOUT US
                    </a>
                  </motion.div>

                  {/* STORE */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <a
                      href="#club"
                      onClick={(e) => handleMobileNavClick(e, '#club')}
                      className="block text-base sm:text-lg font-bold tracking-[0.12em] text-white uppercase hover:text-[#fbe1c9] transition-colors"
                    >
                      STORE
                    </a>
                  </motion.div>

                  {/* STAFF / ADMIN PORTAL */}
                  {onOpenAdmin && (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="pt-2 border-t border-stone-800"
                    >
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenAdmin();
                        }}
                        className="w-full text-left text-sm font-bold tracking-[0.15em] text-[#fbe1c9] uppercase flex items-center justify-between hover:text-white transition-colors cursor-pointer py-1"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          STAFF / ADMIN PORTAL
                        </span>
                        <ChevronRight className="w-4 h-4 text-stone-400" />
                      </button>
                    </motion.div>
                  )}
                </motion.nav>

                {/* Lower area stays clean solid black, matching the reference screenshot */}
                <div className="h-16 w-full flex-shrink-0 bg-black" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Sign In / Join Rewards Modal */}
      {showSignInModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#17283c] border border-stone-700 text-white w-full max-w-md p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#f8dec3] block mb-1">
                CRIBB REWARDS
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">Sign In or Join</h3>
              <p className="text-xs text-stone-300 mt-2">
                Access member exclusive rates, digital key check-in, and complimentary suite upgrades.
              </p>
            </div>

            {authSuccess ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs text-center rounded-sm">
                ✓ Success! Welcome back to Cribb Rewards. Redirecting...
              </div>
            ) : (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-300 mb-1">
                    Email or Membership Number
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full h-11 px-3 bg-white/10 border border-stone-600 focus:border-[#f8dec3] text-sm text-white focus:outline-none placeholder:text-stone-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  Continue to Cribb Account
                </button>

                <p className="text-[10px] text-stone-400 text-center">
                  By continuing, you agree to the Cribb Hotels Terms of Service and Rewards Membership Policy.
                </p>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

