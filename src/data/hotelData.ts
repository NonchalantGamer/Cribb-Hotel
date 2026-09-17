import { Destination, RoomOption } from '../types';

export const HERO_BACKGROUND = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85";

export const DESTINATIONS: Destination[] = [
  {
    id: "cribb-lagos",
    name: "Cribb Lagos Hotel",
    location: "Victoria Island, Lagos",
    country: "Nigeria",
    region: "Africa",
    description: "Centrally located in the bustling financial district, featuring waterfront views and fine dining.",
    startingPrice: 280,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    tags: ["Waterfront", "Cribb Club", "Poolside Dining"]
  },
  {
    id: "cribb-cairo",
    name: "Cribb Cairo Hotel & Casino",
    location: "River Nile, Cairo",
    country: "Egypt",
    region: "Africa",
    description: "Soaring above the River Nile with a 24-hour casino, Mediterranean dining, and panoramic sunset terraces.",
    startingPrice: 240,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    tags: ["Nile Views", "Casino", "Outdoor Pool"]
  },
  {
    id: "cribb-algiers",
    name: "Cribb Club des Pins Resort",
    location: "Algiers",
    country: "Algeria",
    region: "Africa",
    description: "Mediterranean beachfront resort situated in a protected pine forest with private marina and spa.",
    startingPrice: 310,
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    tags: ["Beachfront", "Marina", "Spa"]
  },
  {
    id: "cribb-annaba",
    name: "Cribb Annaba Hotel",
    location: "Annaba",
    country: "Algeria",
    region: "Africa",
    description: "Modern architectural icon in the heart of Annaba, offering luxury rooms and refined banqueting.",
    startingPrice: 215,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    tags: ["City Center", "Executive Lounge"]
  },
  {
    id: "cribb-djibouti",
    name: "Cribb Djibouti",
    location: "Djibouti Bay",
    country: "Djibouti",
    region: "Africa",
    description: "Waterfront sanctuary overlooking the Gulf of Tadjoura with coral reef excursions and private beach.",
    startingPrice: 340,
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    tags: ["Private Beach", "Coral Reef", "Diplomatic Hub"]
  },
  {
    id: "cribb-kampala",
    name: "Cribb Kampala Hotel",
    location: "Kampala",
    country: "Uganda",
    region: "Africa",
    description: "Lush tropical retreat surrounded by 9 acres of landscaped gardens in the heart of the capital.",
    startingPrice: 220,
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    tags: ["Botanical Gardens", "Historic Ballroom", "Tennis"]
  },
  {
    id: "cribb-el-gouna",
    name: "Cribb Miramar Resort El Gouna",
    location: "El Gouna, Hurghada",
    country: "Egypt",
    region: "Middle East",
    description: "Built across nine islands in the Red Sea, offering Arabian and Nubian architectural splendor.",
    startingPrice: 295,
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    tags: ["Red Sea Lagoon", "Private Islands", "Golf"]
  },
  {
    id: "cribb-alexandria",
    name: "Cribb Montazah Hotel",
    location: "Alexandria",
    country: "Egypt",
    region: "Middle East",
    description: "Historic grandeur gazing directly onto the Mediterranean Sea and lush royal palace gardens.",
    startingPrice: 210,
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    tags: ["Seafront Promenade", "Montazah Palace Views"]
  }
];

export const ROOM_OPTIONS: RoomOption[] = [
  {
    id: "deluxe-king",
    title: "Classic Deluxe King",
    category: "Guest Room, 1 King, City view",
    size: "42 m² / 452 sqft",
    bed: "1 King Bed with Cribb Signature Pillowtop",
    guests: 2,
    pricePerNight: 280,
    imageUrl: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Signature Cribb Sleep Experience bedding",
      "Spacious marble bathroom with walk-in rainforest shower",
      "Ergonomic work desk with high-speed 1 Gbps WiFi",
      "55-inch Ultra HD Smart TV & Nespresso coffee maker"
    ]
  },
  {
    id: "deluxe-double",
    title: "Classic Deluxe Double Queen",
    category: "Guest Room, 2 Queen, Garden view",
    size: "45 m² / 484 sqft",
    bed: "2 Queen Beds",
    guests: 4,
    pricePerNight: 310,
    imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Twin Cribb Signature Queen beds",
      "Oversized double vanity and deep soaking tub",
      "Complimentary high-speed WiFi & premium minibar",
      "Floor-to-ceiling soundproof acoustic windows"
    ]
  },
  {
    id: "club-king",
    title: "Executive Club Level King",
    category: "Club Lounge Access, High Floor, 1 King",
    size: "48 m² / 516 sqft",
    bed: "1 King Bed",
    guests: 2,
    pricePerNight: 390,
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Exclusive 24/7 access to the private Cribb Club Lounge",
      "Complimentary gourmet hot breakfast & afternoon tea",
      "Evening sommelier wine service & artisanal canapés",
      "Guaranteed late check-out at 4:00 PM upon request"
    ]
  },
  {
    id: "ambassador-suite",
    title: "The Ambassador One-Bedroom Suite",
    category: "1 Bedroom Suite, 1 King, Living Room, Balcony",
    size: "85 m² / 915 sqft",
    bed: "1 King Bed + Living Area",
    guests: 3,
    pricePerNight: 620,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Private separate master bedroom with panoramic balcony",
      "Dining salon with seating for 6 and separate powder room",
      "Deep soaking marble tub and Molton Brown bath amenities",
      "Dedicated Cribb Butler service on call"
    ]
  },
  {
    id: "presidential-suite",
    title: "The Presidential Cribb Suite",
    category: "Top Floor Penthouse, Wraparound Terrace, 1 King",
    size: "165 m² / 1,776 sqft",
    bed: "1 Master King + Guest Room",
    guests: 5,
    pricePerNight: 1450,
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Wraparound terrace with panoramic city and skyline views",
      "Private 10-person boardroom and catering kitchen",
      "Baby grand piano and curated original contemporary artwork",
      "VIP airport limousine transfer and dedicated private chef"
    ]
  }
];

