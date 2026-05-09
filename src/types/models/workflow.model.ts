import { LayananStatus } from '../enums';

export interface StatusHistory {
  id: string;
  layananId: string;
  status: LayananStatus;
  changedBy: string;
  catatan?: string;
  createdAt: Date;
}

export interface CreateStatusHistoryDto {
  layananId: string;
  status: LayananStatus;
  changedBy: string;
  catatan?: string;
}
