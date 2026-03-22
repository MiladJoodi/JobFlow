"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Lightbulb,
  MessageSquare,
  Award,
  Compass,
  Clock,
  ArrowRight,
  Mail,
  BookOpen,
} from "lucide-react";

const articles = [
  {
    icon: Target,
    title: "How to Stand Out in a Competitive Job Market",
    description:
      "Learn proven strategies to differentiate yourself from other candidates. From crafting a unique value proposition to leveraging your network effectively.",
    readTime: "5 min read",
  },
  {
    icon: TrendingUp,
    title: "Negotiating Your Salary: A Complete Guide",
    description:
      "Master the art of salary negotiation with data-driven techniques. Understand your market value and confidently advocate for fair compensation.",
    readTime: "8 min read",
  },
  {
    icon: Lightbulb,
    title: "Building a Personal Brand in Tech",
    description:
      "Discover how to build an authentic personal brand that attracts opportunities. Create a consistent online presence that showcases your expertise.",
    readTime: "6 min read",
  },
  {
    icon: MessageSquare,
    title: "Remote Work Best Practices",
    description:
      "Thrive in a remote work environment with practical tips for productivity. Set up an effective home office and maintain work-life balance.",
    readTime: "4 min read",
  },
  {
    icon: Award,
    title: "Career Transitions: Making the Leap",
    description:
      "Successfully pivot your career with a strategic approach. Identify transferable skills and build a roadmap for your new professional chapter.",
    readTime: "7 min read",
  },
  {
    icon: Compass,
    title: "Networking Strategies That Actually Work",
    description:
      "Build meaningful professional relationships that open doors. Move beyond superficial connections to create a network that supports your growth.",
    readTime: "5 min read",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CareerAdvicePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary-600" />
            Career Advice
          </h1>
          <p className="section-subtitle">
            Expert tips to help you grow your career
          </p>
        </motion.div>

        {/* Article Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <motion.div
              key={article.title}
              variants={itemVariants}
              className="card group hover:shadow-md hover:border-gray-200"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                <article.icon className="h-6 w-6 text-primary-600" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {article.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {article.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>

                <a
                  href="#"
                  className="btn-ghost inline-flex items-center gap-1 px-3 py-1.5 text-xs text-primary-600 hover:text-primary-700"
                >
                  Read More
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-12 text-center sm:px-12"
        >
          <div className="mx-auto max-w-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Get Career Tips in Your Inbox
            </h2>
            <p className="mt-2 text-primary-100">
              Subscribe to our newsletter for weekly career advice, job market
              insights, and exclusive content.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 rounded-lg bg-white/10 px-6 py-4"
              >
                <p className="font-semibold text-white">
                  Thanks for subscribing!
                </p>
                <p className="mt-1 text-sm text-primary-100">
                  You&apos;ll receive our next newsletter soon.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-primary-200 backdrop-blur-sm transition-all focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 sm:max-w-xs"
                />
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-all hover:bg-primary-50"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
