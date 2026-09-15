import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, Calendar, Users, MapPin, Tag, Check, ArrowRight, ShieldCheck, Sparkles, Loader2, Phone, UserCheck } from 'lucide-react';
import { DESTINATIONS, ROOM_OPTIONS } from '../data/hotelData';
import { ReservationParams, BookingRecord } from '../types';
import { createReservationInFirebase } from '../lib/hotelDatabaseService';
import { useAuth } from '../context/AuthContext';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams?: Partial<ReservationParams>;
  onAskConcierge?: (prompt: string) => void;
  onBookingCreated?: (booking: BookingRecord) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialParams,
  onAskConcierge,
  onBookingCreated
}) => {
  const { user, profile } = useAuth();
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
  const [guestPhone, setGuestPhone] = useState("+234 800 000 0000");
  const [specialRequests, setSpecialRequests] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // Auto populate guest details if user is signed in
  useEffect(() => {
    if (user) {
      if (!guestName && (profile?.displayName || user.displayName)) {
        setGuestName(profile?.displayName || user.displayName || "");
      }
      if (!guestEmail && user.email) {
        setGuestEmail(user.email);
      }
    }
  }, [user, profile]);

  // Prevent background scroll when reservation modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleSearchHotels = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setBookingConfirmed(null);
  };

  const handleConfirmBooking = async (roomTitle: string, roomTypeId: string, price: number) => {
    if (!guestName.trim()) {
      alert("Please enter guest name to proceed with the reservation.");
      return;
    }
    setSubmittingBooking(true);
    const confirmationId = "CRB-" + Math.floor(100000 + Math.random() * 900000);
    const nights = 3; // Estimated nights or calculated
    const totalAmount = price * nights;

    // Pick a realistic room number corresponding to room type
    const roomNumberMap: Record<string, string> = {
      'deluxe-king': '102',
      'deluxe-double': '101',
      'club-king': '202',
      'ambassador-suite': '402',
      'presidential-suite': '501'
    };
    const assignedRoomNumber = roomNumberMap[roomTypeId] || '105';

    try {
      const newBooking = await createReservationInFirebase({
        confirmationId,
        destination,
        roomTypeId,
        roomTitle,
        roomNumber: assignedRoomNumber,
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim() || 'guest@cribbhotels.com',
        guestPhone: guestPhone.trim() || '+1 555 0192',
        specialRequests: specialRequests.trim() || undefined,
        checkIn,
        checkOut,
        adults,
        children,
        roomsCount: rooms,
        pricePerNight: price,
        totalNights: nights,
        totalAmount,
        status: 'Confirmed',
        paymentStatus: 'Paid',
        rateType
      });

      setBookingConfirmed({
        ...newBooking,
        guests: `${adults} Adults${children > 0 ? `, ${children} Children` : ''}`,
        price
      });

      if (onBookingCreated) {
        onBookingCreated(newBooking);
      }
    } catch (err) {
      console.error('Failed to create booking in Firebase:', err);
    } finally {
      setSubmittingBooking(false);
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[10000] overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-5xl bg-white shadow-2xl rounded-none border border-stone-200 overflow-hidden my-auto max-h-[95vh] flex flex-col"
        role="dialog" 
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#17283c] text-white px-6 py-4 flex items-center justify-between border-b border-stone-700">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
              alt="Cribb Hotel Official Logo"
              className="w-8 h-8 object-contain rounded"
              referrerPolicy="no-referrer"
            />
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
                          <div className="flex flex-col gap-2.5 w-full bg-stone-50 p-3 border border-stone-200 mt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                              <div>
                                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-0.5">Guest Full Name *</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Elena Rostova"
                                  value={guestName}
                                  onChange={(e) => setGuestName(e.target.value)}
                                  className="h-8 px-2.5 text-xs bg-white border border-stone-300 w-full focus:outline-none focus:border-[#17283c]"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-0.5">Email Address</label>
                                <input
                                  type="email"
                                  placeholder="guest@example.com"
                                  value={guestEmail}
                                  onChange={(e) => setGuestEmail(e.target.value)}
                                  className="h-8 px-2.5 text-xs bg-white border border-stone-300 w-full focus:outline-none focus:border-[#17283c]"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-stone-600 block mb-0.5">Contact Phone</label>
                                <input
                                  type="tel"
                                  placeholder="+234 803 123 4567"
                                  value={guestPhone}
                                  onChange={(e) => setGuestPhone(e.target.value)}
                                  className="h-8 px-2.5 text-xs bg-white border border-stone-300 w-full focus:outline-none focus:border-[#17283c]"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-stone-600 block mb-0.5">Special Requests or Arrival Notes</label>
                              <input
                                type="text"
                                placeholder="e.g. Late check-in after 8 PM, high floor, feather-free pillows"
                                value={specialRequests}
                                onChange={(e) => setSpecialRequests(e.target.value)}
                                className="h-8 px-2.5 text-xs bg-white border border-stone-300 w-full focus:outline-none focus:border-[#17283c]"
                              />
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setSelectedRoom(null)}
                                className="text-xs text-stone-500 hover:text-stone-800 px-3 py-1.5"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                disabled={submittingBooking || !guestName.trim()}
                                onClick={() => handleConfirmBooking(room.title, room.id, room.pricePerNight)}
                                className="h-8 px-5 bg-[#17283c] hover:bg-[#0f1c2d] text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center gap-1.5"
                              >
                                {submittingBooking ? (
                                  <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>Syncing to Firebase...</span>
                                  </>
                                ) : (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-[#f8dec3]" />
                                    <span>Confirm &amp; Book</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedRoom(room.id);
                            }}
                            className="px-6 py-2 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest border border-[#edd0b2] transition-colors flex items-center gap-1.5 cursor-pointer"
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
    </div>,
    document.body
  );
};
