import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { BookingRecord, HotelRoomInventory, HotelServiceRequest, BookingStatus, RoomCleanStatus, StaffMember } from '../types';

export const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'staff-1',
    email: 'joshuaegesienyinnaya@gmail.com',
    name: 'Joshua Egesienyinnaya',
    role: 'General Manager',
    staffPasscode: '2026',
    active: true,
    department: 'Executive Administration'
  },
  {
    id: 'staff-2',
    email: 'admin@cribbhotel.com',
    name: 'Helena Vance',
    role: 'Front Desk Supervisor',
    staffPasscode: '1234',
    active: true,
    department: 'Front Office & Folios'
  },
  {
    id: 'staff-3',
    email: 'concierge@cribbhotel.com',
    name: 'Tariq Al-Mansoor',
    role: 'Concierge Manager',
    staffPasscode: '7788',
    active: true,
    department: 'Guest Relations & VIP'
  },
  {
    id: 'staff-4',
    email: 'housekeeping@cribbhotel.com',
    name: 'Grace Adewale',
    role: 'Housekeeping Director',
    staffPasscode: '4455',
    active: true,
    department: 'Housekeeping & Maintenance'
  }
];

// Seed rooms data if collection is empty
export const INITIAL_HOTEL_ROOMS: HotelRoomInventory[] = [
  {
    id: 'room-101',
    roomNumber: '101',
    floor: 1,
    wing: 'East Garden Wing',
    roomTypeId: 'deluxe-double',
    roomTitle: 'Classic Deluxe Double Queen',
    isOccupied: true,
    currentBookingId: 'CRB-834921',
    currentGuestName: 'Alexander Hayes',
    checkOutDate: 'Oct 17, 2026',
    cleanStatus: 'Clean & Inspected',
    keycardActive: true,
    ratePerNight: 310
  },
  {
    id: 'room-102',
    roomNumber: '102',
    floor: 1,
    wing: 'East Garden Wing',
    roomTypeId: 'deluxe-king',
    roomTitle: 'Classic Deluxe King',
    isOccupied: false,
    currentBookingId: null,
    currentGuestName: null,
    checkOutDate: null,
    cleanStatus: 'Clean & Inspected',
    keycardActive: false,
    ratePerNight: 280
  },
  {
    id: 'room-201',
    roomNumber: '201',
    floor: 2,
    wing: 'Waterfront Lagoon Wing',
    roomTypeId: 'deluxe-king',
    roomTitle: 'Classic Deluxe King',
    isOccupied: true,
    currentBookingId: 'CRB-642189',
    currentGuestName: 'Dr. Evelyn Vance',
    checkOutDate: 'Oct 19, 2026',
    cleanStatus: 'Turn-down Required',
    keycardActive: true,
    ratePerNight: 280
  },
  {
    id: 'room-202',
    roomNumber: '202',
    floor: 2,
    wing: 'Waterfront Lagoon Wing',
    roomTypeId: 'club-king',
    roomTitle: 'Executive Club Level King',
    isOccupied: false,
    currentBookingId: null,
    currentGuestName: null,
    checkOutDate: null,
    cleanStatus: 'Dirty / In Progress',
    keycardActive: false,
    ratePerNight: 390
  },
  {
    id: 'room-301',
    roomNumber: '301',
    floor: 3,
    wing: 'Royal Panorama Wing',
    roomTypeId: 'club-king',
    roomTitle: 'Executive Club Level King',
    isOccupied: true,
    currentBookingId: 'CRB-914283',
    currentGuestName: 'Marcus Sterling',
    checkOutDate: 'Oct 20, 2026',
    cleanStatus: 'Clean & Inspected',
    keycardActive: true,
    ratePerNight: 390
  },
  {
    id: 'room-401',
    roomNumber: '401',
    floor: 4,
    wing: 'Penthouse High Floor',
    roomTypeId: 'ambassador-suite',
    roomTitle: 'The Ambassador One-Bedroom Suite',
    isOccupied: true,
    currentBookingId: 'CRB-452109',
    currentGuestName: 'Ambassador Jean-Luc Moreau',
    checkOutDate: 'Oct 22, 2026',
    cleanStatus: 'Clean & Inspected',
    keycardActive: true,
    ratePerNight: 620
  },
  {
    id: 'room-402',
    roomNumber: '402',
    floor: 4,
    wing: 'Penthouse High Floor',
    roomTypeId: 'ambassador-suite',
    roomTitle: 'The Ambassador One-Bedroom Suite',
    isOccupied: false,
    currentBookingId: null,
    currentGuestName: null,
    checkOutDate: null,
    cleanStatus: 'Clean & Inspected',
    keycardActive: false,
    ratePerNight: 620
  },
  {
    id: 'room-501',
    roomNumber: '501 (Penthouse)',
    floor: 5,
    wing: 'Presidential Sky Suite',
    roomTypeId: 'presidential-suite',
    roomTitle: 'The Presidential Cribb Suite',
    isOccupied: false,
    currentBookingId: null,
    currentGuestName: null,
    checkOutDate: null,
    cleanStatus: 'Clean & Inspected',
    keycardActive: false,
    ratePerNight: 1450
  }
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'bkg-1',
    confirmationId: 'CRB-834921',
    destination: 'Cribb Lagos Hotel',
    roomTypeId: 'deluxe-double',
    roomTitle: 'Classic Deluxe Double Queen',
    roomNumber: '101',
    guestName: 'Alexander Hayes',
    guestEmail: 'a.hayes@globalmeridian.com',
    guestPhone: '+234 803 555 0192',
    specialRequests: 'High floor preferred, extra hypoallergenic pillows, late arrival at 8 PM.',
    checkIn: 'Oct 14, 2026',
    checkOut: 'Oct 17, 2026',
    adults: 2,
    children: 1,
    roomsCount: 1,
    pricePerNight: 310,
    totalNights: 3,
    totalAmount: 930,
    status: 'Checked In',
    paymentStatus: 'Paid',
    rateType: 'Cribb Rewards Member Rate',
    notes: 'VIP Gold Member. Welcomed with complimentary fruit basket.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'bkg-2',
    confirmationId: 'CRB-642189',
    destination: 'Cribb Lagos Hotel',
    roomTypeId: 'deluxe-king',
    roomTitle: 'Classic Deluxe King',
    roomNumber: '201',
    guestName: 'Dr. Evelyn Vance',
    guestEmail: 'evelyn.vance@oxfordbiomed.org',
    guestPhone: '+44 7700 900342',
    specialRequests: 'Quiet room away from elevators. Non-feather bedding.',
    checkIn: 'Oct 15, 2026',
    checkOut: 'Oct 19, 2026',
    adults: 1,
    children: 0,
    roomsCount: 1,
    pricePerNight: 280,
    totalNights: 4,
    totalAmount: 1120,
    status: 'Checked In',
    paymentStatus: 'Paid',
    rateType: 'Lowest Regular Rate',
    notes: 'Conference attendee for West African Medical Summit.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'bkg-3',
    confirmationId: 'CRB-914283',
    destination: 'Cribb Lagos Hotel',
    roomTypeId: 'club-king',
    roomTitle: 'Executive Club Level King',
    roomNumber: '301',
    guestName: 'Marcus Sterling',
    guestEmail: 'marcus@sterlingcapital.co',
    guestPhone: '+1 212 555 7842',
    specialRequests: 'Airport chauffeured transfer arranged from Terminal 1.',
    checkIn: 'Oct 15, 2026',
    checkOut: 'Oct 20, 2026',
    adults: 2,
    children: 0,
    roomsCount: 1,
    pricePerNight: 390,
    totalNights: 5,
    totalAmount: 1950,
    status: 'Checked In',
    paymentStatus: 'Paid',
    rateType: 'Cribb Rewards Member Rate',
    notes: 'Access card to Private 24/7 Club Lounge issued.',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'bkg-4',
    confirmationId: 'CRB-452109',
    destination: 'Cribb Lagos Hotel',
    roomTypeId: 'ambassador-suite',
    roomTitle: 'The Ambassador One-Bedroom Suite',
    roomNumber: '401',
    guestName: 'Ambassador Jean-Luc Moreau',
    guestEmail: 'jl.moreau@diplomatie.gouv',
    guestPhone: '+33 6 12 34 56 78',
    specialRequests: 'Official diplomatic protocol. Butler service assigned.',
    checkIn: 'Oct 16, 2026',
    checkOut: 'Oct 22, 2026',
    adults: 2,
    children: 0,
    roomsCount: 1,
    pricePerNight: 620,
    totalNights: 6,
    totalAmount: 3720,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    rateType: 'Government & Military',
    notes: 'Requires secure motorcade parking.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_SERVICE_REQUESTS: HotelServiceRequest[] = [
  {
    id: 'req-1',
    roomNumber: '201',
    guestName: 'Dr. Evelyn Vance',
    category: 'Housekeeping',
    request: 'Additional bath sheets and sparkling mineral water.',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '10 mins ago'
  },
  {
    id: 'req-2',
    roomNumber: '301',
    guestName: 'Marcus Sterling',
    category: 'Room Service',
    request: 'Breakfast cart: 2 eggs Benedict, freshly squeezed orange juice, French roast coffee at 7:30 AM.',
    priority: 'High',
    status: 'Open',
    createdAt: '25 mins ago'
  },
  {
    id: 'req-3',
    roomNumber: '101',
    guestName: 'Alexander Hayes',
    category: 'Concierge',
    request: 'Dinner table reservation for 3 at The Heritage Grillhouse at 8:15 PM.',
    priority: 'Low',
    status: 'Completed',
    createdAt: '1 hour ago'
  }
];

