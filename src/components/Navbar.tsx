import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, ArrowLeft, User, ChevronRight, ChevronDown, Calendar, Globe, ShieldCheck, X, LogOut, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { smoothScrollTo } from '../utils/scroll';
import { StaffMember } from '../types';
import { useAuth } from '../context/AuthContext';
import { AuthModal, AuthModalMode } from './AuthModal';

interface NavbarProps {
  onOpenReserve: () => void;
  onOpenAdmin?: () => void;
  authorizedStaff?: StaffMember | null;
  onStaffLogout?: () => void;
  onOpenStaffLogin?: () => void;
  onOpenAuth?: (mode?: AuthModalMode, email?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenReserve, 
  onOpenAdmin,
  authorizedStaff,
  onStaffLogout,
  onOpenStaffLogin,
  onOpenAuth
}) => {
  const { user, profile, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [experienceExpanded, setExperienceExpanded] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('signin');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to dismiss menu or modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (userDropdownOpen) setUserDropdownOpen(false);
        else if (showSignInModal) setShowSignInModal(false);
        else if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, showSignInModal, userDropdownOpen]);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      smoothScrollTo(href);
    }, 280);
  };

  const openAuth = (mode: AuthModalMode = 'signin') => {
    if (onOpenAuth) {
      onOpenAuth(mode);
    } else {
      setAuthModalMode(mode);
      setShowSignInModal(true);
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

  const userDisplayName = profile?.displayName || user?.displayName || (user?.email ? user.email.split('@')[0] : 'Guest');
  const userInitial = userDisplayName.charAt(0).toUpperCase();

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
          {authorizedStaff && onOpenAdmin && (
            <div className="flex items-center gap-2.5 bg-white/10 px-2.5 py-0.5 rounded border border-[#f8dec3]/30">
              <button 
                onClick={onOpenAdmin}
                className="text-[#f8dec3] hover:text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                title="Open Staff Operations Portal"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Staff Portal ({authorizedStaff.name.split(' ')[0]})
              </button>
              {onStaffLogout && (
                <button
                  onClick={onStaffLogout}
                  className="text-[10px] text-stone-400 hover:text-white uppercase tracking-wider"
                  title="Sign Out Staff"
                >
                  Exit
                </button>
              )}
            </div>
          )}

          {/* User Account State */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)} 
                className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-stone-200 group"
              >
                <div className="w-5 h-5 rounded-full bg-[#f8dec3] text-[#17283c] flex items-center justify-center font-bold text-[10px] uppercase">
                  {userInitial}
                </div>
                <span className="font-semibold text-[#f8dec3] max-w-[130px] truncate">
                  {userDisplayName}
                </span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-stone-300">
                  {profile?.tier || 'Member'} • {(profile?.rewardPoints ?? 2500).toLocaleString()} pts
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-white transition-transform" />
              </button>

              {/* Guest Account Dropdown Popover */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#17283c] border border-stone-700 shadow-2xl p-4 text-white z-50 animate-in fade-in zoom-in-95 duration-150 normal-case tracking-normal rounded-sm">
                  <div className="pb-3 border-b border-stone-700">
                    <div className="text-xs font-bold text-white truncate">
                      {userDisplayName}
                    </div>
                    <div className="text-[11px] text-stone-400 truncate">{user.email}</div>
                    <div className="mt-2 text-[10px] font-mono text-[#f8dec3] bg-black/30 px-2 py-1 rounded flex items-center justify-between">
                      <span>MEMBERSHIP ID:</span>
                      <span className="font-bold">{profile?.membershipNumber || 'CRB-849201'}</span>
                    </div>
                  </div>

                  <div className="py-2.5 space-y-1">
                    <div className="flex items-center justify-between text-xs py-1 text-stone-300">
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#f8dec3]" />
                        Status Tier
                      </span>
                      <span className="font-bold text-[#f8dec3]">{profile?.tier || 'Member'}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1 text-stone-300">
                      <span>Rewards Balance</span>
                      <span className="font-bold text-white font-mono">{(profile?.rewardPoints ?? 2500).toLocaleString()} pts</span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-stone-700 space-y-2">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenReserve();
                      }}
                      className="w-full py-2 px-3 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-wider text-center cursor-pointer transition-colors block"
                    >
                      Make a Reservation
                    </button>
                    <button
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await logOut();
                      }}
                      className="w-full py-1.5 text-[11px] text-stone-400 hover:text-red-300 uppercase tracking-wider text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3 h-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button 
                onClick={() => openAuth('signup')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Cribb Rewards: Join &amp; Earn
              </button>
              <span className="text-stone-500">|</span>
              <button 
                onClick={() => openAuth('signin')} 
                className="hover:text-white transition-colors cursor-pointer font-bold text-[#f8dec3]"
              >
                Sign In
              </button>
            </>
          )}

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
            <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group text-left">
              <img
                src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
                alt="Cribb Hotel Official Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif tracking-[0.22em] font-bold text-[#17283c] uppercase leading-none group-hover:text-[#0f1c2d]">
                  CRIBB
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#54657a] uppercase mt-1 font-medium">
                  Hotels &amp; Resorts
                </span>
              </div>
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
            {!user && (
              <button
                onClick={() => openAuth('signin')}
                className="hidden sm:flex lg:hidden items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#17283c] border border-stone-300 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
            <button
              onClick={onOpenReserve}
              id="header-reserve-button"
              className="px-4 sm:px-6 py-2.5 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-sm transition-all duration-200 active:scale-95 flex items-center gap-2 border border-[#edd0b2] cursor-pointer"
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
                    <div className="w-10 h-10 relative flex items-center justify-center mb-1">
                      <img
                        src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
                        alt="Cribb Hotel Official Logo"
                        className="w-full h-full object-contain drop-shadow-md"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.3em] text-white uppercase">
                      CRIBB
                    </span>
                  </div>

                  {/* User Account Link (Right): Icon + Status or Sign In */}
                  {user ? (
                    <div className="flex items-center gap-2 py-1 px-1">
                      <div className="w-8 h-8 rounded-full bg-[#f8dec3] text-[#17283c] flex items-center justify-center font-bold text-xs uppercase shadow">
                        {userInitial}
                      </div>
                      <div className="text-left leading-tight hidden xs:block">
                        <div className="text-xs font-bold text-white truncate max-w-[100px]">
                          {userDisplayName}
                        </div>
                        <div className="text-[10px] text-[#fbe1c9]">
                          {(profile?.rewardPoints ?? 2500).toLocaleString()} pts
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          logOut();
                        }}
                        className="text-[10px] text-stone-400 hover:text-white uppercase tracking-wider px-2 py-1 bg-white/10 rounded cursor-pointer"
                        title="Sign Out"
                      >
                        Exit
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuth('signin');
                      }}
                      id="mobile-nav-signin-button"
                      className="flex items-center gap-1.5 text-white hover:text-[#fbe1c9] transition-colors py-2 px-1 focus:outline-none cursor-pointer"
                    >
                      <User className="w-4 h-4 text-white" />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-sans whitespace-nowrap">
                        SIGN IN OR JOIN
                      </span>
                    </button>
                  )}
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

                  {/* STAFF / ADMIN PORTAL - ONLY visible if authorizedStaff is logged in */}
                  {authorizedStaff && onOpenAdmin && (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="pt-2 border-t border-stone-800"
                    >
                      <div className="flex items-center justify-between py-1">
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onOpenAdmin();
                          }}
                          className="text-left text-sm font-bold tracking-[0.15em] text-[#fbe1c9] uppercase flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          STAFF PORTAL ({authorizedStaff.name.split(' ')[0]})
                        </button>
                        {onStaffLogout && (
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              onStaffLogout();
                            }}
                            className="text-[10px] text-stone-400 hover:text-white uppercase tracking-wider px-2 py-1 bg-white/10 rounded"
                          >
                            Exit
                          </button>
                        )}
                      </div>
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
      <AuthModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        initialMode={authModalMode}
        onOpenStaffPortal={onOpenStaffLogin}
      />
    </header>
  );
};

