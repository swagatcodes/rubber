# Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites
- Vercel account
- GitHub repository
- PostgreSQL database (Vercel Postgres or external)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select Premium App project

3. **Configure Environment**
   In Vercel dashboard, add these environment variables:
   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_URL=https://yourdomain.vercel.app
   NEXTAUTH_SECRET=<generate-new-secret>
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM=noreply@yourdomain.com
   ```

4. **Deploy**
   ```bash
   npm install -g vercel
   vercel
   ```

5. **Setup Database**
   ```bash
   vercel env pull
   npm run prisma:push
   npm run prisma:seed
   ```

### Custom Domain
1. Go to Vercel dashboard
2. Project settings → Domains
3. Add your custom domain
4. Update DNS records (follow Vercel instructions)

---

## 🐳 Deploy with Docker

### Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run
```bash
docker build -t premium-app .
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  premium-app
```

---

## 🖥️ Deploy to AWS

### Using EC2

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04 LTS
   - Instance: t3.micro or higher
   - Security group: Allow 80, 443, 3000

2. **Setup Server**
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm postgresql

   # Clone repository
   git clone <your-repo> /app/premium-app
   cd /app/premium-app

   # Install dependencies
   npm install
   npm run build

   # Setup database
   npm run prisma:push
   npm run prisma:seed
   ```

3. **Run with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "premium-app" -- start
   pm2 startup
   pm2 save
   ```

4. **Setup Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

### Using Elastic Beanstalk

```bash
eb create premium-app-env
eb deploy
eb open
```

---

## 🌐 Deploy to DigitalOcean

### App Platform

1. **Connect GitHub**
   - Go to DigitalOcean Apps
   - Select your GitHub repository

2. **Configure**
   - Build command: `npm run build`
   - Run command: `npm start`

3. **Set Environment Variables**
   Same as Vercel setup

4. **Deploy**
   ```bash
   doctl apps create --spec app.yaml
   ```

---

## 📋 Pre-Deployment Checklist

### Security
- [ ] Change `NEXTAUTH_SECRET`
- [ ] Update `NEXTAUTH_URL`
- [ ] Use strong database password
- [ ] Enable HTTPS
- [ ] Setup firewall rules
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Setup API key management

### Performance
- [ ] Run `npm run build` locally
- [ ] Check Lighthouse score
- [ ] Setup CDN for assets
- [ ] Configure caching headers
- [ ] Optimize database indexes
- [ ] Setup monitoring

### Database
- [ ] Backup strategy
- [ ] Connection pooling
- [ ] Regular backups
- [ ] Test disaster recovery
- [ ] Monitor query performance

### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Setup performance monitoring
- [ ] Setup log aggregation
- [ ] Setup uptime monitoring
- [ ] Configure alerts

---

## 🔒 Production Environment Variables

```env
NODE_ENV=production

# Database
DATABASE_URL=postgresql://prod_user:strong_password@prod_db:5432/premium_app

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<generate-secure-random-string>

# Email
EMAIL_SERVER_HOST=smtp.provider.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@yourdomain.com
EMAIL_SERVER_PASSWORD=<app-password>
EMAIL_FROM=noreply@yourdomain.com

# OAuth (if using)
GOOGLE_ID=<your-id>
GOOGLE_SECRET=<your-secret>
GITHUB_ID=<your-id>
GITHUB_SECRET=<your-secret>

# API
API_BASE_URL=https://yourdomain.com
API_TIMEOUT=10000
```

---

## 📊 Monitoring & Logging

### Recommended Tools
- **Error Tracking**: Sentry
- **Monitoring**: DataDog, New Relic
- **Logs**: CloudWatch, Papertrail
- **Analytics**: Google Analytics, Mixpanel
- **Uptime**: UptimeRobot, Pingdom

### Setup Sentry
```bash
npm install @sentry/nextjs
```

Update `next.config.ts`:
```typescript
import { withSentryConfig } from "@sentry/nextjs";

export default withSentryConfig(nextConfig, {
  org: "your-org",
  project: "premium-app",
  authToken: process.env.SENTRY_AUTH_TOKEN,
});
```

---

## 🆘 Troubleshooting Deployment

### Database Connection Failed
- Check DATABASE_URL format
- Verify database is accessible
- Check firewall rules
- Test connection locally

### Build Fails
```bash
npm run prisma:generate
npm install
npm run build
```

### High Memory Usage
- Check for memory leaks
- Optimize database queries
- Reduce bundle size
- Monitor in production

### Slow Performance
- Enable caching
- Optimize images
- Use CDN
- Monitor database queries
- Check connection pooling

---

## 📈 Scaling Strategies

### Database Scaling
- Read replicas
- Connection pooling
- Query optimization
- Index optimization
- Partitioning

### Application Scaling
- Load balancing
- Horizontal scaling
- Caching layer (Redis)
- CDN for static assets
- API rate limiting

### Monitoring
- Setup alerts
- Track metrics
- Monitor costs
- Plan capacity

---

For more help, see [README.md](./README.md) and [QUICKSTART.md](./QUICKSTART.md)
