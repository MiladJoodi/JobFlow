"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, fill out a form, submit a job application, or contact us for support. This may include:

• **Personal Information**: Name, email address, phone number, and professional details
• **Profile Data**: Resume, work history, education, skills, and preferences
• **Application Data**: Job applications, cover letters, and related documents
• **Usage Data**: How you interact with our platform, pages visited, and features used
• **Device Data**: Browser type, IP address, and device identifiers`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our platform and services
• Process job applications and connect job seekers with employers
• Send you notifications about job matches, application updates, and relevant opportunities
• Personalize your experience and provide tailored job recommendations
• Analyze usage patterns to improve our platform
• Protect against fraud and unauthorized access
• Comply with legal obligations`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell your personal information. We may share your data with:

• **Employers**: When you apply for a job, your application materials are shared with the hiring company
• **Service Providers**: Third-party vendors who help us operate our platform (hosting, analytics, email)
• **Legal Requirements**: When required by law, regulation, or legal process
• **Business Transfers**: In connection with a merger, acquisition, or sale of assets

You can control what information employers see through your privacy settings.`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures to protect your personal information, including:

• Encryption of data in transit and at rest
• Regular security audits and penetration testing
• Access controls and authentication mechanisms
• Secure data centers with physical security measures

While we strive to protect your data, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: "5. Your Rights & Choices",
    content: `You have the right to:

• **Access**: Request a copy of your personal data
• **Update**: Correct or update your information at any time
• **Delete**: Request deletion of your account and associated data
• **Export**: Download your data in a portable format
• **Opt-out**: Unsubscribe from marketing communications
• **Restrict**: Limit how we process your data

To exercise these rights, visit your Dashboard settings or contact us at privacy@jobflow.com.`,
  },
  {
    title: "6. Cookies & Tracking",
    content: `We use cookies and similar technologies to:

• Remember your preferences and login status
• Analyze traffic and usage patterns
• Personalize content and job recommendations
• Measure the effectiveness of our features

You can manage cookie preferences through your browser settings. Disabling cookies may affect some platform functionality.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide our services. If you delete your account, we will remove your data within 30 days, except where retention is required by law or for legitimate business purposes such as fraud prevention.`,
  },
  {
    title: "8. Contact Us",
    content: `If you have questions about this Privacy Policy or our data practices, please contact us:

• **Email**: privacy@jobflow.com
• **Mail**: JobFlow Inc., 123 Innovation Way, San Francisco, CA 94102
• **Phone**: +1 (555) 123-4567

We will respond to your inquiry within 30 business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-main py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
              <Shield className="h-7 w-7 text-primary-600" />
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-gray-500">
              Last updated: March 1, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container-main py-12">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6 sm:p-8 mb-6"
          >
            <p className="text-gray-600 leading-relaxed">
              At JobFlow, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our platform. Please read this policy
              carefully to understand our views and practices regarding your
              personal data.
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="card p-6 sm:p-8"
              >
                <h2 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h2>
                <div className="mt-4 whitespace-pre-line text-sm text-gray-600 leading-relaxed">
                  {section.content.split("**").map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-gray-800">
                        {part}
                      </strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
