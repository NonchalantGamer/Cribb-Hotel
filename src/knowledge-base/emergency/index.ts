import { KnowledgeChunk } from '../types';

export const emergencyKnowledge: KnowledgeChunk[] = [
  {
    id: 'emergency-procedures',
    category: 'emergency',
    subCategory: 'emergency-procedure',
    title: 'Emergency Response & Evacuation Protocol',
    keywords: ['emergency', 'fire', 'smoke', 'evacuate', 'danger', 'injury', 'doctor', 'ambulance', 'police', 'medical'],
    content: `EMERGENCY PROTOCOL - IMMEDIATE GUEST SAFETY:
If you or another guest are experiencing an immediate life safety threat, medical emergency, fire, or criminal activity:
1. PRIORITIZE PERSONAL SAFETY: Move away from immediate danger or smoke.
2. DO NOT RELY ON CHATBOT: The AI assistant cannot physically intervene or call external emergency services on your behalf.
3. FIRE / SMOKE:
   - Trigger the nearest red manual fire alarm pull station in the corridor.
   - Do NOT use elevators under any circumstances; use marked emergency exit stairwells.
   - Follow exit directional signage to the designated outdoor assembly point at the East Lawn.
4. MEDICAL EMERGENCIES:
   - Immediately dial [HOTEL EMERGENCY EXTENSION - ext. 99 or ext. 0] from your in-room phone, or call [HOTEL EMERGENCY NUMBER - +234 1 277 8899].
   - The hotel maintains on-site first-aid responders, defibrillators (AEDs), and an on-call medical doctor 24/7.
   - For severe life-threatening emergencies, also dial local emergency dispatch: [LOCAL EMERGENCY NUMBER - 112 or 767].`
  },
  {
    id: 'emergency-contacts-directory',
    category: 'emergency',
    subCategory: 'emergency-contacts',
    title: 'Emergency Telephone Numbers Directory',
    keywords: ['emergency number', 'doctor phone', 'police', 'ambulance', 'hospital', 'fire department'],
    content: `Emergency Contacts Directory:
• Hotel Emergency Hotline: [HOTEL EMERGENCY NUMBER - ext. 99 (Internal) or +234 1 277 8899]
• Front Desk Duty Manager (24/7): [HOTEL RECEPTION NUMBER - ext. 0 (Internal) or +234 1 277 8888]
• Hotel Security Command Post: [SECURITY NUMBER - ext. 911]
• Municipal Public Emergency Service: [LOCAL EMERGENCY NUMBER - 112 (General Emergency) / 767 (State Command)]
• Nearest Accredited Hospital: [HOSPITAL NAME - Reddington Multi-Specialist Hospital, Victoria Island / Lagoon Hospital]
• Hotel On-Call Doctor & Paramedic: Available 24/7 through the Front Desk.`
  }
];
