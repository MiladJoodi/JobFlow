"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Loader2,
  Headphones,
  Building2,
} from "lucide-react";
import { delay } from "@/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@jobflow.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+1 (555) 123-4567",
    sub: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "123 Innovation Way",
    sub: "San Francisco, CA 94102",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon - Fri, 9:00 - 18:00",
    sub: "Weekend support via email",
  },
];

const faqItems = [
  {
    q: "How do I reset my password?",
    a: "Click 'Forgot Password' on the login page. You'll receive an email with instructions to reset your password.",
  },
  {
    q: "How can I delete my account?",
    a: "Go to Dashboard > Settings > Account and click 'Delete Account'. This action is permanent.",
  },
  {
    q: "How do I report a suspicious job posting?",
    a: "Click the 'Report' button on any job listing, or email us at safety@jobflow.com with the job details.",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    await delay(1500);
    setIsSubmitting(false);
    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-main py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
              <MessageSquare className="h-7 w-7 text-primary-600" />
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
              Get in Touch
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-gray-500">
              Have a question, feedback, or need help? We&apos;d love to hear
              from you. Reach out and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-main py-12">
        {/* Contact info cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-5 text-center"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <item.icon className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {item.detail}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Form + FAQ */}
        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 sm:p-8 lg:col-span-3"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Send us a message
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    {...register("name")}
                    className="input-field"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="input-field"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  {...register("subject")}
                  className="input-field"
                  placeholder="How can we help?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Tell us more about your question..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* FAQ sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="card p-6">
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-primary-600" />
                <h3 className="text-base font-semibold text-gray-900">
                  Quick Help
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                {faqItems.map((item) => (
                  <div key={item.q}>
                    <p className="text-sm font-medium text-gray-900">
                      {item.q}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary-600" />
                <h3 className="text-base font-semibold text-gray-900">
                  For Employers
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Interested in posting jobs or enterprise plans? Contact our
                sales team for personalized support.
              </p>
              <p className="mt-3 text-sm font-medium text-primary-600">
                sales@jobflow.com
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
