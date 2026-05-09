import { ReactNode } from 'react';
import { AppShell } from '@/components/layout';

export default function WargaLayout({ children }: { children: ReactNode }) {
  return <AppShell section="warga">{children}</AppShell>;
}
