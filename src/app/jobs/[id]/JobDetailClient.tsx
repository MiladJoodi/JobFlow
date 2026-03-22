"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { jobs } from "@/data/jobs";
import { companies } from "@/data/companies";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import CompanyLogo from "@/components/ui/CompanyLogo";
import {
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Users,
  Briefcase,
  Heart,
  Share2,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Building2,
} from "lucide-react";
import {
  formatSalary,
  formatDate,
  formatJobType,
  formatExperienceLevel,
  getJobTypeColor,
  delay,
} from "@/utils";
import { JobCardSkeleton } from "@/components/ui";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function JobDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button skeleton */}
        <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-6" />

        {/* Header card skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-xl shrink-0" />
            <div className="flex-1 w-full">
              <div className="h-7 w-2/3 bg-gray-200 animate-pulse rounded mb-3" />
              <div className="h-5 w-1/3 bg-gray-200 animate-pulse rounded mb-4" />
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="h-5 w-36 bg-gray-200 animate-pulse rounded" />
                <div className="h-5 w-44 bg-gray-200 animate-pulse rounded" />
                <div className="h-5 w-28 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="h-7 w-20 bg-gray-200 animate-pulse rounded-full" />
                <div className="h-7 w-24 bg-gray-200 animate-pulse rounded-full" />
                <div className="h-7 w-16 bg-gray-200 animate-pulse rounded-full" />
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="h-11 w-32 bg-gray-200 animate-pulse rounded-lg" />
                <div className="h-11 w-11 bg-gray-200 animate-pulse rounded-lg" />
                <div className="h-11 w-11 bg-gray-200 animate-pulse rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-4/6 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="h-6 w-28 bg-gray-200 animate-pulse rounded mb-4" />
              {[1, 2, 3].map((i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(true);

  const { toggleSaveJob, isJobSaved, hasApplied } = useUserStore();

  useEffect(() => {
    const load = async () => {
      await delay(500);
      setIsLoading(false);
    };
    load();
  }, []);

  const job = jobs.find((j) => j.id === id);
  const company = job ? companies.find((c) => c.id === job.companyId) : null;

  const similarJobs = job
    ? jobs
        .filter((j) => {
          if (j.id === job.id) return false;
          if (j.companyId === job.companyId) return true;
          return j.tags.some((tag) => job.tags.includes(tag));
        })
        .slice(0, 3)
    : [];

  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Job not found
          </h1>
          <p className="text-gray-500 mb-6">
            The job you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const saved = isJobSaved(job.id);
  const applied = hasApplied(job.id);

  const handleSave = () => {
    toggleSaveJob(job.id);
    if (saved) {
      toast.success("Job removed from saved jobs");
    } else {
      toast.success("Job saved successfully");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Jobs</span>
          </Link>
        </motion.div>

        {/* Header Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <CompanyLogo name={job.company} size="lg" />

            <div className="flex-1 min-w-0">
              {/* Title and Company */}
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {job.title}
              </h1>
              <Link
                href={`/companies/${job.companyId}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                {job.company}
              </Link>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Posted {formatDate(job.postedAt)}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getJobTypeColor(job.type)}`}
                >
                  {formatJobType(job.type)}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                  {formatExperienceLevel(job.experienceLevel)}
                </span>
                {job.isRemote && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    Remote
                  </span>
                )}
                {job.isUrgent && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                    Urgent
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                {applied ? (
                  <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-50 text-green-700 rounded-lg font-medium text-sm border border-green-200">
                    <CheckCircle2 className="w-4 h-4" />
                    Applied
                  </span>
                ) : (
                  <Link
                    href={`/jobs/${job.id}/apply`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm shadow-sm"
                  >
                    <Briefcase className="w-4 h-4" />
                    Apply Now
                  </Link>
                )}

                <button
                  onClick={handleSave}
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-lg border transition-colors ${
                    saved
                      ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                      : "bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"
                  }`}
                  aria-label={saved ? "Unsave job" : "Save job"}
                >
                  <Heart
                    className={`w-5 h-5 ${saved ? "fill-current" : ""}`}
                  />
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                  aria-label="Share job"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Applicants</p>
                <p className="font-semibold text-gray-900">
                  {job.applicants}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p className="font-semibold text-gray-900">
                  {formatDate(job.postedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-semibold text-gray-900">
                  {new Date(job.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (wider) */}
          <div className="lg:col-span-2 space-y-6">
            {/* About this role */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                About this role
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {job.description}
              </p>
            </motion.div>

            {/* Responsibilities */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Nice to Have */}
            {job.niceToHave.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Nice to Have
                </h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column (sidebar) */}
          <div className="space-y-6">
            {/* Company Info Card */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                About the Company
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <CompanyLogo name={job.company} size="md" />
                <div>
                  <p className="font-semibold text-gray-900">{job.company}</p>
                  {company && (
                    <p className="text-sm text-gray-500">{company.industry}</p>
                  )}
                </div>
              </div>

              {company && (
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>
                      {company.size} employees
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{company.headquarters}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>Founded {company.founded}</span>
                  </div>
                </div>
              )}

              <Link
                href={`/companies/${job.companyId}`}
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Company
              </Link>
            </motion.div>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Similar Jobs
                </h3>
                <div className="space-y-4">
                  {similarJobs.map((sJob) => (
                    <Link
                      key={sJob.id}
                      href={`/jobs/${sJob.id}`}
                      className="block p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <CompanyLogo name={sJob.company} size="sm" />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors truncate text-sm">
                            {sJob.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {sJob.company}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatSalary(
                              sJob.salaryMin,
                              sJob.salaryMax,
                              sJob.currency
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
