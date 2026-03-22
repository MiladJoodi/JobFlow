"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Search } from "lucide-react";
import { jobs } from "@/data/jobs";
import { useJobStore, useUserStore } from "@/store";
import { useFilteredJobs } from "@/hooks";
import { SearchBar, EmptyState, JobCardSkeleton } from "@/components/ui";
import { JobCard } from "@/components/jobs";
import { FilterSidebar } from "@/components/jobs/FilterSidebar";
import { SortOption } from "@/types";
import { delay } from "@/utils";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Latest", value: "latest" },
  { label: "Highest Salary", value: "salary-high" },
  { label: "Lowest Salary", value: "salary-low" },
  { label: "Most Relevant", value: "relevance" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function JobsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const { filters, setQuery, setLocation, setSortBy } = useJobStore();
  const { savedJobIds, toggleSaveJob } = useUserStore();

  const filteredJobs = useFilteredJobs(jobs, filters);

  useEffect(() => {
    const load = async () => {
      await delay(500);
      setIsLoading(false);
    };
    load();
  }, []);

  const handleSearch = (query: string, location: string) => {
    setQuery(query);
    setLocation(location);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Find Your Next Role
          </h1>
          <p className="text-gray-500 mb-5">
            Discover opportunities that match your skills and ambitions
          </p>
          <SearchBar
            size="md"
            onSearch={handleSearch}
            defaultQuery={filters.query}
            defaultLocation={filters.location}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Toolbar: results count, sort, mobile filter toggle */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {isLoading ? "..." : filteredJobs.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">{jobs.length}</span>{" "}
            jobs
          </p>

          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="hidden sm:block text-sm text-gray-500"
              >
                Sort by:
              </label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setFilterOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Two-column layout: sidebar + job grid */}
        <div className="flex gap-6">
          {/* Desktop filter sidebar */}
          <FilterSidebar
            isOpen={true}
            onClose={() => {}}
          />

          {/* Mobile filter overlay */}
          <FilterSidebar
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
            isMobile
          />

          {/* Job cards area */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              /* Skeleton loading state */
              <div className="flex flex-col gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              /* Empty state */
              <EmptyState
                icon={<Search className="h-12 w-12" />}
                title="No jobs found"
                description="Try adjusting your filters or search terms to discover more opportunities."
                action={{ label: "Reset Filters", href: "/jobs" }}
              />
            ) : (
              /* Job cards grid with staggered animation */
              <AnimatePresence mode="wait">
                <motion.div
                  key={filters.sortBy + filters.query + filters.location}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-4"
                >
                  {filteredJobs.map((job) => (
                    <motion.div key={job.id} variants={itemVariants}>
                      <JobCard
                        job={job}
                        isSaved={savedJobIds.includes(job.id)}
                        onSave={toggleSaveJob}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
