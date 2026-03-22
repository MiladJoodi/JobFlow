"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, DollarSign, Heart, Clock, Zap, Star } from "lucide-react";
import { Job } from "@/types";
import {
  formatDate,
  formatSalary,
  formatJobType,
  formatExperienceLevel,
  getJobTypeColor,
} from "@/utils";
import CompanyLogo from "@/components/ui/CompanyLogo";

interface JobCardProps {
  job: Job;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

export default function JobCard({ job, onSave, isSaved = false }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/jobs/${job.id}`}
        className="group block rounded-xl bg-white border border-gray-100 p-5 transition-all hover:shadow-md hover:border-gray-200"
      >
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <CompanyLogo name={job.company} size="md" />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top: Title + badges */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {job.title}
                </h3>
                <p className="mt-0.5 text-sm text-gray-500">{job.company}</p>
              </div>

              {/* Right side: badges + save */}
              <div className="flex items-center gap-2 shrink-0">
                {job.isUrgent && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-600 px-2 py-0.5 text-xs font-medium">
                    <Zap className="w-3 h-3" />
                    Urgent
                  </span>
                )}
                {job.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-600 px-2 py-0.5 text-xs font-medium">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSave?.(job.id);
                  }}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label={isSaved ? "Unsave job" : "Save job"}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isSaved
                        ? "fill-red-500 text-red-500"
                        : "text-gray-300 hover:text-red-400"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Meta info */}
            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-gray-700">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
              </span>
              <span className="inline-flex items-center gap-1 text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(job.postedAt)}
              </span>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span
                className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${getJobTypeColor(job.type)}`}
              >
                {formatJobType(job.type)}
              </span>
              <span className="inline-block rounded-md px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600">
                {formatExperienceLevel(job.experienceLevel)}
              </span>
              {job.isRemote && (
                <span className="inline-block rounded-md px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600">
                  Remote
                </span>
              )}
              {job.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-md px-2 py-0.5 text-xs text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
