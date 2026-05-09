'use client';

import { FiFileText } from 'react-icons/fi';
import { Badge, Card, EmptyState, PageHeader } from '@/components/ui';
import { useAuth } from '@/features/auth';
import { useLayanan } from '@/features/layanan';
import { JenisLayananLabel, LayananStatus, LayananStatusLabel } from '@/types';

export default function WargaRiwayatPage() {
  const { user } = useAuth();
  const { layanan, loading } = useLayanan(user?.id, undefined, !!user);

  return (
    <>
      <PageHeader
        eyebrow="Arsip Warga"
        title="Riwayat Layanan"
        description="Pengajuan yang pernah dibuat tersimpan sebagai riwayat layanan warga."
      />

      {layanan.length === 0 && !loading ? (
        <EmptyState
          icon={<FiFileText className="h-6 w-6" aria-hidden="true" />}
          title="Riwayat masih kosong"
          description="Layanan yang selesai atau pernah diajukan akan tampil di daftar riwayat."
        />
      ) : (
        <div className="grid gap-4">
          {layanan.map((item) => (
            <Card key={item.id} as="article">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{JenisLayananLabel[item.jenisLayanan]}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.keperluan}</p>
                  <p className="mt-2 text-xs text-slate-500">Nomor layanan: {item.id}</p>
                </div>
                <Badge variant={item.status === LayananStatus.SELESAI ? 'green' : item.status === LayananStatus.DITOLAK ? 'red' : 'blue'}>
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
