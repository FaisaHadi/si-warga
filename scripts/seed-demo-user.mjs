import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const loadEnvFile = () => {
  for (const fileName of ['.env.local', '.env']) {
    const filePath = resolve(process.cwd(), fileName);

    if (!existsSync(filePath)) continue;

    const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^['"]|['"]$/g, '');

      process.env[key] ??= value;
    }
  }
};

const requiredEnv = (key) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing Firebase env: ${key}. Isi .env.local terlebih dahulu.`);
  }

  if (value.startsWith('your_')) {
    throw new Error(`Firebase env ${key} masih placeholder. Ganti nilainya di .env.local dengan config Firebase asli.`);
  }

  return value;
};

const getFirebaseConfig = () => ({
  apiKey: requiredEnv('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: requiredEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: requiredEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: requiredEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: requiredEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: requiredEnv('NEXT_PUBLIC_FIREBASE_APP_ID'),
});

const createOrLoginUser = async (auth, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { userCredential, authStatus: 'created' };
  } catch (error) {
    if (error?.code !== 'auth/email-already-in-use') {
      throw error;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { userCredential, authStatus: 'existing' };
    } catch {
      throw new Error(
        `Akun ${email} sudah ada di Firebase Auth, tetapi password seed tidak cocok. ` +
          'Ubah password seed atau reset password akun tersebut di Firebase Console.'
      );
    }
  }
};

const seedProfile = async (db, uid, profile) => {
  const userRef = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userRef);
  const now = new Date();

  await setDoc(
    userRef,
    {
      ...profile,
      id: uid,
      createdAt: userSnapshot.exists() ? userSnapshot.data().createdAt ?? now : now,
      updatedAt: now,
    },
    { merge: true }
  );
};

const seedAccount = async (auth, db, account) => {
  const { userCredential, authStatus } = await createOrLoginUser(auth, account.email, account.password);
  const uid = userCredential.user.uid;

  await seedProfile(db, uid, account.profile);
  await signOut(auth);

  return { uid, authStatus };
};

const seedDemoUsers = async () => {
  loadEnvFile();

  const app = initializeApp(getFirebaseConfig());
  const auth = getAuth(app);
  const db = getFirestore(app);

  const accounts = [
    {
      label: 'Admin Demo',
      email: process.env.SEED_ADMIN_EMAIL || 'admin@siwarga.test',
      password: process.env.SEED_ADMIN_PASSWORD || 'Admin12345!',
      profile: {
        email: process.env.SEED_ADMIN_EMAIL || 'admin@siwarga.test',
        nama: 'Admin Demo SI-WARGA',
        nik: '0000000000000000',
        noTelepon: '080000000000',
        alamat: 'Kantor Desa Demo',
        role: 'admin',
      },
    },
    {
      label: 'Warga Demo',
      email: process.env.SEED_WARGA_EMAIL || 'warga@siwarga.test',
      password: process.env.SEED_WARGA_PASSWORD || 'Warga12345!',
      profile: {
        email: process.env.SEED_WARGA_EMAIL || 'warga@siwarga.test',
        nama: 'Warga Demo SI-WARGA',
        nik: '3200000000000001',
        noTelepon: '081234567890',
        alamat: 'Dusun Demo RT 01/RW 02',
        role: 'warga',
      },
    },
  ];

  console.log('Seeding demo accounts...');

  for (const account of accounts) {
    const { uid, authStatus } = await seedAccount(auth, db, account);
    console.log('');
    console.log(`${account.label} ready.`);
    console.log(`Auth status : ${authStatus}`);
    console.log(`Email       : ${account.email}`);
    console.log(`Password    : ${account.password}`);
    console.log(`Role        : ${account.profile.role}`);
    console.log(`UID         : ${uid}`);
  }

  console.log('');
  console.log('Demo accounts ready. Admin masuk ke /admin/dashboard, warga masuk ke /warga/dashboard.');
};

seedDemoUsers().catch((error) => {
  console.error('Failed to seed demo accounts.');
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
