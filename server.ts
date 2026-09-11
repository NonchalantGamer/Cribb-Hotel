import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Cribb Hotel RAG Knowledge Base Corpus
const KNOWLEDGE_BASE = [
  {
    id: "about",
    topic: "About Cribb Hotel & Philosophy",
    keywords: ["about", "story", "heritage", "gathering", "history", "cribb", "who"],
    content: `Cribb Hotel is world-renowned as 'The World's Gathering Place'. Combining iconic architecture, warm hospitality, intuitive service, and elevated design, Cribb brings travelers, business leaders, and communities together in the world's most vibrant destinations.`
  },
  {
    id: "locations",
    topic: "Destinations & Featured Hotels",
    keywords: ["where", "destinations", "locations", "cities", "lagos", "cairo", "annaba", "algiers", "djibouti", "kampala", "el gouna", "alexandria", "london", "new york"],
    content: `Cribb Hotels & Resorts boasts landmark properties across the globe, including:
- Cribb Lagos Hotel (Victoria Island, Lagos, Nigeria) - 5-star oceanside luxury, The Palms dining, and private ballrooms.
- Cribb Cairo Hotel & Casino (Cairo, Egypt) - Overlooking the historic River Nile, featuring an elite casino and heated pool terrace.
- Cribb Club des Pins Resort (Algiers, Algeria) - Mediterranean beachfront sanctuary with private marina and Thalasso spa.
- Cribb Annaba Hotel (Annaba, Algeria) - City center beacon with panoramic coastal views.
- Cribb Djibouti (Djibouti) - Waterfront oasis offering private beaches, coral diving, and diplomatic meeting suites.
- Cribb Kampala Hotel (Kampala, Uganda) - Set in lush tropical acres with historic banqueting halls.
- Cribb Miramar Resort El Gouna (El Gouna, Egypt) - Red Sea lagoons, world-class golf, and overwater villas.
- Cribb Montazah Hotel (Alexandria, Egypt) - Overlooking royal Montazah palace gardens and Mediterranean beaches.`
  },
  {
    id: "rooms",
    topic: "Rooms, Suites & Pricing",
    keywords: ["rooms", "suites", "bed", "deluxe", "executive", "pricing", "cost", "rates", "ambassador", "presidential"],
    content: `Accommodations at Cribb Hotel:
1. Classic Deluxe Room (42 sqm): Plush Cribb Signature Bed, Italian marble bathroom, ergonomic workstation, high-speed WiFi. From $280/night.
2. Executive Club Room (48 sqm): High-floor city or sea vistas, Nespresso machine, exclusive 24/7 access to the Cribb Club Lounge (complimentary breakfast, high tea, evening cocktails & canapés). From $390/night.
3. Ambassador Suite (85 sqm): Separate master bedroom, living and dining area for 6, deep soaking tub, walk-in wardrobe, and dedicated butler service. From $620/night.
4. Presidential Suite (165 sqm): Panoramic wraparound terrace, private boardroom, grand piano, curated art collection, and optional private chef. From $1,450/night.`
  },
  {
    id: "dining",
    topic: "Dining & Culinary Experiences",
    keywords: ["dining", "restaurant", "food", "breakfast", "dinner", "cocktails", "bar", "coffee", "chef", "room service"],
    content: `Culinary offerings at Cribb Hotel:
- &More by Cribb: Fluid day-to-night venue transitioning from artisan specialty coffee and fresh pastries to craft cocktails and artisanal small plates.
- The Heritage Grill: Premier steakhouse and seafood dining featuring aged prime cuts, local fresh catches, and sommelier-curated wine pairings.
- The Palm Court: High tea, botanical infusions, and light luncheon in a glass-domed atrium.
- Azure Rooftop & Lounge: Sunset mixology, live acoustic/jazz sets, and Mediterranean mezze.
- 24-Hour In-Room Dining: Full gourmet menu served in the comfort of your room or suite.`
  },
  {
    id: "amenities",
    topic: "Hotel Amenities, Wellness & Facilities",
    keywords: ["amenities", "pool", "gym", "fitness", "spa", "wifi", "parking", "valet", "check-in", "checkout", "hours"],
    content: `Amenities & Policies:
- Check-in: 3:00 PM | Check-out: 12:00 PM (Express check-in & late checkout available for Cribb Club members).
- Wellness & Spa: Full-service Serenity Spa with steam rooms, Swedish massages, and hydromassage baths.
- Fitness Center: Open 24/7 featuring latest TechnoGym cardio & strength systems with on-demand personal trainers.
- Swimming Pools: Temperature-controlled outdoor infinity pool with poolside cabana service.
- High-Speed WiFi: Complimentary ultra-fast 1 Gbps WiFi property-wide.
- Concierge & Valet: 24-hour multilingual concierge and secure valet parking.`
  },
  {
    id: "events",
    topic: "Meetings, Conferences & Weddings",
    keywords: ["meeting", "events", "wedding", "conference", "ballroom", "banquet", "gather", "corporate"],
    content: `Gatherings & Events:
- Over 3,500 square meters of flexible indoor and outdoor event space.
- The Grand Cribb Ballroom accommodates up to 800 guests for gala dinners and weddings.
- Modern Studio meeting suites equipped with 4K interactive screens, video conferencing, and acoustic isolation.
- Dedicated Event Specialists and bespoke catering menus tailored by our executive culinary team.`
  },
  {
    id: "rewards",
    topic: "Cribb Rewards & Loyalty Privileges",
    keywords: ["rewards", "points", "loyalty", "club", "member", "discount", "bonvoy", "privileges"],
    content: `Cribb Rewards Membership:
- Earn points on every stay, dining, and spa experience.
- Exclusive Member Rates: Save up to 15% on direct reservations.
- Complimentary room upgrades subject to availability.
- Guaranteed 4:00 PM late check-out for elite tier members.
- Redeem points for free reward nights, flight miles, or curated local experiences.`
  }
];

