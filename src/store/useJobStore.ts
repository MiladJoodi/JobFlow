import { create } from 'zustand';
import { SearchFilters, SortOption, JobType, ExperienceLevel } from '@/types';

interface JobStoreState {
  filters: SearchFilters;
  setQuery: (query: string) => void;
  setLocation: (location: string) => void;
  toggleJobType: (type: JobType) => void;
  toggleExperienceLevel: (level: ExperienceLevel) => void;
  setSalaryRange: (min: number, max: number) => void;
  setRemote: (isRemote: boolean | null) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  location: '',
  jobType: [],
  experienceLevel: [],
  salaryMin: 0,
  salaryMax: 300000,
  isRemote: null,
  sortBy: 'latest',
};

export const useJobStore = create<JobStoreState>()((set) => ({
  filters: { ...defaultFilters },

  setQuery: (query) =>
    set((state) => ({
      filters: { ...state.filters, query },
    })),

  setLocation: (location) =>
    set((state) => ({
      filters: { ...state.filters, location },
    })),

  toggleJobType: (type) =>
    set((state) => {
      const current = state.filters.jobType;
      const jobType = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      return { filters: { ...state.filters, jobType } };
    }),

  toggleExperienceLevel: (level) =>
    set((state) => {
      const current = state.filters.experienceLevel;
      const experienceLevel = current.includes(level)
        ? current.filter((l) => l !== level)
        : [...current, level];
      return { filters: { ...state.filters, experienceLevel } };
    }),

  setSalaryRange: (min, max) =>
    set((state) => ({
      filters: { ...state.filters, salaryMin: min, salaryMax: max },
    })),

  setRemote: (isRemote) =>
    set((state) => ({
      filters: { ...state.filters, isRemote },
    })),

  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),

  resetFilters: () =>
    set({ filters: { ...defaultFilters } }),
}));
