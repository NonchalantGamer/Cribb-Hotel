import { ALL_KNOWLEDGE_BASE, KnowledgeChunk } from '../src/knowledge-base';

export type UserIntent =
  | 'greeting'
  | 'unspecific_or_ambiguous'
  | 'general_hotel_info'
  | 'room_inquiry'
  | 'room_recommendation'
  | 'booking_procedure'
  | 'reservation_modification'
  | 'cancellation'
  | 'check_in'
  | 'check_out'
  | 'amenities'
  | 'restaurant'
  | 'transportation'
  | 'pricing'
  | 'policies'
  | 'complaints'
  | 'maintenance'
  | 'wifi'
  | 'housekeeping'
  | 'lost_property'
  | 'billing'
  | 'accessibility'
  | 'events'
  | 'emergencies'
  | 'general_conversation';

export interface RetrievedResult {
  chunk: KnowledgeChunk;
  score: number;
  matchedTerms: string[];
}

export interface RagContext {
  intent: UserIntent;
  expandedQuery: string;
  results: RetrievedResult[];
  formattedContext: string;
  sourceTitles: string[];
}

// Common conversational pronouns and reference words that signal anaphoric references
const PRONOUNS = ['it', 'its', 'they', 'them', 'that', 'this', 'those', 'there', 'the room', 'the pool', 'the suite', 'cost'];

// Intent keywords and patterns
const INTENT_PATTERNS: Array<{ intent: UserIntent; patterns: RegExp[] }> = [
  {
    intent: 'emergencies',
    patterns: [/emergency/i, /fire/i, /smoke/i, /injury/i, /injured/i, /bleeding/i, /ambulance/i, /hospital/i, /police/i, /attack/i, /danger/i, /life.?threat/i]
  },
  {
    intent: 'wifi',
    patterns: [/wi-?fi/i, /internet/i, /connect.*network/i, /password.*wifi/i, /slow.*net/i, /captive.*portal/i]
  },
  {
    intent: 'maintenance',
    patterns: [/a\/?c/i, /air.?condition/i, /thermostat/i, /not cooling/i, /hot water/i, /no water/i, /leak/i, /drain/i, /broken/i, /not working/i, /power/i, /blackout/i, /electricity/i, /outlet/i]
  },
  {
    intent: 'complaints',
    patterns: [/complain/i, /rude/i, /dirty/i, /stain/i, /noise/i, /loud/i, /banging/i, /party/i, /bad service/i, /unacceptable/i, /dispute/i]
  },
  {
    intent: 'lost_property',
    patterns: [/lost/i, /found/i, /misplaced/i, /left behind/i, /forgot.*in room/i, /lost and found/i]
  },
  {
    intent: 'billing',
    patterns: [/bill/i, /charged/i, /overcharged/i, /invoice/i, /folio/i, /receipt/i, /wrong charge/i]
  },
  {
    intent: 'check_in',
    patterns: [/check.?in/i, /early check.?in/i, /arrival time/i, /arrive early/i, /what time.*arrive/i]
  },
  {
    intent: 'check_out',
    patterns: [/check.?out/i, /late check.?out/i, /departure/i, /leave hotel/i, /extend stay/i]
  },
  {
    intent: 'cancellation',
    patterns: [/cancel/i, /cancellation/i, /refund/i, /no.?show/i, /change dates/i, /modify booking/i]
  },
  {
    intent: 'room_recommendation',
    patterns: [/recommend/i, /suggest/i, /which room/i, /traveling with/i, /wife/i, /husband/i, /children/i, /family/i, /kids/i, /quiet room/i, /work trip/i, /solo/i]
  },
  {
    intent: 'room_inquiry',
    patterns: [/room/i, /suite/i, /bed/i, /deluxe/i, /presidential/i, /ambassador/i, /penthouse/i, /balcony/i, /rate/i, /price/i, /per night/i]
  },
  {
    intent: 'restaurant',
    patterns: [/restaurant/i, /dining/i, /breakfast/i, /dinner/i, /lunch/i, /eat/i, /food/i, /menu/i, /bar/i, /cocktail/i, /heritage grill/i, /&more/i]
  },
  {
    intent: 'amenities',
    patterns: [/pool/i, /swimming/i, /gym/i, /fitness/i, /spa/i, /sauna/i, /steam room/i, /valet/i, /parking/i, /facilities/i]
  },
  {
    intent: 'transportation',
    patterns: [/airport/i, /shuttle/i, /taxi/i, /transfer/i, /chauffeur/i, /driver/i, /pickup/i, /murtala/i]
  },
  {
    intent: 'accessibility',
    patterns: [/accessible/i, /wheelchair/i, /disability/i, /ada/i, /handicap/i, /roll.?in/i]
  },
  {
    intent: 'events',
    patterns: [/meeting/i, /conference/i, /ballroom/i, /wedding/i, /banquet/i, /event/i]
  },
  {
    intent: 'booking_procedure',
    patterns: [/how to book/i, /make a reservation/i, /reserve/i, /booking process/i, /steps to book/i]
  }
];

