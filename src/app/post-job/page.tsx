"use client";

import { motion } from "framer-motion";
import { Users, Zap, BarChart3, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const jobPostSchema = z.object({
  jobTitle: z.string().min(3, "Job title must be at least 3 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  jobType: z.string().min(1, "Please select a job type"),
  experienceLevel: z.string().min(1, "Please select an experience level"),
  salaryMin: z
    .string()
    .min(1, "Minimum salary is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Must be a valid number"),
  salaryMax: z
    .string()
    .min(1, "Maximum salary is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Must be a valid number"),
  jobDescription: z
    .string()
    .min(50, "Job description must be at least 50 characters"),
  requirements: z
    .string()
    .min(20, "Requirements must be at least 20 characters"),
});

type JobPostFormData = z.infer<typeof jobPostSchema>;

const benefits = [
  {
    icon: Users,
    title: "Reach Top Talent",
    description:
      "Access a pool of 50,000+ qualified candidates actively looking for their next opportunity.",
  },
  {
    icon: Zap,
    title: "Fast Hiring",
    description:
      "Our smart matching algorithm connects you with the right candidates in hours, not weeks.",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description:
      "Track views, applications, and engagement with detailed analytics for every listing.",
  },
];

const jobTypes = [
  { value: "", label: "Select job type" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

const experienceLevels = [
  { value: "", label: "Select experience level" },
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead / Manager" },
  { value: "executive", label: "Executive" },
];

export default function PostJobPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
  });

  const onSubmit = async (data: JobPostFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Job posted successfully! Your listing is now live.", {
      description: `"${data.jobTitle}" at ${data.companyName} has been published.`,
    });
    reset();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 sm:py-24">
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
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Post a Job &{" "}
              <span className="text-primary-200">Find Top Talent</span>
            </h1>
            <p className="mt-4 text-lg text-primary-100 sm:text-xl">
              Reach thousands of qualified candidates and fill your positions
              faster with JobFlow&apos;s powerful hiring platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-3xl"
          >
            <div className="card p-6 sm:p-8">
              <h2 className="section-title">Job Details</h2>
              <p className="section-subtitle mb-8">
                Fill in the details below to create your job listing.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Job Title & Company Name */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("jobTitle")}
                      type="text"
                      placeholder="e.g. Senior Frontend Developer"
                      className="input-field"
                    />
                    {errors.jobTitle && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.jobTitle.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("companyName")}
                      type="text"
                      placeholder="e.g. Acme Corp"
                      className="input-field"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("location")}
                    type="text"
                    placeholder="e.g. San Francisco, CA or Remote"
                    className="input-field"
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Job Type & Experience Level */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Job Type <span className="text-red-500">*</span>
                    </label>
                    <select {...register("jobType")} className="input-field">
                      {jobTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.jobType && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.jobType.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Experience Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("experienceLevel")}
                      className="input-field"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                    {errors.experienceLevel && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.experienceLevel.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Salary Range (USD/year){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register("salaryMin")}
                        type="text"
                        placeholder="Min (e.g. 80000)"
                        className="input-field"
                      />
                      {errors.salaryMin && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.salaryMin.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("salaryMax")}
                        type="text"
                        placeholder="Max (e.g. 120000)"
                        className="input-field"
                      />
                      {errors.salaryMax && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.salaryMax.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("jobDescription")}
                    rows={6}
                    placeholder="Describe the role, responsibilities, and what a typical day looks like..."
                    className="input-field resize-none"
                  />
                  {errors.jobDescription && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.jobDescription.message}
                    </p>
                  )}
                </div>

                {/* Requirements */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("requirements")}
                    rows={4}
                    placeholder="List the skills, qualifications, and experience needed..."
                    className="input-field resize-none"
                  />
                  {errors.requirements && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.requirements.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-8 py-3 text-base disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Publish Job
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Post on JobFlow */}
      <section className="bg-gray-50/50 py-16 sm:py-20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="section-title">Why Post on JobFlow?</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Join hundreds of companies that trust JobFlow to find their next
              great hire.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  <benefit.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
