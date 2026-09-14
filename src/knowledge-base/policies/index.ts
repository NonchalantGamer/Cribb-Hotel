import { KnowledgeChunk } from '../types';

export const policiesKnowledge: KnowledgeChunk[] = [
  {
    id: 'policy-general-conduct',
    category: 'policies',
    subCategory: 'guest-conduct',
    title: 'General Guest Policy & Conduct',
    keywords: ['policy', 'conduct', 'rules', 'behavior', 'respect', 'terms', 'safety', 'guidelines'],
    content: `General Guest Policy:
Guests at Cribb Hotel are expected to:
• Treat hotel staff, fellow guests, and visitors with mutual courtesy and respect.
• Follow all posted hotel safety, security, and emergency instructions.
• Respect designated quiet hours and maintain reasonable noise levels at all times.
• Keep guest rooms, suites, and common hotel facilities in reasonable, sanitary condition.
• Provide accurate personal identification and contact details during booking and check-in.
• Settle all room charges, incidentals, and service fees in full prior to departure.
• Comply with all applicable municipal and federal laws.
The hotel reserves the right to intervene or terminate stays without refund in cases of severe disturbance, illegal activity, verbal or physical harassment, or willful damage to hotel property.`
  },
  {
    id: 'policy-check-in',
    category: 'policies',
    subCategory: 'check-in',
    title: 'Check-In Policy & Early Check-In Inquiries',
    keywords: ['check-in', 'check in time', 'early check-in', 'id requirement', 'passport', 'arrival', 'front desk check in'],
    content: `Check-In Policy:
• Standard Check-In Time: [CHECK-IN TIME - 3:00 PM].
• Identification: All arriving adult guests must present a government-issued photo ID (national identity card, driver's license, or international passport). The name on the identification must match the reservation name.
• Security Deposit: A pre-authorization hold on a valid credit card or refundable cash deposit of [INCIDENTAL DEPOSIT - $100/night] is taken at check-in to cover room incidentals.
• Early Check-In Guidance:
  - Early check-in before 3:00 PM is subject to room availability upon arrival.
  - Early arrivals between 10:00 AM and 1:00 PM are accommodated on a complimentary basis if clean rooms are ready.
  - Guaranteed early arrival before 10:00 AM may require reserving the room from the prior evening or paying a half-day rate [EARLY CHECK-IN FEE - $75].
  - Guests arriving early while rooms are being serviced are welcome to store luggage with the concierge and enjoy the pool, lounge, or restaurants.`
  },
  {
    id: 'policy-check-out',
    category: 'policies',
    subCategory: 'check-out',
    title: 'Check-Out Policy & Late Check-Out Requests',
    keywords: ['check-out', 'checkout', 'check out time', 'late check-out', 'departure', 'leave hotel', 'extend stay'],
    content: `Check-Out Policy:
• Standard Check-Out Time: [CHECK-OUT TIME - 12:00 PM (Noon)].
• Express Check-Out: Guests may check out via the front desk, in-room Smart TV, or by leaving room keycards in the express departure box.
• Late Check-Out Guidance:
  - Late check-out is subject to incoming guest arrivals and room availability on departure day.
  - Late check-out up to 2:00 PM may be granted complimentary based on availability or to Cribb Rewards Elite members.
  - Check-out between 2:00 PM and 6:00 PM attracts a half-day room charge [LATE CHECKOUT FEE - 50% of room rate].
  - Departures after 6:00 PM are billed at the full nightly rate.
  - Guests with late evening flights are encouraged to use our complimentary luggage holding service and enjoy our shower/spa facilities.`
  },
  {
    id: 'policy-reservations',
    category: 'policies',
    subCategory: 'reservations',
    title: 'Reservation Process & Booking Procedures',
    keywords: ['book', 'reservation', 'how to book', 'booking procedure', 'reserve a room', 'make a booking', 'dates'],
    content: `Reservation Procedures:
Guests can reserve accommodations through:
1. Online Reservation Portal: [BOOKING URL - https://cribbhotel.com/reserve] (Best rate guarantee).
2. Direct Telephone: [PHONE NUMBER - +234 1 277 8888]
3. Email: [EMAIL ADDRESS - reservations@cribbhotel.com]

Booking Step-by-Step:
1. Select travel destination, check-in, and check-out dates.
2. Choose your preferred room or suite category based on party size.
3. Provide guest details (full name, email, phone number, special requests).
4. Review rate options (flexible cancellation vs. promotional advance purchase).
5. Secure reservation with a valid payment card or deposit.
6. Receive instantaneous email confirmation with your unique booking reference number.
*Note: The AI assistant cannot view live live-time room availability without connected database integrations. Always verify final availability on the reservation engine.*`
  },
  {
    id: 'policy-cancellation',
    category: 'policies',
    subCategory: 'cancellation',
    title: 'Cancellation & Refund Policies',
    keywords: ['cancel', 'cancellation', 'refund', 'modify', 'penalty', 'fee', 'no show', 'free cancellation'],
    content: `Cancellation & Refund Policy:
• Flexible Standard Rate: Free cancellation or modification up to [CANCELLATION DEADLINE - 48 hours] prior to arrival (3:00 PM hotel local time, 2 days before check-in).
• Late Cancellation (within 48 hours): Incurs a penalty fee equal to the first night's room charge plus applicable taxes.
• Non-Refundable / Advance Purchase Rates: Full prepayment required at time of booking; non-refundable and non-changeable once confirmed.
• No-Show Policy: If a guest fails to check in on the scheduled arrival date without prior notification, the reservation is held until 12:00 PM the following day and billed for one night (or full stay for prepaid packages).
• Refund Processing: Approved refunds are credited to the original payment method within [REFUND TIMEFRAME - 5 to 7 business days], depending on your financial institution's processing cycles.
*The AI concierge cannot authorize or process refunds directly in the chat; all refund requests are handled by hotel reservations or accounting.*`
  },
  {
    id: 'policy-payments',
    category: 'policies',
    subCategory: 'payments',
    title: 'Payment Methods & Financial Data Privacy Safeguard',
    keywords: ['payment', 'pay', 'credit card', 'cash', 'visa', 'mastercard', 'amex', 'currency', 'pin', 'cvv', 'security'],
    content: `Accepted Payment Methods:
• Major Credit & Debit Cards: Visa, MasterCard, American Express, UnionPay.
• Digital Wallets: Apple Pay, Google Pay at point of sale.
• Direct Bank Transfer / Wire: Accepted for group events and advance bookings (must clear 5 business days prior to arrival).
• Local & Foreign Currencies: Local currency (NGN) and major foreign currencies (USD, EUR, GBP) accepted at daily hotel exchange rates at front desk.

CRITICAL PAYMENT SECURITY NOTICE:
• Cribb Hotel AI Assistant will NEVER ask you to disclose sensitive payment details: Card PINs, CVV security codes, online banking passwords, or one-time passcodes (OTP).
• Do not share card numbers, CVVs, or bank credentials in this chat. Online transactions must only be completed on our encrypted payment gateway [BOOKING URL].`
  },
  {
    id: 'policy-children-pool',
    category: 'policies',
    subCategory: 'children',
    title: 'Children, Family Policy & Pool Safety Supervision',
    keywords: ['children', 'kids', 'age limit', 'family policy', 'child pricing', 'baby', 'pool supervision', 'lifeguard'],
    content: `Children & Family Stay Policy:
• Children aged 0 to 11 stay free of charge when sharing existing bedding with parents/guardians.
• Children aged 12 and above are considered adults for occupancy and dining charges.
• Complimentary infant baby cots/cribs are provided upon request (subject to inventory).
• Breakfast for Children: Under 6 years dine free at buffet; ages 6–11 receive a 50% discount on buffet meals.
• Pool Safety & Supervision:
  - Children under 16 years old MUST be actively supervised by a parent or adult guardian at all times in the swimming pool and pool deck area.
  - No unsupervised swimming is permitted under any circumstances.
  - Life vests and floating aids for toddlers are available at the towel hut.`
  },
  {
    id: 'policy-pets',
    category: 'policies',
    subCategory: 'pets',
    title: 'Pet Policy & Service Animals',
    keywords: ['pets', 'dog', 'cat', 'animals', 'service dog', 'pet friendly', 'pet fee'],
    content: `Pet Policy:
• Standard Pets: [PET POLICY - Pets are welcome under specific conditions]. Small dogs and cats up to 10 kg (22 lbs) are permitted in designated pet-friendly rooms with advance reservation.
• Pet Sanitation Fee: A one-time deep cleaning fee of [PET FEE - $75 per stay] applies.
• Pet Conduct: Pets must be leashed in all public corridors and grounds, and are not permitted in restaurant dining rooms, spa, or swimming pool enclosures.
• Certified Service Animals: Service animals assisting guests with disabilities are welcomed hotel-wide with zero extra fees or breed restrictions in compliance with international accessibility standards.`
  },
  {
    id: 'policy-smoking',
    category: 'policies',
    subCategory: 'smoking',
    title: 'Smoking Policy & Designated Areas',
    keywords: ['smoking', 'smoke', 'cigarette', 'vape', 'vaping', 'shisha', 'cigar', 'designated area', 'smell'],
    content: `Smoking Policy:
• 100% Smoke-Free Rooms: All indoor guest rooms, suites, balconies, corridors, and indoor dining venues are strictly NON-SMOKING. This includes traditional cigarettes, cigars, electronic cigarettes, and vapes.
• Designated Smoking Areas: Smoking is permitted strictly in designated outdoor open-air zones:
  - Azure Open-Air Garden Terrace (marked zone).
  - Ground floor outdoor pavilion near the east valet turnaround.
• Room Recovery Cleaning Fee: A strict sanitization cleaning fee of [SMOKING PENALTY - $250] will be billed to any guest room where evidence of smoking or vaping is detected, to cover intensive ozone air treatment and fabric laundering.`
  },
  {
    id: 'policy-alcohol',
    category: 'policies',
    subCategory: 'alcohol',
    title: 'Alcohol Policy & Responsible Hospitality',
    keywords: ['alcohol', 'drinks', 'wine', 'beer', 'liquor', 'drinking age', 'cocktails', 'intoxication'],
    content: `Alcohol Policy:
• Alcohol is served strictly to guests of legal drinking age ([LEGAL DRINKING AGE - 18 or 21 years] per local jurisdiction). Valid photo ID may be requested by bar staff.
• In-Room Minibars: Minibars are stocked with premium spirits, wines, and beers for registered adult guests. Minibars can be emptied or locked upon request for family stays.
• Responsible Service: Hotel bartenders and waitstaff reserve the right to decline alcoholic service to visibly intoxicated guests.
• The AI assistant does not provide recommendations for binge or unsafe alcohol consumption.`
  },
  {
    id: 'policy-quiet-hours',
    category: 'policies',
    subCategory: 'quiet-hours',
    title: 'Quiet Hours & Noise Consideration',
    keywords: ['quiet hours', 'noise', 'party', 'loud music', 'sleeping', 'night time', 'peaceful'],
    content: `Quiet Hours & Courtesy Policy:
• Official Quiet Hours: Observed daily from [QUIET HOURS - 10:00 PM to 7:00 AM].
• During quiet hours, guests must refrain from loud television audio, loud conversations in hallways, doors slamming, or high-volume sound systems in rooms.
• Room Parties: Private gatherings exceeding room occupancy limits or causing disturbance to neighboring guests are prohibited.
• Handling Disturbance: If you experience noise from adjacent rooms, please contact Front Desk (ext. 0) or Security rather than confronting other guests directly. Our security team will handle the matter diplomatically.`
  },
  {
    id: 'policy-privacy',
    category: 'policies',
    subCategory: 'privacy',
    title: 'Privacy Policy & Guest Data Protection',
    keywords: ['privacy', 'data', 'gdpr', 'security', 'information', 'confidentiality', 'personal data'],
    content: `Privacy & Data Protection:
• Cribb Hotel is committed to safeguarding the privacy and confidentiality of our guests' personal data.
• Data Collection: We collect only the information required for reservation management, guest identification, and service delivery (name, email, phone number, room preferences).
• Third-Party Disclosure: We never sell, rent, or trade guest personal details to outside marketing entities. Information is shared only with verified service processors (payment gateways, reservation engines).
• Confidentiality: The AI concierge will never divulge room numbers, guest names, or travel schedules of other guests.
• Guests may contact our Data Privacy Officer at [PRIVACY EMAIL - privacy@cribbhotel.com] to inspect, update, or request deletion of their profile records.`
  }
];
