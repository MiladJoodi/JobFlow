"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for small businesses hiring occasionally.",
    features: [
      "1 active job post",
      "Basic analytics",
      "Email support",
      "Standard listing visibility",
      "30-day posting duration",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/mo",
    description: "For growing teams with regular hiring needs.",
    features: [
      "10 active job posts",
      "Advanced analytics & reporting",
      "Priority email & chat support",
      "Featured listings",
      "60-day posting duration",
      "Candidate recommendations",
      "Company profile page",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/mo",
    description: "For large organizations with high-volume hiring.",
    features: [
      "Unlimited job posts",
      "Custom branding & themes",
      "Dedicated account manager",
      "API access & integrations",
      "90-day posting duration",
      "Advanced candidate filtering",
      "Priority placement in search",
      "Team collaboration tools",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate takes effect at the start of your next billing period.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Absolutely! Both the Professional and Enterprise plans come with a 14-day free trial. No credit card is required to start your trial. You'll have full access to all features during the trial period.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), as well as PayPal and bank transfers for Enterprise plans. All payments are processed securely through Stripe.",
  },
  {
    question: "What happens when my job posting expires?",
    answer:
      "When a job posting reaches its duration limit, it will be automatically archived. You can renew it at any time from your dashboard. All applicant data and analytics are preserved even after a posting expires.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
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
              Simple, Transparent{" "}
              <span className="text-primary-200">Pricing</span>
            </h1>
            <p className="mt-4 text-lg text-primary-100 sm:text-xl">
              Choose the plan that fits your hiring needs. No hidden fees, no
              surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 -mt-10 pb-16 sm:-mt-12 sm:pb-20">
        <div className="container-main">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-3"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                className={`relative rounded-xl border p-6 shadow-sm transition-all sm:p-8 ${
                  tier.highlighted
                    ? "border-primary-600 bg-primary-50 shadow-md ring-1 ring-primary-600"
                    : "border-gray-100 bg-white"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-sm text-gray-500">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {tier.description}
                  </p>
                </div>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          tier.highlighted
                            ? "text-primary-600"
                            : "text-green-500"
                        }`}
                      />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href="/post-job"
                    className={`block w-full text-center ${
                      tier.highlighted ? "btn-primary" : "btn-secondary"
                    } py-3`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50/50 py-16 sm:py-20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Everything you need to know about our pricing and plans.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-12 max-w-2xl space-y-4"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card overflow-hidden p-0"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="pr-4 text-sm font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-4 text-sm text-gray-500">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
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
              Ready to Start Hiring?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              Post your first job for free and see the results for yourself.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/post-job"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-all hover:bg-primary-50"
              >
                Post a Job Free
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Browse Jobs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
