"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Briefcase } from "lucide-react";
import { Company } from "@/types";
import CompanyLogo from "@/components/ui/CompanyLogo";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100"
    >
      {/* Logo & Name */}
      <div className="flex items-center gap-3 mb-4">
        <CompanyLogo name={company.name} size="lg" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {company.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{company.industry}</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
        <MapPin className="w-4 h-4 text-gray-400" />
        <span>{company.headquarters}</span>
      </div>

      {/* Rating & Open Positions */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span className="inline-flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-medium">{company.rating.toFixed(1)}</span>
          <span className="text-gray-400">({company.reviewCount})</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <span>
            {company.openPositions} open position
            {company.openPositions !== 1 ? "s" : ""}
          </span>
        </span>
      </div>

      {/* View Company link */}
      <div className="pt-3 border-t border-gray-100">
        <Link
          href={`/companies/${company.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Company
        </Link>
      </div>
    </motion.div>
  );
}
