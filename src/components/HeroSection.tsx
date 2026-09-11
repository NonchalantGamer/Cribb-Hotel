import React, { useState } from 'react';
import { Search, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { ReservationParams } from '../types';

interface HeroSectionProps {
  onOpenReserve: (initialParams?: Partial<ReservationParams>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReserve }) => {
  // Current date strings for default preview
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 3);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenReserve({
      destination: destination || "All Cribb Hotels & Resorts",
      checkIn,
      checkOut
    });
  };

  return (
    <section className="hero-component carousel-component home relative w-full min-h-[720px] lg:h-[800px] overflow-hidden bg-white text-stone-900 select-none">
      {/* Background Image Carousel Track */}
      <div className="slides slick-initialized slick-slider accessible-slick absolute inset-0 w-full h-full" role="region" aria-label="carousel">
        <div className="slick-list draggable w-full h-full overflow-hidden">
          <div className="slick-track w-full h-full">
            <div className="slide is-style-image slick-slide slick-current slick-active w-full h-full" role="group" aria-label="slide 1">
              <div className="background relative w-full h-full">
                <div className="image w-full h-full">
                  <picture className="block w-full h-full">
                    <source srcSet="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85" media="(min-width: 1024px)" />
                    <source srcSet="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80" media="(min-width: 640px)" />
                    <img 
                      src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85" 
                      alt="Lobby area seating at Cribb Hotel" 
                      className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
                    />
                  </picture>
                </div>
                {/* Subtle scrim overlay for optimal contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10 pointer-events-none" />

                {/* Heading Box (The World's Gathering Place) */}
                <div className="heading-wrapper absolute z-20 left-4 sm:left-12 lg:left-24 top-20 sm:top-28 lg:top-36 max-w-[90%] sm:max-w-md">
                  <div className="heading-container bg-[#efeae4]/95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-[0px_5px_15px_rgba(0,0,0,0.18)] border-l-4 border-[#17283c]">
                    <h1 className="heading text-3xl sm:text-4xl lg:text-[44px] font-serif font-medium text-[#17283c] leading-[1.1] tracking-tight">
                      The World’s Gathering Place
                    </h1>
                    <p className="mt-3 text-xs sm:text-sm text-[#54657a] font-sans leading-relaxed">
                      Where vibrant global communities, visionary travelers, and timeless luxury connect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Component / Advanced Teaser Bar */}
      <div className="reservation-component advanced show relative z-30 lg:absolute lg:bottom-10 left-0 right-0 w-full px-4 sm:px-6 lg:px-8 mt-[460px] lg:mt-0 pb-8 lg:pb-0">
        <div 
          id="pacsys-reservations-modal-55" 
          className="component pacsys_container-none max-w-6xl mx-auto bg-white shadow-[0px_10px_35px_rgba(0,0,0,0.18)] border border-stone-200/90 transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Teaser Header: "Explore The World" */}
            <div className="booking_form_teaser-header bg-stone-50/70 lg:bg-transparent px-6 py-5 lg:px-10 lg:py-6 flex items-center justify-between lg:border-r border-stone-200 lg:min-w-[260px]">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#54657a] uppercase font-semibold block mb-0.5">
                  Cribb Reservations
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#17283c] tracking-tight">
                  Explore The World
                </h2>
              </div>
            </div>

            {/* Teaser Content Form */}
            <form 
              onSubmit={handleSearch}
              className="booking_form_teaser-content flex-1 p-5 sm:p-6 flex flex-col md:flex-row items-stretch md:items-end gap-4 sm:gap-5"
            >
              {/* Destination Dropdown / Input */}
              <div className="teaser_dropdown-destinations flex-1">
                <div className="dropdown_label_wrapper flex items-center justify-between mb-1.5">
                  <span className="label pacsys_dropdown_label text-[11px] font-semibold tracking-wider text-[#17283c] uppercase flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#54657a]" /> Destination
                  </span>
                </div>
                <div className="pacsys_dropdown_trigger relative">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    aria-label="Destination"
                    placeholder="Where to? (e.g. Lagos, Cairo, London)"
                    className="w-full h-12 px-4 bg-[#f4f4f4] hover:bg-stone-100 focus:bg-white text-sm font-medium text-[#17283c] placeholder:text-stone-400 border border-stone-200 focus:border-[#17283c] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Stay Dates Dropdown / Input */}
              <div className="teaser_dropdown-dates flex-1">
                <div className="dropdown_label_wrapper flex items-center justify-between mb-1.5">
                  <span className="label pacsys_dropdown_label text-[11px] font-semibold tracking-wider text-[#17283c] uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#54657a]" /> Stay Dates
                  </span>
                </div>
                <div className="pacsys_dropdown_trigger grid grid-cols-2 gap-2 h-12">
                  <div className="relative">
                    <input
                      type="text"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      aria-label="Check-in Date"
                      title="Check-in Date"
                      className="w-full h-12 px-3.5 bg-[#f4f4f4] hover:bg-stone-100 focus:bg-white text-xs sm:text-sm font-medium text-[#17283c] border border-stone-200 focus:border-[#17283c] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      aria-label="Check-out Date"
                      title="Check-out Date"
                      className="w-full h-12 px-3.5 bg-[#f4f4f4] hover:bg-stone-100 focus:bg-white text-xs sm:text-sm font-medium text-[#17283c] border border-stone-200 focus:border-[#17283c] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Hotel Search Button */}
              <div className="pacsys_button--unselected md:w-auto mt-2 md:mt-0">
                <button
                  type="submit"
                  id="hero-hotel-search-button"
                  className="w-full md:w-auto h-12 px-8 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-sm transition-all duration-200 active:scale-95 border border-[#edd0b2]"
                >
                  <Search className="w-4 h-4 text-[#17283c]" />
                  <span>Hotel Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
