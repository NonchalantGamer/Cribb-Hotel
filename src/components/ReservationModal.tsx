import React, { useState } from 'react';
import { X, Search, Calendar, Users, MapPin, Tag, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { DESTINATIONS, ROOM_OPTIONS } from '../data/hotelData';
import { ReservationParams } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams?: Partial<ReservationParams>;
  onAskConcierge?: (prompt: string) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialParams,
  onAskConcierge
}) => {
  const [destination, setDestination] = useState(initialParams?.destination || "Cribb Lagos Hotel");
  const [checkIn, setCheckIn] = useState(initialParams?.checkIn || "Oct 15, 2026");
  const [checkOut, setCheckOut] = useState(initialParams?.checkOut || "Oct 18, 2026");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rateType, setRateType] = useState("Lowest Regular Rate");
  const [usePoints, setUsePoints] = useState(false);

  const [hasSearched, setHasSearched] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState<any | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  if (!isOpen) return null;

  const handleSearchHotels = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setBookingConfirmed(null);
  };

  const handleConfirmBooking = (roomTitle: string, price: number) => {
    const confirmationId = "CRB-" + Math.floor(100000 + Math.random() * 900000);
    setBookingConfirmed({
      confirmationId,
      destination,
      roomTitle,
      price,
      checkIn,
      checkOut,
      guests: `${adults} Adults${children > 0 ? `, ${children} Children` : ''}`,
      name: guestName || "Honored Guest",
      email: guestEmail || "guest@cribbhotels.com"
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white shadow-2xl rounded-none border border-stone-200 overflow-hidden my-auto max-h-[95vh] flex flex-col"
        role="dialog" 
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="bg-[#17283c] text-white px-6 py-4 flex items-center justify-between border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f8dec3] text-[#17283c] flex items-center justify-center font-serif font-bold text-base">
              C
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif tracking-wider uppercase font-semibold">
                Find &amp; Reserve at Cribb
              </h2>
              <p className="text-xs text-stone-300">
                Official Best Rate Guarantee &amp; Cribb Rewards Benefits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Reservation Search Form */}
          <form onSubmit={handleSearchHotels} className="bg-stone-50 p-4 sm:p-6 border border-stone-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Destination Selector */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#17283c] uppercase mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#54657a]" /> Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full h-11 px-3 bg-white border border-stone-300 text-xs sm:text-sm font-medium text-[#17283c] focus:outline-none focus:border-[#17283c]"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.country})
                    </option>
                  ))}
                  <option value="All Cribb Worldwide Locations">All Cribb Worldwide Locations</option>
                </select>
              </div>

              {/* Dates */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#17283c] uppercase mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#54657a]" /> Check-In / Check-Out
                </label>
                <div className="grid grid-cols-2 gap-2 h-11">
                  <input
                    type="text"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    placeholder="Check-in"
                    className="w-full px-2.5 bg-white border border-stone-300 text-xs text-[#17283c] focus:outline-none focus:border-[#17283c]"
                  />
                  <input
                    type="text"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    placeholder="Check-out"
                    className="w-full px-2.5 bg-white border border-stone-300 text-xs text-[#17283c] focus:outline-none focus:border-[#17283c]"
                  />
                </div>
              </div>

              {/* Rooms & Guests */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#17283c] uppercase mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#54657a]" /> Rooms &amp; Guests
                </label>
                <div className="grid grid-cols-2 gap-2 h-11">
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full px-2 bg-white border border-stone-300 text-xs text-[#17283c] focus:outline-none focus:border-[#17283c]"
                  >
                    <option value={1}>1 Room</option>
                    <option value={2}>2 Rooms</option>
                    <option value={3}>3 Rooms</option>
                  </select>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-2 bg-white border border-stone-300 text-xs text-[#17283c] focus:outline-none focus:border-[#17283c]"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                  </select>
                </div>
              </div>

              {/* Special Rates */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#17283c] uppercase mb-1.5 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#54657a]" /> Special Rates
                </label>
                <select
                  value={rateType}
                  onChange={(e) => setRateType(e.target.value)}
                  className="w-full h-11 px-3 bg-white border border-stone-300 text-xs text-[#17283c] focus:outline-none focus:border-[#17283c]"
                >
                  <option value="Lowest Regular Rate">Lowest Regular Rate</option>
                  <option value="Cribb Rewards Member Rate">Cribb Rewards Member Rate (Save 15%)</option>
                  <option value="AAA / CAA Discount">AAA / CAA Discount</option>
                  <option value="Senior Discount (62+)">Senior Discount (62+)</option>
                  <option value="Government &amp; Military">Government &amp; Military</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-200">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#17283c]">
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => setUsePoints(e.target.checked)}
                  className="w-4 h-4 text-[#17283c] rounded border-stone-300 focus:ring-[#17283c]"
                />
                <span>Use Cribb Rewards Points / Certificates</span>
              </label>

              <button
                type="submit"
                className="px-8 py-2.5 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 border border-[#edd0b2]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Find Hotels</span>
              </button>
            </div>
          </form>

          {/* Booking Confirmation View */}
          {bookingConfirmed && (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-none animate-in zoom-in-95 duration-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-xl font-serif font-bold text-emerald-900">
                      Reservation Confirmed!
                    </h3>
                    <span className="px-3 py-1 bg-white border border-emerald-300 text-xs font-mono font-bold text-emerald-800">
                      Confirmation: {bookingConfirmed.confirmationId}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-800 mt-1">
                    Thank you, {bookingConfirmed.name}. A full confirmation dossier and digital key invite has been sent to {bookingConfirmed.email}.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-emerald-200 text-xs text-stone-700">
                    <div>
                      <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Property</span>
                      <strong className="text-stone-900">{bookingConfirmed.destination}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Room Type</span>
                      <strong className="text-stone-900">{bookingConfirmed.roomTitle}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Stay Dates</span>
                      <strong className="text-stone-900">{bookingConfirmed.checkIn} – {bookingConfirmed.checkOut}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block uppercase tracking-wider text-[10px]">Rate</span>
                      <strong className="text-emerald-700">${bookingConfirmed.price} / night</strong>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => setBookingConfirmed(null)}
                      className="text-xs text-emerald-800 underline hover:text-emerald-950 font-medium"
                    >
                      Book another room
                    </button>
                    {onAskConcierge && (
                      <button
                        onClick={() => {
                          onClose();
                          onAskConcierge(`I just reserved ${bookingConfirmed.roomTitle} at ${bookingConfirmed.destination}. Can you tell me what dining and spa options you recommend?`);
                        }}
                        className="text-xs text-[#17283c] font-semibold flex items-center gap-1 hover:underline"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Ask AI Concierge for recommendations
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results: Available Rooms for Selected Hotel */}
          {hasSearched && !bookingConfirmed && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#17283c]">
                    Available Accommodations at {destination}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Showing best available rates for {checkIn} to {checkOut} ({adults} Guests)
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-stone-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Cribb Flexible Cancellation Guarantee</span>
                </div>
              </div>

              <div className="space-y-4">
                {ROOM_OPTIONS.map((room) => (
                  <div 
                    key={room.id}
                    className="border border-stone-200 bg-white hover:border-[#17283c] transition-all flex flex-col md:flex-row overflow-hidden shadow-sm"
                  >
                    <div className="md:w-72 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                      <img 
                        src={room.imageUrl} 
                        alt={room.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <span className="absolute top-2 left-2 bg-[#17283c]/90 text-white text-[10px] uppercase tracking-widest px-2.5 py-1">
                        {room.size}
                      </span>
                    </div>

                    <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-lg font-serif font-bold text-[#17283c]">
                              {room.title}
                            </h4>
                            <p className="text-xs text-[#54657a] mt-0.5">{room.category}</p>
                          </div>
                        </div>

                        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                          {room.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f8dec3] flex-shrink-0" />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <span className="text-[10px] uppercase text-stone-400 tracking-wider block">Standard Rate</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-serif font-bold text-[#17283c]">${room.pricePerNight}</span>
                            <span className="text-xs text-stone-500">/ night</span>
                          </div>
                        </div>

                        {selectedRoom === room.id ? (
                          <div className="flex items-center gap-2 flex-wrap">
                            <input
                              type="text"
                              placeholder="Guest Name"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="h-9 px-3 text-xs border border-stone-300 w-32 focus:outline-none focus:border-[#17283c]"
                            />
                            <input
                              type="email"
                              placeholder="Email Address"
                              value={guestEmail}
                              onChange={(e) => setGuestEmail(e.target.value)}
                              className="h-9 px-3 text-xs border border-stone-300 w-36 focus:outline-none focus:border-[#17283c]"
                            />
                            <button
                              onClick={() => handleConfirmBooking(room.title, room.pricePerNight)}
                              className="h-9 px-4 bg-[#17283c] hover:bg-[#0f1c2d] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setSelectedRoom(null)}
                              className="text-xs text-stone-400 hover:text-stone-700 px-1"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedRoom(room.id);
                            }}
                            className="px-6 py-2 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest border border-[#edd0b2] transition-colors flex items-center gap-1.5"
                          >
                            <span>Select Room</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
