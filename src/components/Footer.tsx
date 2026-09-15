import React from 'react';
import { Mail, Globe, Phone, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import { DESTINATIONS } from '../data/hotelData';
import { StaffMember } from '../types';

interface FooterProps {
  onOpenReserve: () => void;
  onOpenAdmin?: () => void;
  authorizedStaff?: StaffMember | null;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReserve, onOpenAdmin, authorizedStaff }) => {
  return (
    <footer className="bg-[#0f1c2d] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
                alt="Cribb Hotel Official Logo"
                className="w-12 h-12 object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-serif tracking-[0.25em] font-bold text-white uppercase leading-none">
                  CRIBB
                </span>
                <span className="text-xs tracking-[0.3em] text-[#f8dec3] uppercase mt-1 font-medium">
                  Hotels &amp; Resorts
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              The World’s Gathering Place. Where intuitive architecture, elevated culinary artistry, and authentic human connection create timeless experiences across six continents.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f8dec3]" />
                <span>Worldwide Reservations: +1 (800) 555-CRIBB</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f8dec3]" />
                <span>Official Cribb Best Rate Guarantee</span>
              </div>
            </div>
          </div>

          {/* Destinations Directory */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-4 border-b border-stone-800 pb-2">
              Featured Properties
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {DESTINATIONS.slice(0, 6).map((dest) => (
                <li key={dest.id}>
                  <button
                    onClick={onOpenReserve}
                    className="hover:text-white transition-colors text-left"
                  >
                    {dest.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Guest Services */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-4 border-b border-stone-800 pb-2">
              Guest Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onOpenReserve} className="hover:text-white transition-colors">
                  Find &amp; Reserve Rooms
                </button>
              </li>
              <li>
                <a href="#club" className="hover:text-white transition-colors">
                  The Cribb Club Lounge
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  The Community Table
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Meetings &amp; Banquets
                </a>
              </li>
              <li>
                <a href="#club" className="hover:text-white transition-colors">
                  Cribb Rewards Status
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Digital Key &amp; Mobile Check-In
                </span>
              </li>
              {authorizedStaff && onOpenAdmin && (
                <li className="pt-1">
                  <button
                    onClick={onOpenAdmin}
                    className="text-[#f8dec3] hover:text-white transition-colors cursor-pointer font-semibold flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Staff Portal ({authorizedStaff.name.split(' ')[0]})
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-4 border-b border-stone-800 pb-2">
              Cribb Brand
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#story" className="hover:text-white transition-colors">Our Global Story</a></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Sustainability &amp; Community</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Press &amp; Media Room</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Hospitality Careers</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Investor Relations</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclosures */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>© 2026 Cribb Hotels &amp; Resorts Worldwide. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="hover:text-white cursor-pointer">Privacy Statement</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Cribb Rewards Rules</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Digital Accessibility</span>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs text-[#f8dec3] hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
