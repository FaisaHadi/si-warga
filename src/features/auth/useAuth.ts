'use client';

import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { getDocumentById, onAuthChange } from '@/lib/firebase';
import { User } from '@/types';

export const useAuth = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (fbUser) => {
      setFirebaseUser(fbUser);
      
      if (fbUser) {
        const userData = await getDocumentById<User>('users', fbUser.uid);
        setUser(userData);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    firebaseUser,
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };
};
