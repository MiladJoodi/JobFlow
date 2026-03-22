export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  founded: number;
  headquarters: string;
  website: string;
  description: string;
  culture: string;
  benefits: string[];
  techStack: string[];
  openPositions: number;
  rating: number;
  reviewCount: number;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  company: string;
  companyLogo: string;
  location: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  tags: string[];
  postedAt: string;
  deadline: string;
  isRemote: boolean;
  isUrgent: boolean;
  isFeatured: boolean;
  applicants: number;
}

export type JobType = "full-time" | "part-time" | "contract" | "internship" | "freelance";
export type ExperienceLevel = "entry" | "mid" | "senior" | "lead" | "executive";
export type ApplicationStatus = "pending" | "reviewing" | "interview" | "accepted" | "rejected";
export type SortOption = "latest" | "salary-high" | "salary-low" | "relevance";

export interface Application {
  id: string;
  jobId: string;
  job: Job;
  appliedAt: string;
  status: ApplicationStatus;
  name: string;
  email: string;
  coverLetter?: string;
  resumeFileName?: string;
}

export interface SearchFilters {
  query: string;
  location: string;
  jobType: JobType[];
  experienceLevel: ExperienceLevel[];
  salaryMin: number;
  salaryMax: number;
  isRemote: boolean | null;
  sortBy: SortOption;
}

export interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: FileList | null;
}
