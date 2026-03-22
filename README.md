# JobFlow

A modern job search and hiring platform built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Features 16+ pages, 50 job listings, 15 companies, advanced filtering, application tracking, and smooth animations.

**[Live Demo](https://jobflow.netlify.app)**

## Tech Stack

- **Next.js 15** — App Router, Static Export
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Zustand** — State management with localStorage persistence
- **React Hook Form** + **Zod** — Form validation
- **Framer Motion** — Animations
- **Sonner** — Toast notifications
- **Lucide React** — Icons

## Features

- Real-time search by keyword and location
- Advanced filters (job type, experience, salary, remote)
- Sort by latest, salary, relevance
- Full job detail pages with responsibilities, requirements, benefits
- Application form with Zod validation and resume upload
- Save/bookmark jobs (persisted in localStorage)
- Dashboard with saved jobs and application status tracking
- Company profiles with culture info and open positions
- Employer dashboard, job posting, pricing plans
- Career advice, resume tips, interview prep pages
- Mobile-first responsive design
- Skeleton loading states (skeletonix)
- Framer Motion page transitions and micro-interactions

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, search, trending jobs, featured companies |
| `/jobs` | Job search with filters and sorting |
| `/jobs/[id]` | Job details (50 pages) |
| `/jobs/[id]/apply` | Application form |
| `/companies` | Browse 15 companies |
| `/companies/[id]` | Company detail — info, culture, positions |
| `/dashboard` | Saved jobs & application tracking |
| `/post-job` | Post a job form |
| `/pricing` | Pricing plans |
| `/employer-dashboard` | Employer analytics |
| `/career-advice` | Career articles |
| `/resume-tips` | Resume writing guide |
| `/interview-prep` | Interview questions & checklist |
| `/about` | About page |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |

## Quick Start

```bash
git clone https://github.com/MiladJoodi/JobFlow.git
cd JobFlow
npm install
npm run dev
```

Open **http://localhost:3000**

## Build & Deploy

```bash
npm run build
```

Pre-configured for **Netlify** with `netlify.toml`. Just connect the repo and deploy.

## Author

- GitHub: [@MiladJoodi](https://github.com/MiladJoodi)
- LinkedIn: [Milad Joodi](https://www.linkedin.com/in/joodi/)

## License

[MIT](LICENSE)
