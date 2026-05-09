/**
 * Card Component
 * Reusable card container
 */

import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'section' | 'article';
}

export const Card = ({ children, className, padding = 'md', as: Component = 'div' }: CardProps) => {
  return (
    <Component
      className={clsx(
        'rounded-lg border border-slate-200 bg-white shadow-sm',
        {
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-5 sm:p-6': padding === 'md',
          'p-6 sm:p-8': padding === 'lg',
        },
        className
      )}
    >
      {children}
    </Component>
  );
};
