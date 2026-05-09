/**
 * Status Enum
 * Status untuk tracking layanan administrasi
 */

export enum LayananStatus {
  PENDING = 'pending',
  DIPROSES = 'diproses',
  SELESAI = 'selesai',
  DITOLAK = 'ditolak',
}

export const LayananStatusLabel: Record<LayananStatus, string> = {
  [LayananStatus.PENDING]: 'Menunggu Verifikasi',
  [LayananStatus.DIPROSES]: 'Sedang Diproses',
  [LayananStatus.SELESAI]: 'Selesai',
  [LayananStatus.DITOLAK]: 'Ditolak',
};
