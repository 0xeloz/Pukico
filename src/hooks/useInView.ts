import { useEffect, useState, useRef } from 'react';

export function useInView<T extends HTMLElement = HTMLDivElement>() {
  const [isInView, setIsInView] = useState(() => {
    // If IntersectionObserver is not available, render immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return true;
    }
    // Also check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (isInView) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isInView]);

  return { ref, isInView };
}
