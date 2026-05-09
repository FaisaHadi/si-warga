# SI-WARGA - Quick Start Guide

## 🚀 Setup Development Environment

### 1. Prerequisites
- Node.js 18+ installed
- Firebase account
- Git

### 2. Clone & Install
```bash
cd si-warga
npm install
```

### 3. Firebase Setup

#### A. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project: "si-warga"
3. Enable Authentication → Email/Password
4. Create Firestore Database (Start in test mode)

#### B. Get Firebase Credentials
1. Project Settings → General
2. Scroll to "Your apps" → Web app
3. Copy configuration

#### C. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure Overview

```
src/
├── app/                    # Pages & Routes
│   ├── (auth)/            # Login, Register
│   ├── (admin)/           # Admin Dashboard
│   ├── (warga)/           # Citizen Portal
│   └── api/               # API Routes
│
├── features/              # Feature Modules
│   ├── auth/             # Authentication
│   ├── layanan/          # Service Requests
│   ├── dokumen/          # Documents
│   ├── tracking/         # Status Tracking
│   └── admin/            # Admin Features
│
├── components/           # Shared Components
│   ├── ui/              # Button, Card, etc
│   ├── layout/          # Header, Sidebar
│   └── common/          # Loading, Error
│
├── lib/                 # Core Libraries
│   └── firebase/        # Firebase Setup
│
├── types/               # TypeScript Types
│   ├── models/         # Domain Models
│   └── enums/          # Enumerations
│
└── utils/              # Utilities
```

---

## 🎯 Development Workflow

### Creating New Feature

1. **Create feature folder**:
```bash
mkdir -p src/features/new-feature/{components,hooks,services,types}
```

2. **Define types** (`types/new-feature.types.ts`):
```typescript
export interface NewFeature {
  id: string;
  name: string;
}
```

3. **Create service** (`services/newFeatureService.ts`):
```typescript
import { createDocument, getDocumentById } from '@/lib/firebase';

export const newFeatureService = {
  async create(data: any) {
    return createDocument('collection', data);
  },
};
```

4. **Create hook** (`hooks/useNewFeature.ts`):
```typescript
'use client';
import { useState, useEffect } from 'react';

export const useNewFeature = () => {
  const [data, setData] = useState(null);
  // ... logic
  return { data };
};
```

5. **Export** (`index.ts`):
```typescript
export * from './services/newFeatureService';
export * from './hooks/useNewFeature';
```

### Creating New Page

1. **Create page file**:
```bash
# For warga route
src/app/(warga)/new-page/page.tsx

# For admin route
src/app/(admin)/new-page/page.tsx
```

2. **Page template**:
```typescript
'use client';

export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}
```

---

## 🔥 Firebase Collections

### Users Collection
```typescript
{
  id: string;
  email: string;
  nama: string;
  nik: string;
  role: 'admin' | 'warga';
  createdAt: Date;
}
```

### Layanan Collection
```typescript
{
  id: string;
  userId: string;
  jenisLayanan: string;
  status: 'pending' | 'diproses' | 'selesai' | 'ditolak';
  createdAt: Date;
}
```

### Dokumen Collection
```typescript
{
  id: string;
  layananId: string;
  url: string;
  createdAt: Date;
}
```

---

## 🛠️ Common Tasks

### Add New Component
```bash
# Create component file
src/components/ui/NewComponent.tsx

# Export in index
src/components/ui/index.ts
```

### Add New Utility
```bash
# Create utility file
src/utils/newUtil.ts

# Export in index
src/utils/index.ts
```

### Add New Type
```bash
# Create type file
src/types/models/new.model.ts

# Export in index
src/types/models/index.ts
```

---

## 📝 Code Examples

### Using Auth
```typescript
'use client';
import { useAuth } from '@/features/auth';

export default function Page() {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;
  
  return <div>Welcome {user?.nama}</div>;
}
```

### Creating Layanan
```typescript
import { layananService } from '@/features/layanan';

const handleSubmit = async (data) => {
  const id = await layananService.create(userId, data);
  console.log('Created:', id);
};
```

### Fetching Data
```typescript
'use client';
import { useLayanan } from '@/features/layanan';

export default function Page() {
  const { layanan, loading } = useLayanan(userId);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {layanan.map(item => (
        <div key={item.id}>{item.jenisLayanan}</div>
      ))}
    </div>
  );
}
```

---

## 🎨 Styling with Tailwind

```typescript
// Using utility classes
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Content
</div>

// Using clsx for conditional classes
import clsx from 'clsx';

<div className={clsx(
  'p-4 rounded',
  isActive && 'bg-blue-500',
  !isActive && 'bg-gray-200'
)}>
  Content
</div>
```

---

## 🐛 Debugging

### Check Firebase Connection
```typescript
import { initializeFirebase } from '@/lib/firebase';

// In component
useEffect(() => {
  const { app } = initializeFirebase();
  console.log('Firebase initialized:', app.name);
}, []);
```

### Check Auth State
```typescript
import { useAuth } from '@/features/auth';

const { user, firebaseUser } = useAuth();
console.log('User:', user);
console.log('Firebase User:', firebaseUser);
```

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🆘 Troubleshooting

### Firebase not initialized
- Check `.env.local` file exists
- Verify all Firebase credentials are correct
- Restart dev server after changing env variables

### Import errors
- Check path aliases in `tsconfig.json`
- Verify file exports in `index.ts`
- Restart TypeScript server in IDE

### Build errors
- Run `npm run build` to check for errors
- Fix TypeScript errors
- Check for missing dependencies

---

## ✅ Checklist Before Development

- [ ] Firebase project created
- [ ] `.env.local` configured
- [ ] Dependencies installed
- [ ] Dev server running
- [ ] Can access http://localhost:3000
- [ ] Read ARCHITECTURE.md
- [ ] Understand folder structure

**Happy Coding! 🚀**
