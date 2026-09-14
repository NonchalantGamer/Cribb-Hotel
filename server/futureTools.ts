/**
 * Future Tool Declarations and Integration Interfaces for Cribb Hotel.
 * 
 * These interfaces and stubs allow the AI Concierge to seamlessly plug into
 * real-world Property Management Systems (PMS), CRS, Central Reservations,
 * and IoT Hotel Maintenance systems once live API credentials become available.
 * 
 * In accordance with our safety and hallucination prevention guidelines:
 * - Stubs explicitly return unauthenticated or placeholder statuses.
 * - The AI is instructed never to pretend an action succeeded unless these tools
 *   return actual confirmation.
 */

export interface RoomAvailabilityQuery {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children?: number;
  roomTypePreference?: string;
}

export interface RoomAvailabilityResult {
  connectedToPms: boolean;
  availableRooms: Array<{
    roomId: string;
    roomType: string;
    ratePerNight: number;
    currency: string;
    availableCount: number;
  }>;
  notice: string;
}

export interface ReservationParams {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
}

export interface SupportTicketParams {
  roomNumber: string;
  guestName?: string;
  department: 'maintenance' | 'housekeeping' | 'front_desk' | 'it' | 'security';
  issueDescription: string;
  urgency: 'low' | 'medium' | 'high' | 'immediate_safety';
}

export const hotelToolDeclarations = {
  /**
   * Check real-time room availability across Cribb Hotel PMS.
   */
  async checkRoomAvailability(query: RoomAvailabilityQuery): Promise<RoomAvailabilityResult> {
    return {
      connectedToPms: false,
      availableRooms: [],
      notice: "Live PMS reservation database is not connected in preview mode. Direct the guest to the reservation engine."
    };
  },

  /**
   * Retrieve live menu for hotel restaurant venues.
   */
  async getRestaurantMenu(venueId: string) {
    return {
      connected: false,
      venueId,
      notice: "Live POS menu integration pending. Refer to standard knowledge base menus."
    };
  },

  /**
   * Create an official maintenance or housekeeping dispatch ticket.
   */
  async createSupportRequest(ticket: SupportTicketParams) {
    return {
      connectedToDispatchSystem: false,
      ticketCreated: false,
      notice: "Live dispatch system not connected. Instruct the guest to dial extension 0 or 3 for immediate front desk / housekeeping assistance."
    };
  },

  /**
   * Look up a guest reservation status by booking reference.
   */
  async checkBookingStatus(bookingReference: string) {
    return {
      connected: false,
      bookingReference,
      notice: "Direct CRS lookup not connected. Inform the guest to check their email confirmation or speak with reservations."
    };
  }
};
