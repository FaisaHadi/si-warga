'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { Alert, Button, Card, Input } from '@/components/ui';
import { authService } from '@/features/auth';
import { UserRole } from '@/types';
import { ROUTES } from '@/utils';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user } = await authService.login(email, password);
      
      if (user?.role === UserRole.ADMIN) {
        router.push(ROUTES.ADMIN_DASHBOARD);
      } else {
        router.push(ROUTES.WARGA_DASHBOARD);
      }
    } catch {
      setError('Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-700">Akses Akun</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Masuk ke SI-WARGA</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Gunakan akun yang sudah terdaftar untuk membuka layanan warga atau dashboard admin.
        </p>
      </div>
        
      {error && (
        <div className="mb-4">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <Button type="submit" fullWidth isLoading={loading} rightIcon={<FiArrowRight aria-hidden="true" />}>
          Masuk
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        Belum punya akun?{' '}
        <Link href={ROUTES.REGISTER} className="font-semibold text-blue-700 hover:text-blue-800">
          Daftar warga
        </Link>
      </p>
    </Card>
  );
}
