import { ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'blue' | 'teal' | 'green' | 'yellow' | 'red' | 'slate';
  className?: string;
}

export const Badge = ({ children, variant = 'slate', className }: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        {
          'border-blue-200 bg-blue-50 text-blue-800': variant === 'blue',
          'border-teal-200 bg-teal-50 text-teal-800': variant === 'teal',
          'border-green-200 bg-green-50 text-green-800': variant === 'green',
          'border-yellow-200 bg-yellow-50 text-yellow-800': variant === 'yellow',
          'border-red-200 bg-red-50 text-red-800': variant === 'red',
          'border-slate-200 bg-slate-100 text-slate-700': variant === 'slate',
        },
        className
      )}
    >
      {children}
    </span>
  );
};
