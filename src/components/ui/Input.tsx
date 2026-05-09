import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = ({ label, error, hint, id, className, ...props }: InputProps) => {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-');
  const descriptionId = hint || error ? `${inputId}-description` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={descriptionId}
        className={clsx(
          'h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100',
          error ? 'border-red-400 focus:border-red-600 focus:ring-red-100' : 'border-slate-300',
          className
        )}
        {...props}
      />
      {(hint || error) && (
        <p id={descriptionId} className={clsx('text-xs', error ? 'text-red-700' : 'text-slate-500')}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
};
