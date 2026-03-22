"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Download,
  Check,
  Sparkles,
  Palette,
  Layout,
  AlignLeft,
} from "lucide-react";

const tips = [
  {
    number: 1,
    title: "Tailor Your Resume for Each Job",
    description:
      "Customize your resume to match the specific requirements of each position. Highlight the skills and experiences that are most relevant to the role you are applying for.",
  },
  {
    number: 2,
    title: "Use Action Verbs",
    description:
      "Start each bullet point with strong action verbs like 'Led', 'Developed', 'Implemented', or 'Optimized'. This makes your accomplishments sound more impactful and dynamic.",
  },
  {
    number: 3,
    title: "Quantify Your Achievements",
    description:
      "Use numbers and percentages to demonstrate your impact. Instead of 'improved sales', write 'increased sales by 35% over 6 months'.",
  },
  {
    number: 4,
    title: "Keep It Concise",
    description:
      "Aim for one page if you have less than 10 years of experience. Recruiters spend an average of 7 seconds scanning a resume, so make every word count.",
  },
  {
    number: 5,
    title: "Include Relevant Keywords",
    description:
      "Many companies use ATS (Applicant Tracking Systems) to filter resumes. Include keywords from the job description to ensure your resume passes automated screening.",
  },
  {
    number: 6,
    title: "Professional Formatting",
    description:
      "Use consistent fonts, proper spacing, and clear section headers. A clean, well-organized layout makes your resume easy to read and shows attention to detail.",
  },
  {
    number: 7,
    title: "Proofread Everything",
    description:
      "Spelling and grammar errors can immediately disqualify you. Read your resume multiple times and ask someone else to review it before submitting.",
  },
  {
    number: 8,
    title: "Add a Strong Summary",
    description:
      "Open with a 2-3 sentence professional summary that captures your key qualifications. This gives recruiters an immediate snapshot of your value proposition.",
  },
];

const resumeSections = [
  {
    icon: User,
    title: "Contact Info",
    guidance:
      "Include your full name, professional email, phone number, LinkedIn URL, and city/state. Skip your full address for privacy.",
  },
  {
    icon: AlignLeft,
    title: "Summary",
    guidance:
      "Write a concise 2-3 sentence overview of your professional background, key skills, and career goals tailored to the target role.",
  },
  {
    icon: Briefcase,
    title: "Experience",
    guidance:
      "List positions in reverse chronological order. Include company name, title, dates, and 3-5 bullet points per role focusing on achievements, not duties.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    guidance:
      "Include degree, institution, graduation year, and relevant honors. Add GPA only if it is 3.5 or higher and you graduated recently.",
  },
  {
    icon: Code,
    title: "Skills",
    guidance:
      "Group skills by category such as technical, languages, and tools. Prioritize skills mentioned in the job description and be honest about proficiency levels.",
  },
  {
    icon: FolderOpen,
    title: "Projects",
    guidance:
      "Showcase 2-3 relevant personal or professional projects. Include the tech stack, your role, and measurable outcomes or results.",
  },
];

const templates = [
  {
    name: "Modern",
    icon: Sparkles,
    description:
      "Clean layout with a sidebar, skill bars, and a modern color accent. Perfect for tech and creative roles.",
    color: "bg-primary-50 text-primary-600",
  },
  {
    name: "Classic",
    icon: Layout,
    description:
      "Traditional single-column format with clear section dividers. Ideal for corporate and finance positions.",
    color: "bg-gray-100 text-gray-600",
  },
  {
    name: "Creative",
    icon: Palette,
    description:
      "Bold design with custom typography and visual elements. Great for design, marketing, and media roles.",
    color: "bg-purple-50 text-purple-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ResumeTipsPage() {
  const [downloadedTemplate, setDownloadedTemplate] = useState<string | null>(
    null
  );

  const handleDownload = (templateName: string) => {
    setDownloadedTemplate(templateName);
    setTimeout(() => setDownloadedTemplate(null), 3000);
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
            <FileText className="h-7 w-7 text-primary-600" />
            Resume Tips & Templates
          </h1>
          <p className="section-subtitle">
            Craft the perfect resume that gets you hired
          </p>
        </motion.div>

        {/* Key Resume Tips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Key Resume Tips
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Follow these essential guidelines to create a standout resume
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 space-y-4"
        >
          {tips.map((tip) => (
            <motion.div
              key={tip.number}
              variants={itemVariants}
              className="card flex gap-4 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                {tip.number}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  {tip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Resume Sections Guide */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Resume Sections Guide
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            What to include in each section of your resume
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {resumeSections.map((section) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="card hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <section.icon className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="mt-3 font-semibold text-gray-900">
                {section.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {section.guidance}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Download Templates CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-12 sm:px-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Download Resume Templates
              </h2>
              <p className="mt-2 text-primary-100">
                Choose a professionally designed template and start building
                your resume today
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {templates.map((template) => (
                <motion.div
                  key={template.name}
                  whileHover={{ y: -4 }}
                  className="rounded-xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${template.color}`}
                  >
                    <template.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {template.description}
                  </p>
                  <button
                    onClick={() => handleDownload(template.name)}
                    className="btn-primary mt-4 w-full"
                  >
                    {downloadedTemplate === template.name ? (
                      <>
                        <Check className="h-4 w-4" />
                        Downloaded!
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download {template.name}
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
