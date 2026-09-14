import React, { ElementType, ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface ScrollRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number; // delay in milliseconds
  duration?: number; // duration in milliseconds
  distance?: number; // distance in pixels to slide up (subtle, default 28px)
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 800,
  distance = 28,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
  id,
}) => {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  return (
    <Component
      ref={ref}
      id={id}
      className={`${className} transition-all`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : `translateY(${distance}px)`,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};
