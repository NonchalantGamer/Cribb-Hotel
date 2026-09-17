import React, { useState } from 'react';
import { Award, Gift, Sparkles, Clock, Key, ArrowRight, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PostStayFeedbackForm } from './PostStayFeedbackForm';

interface RewardsSectionProps {
  onOpenReserve: () => void;
  onOpenAuth?: (mode?: 'signin' | 'signup', email?: string) => void;
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({ onOpenReserve, onOpenAuth }) => {
  const { user, profile } = useAuth();
  const [email, setEmail] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      if (onOpenAuth) {
        onOpenAuth('signup', email);
      }
    }
  };

  const scrollToFeedback = () => {
    const el = document.getElementById('post-stay-feedback');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="club" className="py-20 lg:py-28 bg-[#faf9f6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#17283c] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle background decoration */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
                alt="Cribb Hotel Logo"
                className="w-10 h-10 object-contain drop-shadow"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center gap-2 text-[#f8dec3]">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase font-mono">
                  Loyalty &amp; Membership
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight leading-tight">
              Cribb Rewards: Unlock the World’s Greatest Gatherings
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed">
              Earn points with every stay, dining experience, and spa retreat. Redeem points for complimentary nights, suite upgrades, and bespoke local experiences.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-8 border-t border-stone-700">
              <div className="space-y-1">
                <Gift className="w-6 h-6 text-[#f8dec3] mb-2" />
                <h4 className="text-sm font-bold text-white">Member Exclusive Rates</h4>
                <p className="text-xs text-stone-300">Enjoy up to 15% discount on direct bookings worldwide.</p>
              </div>

              <div className="space-y-1">
                <Sparkles className="w-6 h-6 text-[#f8dec3] mb-2" />
                <h4 className="text-sm font-bold text-white">Complimentary Upgrades</h4>
                <p className="text-xs text-stone-300">Enhanced views and suite upgrades based on availability.</p>
              </div>

              <div className="space-y-1">
                <Clock className="w-6 h-6 text-[#f8dec3] mb-2" />
                <h4 className="text-sm font-bold text-white">Flexible Late Checkout</h4>
                <p className="text-xs text-stone-300">Guaranteed 4:00 PM late departure for elite members.</p>
              </div>

              <div className="space-y-1">
                <Key className="w-6 h-6 text-[#f8dec3] mb-2" />
                <h4 className="text-sm font-bold text-white">Digital Key &amp; Concierge</h4>
                <p className="text-xs text-stone-300">Seamless mobile check-in and 24/7 AI concierge care.</p>
              </div>
            </div>

            {/* Join Form / Active Member Folio */}
            <div className="mt-10 pt-8 border-t border-stone-700/80">
              {user ? (
                <div className="p-5 bg-white/10 border border-[#f8dec3]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#f8dec3] text-[#17283c] flex items-center justify-center font-bold text-sm">
                      {(profile?.displayName || user.displayName || user.email || 'M').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-base text-white">
                          Welcome, {profile?.displayName || user.displayName || 'Honored Guest'}
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-wider bg-[#f8dec3] text-[#17283c] px-2 py-0.5 font-bold">
                          {profile?.tier || 'Member'} Tier
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 mt-0.5">
                        Active Membership: <span className="font-mono text-[#f8dec3]">{profile?.membershipNumber || 'CRB-Active'}</span> • Balance: <strong className="text-white">{(profile?.rewardPoints ?? 2500).toLocaleString()} Points</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={scrollToFeedback}
                      className="h-11 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-stone-600 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#f8dec3]" />
                      <span>Rate Stay (+250 Pts)</span>
                    </button>
                    <button
                      onClick={onOpenReserve}
                      className="h-11 px-6 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
                    >
                      <span>Book With Points</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3 max-w-xl flex-1 w-full">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email to join or sign in..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-12 px-4 bg-white/10 border border-stone-600 focus:border-[#f8dec3] focus:bg-white/20 text-white placeholder:text-stone-400 text-sm focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="h-12 px-8 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest transition-colors flex-shrink-0 cursor-pointer"
                    >
                      Join Cribb Rewards
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={scrollToFeedback}
                    className="h-12 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 border border-stone-600 cursor-pointer shrink-0"
                  >
                    <MessageSquare className="w-4 h-4 text-[#f8dec3]" />
                    <span>Rate Recent Stay</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Post-Stay Guest Feedback Form Component */}
        <PostStayFeedbackForm onOpenAuth={onOpenAuth} onOpenReserve={onOpenReserve} />
      </div>
    </section>
  );
};