export function detectIntent(query: string, history: Array<{ role: string; text: string }> = []): UserIntent {
  const trimmed = query.trim().toLowerCase();
  
  // 1. Greetings (Exact / concise check)
  if (/^(hi|hello|hey|good\s+(morning|afternoon|evening)|howdy|greetings|hiya|hey there|hi there)[\s!.?]*$/i.test(trimmed) ||
      /^hey,?\s+i'?m\s+here[\s!.?]*$/i.test(trimmed)) {
    return 'greeting';
  }

  // 2. Unspecific or Ambiguous prompts (e.g. "Cribb Hotel", "I need a room", "I have a problem", "I need help with my booking")
  if (/^(cribb(\s+hotel)?|the\s+hotel|hotel)[\s!.?]*$/i.test(trimmed) ||
      /^(i\s+need\s+a\s+room|need\s+a\s+room|can\s+i\s+book\s+a\s+room|book\s+a\s+room)[\s!.?]*$/i.test(trimmed) ||
      /^(i\s+need\s+help\s+with\s+my\s+booking|help\s+with\s+my\s+booking|my\s+booking|booking\s+help)[\s!.?]*$/i.test(trimmed) ||
      /^(i\s+have\s+a\s+problem|there\s+is\s+a\s+problem|help\s+me|help|i\s+need\s+help)[\s!.?]*$/i.test(trimmed)) {
    return 'unspecific_or_ambiguous';
  }

  const fullText = [
    ...history.slice(-2).map(h => h.text),
    query
  ].join(" ").toLowerCase();

  for (const { intent, patterns } of INTENT_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(query) || (patterns.length === 1 && pattern.test(fullText))) {
        return intent;
      }
    }
  }

  return 'general_hotel_info';
}

/**
 * Multi-turn Query Resolution:
 * If the user's message is brief or contains pronouns like "it", "that", "the pool",
 * expand the query using relevant keywords from the previous conversation turns.
 */
export function expandQueryWithContext(query: string, history: Array<{ role: string; text: string }> = []): string {
  const qLower = query.toLowerCase();
  let expanded = query;

  const hasPronoun = PRONOUNS.some(p => new RegExp(`\\b${p}\\b`, 'i').test(qLower)) || query.split(/\s+/).length <= 4;

  if (hasPronoun && history.length > 0) {
    const recentContext = history.slice(-4).map(h => h.text).join(" ");
    
    // Extract key hospitality nouns from recent history
    const contextKeywords = [
      'swimming pool', 'pool', 'classic deluxe', 'deluxe room', 'executive club', 'ambassador suite',
      'presidential suite', 'breakfast', 'heritage grill', '&more', 'spa', 'gym', 'check-in',
      'check-out', 'cancellation', 'wifi', 'air conditioning', 'lagos', 'cairo', 'airport transfer',
      'children', 'kids', 'family', 'quiet hours', 'pets'
    ];

    const detectedContexts: string[] = [];
    for (const kw of contextKeywords) {
      if (recentContext.toLowerCase().includes(kw)) {
        detectedContexts.push(kw);
      }
    }

    if (detectedContexts.length > 0) {
      expanded = `${query} [Contextual Subject: ${detectedContexts.slice(0, 3).join(", ")}]`;
    }
  }

  return expanded;
}

/**
 * Intelligent RAG Retrieval Pipeline:
 * Analyzes semantic content, keywords, token overlap, and category affinities.
 */
