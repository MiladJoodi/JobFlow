"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { useJobStore } from "@/store";
import { JobType, ExperienceLevel } from "@/types";
import { formatJobType, formatExperienceLevel, cn } from "@/utils";

const jobTypes: JobType[] = ["full-time", "part-time", "contract", "internship", "freelance"];
const experienceLevels: ExperienceLevel[] = ["entry", "mid", "senior", "lead", "executive"];

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({ isOpen, onClose, isMobile = false }: FilterSidebarProps) {
  const {
    filters,
    toggleJobType,
    toggleExperienceLevel,
    setSalaryRange,
    setRemote,
    resetFilters,
  } = useJobStore();

  const filterContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              resetFilters();
            }}
            className="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
          {isMobile && (
            <button
              onClick={onClose}
              className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Remote toggle */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Work Style</h4>
        <div className="flex gap-2">
          {[
            { label: "All", value: null },
            { label: "Remote", value: true },
            { label: "On-site", value: false },
          ].map((option) => (
            <button
              key={String(option.value)}
              onClick={() => setRemote(option.value)}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-all",
                filters.isRemote === option.value
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Job Type</h4>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={filters.jobType.includes(type)}
                onChange={() => toggleJobType(type)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{formatJobType(type)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Experience Level</h4>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label
              key={level}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={filters.experienceLevel.includes(level)}
                onChange={() => toggleExperienceLevel(level)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {formatExperienceLevel(level)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">
          Salary Range
        </h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500">Minimum ($)</label>
            <input
              type="range"
              min={0}
              max={200000}
              step={10000}
              value={filters.salaryMin}
              onChange={(e) =>
                setSalaryRange(Number(e.target.value), filters.salaryMax)
              }
              className="mt-1 w-full cursor-pointer accent-primary-600"
            />
            <span className="text-sm font-medium text-gray-700">
              ${filters.salaryMin.toLocaleString()}
            </span>
          </div>
          <div>
            <label className="text-xs text-gray-500">Maximum ($)</label>
            <input
              type="range"
              min={0}
              max={300000}
              step={10000}
              value={filters.salaryMax}
              onChange={(e) =>
                setSalaryRange(filters.salaryMin, Number(e.target.value))
              }
              className="mt-1 w-full cursor-pointer accent-primary-600"
            />
            <span className="text-sm font-medium text-gray-700">
              ${filters.salaryMax.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Apply button (mobile only) */}
      {isMobile && (
        <button onClick={onClose} className="btn-primary w-full cursor-pointer">
          Apply Filters
        </button>
      )}
    </div>
  );

  // Mobile: modal overlay
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-white p-6 shadow-xl"
            >
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: sidebar
  return (
    <div className="hidden lg:block">
      <div className="sticky top-20 w-64 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        {filterContent}
      </div>
    </div>
  );
}
