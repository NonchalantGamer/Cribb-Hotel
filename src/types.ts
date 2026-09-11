export interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  region: 'Africa' | 'Middle East' | 'Europe' | 'Americas' | 'Asia Pacific';
  description: string;
  startingPrice: number;
  imageUrl: string;
  rating: number;
  tags: string[];
}

export interface RoomOption {
  id: string;
  title: string;
  category: string;
  size: string;
  bed: string;
  guests: number;
  pricePerNight: number;
  imageUrl: string;
  features: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  groundedSources?: string[];
}

export interface ReservationParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  rateType: string;
  usePoints: boolean;
}
