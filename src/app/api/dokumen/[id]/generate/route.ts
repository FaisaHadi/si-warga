export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const layanan = body.layanan as Record<string, unknown> | undefined;
  const dataLengkap = layanan?.dataLengkap as Record<string, unknown> | undefined;
  const jenisLayanan = typeof layanan?.jenisLayanan === 'string' ? layanan.jenisLayanan : 'layanan';
  const nama = typeof dataLengkap?.nama === 'string' ? dataLengkap.nama : 'Warga';
  const nik = typeof dataLengkap?.nik === 'string' ? dataLengkap.nik : '-';
  const alamat = typeof dataLengkap?.alamat === 'string' ? dataLengkap.alamat : '-';
  const keperluan = typeof layanan?.keperluan === 'string' ? layanan.keperluan : '-';
  const issuedAt = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeZone: 'Asia/Jakarta',
  }).format(new Date());
  const title = jenisLayanan
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const fileName = `${title.replace(/\s+/g, '-')}-${id}.txt`.toLowerCase();
  const content = [
    'PEMERINTAH DESA DEMO',
    'SISTEM ADMINISTRASI DIGITAL WARGA',
    '',
    title.toUpperCase(),
    `Nomor Layanan: ${id}`,
    '',
    'Yang bertanda tangan di bawah ini menerangkan bahwa:',
    `Nama       : ${nama}`,
    `NIK        : ${nik}`,
    `Alamat     : ${alamat}`,
    `Keperluan  : ${keperluan}`,
    '',
    'Dokumen ini dibuat sebagai bukti layanan administrasi digital pada prototype SI-WARGA.',
    `Diterbitkan pada ${issuedAt}.`,
    '',
    'Admin Desa',
    'SI-WARGA',
  ].join('\n');

  return Response.json(
    {
      dokumenId: id,
      status: 'generated',
      fileName,
      content,
    }
  );
}
