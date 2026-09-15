import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ShieldCheck, RotateCcw, AlertCircle, ArrowRight, ArrowDown, CheckCircle2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiConciergeChatProps {
  onOpenReserve: () => void;
  initialQuery?: string | null;
  onClearInitialQuery?: () => void;
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome-1",
  role: "model",
  text: "Welcome to Cribb Hotel! How can I help you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  groundedSources: ["Cribb Hotel Concierge"]
};

export const AiConciergeChat: React.FC<AiConciergeChatProps> = ({
  onOpenReserve,
  initialQuery,
  onClearInitialQuery
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [showScrollBottomButton, setShowScrollBottomButton] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom so the newest response is always visible
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    }
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' });
  };

  // Trigger auto-scroll on message updates, loading state changes, or when console opens
  useEffect(() => {
    if (isOpen) {
      // Immediate scroll
      scrollToBottom('smooth');

      // Subsequent RAF and timer checks to account for DOM reflows and dynamic text rendering
      const rafId = requestAnimationFrame(() => {
        scrollToBottom('smooth');
      });

      const timerId = setTimeout(() => {
        scrollToBottom('smooth');
      }, 100);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timerId);
      };
    }
  }, [messages, loading, errorStatus, isOpen]);

  // Track scroll position to provide quick jump-to-latest button when scrolled up
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 70;
    setShowScrollBottomButton(isScrolledUp);
  };

  // Prevent background scrolling and lock interactions when chat is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      window.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleSelectSuggestedPrompt = (prompt: string) => {
    setInputMessage(prompt);
    // Focus typing bar and position cursor at the end for the user to edit or manually send
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const len = prompt.length;
        textareaRef.current.setSelectionRange(len, len);
      }
    }, 50);
  };

  // Handle external trigger query (e.g. from Hero or other sections)
  useEffect(() => {
    if (initialQuery) {
      setIsOpen(true);
      handleSelectSuggestedPrompt(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  const suggestedPrompts = [
    "Help me choose a room",
    "What facilities does the hotel have?",
    "How do I make a reservation?",
    "What time is check-in?",
    "I'm having a problem with my room",
    "What can I do around the hotel?"
  ];

  const handleClearChat = () => {
    setMessages([
      {
        ...INITIAL_WELCOME_MESSAGE,
        id: "welcome-" + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorStatus(null);
    setLastFailedMessage(null);
  };

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorStatus(null);
    setLastFailedMessage(null);

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      text: textToSend.trim(),
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
          message: textToSend.trim(),
          history: messages.slice(-8).map((m) => ({ role: m.role, text: m.text }))
        })
      });

      if (!res.ok) {
        throw new Error("Unable to connect to the Cribb Concierge service at this moment.");
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        role: "model",
        text: data.reply || "Thank you for contacting Cribb Hotel. How else may I assist your stay?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedSources: data.groundedSources || ["Cribb Verified Knowledge Base"]
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chat failure:", err);
      setErrorStatus(err?.message || "Communication interrupted.");
      setLastFailedMessage(textToSend);

      const botFallback: ChatMessage = {
        id: "bot-err-" + Date.now(),
        role: "model",
        text: "I apologize for the momentary connection delay. You can reach our 24/7 Front Desk directly at ext. 0 or +234 1 277 8888, or retry your request using the button below.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedSources: ["Cribb Hotel Offline Directory"]
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  // Helper to render bold text and bullet points cleanly
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split("\n");
    return (
      <div className="space-y-1.5 leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          // Format bold markers **text**
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const formattedLine = parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-[#17283c]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          });

          // Check if bullet line
          if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-[#17283c] font-bold">•</span>
                <span className="flex-1">{formattedLine}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedLine}</p>;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Background interaction blocker & dimming overlay */}
      {isOpen && (
        <div
          id="ai-concierge-backdrop"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 transition-opacity duration-200 cursor-pointer"
          aria-label="Close Cribb AI Concierge"
        />
      )}

      {/* Floating Trigger Launcher */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={() => setIsOpen(true)}
            id="open-ai-concierge-button"
            className="flex items-center gap-3 px-5 py-3.5 bg-[#17283c] hover:bg-[#0f1c2d] text-white rounded-full shadow-[0px_8px_25px_rgba(23,40,60,0.35)] border border-[#f8dec3]/50 transition-all duration-300 hover:scale-105 active:scale-95 group"
            aria-label="Open Cribb AI Concierge"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 p-0.5">
              <img
                src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
                alt="Cribb Hotel Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#17283c] animate-pulse" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold uppercase tracking-wider block leading-tight">
                Cribb Concierge AI
              </span>
              <span className="text-[10px] text-[#f8dec3] font-mono">Real-Time Support • RAG</span>
            </div>
          </button>
        </div>
      )}

      {/* Expanded Support Console */}
      {isOpen && (
        <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50">
          <div className="w-[94vw] sm:w-[440px] h-[620px] max-h-[88vh] bg-white border border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Console Header */}
          <div className="bg-[#17283c] text-white px-4 py-3 flex items-center justify-between border-b border-stone-700">
            <div className="flex items-center gap-2.5">
              <img
                src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
                alt="Cribb Hotel Logo"
                className="w-8 h-8 object-contain rounded"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-serif font-bold tracking-wide">Cribb AI Concierge</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" title="System Online" />
                </div>
                <p className="text-[10px] text-stone-300 tracking-wider">
                  Real-Time 5-Star Guest Support & RAG
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 text-stone-400 hover:text-[#f8dec3] rounded transition-colors"
                aria-label="Clear chat history"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded transition-colors"
                aria-label="Close concierge"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RAG Verification Banner */}
          <div className="bg-[#efeae4] px-4 py-1.5 flex items-center justify-between text-[10px] text-[#17283c] border-b border-stone-200 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Grounded in Official Cribb Knowledge
            </span>
            <span className="text-[9px] bg-white px-1.5 py-0.5 border border-stone-300 text-stone-600">
              RAG + LLM
            </span>
          </div>

          {/* Messages Stream */}
          <div 
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/60 relative scroll-smooth"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <img
                    src="https://res.cloudinary.com/doujptiz/image/upload/v1789385626/20260914_122910_syhxpu.png"
                    alt="Cribb Concierge"
                    className="w-6 h-6 object-contain rounded-full flex-shrink-0 mt-0.5 border border-stone-200 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                )}

                <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`p-3 text-xs leading-relaxed transition-all ${
                      msg.role === 'user'
                        ? 'bg-[#17283c] text-white rounded-xl rounded-tr-none'
                        : 'bg-white text-stone-800 border border-stone-200 shadow-sm rounded-xl rounded-tl-none'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}

                    {/* Grounded Source Badges */}
                    {msg.groundedSources && msg.groundedSources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex flex-wrap gap-1">
                        {msg.groundedSources.map((source, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-stone-100 text-[9px] text-[#54657a] rounded"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            {source}
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
              <div className="flex gap-2 items-center text-xs text-[#54657a] pl-2 animate-pulse">
                <div className="w-5 h-5 rounded-full bg-[#17283c] flex items-center justify-center text-[#f8dec3]">
                  <Sparkles className="w-3 h-3 animate-spin" />
                </div>
                <span>Retrieving verified hotel knowledge & synthesizing response...</span>
              </div>
            )}

            {errorStatus && lastFailedMessage && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Connection interrupted.</span>
                </div>
                <button
                  onClick={() => sendMessage(lastFailedMessage)}
                  className="px-2 py-1 bg-rose-600 text-white rounded text-[10px] font-semibold hover:bg-rose-700"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Quick jump to latest message if user has scrolled up */}
            {showScrollBottomButton && (
              <div className="sticky bottom-1 flex justify-center z-30 pointer-events-none">
                <button
                  type="button"
                  onClick={() => scrollToBottom('smooth')}
                  className="pointer-events-auto px-3 py-1 bg-[#17283c] text-[#f8dec3] hover:bg-[#0f1c2d] hover:text-white text-[11px] font-medium rounded-full shadow-lg border border-[#f8dec3]/30 flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95"
                  aria-label="Scroll to newest response"
                >
                  <ArrowDown className="w-3 h-3 text-[#f8dec3]" />
                  <span>Scroll to latest</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} className="h-px" />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-white border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestedPrompt(prompt)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 bg-stone-100 hover:bg-[#efeae4] active:bg-[#f8dec3] text-[#17283c] text-[10px] font-medium border border-stone-200 rounded-full transition-colors flex-shrink-0 disabled:opacity-50 cursor-pointer"
                title="Insert prompt to edit and send"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Cribb Hotel (Press Enter to send)..."
              className="flex-1 max-h-24 p-2 bg-stone-50 border border-stone-300 focus:bg-white text-xs font-medium text-[#17283c] focus:outline-none focus:border-[#17283c] rounded resize-none"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="w-9 h-9 bg-[#17283c] hover:bg-[#0f1c2d] disabled:opacity-40 text-[#f8dec3] flex items-center justify-center transition-colors rounded flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Privacy Note & Quick Reserve Footer */}
          <div className="bg-stone-50 px-4 py-2 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
            <span className="truncate pr-2">
              Privacy protected • Never share card PINs or passwords
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenReserve();
              }}
              className="text-[#17283c] font-bold uppercase tracking-wider hover:underline flex items-center gap-1 flex-shrink-0"
            >
              Reserve Now <ArrowRight className="w-3 h-3" />
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
