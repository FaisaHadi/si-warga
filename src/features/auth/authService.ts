import {
  loginWithEmail,
  registerWithEmail,
  logout,
  getDocumentById,
  setDocument,
} from '@/lib/firebase';
import { CreateUserDto, User } from '@/types';

/**
 * Login user
 */
export const authService = {
  async login(email: string, password: string) {
    const userCredential = await loginWithEmail(email, password);
    const user = await getDocumentById<User>('users', userCredential.user.uid);
    return { userCredential, user };
  },

  async register(data: CreateUserDto) {
    const { email, password, ...userData } = data;
    
    // Create auth user
    const userCredential = await registerWithEmail(email, password);
    
    // Create user document
    const userId = userCredential.user.uid;
    await setDocument<User>('users', userId, {
      ...userData,
      id: userId,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await getDocumentById<User>('users', userId);
    return { userCredential, user };
  },

  async logout() {
    await logout();
  },
};
