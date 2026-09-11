import React from 'react';
import { Users, Coffee, Crown, ArrowRight } from 'lucide-react';
import { PILLARS } from '../data/hotelData';

interface StorySectionProps {
  onOpenReserve: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onOpenReserve }) => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#faf9f6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <span className="text-xs font-bold tracking-[0.25em] text-[#54657a] uppercase block mb-3">
            The Cribb Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#17283c] font-medium leading-tight">
            Where the world comes together
          </h2>
          <div className="w-16 h-[2px] bg-[#f8dec3] mx-auto my-6" />
          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            At Cribb Hotel, we believe in the transformative power of human connection. 
            Across iconic city skylines and serene coastal resorts, we curate spaces where travelers, 
            local visionaries, and global communities gather to celebrate, collaborate, and belong.
          </p>
        </div>

        {/* The 3 Signature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {PILLARS.map((pillar, index) => (
            <div 
              key={index}
              className="bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 bg-white/95 text-[#17283c] text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-sm">
                  Signature 0{index + 1}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#17283c] mb-3 group-hover:text-[#0f1c2d] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#17283c] group-hover:underline flex items-center gap-1.5">
                    Discover Space <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Banner Callout */}
        <div className="mt-16 bg-[#17283c] text-white p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-md">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f8dec3] block mb-2">
              Intuitive Hospitality
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-medium">
              Spaces thoughtfully designed for conversation, focus, and celebration.
            </h3>
            <p className="text-stone-300 text-sm mt-2 leading-relaxed">
              Experience sound-proof acoustic pods, communal power bars, and bespoke culinary transitions from dawn until evening.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button
              onClick={onOpenReserve}
              className="px-8 py-3.5 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow text-center"
            >
              Plan Your Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
