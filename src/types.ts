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

export type BookingStatus = 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Pending' | 'Deposit Paid';
export type RoomCleanStatus = 'Clean & Inspected' | 'Dirty / In Progress' | 'Turn-down Required' | 'Maintenance Required';

export interface BookingRecord {
  id: string;
  confirmationId: string;
  destination: string;
  roomTypeId: string;
  roomTitle: string;
  roomNumber?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomsCount: number;
  pricePerNight: number;
  totalNights: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  rateType: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HotelRoomInventory {
  id: string;
  roomNumber: string;
  floor: number;
  wing: string;
  roomTypeId: string;
  roomTitle: string;
  isOccupied: boolean;
  currentBookingId?: string | null;
  currentGuestName?: string | null;
  checkOutDate?: string | null;
  cleanStatus: RoomCleanStatus;
  keycardActive: boolean;
  ratePerNight: number;
}

export interface HotelServiceRequest {
  id: string;
  roomNumber: string;
  guestName: string;
  category: 'Housekeeping' | 'Room Service' | 'Maintenance' | 'Concierge' | 'Luggage Transfer';
  request: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Completed';
  createdAt: string;
}
