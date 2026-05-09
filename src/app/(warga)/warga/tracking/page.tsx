'use client';

import { FiClock } from 'react-icons/fi';
import { Badge, Card, EmptyState, PageHeader } from '@/components/ui';
import { useAuth } from '@/features/auth';
import { useLayanan } from '@/features/layanan';
import { JenisLayananLabel, LayananStatus, LayananStatusLabel } from '@/types';

export default function WargaTrackingPage() {
  const { user } = useAuth();
  const { layanan, loading } = useLayanan(user?.id, undefined, !!user);
  const activeLayanan = layanan.filter((item) => item.status !== LayananStatus.SELESAI);

  return (
    <>
      <PageHeader
        eyebrow="Status Layanan"
        title="Tracking Layanan"
        description="Perubahan status pengajuan ditampilkan sesuai urutan proses administrasi."
      />

      {activeLayanan.length === 0 && !loading ? (
        <EmptyState
          icon={<FiClock className="h-6 w-6" aria-hidden="true" />}
          title="Belum ada layanan yang dipantau"
          description="Setelah pengajuan dibuat, status seperti menunggu verifikasi, diproses, selesai, atau ditolak akan muncul di sini."
        />
      ) : (
        <div className="grid gap-4">
          {activeLayanan.map((item) => (
            <Card key={item.id} as="article">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{JenisLayananLabel[item.jenisLayanan]}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.keperluan}</p>
                  {item.catatan && <p className="mt-3 text-sm text-slate-500">Catatan: {item.catatan}</p>}
                </div>
                <Badge variant={item.status === LayananStatus.DITOLAK ? 'red' : item.status === LayananStatus.DIPROSES ? 'blue' : 'yellow'}>
                  {LayananStatusLabel[item.status]}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
