import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'SI-WARGA - Sistem Administrasi Digital Warga',
  description: 'Sistem Informasi Administrasi Desa Berbasis Web',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
