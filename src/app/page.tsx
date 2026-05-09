import Link from 'next/link';
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiSend,
  FiShield,
} from 'react-icons/fi';
import { Badge } from '@/components/ui';
import { ROUTES } from '@/utils';

const workflow = [
  {
    title: 'Pengajuan',
    description: 'Warga memilih layanan dan mengisi data administrasi.',
    icon: <FiSend />,
  },
  {
    title: 'Verifikasi',
    description: 'Admin desa memeriksa data dan kelengkapan pengajuan.',
    icon: <FiCheckCircle />,
  },
  {
    title: 'Dokumen',
    description: 'Dokumen digital disiapkan setelah pengajuan disetujui.',
    icon: <FiFileText />,
  },
  {
    title: 'Tracking',
    description: 'Status layanan dapat dipantau sampai selesai.',
    icon: <FiClock />,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
            SW
          </div>
          <div>
            <p className="font-bold text-slate-950">SI-WARGA</p>
            <p className="text-xs text-slate-500">Administrasi Digital Warga</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.LOGIN}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          >
            Masuk
          </Link>
          <Link
            href={ROUTES.REGISTER}
            className="hidden rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 sm:inline-flex"
          >
            Daftar
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <Badge variant="teal" className="mb-5">
            <FiShield className="mr-1.5" aria-hidden="true" />
            Sistem Informasi Administrasi Desa
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            SI-WARGA
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Pelayanan administrasi warga yang tertata, mudah dipantau, dan siap membantu workflow desa dari pengajuan sampai dokumen selesai.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={ROUTES.LOGIN}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-base font-semibold text-white hover:bg-blue-800"
            >
              Masuk ke Sistem
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link
              href={ROUTES.REGISTER}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-base font-semibold text-slate-800 hover:bg-slate-50"
            >
              Daftar Warga
            </Link>
          </div>
        </div>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-label="Alur layanan SI-WARGA">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Alur Layanan</h2>
              <p className="mt-1 text-sm text-slate-500">Proses administrasi warga dalam satu sistem.</p>
            </div>
            <Badge variant="blue">Realtime</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {workflow.map((item, index) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tahap {index + 1}
                    </p>
                    <h3 className="mt-1 font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
