# Quick Start Guide

## ⚡ Get Running in 5 Minutes

### 1. Clone and Install
```bash
cd premium-app
npm install
```

### 2. Setup Database
```bash
# Create .env.local
cp .env.example .env.local

# Edit .env.local with your database URL
# DATABASE_URL="postgresql://user:password@localhost:5432/premium_app"

# Setup database
npm run prisma:push
npm run prisma:seed
```

### 3. Generate NextAuth Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add this to `.env.local` as `NEXTAUTH_SECRET`

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📝 Test Accounts

**Admin**
- Email: `admin@example.com`
- Password: `Admin123!`

**User**
- Email: `john@example.com`
- Password: `User123!`

## 🚀 Key Pages

- Home: `http://localhost:3000`
- Login: `http://localhost:3000/auth/login`
- Signup: `http://localhost:3000/auth/signup`
- Dashboard: `http://localhost:3000/dashboard`
- Admin Panel: `http://localhost:3000/admin`

## 🔧 Common Tasks

### Add a New API Route
```typescript
// src/app/api/[feature]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Your logic here
}
```

### Add a New Page
```typescript
// src/app/dashboard/[feature]/page.tsx
"use client";

import { useSession } from "next-auth/react";

export default function FeaturePage() {
  const { data: session } = useSession();
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold">Feature</h1>
      {/* Your content */}
    </div>
  );
}
```

### Database Migration
```bash
# Make changes to prisma/schema.prisma
npm run prisma:migrate
```

### Update Database
```bash
npm run prisma:push
```

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🐛 Debugging

Check database:
```bash
npx prisma studio
```

Check logs:
```bash
npm run dev
```

## 📊 Admin Dashboard Features

- User analytics
- Revenue tracking
- Recent orders
- Top products
- User management
- System statistics

## 🔐 Security Checklist

- [ ] Change `NEXTAUTH_SECRET`
- [ ] Update `NEXTAUTH_URL` for your domain
- [ ] Configure email service
- [ ] Set up SSL/HTTPS
- [ ] Update security headers
- [ ] Enable rate limiting
- [ ] Setup monitoring
- [ ] Regular backups

## 💡 Tips

1. Use Prisma Studio to visualize data: `npx prisma studio`
2. Check TypeScript errors: `npm run build`
3. Run linting: `npm run lint`
4. Dark mode works out of the box
5. All API routes require authentication by default

## 🆘 Troubleshooting

**Port 3000 already in use**
```bash
lsof -i :3000
kill -9 <PID>
```

**Database connection error**
- Ensure PostgreSQL is running
- Verify DATABASE_URL is correct
- Check database user permissions

**NextAuth errors**
- Regenerate `NEXTAUTH_SECRET`
- Clear cookies in browser
- Check `NEXTAUTH_URL` matches your domain

**Email not sending**
- Verify EMAIL_SERVER_* variables
- Check SMTP credentials
- Enable "Less secure apps" in Gmail if using Gmail

---

For more help, see [README.md](./README.md)
