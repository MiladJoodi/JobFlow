"use client";

import { motion } from "framer-motion";
import {
  Target,
  Heart,
  Users,
  Globe,
  Award,
  Zap,
  Briefcase,
  TrendingUp,
  Linkedin,
  Github,
} from "lucide-react";

const stats = [
  { label: "Jobs Posted", value: "10,000+", icon: Briefcase },
  { label: "Companies", value: "500+", icon: Globe },
  { label: "Successful Hires", value: "25,000+", icon: Award },
  { label: "Countries", value: "30+", icon: TrendingUp },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We believe everyone deserves access to meaningful work. Our platform connects talent with opportunity, regardless of background or location.",
  },
  {
    icon: Heart,
    title: "People First",
    description:
      "We put job seekers and employers at the center of everything we do. Every feature is designed to make the hiring process more human.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We continuously improve our platform with cutting-edge technology to make job searching and hiring faster, smarter, and more efficient.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We foster a supportive community where professionals can grow, learn, and connect with like-minded individuals and companies.",
  },
];

const team = [
  { name: "Sarah Chen", role: "CEO & Co-Founder", initials: "SC" },
  { name: "Marcus Rivera", role: "CTO & Co-Founder", initials: "MR" },
  { name: "Emily Watson", role: "Head of Product", initials: "EW" },
  { name: "David Kim", role: "Head of Engineering", initials: "DK" },
  { name: "Lisa Johnson", role: "Head of Design", initials: "LJ" },
  { name: "James Park", role: "Head of Marketing", initials: "JP" },
];

const COLORS = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-violet-500",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-main py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About <span className="text-primary-600">JobFlow</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              We&apos;re on a mission to make hiring simpler, faster, and more
              transparent for everyone. Founded in 2023, JobFlow connects
              talented professionals with innovative companies worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-main -mt-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card flex items-center gap-3 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                <stat.icon className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="container-main py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 sm:p-10"
        >
          <h2 className="section-title">Our Story</h2>
          <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
            <p>
              JobFlow was born from a simple frustration: the hiring process was
              broken. Job seekers spent hours filling out repetitive
              applications, while employers struggled to find the right
              candidates among thousands of resumes.
            </p>
            <p>
              We set out to build a platform that treats both sides of the
              hiring equation with equal respect. Our intelligent matching
              system, clean user experience, and transparent application
              tracking have helped tens of thousands of people find meaningful
              work.
            </p>
            <p>
              Today, JobFlow serves companies ranging from startups to Fortune
              500 enterprises across 30+ countries. We&apos;re proud to be part
              of so many career journeys and continue to innovate every day.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-center">Our Values</h2>
            <p className="section-subtitle text-center">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                  <value.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-main py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center">Meet the Team</h2>
          <p className="section-subtitle text-center">
            The people behind JobFlow
          </p>
        </motion.div>
        <div className="mt-10 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card p-5 text-center"
            >
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white font-bold text-lg ${COLORS[i % COLORS.length]}`}
              >
                {member.initials}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-0.5 text-xs text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white">
              Join Our Mission
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-100">
              We&apos;re always looking for passionate people to join our team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/MiladJoodi/JobFlow"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-all"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/joodi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
