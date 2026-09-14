import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CAROUSEL_SECTION_1_IMAGES } from '../data/hotelData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AutoScrollSection1Props {
  onOpenReserve?: () => void;
}

export const AutoScrollSection1: React.FC<AutoScrollSection1Props> = ({ onOpenReserve }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto transition automatically begins immediately as soon as the panel is revealed
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Auto-scroll after every 5 seconds (5000ms) once revealed
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SECTION_1_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SECTION_1_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SECTION_1_IMAGES.length) % CAROUSEL_SECTION_1_IMAGES.length);
  };

  // Distinct unique animations per slide as requested:
  // Slide 0: vertical lift fade
  // Slide 1: subtle scale & lens fade
  // Slide 2: horizontal drift & clarity fade
  const getAnimationVariants = (index: number) => {
    switch (index % 3) {
      case 0:
        return {
          initial: { opacity: 0, y: 25 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -25 },
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        };
      case 1:
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.04 },
          transition: { duration: 0.8, ease: "easeOut" }
        };
      case 2:
      default:
        return {
          initial: { opacity: 0, x: 30, filter: "blur(4px)" },
          animate: { opacity: 1, x: 0, filter: "blur(0px)" },
          exit: { opacity: 0, x: -30, filter: "blur(4px)" },
          transition: { duration: 0.8, ease: "easeInOut" }
        };
    }
  };

  const activeItem = CAROUSEL_SECTION_1_IMAGES[currentIndex];
  const currentVariant = getAnimationVariants(currentIndex);

  return (
    <section 
      ref={sectionRef}
      id="experience-carousel"
      className="py-16 lg:py-24 bg-[#efeae4]/50 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#54657a] uppercase block mb-1">
              Spaces Designed For Living
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#17283c] font-medium">
              Signature Gathering Experiences
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#54657a] font-mono">
              0{currentIndex + 1} / 0{CAROUSEL_SECTION_1_IMAGES.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-[#17283c] flex items-center justify-center text-[#17283c] transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-[#17283c] flex items-center justify-center text-[#17283c] transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Visual Container */}
        <div className="relative w-full aspect-[16/9] max-h-[640px] min-h-[380px] bg-stone-900 rounded-none overflow-hidden shadow-2xl">
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
                alt={activeItem.caption}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14 text-white max-w-3xl">
                <span className="inline-block px-3 py-1 bg-[#f8dec3] text-[#17283c] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                  Experience Spotlight
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-2">
                  {activeItem.caption}
                </h3>
                <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl font-sans">
                  {activeItem.subtext}
                </p>
                {onOpenReserve && (
                  <button
                    onClick={onOpenReserve}
                    className="mt-5 px-6 py-2.5 bg-white hover:bg-[#f8dec3] text-[#17283c] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Experience at Cribb
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator Bar (5-second cycle) */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
            {isVisible && (
              <motion.div
                key={`progress-${currentIndex}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-[#f8dec3]"
              />
            )}
          </div>

          {/* Slide Dots */}
          <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
            {CAROUSEL_SECTION_1_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 transition-all rounded-full ${
                  idx === currentIndex ? "w-8 bg-[#f8dec3]" : "w-2 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
