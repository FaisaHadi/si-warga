'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiEdit3, FiSend } from 'react-icons/fi';
import { useAuth } from '@/features/auth';
import { layananService } from '@/features/layanan';
import { Alert, Button, Card, EmptyState, Input, PageHeader, Textarea } from '@/components/ui';
import { JenisLayanan, JenisLayananLabel } from '@/types';
import { ROUTES } from '@/utils';

export default function WargaLayananPage() {
  const { user } = useAuth();
  const [jenisLayanan, setJenisLayanan] = useState<JenisLayanan>(JenisLayanan.SURAT_KETERANGAN);
  const [keperluan, setKeperluan] = useState('');
  const [keteranganTambahan, setKeteranganTambahan] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess('');
    setError('');

    if (!user) {
      setError('Sesi pengguna belum terbaca. Silakan masuk ulang.');
      return;
    }

    if (keperluan.trim().length < 8) {
      setError('Keperluan layanan minimal 8 karakter agar admin dapat memahami pengajuan.');
      return;
    }

    try {
      setLoading(true);
      const layananId = await layananService.create(user.id, {
        jenisLayanan,
        keperluan: keperluan.trim(),
        dataLengkap: {
          nama: user.nama,
          nik: user.nik,
          noTelepon: user.noTelepon,
          alamat: user.alamat,
          keteranganTambahan: keteranganTambahan.trim(),
        },
      });

      setKeperluan('');
      setKeteranganTambahan('');
      setSuccess(`Pengajuan berhasil dikirim. Nomor layanan: ${layananId}`);
    } catch {
      setError('Pengajuan gagal dikirim. Periksa koneksi dan izin Firestore.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Layanan Warga"
        title="Pengajuan Layanan"
        description="Pilih layanan administrasi dan lengkapi data yang dibutuhkan."
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card as="section">
          <h2 className="text-lg font-bold text-slate-950">Form Layanan</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Data identitas diambil dari profil akun warga. Pastikan keperluan ditulis jelas sebelum dikirim.
          </p>

          <div className="mt-5 space-y-4">
            {success && (
              <Alert variant="success" title="Pengajuan terkirim">
                {success}
              </Alert>
            )}
            {error && (
              <Alert variant="danger" title="Pengajuan belum bisa dikirim">
                {error}
              </Alert>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="jenisLayanan" className="block text-sm font-semibold text-slate-700">
                Jenis Layanan
              </label>
              <select
                id="jenisLayanan"
                value={jenisLayanan}
                onChange={(event) => setJenisLayanan(event.target.value as JenisLayanan)}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                {Object.values(JenisLayanan).map((jenis) => (
                  <option key={jenis} value={jenis}>
                    {JenisLayananLabel[jenis]}
                  </option>
                ))}
              </select>
            </div>

            <Textarea
              label="Keperluan"
              value={keperluan}
              onChange={(event) => setKeperluan(event.target.value)}
              placeholder="Contoh: Untuk melengkapi persyaratan administrasi sekolah."
              required
            />

            <Input
              label="Keterangan Tambahan"
              value={keteranganTambahan}
              onChange={(event) => setKeteranganTambahan(event.target.value)}
              placeholder="Opsional"
            />

            <Button type="submit" fullWidth isLoading={loading} leftIcon={<FiSend aria-hidden="true" />}>
              Kirim Pengajuan
            </Button>
          </form>
        </Card>

        <EmptyState
          icon={<FiEdit3 className="h-6 w-6" aria-hidden="true" />}
          title="Pengajuan masuk ke antrean admin"
          description="Setelah dikirim, layanan akan berstatus Menunggu Verifikasi dan tampil pada dashboard admin."
          action={
            <Link
              href={ROUTES.WARGA_TRACKING}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Lihat Tracking
              <FiCheckCircle aria-hidden="true" />
            </Link>
          }
        />
      </div>
    </>
  );
}
