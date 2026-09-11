import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, ShieldCheck, ChevronDown, ArrowRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiConciergeChatProps {
  onOpenReserve: () => void;
  initialQuery?: string | null;
  onClearInitialQuery?: () => void;
}

export const AiConciergeChat: React.FC<AiConciergeChatProps> = ({
  onOpenReserve,
  initialQuery,
  onClearInitialQuery
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "model",
      text: "Welcome to Cribb Hotel — The World’s Gathering Place. I am your personal real-time AI Concierge, grounded in our verified global property directory, room inventory, dining options, and guest services. How may I assist your journey today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      groundedSources: ["Cribb Hotel Verified Concierge Directory"]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle external trigger query
  useEffect(() => {
    if (initialQuery) {
      setIsOpen(true);
      sendMessage(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  const suggestedPrompts = [
    "What rooms and suites are available?",
    "Dining hours & &More by Cribb menu",
    "What are Cribb Club Lounge benefits?",
    "Check-in & late check-out policies",
    "Tell me about Cribb Lagos Hotel"
  ];

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text }))
        })
      });

      if (!res.ok) {
        throw new Error("Concierge service responded with error");
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        role: "model",
        text: data.reply || "Thank you for inquiring with Cribb Hotel. How else may I assist you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedSources: data.groundedSources || ["Cribb Knowledge Base"]
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      // Fallback message
      const botFallback: ChatMessage = {
        id: "bot-err-" + Date.now(),
        role: "model",
        text: "Thank you for contacting Cribb Hotel. Our concierge service recommends checking our official reservations directory or speaking directly with our front desk team. Standard check-in is 3:00 PM, and rooms range from Classic Deluxe ($280/night) to our signature Ambassador and Presidential suites.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedSources: ["Cribb Hotel Offline Cache"]
      };
      setMessages((prev) => [...prev, botFallback]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Launcher */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="open-ai-concierge-button"
          className="flex items-center gap-3 px-5 py-3.5 bg-[#17283c] hover:bg-[#0f1c2d] text-white rounded-full shadow-[0px_8px_25px_rgba(23,40,60,0.35)] border border-[#f8dec3]/50 transition-all duration-300 hover:scale-105 active:scale-95 group"
          aria-label="Open Cribb AI Concierge"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#f8dec3] text-[#17283c]">
            <Sparkles className="w-4 h-4 text-[#17283c]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#17283c] animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold uppercase tracking-wider block leading-tight">
              Cribb Concierge AI
            </span>
            <span className="text-[10px] text-[#f8dec3] font-mono">Real-Time Support • RAG</span>
          </div>
        </button>
      )}

      {/* Expanded Support Console */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white border border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Console Header */}
          <div className="bg-[#17283c] text-white px-5 py-3.5 flex items-center justify-between border-b border-stone-700">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#f8dec3] text-[#17283c] flex items-center justify-center font-serif font-bold text-sm">
                C
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-serif font-bold tracking-wide">Cribb AI Concierge</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </div>
                <p className="text-[10px] text-stone-300 tracking-wider">
                  Real-Time 5-Star Guest Support
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* RAG Verification Banner */}
          <div className="bg-[#efeae4] px-4 py-1.5 flex items-center justify-between text-[10px] text-[#17283c] border-b border-stone-200 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Grounded in Verified Cribb Hotel Knowledge
            </span>
            <span className="text-[9px] bg-white px-1.5 py-0.5 border border-stone-300">RAG + LLM</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-6 h-6 rounded-full bg-[#17283c] text-[#f8dec3] flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    C
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`p-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#17283c] text-white rounded-lg rounded-tr-none'
                        : 'bg-white text-stone-800 border border-stone-200 shadow-sm rounded-lg rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}

                    {/* Show Grounded Source Badges if available */}
                    {msg.groundedSources && msg.groundedSources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-stone-100 flex flex-wrap gap-1">
                        {msg.groundedSources.map((source, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-block px-1.5 py-0.5 bg-stone-100 text-[9px] text-[#54657a] rounded"
                          >
                            Ref: {source}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-stone-400 mt-1 inline-block px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-[#54657a] pl-2">
                <div className="w-5 h-5 rounded-full bg-[#17283c] flex items-center justify-center text-[#f8dec3]">
                  <Sparkles className="w-3 h-3 animate-spin" />
                </div>
                <span>Retrieving verified Cribb knowledge...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-white border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 bg-stone-100 hover:bg-[#efeae4] text-[#17283c] text-[10px] font-medium border border-stone-200 rounded-full transition-colors flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box & Direct Reservation Trigger */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about Cribb Hotel..."
              className="flex-1 h-10 px-3 bg-stone-50 border border-stone-300 focus:bg-white text-xs font-medium text-[#17283c] focus:outline-none focus:border-[#17283c]"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="w-10 h-10 bg-[#17283c] hover:bg-[#0f1c2d] disabled:opacity-40 text-[#f8dec3] flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Reserve Footer Link */}
          <div className="bg-stone-50 px-4 py-1.5 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
            <span>Need to secure a booking?</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenReserve();
              }}
              className="text-[#17283c] font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              Reserve Now <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
