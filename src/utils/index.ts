import { ExperienceLevel, JobType, ApplicationStatus } from "@/types";

export function formatSalary(min: number, max: number, currency: string = "USD"): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return `${formatter.format(min)} - ${formatter.format(max)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function formatJobType(type: JobType): string {
  const map: Record<JobType, string> = {
    "full-time": "Full Time",
    "part-time": "Part Time",
    contract: "Contract",
    internship: "Internship",
    freelance: "Freelance",
  };
  return map[type];
}

export function formatExperienceLevel(level: ExperienceLevel): string {
  const map: Record<ExperienceLevel, string> = {
    entry: "Entry Level",
    mid: "Mid Level",
    senior: "Senior",
    lead: "Lead",
    executive: "Executive",
  };
  return map[level];
}

export function formatApplicationStatus(status: ApplicationStatus): string {
  const map: Record<ApplicationStatus, string> = {
    pending: "Pending",
    reviewing: "Under Review",
    interview: "Interview",
    accepted: "Accepted",
    rejected: "Rejected",
  };
  return map[status];
}

export function getStatusColor(status: ApplicationStatus): string {
  const map: Record<ApplicationStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewing: "bg-blue-100 text-blue-800",
    interview: "bg-purple-100 text-purple-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return map[status];
}

export function getJobTypeColor(type: JobType): string {
  const map: Record<JobType, string> = {
    "full-time": "bg-emerald-100 text-emerald-700",
    "part-time": "bg-sky-100 text-sky-700",
    contract: "bg-amber-100 text-amber-700",
    internship: "bg-violet-100 text-violet-700",
    freelance: "bg-rose-100 text-rose-700",
  };
  return map[type];
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Chicago, IL",
  "Boston, MA",
  "Denver, CO",
  "Los Angeles, CA",
  "Portland, OR",
  "Miami, FL",
  "London, UK",
  "Berlin, Germany",
  "Toronto, Canada",
  "Remote",
];
