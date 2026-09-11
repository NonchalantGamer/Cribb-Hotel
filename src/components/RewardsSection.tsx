import React, { useState } from 'react';
import { Award, Gift, Sparkles, Clock, Key, Check } from 'lucide-react';

interface RewardsSectionProps {
  onOpenReserve: () => void;
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({ onOpenReserve }) => {
  const [joined, setJoined] = useState(false);
  const [email, setEmail] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
    }
  };

  return (
    <section id="club" className="py-20 lg:py-28 bg-[#faf9f6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#17283c] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle background decoration */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-[#f8dec3] mb-3">
              <Award className="w-5 h-5" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase font-mono">
                Loyalty &amp; Membership
              </span>
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

            {/* Join Form / Status */}
            <div className="mt-10 pt-8 border-t border-stone-700/80">
              {joined ? (
                <div className="p-4 bg-white/10 border border-[#f8dec3] flex items-center gap-3 text-sm text-white">
                  <Check className="w-5 h-5 text-[#f8dec3]" />
                  <span>Welcome to Cribb Rewards! Check your inbox ({email}) for your 2,500 bonus welcome points.</span>
                </div>
              ) : (
                <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email to join for free..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12 px-4 bg-white/10 border border-stone-600 focus:border-[#f8dec3] focus:bg-white/20 text-white placeholder:text-stone-400 text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-12 px-8 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest transition-colors flex-shrink-0"
                  >
                    Join Cribb Rewards
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
