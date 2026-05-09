# SI-WARGA - Architecture Documentation

## 📁 Struktur Project

Proyek SI-WARGA menggunakan **Feature-Based Modular Architecture** dengan pemisahan concerns yang jelas.

### Prinsip Arsitektur

1. **Domain-Driven Design**: Setiap feature memiliki domain logic sendiri
2. **Separation of Concerns**: Pemisahan UI, business logic, dan data layer
3. **Scalability**: Mudah menambah feature baru tanpa mengubah struktur existing
4. **Maintainability**: Code organization yang jelas dan konsisten

---

## 🏗️ Layer Architecture

### 1. Presentation Layer (`app/`, `components/`)
- **App Router**: Route-based pages dengan route groups
- **Components**: Reusable UI components
- **Layouts**: Shared layouts untuk route groups

### 2. Feature Layer (`features/`)
- **Modular Features**: Setiap feature adalah module independen
- **Feature Structure**:
  - `components/`: Feature-specific components
  - `hooks/`: Feature-specific React hooks
  - `services/`: Business logic & API calls
  - `types/`: Feature-specific TypeScript types

### 3. Core Layer (`lib/`, `services/`)
- **Firebase Integration**: Centralized Firebase setup
- **Shared Services**: Cross-feature services
- **Utilities**: Helper functions

### 4. Domain Layer (`types/`)
- **Models**: Domain entities
- **Enums**: Application-wide enumerations
- **Types**: Shared TypeScript types

---

## 📂 Folder Structure Explanation

### `/src/app` - Next.js App Router
```
app/
├── (auth)/          # Auth route group (no shared layout)
├── (admin)/         # Admin route group (admin layout)
├── (warga)/         # Warga route group (warga layout)
└── api/             # API routes
```

**Route Groups** menggunakan `()` untuk grouping tanpa mempengaruhi URL path.

### `/src/features` - Feature Modules
```
features/
├── auth/            # Authentication feature
├── layanan/         # Service request feature
├── dokumen/         # Document management
├── tracking/        # Status tracking
└── admin/           # Admin-specific features
```

Setiap feature adalah **self-contained module** dengan struktur:
- `components/`: UI components
- `hooks/`: Custom hooks
- `services/`: Business logic
- `types/`: Type definitions
- `index.ts`: Public API exports

### `/src/lib` - Core Libraries
```
lib/
├── firebase/        # Firebase configuration & helpers
├── validators/      # Input validation
└── utils/           # Utility functions
```

### `/src/types` - Domain Models
```
types/
├── models/          # Domain entities (User, Layanan, Dokumen)
├── enums/           # Enumerations (Status, Role)
└── index.ts         # Type exports
```

---

## 🔥 Firebase Architecture

### Collections Structure
```
Firestore:
├── users/           # User profiles
├── layanan/         # Service requests
└── dokumen/         # Documents
```

### Firebase Services
- **config.ts**: Firebase initialization (singleton)
- **auth.ts**: Authentication helpers
- **firestore.ts**: Generic CRUD operations

---

## 🎯 Feature Development Pattern

### Menambah Feature Baru

1. **Create feature folder**:
   ```
   features/new-feature/
   ├── components/
   ├── hooks/
   ├── services/
   ├── types/
   └── index.ts
   ```

2. **Define types** (`types/new-feature.types.ts`)
3. **Create service** (`services/newFeatureService.ts`)
4. **Create hooks** (`hooks/useNewFeature.ts`)
5. **Create components** (`components/NewFeatureComponent.tsx`)
6. **Export public API** (`index.ts`)

### Import Pattern
```typescript
// ✅ Good: Import from feature index
import { useAuth, authService } from '@/features/auth';

// ❌ Bad: Direct import from internal files
import { useAuth } from '@/features/auth/hooks/useAuth';
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Backend**: Firebase (Auth + Firestore)
- **State Management**: React Hooks
- **UI Components**: Custom components with clsx

---

## 📝 Naming Conventions

### Files
- **Components**: PascalCase (`Button.tsx`, `UserCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`, `useLayanan.ts`)
- **Services**: camelCase with `Service` suffix (`authService.ts`)
- **Types**: camelCase with `.types.ts` suffix (`auth.types.ts`)
- **Models**: camelCase with `.model.ts` suffix (`user.model.ts`)

### Folders
- **Features**: lowercase (`auth/`, `layanan/`)
- **Components**: lowercase (`ui/`, `layout/`)
- **Route Groups**: lowercase with parentheses (`(auth)/`, `(admin)/`)

---

## 🚀 Development Workflow

1. **Setup Environment**:
   ```bash
   cp .env.example .env.local
   # Fill in Firebase credentials
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📊 Path Aliases

```typescript
@/*           → src/*
@/app/*       → src/app/*
@/components/* → src/components/*
@/features/*  → src/features/*
@/lib/*       → src/lib/*
@/types/*     → src/types/*
@/utils/*     → src/utils/*
@/config/*    → src/config/*
```

---

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env.local`
2. **Firebase Rules**: Setup Firestore security rules
3. **Authentication**: Always check auth state before rendering protected pages
4. **Validation**: Validate all user inputs

---

## 📈 Scalability Considerations

1. **Feature Isolation**: Each feature is independent
2. **Code Splitting**: Next.js automatic code splitting
3. **Lazy Loading**: Dynamic imports for heavy components
4. **Caching**: Firebase caching for offline support

---

## 🧪 Testing Strategy (Future)

- **Unit Tests**: Feature services & utilities
- **Integration Tests**: Firebase operations
- **E2E Tests**: Critical user flows
- **Component Tests**: UI components

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
