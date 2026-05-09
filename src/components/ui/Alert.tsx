import { ReactNode } from 'react';
import clsx from 'clsx';
import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

interface AlertProps {
  children: ReactNode;
  title?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
}

const icons = {
  info: FiInfo,
  success: FiCheckCircle,
  warning: FiAlertCircle,
  danger: FiAlertCircle,
};

export const Alert = ({ children, title, variant = 'info' }: AlertProps) => {
  const Icon = icons[variant];

  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={clsx('flex gap-3 rounded-lg border p-4 text-sm', {
        'border-blue-200 bg-blue-50 text-blue-900': variant === 'info',
        'border-green-200 bg-green-50 text-green-900': variant === 'success',
        'border-yellow-200 bg-yellow-50 text-yellow-900': variant === 'warning',
        'border-red-200 bg-red-50 text-red-900': variant === 'danger',
      })}
    >
      <Icon className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div className={clsx(title && 'mt-1')}>{children}</div>
      </div>
    </div>
  );
};
