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
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140111/2f8a1289-6a5f-4084-8a4f-d2a2b70cfe3b.png",
    caption: "The Community Table",
    subtext: "Designed to spark conversation, facilitate remote collaboration, and bring guests together seamlessly."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140171/3d993bc1-4b8d-4941-8330-dba6f1f8ca16.png",
    caption: "The Cribb Club Lounge",
    subtext: "A refined retreat crafted for focus, connection, premium culinary presentations, and morning barista service."
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140212/44de2f5d-cde1-4000-b453-ec7c412ea329.png",
    caption: "&More by Cribb",
    subtext: "An all-day dining and social lounge that transitions effortlessly from morning coffee to twilight cocktails."
  }
];

// Carousel 2 images provided by user (8 images):
export const CAROUSEL_SECTION_2_IMAGES = [
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140663/7e4db3f1-70ca-4fb8-bdd6-cc557a5ff066.png",
    title: "Sophisticated Living",
    destination: "Cribb Grand Suites"
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140675/af2de88b-1d52-4702-9632-fb4ad1f16653.png",
    title: "Gather & Celebrate",
    destination: "Meetings & Grand Ballroom"
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140758/a0f0f8a1-c649-4be1-a874-05765fced511.png",
    title: "Culinary Artistry",
    destination: "The Heritage Grillhouse"
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140863/54223686-be1b-43d2-b571-38430f9321d8.png",
    title: "Wellness & Serenity",
    destination: "Cribb Spa & Thermal Baths"
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140902/3159a754-85bc-4b85-9794-fe5cc0adf485.png",
    title: "Luminous Spaces",
    destination: "The Atrium & Palm Court"
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140925/f9776653-dbc3-4963-ab18-0a0c50d79f5b.png",
    title: "Sunset Mixology",
    destination: "Azure Rooftop Terrace"
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140953/9f2e170d-c96e-4012-b4e8-e5976eefc66e.png",
    title: "Oasis by the Water",
    destination: "Resort Infinity Pool"
  },
  {
    url: "https://res.cloudinary.com/doujptiz/image/upload/v1789140983/1e1506f4-6cc4-46b8-a977-1d08bacbb875.png",
    title: "Warm Welcome",
    destination: "Cribb Iconic Lobby Lounge"
  }
];

export const PILLARS = [
  {
    title: "The Community Table",
    description: "Purpose-built central tables integrated with ergonomic charging, warm ambient lighting, and high-speed wireless connectivity for communal productivity and conversation.",
    image: "https://res.cloudinary.com/doujptiz/image/upload/v1789140111/2f8a1289-6a5f-4084-8a4f-d2a2b70cfe3b.png"
  },
  {
    title: "The Cribb Club",
    description: "An elevated private retreat reserved for Club guests, offering personalized check-in, continuous gourmet bites, and panoramic vistas in an atmosphere of refined comfort.",
    image: "https://res.cloudinary.com/doujptiz/image/upload/v1789140171/3d993bc1-4b8d-4941-8330-dba6f1f8ca16.png"
  },
  {
    title: "&More by Cribb",
    description: "A dynamic gathering venue that evolves fluidly throughout your day, from locally roasted artisanal espresso to small plates and sommelier-selected vintages by night.",
    image: "https://res.cloudinary.com/doujptiz/image/upload/v1789140212/44de2f5d-cde1-4000-b453-ec7c412ea329.png"
  }
];
