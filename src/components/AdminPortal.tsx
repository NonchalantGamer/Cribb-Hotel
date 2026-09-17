import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Building, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Search, 
  UserCheck, 
  XCircle, 
  RefreshCw, 
  Key, 
  Sparkles, 
  SlidersHorizontal,
  DollarSign,
  BedDouble,
  FileSpreadsheet,
  AlertCircle,
  PlusCircle,
  X,
  Send,
  Lock,
  ShieldCheck,
  LogOut,
  User,
  Users
} from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { 
  BookingRecord, 
  HotelRoomInventory, 
  HotelServiceRequest, 
  BookingStatus, 
  RoomCleanStatus,
  StaffMember
} from '../types';
import { 
  bootstrapHotelDatabase, 
  updateReservationStatus, 
  updateRoomStatus, 
  addServiceRequest,
  verifyStaffAccess,
  verifyStaffByEmail,
  INITIAL_STAFF_MEMBERS
} from '../lib/hotelDatabaseService';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  authorizedStaff: StaffMember | null;
  onStaffChange: (staff: StaffMember | null) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ 
  isOpen, 
  onClose,
  authorizedStaff,
  onStaffChange
}) => {
  const [staffIdentifier, setStaffIdentifier] = useState('joshuaegesienyinnaya@gmail.com');
  const [staffPasscode, setStaffPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [verifyingStaff, setVerifyingStaff] = useState(false);

  const [activeTab, setActiveTab] = useState<'reservations' | 'rooms' | 'requests' | 'overview'>('reservations');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [rooms, setRooms] = useState<HotelRoomInventory[]>([]);
  const [serviceRequests, setServiceRequests] = useState<HotelServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Quick service request state
  const [newRequestRoom, setNewRequestRoom] = useState('101');
  const [newRequestText, setNewRequestText] = useState('');
  const [newRequestCategory, setNewRequestCategory] = useState<'Housekeeping' | 'Room Service' | 'Maintenance' | 'Concierge'>('Housekeeping');
  const [submittingRequest, setSubmittingRequest] = useState(false);

  // Prevent background scroll when Admin Portal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Initialize and listen to Firestore
  useEffect(() => {
    if (!isOpen) return;

    // Bootstrap data once
    bootstrapHotelDatabase();

    // 1. Live Bookings Listener
    const unsubBookings = onSnapshot(
      collection(db, 'reservations'),
      (snapshot) => {
        const list: BookingRecord[] = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id } as BookingRecord);
        });
        // Sort descending by createdAt
        list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setBookings(list);
        setLoading(false);
      },
      (err) => {
        console.warn('Live bookings error:', err);
        setLoading(false);
      }
    );

    // 2. Live Rooms Listener
    const unsubRooms = onSnapshot(
      collection(db, 'rooms'),
      (snapshot) => {
        const list: HotelRoomInventory[] = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id } as HotelRoomInventory);
        });
        list.sort((a, b) => a.roomNumber.localeCompare(b.roomNumber));
        setRooms(list);
      },
      (err) => {
        console.warn('Live rooms error:', err);
      }
    );

    // 3. Live Service Requests Listener
    const unsubServices = onSnapshot(
      collection(db, 'service_requests'),
      (snapshot) => {
        const list: HotelServiceRequest[] = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id } as HotelServiceRequest);
        });
        setServiceRequests(list);
      },
      (err) => {
        console.warn('Live service requests error:', err);
      }
    );

    return () => {
      unsubBookings();
      unsubRooms();
      unsubServices();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Staff Login with Credentials
  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setVerifyingStaff(true);

    try {
      const staff = await verifyStaffAccess(staffIdentifier, staffPasscode);
      if (staff) {
        onStaffChange(staff);
      } else {
        setAuthError('Access Denied. Official staff identifier or security passcode is invalid.');
      }
    } catch (err) {
      setAuthError('Verification service error. Please try again.');
    } finally {
      setVerifyingStaff(false);
    }
  };

  // Handle Staff Login with Google Account (Firebase Auth)
  const handleGoogleStaffLogin = async () => {
    setAuthError('');
    setVerifyingStaff(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user?.email;
      if (email) {
        const staff = await verifyStaffByEmail(email);
        if (staff) {
          onStaffChange(staff);
        } else {
          setAuthError(`Access Denied: Google Account "${email}" is not registered in the authorized hotel team directory.`);
        }
      }
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setAuthError('Google authentication error. Please try using staff email & security passcode.');
      }
    } finally {
      setVerifyingStaff(false);
    }
  };

  const handleStaffLogout = () => {
    onStaffChange(null);
  };

  const handleQuickStaffSelect = (member: StaffMember) => {
    setStaffIdentifier(member.email);
    setStaffPasscode('');
    setAuthError('');
  };

  // Filtered reservations (search bar finds by guest name, confirmation ID, email, phone, or room)
  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || (
      (b.guestName && b.guestName.toLowerCase().includes(q)) ||
      (b.confirmationId && b.confirmationId.toLowerCase().includes(q)) ||
      (b.guestEmail && b.guestEmail.toLowerCase().includes(q)) ||
      (b.guestPhone && b.guestPhone.toLowerCase().includes(q)) ||
      (b.roomTitle && b.roomTitle.toLowerCase().includes(q)) ||
      (b.roomNumber && b.roomNumber.toLowerCase().includes(q))
    );
    
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Key Performance Indicators (KPIs)
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const occupiedRoomsCount = rooms.filter(r => r.isOccupied).length;
  const occupancyRate = rooms.length > 0 ? Math.round((occupiedRoomsCount / rooms.length) * 100) : 0;
  const activeCheckIns = bookings.filter(b => b.status === 'Checked In').length;

  const handleStatusChange = async (bkgId: string, newStatus: BookingStatus, roomNo?: string) => {
    try {
      await updateReservationStatus(bkgId, newStatus, roomNo);
    } catch (e) {
      alert('Could not update status: ' + e);
    }
  };

  const handleRoomCleanToggle = async (roomId: string, current: RoomCleanStatus) => {
    const nextStatus: RoomCleanStatus = 
      current === 'Clean & Inspected' ? 'Dirty / In Progress' :
      current === 'Dirty / In Progress' ? 'Turn-down Required' : 'Clean & Inspected';
    await updateRoomStatus(roomId, nextStatus);
  };

  const handleCreateServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestText.trim()) return;
    setSubmittingRequest(true);
    try {
      const room = rooms.find(r => r.roomNumber === newRequestRoom);
      await addServiceRequest({
        roomNumber: newRequestRoom,
        guestName: room?.currentGuestName || 'Valued Guest',
        category: newRequestCategory,
        request: newRequestText.trim(),
        priority: 'Medium',
        status: 'Open'
      });
      setNewRequestText('');
    } finally {
      setSubmittingRequest(false);
    }
  };

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[10000] overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={`relative w-full ${authorizedStaff ? 'max-w-6xl' : 'max-w-xl sm:max-w-2xl'} bg-stone-100 shadow-2xl border border-stone-300 overflow-hidden my-auto max-h-[92vh] sm:max-h-[95vh] flex flex-col`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Operational Header */}
        <div className="bg-[#17283c] text-white px-6 py-4 flex items-center justify-between border-b border-stone-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
              alt="Cribb Hotel Official Logo"
              className="w-10 h-10 object-contain rounded"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif font-bold tracking-wide uppercase">
                  Cribb Hotel &amp; Resorts Management Portal
                </h2>
                {authorizedStaff && (
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950 text-blue-200 border border-blue-800">
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                    Authorized Staff
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-300">
                Restricted operational system for permitted hotel personnel only
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {authorizedStaff && (
              <button
                onClick={handleStaffLogout}
                title="Lock / Sign Out Staff Portal"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 rounded transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out ({authorizedStaff.name.split(' ')[0]})</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ACCESS GATE: Render staff login gate if not authorized */}
        {!authorizedStaff ? (
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full">
            <div className="max-w-xl mx-auto py-2 pb-8">
              <div className="bg-white border border-stone-300 p-5 sm:p-8 shadow-md">
              <div className="flex justify-center mb-3">
                <img
                  src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
                  alt="Cribb Hotel Official Logo"
                  className="w-14 h-14 object-contain drop-shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-serif font-bold text-[#17283c]">
                  Permitted Staff Verification
                </h3>
                <p className="text-xs text-stone-500 mt-1.5">
                  This portal contains confidential guest folios, reservation records, and room inventories. Please sign in with your staff credentials.
                </p>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleStaffLogin}
                  disabled={verifyingStaff}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 border border-stone-300 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Sign In with Verified Google Staff Account</span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-stone-200" />
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">
                    or enter staff credentials
                  </span>
                  <div className="flex-1 h-px bg-stone-200" />
                </div>

                <form onSubmit={handleStaffLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                      Staff Email or Official Name
                    </label>
                    <input
                      type="text"
                      required
                      value={staffIdentifier}
                      onChange={(e) => setStaffIdentifier(e.target.value)}
                      placeholder="e.g. joshuaegesienyinnaya@gmail.com"
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 focus:outline-none focus:border-[#17283c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                      Staff Security Passcode / PIN
                    </label>
                    <input
                      type="password"
                      required
                      value={staffPasscode}
                      onChange={(e) => setStaffPasscode(e.target.value)}
                      placeholder="Enter assigned security passcode..."
                      className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 focus:outline-none focus:border-[#17283c]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={verifyingStaff}
                    className="w-full py-2.5 bg-[#17283c] hover:bg-[#0f1c2d] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {verifyingStaff ? 'Authenticating Staff...' : 'Access Staff Portal'}
                  </button>
                </form>

                {/* Permitted Staff Directory (Names only, no exposed PINs) */}
                <div className="mt-6 pt-5 border-t border-stone-200">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Permitted Staff Roles:
                    </span>
                    <span className="text-[10px] text-stone-400">Select profile to pre-fill</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INITIAL_STAFF_MEMBERS.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => handleQuickStaffSelect(member)}
                        className="p-2 text-left bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded transition-colors text-xs cursor-pointer group"
                      >
                        <div className="font-semibold text-stone-800 group-hover:text-[#17283c]">
                          {member.name}
                        </div>
                        <div className="text-[10px] text-stone-500">{member.role}</div>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                          {member.department}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <>
            {/* Top Global Search & Active Staff Banner */}
            <div className="bg-[#101b29] text-stone-200 px-6 py-2.5 border-b border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Universal Search Bar */}
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Quick find guest by name or confirmation ID (e.g. CRB-834921)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeTab !== 'reservations') {
                      setActiveTab('reservations');
                    }
                  }}
                  className="w-full pl-9 pr-8 py-1.5 text-xs bg-stone-900 border border-stone-600 text-white placeholder-stone-400 focus:outline-none focus:border-[#f8dec3]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-stone-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Active Staff Identity Badge */}
              <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#f8dec3] text-[#17283c] flex items-center justify-center font-bold text-xs">
                    {authorizedStaff.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-white block leading-tight">{authorizedStaff.name}</span>
                    <span className="text-[10px] text-stone-400">{authorizedStaff.role} • {authorizedStaff.department}</span>
                  </div>
                </div>
                <button
                  onClick={handleStaffLogout}
                  className="text-[11px] text-amber-300 hover:text-white underline cursor-pointer ml-2"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Tab Navigation & Status Ribbon */}
            <div className="bg-white border-b border-stone-200 px-6 flex items-center justify-between overflow-x-auto">
              <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'reservations'
                      ? 'border-[#17283c] text-[#17283c]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Calendar className="w-4 h-4" /> 
                  Reservations 
                  <span className="ml-1 px-1.5 py-0.2 bg-stone-200 text-stone-800 rounded-full text-[10px]">
                    {searchQuery ? `${filteredBookings.length} match` : bookings.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('rooms')}
                  className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'rooms'
                      ? 'border-[#17283c] text-[#17283c]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <BedDouble className="w-4 h-4" /> 
                  Room Inventory 
                  <span className="ml-1 px-1.5 py-0.2 bg-stone-200 text-stone-800 rounded-full text-[10px]">
                    {rooms.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'border-[#17283c] text-[#17283c]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Building className="w-4 h-4" /> Overview &amp; KPIs
                </button>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'requests'
                      ? 'border-[#17283c] text-[#17283c]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" /> 
                  Guest Requests 
                  <span className="ml-1 px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded-full text-[10px]">
                    {serviceRequests.length}
                  </span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs text-stone-500">
                <span>Property: <strong>Cribb Lagos Hotel (Flagship)</strong></span>
              </div>
            </div>

        {/* Modal Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider">Occupancy Rate</span>
                    <Building className="w-4 h-4 text-[#17283c]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#17283c]">
                    {occupancyRate}%
                  </div>
                  <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
                    <span>{occupiedRoomsCount} of {rooms.length} rooms occupied</span>
                    <span className="text-emerald-700 font-medium">Optimal</span>
                  </div>
                </div>

                <div className="bg-white p-5 border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider">Current In-House</span>
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">
                    {activeCheckIns} Guests
                  </div>
                  <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
                    <span>Checked in on premises</span>
                    <span className="text-stone-700 font-medium">Front Desk Open</span>
                  </div>
                </div>

                <div className="bg-white p-5 border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider">Confirmed Revenue</span>
                    <DollarSign className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#17283c]">
                    ${totalRevenue.toLocaleString()}
                  </div>
                  <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
                    <span>Across {bookings.length} reservations</span>
                    <span className="text-emerald-700 font-medium">100% Guaranteed</span>
                  </div>
                </div>

                <div className="bg-white p-5 border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider">Open Guest Requests</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    {serviceRequests.filter(r => r.status !== 'Completed').length} Pending
                  </div>
                  <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
                    <span>Avg resolution: 14 mins</span>
                    <span className="text-amber-800 font-medium">In Queue</span>
                  </div>
                </div>
              </div>

              {/* Quick Split: Recent In-House Guests & Live Room Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 cols: Recent Reservations */}
                <div className="lg:col-span-2 bg-white border border-stone-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                    <h3 className="font-serif font-bold text-base text-[#17283c]">
                      Recent Reservations &amp; Arrivals
                    </h3>
                    <button 
                      onClick={() => setActiveTab('reservations')}
                      className="text-xs font-bold text-[#17283c] hover:underline cursor-pointer"
                    >
                      View All ({bookings.length}) →
                    </button>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {bookings.slice(0, 4).map((b) => (
                      <div key={b.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-bold text-stone-900 text-sm">{b.guestName}</div>
                          <div className="text-stone-500">
                            {b.roomTitle} • Room {b.roomNumber || 'Pending assignment'}
                          </div>
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            {b.checkIn} – {b.checkOut} ({b.adults} Adults) • {b.confirmationId}
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'Checked In' ? 'bg-emerald-100 text-emerald-800' :
                            b.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                            b.status === 'Checked Out' ? 'bg-stone-100 text-stone-600' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {b.status}
                          </span>
                          <span className="font-mono font-bold text-stone-900">
                            ${b.totalAmount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right col: Live Housekeeping Status */}
                <div className="bg-white border border-stone-200 p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#17283c] border-b border-stone-200 pb-3 mb-3">
                      Housekeeping Status
                    </h3>
                    <div className="space-y-2.5 text-xs">
                      {rooms.slice(0, 5).map((room) => (
                        <div key={room.id} className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-100">
                          <div>
                            <span className="font-bold text-stone-900">Room {room.roomNumber}</span>
                            <span className="text-stone-400 block text-[10px]">{room.wing}</span>
                          </div>
                          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                            room.cleanStatus === 'Clean & Inspected' ? 'bg-emerald-100 text-emerald-800' :
                            room.cleanStatus === 'Turn-down Required' ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {room.cleanStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-200 text-center">
                    <button
                      onClick={() => setActiveTab('rooms')}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider rounded cursor-pointer transition-colors"
                    >
                      Manage Full Room Inventory
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RESERVATIONS MANAGER */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              {/* Search & Status Filters */}
              <div className="bg-white p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search guest name, room, or confirmation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 focus:outline-none focus:border-[#17283c]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-stone-600 uppercase">Filter Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-xs bg-stone-50 border border-stone-300 px-3 py-1.5 focus:outline-none focus:border-[#17283c]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Checked In">Checked In</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Reservations Table */}
              <div className="bg-white border border-stone-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#17283c] text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Confirmation</th>
                      <th className="py-3 px-4">Guest Information</th>
                      <th className="py-3 px-4">Room &amp; Dates</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-stone-400">
                          No reservations match your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((bkg) => (
                        <tr key={bkg.id} className="hover:bg-stone-50 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-stone-800">
                            {bkg.confirmationId}
                            <span className="block text-[10px] font-sans font-normal text-stone-400">
                              {new Date(bkg.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <strong className="text-stone-900 block">{bkg.guestName}</strong>
                            <span className="text-stone-500 block">{bkg.guestEmail}</span>
                            <span className="text-stone-400 text-[11px]">{bkg.guestPhone}</span>
                            {bkg.specialRequests && (
                              <div className="mt-1 text-[11px] text-amber-800 bg-amber-50 p-1 rounded border border-amber-200 max-w-xs">
                                <strong>Request:</strong> {bkg.specialRequests}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-stone-900 block">{bkg.roomTitle}</span>
                            <span className="text-stone-600 block">Room: {bkg.roomNumber || 'Unassigned'}</span>
                            <span className="text-stone-500 text-[11px] block">{bkg.checkIn} – {bkg.checkOut}</span>
                            <span className="text-stone-400 text-[10px]">{bkg.adults} Adults, {bkg.children} Children</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-stone-900">
                            ${bkg.totalAmount}
                            <span className="block text-[10px] text-emerald-600 font-sans">{bkg.paymentStatus}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase inline-block ${
                              bkg.status === 'Checked In' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                              bkg.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                              bkg.status === 'Checked Out' ? 'bg-stone-100 text-stone-600 border border-stone-300' :
                              'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}>
                              {bkg.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5 flex-wrap">
                              {bkg.status === 'Confirmed' && (
                                <button
                                  onClick={() => handleStatusChange(bkg.id, 'Checked In', bkg.roomNumber)}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold cursor-pointer transition-colors"
                                >
                                  Check In
                                </button>
                              )}
                              {bkg.status === 'Checked In' && (
                                <button
                                  onClick={() => handleStatusChange(bkg.id, 'Checked Out', bkg.roomNumber)}
                                  className="px-2.5 py-1 bg-stone-700 hover:bg-stone-900 text-white rounded text-[11px] font-semibold cursor-pointer transition-colors"
                                >
                                  Check Out
                                </button>
                              )}
                              {bkg.status !== 'Cancelled' && bkg.status !== 'Checked Out' && (
                                <button
                                  onClick={() => handleStatusChange(bkg.id, 'Cancelled', bkg.roomNumber)}
                                  className="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded text-[11px] font-semibold cursor-pointer"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ROOM INVENTORY & DIGITAL KEY MATRIX */}
          {activeTab === 'rooms' && (
            <div className="space-y-4">
              <div className="bg-white p-4 border border-stone-200 flex items-center justify-between flex-wrap gap-3 shadow-sm">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#17283c]">
                    Cribb Room &amp; Keycard Inventory Matrix
                  </h3>
                  <p className="text-xs text-stone-500">
                    Click room cards to toggle housekeeping cleaning verification.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Available / Inspected
                  </span>
                  <span className="flex items-center gap-1 text-rose-800 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> In-House Occupied
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.map((room) => (
                  <div 
                    key={room.id}
                    className={`bg-white border p-4 shadow-sm relative transition-all ${
                      room.isOccupied ? 'border-rose-300' : 'border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-serif font-bold text-[#17283c]">
                        Room {room.roomNumber}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        room.isOccupied 
                          ? 'bg-rose-100 text-rose-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {room.isOccupied ? 'Occupied' : 'Vacant'}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-stone-800 truncate">{room.roomTitle}</p>
                    <p className="text-[11px] text-stone-500">{room.wing}</p>

                    <div className="my-3 py-2 border-y border-stone-100 text-xs space-y-1">
                      {room.isOccupied ? (
                        <>
                          <div className="text-stone-900 font-medium">Guest: {room.currentGuestName}</div>
                          <div className="text-[11px] text-stone-500">Departing: {room.checkOutDate}</div>
                        </>
                      ) : (
                        <div className="text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ready for next check-in
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        onClick={() => handleRoomCleanToggle(room.id, room.cleanStatus)}
                        className={`text-[11px] font-semibold underline cursor-pointer ${
                          room.cleanStatus === 'Clean & Inspected' ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {room.cleanStatus}
                      </button>

                      <span className="font-mono text-xs font-bold text-stone-700">
                        ${room.ratePerNight}/nt
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GUEST SERVICE REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* Add Service Request Card */}
              <div className="bg-white p-5 border border-stone-200 shadow-sm">
                <h3 className="font-serif font-bold text-base text-[#17283c] mb-3">
                  Log Instant Guest Service Request
                </h3>
                <form onSubmit={handleCreateServiceRequest} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">Room #</label>
                    <select
                      value={newRequestRoom}
                      onChange={(e) => setNewRequestRoom(e.target.value)}
                      className="w-full h-9 px-2 bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-[#17283c]"
                    >
                      {rooms.map(r => (
                        <option key={r.id} value={r.roomNumber}>
                          Room {r.roomNumber} {r.currentGuestName ? `(${r.currentGuestName})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">Category</label>
                    <select
                      value={newRequestCategory}
                      onChange={(e) => setNewRequestCategory(e.target.value as any)}
                      className="w-full h-9 px-2 bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-[#17283c]"
                    >
                      <option value="Housekeeping">Housekeeping</option>
                      <option value="Room Service">Room Service</option>
                      <option value="Concierge">Concierge</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 flex items-end gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] uppercase font-bold text-stone-600 block mb-1">Request Details</label>
                      <input
                        type="text"
                        placeholder="e.g. 2 extra bath sheets and ice bucket"
                        value={newRequestText}
                        onChange={(e) => setNewRequestText(e.target.value)}
                        className="w-full h-9 px-3 bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-[#17283c]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingRequest || !newRequestText.trim()}
                      className="h-9 px-5 bg-[#17283c] hover:bg-[#0f1c2d] text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Dispatch
                    </button>
                  </div>
                </form>
              </div>

              {/* Service Request Dispatch Board */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Open', 'In Progress', 'Completed'].map((statusColumn) => {
                  const columnItems = serviceRequests.filter(r => r.status === statusColumn);
                  return (
                    <div key={statusColumn} className="bg-white border border-stone-200 shadow-sm p-4">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#17283c]">
                          {statusColumn}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded bg-stone-100 font-bold text-stone-700">
                          {columnItems.length}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {columnItems.length === 0 ? (
                          <div className="text-stone-400 text-xs py-4 text-center">
                            No requests in this queue.
                          </div>
                        ) : (
                          columnItems.map((item) => (
                            <div key={item.id} className="p-3 bg-stone-50 border border-stone-200 rounded text-xs">
                              <div className="flex items-center justify-between font-bold text-stone-900">
                                <span>Room {item.roomNumber}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase ${
                                  item.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                                  item.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                                  'bg-stone-200 text-stone-700'
                                }`}>
                                  {item.priority}
                                </span>
                              </div>
                              <div className="text-[11px] text-stone-500 mt-0.5">{item.guestName} • {item.category}</div>
                              <p className="mt-2 text-stone-800 font-medium">{item.request}</p>
                              <div className="mt-2 text-[10px] text-stone-400">{item.createdAt}</div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};
