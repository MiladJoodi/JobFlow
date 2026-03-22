"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, DollarSign } from "lucide-react";
import { jobs } from "@/data/jobs";
import CompanyLogo from "@/components/ui/CompanyLogo";
import { ApplicationForm } from "@/components/forms";
import { EmptyState } from "@/components/ui";
import { formatSalary, delay } from "@/utils";
import { Skeleton } from "@/components/ui";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const job = jobs.find((j) => j.id === params.id);

  useEffect(() => {
    delay(400).then(() => setIsLoading(false));
  }, []);

  if (!isLoading && !job) {
    return (
      <div className="container-main py-20">
        <EmptyState
          icon={<Briefcase className="h-12 w-12 text-gray-300" />}
          title="Job not found"
          description="This job posting may have been removed or doesn't exist."
          action={{ label: "Browse Jobs", href: "/jobs" }}
        />
      </div>
    );
  }

  if (isLoading || !job) {
    return (
      <div className="container-main py-10">
        <Skeleton className="mb-6 h-6 w-32" />
        <div className="mx-auto max-w-2xl">
          <Skeleton className="mb-4 h-8 w-64" />
          <Skeleton className="mb-2 h-5 w-48" />
          <Skeleton className="mb-8 h-5 w-36" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="container-main">
        {/* Back link */}
        <Link
          href={`/jobs/${job.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Job Details
        </Link>

        <div className="mx-auto max-w-2xl">
          {/* Job summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-6"
          >
            <div className="flex items-start gap-4">
              <CompanyLogo name={job.company} size="lg" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
                <p className="mt-1 text-sm text-gray-600">{job.company}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Application form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Apply for this position
            </h2>
            <ApplicationForm
              job={job}
              onSuccess={() => {
                setTimeout(() => router.push("/dashboard"), 2000);
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
