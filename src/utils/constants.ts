/**
 * Constants
 * Application-wide constants
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Warga routes
  WARGA_DASHBOARD: '/warga/dashboard',
  WARGA_LAYANAN: '/warga/layanan',
  WARGA_TRACKING: '/warga/tracking',
  WARGA_RIWAYAT: '/warga/riwayat',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_VERIFIKASI: '/admin/verifikasi',
  ADMIN_DOKUMEN: '/admin/dokumen',
  ADMIN_LAPORAN: '/admin/laporan',
} as const;

export const COLLECTIONS = {
  USERS: 'users',
  LAYANAN: 'layanan',
  DOKUMEN: 'dokumen',
  STATUS_HISTORY: 'statusHistory',
} as const;
