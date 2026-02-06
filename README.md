# BMDB

Database for student and indie filmmakers. Still building it out.

## What is this?

BMDB lets filmmakers showcase their work and build their filmography. Think IMDb but for student and independent projects.

**Status: Coming soon** - still in development

## Tech

Frontend: React + Vite + TypeScript + shadcn/ui  
Backend: Next.js + Supabase (check `/backend` folder)

## Running it

```bash
npm install
npm run dev
```

For backend setup, see the backend README.

## Project layout

```
BMDB/
├── backend/       # Next.js + Supabase
├── public/        # Static files
├── src/           # React frontend
│   ├── components/
│   ├── pages/
│   ├── lib/
│   └── types/
└── package.json
```

## Env vars

Create `.env` in the root:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

Backend needs its own env vars - check the backend README.

## Features (planned)

- Project pages and publishing
- Credit system with verification
- Ratings and comments
- Discovery (trending, top rated, etc.)
- User profiles
- Admin stuff

## Contributing

Just write clean code and test your changes. That's it.
