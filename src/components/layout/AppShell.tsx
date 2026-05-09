'use client';

import Link from 'next/link';
import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import {
  FiBarChart2,
  FiCheckSquare,
  FiClock,
  FiFileText,
  FiFolder,
  FiGrid,
  FiHome,
  FiLogOut,
  FiSend,
} from 'react-icons/fi';
import { ROUTES } from '@/utils';
import { Loading } from '@/components/common';
import { Card } from '@/components/ui';
import { authService, useAuth } from '@/features/auth';
import { UserRole } from '@/types';

export interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

interface AppShellProps {
  children: ReactNode;
  section: 'warga' | 'admin';
}

const shellConfig = {
  warga: {
    title: 'SI-WARGA',
    subtitle: 'Portal Warga',
    homeHref: ROUTES.WARGA_DASHBOARD,
    navItems: [
      { href: ROUTES.WARGA_DASHBOARD, label: 'Dashboard', icon: <FiGrid /> },
      { href: ROUTES.WARGA_LAYANAN, label: 'Layanan', icon: <FiSend /> },
      { href: ROUTES.WARGA_TRACKING, label: 'Tracking', icon: <FiClock /> },
      { href: ROUTES.WARGA_RIWAYAT, label: 'Riwayat', icon: <FiFileText /> },
    ],
  },
  admin: {
    title: 'SI-WARGA',
    subtitle: 'Dashboard Admin',
    homeHref: ROUTES.ADMIN_DASHBOARD,
    navItems: [
      { href: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: <FiGrid /> },
      { href: ROUTES.ADMIN_VERIFIKASI, label: 'Verifikasi', icon: <FiCheckSquare /> },
      { href: ROUTES.ADMIN_DOKUMEN, label: 'Dokumen', icon: <FiFolder /> },
      { href: ROUTES.ADMIN_LAPORAN, label: 'Laporan', icon: <FiBarChart2 /> },
    ],
  },
} satisfies Record<string, { title: string; subtitle: string; homeHref: string; navItems: NavItem[] }>;

export const AppShell = ({ children, section }: AppShellProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { title, subtitle, navItems, homeHref } = shellConfig[section];
  const isAuthorized =
    section === 'admin'
      ? user?.role === UserRole.ADMIN
      : user?.role === UserRole.WARGA || user?.role === UserRole.ADMIN;

  useEffect(() => {
    if (!loading && !user) {
      router.replace(ROUTES.LOGIN);
    }
  }, [loading, router, user]);

  const handleLogout = async () => {
    await authService.logout();
    router.replace(ROUTES.LOGIN);
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Loading />;
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="max-w-md text-center">
          <h1 className="text-xl font-bold text-slate-950">Akses tidak tersedia</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Akun ini tidak memiliki hak akses untuk membuka halaman tersebut.
          </p>
          <button
            type="button"
            onClick={() => router.replace(ROUTES.WARGA_DASHBOARD)}
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Kembali ke Dashboard
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white px-4 py-5 lg:block">
        <Link href={homeHref} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
            SW
          </div>
          <div>
            <p className="font-bold tracking-tight text-slate-950">{title}</p>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-1" aria-label="Navigasi utama">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                )}
              >
                <span className="text-lg" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 space-y-2 border-t border-slate-200 pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          >
            <FiHome aria-hidden="true" />
            Beranda
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          >
            <FiLogOut aria-hidden="true" />
            Keluar
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href={homeHref} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-xs font-bold text-white">
              SW
            </div>
            <div>
              <p className="text-sm font-bold text-slate-950">{title}</p>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
          </Link>
          <button type="button" onClick={handleLogout} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
            Keluar
          </button>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Navigasi mobile">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold',
                  active ? 'bg-blue-50 text-blue-800' : 'bg-slate-100 text-slate-700'
                )}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="px-4 py-6 sm:px-6 lg:ml-72 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};
