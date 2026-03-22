"use client";

import { useMemo } from "react";
import { Job, SearchFilters } from "@/types";

export function useFilteredJobs(jobs: Job[], filters: SearchFilters): Job[] {
  return useMemo(() => {
    let filtered = [...jobs];

    // Search query
    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          job.description.toLowerCase().includes(q)
      );
    }

    // Location
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(loc)
      );
    }

    // Job type
    if (filters.jobType.length > 0) {
      filtered = filtered.filter((job) => filters.jobType.includes(job.type));
    }

    // Experience level
    if (filters.experienceLevel.length > 0) {
      filtered = filtered.filter((job) =>
        filters.experienceLevel.includes(job.experienceLevel)
      );
    }

    // Salary range
    if (filters.salaryMin > 0) {
      filtered = filtered.filter((job) => job.salaryMax >= filters.salaryMin);
    }
    if (filters.salaryMax < 300000) {
      filtered = filtered.filter((job) => job.salaryMin <= filters.salaryMax);
    }

    // Remote
    if (filters.isRemote !== null) {
      filtered = filtered.filter((job) => job.isRemote === filters.isRemote);
    }

    // Sorting
    switch (filters.sortBy) {
      case "latest":
        filtered.sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
        break;
      case "salary-high":
        filtered.sort((a, b) => b.salaryMax - a.salaryMax);
        break;
      case "salary-low":
        filtered.sort((a, b) => a.salaryMin - b.salaryMin);
        break;
      case "relevance":
        filtered.sort((a, b) => {
          const score = (job: Job) =>
            (job.isFeatured ? 10 : 0) +
            (job.isUrgent ? 5 : 0) +
            job.applicants * 0.01;
          return score(b) - score(a);
        });
        break;
    }

    return filtered;
  }, [jobs, filters]);
}
