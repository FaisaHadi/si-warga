import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import { getFirebaseAuth } from './config';

/**
 * Login dengan email dan password
 */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Register user baru
 */
export const registerWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getFirebaseAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  const auth = getFirebaseAuth();
  return signOut(auth);
};

/**
 * Subscribe ke auth state changes
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
};
