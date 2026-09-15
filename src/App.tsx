/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { AutoScrollSection1 } from './components/AutoScrollSection1';
import { ExperienceShowcase } from './components/ExperienceShowcase';
import { AutoScrollSection2 } from './components/AutoScrollSection2';
import { RewardsSection } from './components/RewardsSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { AdminPortal } from './components/AdminPortal';
import { AiConciergeChat } from './components/AiConciergeChat';
import { AuthModal, AuthModalMode } from './components/AuthModal';
import { ScrollReveal } from './components/ScrollReveal';
import { ReservationParams, StaffMember } from './types';
import { smoothScrollTo } from './utils/scroll';

export default function App() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthModalMode>('signin');
  const [authInitialEmail, setAuthInitialEmail] = useState('');
  const [reserveParams, setReserveParams] = useState<Partial<ReservationParams> | undefined>(undefined);
  const [conciergeQuery, setConciergeQuery] = useState<string | null>(null);

  // Centralized Staff Authentication State
  const [authorizedStaff, setAuthorizedStaff] = useState<StaffMember | null>(() => {
    try {
      const saved = localStorage.getItem('cribb_staff_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleStaffChange = (staff: StaffMember | null) => {
    setAuthorizedStaff(staff);
    if (staff) {
      try {
        localStorage.setItem('cribb_staff_session', JSON.stringify(staff));
      } catch {}
    } else {
      try {
        localStorage.removeItem('cribb_staff_session');
      } catch {}
    }
  };

  // Listen for #staff / #admin deep link or Ctrl+Shift+S shortcut for authorized team access
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#staff') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Hotkey: Ctrl+Shift+S or Cmd+Shift+S opens Staff Access
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Global smooth scroll behavior for any navigation links or anchor clicks
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Special handling for administrative hashes
      if (href === '#admin' || href === '#staff') {
        e.preventDefault();
        setIsAdminOpen(true);
        return;
      }

      e.preventDefault();
      smoothScrollTo(href);

      // Update URL hash cleanly without instant jump cut
      if (href.length > 1) {
        window.history.pushState(null, '', href);
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const handleOpenReserve = (initialParams?: Partial<ReservationParams>) => {
    if (initialParams) {
      setReserveParams(initialParams);
    }
    setIsReserveOpen(true);
  };

  const handleCloseReserve = () => {
    setIsReserveOpen(false);
  };

  const handleAskConcierge = (prompt: string) => {
    setConciergeQuery(prompt);
  };

  const handleOpenAuth = (mode: AuthModalMode = 'signin', email: string = '') => {
    setAuthMode(mode);
    setAuthInitialEmail(email);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#17283c] flex flex-col font-sans selection:bg-[#f8dec3] selection:text-[#17283c]">
      {/* Navigation Bar - Staff Portal button hidden for ordinary guests */}
      <Navbar 
        onOpenReserve={() => handleOpenReserve()} 
        onOpenAdmin={() => setIsAdminOpen(true)}
        authorizedStaff={authorizedStaff}
        onStaffLogout={() => handleStaffChange(null)}
        onOpenStaffLogin={() => setIsAdminOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with The World's Gathering Place & Reservation Teaser */}
        <HeroSection onOpenReserve={handleOpenReserve} />

        {/* Philosophy & Story: Where the world comes together */}
        <ScrollReveal threshold={0.1} rootMargin="0px 0px -50px 0px" duration={750} distance={24}>
          <StorySection onOpenReserve={() => handleOpenReserve()} />
        </ScrollReveal>

        {/* Auto Scroll Section 1 (3 images, 3s cycle, unique fade-in animation) */}
        <ScrollReveal threshold={0.1} rootMargin="0px 0px -50px 0px" duration={750} distance={24}>
          <AutoScrollSection1 onOpenReserve={() => handleOpenReserve()} />
        </ScrollReveal>

        {/* Experience Cribb (Rooms, Dining, Events, Spa) */}
        <ScrollReveal threshold={0.06} rootMargin="0px 0px -50px 0px" duration={750} distance={24}>
          <ExperienceShowcase onOpenReserve={() => handleOpenReserve()} />
        </ScrollReveal>

        {/* Auto Scroll Section 2 (8 images, 3s cycle, unique fade-in animation) */}
        <ScrollReveal threshold={0.1} rootMargin="0px 0px -50px 0px" duration={750} distance={24}>
          <AutoScrollSection2 onOpenReserve={() => handleOpenReserve()} />
        </ScrollReveal>

        {/* Cribb Rewards & Loyalty Section */}
        <ScrollReveal threshold={0.1} rootMargin="0px 0px -50px 0px" duration={750} distance={24}>
          <RewardsSection 
            onOpenReserve={() => handleOpenReserve()} 
            onOpenAuth={handleOpenAuth}
          />
        </ScrollReveal>
      </main>

      {/* Global Luxury Footer - Staff portal link hidden for ordinary guests */}
      <ScrollReveal threshold={0.05} rootMargin="0px 0px -40px 0px" duration={700} distance={20}>
        <Footer 
          onOpenReserve={() => handleOpenReserve()} 
          onOpenAdmin={() => setIsAdminOpen(true)}
          authorizedStaff={authorizedStaff}
        />
      </ScrollReveal>

      {/* Guest Authentication Modal (Google Sign In / Email Sign Up / Login) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        initialEmail={authInitialEmail}
        onOpenStaffPortal={() => {
          setIsAuthOpen(false);
          setIsAdminOpen(true);
        }}
      />

      {/* Interactive Reservation Modal (Matches Reserve Now click design) */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={handleCloseReserve}
        initialParams={reserveParams}
        onAskConcierge={handleAskConcierge}
      />

      {/* Hotel Staff & Operational Admin Portal (Protected by Staff Verification Gate) */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        authorizedStaff={authorizedStaff}
        onStaffChange={handleStaffChange}
      />

      {/* AI Integrated Real-Time Customer Support / Concierge with RAG */}
      <AiConciergeChat
        onOpenReserve={() => handleOpenReserve()}
        initialQuery={conciergeQuery}
        onClearInitialQuery={() => setConciergeQuery(null)}
      />
    </div>
  );
}
