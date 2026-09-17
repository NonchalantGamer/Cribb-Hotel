import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, MapPin } from 'lucide-react';
import { CAROUSEL_SECTION_2_IMAGES } from '../data/hotelData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AutoScrollSection2Props {
  onOpenReserve?: () => void;
}

export const AutoScrollSection2: React.FC<AutoScrollSection2Props> = ({ onOpenReserve }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto transition automatically begins immediately as soon as the panel is revealed
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Auto scroll after every 5 seconds once revealed
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SECTION_2_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SECTION_2_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SECTION_2_IMAGES.length) % CAROUSEL_SECTION_2_IMAGES.length);
  };

  // Distinct unique animations per slide for the 8 items:
  const getAnimationVariants = (index: number) => {
    const cycle = index % 4;
    switch (cycle) {
      case 0:
        return {
          initial: { opacity: 0, scale: 0.94, y: 15 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 1.02, y: -15 },
          transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
        };
      case 1:
        return {
          initial: { opacity: 0, x: 40 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -40 },
          transition: { duration: 0.8, ease: "easeOut" }
        };
      case 2:
        return {
          initial: { opacity: 0, filter: "blur(6px)", scale: 1.03 },
          animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
          exit: { opacity: 0, filter: "blur(6px)", scale: 0.98 },
          transition: { duration: 0.85, ease: "easeInOut" }
        };
      case 3:
      default:
        return {
          initial: { opacity: 0, y: -20, rotate: -0.5 },
          animate: { opacity: 1, y: 0, rotate: 0 },
          exit: { opacity: 0, y: 20, rotate: 0.5 },
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        };
    }
  };

  const activeItem = CAROUSEL_SECTION_2_IMAGES[currentIndex];
  const currentVariant = getAnimationVariants(currentIndex);

  return (
    <section 
      ref={sectionRef}
      id="destinations" 
      className="py-20 lg:py-28 bg-[#17283c] text-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#f8dec3]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase">
                Curated Gallery • 8 Signature Perspectives
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight">
              Immerse Yourself in the Cribb World
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl">
              From our legendary dining and serene spa sanctuaries to oceanfront suites and ballroom galas, explore how each destination comes to life.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#f8dec3] font-mono tracking-widest">
              0{currentIndex + 1} / 0{CAROUSEL_SECTION_2_IMAGES.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-stone-600 hover:border-[#f8dec3] hover:text-[#f8dec3] flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-stone-600 hover:border-[#f8dec3] hover:text-[#f8dec3] flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Stage Display with Unique Fade Animations */}
        <div className="relative w-full aspect-[16/9] max-h-[620px] min-h-[360px] bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={currentVariant.initial}
              animate={currentVariant.animate}
              exit={currentVariant.exit}
              transition={currentVariant.transition}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={activeItem.url}
                alt={`${activeItem.title} - ${activeItem.destination}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Information overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-[#f8dec3] text-[#17283c] text-[10px] font-bold uppercase tracking-widest font-mono">
                      0{currentIndex + 1} / 0{CAROUSEL_SECTION_2_IMAGES.length}
                    </span>
                    <span className="text-xs text-[#f8dec3] font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {activeItem.destination}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-2">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-lg font-sans">
                    {activeItem.description}
                  </p>
                  {onOpenReserve && (
                    <button
                      onClick={onOpenReserve}
                      className="mt-4 px-6 py-2.5 bg-[#f8dec3] hover:bg-[#edd0b2] text-[#17283c] text-xs font-bold uppercase tracking-widest transition-all duration-200"
                    >
                      Book This Experience
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Continuous 5-second cycle progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
            {isVisible && (
              <motion.div
                key={`sec2-progress-${currentIndex}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-[#f8dec3]"
              />
            )}
          </div>
        </div>

        {/* Thumbnail Ribbon */}
        <div className="mt-6 grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {CAROUSEL_SECTION_2_IMAGES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-[4/3] overflow-hidden border-2 transition-all ${
                idx === currentIndex 
                  ? "border-[#f8dec3] scale-105 shadow-lg opacity-100" 
                  : "border-transparent opacity-50 hover:opacity-90"
              }`}
              aria-label={`View ${item.title}`}
            >
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute bottom-1 left-1 text-[9px] font-mono text-white/90">
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
