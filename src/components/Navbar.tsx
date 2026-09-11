import React, { useState } from 'react';
import { Menu, X, Globe, Calendar, Phone, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenReserve: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReserve }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Our Story", href: "#story" },
    { label: "Destinations", href: "#destinations" },
    { label: "Rooms & Suites", href: "#rooms" },
    { label: "Experience", href: "#experience" },
    { label: "The Cribb Club", href: "#club" },
    { label: "Meetings & Events", href: "#events" }
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
          <span className="hover:text-white transition-colors cursor-pointer">Cribb Rewards: Join & Earn</span>
          <span className="text-stone-500">|</span>
          <span className="hover:text-white transition-colors cursor-pointer">Sign In</span>
          <span className="text-stone-500">|</span>
          <span className="text-[#f8dec3]">EN / USD ($)</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Hamburger Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#17283c] hover:text-[#0f1c2d] focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#faf9f6]">
              <div>
                <span className="text-xl font-serif tracking-[0.2em] font-bold text-[#17283c] uppercase">
                  CRIBB
                </span>
                <p className="text-[10px] tracking-widest text-[#54657a] uppercase">Hotels & Resorts</p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-4 flex-1 overflow-y-auto divide-y divide-stone-100">
              <div className="py-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-base font-medium text-[#17283c] hover:bg-stone-50 rounded-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="py-4 space-y-2 text-sm text-stone-600">
                <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 hover:text-[#17283c]">
                  Global Directory
                </a>
                <a href="#rewards" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 hover:text-[#17283c]">
                  Cribb Rewards Program
                </a>
                <div className="px-3 py-2 text-xs text-[#54657a] flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#17283c]" /> 24/7 Guest Care: +1 (800) 555-CRIBB
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-stone-200 bg-[#faf9f6]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReserve();
                }}
                className="w-full py-3 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] font-semibold text-sm tracking-wider uppercase text-center shadow transition-colors"
              >
                Reserve a Room
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