/**
 * Initialize Firestore data if not yet present
 */
export async function bootstrapHotelDatabase() {
  try {
    // Check if rooms exist
    const roomsSnap = await getDocs(collection(db, 'rooms'));
    if (roomsSnap.empty) {
      console.log('Seeding initial hotel rooms into Firestore...');
      for (const room of INITIAL_HOTEL_ROOMS) {
        await setDoc(doc(db, 'rooms', room.id), room);
      }
    }

    // Check if reservations exist
    const bkgSnap = await getDocs(collection(db, 'reservations'));
    if (bkgSnap.empty) {
      console.log('Seeding initial reservations into Firestore...');
      for (const bkg of INITIAL_BOOKINGS) {
        await setDoc(doc(db, 'reservations', bkg.id), bkg);
      }
    }

    // Check service requests
    const srvSnap = await getDocs(collection(db, 'service_requests'));
    if (srvSnap.empty) {
      console.log('Seeding service requests into Firestore...');
      for (const srv of INITIAL_SERVICE_REQUESTS) {
        await setDoc(doc(db, 'service_requests', srv.id), srv);
      }
    }

    // Check staff members
    const staffSnap = await getDocs(collection(db, 'staff'));
    if (staffSnap.empty) {
      console.log('Seeding staff directory into Firestore...');
      for (const member of INITIAL_STAFF_MEMBERS) {
        await setDoc(doc(db, 'staff', member.id), member);
      }
    }
  } catch (err) {
    console.warn('Firestore database bootstrap encountered an issue:', err);
  }
}

