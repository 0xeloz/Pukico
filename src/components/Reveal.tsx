import React, { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'li';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = '',
  as: Component = 'div',
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <Component
      ref={ref as any}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: 'var(--dur-reveal, 600ms)',
        transitionTimingFunction: 'var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1))',
        transitionDelay: `${delay}ms`,
      }}
      className={`${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[14px]'
      } ${className}`}
    >
      {children}
    </Component>
  );
};
