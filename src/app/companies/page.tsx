"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Search } from "lucide-react";
import { companies } from "@/data/companies";
import { CompanyCard } from "@/components/companies";
import { CompanyCardSkeleton, EmptyState } from "@/components/ui";
import { delay } from "@/utils";

export default function CompaniesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    delay(500).then(() => setIsLoading(false));
  }, []);

  const filtered = searchQuery
    ? companies.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : companies;

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title flex items-center gap-2">
            <Building2 className="h-7 w-7 text-primary-600" />
            Companies
          </h1>
          <p className="section-subtitle">
            Explore top companies hiring on JobFlow
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies by name, industry, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </motion.div>

        {/* Results count */}
        <p className="mt-4 text-sm text-gray-500">
          Showing {filtered.length} {filtered.length === 1 ? "company" : "companies"}
        </p>

        {/* Grid */}
        <div className="mt-6">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CompanyCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Building2 className="h-12 w-12 text-gray-300" />}
              title="No companies found"
              description="Try adjusting your search to find what you're looking for."
            />
          )}
        </div>
      </div>
    </div>
  );
}
