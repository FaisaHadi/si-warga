import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  query,
  QueryConstraint,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';
import { getFirebaseDb } from './config';

const getCollection = (collectionName: string): CollectionReference => {
  const db = getFirebaseDb();
  return collection(db, collectionName);
};

/**
 * Get document by ID
 */
export const getDocumentById = async <T = DocumentData>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  const db = getFirebaseDb();
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
};

/**
 * Get all documents from collection
 */
export const getAllDocuments = async <T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  const collectionRef = getCollection(collectionName);
  const q = query(collectionRef, ...constraints);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
};

/**
 * Create new document
 */
export const createDocument = async <T = DocumentData>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<string> => {
  const collectionRef = getCollection(collectionName);
  const docRef = await addDoc(collectionRef, data as DocumentData);
  return docRef.id;
};

/**
 * Create or replace document with explicit ID
 */
export const setDocument = async <T = DocumentData>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> => {
  const db = getFirebaseDb();
  const docRef = doc(db, collectionName, docId);
  await setDoc(docRef, data as DocumentData);
};

/**
 * Update document
 */
export const updateDocument = async <T = DocumentData>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  const db = getFirebaseDb();
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data as DocumentData);
};
