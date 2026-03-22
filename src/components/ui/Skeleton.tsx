"use client";

import Skeleton from "skeletonix";

export { Skeleton };

export function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <Skeleton block width={48} height={48} rounded="lg" />
        </div>

        <div className="flex-1 min-w-0">
          <Skeleton text width="75%" height={20} />
          <div className="mt-2">
            <Skeleton text width="33%" height={16} />
          </div>

          <div className="flex items-center gap-3 mt-3">
            <Skeleton text width={112} height={16} />
            <Skeleton text width={80} height={16} />
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Skeleton block width={64} height={24} rounded="full" />
            <Skeleton block width={80} height={24} rounded="full" />
            <Skeleton block width={56} height={24} rounded="full" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <Skeleton text width={144} height={16} />
            <Skeleton text width={80} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompanyCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="shrink-0">
          <Skeleton block width={56} height={56} rounded="lg" />
        </div>

        <div className="flex-1 min-w-0">
          <Skeleton text width="66%" height={20} />
          <div className="mt-2">
            <Skeleton text width="33%" height={16} />
          </div>
        </div>
      </div>

      <Skeleton text width="100%" height={16} />
      <div className="mt-2">
        <Skeleton text width="83%" height={16} />
      </div>

      <div className="flex items-center justify-between mt-4">
        <Skeleton text width={96} height={16} />
        <Skeleton text width={112} height={16} />
      </div>
    </div>
  );
}
