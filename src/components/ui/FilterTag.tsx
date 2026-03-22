"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils";

interface FilterTagProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterTag({ label, active, onClick }: FilterTagProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer",
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm"
      )}
    >
      {label}
    </motion.button>
  );
}
