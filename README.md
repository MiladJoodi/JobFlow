<div align="center">

# JobFlow

### Modern Job Search & Hiring Platform

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://jobflow.netlify.app)

A production-grade job search platform with **16+ pages**, **50 job listings**, **15 companies**, advanced filtering, application tracking, and smooth animations. Built as a polished SaaS product — not a demo.

[**Live Demo**](https://jobflow.netlify.app) &nbsp;&middot;&nbsp; [**Report Bug**](https://github.com/MiladJoodi/JobFlow/issues) &nbsp;&middot;&nbsp; [**Request Feature**](https://github.com/MiladJoodi/JobFlow/issues)

</div>

<br/>

## Preview

| Home | Job Search | Job Details |
|:---:|:---:|:---:|
| Hero with search, trending jobs, featured companies | Advanced filters, sorting, vertical card list | Full description, requirements, company info |

| Apply Flow | Dashboard | Company Profile |
|:---:|:---:|:---:|
| Validated form with resume upload | Saved jobs & application tracking | Company info, culture, open positions |

<br/>

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 15 (App Router, Static Export) |
| **UI** | React 19, TypeScript, Tailwind CSS v4 |
| **State** | Zustand (with localStorage persistence) |
| **Forms** | React Hook Form + Zod validation |
| **Animations** | Framer Motion |
| **Notifications** | Sonner |
| **Icons** | Lucide React |
| **Deployment** | Netlify (Static) |

<br/>

## Features

### Job Seekers
- **Smart Search** — Real-time search by keyword and location
- **Advanced Filters** — Filter by job type, experience level, salary range, remote/on-site
- **Multiple Sort Options** — Latest, highest salary, lowest salary, most relevant
- **Job Details** — Full descriptions, responsibilities, requirements, benefits, similar jobs
- **Apply Flow** — Multi-field form with Zod validation, resume upload, animated success state
- **Save Jobs** — Bookmark jobs (persisted in localStorage)
- **Dashboard** — Track saved jobs and application statuses (pending, reviewing, interview, accepted, rejected)

### Employers
- **Post Jobs** — Job posting form with validation
- **Employer Dashboard** — Analytics, job management, applicant tracking
- **Pricing Plans** — Three tiers: Starter (Free), Professional ($99/mo), Enterprise ($299/mo)

### Resources
- **Career Advice** — Articles on career growth with newsletter signup
- **Resume Tips** — Writing guide with 8 tips and downloadable templates
- **Interview Prep** — Common questions accordion, interview types, day-of checklist

### UX & Design
- Mobile-first responsive design
- Skeleton loading states on every page
- Empty states with clear call-to-action
- Smooth page transitions and micro-interactions
- Sticky scrollable filter sidebar
- Toast notifications for all user actions
- Persistent state across sessions via Zustand + localStorage

<br/>

## All Pages (16+)

| Route | Page |
|---|---|
| `/` | Home — Hero, trending jobs, featured companies, stats |
| `/jobs` | Job Search — Filters, sorting, vertical card list |
| `/jobs/[id]` | Job Details — 50 individual job pages |
| `/jobs/[id]/apply` | Application — Form with validation |
| `/companies` | Companies — Browse all 15 companies |
| `/companies/[id]` | Company Detail — Info, culture, open positions |
| `/dashboard` | Dashboard — Saved jobs, applications, status tracking |
| `/post-job` | Post a Job — Employer job posting form |
| `/pricing` | Pricing — Three-tier pricing plans |
| `/employer-dashboard` | Employer Dashboard — Analytics and management |
| `/career-advice` | Career Advice — Articles and newsletter |
| `/resume-tips` | Resume Tips — Guide and templates |
| `/interview-prep` | Interview Prep — Questions and checklist |
| `/about` | About — Story, values, team |
| `/contact` | Contact — Form with Zod validation |
| `/privacy` | Privacy Policy — Full legal page |

<br/>

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home
│   ├── layout.tsx                # Root layout (Navbar + Footer)
│   ├── globals.css               # Tailwind v4 + custom theme
│   ├── jobs/
│   │   ├── page.tsx              # Job search
│   │   └── [id]/
│   │       ├── page.tsx          # Job details
│   │       └── apply/page.tsx    # Application form
│   ├── companies/
│   │   ├── page.tsx              # Company listing
│   │   └── [id]/page.tsx         # Company detail
│   ├── dashboard/page.tsx        # User dashboard
│   ├── post-job/page.tsx         # Post a job
│   ├── pricing/page.tsx          # Pricing plans
│   ├── employer-dashboard/page.tsx
│   ├── career-advice/page.tsx
│   ├── resume-tips/page.tsx
│   ├── interview-prep/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── privacy/page.tsx
│
├── components/
│   ├── ui/                       # SearchBar, StatusBadge, EmptyState,
│   │                             # Skeleton, CompanyLogo, FilterTag
│   ├── jobs/                     # JobCard, FilterSidebar
│   ├── companies/                # CompanyCard
│   ├── forms/                    # ApplicationForm
│   └── layout/                   # Navbar, Footer
│
├── data/                         # Mock data (50 jobs, 15 companies)
├── store/                        # Zustand stores (useJobStore, useUserStore)
├── hooks/                        # useDebounce, useFilteredJobs
├── types/                        # TypeScript interfaces
└── utils/                        # Formatters, helpers (cn, formatSalary, etc.)
```

<br/>

## Quick Start

```bash
# Clone
git clone https://github.com/MiladJoodi/JobFlow.git
cd JobFlow

# Install
npm install

# Dev
npm run dev
```

Open **http://localhost:3000**

### Production Build

```bash
npm run build
```

Static output is generated in the `out/` directory.

<br/>

## Deployment (Netlify)

This project is pre-configured for **Netlify** with static export.

The included `netlify.toml` handles everything:

```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Steps:**
1. Push to GitHub
2. Connect the repo on [Netlify](https://netlify.com)
3. Build settings are auto-detected — just click Deploy

The redirect rule prevents 404 errors on client-side navigation.

<br/>

## Mock Data

| Data | Count | Details |
|---|---|---|
| **Jobs** | 50 | Diverse titles, salaries ($40k-$320k), 5 job types, 5 experience levels |
| **Companies** | 15 | Tech, FinTech, HealthTech, Gaming, EdTech, and more |
| **Locations** | 14+ | US cities + London, Toronto, Berlin |
| **Tags** | 30+ | React, Python, AWS, Remote, Urgent Hire, etc. |

<br/>

## State Management

Two Zustand stores with `persist` middleware:

| Store | Manages |
|---|---|
| `useJobStore` | Search query, filters (type, level, salary, remote), sort option |
| `useUserStore` | Auth (mock), saved job IDs, applications with status tracking |

State persists across page refreshes via localStorage.

<br/>

## Author

<a href="https://github.com/MiladJoodi">
  <img src="https://img.shields.io/badge/GitHub-MiladJoodi-181717?style=flat-square&logo=github" />
</a>
<a href="https://www.linkedin.com/in/joodi/">
  <img src="https://img.shields.io/badge/LinkedIn-Milad_Joodi-0A66C2?style=flat-square&logo=linkedin" />
</a>

<br/>

## License

This project is open source under the [MIT License](LICENSE).

<br/>

<div align="center">

**If you found this project useful, please consider giving it a star!**

</div>
