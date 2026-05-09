'use client';

import { useState } from 'react';
import { FiCheckCircle, FiClock, FiDownload, FiFileText, FiInbox, FiXCircle } from 'react-icons/fi';
import { Alert, Badge, Button, Card, EmptyState, PageHeader } from '@/components/ui';
import { useAuth } from '@/features/auth';
import { dokumenService } from '@/features/dokumen';
import { layananService, useLayanan } from '@/features/layanan';
import { JenisLayananLabel, Layanan, LayananStatus, LayananStatusLabel } from '@/types';

type BadgeVariant = 'blue' | 'teal' | 'green' | 'yellow' | 'red' | 'slate';

const getRequesterName = (layanan: Layanan) => {
  const nama = layanan.dataLengkap?.nama;
  return typeof nama === 'string' && nama.trim() ? nama : 'Warga';
};

const getNik = (layanan: Layanan) => {
  const nik = layanan.dataLengkap?.nik;
  return typeof nik === 'string' && nik.trim() ? nik : '-';
};

const getStatusVariant = (status: LayananStatus): BadgeVariant => {
  const variants: Record<LayananStatus, BadgeVariant> = {
    [LayananStatus.PENDING]: 'yellow',
    [LayananStatus.DIPROSES]: 'blue',
    [LayananStatus.SELESAI]: 'green',
    [LayananStatus.DITOLAK]: 'red',
  };

  return variants[status];
};

export default function AdminVerifikasiPage() {
  const { user } = useAuth();
  const { layanan, loading, error, refetch } = useLayanan();
  const [processingKey, setProcessingKey] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const updateStatus = async (layananId: string, status: LayananStatus) => {
    if (!user) return;

    try {
      setProcessingKey(`${status}:${layananId}`);
      setMessage('');
      await layananService.updateStatus(
        layananId,
        status,
        user.id,
        status === LayananStatus.DITOLAK ? 'Pengajuan ditolak oleh admin.' : 'Pengajuan diverifikasi oleh admin.'
      );
      setMessage(`Status berhasil diubah menjadi ${LayananStatusLabel[status]}.`);
      await refetch();
    } finally {
      setProcessingKey(null);
    }
  };

  const generateDocument = async (item: Layanan) => {
    if (!user) return;

    try {
      setProcessingKey(`generate:${item.id}`);
      setMessage('');
      await dokumenService.generateFromLayanan(item, user.id);
      setMessage('Dokumen sederhana berhasil dibuat dan layanan ditandai selesai.');
      await refetch();
    } finally {
      setProcessingKey(null);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Admin Desa"
        title="Verifikasi Layanan"
        description="Periksa data warga dan kelengkapan pengajuan sebelum layanan diproses."
      />

      <div className="space-y-4">
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">Gagal mengambil antrean verifikasi: {error}</Alert>}

        {layanan.length === 0 && !loading ? (
          <EmptyState
            icon={<FiInbox className="h-6 w-6" aria-hidden="true" />}
            title="Belum ada layanan"
            description="Pengajuan warga akan muncul sebagai tabel verifikasi di halaman ini."
          />
        ) : (
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="min-w-[920px] w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Layanan</th>
                    <th className="px-4 py-3 font-semibold">Pemohon</th>
                    <th className="px-4 py-3 font-semibold">Keperluan</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Dokumen</th>
                    <th className="px-4 py-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr>
                      <td className="px-4 py-8 text-center text-slate-500" colSpan={6}>
                        Memuat data layanan...
                      </td>
                    </tr>
                  ) : (
                    layanan.map((item) => (
                      <tr key={item.id} className="align-top">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-950">{JenisLayananLabel[item.jenisLayanan]}</p>
                          <p className="mt-1 text-xs text-slate-500">ID: {item.id}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-800">{getRequesterName(item)}</p>
                          <p className="mt-1 text-xs text-slate-500">NIK: {getNik(item)}</p>
                        </td>
                        <td className="max-w-xs px-4 py-4 text-slate-600">{item.keperluan}</td>
                        <td className="px-4 py-4">
                          <Badge variant={getStatusVariant(item.status)}>{LayananStatusLabel[item.status]}</Badge>
                        </td>
                        <td className="px-4 py-4">
                          {item.dokumenUrl ? (
                            <a
                              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                              href={item.dokumenUrl}
                              download={`dokumen-${item.id}.txt`}
                            >
                              <FiDownload aria-hidden="true" />
                              Unduh
                            </a>
                          ) : (
                            <span className="text-xs text-slate-500">Belum dibuat</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {item.status === LayananStatus.PENDING && (
                              <Button
                                size="sm"
                                variant="secondary"
                                leftIcon={<FiClock aria-hidden="true" />}
                                isLoading={processingKey === `${LayananStatus.DIPROSES}:${item.id}`}
                                onClick={() => updateStatus(item.id, LayananStatus.DIPROSES)}
                              >
                                Proses
                              </Button>
                            )}
                            {item.status !== LayananStatus.SELESAI && item.status !== LayananStatus.DITOLAK && (
                              <Button
                                size="sm"
                                leftIcon={<FiFileText aria-hidden="true" />}
                                isLoading={processingKey === `generate:${item.id}`}
                                onClick={() => generateDocument(item)}
                              >
                                Generate
                              </Button>
                            )}
                            {item.status === LayananStatus.DIPROSES && (
                              <Button
                                size="sm"
                                variant="secondary"
                                leftIcon={<FiCheckCircle aria-hidden="true" />}
                                isLoading={processingKey === `${LayananStatus.SELESAI}:${item.id}`}
                                onClick={() => updateStatus(item.id, LayananStatus.SELESAI)}
                              >
                                Selesai
                              </Button>
                            )}
                            {item.status !== LayananStatus.SELESAI && item.status !== LayananStatus.DITOLAK && (
                              <Button
                                size="sm"
                                variant="danger"
                                leftIcon={<FiXCircle aria-hidden="true" />}
                                isLoading={processingKey === `${LayananStatus.DITOLAK}:${item.id}`}
                                onClick={() => updateStatus(item.id, LayananStatus.DITOLAK)}
                              >
                                Tolak
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
