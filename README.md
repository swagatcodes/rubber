# Premium App - Production-Ready Full-Stack Application

A complete, production-ready web application built with modern technologies. Perfect for learning, scaling, and deploying real-world applications.

## 🚀 Features

### Core Authentication
- ✅ Email/Password Sign Up with validation
- ✅ Secure Sign In with password hashing
- ✅ Email verification system
- ✅ Password reset functionality
- ✅ Session management with NextAuth.js
- ✅ Protected routes and middleware

### User Management
- ✅ User profiles with customization
- ✅ Role-based access control (ADMIN, MODERATOR, USER)
- ✅ Activity logging
- ✅ Account settings & security

### Product Management
- ✅ Create, update, delete products
- ✅ Product categories and filtering
- ✅ Inventory management
- ✅ Product ratings and reviews
- ✅ Featured products

### Orders & Commerce
- ✅ Shopping cart functionality
- ✅ Order creation and management
- ✅ Order status tracking
- ✅ Order history
- ✅ Order analytics

### Admin Dashboard
- ✅ User management
- ✅ Platform analytics
- ✅ Revenue tracking
- ✅ User statistics
- ✅ Recent orders

### Frontend
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Dark mode and light mode
- ✅ Smooth animations with Framer Motion
- ✅ Loading states and skeletons
- ✅ Toast notifications
- ✅ Mobile-optimized design
- ✅ Accessibility compliant

### Backend
- ✅ REST API with Next.js App Router
- ✅ TypeScript throughout
- ✅ Input validation with Zod
- ✅ Error handling
- ✅ CORS and security headers
- ✅ Rate limiting ready
- ✅ Logging system

### Database
- ✅ PostgreSQL with Prisma ORM
- ✅ Relational schema design
- ✅ Migration support
- ✅ Database seeding
- ✅ Optimized queries

### Security
- ✅ Password hashing with bcrypt
- ✅ JWT sessions
- ✅ CSRF protection
- ✅ XSS protection
- ✅ SQL injection protection
- ✅ Secure headers
- ✅ Environment variables

## 📋 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Dark mode support
- **Backend**: Next.js App Router, NextAuth.js
- **Database**: PostgreSQL, Prisma ORM
- **State**: Zustand for client-side state
- **Validation**: Zod for schemas
- **Animation**: Framer Motion
- **UI Components**: Lucide React icons
- **Notifications**: React Hot Toast

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

### Installation

1. **Navigate to project directory**
   ```bash
   cd premium-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure .env.local**
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/premium_app"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-a-random-secret-here"

   # Email (Optional - for production)
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="noreply@yourdomain.com"

   # OAuth (Optional)
   GOOGLE_ID="your-google-id"
   GOOGLE_SECRET="your-google-secret"
   GITHUB_ID="your-github-id"
   GITHUB_SECRET="your-github-secret"
   ```

5. **Setup Database**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Create database and run migrations
   npm run prisma:push

   # Seed database with sample data
   npm run prisma:seed
   ```

6. **Run Development Server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`

### Default Credentials

After seeding, you can login with:

**Admin Account**
- Email: `admin@example.com`
- Password: `Admin123!`

**User Account**
- Email: `john@example.com`
- Password: `User123!`

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # User dashboard
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
│   ├── auth.ts            # NextAuth configuration
│   ├── auth-utils.ts      # Auth utilities
│   ├── prisma.ts          # Prisma client
│   └── email.ts           # Email service
├── types/                 # TypeScript types
├── store/                 # Zustand stores
├── middleware.ts          # Next.js middleware
└── globals.css            # Global styles

prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Database seeding
```

## 🔒 Security Best Practices Implemented

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT-based session management
- ✅ Secure HTTP-only cookies
- ✅ CSRF tokens
- ✅ XSS protection via Content Security Policy
- ✅ SQL injection prevention (ORM)
- ✅ Rate limiting ready
- ✅ Environment variable validation
- ✅ HTTPS ready
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ Login attempt tracking
- ✅ Account lockout after failed attempts

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `GET /api/auth/verify-email` - Verify email
- `POST /api/auth/password` - Password reset request
- `PUT /api/auth/password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/password` - Change password
- `GET /api/users/activity` - Get activity log

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get product
- `PATCH /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/products/orders` - Get user orders
- `POST /api/products/orders` - Create order

### Admin
- `GET /api/admin/users` - List users
- `GET /api/admin/users/[id]` - Get user
- `PATCH /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Delete user
- `GET /api/admin/analytics` - Get analytics

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Docker

```bash
docker build -t premium-app .
docker run -p 3000:3000 premium-app
```

### Manual (VPS/Server)

```bash
npm run build
npm run start
```

### Environment for Production

```env
DATABASE_URL="postgresql://prod-user:strong-password@prod-db:5432/premium_app_prod"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="use-a-secure-random-string"
NODE_ENV="production"
```

## 📊 Database Schema

The application includes comprehensive database models:

- **User**: User accounts with roles
- **Account**: OAuth provider accounts
- **Session**: Session management
- **Profile**: Extended user profiles
- **Product**: Product listings
- **Order**: Order management
- **OrderItem**: Individual order items
- **ActivityLog**: User action logging
- **VerificationToken**: Email & password reset tokens

## 🔧 Available Scripts

```bash
# Development
npm run dev           # Start dev server
npm run lint          # Run ESLint

# Production
npm run build         # Build for production
npm run start         # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:push      # Push schema to database
npm run prisma:seed      # Seed database
```

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop enhanced
- ✅ Touch-friendly interfaces
- ✅ Accessible color contrasts
- ✅ Readable typography

## ♿ Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast compliance

## 📈 Performance

- ✅ Next.js optimization
- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Caching strategies
- ✅ Database query optimization

## 🐛 Debugging

Enable debug mode:
```env
DEBUG=app:*
```

Check logs:
```bash
npm run dev 2>&1 | grep ERROR
```

## 📝 Development Guidelines

### Creating New Features

1. Update Prisma schema if needed
2. Run migrations
3. Create API routes
4. Create UI components
5. Add types
6. Test thoroughly

### Code Style

- Use TypeScript for everything
- Follow ESLint rules
- Use functional components
- Implement error handling
- Add loading states
- Use proper typing

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## 📄 License

MIT License - feel free to use for personal and commercial projects.

## 🆘 Troubleshooting

### Database Connection Failed
- Check PostgreSQL is running
- Verify DATABASE_URL in .env.local
- Check credentials

### Port 3000 Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### Email Not Sending
- Check EMAIL_SERVER_* variables
- Verify SMTP credentials
- Check email provider settings

### Build Errors
```bash
npm run prisma:generate
npm install
npm run build
```

## 📞 Support

For issues and questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with details

## 🎓 Learning Resources

This project demonstrates:
- Modern Next.js patterns
- Authentication best practices
- Database design
- API design
- Security considerations
- TypeScript best practices
- React component patterns
- State management
- Error handling
- Testing strategies

Perfect for learning or using as a starter template for your projects!

---

**Made with ❤️ for developers everywhere**
