# Rohan's Premium Recruiter-Focused Portfolio

This is a Next.js application built with Tailwind CSS, Framer Motion, and shadcn/ui.

## Getting Started

First, install the dependencies if you haven't already:

```bash
npm install
```

### Adding your Assets

1. **Photo**: Place your authentic, professionally lit photo as `photo.png` inside the `public/` directory.
2. **Signature**: Place your signature as `signature.png` inside the `public/` directory (or use the CSS SVG fallback provided).
3. **Resume**: Place your resume as `resume.pdf` inside the `public/` directory.

### Environment Setup

1. Copy `.env.example` to `.env.local`
```bash
cp .env.example .env.local
```
2. Fill in the required keys for Supabase and Resend.

### Database Setup (Supabase)

1. Create a new Supabase project.
2. Navigate to the SQL Editor in Supabase.
3. Paste and run the contents of `supabase_schema.sql` to create the `visitors` table and configure RLS.
4. Copy your Project URL and Anon Key to `.env.local`.

### Running Locally

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This portfolio is configured to be deployed seamlessly on [Vercel](https://vercel.com/new).

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Add the Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `CONTACT_EMAIL`).
4. Deploy!
