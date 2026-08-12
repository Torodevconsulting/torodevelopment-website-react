# Torodevelopment Website

Marketing and agency website for Torodevelopment — built with React, TypeScript, and Vite. Deployed on Vercel.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** + **shadcn/ui** components
- **Framer Motion** — animations and scroll effects
- **react-router-dom** — client-side routing
- **next-themes** — dark / light mode
- **Supabase** — contact form lead storage
- **Resend** — email notifications on new lead
- **Cloudflare Turnstile** — bot protection on contact form
- **Vercel Analytics** — traffic tracking
- **react-helmet-async** — SEO meta tags

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, partners, services |
| `/nosotros` | About — story and values |
| `/servicios` | Services |
| `/contacto` | Contact form with Turnstile |
| `/privacidad` | Privacy policy (GDPR) |
| `/faqs` | FAQ *(pending)* |



## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Project Structure

```
src/
├── components/
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── SEO.tsx
│   └── ui/          # shadcn/ui primitives
├── lib/
│   ├── submitLead.ts
│   ├── supabaseClient.ts
│   └── utils.ts
└── pages/
    ├── Home.tsx
    ├── About.tsx
    ├── Services.tsx
    ├── Contact.tsx
    └── Privacy.tsx
public/
├── sitemap.xml
└── robots.txt
```
