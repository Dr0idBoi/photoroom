# Photoroom - Modeling Agency Website Clone

A full-stack Next.js clone of the getmodels.ru modeling agency website with a complete admin panel for content management.

## Tech Stack

- **Frontend:** Next.js 14 with App Router
- **Backend:** Next.js API Routes
- **Database:** SQLite with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Extracted CSS from original site

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

3. Initialize the database:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Panel

Access the admin panel at `/admin` with these credentials:
- **Email:** admin@getmodels.local
- **Password:** admin123

⚠️ **Important:** Change the admin password after first login!

## Project Structure

```
/app
  /(site)          # Public-facing pages
  /admin           # Admin panel
  /api             # API routes
/components
  /site            # Public components
  /admin           # Admin components
/lib               # Utilities and database client
/prisma            # Database schema and migrations
/public            # Static assets
```

## Features

### Public Site
- Homepage with services overview
- Model catalog with filtering
- Individual model detail pages
- Blog with articles
- Portfolio gallery
- Service landing pages
- Contact forms
- Russian/English language switcher

### Admin Panel
- Dashboard with statistics
- Model management (CRUD operations)
- Category management
- Blog post editor
- Service page editor
- Portfolio management
- User management
- Image upload

## Database Schema

The database includes the following tables:
- **User** - Admin users
- **Model** - Model profiles with measurements
- **Category** - Model categories
- **ModelImage** - Model portfolio images
- **Service** - Service pages
- **BlogPost** - Blog articles
- **Portfolio** - Portfolio case studies
- **ContactSubmission** - Contact form submissions

## Development

### Database Commands

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Reset the database
npx prisma migrate reset

# Seed the database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

### Build for Production

```bash
npm run build
npm start
```

## License

This is a clone/educational project. All content and design are property of the original getmodels.ru website.



