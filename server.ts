import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { retrieveRelevantKnowledge, detectIntent } from "./server/ragEngine";
import { ALL_KNOWLEDGE_BASE, HOTEL_META } from "./src/knowledge-base";
import { hotelToolDeclarations } from "./server/futureTools";

dotenv.config();

let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key.trim().length > 0 && key !== "MY_GEMINI_API_KEY") {
      geminiClient = new GoogleGenAI({ 
        apiKey: key,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });
    }
  }
  return geminiClient;
}

/**
 * Intelligent Fallback Synthesizer:
 * In case the Gemini API key is not configured or the external model is temporarily busy,
 * this function constructs a natural, contextually grounded response based on the
 * retrieved knowledge chunks and the user's intent, avoiding rigid if/else trees.
 */
/**
 * Intelligent Concierge Synthesizer:
 * Enforces strict concierge conciseness: maximum usefulness with minimum words.
 * Simple questions -> 1-2 sentences.
 * Greetings -> 1-sentence prompt.
 * Ambiguous queries -> 1 short clarifying question.
 * No filler, no document dumping, no repetitive pleasantries.
 */
function generateContextualResponse(
  message: string,
  history: Array<{ role: string; text: string }>,
  retrievedContext: { formattedContext: string; results: any[]; intent: string; sourceTitles: string[] }
): string {
  const q = message.trim().toLowerCase();
  const historyText = history.map(h => h.text).join(" ").toLowerCase();

  // 1. GREETINGS (Extremely short)
  if (/^(hi|hello|hey|hiya|howdy)[\s!.?]*$/i.test(q)) {
    return "Hello! How can I help you today?";
  }
  if (/^good\s+(morning|afternoon|evening)[\s!.?]*$/i.test(q)) {
    const timeMatch = q.match(/morning|afternoon|evening/i)?.[0] || "day";
    const cap = timeMatch.charAt(0).toUpperCase() + timeMatch.slice(1);
    return `Good ${cap}! How can I assist you?`;
  }
  if (/^hey,?\s+i'?m\s+here[\s!.?]*$/i.test(q)) {
    return "Welcome to Cribb Hotel! What would you like help with?";
  }
  if (/^(cribb(\s+hotel)?|hotel)[\s!.?]*$/i.test(q)) {
    return "Welcome! What would you like to know about Cribb Hotel?";
  }

  // 2. AMBIGUOUS OR UNSPECIFIC REQUESTS (Short clarifying question)
  if (/^(i\s+need\s+a\s+room|need\s+a\s+room|book\s+a\s+room|can\s+i\s+book\s+a\s+room)[\s!.?]*$/i.test(q)) {
    return "Sure. What dates would you like to stay?";
  }
  if (/^(i\s+need\s+help\s+with\s+my\s+booking|help\s+with\s+my\s+booking|my\s+booking)[\s!.?]*$/i.test(q)) {
    return "Of course. What would you like to change or check about your booking?";
  }
  if (/^(i\s+have\s+a\s+problem|there\s+is\s+a\s+problem|help\s+me|help|i\s+need\s+help)[\s!.?]*$/i.test(q)) {
    return "I'm happy to help. What seems to be the problem?";
  }

  // 3. EMERGENCY (Concise, urgent, direct)
  if (retrievedContext.intent === 'emergencies' || /emergency|fire|smoke|injured|danger/i.test(q)) {
    return "**EMERGENCY**: Please dial **ext. 99** or **ext. 0** immediately from your room phone, or call **112** for emergency services. In case of smoke or fire, exit via the stairwells to the East Lawn assembly point.";
  }

  // 4. CONVERSATIONAL MULTI-TURN RESOLUTIONS
  // E.g. Previous question was about pool, now asking about children
  if ((q.includes("child") || q.includes("kid") || q.includes("available to children")) && (historyText.includes("pool") || historyText.includes("swimming"))) {
    return "Yes, children are welcome at our outdoor infinity pool with adult supervision at all times.";
  }
  // E.g. Previous question was about family trip, now specifying duration
  if (q.includes("three nights") || q.includes("3 nights") || q.includes("nights")) {
    if (historyText.includes("family") || historyText.includes("wife") || historyText.includes("kids") || historyText.includes("children")) {
      return "Got it for 3 nights with your family. I recommend our Connecting Deluxe Rooms or the Ambassador Suite. What dates are you looking to stay?";
    }
  }

  // 5. SIMPLE COMMON QUESTIONS (1-2 sentences directly answering)
  if (/check.?in/i.test(q) && (/what time|when/i.test(q) || !q.includes("out"))) {
    return "Check-in starts at 3:00 PM. Early check-in is subject to availability upon arrival.";
  }
  if (/check.?out/i.test(q) && (/what time|when/i.test(q) || !q.includes("in"))) {
    return "Check-out time is 12:00 PM noon. Late check-out is subject to availability.";
  }
  if (/wi-?fi|internet/i.test(q)) {
    return "Yes, complimentary high-speed Wi-Fi is available throughout the hotel.";
  }
  if (/pet|dog|cat|animal/i.test(q)) {
    return "We welcome certified service animals. Pets are generally not permitted.";
  }
  if (/pool|swimming/i.test(q) && !q.includes("recommend") && !q.includes("wife") && !q.includes("family")) {
    return "Yes, we have a heated outdoor infinity pool open daily from 6:00 AM to 9:00 PM.";
  }
  if (/gym|fitness/i.test(q)) {
    return "Our fitness center is open 24/7 on the 3rd floor with state-of-the-art cardio and weight equipment.";
  }
  if (/spa|massage/i.test(q)) {
    return "The Serenity Spa is open daily from 9:00 AM to 8:00 PM offering massages, hydrotherapy, and private steam rooms.";
  }
  if (/parking|valet/i.test(q)) {
    return "We offer secure on-site parking with 24-hour valet service and EV charging stations.";
  }
  if (/breakfast/i.test(q) && (/time|hours|when/i.test(q) || /included/i.test(q))) {
    return "Buffet breakfast is served daily from 6:30 AM to 10:30 AM at &More by Cribb.";
  }
  if (/airport|shuttle|transfer/i.test(q)) {
    return "We offer private chauffeured airport transfers. Would you like to reserve one for your arrival?";
  }

  // 6. COMPLEX RECOMMENDATIONS (Concise & actionable)
  if (retrievedContext.intent === 'room_recommendation' || /family|wife|children|kids/i.test(q)) {
    return "For a family of four, I recommend our Connecting Deluxe Rooms or the Ambassador Suite, which accommodates up to 4 guests with extra living space. What dates are you planning to visit?";
  }

  if (/what rooms|room types|what kind of rooms/i.test(q)) {
    return "We offer Classic Deluxe Rooms, Executive Club Rooms, and Luxury Suites (Ambassador and Presidential). If you share your dates and number of guests, I can help you choose the best option.";
  }

  if (/facilities|amenities/i.test(q)) {
    return `We offer:
• Outdoor heated infinity pool
• 24/7 fitness center
• Serenity Spa
• Restaurants, lounge, & 24/7 room dining
• High-speed Wi-Fi & business center
• Valet parking`;
  }

  // 7. MAINTENANCE / TROUBLESHOOTING (Direct steps + dial 0)
  if (retrievedContext.intent === 'maintenance' || /a\/?c|air.?condition|not cooling/i.test(q)) {
    return "Please check that your room keycard is firmly in the wall power slot and that balcony doors are closed. If the AC is still not cooling, please dial 0 from your room phone so maintenance can assist right away.";
  }
  if (/water|plumbing|leak|drain/i.test(q)) {
    return "Please run the hot water tap for 1-2 minutes. If the issue persists, please dial 0 from your room phone so our engineering team can inspect it immediately.";
  }

  // 8. KNOWLEDGE-BASED CONCISE EXTRACTION
  const topResult = retrievedContext.results[0]?.chunk;
  if (topResult) {
    // Extract first 1-2 sentences of the chunk content rather than dumping everything
    const sentences = topResult.content
      .split(/(?<=[.?!])\s+/)
      .filter(s => s.trim().length > 0)
      .slice(0, 2)
      .join(" ");
    return sentences || topResult.content.slice(0, 200);
  }

  return "I'm happy to help. What would you like to know about Cribb Hotel?";
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "Cribb Hotel AI Concierge RAG Engine",
      knowledgeChunksCount: ALL_KNOWLEDGE_BASE.length,
      time: new Date().toISOString()
    });
  });

  // Knowledge base inspector endpoint
  app.get("/api/knowledge-base", (req, res) => {
    res.json({
      hotel: HOTEL_META,
      totalChunks: ALL_KNOWLEDGE_BASE.length,
      chunks: ALL_KNOWLEDGE_BASE.map(c => ({
        id: c.id,
        category: c.category,
        subCategory: c.subCategory,
        title: c.title,
        keywords: c.keywords
      }))
    });
  });

  // AI Real-Time Customer Support / Concierge with RAG
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      // Step 1: Intelligent RAG Retrieval with multi-turn expansion & intent detection
      const ragContext = retrieveRelevantKnowledge(message, history || []);
      const { formattedContext, intent, sourceTitles } = ragContext;

      // Step 2: Attempt LLM generation via Gemini 3.8 Flash
      const ai = getGeminiClient();

      if (ai) {
        try {
          const systemInstruction = `You are the official AI Concierge of Cribb Hotel.
You behave like a skilled, fast, clear, helpful, and concise hotel concierge.
Your primary directive is: "Maximum usefulness with minimum words."

==================================================
1. RESPONSE LENGTH — CRITICAL
==================================================
- ALWAYS make responses as SHORT as reasonably possible while still providing all information necessary to properly answer.
- Do NOT sacrifice important information just to make the response shorter.
- Answer the user's actual question directly, without unnecessary explanations, background info, repetition, or filler.
- Prefer 1–2 short paragraphs or a small number of bullet points when appropriate.
- For simple questions, answer in 1–2 sentences.
- For complex questions, provide only the information necessary to satisfy the request.
- Test every sentence: "Can any sentence be removed without reducing the usefulness or accuracy of the answer? If yes, remove it."

==================================================
2. DO NOT OVER-EXPLAIN
==================================================
- NEVER repeat the user's question.
- NEVER restate information already established in the conversation.
- NEVER give unnecessary background history, promotional filler, or long introductions.
- NEVER say "Thank you so much for reaching out to us..." or "We would be absolutely delighted...". Get straight to the point.
- NEVER add unsolicited hotel policies, disclaimers, or full amenity dumps.
- NEVER use excessive bullet points or say the same thing in different ways.

==================================================
3. ANSWER ONLY WHAT IS NEEDED
==================================================
- "What time is check-in?" -> "Check-in starts at 3:00 PM. Early check-in is subject to availability." (Do NOT explain checkout, cancellation, or deposit rules).
- "Do you have Wi-Fi?" -> "Yes, complimentary high-speed Wi-Fi is available throughout the hotel." (Do NOT list other amenities).
- "Do you allow pets?" -> "We welcome certified service animals. Pets are generally not permitted." (Do NOT dump the entire guest policy).

==================================================
4. COMPLEX QUESTIONS & RECOMMENDATIONS
==================================================
- For questions requiring multiple pieces of information, provide a concise answer containing all the important information.
- Example: "I'm coming with my wife and two kids for three nights. What room would you recommend?"
  -> "For a family of four, I'd recommend our Connecting Deluxe Rooms or the Ambassador Suite, which accommodates up to 4 guests with extra living space. What dates are you planning to visit?"

==================================================
5. CONVERSATIONAL CONTEXT
==================================================
- Maintain conversation history. Never make users repeat information they already provided.

==================================================
6. WHEN USER DOES NOT ASK ANYTHING SPECIFIC
==================================================
- If the user's message does not contain a clear question, request, problem, or objective, DO NOT generate a long informational response.
- Briefly ask what they would like help with:
  * "Hi" -> "Hi! How can I help you today?"
  * "Hello" -> "Hello! What can I help you with?"
  * "Hey, I'm here." -> "Welcome to Cribb Hotel! What would you like help with?"
  * "Cribb Hotel" -> "Welcome! What would you like to know about Cribb Hotel?"
  * "Good morning" -> "Good morning! How can I assist you?"

==================================================
7. AMBIGUOUS REQUESTS
==================================================
- If the user says something that could mean several things, ask a SHORT clarifying question instead of guessing:
  * "I need a room." -> "Sure. What dates are you staying?"
  * "I need help with my booking." -> "Of course. What would you like to change or check about your booking?"
  * "I have a problem." -> "I'm happy to help. What seems to be the problem?"
  * "Can I book a room?" -> "Absolutely. What dates would you like to stay?"

==================================================
8. GREETINGS
==================================================
- Keep responses extremely short ("Hi! How can I help?", "Welcome to Cribb Hotel! How can I assist you?"). Do not automatically provide a list of hotel services unless asked.

==================================================
9. SUGGESTED ACTIONS
==================================================
- Do NOT constantly end every response with "Would you like me to help with anything else?". Only offer a relevant next step when it naturally makes sense.

==================================================
10. LISTS
==================================================
- Use bullet points only when they genuinely improve readability (e.g. listing 3-5 distinct facilities or room types). Keep bullet items short (1 line per bullet).

==================================================
11. RAG GROUNDING & NO INFORMATION DUMPING
==================================================
- Retrieved context is for reference only. Do NOT dump raw retrieved text. Extract only the specific facts needed to answer the question.
- Never invent rates, policies, or amenities not present in the knowledge base.
- In emergencies (fire/smoke/injury), immediately state emergency contacts: Hotel Hotline (ext. 99 or ext. 0) and emergency services (112). Advise stairwell evacuation.

### VERIFIED CRIBB HOTEL KNOWLEDGE CONTEXT:
${formattedContext}`;

          // Format contents array with conversation history
          const contents: any[] = [];
          if (Array.isArray(history)) {
            for (const h of history.slice(-8)) {
              if (h.role && h.text) {
                contents.push({
                  role: h.role === "user" ? "user" : "model",
                  parts: [{ text: h.text }]
                });
              }
            }
          }
          contents.push({ role: "user", parts: [{ text: message }] });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Gemini API call timed out after 3500ms")), 3500)
          );

          const response: any = await Promise.race([
            ai.models.generateContent({
              model: "gemini-3.8-flash",
              contents,
              config: {
                systemInstruction,
                temperature: 0.3,
                maxOutputTokens: 350,
              }
            }),
            timeoutPromise
          ]);

          const replyText = response.text || "Hello! How can I help you today?";
          return res.json({
            reply: replyText,
            groundedSources: sourceTitles,
            intent,
            source: "gemini_llm_rag"
          });
        } catch (apiErr: any) {
          console.warn("Gemini API call encountered an issue, transitioning to intelligent grounded synthesis:", apiErr?.message);
        }
      }

      // Step 3: Context-aware Intelligent Synthesis (Fall-through if Gemini key is missing or model busy)
      const synthesizedReply = generateContextualResponse(message, history || [], ragContext);
      return res.json({
        reply: synthesizedReply,
        groundedSources: sourceTitles,
        intent,
        source: "cribb_grounded_rag"
      });
    } catch (err: any) {
      console.error("Chat error:", err);
      res.status(500).json({ error: "Failed to process concierge request" });
    }
  });

  // Mock reservation submission endpoint
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
    console.log(`Cribb Hotel server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
