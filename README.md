# SI-WARGA

SI-WARGA adalah prototype Sistem Administrasi Digital Warga untuk digitalisasi workflow layanan administrasi desa. Fokus project ini adalah routing yang bersih, dashboard admin/warga, integrasi Firebase, tracking status layanan, dan generate dokumen sederhana.

## Tech Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Firebase Auth
- Firebase Firestore

## Setup Demo

1. Install dependency:

```bash
npm install
```

2. Buat `.env.local` di root project, lalu isi config Firebase Web App:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

SEED_ADMIN_EMAIL=admin@siwarga.test
SEED_ADMIN_PASSWORD=Admin12345!
SEED_WARGA_EMAIL=warga@siwarga.test
SEED_WARGA_PASSWORD=Warga12345!
```

3. Di Firebase Console, aktifkan Authentication provider `Email/Password`.

4. Jalankan seeder akun demo:

```bash
npm run seed:demo
```

5. Jalankan aplikasi:

```bash
npm run dev
```

## Akun Demo

| Role | Email | Password | Route |
| --- | --- | --- | --- |
| Admin | `admin@siwarga.test` | `Admin12345!` | `/admin/dashboard` |
| Warga | `warga@siwarga.test` | `Warga12345!` | `/warga/dashboard` |

## Alur Presentasi

1. Login sebagai warga.
2. Buka `/warga/layanan`, isi form pengajuan layanan.
3. Cek `/warga/tracking` untuk melihat status layanan.
4. Login sebagai admin.
5. Buka `/admin/verifikasi`, proses pengajuan warga.
6. Klik `Generate` untuk membuat dokumen sederhana.
7. Buka `/admin/dokumen` untuk melihat dan mengunduh dokumen.
8. Login kembali sebagai warga untuk melihat layanan selesai di `/warga/riwayat`.

## Route Utama

- `/login`
- `/register`
- `/warga/dashboard`
- `/warga/layanan`
- `/warga/tracking`
- `/warga/riwayat`
- `/admin/dashboard`
- `/admin/verifikasi`
- `/admin/dokumen`
- `/admin/laporan`

## Firestore Security Rules

Rules prototype tersedia di `firestore.rules`. Untuk demo lokal, jalankan seed akun admin terlebih dahulu sebelum menerapkan rules ketat. Setelah akun admin ada, salin isi file tersebut ke Firebase Console:

`Firestore Database` -> `Rules` -> paste isi `firestore.rules` -> `Publish`.

Rules membatasi:

- Admin hanya dapat masuk dashboard admin jika profile Firestore punya `role: "admin"`.
- Warga hanya membaca layanan miliknya sendiri.
- Update status layanan dan pembuatan dokumen hanya untuk admin.
- Register client hanya boleh membuat profile `role: "warga"`.

## Script Validasi

```bash
npm run lint
npx tsc --noEmit --pretty false
npm run build
```

## Catatan Prototype

- Generate dokumen saat ini berupa file `.txt` sederhana berbasis data layanan.
- Data dashboard terhubung ke Firestore dan masih cocok untuk skala prototype akademik.
- Firebase Admin SDK belum digunakan; route handler disiapkan sebagai boundary awal untuk pengembangan server-side berikutnya.
