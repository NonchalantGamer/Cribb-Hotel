import { KnowledgeChunk } from '../types';

export const roomsKnowledge: KnowledgeChunk[] = [
  {
    id: 'rooms-overview',
    category: 'rooms',
    subCategory: 'overview',
    title: 'Room Categories & Accommodations Overview',
    keywords: ['rooms', 'accommodations', 'stay', 'categories', 'types of rooms', 'bed options', 'view'],
    content: `Cribb Hotel offers 5 distinct room and suite categories:
1. Classic Deluxe Room (Entry luxury, 42 m²)
2. Executive Club Room (Club Lounge access, high floor, 48 m²)
3. Ambassador One-Bedroom Suite (Spacious living/dining, 85 m²)
4. Presidential Cribb Suite (Penthouse terrace, 165 m²)
5. Family & Accessible Units (Connecting configurations and ADA compliant features).
All rooms feature soundproof acoustic glazing, signature Cribb plush bedding, Italian marble bathrooms, ergonomic workstations, Smart IPTVs with casting, and 24-hour room service.`
  },
  {
    id: 'rooms-standard-deluxe',
    category: 'rooms',
    subCategory: 'standard',
    title: 'Classic Deluxe Room',
    keywords: ['classic deluxe', 'standard room', 'king room', 'double room', 'basic room', 'price', 'rates', 'cheapest'],
    content: `Classic Deluxe Room Details:
- Room Size: 42 m² (452 sq ft)
- Bed Configuration: 1 King Bed or 2 Double Queen Beds
- Maximum Occupancy: 2 Adults (or 2 Adults + 1 Child under 12 using existing bedding)
- Bathroom: Italian marble bathroom with walk-in rainfall shower, deep soaking tub, and luxury amenities.
- Work & Connectivity: Ergonomic work desk, universal power outlets, high-speed 1 Gbps Wi-Fi.
- In-Room Amenities: Nespresso machine, curated minibar, 55" 4K Smart TV, electronic safe, individual climate control.
- Room Rate: From [ROOM PRICE - $280/night] (subject to dates, taxes, and seasonal demand).
- View: Lush garden or city skyline view.`
  },
  {
    id: 'rooms-executive-club',
    category: 'rooms',
    subCategory: 'deluxe',
    title: 'Executive Club Room (With Cribb Club Lounge Access)',
    keywords: ['executive room', 'club room', 'club lounge', 'lounge access', 'breakfast included', 'cocktails', 'business traveler'],
    content: `Executive Club Room Details:
- Room Size: 48 m² (516 sq ft), situated on high executive floors (Floors 15–22).
- Bed Configuration: 1 King Bed
- Maximum Occupancy: 2 Adults
- Exclusive Privileges: Unlimited access to the private 24/7 Cribb Club Lounge.
  • Complimentary daily gourmet buffet breakfast (6:30 AM - 10:30 AM).
  • Afternoon High Tea and artisanal pastries (3:00 PM - 5:00 PM).
  • Evening twilight cocktails, sommelier wines, and chef-curated hot canapés (6:00 PM - 8:30 PM).
  • Dedicated private check-in/check-out concierge.
- In-Room Amenities: Premium Illy coffee bar, complimentary garment pressing (2 items per stay), Bose Bluetooth sound system.
- Room Rate: From [ROOM PRICE - $390/night].`
  },
  {
    id: 'rooms-ambassador-suite',
    category: 'rooms',
    subCategory: 'suites',
    title: 'The Ambassador One-Bedroom Suite',
    keywords: ['ambassador suite', 'one bedroom suite', 'suite', 'living room', 'butler', 'luxury', 'dining area'],
    content: `Ambassador One-Bedroom Suite Details:
- Room Size: 85 m² (915 sq ft)
- Bed Configuration: 1 Master King Bed + Plush pull-out sleeper sofa in living area.
- Maximum Occupancy: 3 Adults or 2 Adults + 2 Children
- Layout: Fully separated master bedroom, expansive living salon, dining table seating 6, and guest powder room.
- Bathroom: Spa-inspired marble bath with freestanding whirlpool tub and Molton Brown amenities.
- Butler Service: Dedicated Cribb Butler service available on call for unpacking, beverage service, and itinerary planning.
- Room Rate: From [ROOM PRICE - $620/night].
- View: Panoramic waterfront or sweeping skyline views from private furnished balcony.`
  },
  {
    id: 'rooms-presidential-suite',
    category: 'rooms',
    subCategory: 'suites',
    title: 'The Presidential Cribb Suite',
    keywords: ['presidential suite', 'penthouse', 'top floor', 'grand suite', 'boardroom', 'piano', 'terrace', 'vip'],
    content: `The Presidential Cribb Suite Details:
- Room Size: 165 m² (1,776 sq ft) on the topmost floor.
- Bed Configuration: Master King Bedroom with option to connect to secondary Executive King room.
- Maximum Occupancy: Up to 5 Guests with connected room.
- Features: Wraparound 360-degree terrace, baby grand piano, private 10-person executive boardroom, catering prep kitchen, and curated modern art.
- VIP Inclusions: Complimentary VIP airport limousine transfer, dedicated 24-hour private chef on request, and private security entrance.
- Room Rate: From [ROOM PRICE - $1,450/night].`
  },
  {
    id: 'rooms-family',
    category: 'rooms',
    subCategory: 'family',
    title: 'Family Accommodations & Connecting Rooms',
    keywords: ['family', 'children', 'kids', 'connecting rooms', 'extra bed', 'crib', 'baby cot', 'family room', 'spacious'],
    content: `Family Stays at Cribb Hotel:
- Recommendation for Families (e.g., 2 Adults + 2 Children):
  1. Guaranteed Connecting Classic Deluxe Rooms (1 King connecting to 2 Double Queen beds) for maximum space and privacy.
  2. The Ambassador Suite (features separate living area with sofa bed and dining table).
- Children & Infant Amenities:
  • Complimentary baby cribs/cots available upon request (subject to advance reservation).
  • Rollaway extra beds: [EXTRA BED PRICE - $45/night] (available in Deluxe and Suites; limited to 1 per room due to fire safety regulations).
  • Kids welcome kit, child-sized bathrobes, and infant toiletries available from housekeeping.
  • Babysitting services can be arranged with 24-hour advance notice through the concierge desk.`
  },
  {
    id: 'rooms-accessibility',
    category: 'rooms',
    subCategory: 'accessibility',
    title: 'Accessible Rooms & Disability Accommodations',
    keywords: ['accessible', 'handicap', 'wheelchair', 'ada', 'roll in shower', 'disability', 'grab bars', 'special needs'],
    content: `Accessible Accommodations (ADA Compliant):
- Cribb Hotel offers specially modified Accessible Deluxe Rooms on lower and mid floors.
- Features:
  • Wide doorways (36-inch clearance) with lever door handles.
  • Roll-in showers with fold-down bench, adjustable hand-held shower heads, and reinforced grab bars.
  • Lowered vanity counters, light switches, climate thermostats, and peepholes.
  • Strobe light smoke detectors and auditory emergency alarm systems for hearing/vision assistance.
  • Step-free wheelchair accessibility throughout all public hotel areas, restaurants, pools, and elevators.
  • Service animals are warmly welcomed without additional fees or breed restrictions.`
  }
];