// Carousel 1 images provided by user:
// 2f8a1289-6a5f-4084-8a4f-d2a2b70cfe3b.png
// 3d993bc1-4b8d-4941-8330-dba6f1f8ca16.png
// 44de2f5d-cde1-4000-b453-ec7c412ea329.png
export const CAROUSEL_SECTION_1_IMAGES = [
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636611/f9e365e1-d690-4f73-b5e6-e6504c059268.png",
    caption: "The Community Table",
    subtext: "Designed to spark conversation, facilitate remote collaboration, and bring guests together seamlessly."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636171/44454481-4382-4746-8ee4-b139abdd28d9.png",
    caption: "The Cribb Club Lounge",
    subtext: "A refined retreat crafted for focus, connection, premium culinary presentations, and morning barista service."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636385/77e00f2a-4fff-45ac-92bf-11d34a886d64.png",
    caption: "More by Cribb",
    subtext: "An all-day dining and social lounge that transitions effortlessly from morning coffee to twilight cocktails."
  }
];

// Carousel 2 images provided by user (8 images):
export const CAROUSEL_SECTION_2_IMAGES = [
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636215/ed3e84a5-c80d-4581-8c47-2b60eb8e602c.png",
    title: "Elegant Parisian Suite",
    destination: "Cribb Grand Suites",
    description: "Curved bouclé seating and floor-to-ceiling glass doors open onto a private balcony framing historic Parisian rooftops."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636580/fba51f07-a2fd-4d26-915f-dcc71ad159de.png",
    title: "Alpine Chalet Retreat",
    destination: "St. Moritz Mountain Chalet",
    description: "Guests gather around an outdoor stone hearth beneath twilight mountain peaks, pine forests, and winter wonderlands."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636276/425923d1-432b-40e4-b31f-4cfbc20872be.png",
    title: "Alpine Infinity Oasis",
    destination: "Panoramic Valley Pool",
    description: "Submerged infinity loungers gaze across forested valleys and majestic alpine crests bathed in golden sunset light."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636322/90e90b33-2b44-496f-8c9b-67eb68fed5a6.png",
    title: "Vaulted Grotto Spa",
    destination: "Subterranean Thermal Baths",
    description: "Peaceful candlelit waters resting beneath historic vaulted stone arches, framed by plush loungers and lush greenery."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636694/5e61e7f1-1a88-4953-b150-16276ac4540d.png",
    title: "The Fireside Library",
    destination: "Heritage Reading Lounge",
    description: "Floor-to-ceiling dark-wood bookcases, rich leather armchairs, and a roaring fireplace crafted for quiet contemplation."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636987/e87ee172-bfe8-46c4-b25e-139f54cca454.png",
    title: "Oceanfront Tulum Pavilion",
    destination: "Coastal Beachfront Resort",
    description: "Lantern-lit sand pathways weave through tropical palms toward an open-air beachfront bar and calm ocean waves."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789636474/a49bfc3c-95ef-4f3d-86a3-53089db6af72.png",
    title: "Cliffside Mediterranean Haven",
    destination: "Amalfi Coastal Terrace",
    description: "Sun-drenched terraces draped in bougainvillea with cliffside infinity loungers overlooking yachts across deep blue waters."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789635970/53f802bc-3821-4f7d-bc57-8b4183cd9535.png",
    title: "Warm Welcome & Arrival",
    destination: "Cribb Grand Lobby Reception",
    description: "Dedicated front desk concierge greets each guest with bespoke check-in service amid warm fluted wood interiors."
  }
];

export const PILLARS = [
  {
    title: "The Community Table",
    description: "Purpose-built central tables integrated with ergonomic charging, warm ambient lighting, and high-speed wireless connectivity for communal productivity and conversation.",
    image: "https://res.cloudinary.com/doujptiz/image/upload/v1789636194/c925263f-8eb8-4ae8-9959-32fdaedaa849.png"
  },
  {
    title: "The Cribb Club",
    description: "An elevated private retreat reserved for Club guests, offering personalized check-in, continuous gourmet bites, and panoramic vistas in an atmosphere of refined comfort.",
    image: "https://res.cloudinary.com/doujptiz/image/upload/v1789636234/91c38b49-df39-4b27-97ef-86e9afcfbdd3.png"
  },
  {
    title: "More by Cribb",
    description: "A dynamic gathering venue that evolves fluidly throughout your day, from locally roasted artisanal espresso to small plates and sommelier-selected vintages by night.",
    image: "https://res.cloudinary.com/doujptiz/image/upload/v1789639692/78534a3f-dc89-42a2-b083-abc02e466252.png"
  }
];
