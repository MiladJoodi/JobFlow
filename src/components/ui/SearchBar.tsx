"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/utils";

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  defaultQuery?: string;
  defaultLocation?: string;
  size?: "lg" | "md";
}

export default function SearchBar({
  onSearch,
  defaultQuery = "",
  defaultLocation = "",
  size = "lg",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  const isLarge = size === "lg";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={cn(
          "flex flex-col sm:flex-row items-stretch bg-white rounded-xl shadow-sm border border-gray-200",
          isLarge ? "p-2 gap-2" : "p-1.5 gap-1.5"
        )}
      >
        {/* Job title / keyword input */}
        <motion.div
          className="relative flex-1"
          animate={{ scale: focusedField === "query" ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Search
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
              isLarge ? "w-5 h-5" : "w-4 h-4"
            )}
          />
          <input
            type="text"
            placeholder="Job title or keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocusedField("query")}
            onBlur={() => setFocusedField(null)}
            className={cn(
              "w-full rounded-lg bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20",
              isLarge
                ? "pl-11 pr-4 py-3.5 text-lg"
                : "pl-10 pr-3 py-2.5 text-base"
            )}
          />
        </motion.div>

        {/* Divider */}
        <div className="hidden sm:block w-px bg-gray-200 self-stretch my-2" />

        {/* Location input */}
        <motion.div
          className="relative flex-1"
          animate={{ scale: focusedField === "location" ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <MapPin
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
              isLarge ? "w-5 h-5" : "w-4 h-4"
            )}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setFocusedField("location")}
            onBlur={() => setFocusedField(null)}
            className={cn(
              "w-full rounded-lg bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20",
              isLarge
                ? "pl-11 pr-4 py-3.5 text-lg"
                : "pl-10 pr-3 py-2.5 text-base"
            )}
          />
        </motion.div>

        {/* Search button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0",
            isLarge ? "px-8 py-3.5 text-lg" : "px-6 py-2.5 text-base"
          )}
        >
          <Search className={cn(isLarge ? "w-5 h-5" : "w-4 h-4")} />
          Search Jobs
        </motion.button>
      </div>
    </form>
  );
}
