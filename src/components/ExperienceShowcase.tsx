import React, { useState } from 'react';
import { Bed, Utensils, CalendarDays, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ROOM_OPTIONS } from '../data/hotelData';

interface ExperienceShowcaseProps {
  onOpenReserve: () => void;
}

export const ExperienceShowcase: React.FC<ExperienceShowcaseProps> = ({ onOpenReserve }) => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'dining' | 'events' | 'wellness'>('rooms');

  return (
    <section id="rooms" className="py-20 lg:py-28 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-[0.25em] text-[#54657a] uppercase block mb-2">
            Experience Cribb
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#17283c] font-medium tracking-tight">
            Designed for Every Moment
          </h2>
          <div className="w-16 h-[2px] bg-[#f8dec3] mx-auto my-5" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Discover thoughtfully appointed rooms, inspired culinary venues, and grand celebratory spaces crafted to elevate every facet of your journey.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 flex-wrap">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                activeTab === 'rooms'
                  ? 'bg-[#17283c] text-white border-[#17283c] shadow'
                  : 'bg-stone-50 text-[#17283c] border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Bed className="w-4 h-4" />
              <span>Rooms &amp; Suites</span>
            </button>

            <button
              onClick={() => setActiveTab('dining')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                activeTab === 'dining'
                  ? 'bg-[#17283c] text-white border-[#17283c] shadow'
                  : 'bg-stone-50 text-[#17283c] border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Dining &amp; Bars</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                activeTab === 'events'
                  ? 'bg-[#17283c] text-white border-[#17283c] shadow'
                  : 'bg-stone-50 text-[#17283c] border-stone-200 hover:bg-stone-100'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Meetings &amp; Events</span>
            </button>

            <button
              onClick={() => setActiveTab('wellness')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                activeTab === 'wellness'
                  ? 'bg-[#17283c] text-white border-[#17283c] shadow'
                  : 'bg-stone-50 text-[#17283c] border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Spa &amp; Wellness</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Rooms & Suites */}
        {activeTab === 'rooms' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ROOM_OPTIONS.slice(0, 3).map((room) => (
                <div 
                  key={room.id}
                  className="bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="h-60 overflow-hidden relative">
                    <img 
                      src={room.imageUrl} 
                      alt={room.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-[#17283c] text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-1">
                      {room.size}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-[#54657a] uppercase tracking-wider block">
                        {room.category}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#17283c] mt-1 mb-2">
                        {room.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                        {room.features[0]}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">From</span>
                        <span className="text-xl font-serif font-bold text-[#17283c]">${room.pricePerNight}</span>
                        <span className="text-xs text-stone-500"> / night</span>
                      </div>
                      <button
                        onClick={onOpenReserve}
                        className="px-4 py-2 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-wider transition-colors border border-[#edd0b2]"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={onOpenReserve}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#17283c] hover:underline"
              >
                <span>View All Accommodations &amp; Club Suites</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Dining & Bars */}
        {activeTab === 'dining' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#54657a] uppercase tracking-widest block mb-1">
                  Gastronomy &amp; Mixology
                </span>
                <h3 className="text-3xl font-serif font-bold text-[#17283c]">
                  &amp;More by Cribb &amp; Culinary Destinations
                </h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                Experience a dining program inspired by local terroir and international craft. 
                From our signature coffee bar in the morning to dry-aged steaks and rare reserve vintages at night, every plate tells a story.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-[#17283c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#17283c]">&amp;More Lounge</h4>
                    <p className="text-xs text-stone-600">Fresh pastries, pour-over specialty roasts, transition cocktails &amp; shareable tapas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-[#17283c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#17283c]">The Heritage Grill</h4>
                    <p className="text-xs text-stone-600">Prime coastal seafood and heritage cuts paired with an award-winning international cellar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-[#17283c] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#17283c]">Azure Rooftop &amp; Terrace</h4>
                    <p className="text-xs text-stone-600">Elevated open-air mixology, live acoustic sessions, and skyline panorama.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenReserve}
                className="px-6 py-3 bg-[#17283c] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#0f1c2d] transition-colors"
              >
                Reserve Table / Inquire Dining
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 h-[420px]">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" 
                alt="Fine dining at Cribb" 
                className="w-full h-full object-cover shadow"
              />
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
                alt="Dining ambiance" 
                className="w-full h-full object-cover shadow mt-8"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Meetings & Events */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
            <div className="h-96 relative overflow-hidden shadow">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80" 
                alt="Grand Ballroom Event" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#f8dec3]">Capacities up to 800 Guests</span>
                  <h4 className="text-2xl font-serif font-bold">The Grand Cribb Ballroom</h4>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-[#54657a] uppercase tracking-widest block mb-1">
                  Connect &amp; Collaborate
                </span>
                <h3 className="text-3xl font-serif font-bold text-[#17283c]">
                  Unforgettable Meetings, Conferences &amp; Weddings
                </h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                From high-stakes international summits to intimate celebrations and weddings, our dedicated event specialists ensure every moment is executed with seamless precision.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-stone-50 border border-stone-200">
                  <span className="text-2xl font-serif font-bold text-[#17283c]">3,500 m²</span>
                  <p className="text-xs text-stone-500 mt-1">Flexible event &amp; exhibition spaces</p>
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200">
                  <span className="text-2xl font-serif font-bold text-[#17283c]">4K + Hybrid</span>
                  <p className="text-xs text-stone-500 mt-1">Integrated AV &amp; telepresence studios</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenReserve}
                  className="px-6 py-3 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest transition-colors border border-[#edd0b2]"
                >
                  Request Event Proposal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Spa & Wellness */}
        {activeTab === 'wellness' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-[#54657a] uppercase tracking-widest block mb-1">
                  Recharge &amp; Rebalance
                </span>
                <h3 className="text-3xl font-serif font-bold text-[#17283c]">
                  Serenity Spa &amp; 24/7 Fitness Center
                </h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                Maintain your wellness ritual on the road with state-of-the-art TechnoGym cardiovascular equipment, bespoke massage therapies, sauna, and temperature-controlled swimming pools.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>24-Hour accessible guest fitness center with personal trainers on call</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Hydrotherapy suites, steam rooms, and Swedish deep tissue therapy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Outdoor heated infinity pool with private shaded cabanas</span>
                </li>
              </ul>

              <button
                onClick={onOpenReserve}
                className="px-6 py-3 bg-[#17283c] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#0f1c2d] transition-colors"
              >
                Inquire Spa Appointments
              </button>
            </div>

            <div className="h-96 overflow-hidden shadow">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" 
                alt="Spa and pool sanctuary" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
