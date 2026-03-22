"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Globe,
  Users,
  Calendar,
  Star,
  Briefcase,
  ExternalLink,
  Code2,
  Heart,
} from "lucide-react";
import { companies } from "@/data/companies";
import { jobs } from "@/data/jobs";
import CompanyLogo from "@/components/ui/CompanyLogo";
import { JobCard } from "@/components/jobs";
import { EmptyState, Skeleton } from "@/components/ui";
import { useUserStore } from "@/store";
import { delay, cn } from "@/utils";

export default function CompanyDetailPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { toggleSaveJob, isJobSaved } = useUserStore();

  const company = companies.find((c) => c.id === params.id);
  const companyJobs = jobs.filter((j) => j.companyId === params.id);

  useEffect(() => {
    delay(500).then(() => setIsLoading(false));
  }, []);

  if (!isLoading && !company) {
    return (
      <div className="container-main py-20">
        <EmptyState
          icon={<Briefcase className="h-12 w-12 text-gray-300" />}
          title="Company not found"
          description="This company page may have been removed or doesn't exist."
          action={{ label: "Browse Companies", href: "/companies" }}
        />
      </div>
    );
  }

  if (isLoading || !company) {
    return (
      <div className="container-main py-10">
        <Skeleton className="mb-6 h-6 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-16 w-16 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="container-main">
        {/* Back link */}
        <Link
          href="/companies"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Companies
        </Link>

        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4 sm:gap-5">
              <CompanyLogo name={company.name} size="lg" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {company.name}
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  {company.industry}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {company.headquarters}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {company.size} employees
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Founded {company.founded}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {company.rating} ({company.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary shrink-0"
            >
              <Globe className="h-4 w-4" />
              Visit Website
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </motion.div>

        {/* Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Left column - main info */}
          <div className="space-y-6 lg:col-span-2">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                {company.description}
              </p>
            </motion.div>

            {/* Culture */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="card p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900">Culture</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                {company.culture}
              </p>
            </motion.div>

            {/* Open Positions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Open Positions ({companyJobs.length})
              </h2>
              {companyJobs.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {companyJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={isJobSaved(job.id)}
                      onSave={toggleSaveJob}
                    />
                  ))}
                </div>
              ) : (
                <div className="card p-8 text-center">
                  <Briefcase className="mx-auto h-10 w-10 text-gray-300" />
                  <p className="mt-3 text-sm text-gray-500">
                    No open positions at the moment
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right column - sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="card p-6"
            >
              <h3 className="text-base font-semibold text-gray-900">
                <Heart className="mr-2 inline h-4 w-4 text-rose-500" />
                Benefits
              </h3>
              <ul className="mt-3 space-y-2">
                {company.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <h3 className="text-base font-semibold text-gray-900">
                <Code2 className="mr-2 inline h-4 w-4 text-blue-500" />
                Tech Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {company.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="card p-6"
            >
              <h3 className="text-base font-semibold text-gray-900">
                Company Stats
              </h3>
              <div className="mt-3 space-y-3">
                {[
                  {
                    label: "Open Positions",
                    value: companyJobs.length.toString(),
                  },
                  { label: "Company Size", value: company.size },
                  { label: "Industry", value: company.industry },
                  { label: "Founded", value: company.founded.toString() },
                  {
                    label: "Rating",
                    value: `${company.rating}/5.0`,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-500">{stat.label}</span>
                    <span className="font-medium text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
