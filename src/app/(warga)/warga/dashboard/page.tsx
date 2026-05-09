'use client';

import Link from 'next/link';
import { FiArrowRight, FiClock, FiFileText, FiInbox, FiSend } from 'react-icons/fi';
import { useAuth } from '@/features/auth';
import { useLayanan } from '@/features/layanan';
import { Badge, Card, EmptyState, PageHeader, StatCard } from '@/components/ui';
import { JenisLayananLabel, LayananStatus, LayananStatusLabel } from '@/types';
import { ROUTES } from '@/utils';

export default function WargaDashboardPage() {
  const { user } = useAuth();
  const { layanan, loading } = useLayanan(user?.id, undefined, !!user);
  const pending = layanan.filter((item) => item.status === LayananStatus.PENDING);
  const aktif = layanan.filter((item) => item.status === LayananStatus.PENDING || item.status === LayananStatus.DIPROSES);
  const selesai = layanan.filter((item) => item.status === LayananStatus.SELESAI);

  return (
    <>
      <PageHeader
        eyebrow="Portal Warga"
        title={`Selamat datang, ${user?.nama ?? 'Warga'}`}
        description="Pantau pengajuan layanan dan dokumen administrasi dari satu halaman."
        action={
          <Link
            href={ROUTES.WARGA_LAYANAN}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Ajukan Layanan
            <FiArrowRight aria-hidden="true" />
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Menunggu Verifikasi" value={loading ? '...' : pending.length} helper="Pengajuan baru" icon={<FiClock />} tone="yellow" />
        <StatCard label="Layanan Aktif" value={loading ? '...' : aktif.length} helper="Menunggu atau diproses" icon={<FiSend />} tone="blue" />
        <StatCard label="Dokumen Selesai" value={loading ? '...' : selesai.length} helper="Siap dilihat warga" icon={<FiFileText />} tone="green" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <Card as="section">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Aktivitas Terbaru</h2>
              <p className="mt-1 text-sm text-slate-500">Pengajuan dan perubahan status tampil di sini.</p>
            </div>
            <Badge variant={layanan.length ? 'blue' : 'slate'}>{layanan.length} layanan</Badge>
          </div>

          {layanan.length === 0 && !loading ? (
            <EmptyState
              icon={<FiInbox className="h-6 w-6" aria-hidden="true" />}
              title="Belum ada layanan aktif"
              description="Setelah warga mengajukan layanan, status pengajuan akan muncul pada daftar aktivitas."
              action={
                <Link
                  href={ROUTES.WARGA_LAYANAN}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Mulai Pengajuan
                </Link>
              }
            />
          ) : (
            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {layanan.slice(0, 5).map((item) => (
                <div key={item.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950">{JenisLayananLabel[item.jenisLayanan]}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.keperluan}</p>
                  </div>
                  <Badge variant={item.status === LayananStatus.SELESAI ? 'green' : item.status === LayananStatus.DITOLAK ? 'red' : 'yellow'}>
                    {LayananStatusLabel[item.status]}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card as="section">
          <h2 className="text-lg font-bold text-slate-950">Akses Cepat</h2>
          <div className="mt-4 space-y-3">
            {[
              { href: ROUTES.WARGA_LAYANAN, label: 'Pengajuan layanan', icon: <FiSend /> },
              { href: ROUTES.WARGA_TRACKING, label: 'Cek tracking', icon: <FiClock /> },
              { href: ROUTES.WARGA_RIWAYAT, label: 'Riwayat dokumen', icon: <FiFileText /> },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </span>
                <FiArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
