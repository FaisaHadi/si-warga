import { createDocument, updateDocument } from '@/lib/firebase';
import { Dokumen, Layanan, LayananStatus } from '@/types';
import { COLLECTIONS } from '@/utils';
import { layananService } from '@/features/layanan';

interface GeneratedDocumentResponse {
  dokumenId: string;
  fileName: string;
  content: string;
}

const toDataUrl = (content: string) => {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
};

export const dokumenService = {
  async generateFromLayanan(layanan: Layanan, createdBy: string) {
    const response = await fetch(`/api/dokumen/${layanan.id}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ layanan }),
    });

    if (!response.ok) {
      throw new Error('Gagal membuat dokumen layanan.');
    }

    const generated = (await response.json()) as GeneratedDocumentResponse;
    const url = toDataUrl(generated.content);
    const dokumenId = await createDocument<Dokumen>(COLLECTIONS.DOKUMEN, {
      layananId: layanan.id,
      userId: layanan.userId,
      nama: generated.fileName,
      url,
      type: 'text/plain',
      size: new TextEncoder().encode(generated.content).length,
      createdAt: new Date(),
      createdBy,
    });

    await layananService.updateStatus(
      layanan.id,
      LayananStatus.SELESAI,
      createdBy,
      'Dokumen digital berhasil dibuat.'
    );
    await updateDocument<Layanan>(COLLECTIONS.LAYANAN, layanan.id, {
      dokumenUrl: url,
      updatedAt: new Date(),
    });

    return {
      id: dokumenId,
      url,
      ...generated,
    };
  },
};
