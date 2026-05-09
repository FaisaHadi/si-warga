/**
 * Dokumen Model
 * Domain model untuk dokumen digital
 */

export interface Dokumen {
  id: string;
  layananId: string;
  userId: string;
  nama: string;
  url: string;
  type: string;
  size: number;
  createdAt: Date;
  createdBy: string;
}
