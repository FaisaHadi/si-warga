/**
 * User Model
 * Domain model untuk user/warga
 */

import { UserRole } from '../enums';

export interface User {
  id: string;
  email: string;
  nama: string;
  nik: string;
  noTelepon: string;
  alamat: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  nama: string;
  nik: string;
  noTelepon: string;
  alamat: string;
  role: UserRole;
}
