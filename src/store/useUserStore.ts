import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Application, ApplicationStatus, Job } from '@/types';

interface UserStoreState {
  isAuthenticated: boolean;
  user: { name: string; email: string; avatar: string } | null;
  savedJobIds: string[];
  applications: Application[];
  login: (name: string, email: string) => void;
  logout: () => void;
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  applyToJob: (
    job: Job,
    name: string,
    email: string,
    coverLetter?: string,
    resumeFileName?: string
  ) => void;
  hasApplied: (jobId: string) => boolean;
  getApplication: (jobId: string) => Application | undefined;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      isAuthenticated: true,
      user: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar: `https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff`,
      },
      savedJobIds: [],
      applications: [],

      login: (name, email) =>
        set({
          isAuthenticated: true,
          user: {
            name,
            email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
          },
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          savedJobIds: [],
          applications: [],
        }),

      toggleSaveJob: (jobId) =>
        set((state) => {
          const isSaved = state.savedJobIds.includes(jobId);
          return {
            savedJobIds: isSaved
              ? state.savedJobIds.filter((id) => id !== jobId)
              : [...state.savedJobIds, jobId],
          };
        }),

      isJobSaved: (jobId) => get().savedJobIds.includes(jobId),

      applyToJob: (job, name, email, coverLetter?, resumeFileName?) => {
        const { applications } = get();
        if (applications.some((app) => app.jobId === job.id)) {
          return;
        }

        const application: Application = {
          id: `app-${Date.now()}`,
          jobId: job.id,
          job,
          appliedAt: new Date().toISOString(),
          status: 'pending' as ApplicationStatus,
          name,
          email,
          coverLetter,
          resumeFileName,
        };

        set({ applications: [...applications, application] });
      },

      hasApplied: (jobId) =>
        get().applications.some((app) => app.jobId === jobId),

      getApplication: (jobId) =>
        get().applications.find((app) => app.jobId === jobId),
    }),
    {
      name: 'job-platform-user-store',
    }
  )
);
