"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Pause,
  Edit,
  Eye,
  Play,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    icon: Briefcase,
    label: "Active Listings",
    value: 5,
    color: "text-primary-600 bg-primary-50",
  },
  {
    icon: Users,
    label: "Total Applicants",
    value: 127,
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: Calendar,
    label: "Interviews Scheduled",
    value: 8,
    color: "text-amber-500 bg-amber-50",
  },
  {
    icon: CheckCircle2,
    label: "Positions Filled",
    value: 3,
    color: "text-green-500 bg-green-50",
  },
];

const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    applicants: 42,
    status: "Active" as const,
    postedDate: "Mar 5, 2026",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    title: "Product Designer",
    applicants: 38,
    status: "Paused" as const,
    postedDate: "Feb 28, 2026",
    location: "Remote",
  },
  {
    id: 3,
    title: "Backend Engineer",
    applicants: 47,
    status: "Closed" as const,
    postedDate: "Feb 15, 2026",
    location: "New York, NY",
  },
];

const recentApplicants = [
  {
    id: 1,
    name: "Sarah Chen",
    position: "Senior Frontend Developer",
    dateApplied: "Mar 20, 2026",
    status: "New" as const,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    position: "Senior Frontend Developer",
    dateApplied: "Mar 19, 2026",
    status: "Reviewed" as const,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Product Designer",
    dateApplied: "Mar 18, 2026",
    status: "Interview" as const,
  },
  {
    id: 4,
    name: "David Kim",
    position: "Backend Engineer",
    dateApplied: "Mar 17, 2026",
    status: "Shortlisted" as const,
  },
  {
    id: 5,
    name: "Aisha Patel",
    position: "Senior Frontend Developer",
    dateApplied: "Mar 16, 2026",
    status: "Rejected" as const,
  },
];

const statusStyles: Record<string, string> = {
  Active: "bg-green-50 text-green-700",
  Paused: "bg-yellow-50 text-yellow-700",
  Closed: "bg-gray-100 text-gray-600",
  New: "bg-blue-50 text-blue-700",
  Reviewed: "bg-purple-50 text-purple-700",
  Interview: "bg-amber-50 text-amber-700",
  Shortlisted: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-600",
};

export default function EmployerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Employer Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your job postings and track applicants
              </p>
            </div>
            <Link href="/post-job" className="btn-primary">
              <Briefcase className="h-4 w-4" />
              Post New Job
            </Link>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="card flex items-center gap-3 p-4 sm:p-5"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Job Listings Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <div className="flex items-center justify-between">
            <h2 className="section-title">Your Job Listings</h2>
            <Link
              href="/post-job"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              View All
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {jobListings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.08 }}
                className="card p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                        <Briefcase className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {job.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span>{job.location}</span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {job.applicants} applicants
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Posted {job.postedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-13 sm:pl-0">
                    <span
                      className={`badge ${statusStyles[job.status]}`}
                    >
                      {job.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        title={job.status === "Paused" ? "Resume" : "Pause"}
                      >
                        {job.status === "Paused" ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <Pause className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-primary-600"
                        title="View Applicants"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Applicants Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <div className="flex items-center justify-between">
            <h2 className="section-title">Recent Applicants</h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>

          {/* Desktop Table */}
          <div className="mt-6 hidden sm:block">
            <div className="card overflow-hidden p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Date Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentApplicants.map((applicant, index) => (
                    <motion.tr
                      key={applicant.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.55 + index * 0.05 }}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                            {applicant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {applicant.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {applicant.position}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {applicant.dateApplied}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`badge ${statusStyles[applicant.status]}`}
                        >
                          {applicant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile List */}
          <div className="mt-6 space-y-3 sm:hidden">
            {recentApplicants.map((applicant, index) => (
              <motion.div
                key={applicant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + index * 0.05 }}
                className="card p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                      {applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {applicant.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {applicant.position}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`badge ${statusStyles[applicant.status]}`}
                  >
                    {applicant.status}
                  </span>
                </div>
                <p className="mt-2 pl-11 text-xs text-gray-400">
                  Applied {applicant.dateApplied}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