export function retrieveRelevantKnowledge(
  query: string,
  history: Array<{ role: string; text: string }> = []
): RagContext {
  const intent = detectIntent(query, history);
  const expandedQuery = expandQueryWithContext(query, history);
  const queryLower = expandedQuery.toLowerCase();
  const searchWords = queryLower
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2);

  const scoredResults: RetrievedResult[] = [];

  for (const chunk of ALL_KNOWLEDGE_BASE) {
    let score = 0;
    const matchedTerms: string[] = [];

    const chunkContent = chunk.content.toLowerCase();
    const chunkTitle = chunk.title.toLowerCase();

    // 1. Keyword direct hit
    for (const kw of chunk.keywords) {
      if (queryLower.includes(kw.toLowerCase())) {
        score += 8;
        matchedTerms.push(kw);
      }
    }

    // 2. Title matching
    for (const word of searchWords) {
      if (chunkTitle.includes(word)) {
        score += 5;
        matchedTerms.push(word);
      }
    }

    // 3. Content word matching
    for (const word of searchWords) {
      if (chunkContent.includes(word)) {
        score += 2;
      }
    }

    // 4. Intent category alignment boost
    if (intent === 'emergencies' && chunk.category === 'emergency') score += 20;
    if (intent === 'wifi' && chunk.subCategory === 'wifi') score += 15;
    if (intent === 'maintenance' && (chunk.category === 'support' || chunk.subCategory === 'air-conditioning')) score += 15;
    if (intent === 'complaints' && chunk.category === 'support') score += 12;
    if (intent === 'lost_property' && chunk.subCategory === 'lost-property') score += 20;
    if (intent === 'billing' && (chunk.subCategory === 'billing' || chunk.subCategory === 'payments')) score += 18;
    if (intent === 'check_in' && chunk.subCategory === 'check-in') score += 18;
    if (intent === 'check_out' && chunk.subCategory === 'check-out') score += 18;
    if (intent === 'cancellation' && chunk.subCategory === 'cancellation') score += 18;
    if ((intent === 'room_inquiry' || intent === 'room_recommendation') && chunk.category === 'rooms') score += 12;
    if (intent === 'restaurant' && chunk.subCategory === 'restaurant') score += 16;
    if (intent === 'amenities' && (chunk.subCategory === 'amenities' || chunk.subCategory === 'children')) score += 14;
    if (intent === 'transportation' && chunk.subCategory === 'transportation') score += 18;
    if (intent === 'accessibility' && chunk.subCategory === 'accessibility') score += 20;

    if (score > 0) {
      scoredResults.push({
        chunk,
        score,
        matchedTerms: Array.from(new Set(matchedTerms))
      });
    }
  }

  // Sort descending by score
  scoredResults.sort((a, b) => b.score - a.score);

  // If greeting or unspecific/ambiguous, avoid dumping documents into the prompt
  if (intent === 'greeting') {
    return {
      intent,
      expandedQuery,
      results: [],
      formattedContext: "Context Note: The guest sent a greeting. Greet them warmly and concisely in 1 sentence without listing amenities or hotel services.",
      sourceTitles: ["Cribb Hotel Concierge"]
    };
  }

  if (intent === 'unspecific_or_ambiguous') {
    return {
      intent,
      expandedQuery,
      results: [],
      formattedContext: "Context Note: The guest sent an unspecific or ambiguous message. Ask one short, direct clarifying question instead of guessing or listing services.",
      sourceTitles: ["Cribb Hotel Concierge"]
    };
  }

  // Take top 2 distinct chunks to keep context tight and prevent information dumping
  const topChunks = scoredResults.slice(0, 2);

  // Fallback: If no match found, provide overview chunk
  const finalResults = topChunks.length > 0
    ? topChunks
    : ALL_KNOWLEDGE_BASE.filter(c => c.id === 'hotel-overview').map(c => ({
        chunk: c,
        score: 1,
        matchedTerms: ['overview']
      }));

  const formattedContext = finalResults
    .map(r => `### DOCUMENT: ${r.chunk.title} [Category: ${r.chunk.category} / ${r.chunk.subCategory}]\n${r.chunk.content}`)
    .join("\n\n---\n\n");

  const sourceTitles = finalResults.map(r => r.chunk.title);

  return {
    intent,
    expandedQuery,
    results: finalResults,
    formattedContext,
    sourceTitles
  };
}
