"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Building2,
  Users,
  Briefcase,
  Globe,
  Zap,
  Clock,
  Laptop,
} from "lucide-react";
import { SearchBar } from "@/components/ui";
import { JobCard } from "@/components/jobs";
import { CompanyCard } from "@/components/companies";
import { JobCardSkeleton, CompanyCardSkeleton } from "@/components/ui";
import { jobs } from "@/data/jobs";
import { companies } from "@/data/companies";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useJobStore } from "@/store";
import { delay } from "@/utils";

const stats = [
  { icon: Briefcase, label: "Active Jobs", value: "10,000+" },
  { icon: Building2, label: "Companies", value: "500+" },
  { icon: Users, label: "Job Seekers", value: "50,000+" },
  { icon: Globe, label: "Countries", value: "30+" },
];

const quickFilters = [
  { label: "Remote", icon: Laptop, query: "remote" },
  { label: "Full-time", icon: Clock, query: "full-time" },
  { label: "Urgent Hiring", icon: Zap, query: "urgent" },
  { label: "Senior Level", icon: TrendingUp, query: "senior" },
];

export default function HomePage() {
  const router = useRouter();
  const { setQuery, setLocation } = useJobStore();
  const { savedJobIds, toggleSaveJob, isJobSaved } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    delay(600).then(() => setIsLoading(false));
  }, []);

  const trendingJobs = jobs.filter((j) => j.isFeatured || j.isUrgent).slice(0, 6);
  const featuredCompanies = companies.filter((c) => c.rating >= 4.3).slice(0, 4);
  const latestJobs = [...jobs]
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, 6);

  const handleSearch = (query: string, location: string) => {
    setQuery(query);
    setLocation(location);
    router.push("/jobs");
  };

  const handleQuickFilter = (query: string) => {
    setQuery(query);
    router.push("/jobs");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 pb-24 pt-16 sm:pb-32 sm:pt-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary-400/10 blur-3xl" />
        </div>

        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find Your Dream Job{" "}
              <span className="text-primary-200">Today</span>
            </h1>
            <p className="mt-4 text-lg text-primary-100 sm:mt-6 sm:text-xl">
              Discover thousands of opportunities at top companies worldwide.
              Your next career move starts here.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl sm:mt-10"
          >
            <SearchBar onSearch={handleSearch} size="lg" />
          </motion.div>

          {/* Quick filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2"
          >
            {quickFilters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => handleQuickFilter(filter.query)}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <filter.icon className="h-3.5 w-3.5" />
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-10 sm:-mt-14">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="card flex items-center gap-3 p-4 sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                  <stat.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Jobs */}
      <section className="py-16 sm:py-20">
        <div className="container-main">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="section-title flex items-center gap-2">
                <TrendingUp className="h-7 w-7 text-primary-600" />
                Trending Jobs
              </h2>
              <p className="section-subtitle">
                Hot opportunities that companies are urgently hiring for
              </p>
            </div>
            <Link
              href="/jobs"
              className="btn-ghost hidden sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))
              : trendingJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={isJobSaved(job.id)}
                    onSave={toggleSaveJob}
                  />
                ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/jobs" className="btn-primary">
              View All Jobs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="bg-gray-50/50 py-16 sm:py-20">
        <div className="container-main">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="section-title flex items-center gap-2">
                <Building2 className="h-7 w-7 text-primary-600" />
                Featured Companies
              </h2>
              <p className="section-subtitle">
                Top-rated companies with great culture and benefits
              </p>
            </div>
            <Link
              href="/companies"
              className="btn-ghost hidden sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <CompanyCardSkeleton key={i} />
                ))
              : featuredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16 sm:py-20">
        <div className="container-main">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="section-title">Latest Opportunities</h2>
              <p className="section-subtitle">
                Fresh job postings added recently
              </p>
            </div>
            <Link
              href="/jobs"
              className="btn-ghost hidden sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))
              : latestJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={isJobSaved(job.id)}
                    onSave={toggleSaveJob}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Take the Next Step?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              Join thousands of professionals who found their dream jobs through
              JobFlow.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-all hover:bg-primary-50"
              >
                Browse Jobs <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/companies"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Explore Companies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
