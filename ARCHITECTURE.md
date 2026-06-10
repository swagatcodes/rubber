# Architecture Documentation

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser                           │
│  (React Components, Next.js App Router)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP(S)
                     │
┌─────────────────────────────────────────────────────────────┐
│              Next.js Server (App Router)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          API Routes (handlers)                       │  │
│  │  /api/auth/* → Authentication                        │  │
│  │  /api/users/* → User Management                      │  │
│  │  /api/products/* → Product Management                │  │
│  │  /api/admin/* → Admin Functions                      │  │
│  └────────────┬─────────────────────────────────────────┘  │
│               │                                             │
│  ┌────────────▼─────────────────────────────────────────┐  │
│  │          Middleware                                  │  │
│  │  - Authentication Check                              │  │
│  │  - Role-Based Access Control                         │  │
│  │  - Security Headers                                  │  │
│  └────────────┬─────────────────────────────────────────┘  │
│               │                                             │
│  ┌────────────▼─────────────────────────────────────────┐  │
│  │          Business Logic                              │  │
│  │  - Service Layer                                     │  │
│  │  - Validation (Zod)                                  │  │
│  │  - Error Handling                                    │  │
│  └────────────┬─────────────────────────────────────────┘  │
│               │                                             │
└───────────────┼─────────────────────────────────────────────┘
                │
                │ Prisma ORM
                │
┌───────────────▼─────────────────────────────────────────────┐
│          PostgreSQL Database                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Tables:                                               │  │
│  │ - users, profiles, accounts                          │  │
│  │ - products, orders, order_items                      │  │
│  │ - activity_logs, verification_tokens                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Directory Structure

### /src/app - Routes and Pages
```
app/
├── (auth)/              # Auth routes group
│   ├── login/
│   ├── signup/
│   ├── forgot-password/
│   └── reset-password/
├── api/                 # API routes
│   ├── auth/           # Authentication API
│   ├── users/          # User API
│   ├── products/       # Product API
│   └── admin/          # Admin API
├── dashboard/          # User dashboard
│   ├── layout.tsx      # Dashboard wrapper
│   ├── page.tsx        # Dashboard home
│   ├── profile/        # Profile management
│   ├── products/       # Product management
│   └── orders/         # Order management
├── admin/              # Admin panel
│   ├── layout.tsx      # Admin wrapper
│   ├── users/          # User management
│   └── analytics/      # Analytics page
├── layout.tsx          # Root layout
├── globals.css         # Global styles
└── page.tsx            # Home page
```

### /src/lib - Utilities and Config
```
lib/
├── auth.ts             # NextAuth configuration
├── auth-utils.ts       # Auth utilities (hash, validate, etc)
├── prisma.ts           # Prisma client singleton
├── session.ts          # Session utilities
├── email.ts            # Email service
├── api-utils.ts        # API utilities
└── middleware.ts       # Next.js middleware
```

### /src/components - Reusable Components
```
components/
├── Navbar.tsx          # Top navigation
├── Sidebar.tsx         # Dashboard sidebar
├── Providers.tsx       # App providers (NextAuth, Theme)
└── [other components]
```

### /src/types - TypeScript Types
```
types/
├── index.ts            # Main types
└── next-auth.d.ts      # NextAuth type extensions
```

### /src/store - State Management
```
store/
└── index.ts            # Zustand stores
```

### /prisma - Database
```
prisma/
├── schema.prisma       # Database schema
└── seed.ts             # Database seeding
```

## 🔄 Data Flow

### Authentication Flow
```
User Input
    ↓
Form Validation
    ↓
API Route (/api/auth/*)
    ↓
Credential Verification
    ↓
Hash Password (bcrypt)
    ↓
Database Mutation
    ↓
JWT Session Creation
    ↓
Secure Cookie Set
    ↓
Redirect to Dashboard
```

### Product Creation Flow
```
User Input
    ↓
Zod Validation
    ↓
API Route (/api/products)
    ↓
Auth Check
    ↓
Business Logic
    ↓
Prisma Create
    ↓
Database Write
    ↓
Response to Client
    ↓
State Update
    ↓
UI Re-render
```

## 🔐 Security Layers

### 1. Input Validation
- Frontend: Real-time validation
- Backend: Zod schema validation
- Database: Column constraints

### 2. Authentication
- Email/Password: bcrypt hashing
- Sessions: JWT with secure cookies
- Token Verification: Every protected route

### 3. Authorization
- Role-based access control
- Middleware checks
- API endpoint guards

### 4. Data Protection
- Parameterized queries (Prisma)
- CORS configuration
- CSRF tokens
- Secure headers

### 5. Encryption
- Passwords: bcrypt (10 rounds)
- Sessions: JWT signed
- Transport: HTTPS

## 📊 Database Schema

### User Management
```
User ──── Profile
 │
 ├── Account (OAuth)
 ├── Session
 └── ActivityLog
```

### E-commerce
```
Order ──── OrderItem ──── Product ──── User
```

### Authentication
```
VerificationToken (email, password-reset)
```

## 🎯 API Structure

### Request/Response Pattern
```typescript
Request: {
  method: string,
  headers: { "Content-Type": "application/json" },
  body: ValidatedData
}

Response: {
  success: boolean,
  data?: T,
  error?: string,
  message?: string,
  pagination?: { total, page, limit, pages }
}
```

### Error Handling
```
400 Bad Request → Validation error
401 Unauthorized → Auth required
403 Forbidden → Insufficient permissions
404 Not Found → Resource not found
500 Server Error → Internal error
```

## 🧩 Component Architecture

### Page Components
- Connected to sessions
- Fetch data on mount
- Handle loading/error states
- Render content or forms

### Form Components
- Controlled inputs
- Real-time validation
- Error display
- Loading state

### Layout Components
- Session check
- Route protection
- Navigation rendering
- Context providers

## 🔄 State Management

### Zustand Stores
```typescript
useThemeStore    // Theme persistence
useUIStore       // UI state (sidebar, menu)
```

### Server State
```typescript
getServerSession()  // Session management
getServerSide()     // Data fetching
```

### Client State
```typescript
useState()          // Local state
useContext()        // Context API
useSearchParams()   // URL params
```

## 🚀 Performance Optimization

### Frontend
- Code splitting (Next.js)
- Image optimization
- Lazy loading components
- CSS-in-JS with Tailwind
- Dark mode CSS variables

### Backend
- Database indexing
- Query optimization
- Connection pooling
- Response caching
- Compression

### Network
- HTTP/2
- Gzip compression
- CDN ready
- Caching headers
- Minimal bundle size

## 📝 Development Workflow

### Feature Development
1. Update schema (if needed)
2. Run migration: `npm run prisma:migrate`
3. Create API route
4. Create UI component
5. Add types
6. Test feature
7. Commit

### Code Review Checklist
- Types are correct
- Error handling is present
- Security is considered
- Performance is acceptable
- Tests pass
- Documentation is updated

---

For implementation details, see specific files.
