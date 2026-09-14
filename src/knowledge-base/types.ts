export interface KnowledgeChunk {
  id: string;
  category: 'hotel' | 'rooms' | 'policies' | 'services' | 'support' | 'emergency';
  subCategory: string;
  title: string;
  keywords: string[];
  content: string;
  placeholders?: string[];
  actionableGuidance?: string;
}

export interface HotelPolicyMeta {
  hotelName: string;
  brandMonogram: string;
  addressPlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  checkInTimePlaceholder: string;
  checkOutTimePlaceholder: string;
  bookingUrlPlaceholder: string;
  emergencyPhonePlaceholder: string;
}

export const HOTEL_META: HotelPolicyMeta = {
  hotelName: "Cribb Hotel",
  brandMonogram: "C",
  addressPlaceholder: "[HOTEL ADDRESS - e.g., Plot 1415, Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria]",
  phonePlaceholder: "[PHONE NUMBER - e.g., +234 1 277 8888]",
  emailPlaceholder: "[EMAIL ADDRESS - e.g., concierge@cribbhotel.com]",
  checkInTimePlaceholder: "[CHECK-IN TIME - 3:00 PM]",
  checkOutTimePlaceholder: "[CHECK-OUT TIME - 12:00 PM]",
  bookingUrlPlaceholder: "[BOOKING URL - https://cribbhotel.com/reserve]",
  emergencyPhonePlaceholder: "[HOTEL EMERGENCY NUMBER - ext. 99 or +234 1 277 8899]"
};
