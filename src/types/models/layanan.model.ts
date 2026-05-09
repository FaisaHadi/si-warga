/**
 * Layanan Model
 * Domain model untuk layanan administrasi
 */

import { LayananStatus } from '../enums';

export enum JenisLayanan {
  SURAT_KETERANGAN = 'surat_keterangan',
  SURAT_DOMISILI = 'surat_domisili',
  SURAT_USAHA = 'surat_usaha',
  SURAT_TIDAK_MAMPU = 'surat_tidak_mampu',
  SURAT_KELAHIRAN = 'surat_kelahiran',
  SURAT_KEMATIAN = 'surat_kematian',
}

export const JenisLayananLabel: Record<JenisLayanan, string> = {
  [JenisLayanan.SURAT_KETERANGAN]: 'Surat Keterangan',
  [JenisLayanan.SURAT_DOMISILI]: 'Surat Domisili',
  [JenisLayanan.SURAT_USAHA]: 'Surat Keterangan Usaha',
  [JenisLayanan.SURAT_TIDAK_MAMPU]: 'Surat Keterangan Tidak Mampu',
  [JenisLayanan.SURAT_KELAHIRAN]: 'Surat Keterangan Kelahiran',
  [JenisLayanan.SURAT_KEMATIAN]: 'Surat Keterangan Kematian',
};

export interface Layanan {
  id: string;
  userId: string;
  jenisLayanan: JenisLayanan;
  keperluan: string;
  dataLengkap: Record<string, unknown>;
  status: LayananStatus;
  catatan?: string;
  dokumenUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  processedBy?: string;
}

export interface CreateLayananDto {
  jenisLayanan: JenisLayanan;
  keperluan: string;
  dataLengkap: Record<string, unknown>;
}

export interface UpdateLayananDto {
  status?: LayananStatus;
  catatan?: string;
  dokumenUrl?: string;
  processedBy?: string;
}
