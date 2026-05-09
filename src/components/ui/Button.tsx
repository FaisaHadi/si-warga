/**
 * Button Component
 * Reusable button component
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { FiLoader } from 'react-icons/fi';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 disabled:cursor-not-allowed disabled:opacity-60',
        {
          'border-blue-700 bg-blue-700 text-white hover:bg-blue-800': variant === 'primary',
          'border-slate-300 bg-white text-slate-800 hover:bg-slate-50': variant === 'secondary',
          'border-red-700 bg-red-700 text-white hover:bg-red-800': variant === 'danger',
          'border-transparent bg-transparent text-slate-700 hover:bg-slate-100': variant === 'ghost',
          'h-9 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-5 text-base': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
