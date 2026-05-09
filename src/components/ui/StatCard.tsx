import { ReactNode } from 'react';
import clsx from 'clsx';

interface StatCardProps {
  label: string;
  value: string | number;
  helper?: string;
  icon?: ReactNode;
  tone?: 'blue' | 'teal' | 'green' | 'yellow' | 'red' | 'slate';
}

export const StatCard = ({ label, value, helper, icon, tone = 'blue' }: StatCardProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
        </div>
        {icon && (
          <div
            className={clsx('rounded-lg p-3', {
              'bg-blue-50 text-blue-700': tone === 'blue',
              'bg-teal-50 text-teal-700': tone === 'teal',
              'bg-green-50 text-green-700': tone === 'green',
              'bg-yellow-50 text-yellow-700': tone === 'yellow',
              'bg-red-50 text-red-700': tone === 'red',
              'bg-slate-100 text-slate-700': tone === 'slate',
            })}
          >
            {icon}
          </div>
        )}
      </div>
      {helper && <p className="mt-3 text-sm text-slate-500">{helper}</p>}
    </section>
  );
};
