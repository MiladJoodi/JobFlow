# JobFlow - Job Search & Hiring Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)

A modern, production-quality job search and hiring platform built with Next.js, React 19, and TypeScript. Features a polished UI, smooth animations, and complete user flows — from job discovery to application tracking.

[Live Demo](https://jobflow.netlify.app) · [Report Bug](https://github.com/MiladJoodi/JobFlow/issues) · [Request Feature](https://github.com/MiladJoodi/JobFlow/issues)

</div>

---

## Overview

JobFlow is a full-featured frontend hiring platform designed as a real-world SaaS product. It includes job search with advanced filtering, company exploration, application submission with form validation, and a personal dashboard for tracking saved jobs and applications.

## Screenshots

### Home Page
The landing page features a hero section with search, trending jobs, featured companies, and quick filter chips.

### Job Search
Full-featured search with sidebar filters (job type, experience, salary range, remote), sorting options, and a clean vertical card layout.

### Job Details
Detailed job pages with responsibilities, requirements, benefits, company info, and similar job recommendations.

### Application Flow
Multi-field application form with Zod validation, resume upload, and animated success state.

### Dashboard
Track saved jobs and submitted applications with real-time status badges.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | App Router, static export, file-based routing |
| **React 19** | UI components with hooks |
| **TypeScript** | Type safety across the entire codebase |
| **Tailwind CSS v4** | Utility-first styling with custom theme |
| **Zustand** | Lightweight state management with persistence |
| **React Hook Form** | Performant form handling |
| **Zod** | Schema validation for forms |
| **Framer Motion** | Smooth animations and transitions |
| **Sonner** | Toast notifications |
| **Lucide React** | Beautiful, consistent icons |

---

## Features

### Core
- **Job Search** — Search by keyword, location with real-time filtering
- **Advanced Filters** — Job type, experience level, salary range, remote/on-site
- **Sorting** — Latest, highest salary, lowest salary, most relevant
- **Job Details** — Full descriptions, requirements, benefits, similar jobs
- **Apply Flow** — Form with validation, resume upload (mock), success states
- **Save Jobs** — Bookmark jobs with persistent localStorage
- **Dashboard** — Track saved jobs and application statuses
- **Company Pages** — Company profiles with open positions, tech stack, culture

### Pages
- `/` — Home with hero, trending jobs, featured companies
- `/jobs` — Job search with filters and vertical card list
- `/jobs/[id]` — Detailed job listing
- `/jobs/[id]/apply` — Application form
- `/companies` — Browse all companies
- `/companies/[id]` — Company detail with open positions
- `/dashboard` — Saved jobs and application tracking
- `/post-job` — Job posting form for employers
- `/pricing` — Pricing tiers (Starter, Professional, Enterprise)
- `/employer-dashboard` — Employer analytics and job management
- `/career-advice` — Career growth articles
- `/resume-tips` — Resume writing guide with templates
- `/interview-prep` — Interview preparation with common questions
- `/about` — About JobFlow
- `/contact` — Contact form with support info
- `/privacy` — Privacy policy

### UX & Polish
- Mobile-first responsive design
- Skeleton loading states on every page
- Empty states with call-to-action
- Smooth page transitions and hover animations
- Sticky filter sidebar with scroll support
- Toast notifications for user actions
- Persistent state via localStorage (Zustand)

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── career-advice/
│   ├── companies/
│   │   └── [id]/
│   ├── contact/
│   ├── dashboard/
│   ├── employer-dashboard/
│   ├── interview-prep/
│   ├── jobs/
│   │   └── [id]/
│   │       └── apply/
│   ├── post-job/
│   ├── pricing/
│   ├── privacy/
│   ├── resume-tips/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── companies/          # CompanyCard
│   ├── forms/              # ApplicationForm
│   ├── jobs/               # JobCard, FilterSidebar
│   ├── layout/             # Navbar, Footer
│   └── ui/                 # SearchBar, StatusBadge, EmptyState, Skeleton, CompanyLogo, FilterTag
├── data/                   # Mock data (50 jobs, 15 companies)
├── hooks/                  # useDebounce, useFilteredJobs
├── store/                  # Zustand stores (jobs, user)
├── types/                  # TypeScript interfaces
└── utils/                  # Formatters, helpers
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MiladJoodi/JobFlow.git

# Navigate to project directory
cd JobFlow

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static output is generated in the `out/` directory, ready for deployment.

---

## Deployment

### Netlify

This project is configured for Netlify deployment with static export:

1. Push to GitHub
2. Connect the repo on [Netlify](https://netlify.com)
3. Build settings are auto-detected from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
4. Deploy

The `netlify.toml` includes SPA redirect rules to prevent 404 errors on client-side navigation.

### Vercel

```bash
npx vercel
```

> Note: Remove `output: "export"` from `next.config.ts` if deploying to Vercel with SSR.

---

## Mock Data

The platform includes realistic mock data:
- **50 job listings** across 15 companies
- Diverse job types: Full-time, Part-time, Contract, Internship, Freelance
- Experience levels: Entry to Executive
- Realistic salary ranges, locations, and tech tags
- Featured and urgent job flags

---

## State Management

Zustand stores with localStorage persistence:

- **useJobStore** — Search query, filters, sorting preferences
- **useUserStore** — User auth (mock), saved jobs, applications with status tracking

---

## Author

**Milad Joodi**

- GitHub: [@MiladJoodi](https://github.com/MiladJoodi)
- LinkedIn: [Milad Joodi](https://www.linkedin.com/in/joodi/)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with Next.js, React, and TypeScript

</div>
