import {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
} from '@/lib/firebase';
import {
  CreateLayananDto,
  CreateStatusHistoryDto,
  Layanan,
  LayananStatus,
  StatusHistory,
  UpdateLayananDto,
} from '@/types';
import { COLLECTIONS } from '@/utils';

const toMillis = (value: unknown) => {
  if (value instanceof Date) return value.getTime();

  if (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof value.toDate === 'function'
  ) {
    return value.toDate().getTime();
  }

  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
};

const sortByNewest = (items: Layanan[]) => {
  return [...items].sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
};

const createStatusHistory = async (data: CreateStatusHistoryDto) => {
  await createDocument<StatusHistory>(COLLECTIONS.STATUS_HISTORY, {
    ...data,
    createdAt: new Date(),
  });
};

export const layananService = {
  /**
   * Create layanan baru
   */
  async create(userId: string, data: CreateLayananDto): Promise<string> {
    const layananData = {
      ...data,
      userId,
      status: LayananStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const layananId = await createDocument<Layanan>(COLLECTIONS.LAYANAN, layananData);
    await createStatusHistory({
      layananId,
      status: LayananStatus.PENDING,
      changedBy: userId,
    });

    return layananId;
  },

  /**
   * Get layanan by ID
   */
  async getById(id: string): Promise<Layanan | null> {
    return getDocumentById<Layanan>(COLLECTIONS.LAYANAN, id);
  },

  /**
   * Get layanan by user ID
   */
  async getByUserId(userId: string): Promise<Layanan[]> {
    const data = await getAllDocuments<Layanan>(COLLECTIONS.LAYANAN);
    return sortByNewest(data.filter((item) => item.userId === userId));
  },

  /**
   * Get all layanan (admin)
   */
  async getAll(status?: LayananStatus): Promise<Layanan[]> {
    const data = await getAllDocuments<Layanan>(COLLECTIONS.LAYANAN);
    const filteredData = status ? data.filter((item) => item.status === status) : data;

    return sortByNewest(filteredData);
  },

  /**
   * Update layanan
   */
  async update(id: string, data: UpdateLayananDto): Promise<void> {
    await updateDocument(COLLECTIONS.LAYANAN, id, {
      ...data,
      updatedAt: new Date(),
      processedAt: new Date(),
    });
  },

  /**
   * Update status layanan
   */
  async updateStatus(
    id: string,
    status: LayananStatus,
    processedBy: string,
    catatan?: string
  ): Promise<void> {
    await updateDocument(COLLECTIONS.LAYANAN, id, {
      status,
      processedBy,
      catatan,
      updatedAt: new Date(),
      processedAt: new Date(),
    });

    await createStatusHistory({
      layananId: id,
      status,
      changedBy: processedBy,
      catatan,
    });
  },
};
