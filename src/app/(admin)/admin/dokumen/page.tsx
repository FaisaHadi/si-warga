'use client';

import { FiDownload, FiFolder } from 'react-icons/fi';
import { Badge, Card, EmptyState, PageHeader } from '@/components/ui';
import { useLayanan } from '@/features/layanan';
import { JenisLayananLabel } from '@/types';

export default function AdminDokumenPage() {
  const { layanan, loading } = useLayanan();
  const generatedDocuments = layanan.filter((item) => Boolean(item.dokumenUrl));

  return (
    <>
      <PageHeader
        eyebrow="Dokumen Digital"
        title="Manajemen Dokumen"
        description="Dokumen hasil layanan akan dikumpulkan dan disiapkan dari halaman ini."
      />
      {generatedDocuments.length === 0 && !loading ? (
        <EmptyState
          icon={<FiFolder className="h-6 w-6" aria-hidden="true" />}
          title="Belum ada dokumen"
          description="Dokumen digital akan muncul setelah pengajuan warga diproses dan disetujui."
        />
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nama Dokumen</th>
                  <th className="px-4 py-3 font-semibold">Layanan</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-slate-500" colSpan={4}>
                      Memuat dokumen...
                    </td>
                  </tr>
                ) : (
                  generatedDocuments.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-950">Dokumen-{item.id}.txt</p>
                        <p className="mt-1 text-xs text-slate-500">ID layanan: {item.id}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{JenisLayananLabel[item.jenisLayanan]}</td>
                      <td className="px-4 py-4">
                        <Badge variant="green">Siap diunduh</Badge>
                      </td>
                      <td className="px-4 py-4">
                        <a
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                          href={item.dokumenUrl}
                          download={`dokumen-${item.id}.txt`}
                        >
                          <FiDownload aria-hidden="true" />
                          Unduh
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
