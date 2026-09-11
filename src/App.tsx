/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { AutoScrollSection1 } from './components/AutoScrollSection1';
import { ExperienceShowcase } from './components/ExperienceShowcase';
import { AutoScrollSection2 } from './components/AutoScrollSection2';
import { RewardsSection } from './components/RewardsSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { AiConciergeChat } from './components/AiConciergeChat';
import { ReservationParams } from './types';

export default function App() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [reserveParams, setReserveParams] = useState<Partial<ReservationParams> | undefined>(undefined);
  const [conciergeQuery, setConciergeQuery] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#17283c] flex flex-col font-sans selection:bg-[#f8dec3] selection:text-[#17283c]">
      {/* Navigation Bar */}
      <Navbar onOpenReserve={() => handleOpenReserve()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with The World's Gathering Place & Reservation Teaser */}
        <HeroSection onOpenReserve={handleOpenReserve} />

        {/* Philosophy & Story: Where the world comes together */}
        <StorySection onOpenReserve={() => handleOpenReserve()} />

        {/* Auto Scroll Section 1 (3 images, 3s cycle, unique fade-in animation) */}
        <AutoScrollSection1 onOpenReserve={() => handleOpenReserve()} />

        {/* Experience Cribb (Rooms, Dining, Events, Spa) */}
        <ExperienceShowcase onOpenReserve={() => handleOpenReserve()} />

        {/* Auto Scroll Section 2 (8 images, 3s cycle, unique fade-in animation) */}
        <AutoScrollSection2 onOpenReserve={() => handleOpenReserve()} />

        {/* Cribb Rewards & Loyalty Section */}
        <RewardsSection onOpenReserve={() => handleOpenReserve()} />
      </main>

      {/* Global Luxury Footer */}
      <Footer onOpenReserve={() => handleOpenReserve()} />

      {/* Interactive Reservation Modal (Matches Reserve Now click design) */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={handleCloseReserve}
        initialParams={reserveParams}
        onAskConcierge={handleAskConcierge}
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
