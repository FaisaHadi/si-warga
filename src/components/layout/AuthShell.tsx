import Link from 'next/link';
import { ReactNode } from 'react';
import { FiArrowLeft, FiCheckCircle, FiFileText, FiShield } from 'react-icons/fi';

export const AuthShell = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_440px]">
        <section className="hidden lg:block">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-white hover:text-slate-950"
          >
            <FiArrowLeft aria-hidden="true" />
            Beranda
          </Link>
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
              <FiShield aria-hidden="true" />
              Sistem Administrasi Digital Warga
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950">
              Akses layanan desa dengan proses yang jelas dan tertata.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              SI-WARGA membantu warga mengajukan layanan, memantau status, dan menerima dokumen administrasi secara digital.
            </p>
          </div>

          <div className="mt-8 grid max-w-xl gap-3">
            {[
              { icon: <FiFileText />, title: 'Data pengajuan tersimpan rapi' },
              { icon: <FiCheckCircle />, title: 'Status layanan mudah dipantau' },
              { icon: <FiShield />, title: 'Akses dipisah untuk warga dan admin' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  {item.icon}
                </div>
                <p className="font-semibold text-slate-800">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section>{children}</section>
      </div>
    </main>
  );
};
