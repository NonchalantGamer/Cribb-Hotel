import { KnowledgeChunk } from '../types';

export const supportKnowledge: KnowledgeChunk[] = [
  {
    id: 'support-ac-problems',
    category: 'support',
    subCategory: 'air-conditioning',
    title: 'Troubleshooting Air Conditioning & Room Climate',
    keywords: ['ac', 'air conditioning', 'hot', 'cold', 'thermostat', 'fan', 'temperature', 'not cooling', 'ac broken'],
    content: `Air Conditioning & Climate Troubleshooting:
If your room AC does not seem to be cooling or heating properly:
1. Check Master Keycard Power: Ensure your room keycard is firmly placed inside the wall-mounted energy slot by the entrance door, as the climate unit requires circuit activation.
2. Check Windows & Balcony Doors: For safety and energy efficiency, our modern climate system automatically pauses airflow if balcony sliding doors or windows are unlocked or slightly ajar.
3. Wall Thermostat Control: Verify the thermostat screen is illuminated. Press 'Mode' to select 'Cool' and adjust the temperature setting (recommended comfort zone: 20°C - 22°C / 68°F - 72°F). Allow 5 minutes for airflow to adjust.
4. If it remains non-functional: Apologize to the guest. Advise them to contact Front Desk / Maintenance immediately by dialing '0' from their room telephone. The duty engineer can perform an on-site check or arrange a room re-assignment if required.
*The AI concierge cannot remotely dispatch an engineer without connected facility management APIs.*`
  },
  {
    id: 'support-wifi-problems',
    category: 'support',
    subCategory: 'wifi',
    title: 'Wi-Fi Connection & Internet Troubleshooting',
    keywords: ['wifi', 'wi-fi', 'internet', 'connection', 'password', 'slow', 'disconnect', 'captive portal', 'network'],
    content: `Wi-Fi Connection & Support:
• Network Name: 'Cribb-Guest' or 'Cribb-Executive'
• Login Steps:
  1. Select 'Cribb-Guest' on your mobile device or laptop.
  2. A welcome browser portal should launch automatically. If it does not appear within 10 seconds, open any web browser and navigate to 'login.cribbhotel.com' or 'http://neverssl.com'.
  3. Enter your Room Number and the Last Name registered on the booking.
• Troubleshooting:
  - Check whether other devices experience the same issue.
  - Forget the 'Cribb-Guest' network on your device and reconnect.
  - Disable any active third-party VPN clients temporarily to clear the captive portal.
• Ongoing Support: If connectivity issues persist, please dial ext. 0 for our 24/7 dedicated IT Helpdesk to refresh your room port or assist with high-bandwidth streaming needs.`
  },
  {
    id: 'support-hot-water',
    category: 'support',
    subCategory: 'water',
    title: 'Hot Water & Bathroom Plumbing Issues',
    keywords: ['hot water', 'cold water', 'shower', 'plumbing', 'water pressure', 'drain', 'leak', 'toilet'],
    content: `Hot Water & Plumbing Support:
• Water Flow Guidance: During peak morning hours (7:00 AM - 9:00 AM), high-pressure hot water circulation may require running the tap for 60 to 90 seconds to reach full temperature.
• If water remains completely cold or there is insufficient pressure:
  - Check that the mixer handle is fully turned towards the red/hot indicator.
  - If the issue continues, it indicates an isolated mixing valve or boiler line matter.
  - Apologize genuinely for the inconvenience and direct the guest to contact Front Desk (ext. 0).
  - Front Desk will dispatch the engineering duty team to inspect the room's thermostatic valve immediately, or offer access to a hospitality suite for showering.`
  },
  {
    id: 'support-power-electricity',
    category: 'support',
    subCategory: 'electricity',
    title: 'Power Outage & Electrical Outlets',
    keywords: ['power', 'electricity', 'lights', 'blackout', 'outage', 'outlets', 'socket', 'adaptor'],
    content: `Electrical & Power Support:
• In-Room Keycard Master: All lighting and non-essential power outlets are controlled by the keycard master switch at your entry foyer. Verify the keycard is seated in the slot.
• Emergency & Backup Power: Cribb Hotel is equipped with dual heavy-duty synchronized backup generators and uninterruptible power supply (UPS) units. In the rare event of a municipal grid drop, full hotel backup power engages within 8 to 15 seconds.
• If only specific outlets in your room are unresponsive: The circuit breaker switch in your foyer panel may have tripped. Please dial '0' for maintenance to reset the breaker safely.
• Universal Travel Adaptors: Multi-country electrical adaptors and USB-C chargers are available from the concierge desk.`
  },
  {
    id: 'support-noise-complaint',
    category: 'support',
    subCategory: 'noise',
    title: 'Noise Complaints & Disturbance Resolution',
    keywords: ['noise', 'loud', 'party', 'neighbor', 'music', 'banging', 'screaming', 'cannot sleep', 'quiet'],
    content: `Noise Complaints & Resolution:
• Acknowledge & Apologize: A peaceful night's rest is our utmost commitment.
• De-escalation Protocol:
  - NEVER encourage a guest to confront neighbors directly, as this can escalate tension.
  - Ask the guest for their room number and the approximate location of the disturbance (e.g., adjacent room, hallway, pool deck).
  - Instruct the guest to dial ext. 0 for Front Desk / Duty Security immediately.
  - Our security supervisor will visit the area promptly to enforce quiet hours with discretion.
  - If external or construction noise cannot be mitigated, the front desk can relocate the guest to a quieter courtyard or high-floor room.`
  },
  {
    id: 'support-cleanliness',
    category: 'support',
    subCategory: 'housekeeping',
    title: 'Cleanliness Complaints & Quality Assurance',
    keywords: ['dirty', 'cleanliness', 'hair', 'stain', 'smell', 'dust', 'not cleaned', 'trash', 'sheets'],
    content: `Room Cleanliness & Quality Escalation:
• Protocol:
  - Offer a sincere, immediate apology. Our 5-star cleanliness standard is uncompromising.
  - Ask for specific details (e.g., bathroom condition, unmade bed, missed turndown).
  - Advise the guest to dial Housekeeping (ext. 3) or the Duty Manager (ext. 0).
  - Housekeeping will dispatch a senior floor supervisor to conduct an immediate inspection and rapid re-cleaning, or re-assign the guest to a pristine room of equal or upgraded category with our compliments.`
  },
  {
    id: 'support-billing-dispute',
    category: 'support',
    subCategory: 'billing',
    title: 'Billing Inquiries & Folio Disputes',
    keywords: ['bill', 'charged', 'incorrect charge', 'receipt', 'folio', 'invoice', 'overcharged', 'dispute', 'refund'],
    content: `Billing Inquiries & Folio Review:
• Protocol:
  - Listen carefully and ask the guest for the specific charge or transaction date in question.
  - Explain that incidentals (such as restaurant dining, minibar, or spa charges) are posted with physical or digital signed chits.
  - The AI assistant does not have direct access to private billing ledgers or credit card processing machines, and cannot adjust transactions.
  - Direct the guest to the Front Desk cashier or Accounts Department (ext. 104), who will gladly print an itemized folio, review any disputed slips, and immediately reverse accidental or duplicate postings.`
  },
  {
    id: 'support-lost-property',
    category: 'support',
    subCategory: 'lost-property',
    title: 'Lost Property & Found Items Inquiries',
    keywords: ['lost', 'found', 'forgot', 'left behind', 'misplaced', 'wallet', 'phone', 'passport', 'luggage', 'watch'],
    content: `Lost Property Procedure:
• Immediate Guidance:
  - Ask the guest for a detailed description of the item, approximate time lost, and last known location (e.g., room number, restaurant, pool cabana, lobby).
  - Instruct the guest to contact Security & Lost and Found by dialing '0' or visiting the concierge desk.
  - All items found across the property are cataloged in our secure 24-hour Lost & Found registry.
  - Never guarantee that an item will be recovered, but reassure the guest that our security team will immediately search the specified areas and contact housekeeping.
  - For items left behind after checkout, our concierge can arrange international courier shipping (DHL/FedEx) at the guest's request.`
  },
  {
    id: 'support-staff-complaints',
    category: 'support',
    subCategory: 'staff-complaints',
    title: 'Staff Complaints & Service Feedback',
    keywords: ['staff complaint', 'rude', 'bad service', 'unprofessional', 'manager', 'complaint', 'attitude'],
    content: `Staff Feedback & Service Escalation:
• Handling Protocol:
  - Listen attentively with empathy and professionalism without being defensive or argumentative.
  - Acknowledge the guest's feelings and thank them for bringing the matter to our attention.
  - Ask gently for relevant details: time of occurrence, department (e.g., front desk, restaurant, valet), and the nature of the interaction.
  - Reassure the guest that high-touch, respectful hospitality is the cornerstone of Cribb Hotel.
  - Offer to connect them directly with the on-duty Hotel Manager / General Manager's office (ext. 101 or via the front desk) so their concerns can be addressed personally and resolved.`
  }
];
