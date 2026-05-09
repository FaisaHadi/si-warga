'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Alert, Button, Card, Input, Textarea } from '@/components/ui';
import { authService } from '@/features/auth';
import { UserRole } from '@/types';
import { ROUTES } from '@/utils';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    nama: '',
    nik: '',
    noTelepon: '',
    alamat: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register({
        ...form,
        role: UserRole.WARGA,
      });
      router.push(ROUTES.WARGA_DASHBOARD);
    } catch {
      setError('Registrasi gagal. Periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-700">Registrasi Warga</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Daftar Akun SI-WARGA</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Isi data identitas sesuai administrasi warga untuk membuat akun layanan.
        </p>
      </div>

      {error && (
        <div className="mb-4">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          label="Nama Lengkap"
          value={form.nama}
          onChange={(e) => updateField('nama', e.target.value)}
          autoComplete="name"
          required
        />

        <Input
          label="NIK"
          value={form.nik}
          onChange={(e) => updateField('nik', e.target.value)}
          inputMode="numeric"
          hint="Gunakan 16 digit NIK."
          required
        />

        <Input
          label="Nomor Telepon"
          value={form.noTelepon}
          onChange={(e) => updateField('noTelepon', e.target.value)}
          inputMode="tel"
          autoComplete="tel"
          required
        />

        <Textarea
          label="Alamat"
          value={form.alamat}
          onChange={(e) => updateField('alamat', e.target.value)}
          rows={3}
          required
        />

        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          autoComplete="email"
          required
        />

        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => updateField('password', e.target.value)}
          autoComplete="new-password"
          required
        />

        <Button type="submit" fullWidth isLoading={loading}>
          Daftar
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        Sudah punya akun?{' '}
        <Link href={ROUTES.LOGIN} className="font-semibold text-blue-700 hover:text-blue-800">
          Masuk di sini
        </Link>
      </p>
    </Card>
  );
}
