"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Search,
  FileText,
  Users2,
  Building,
  Phone,
  Code,
  MessageCircle,
  UsersRound,
  ClipboardCheck,
  CheckCircle2,
  Lightbulb,
  Clock,
  Shirt,
  MapPin,
  Smile,
} from "lucide-react";

const preparationTips = [
  {
    icon: Search,
    title: "Research the Company",
    description:
      "Study the company's mission, values, recent news, and products. Understanding their culture and goals shows genuine interest and helps you tailor your responses.",
  },
  {
    icon: FileText,
    title: "Review the Job Description",
    description:
      "Identify key requirements and prepare specific examples from your experience that demonstrate each skill. Map your qualifications to their needs.",
  },
  {
    icon: Users2,
    title: "Practice with Mock Interviews",
    description:
      "Rehearse your answers out loud with a friend or in front of a mirror. Practice helps reduce anxiety and improves the clarity of your responses.",
  },
  {
    icon: ClipboardCheck,
    title: "Prepare Your Questions",
    description:
      "Have 3-5 thoughtful questions ready for the interviewer about the role, team, and company direction. This demonstrates your engagement and forward thinking.",
  },
];

const interviewQuestions = [
  {
    question: "Tell me about yourself",
    answer:
      "Structure your answer using the Present-Past-Future formula. Start with your current role and responsibilities, briefly mention relevant past experience, and end with why you are excited about this opportunity. Keep it under 2 minutes and focus on professional highlights that relate to the position.",
  },
  {
    question: "What are your strengths?",
    answer:
      "Choose 2-3 strengths that are directly relevant to the job. For each, provide a specific example demonstrating how you have used that strength to achieve a positive result. Use the STAR method (Situation, Task, Action, Result) to structure your examples concisely.",
  },
  {
    question: "Why do you want this job?",
    answer:
      "Connect your career goals to the company's mission and the specific role. Mention what excites you about the company's products, culture, or growth trajectory. Show that you have done your research and explain how this position aligns with your professional development path.",
  },
  {
    question: "Where do you see yourself in 5 years?",
    answer:
      "Show ambition while being realistic. Express your desire to grow within the company, take on more responsibility, and develop expertise in your field. Avoid mentioning specific titles; instead, focus on skills you want to develop and the impact you hope to make.",
  },
  {
    question: "Describe a challenging situation you overcame",
    answer:
      "Use the STAR method: describe the Situation and context, explain your specific Task or role, detail the Actions you took to address the challenge, and share the measurable Results. Choose a professional example that demonstrates problem-solving, resilience, or leadership.",
  },
  {
    question: "Why should we hire you?",
    answer:
      "Summarize your unique value proposition by highlighting 2-3 key qualifications that set you apart. Reference specific achievements that demonstrate your ability to deliver results. Connect your skills directly to the challenges and goals outlined in the job description.",
  },
  {
    question: "What's your expected salary?",
    answer:
      "Research market rates for the role using sites like Glassdoor or Levels.fyi before the interview. Provide a range rather than a specific number, and emphasize that you are flexible and open to discussing total compensation including benefits, equity, and growth opportunities.",
  },
  {
    question: "Do you have any questions for us?",
    answer:
      "Always say yes. Ask about the team's current challenges, what success looks like in the first 90 days, the company's growth plans, or the team culture. Avoid asking about salary or benefits in early rounds. Good questions show genuine interest and help you evaluate if the role is right for you.",
  },
];

const interviewTypes = [
  {
    icon: Phone,
    title: "Phone Screen",
    description:
      "Usually 15-30 minutes with a recruiter. Covers your background, salary expectations, and availability.",
    tips: [
      "Find a quiet location with good reception",
      "Have your resume and notes in front of you",
      "Speak clearly and smile - it affects your tone",
    ],
  },
  {
    icon: Code,
    title: "Technical Interview",
    description:
      "Tests your technical skills through coding challenges, system design questions, or domain-specific problems.",
    tips: [
      "Think out loud and explain your approach",
      "Ask clarifying questions before coding",
      "Practice on platforms like LeetCode or HackerRank",
    ],
  },
  {
    icon: MessageCircle,
    title: "Behavioral Interview",
    description:
      "Focuses on past experiences and how you handled specific situations using the STAR method.",
    tips: [
      "Prepare 8-10 STAR stories from your experience",
      "Cover teamwork, conflict, leadership, and failure",
      "Be honest and reflective about lessons learned",
    ],
  },
  {
    icon: UsersRound,
    title: "Panel Interview",
    description:
      "Multiple interviewers ask questions simultaneously. Demonstrates how you handle pressure and group dynamics.",
    tips: [
      "Make eye contact with all panel members",
      "Address each person by name when responding",
      "Direct your answer to the person who asked but include others",
    ],
  },
];

const dayOfChecklist = [
  { icon: Shirt, label: "Dress professionally and appropriately for the company culture" },
  { icon: FileText, label: "Bring extra copies of your resume and a notepad" },
  { icon: MapPin, label: "Arrive 10-15 minutes early or test your video setup" },
  { icon: Smile, label: "Greet everyone you meet with a smile and firm handshake" },
  { icon: Clock, label: "Turn off your phone and eliminate distractions" },
  { icon: Lightbulb, label: "Take a moment to breathe and center yourself before entering" },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function InterviewPrepPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const toggleCheckItem = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
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
            <Building className="h-7 w-7 text-primary-600" />
            Interview Preparation Guide
          </h1>
          <p className="section-subtitle">
            Ace your next interview with these proven strategies
          </p>
        </motion.div>

        {/* Before the Interview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Before the Interview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Essential preparation steps to set yourself up for success
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          {preparationTips.map((tip) => (
            <motion.div
              key={tip.title}
              variants={itemVariants}
              className="card hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                <tip.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Common Interview Questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Common Interview Questions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Click on each question to reveal a sample answer and tips
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 space-y-3"
        >
          {interviewQuestions.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card overflow-hidden p-0"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary-600">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">
                    &ldquo;{item.question}&rdquo;
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                    openQuestion === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openQuestion === index ? "auto" : 0,
                  opacity: openQuestion === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
                  <div className="flex gap-3">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interview Types */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Interview Types
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Understand the different formats and how to prepare for each
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          {interviewTypes.map((type) => (
            <motion.div
              key={type.title}
              variants={itemVariants}
              className="card hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                <type.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{type.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {type.description}
              </p>
              <ul className="mt-3 space-y-1.5">
                {type.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span className="text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Day of Interview Checklist */}
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
                Day of Interview Checklist
              </h2>
              <p className="mt-2 text-primary-100">
                Make sure you have everything covered before you head out
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-2xl space-y-3">
              {dayOfChecklist.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => toggleCheckItem(index)}
                  className="flex w-full items-center gap-4 rounded-lg bg-white/10 px-5 py-4 text-left backdrop-blur-sm transition-all hover:bg-white/15"
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                      checkedItems.has(index)
                        ? "border-white bg-white"
                        : "border-white/50"
                    }`}
                  >
                    {checkedItems.has(index) && (
                      <CheckCircle2 className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                  <item.icon className="h-5 w-5 shrink-0 text-primary-200" />
                  <span
                    className={`text-sm font-medium transition-all ${
                      checkedItems.has(index)
                        ? "text-primary-200 line-through"
                        : "text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {checkedItems.size === dayOfChecklist.length && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 text-center text-lg font-semibold text-white"
              >
                You&apos;re all set! Go ace that interview!
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
