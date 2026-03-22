"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  FileText,
  Upload,
  CheckCircle2,
  Send,
  Loader2,
} from "lucide-react";
import { Job } from "@/types";
import { useUserStore } from "@/store";
import { delay } from "@/utils";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s\-+()]+$/, "Please enter a valid phone number"),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters")
    .max(2000, "Cover letter must be under 2000 characters"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  job: Job;
  onSuccess?: () => void;
}

export function ApplicationForm({ job, onSuccess }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const { user, applyToJob, hasApplied } = useUserStore();

  const alreadyApplied = hasApplied(job.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      coverLetter: "",
    },
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);

    // Simulate API delay
    await delay(1500);

    applyToJob(job, data.name, data.email, data.coverLetter, resumeFile || undefined);

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Application submitted successfully!", {
      description: `Your application for ${job.title} at ${job.company} has been sent.`,
    });
    onSuccess?.();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Resume must be under 5MB",
        });
        return;
      }
      setResumeFile(file.name);
      toast.success("Resume uploaded", { description: file.name });
    }
  };

  if (alreadyApplied) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-blue-100 bg-blue-50 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-blue-500" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          Already Applied
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          You&apos;ve already submitted your application for this position.
          Check your dashboard for status updates.
        </p>
      </motion.div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-green-100 bg-green-50 p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        >
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        </motion.div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">
          Application Submitted!
        </h3>
        <p className="mt-2 text-gray-600">
          Your application for <strong>{job.title}</strong> at{" "}
          <strong>{job.company}</strong> has been received. We&apos;ll notify you
          of any updates.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
          <User className="h-4 w-4" />
          Full Name
        </label>
        <input
          {...register("name")}
          className="input-field"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
          <Mail className="h-4 w-4" />
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          className="input-field"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
          <Phone className="h-4 w-4" />
          Phone Number
        </label>
        <input
          {...register("phone")}
          type="tel"
          className="input-field"
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Resume upload */}
      <div>
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText className="h-4 w-4" />
          Resume
        </label>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 py-6 transition-colors hover:border-primary-300 hover:bg-primary-50">
          <Upload className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">
            {resumeFile || "Upload your resume (PDF, DOC - max 5MB)"}
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Cover Letter */}
      <div>
        <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText className="h-4 w-4" />
          Cover Letter
        </label>
        <textarea
          {...register("coverLetter")}
          rows={5}
          className="input-field resize-none"
          placeholder="Tell us why you're a great fit for this role..."
        />
        {errors.coverLetter && (
          <p className="mt-1 text-sm text-red-500">
            {errors.coverLetter.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Application
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