/**
 * Save new guest reservation to Firestore (and update assigned room if applicable)
 */
export async function createReservationInFirebase(booking: Omit<BookingRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<BookingRecord> {
  const newId = 'bkg-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const now = new Date().toISOString();
  
  const record: BookingRecord = {
    ...booking,
    id: newId,
    createdAt: now,
    updatedAt: now
  };

  try {
    await setDoc(doc(db, 'reservations', newId), record);
    
    // If room is assigned, mark as occupied
    if (record.roomNumber) {
      const roomsSnap = await getDocs(collection(db, 'rooms'));
      const matching = roomsSnap.docs.find(d => d.data().roomNumber === record.roomNumber);
      if (matching) {
        await updateDoc(doc(db, 'rooms', matching.id), {
          isOccupied: true,
          currentBookingId: record.confirmationId,
          currentGuestName: record.guestName,
          checkOutDate: record.checkOut
        });
      }
    }
  } catch (e) {
    console.error('Failed to create reservation in Firestore:', e);
    // Fallback: Still return record so UI stays responsive
  }

  return record;
}

/**
 * Update reservation status (e.g. Check In, Check Out, Cancel)
 */
export async function updateReservationStatus(bookingId: string, status: BookingStatus, roomNumber?: string) {
  try {
    const bkgRef = doc(db, 'reservations', bookingId);
    const updates: Partial<BookingRecord> = {
      status,
      updatedAt: new Date().toISOString()
    };
    if (roomNumber) {
      updates.roomNumber = roomNumber;
    }
    await updateDoc(bkgRef, updates);

    // If checked out or cancelled, free the room
    if (status === 'Checked Out' || status === 'Cancelled') {
      const roomsSnap = await getDocs(collection(db, 'rooms'));
      const matching = roomsSnap.docs.find(d => d.data().currentBookingId === bookingId || (roomNumber && d.data().roomNumber === roomNumber));
      if (matching) {
        await updateDoc(doc(db, 'rooms', matching.id), {
          isOccupied: false,
          currentBookingId: null,
          currentGuestName: null,
          checkOutDate: null,
          cleanStatus: 'Turn-down Required'
        });
      }
    }
  } catch (err) {
    console.error('Error updating reservation status:', err);
    throw err;
  }
}

/**
 * Update room clean / maintenance status
 */
export async function updateRoomStatus(roomId: string, cleanStatus: RoomCleanStatus, isOccupied?: boolean) {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const updates: any = { cleanStatus };
    if (typeof isOccupied === 'boolean') {
      updates.isOccupied = isOccupied;
    }
    await updateDoc(roomRef, updates);
  } catch (err) {
    console.error('Error updating room status:', err);
    throw err;
  }
}

