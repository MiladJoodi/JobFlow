"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  FileText,
  User,
  Briefcase,
  Heart,
  Clock,
  Search,
  ArrowRight,
  MapPin,
  DollarSign,
} from "lucide-react";
import { useUserStore } from "@/store";
import { jobs } from "@/data/jobs";
import { JobCard } from "@/components/jobs";
import {
  StatusBadge,
  EmptyState,
  JobCardSkeleton,
} from "@/components/ui";
import CompanyLogo from "@/components/ui/CompanyLogo";
import { formatDate, formatSalary, delay, cn } from "@/utils";

type Tab = "saved" | "applied";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("saved");
  const [isLoading, setIsLoading] = useState(true);
  const {
    isAuthenticated,
    user,
    savedJobIds,
    applications,
    toggleSaveJob,
    isJobSaved,
  } = useUserStore();

  useEffect(() => {
    delay(500).then(() => setIsLoading(false));
  }, []);

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  const tabs = [
    {
      key: "saved" as Tab,
      label: "Saved Jobs",
      icon: Bookmark,
      count: savedJobs.length,
    },
    {
      key: "applied" as Tab,
      label: "Applications",
      icon: FileText,
      count: applications.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(" ")[0] || "User"}
              </h1>
              <p className="text-sm text-gray-500">
                Manage your saved jobs and track your applications
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            {
              icon: Heart,
              label: "Saved Jobs",
              value: savedJobs.length,
              color: "text-rose-500 bg-rose-50",
            },
            {
              icon: FileText,
              label: "Applications",
              value: applications.length,
              color: "text-blue-500 bg-blue-50",
            },
            {
              icon: Clock,
              label: "Pending",
              value: applications.filter((a) => a.status === "pending").length,
              color: "text-yellow-500 bg-yellow-50",
            },
            {
              icon: Briefcase,
              label: "Interviews",
              value: applications.filter((a) => a.status === "interview").length,
              color: "text-purple-500 bg-purple-50",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="card flex items-center gap-3 p-4"
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  stat.color
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors",
                  activeTab === tab.key
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                <span
                  className={cn(
                    "ml-1 rounded-full px-2 py-0.5 text-xs",
                    activeTab === tab.key
                      ? "bg-primary-100 text-primary-700"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {tab.count}
                </span>
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="dashboard-tab"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-primary-600"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {activeTab === "saved" && (
              <motion.div
                key="saved"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isLoading ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <JobCardSkeleton key={i} />
                    ))}
                  </div>
                ) : savedJobs.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {savedJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        isSaved={true}
                        onSave={toggleSaveJob}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<Bookmark className="h-12 w-12 text-gray-300" />}
                    title="No saved jobs yet"
                    description="Start bookmarking jobs you're interested in. They'll show up here for easy access."
                    action={{ label: "Browse Jobs", href: "/jobs" }}
                  />
                )}
              </motion.div>
            )}

            {activeTab === "applied" && (
              <motion.div
                key="applied"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="card animate-pulse p-5">
                        <div className="flex gap-4">
                          <div className="h-12 w-12 rounded-xl bg-gray-200" />
                          <div className="flex-1 space-y-2">
                            <div className="h-5 w-48 rounded bg-gray-200" />
                            <div className="h-4 w-32 rounded bg-gray-200" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((app, index) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="card-hover p-5"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-4">
                            <CompanyLogo name={app.job.company} />
                            <div>
                              <Link
                                href={`/jobs/${app.jobId}`}
                                className="text-base font-semibold text-gray-900 hover:text-primary-600"
                              >
                                {app.job.title}
                              </Link>
                              <p className="mt-0.5 text-sm text-gray-500">
                                {app.job.company}
                              </p>
                              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {app.job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  {formatSalary(
                                    app.job.salaryMin,
                                    app.job.salaryMax
                                  )}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Applied {formatDate(app.appliedAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 pl-16 sm:pl-0">
                            <StatusBadge status={app.status} />
                            <Link
                              href={`/jobs/${app.jobId}`}
                              className="text-sm font-medium text-primary-600 hover:text-primary-700"
                            >
                              View <ArrowRight className="ml-0.5 inline h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<FileText className="h-12 w-12 text-gray-300" />}
                    title="No applications yet"
                    description="Apply to jobs you're interested in. Track their status here."
                    action={{ label: "Find Jobs", href: "/jobs" }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
