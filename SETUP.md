# Setup Guide - GET MODELS Website Clone

## Project Complete! 🎉

All components of the getmodels.ru clone have been implemented:

### ✅ Completed Features

#### Frontend (Public Site)
- **Homepage** with hero section, services grid, stats, and CTA
- **Services Overview** page with categorized services
- **Model Catalog** with category filtering
- **Individual Model Pages** with full details and portfolio
- **Blog** with article listing and individual post pages
- **Portfolio** gallery page
- **Contact Page** with form
- **Static Pages**: Vacancies, Castings, English version
- **Service Landing Pages**: Dynamic template for all service types

#### Backend & Database
- **SQLite Database** with Prisma ORM
- **Complete Schema**: Models, Categories, Blog, Services, Portfolio, Users
- **API Routes**: Full CRUD operations for all content types
- **Authentication System**: Cookie-based admin sessions
- **Seed Script**: Sample data for testing

#### Admin Panel
- **Dashboard** with statistics
- **Models Management** with listing and CRUD operations
- **Blog Management** with post listing
- **Portfolio Management**
- **Services Management**
- **Categories Overview**
- **Contact Submissions** viewer
- **Secure Login/Logout**

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

The `.env` file is in `.gitignore`, so create it manually:

```bash
# Create .env file in project root
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Initialize Database

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Default Admin Credentials

**Email:** admin@getmodels.local  
**Password:** admin123

⚠️ **IMPORTANT:** Change these credentials after first login!

## Project Structure

```
├── app/
│   ├── (site)/              # Public pages (home, catalog, blog, etc.)
│   ├── admin/               # Admin panel pages
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   └── site/                # Reusable site components
├── lib/
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # Auth utilities
│   └── auth-check.ts       # Admin route protection
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
├── public/
│   ├── styles/             # CSS files
│   └── images/             # Static images
└── README.md               # Project documentation
```

## Key URLs

### Public Site
- `/` - Homepage
- `/catalog` - Model catalog
- `/category-models/{slug}` - Category pages
- `/model/{slug}` - Individual model pages
- `/blog` - Blog listing
- `/blog/{slug}` - Blog post
- `/portfolio` - Portfolio gallery
- `/contacts` - Contact page
- `/service-page-3` - Services overview
- `/{service-slug}` - Individual service pages
- `/vacancies` - Job listings
- `/casting` - Casting opportunities
- `/eng` - English version

### Admin Panel
- `/admin` - Dashboard
- `/admin/login` - Login page
- `/admin/models` - Models management
- `/admin/blog` - Blog management
- `/admin/categories` - Categories overview
- `/admin/portfolio` - Portfolio management
- `/admin/services` - Services management
- `/admin/contacts` - Contact submissions

## Database Commands

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Seed database
npx prisma db seed

# Open Prisma Studio (GUI for database)
npx prisma studio
```

## API Endpoints

All API routes support standard REST operations:

- `GET /api/models` - List models (with filtering)
- `POST /api/models` - Create model
- `GET /api/models/{id}` - Get model
- `PUT /api/models/{id}` - Update model
- `DELETE /api/models/{id}` - Delete model

Similar patterns for:
- `/api/blog`
- `/api/services`
- `/api/portfolio`
- `/api/categories`
- `/api/contact` (POST only - form submissions)

## Adding Content

### Via Admin Panel (Recommended)
1. Login at `/admin/login`
2. Navigate to the appropriate section
3. Use the "Add New" buttons to create content

### Via Database Seed Script
Edit `prisma/seed.ts` to add your initial content, then run:
```bash
npx prisma db seed
```

## Styling

The site uses custom CSS extracted from the original getmodels.ru:
- `/public/styles/site.css` - Public site styles
- `/public/styles/admin.css` - Admin panel styles

Styles are included via `<link>` tags in page components for simplicity.

## Production Deployment

1. **Change admin credentials**
2. **Update `.env` with production values**
3. **Build the project:**
   ```bash
   npm run build
   ```
4. **Start production server:**
   ```bash
   npm start
   ```

## Next Steps

1. **Customize Content**: Replace sample data with your actual content
2. **Add Images**: Upload model photos and portfolio images
3. **Configure Email**: Set up email notifications for contact form submissions
4. **Security**: Change default admin password immediately
5. **SEO**: Update meta tags in page components
6. **Analytics**: Add tracking code if needed

## Troubleshooting

### Database Issues
- If you get database errors, try: `npx prisma migrate reset`
- Then reseed: `npx prisma db seed`

### Port Already in Use
- Change the port: `npm run dev -- -p 3001`

### Authentication Issues
- Clear cookies in browser
- Check that `.env` file exists with correct values

## Support

For issues related to:
- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

**Note**: This is a clone/educational project. All content and design concepts are based on the original getmodels.ru website. Replace with your own content before production use.