/**
 * Add a quick service request (Housekeeping, room service, concierge, maintenance)
 */
export async function addServiceRequest(request: Omit<HotelServiceRequest, 'id' | 'createdAt'>) {
  const id = 'req-' + Date.now();
  const newReq: HotelServiceRequest = {
    ...request,
    id,
    createdAt: 'Just now'
  };
  try {
    await setDoc(doc(db, 'service_requests', id), newReq);
  } catch (err) {
    console.error('Failed to add service request:', err);
  }
  return newReq;
}

/**
 * Verify staff credentials against Firestore staff directory or fallback staff
 */
export async function verifyStaffAccess(identifier: string, passcode: string): Promise<StaffMember | null> {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = passcode.trim();

  try {
    const snap = await getDocs(collection(db, 'staff'));
    if (!snap.empty) {
      for (const docSnap of snap.docs) {
        const staff = docSnap.data() as StaffMember;
        if (
          staff.active &&
          (staff.email.toLowerCase() === cleanId || staff.name.toLowerCase() === cleanId) &&
          staff.staffPasscode === cleanPass
        ) {
          return staff;
        }
      }
    }
  } catch (err) {
    console.warn('Could not read staff from Firestore, checking initial directory:', err);
  }

  // Fallback to local INITIAL_STAFF_MEMBERS for robust offline/fallback resilience
  const fallback = INITIAL_STAFF_MEMBERS.find(
    s => (s.email.toLowerCase() === cleanId || s.name.toLowerCase() === cleanId) && s.staffPasscode === cleanPass
  );

  return fallback || null;
}

/**
 * Verify staff by email directly (e.g. from Google Firebase Auth)
 */
export async function verifyStaffByEmail(email: string): Promise<StaffMember | null> {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const snap = await getDocs(collection(db, 'staff'));
    if (!snap.empty) {
      for (const docSnap of snap.docs) {
        const staff = docSnap.data() as StaffMember;
        if (staff.active && staff.email.toLowerCase() === cleanEmail) {
          return staff;
        }
      }
    }
  } catch (err) {
    console.warn('Could not read staff from Firestore, checking fallback:', err);
  }

  const fallback = INITIAL_STAFF_MEMBERS.find(
    s => s.active && s.email.toLowerCase() === cleanEmail
  );
  return fallback || null;
}

/**
 * Check if an email is registered as hotel staff
 */
export function isStaffEmail(email: string): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return (
    clean === 'joshuaegesienyinnaya@gmail.com' ||
    INITIAL_STAFF_MEMBERS.some(s => s.email.toLowerCase() === clean) ||
    clean.endsWith('@cribbhotel.com')
  );
}