function retrieveContext(query: string): string {
  const q = query.toLowerCase();
  const scored = KNOWLEDGE_BASE.map(doc => {
    let score = 0;
    for (const kw of doc.keywords) {
      if (q.includes(kw)) score += 2;
    }
    const words = q.split(/\s+/);
    for (const w of words) {
      if (w.length > 3 && doc.content.toLowerCase().includes(w)) {
        score += 1;
      }
    }
    return { doc, score };
  });

  scored.sort((a, b) => b.score - a.score);
  // Take top 2-3 matches
  const topDocs = scored.filter(s => s.score > 0).slice(0, 3);
  if (topDocs.length === 0) {
    return KNOWLEDGE_BASE.slice(0, 2).map(d => `[${d.topic}]\n${d.content}`).join("\n\n");
  }
  return topDocs.map(s => `[${s.doc.topic}]\n${s.doc.content}`).join("\n\n");
}

let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      geminiClient = new GoogleGenAI({ apiKey: key });
    }
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Cribb Hotel API", time: new Date().toISOString() });
  });

  // AI Real-Time Customer Support / Concierge with RAG
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      // Step 1: Retrieve grounded context
      const retrievedContext = retrieveContext(message);

      // Step 2: Check for Gemini client
      const ai = getGeminiClient();

      if (ai) {
        try {
          const systemInstruction = `You are the prestigious Cribb Hotel AI Concierge & Guest Experience Ambassador.
Your mission is to provide warm, refined, high-end 5-star hospitality assistance to guests in real time.
Always use the name "Cribb Hotel" (never Sheraton).
Ground your answers directly in the following verified Cribb Hotel Knowledge Base:

${retrievedContext}

Guidelines:
- Tone: Sophisticated, courteous, warm, and helpful.
- Keep answers concise, scannable, and actionable. Use bullet points or bold text where appropriate.
- If the guest asks to book, guide them to click the "RESERVE NOW" or "Hotel Search" buttons on the page, or provide room details.
- Provide exact pricing, amenities, check-in/out times, dining options, and locations when asked.`;

          const contents: any[] = [];
          if (Array.isArray(history)) {
            for (const h of history.slice(-6)) {
              if (h.role && h.text) {
                contents.push({
                  role: h.role === "user" ? "user" : "model",
                  parts: [{ text: h.text }]
                });
              }
            }
          }
          contents.push({ role: "user", parts: [{ text: message }] });

          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          });

          const replyText = response.text || "Thank you for contacting Cribb Hotel. How may I assist your stay today?";
          return res.json({
            reply: replyText,
            groundedSources: retrievedContext.split("\n\n").map(s => s.split("]")[0].replace("[", "")),
            source: "gemini"
          });
        } catch (apiErr: any) {
          console.warn("Gemini API call failed, falling back to intelligent RAG concierge:", apiErr?.message);
        }
      }

      // Fallback RAG Concierge Response (ensures 100% uptime and seamless demo)
      const q = message.toLowerCase();
      let fallbackReply = "";

      if (q.includes("room") || q.includes("suite") || q.includes("price") || q.includes("rate") || q.includes("cost")) {
        fallbackReply = `Welcome to Cribb Hotel. We offer thoughtfully appointed accommodations:
• **Classic Deluxe Room** ($280/night): King bed, marble bath, ergonomic workspace.
• **Executive Club Room** ($390/night): High-floor vistas and 24/7 Cribb Club Lounge privileges.
• **Ambassador Suite** ($620/night): 85 sqm, separate master bedroom, dining salon, and private butler service.
• **Presidential Suite** ($1,450/night): 165 sqm, wraparound terrace, and grand piano.

Would you like help selecting dates or reserving your preferred room?`;
      } else if (q.includes("dine") || q.includes("restaurant") || q.includes("breakfast") || q.includes("food") || q.includes("bar")) {
        fallbackReply = `At Cribb Hotel, our culinary destinations invite you to gather and savor:
• **&More by Cribb**: Fluid morning-to-night venue for artisan coffee, pastries, and crafted evening cocktails.
• **The Heritage Grill**: Premier aged cuts, ocean catches, and world-class wine pairings.
• **The Palm Court**: Traditional afternoon tea under our sunlit atrium.
• **Azure Rooftop**: Sunset views, Mediterranean mezze, and mixology.

Reservations can be arranged directly with our concierge team.`;
      } else if (q.includes("check-in") || q.includes("checkout") || q.includes("time") || q.includes("hour")) {
        fallbackReply = `Standard check-in at Cribb Hotel begins at **3:00 PM**, and check-out is at **12:00 PM**. 
Members of our Cribb Club and Cribb Rewards loyalty program enjoy priority early check-in and guaranteed late check-out up to 4:00 PM upon request.`;
      } else if (q.includes("location") || q.includes("where") || q.includes("destination") || q.includes("hotel in")) {
        fallbackReply = `Cribb Hotels & Resorts is proud to welcome guests across iconic global cities:
• **Cribb Lagos Hotel** (Victoria Island, Lagos)
• **Cribb Cairo Hotel & Casino** (River Nile, Cairo)
• **Cribb Club des Pins Resort** (Algiers, Algeria)
• **Cribb Annaba Hotel** (Annaba, Algeria)
• **Cribb Djibouti** (Djibouti Bay)
• **Cribb Kampala Hotel** (Kampala, Uganda)
• **Cribb Miramar Resort El Gouna** & **Cribb Montazah Hotel** (Egypt)

Which destination can we prepare for your upcoming travels?`;
      } else if (q.includes("amenities") || q.includes("pool") || q.includes("gym") || q.includes("spa") || q.includes("wifi")) {
        fallbackReply = `Cribb Hotel guests enjoy world-class amenities:
• 24/7 TechnoGym Fitness Center
• Full-service Serenity Spa with hydrotherapy suites
• Temperature-controlled outdoor infinity swimming pool
• Ultra-fast 1 Gbps property-wide WiFi
• Dedicated 24/7 concierge and valet parking`;
      } else {
        fallbackReply = `Welcome to Cribb Hotel — The World's Gathering Place. 
I am your personal AI Concierge. I can assist with room reservations, dining inquiries, hotel locations, amenities, Cribb Club privileges, and special event bookings. How may I be of service to you today?`;
      }

      return res.json({
        reply: fallbackReply,
        groundedSources: ["Cribb Hotel Verified Concierge Directory"],
        source: "rag_knowledge_base"
      });
    } catch (err: any) {
      console.error("Chat error:", err);
      res.status(500).json({ error: "Failed to process concierge request" });
    }
  });

  // Mock booking submission endpoint
  app.post("/api/reserve", (req, res) => {
    const { destination, checkIn, checkOut, rooms, adults, rateType } = req.body;
    const confirmationNumber = "CRB-" + Math.floor(100000 + Math.random() * 900000);
    res.json({
      success: true,
      confirmationNumber,
      destination: destination || "Cribb Lagos Hotel",
      dates: `${checkIn || "Upcoming"} - ${checkOut || "Upcoming"}`,
      status: "Confirmed",
      message: `Reservation ${confirmationNumber} initiated successfully with Cribb Best Rate Guarantee.`
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cribb Hotel server running on port ${PORT}`);
  });
}

startServer();
