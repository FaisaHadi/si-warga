import { layananService } from '@/features/layanan';
import { JenisLayanan, LayananStatus } from '@/types';

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const isLayananStatus = (value: string | null): value is LayananStatus => {
  return !!value && Object.values(LayananStatus).includes(value as LayananStatus);
};

const isJenisLayanan = (value: unknown): value is JenisLayanan => {
  return typeof value === 'string' && Object.values(JenisLayanan).includes(value as JenisLayanan);
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawStatus = searchParams.get('status');
    const status = isLayananStatus(rawStatus) ? rawStatus : undefined;
    const data = await layananService.getAll(status);

    return Response.json({ data });
  } catch {
    return Response.json(
      { message: 'Gagal mengambil data layanan.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { userId, jenisLayanan, keperluan, dataLengkap } = body;

    if (
      typeof userId !== 'string' ||
      !isJenisLayanan(jenisLayanan) ||
      typeof keperluan !== 'string' ||
      !isRecord(dataLengkap)
    ) {
      return Response.json(
        { message: 'Payload pengajuan layanan tidak valid.' },
        { status: 400 }
      );
    }

    const id = await layananService.create(userId, {
      jenisLayanan,
      keperluan,
      dataLengkap,
    });

    return Response.json({ id }, { status: 201 });
  } catch {
    return Response.json(
      { message: 'Gagal memproses pengajuan layanan.' },
      { status: 500 }
    );
  }
}
