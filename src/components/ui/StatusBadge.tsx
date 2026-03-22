"use client";

import { motion } from "framer-motion";
import { ApplicationStatus } from "@/types";
import { formatApplicationStatus, getStatusColor } from "@/utils";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}
    >
      {formatApplicationStatus(status)}
    </motion.span>
  );
}
