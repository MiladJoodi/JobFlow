import Link from "next/link";
import { Briefcase, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  "For Job Seekers": [
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/companies", label: "Companies" },
    { href: "/dashboard", label: "Dashboard" },
  ],
  "For Employers": [
    { href: "/post-job", label: "Post a Job" },
    { href: "/pricing", label: "Pricing" },
    { href: "/employer-dashboard", label: "Employer Dashboard" },
  ],
  Resources: [
    { href: "/career-advice", label: "Career Advice" },
    { href: "/resume-tips", label: "Resume Tips" },
    { href: "/interview-prep", label: "Interview Prep" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container-main py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Job<span className="text-primary-600">Flow</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Find your dream job at top companies worldwide.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} JobFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
