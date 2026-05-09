import { FiBarChart2 } from 'react-icons/fi';
import { EmptyState, PageHeader } from '@/components/ui';

export default function AdminLaporanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rekap Administrasi"
        title="Laporan Administrasi"
        description="Ringkasan layanan, status pengajuan, dan dokumen akan tersaji untuk kebutuhan laporan desa."
      />
      <EmptyState
        icon={<FiBarChart2 className="h-6 w-6" aria-hidden="true" />}
        title="Data laporan belum tersedia"
        description="Rekap akan terbentuk setelah layanan warga mulai diproses di sistem."
      />
    </>
  );
}
