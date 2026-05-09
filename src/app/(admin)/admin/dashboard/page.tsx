'use client';

import { FiCheckCircle, FiClock, FiFileText, FiInbox, FiXCircle } from 'react-icons/fi';
import { Badge, Card, EmptyState, PageHeader, StatCard } from '@/components/ui';
import { useLayanan } from '@/features/layanan';
import { LayananStatus } from '@/types';

export default function AdminDashboardPage() {
  const { layanan, loading } = useLayanan();
  const pending = layanan.filter((item) => item.status === LayananStatus.PENDING);
  const diproses = layanan.filter((item) => item.status === LayananStatus.DIPROSES);
  const selesai = layanan.filter((item) => item.status === LayananStatus.SELESAI);
  const ditolak = layanan.filter((item) => item.status === LayananStatus.DITOLAK);

  return (
    <>
      <PageHeader
        eyebrow="Dashboard Admin"
        title="Pusat Verifikasi Layanan"
        description="Kelola antrean pengajuan, proses dokumen, dan pantau layanan administrasi warga."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Menunggu Verifikasi" value={loading ? '...' : pending.length} helper="Perlu ditinjau admin" icon={<FiClock />} tone="yellow" />
        <StatCard label="Sedang Diproses" value={loading ? '...' : diproses.length} helper="Dalam workflow desa" icon={<FiFileText />} tone="blue" />
        <StatCard label="Selesai" value={loading ? '...' : selesai.length} helper="Dokumen siap" icon={<FiCheckCircle />} tone="green" />
        <StatCard label="Ditolak" value={loading ? '...' : ditolak.length} helper="Butuh perbaikan data" icon={<FiXCircle />} tone="red" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card as="section">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Prioritas Verifikasi</h2>
              <p className="mt-1 text-sm text-slate-500">Pengajuan masuk akan disusun berdasarkan waktu terbaru.</p>
            </div>
            <Badge variant="yellow">{pending.length} antrean</Badge>
          </div>

          {pending.length === 0 ? (
            <EmptyState
              icon={<FiInbox className="h-6 w-6" aria-hidden="true" />}
              title="Belum ada pengajuan masuk"
              description="Daftar layanan warga yang perlu diverifikasi akan muncul pada area ini."
            />
          ) : (
            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {pending.slice(0, 5).map((item) => (
                <div key={item.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950">{item.jenisLayanan.replaceAll('_', ' ')}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.keperluan}</p>
                  </div>
                  <Badge variant="yellow">Menunggu</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card as="section">
          <h2 className="text-lg font-bold text-slate-950">Kualitas Proses</h2>
          <div className="mt-4 space-y-4">
            {[
              ['Validasi data warga', loading ? '...' : 'Siap'],
              ['Generate dokumen', 'Disiapkan'],
              ['Tracking status', loading ? '...' : `${layanan.length} data`],
            ].map(([label, status]) => (
              <div key={label} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-slate-700">{label}</p>
                <Badge variant={status === 'Disiapkan' ? 'blue' : 'green'}>{status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
