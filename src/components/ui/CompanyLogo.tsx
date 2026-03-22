"use client";

import { getInitials, cn } from "@/utils";

const PALETTE = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-fuchsia-500",
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

interface CompanyLogoProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { container: "w-10 h-10", text: "text-sm" },
  md: { container: "w-12 h-12", text: "text-base" },
  lg: { container: "w-16 h-16", text: "text-lg" },
};

export default function CompanyLogo({ name, size = "md" }: CompanyLogoProps) {
  const initials = getInitials(name);
  const colorIndex = hashName(name) % PALETTE.length;
  const bgColor = PALETTE[colorIndex];
  const { container, text } = sizeMap[size];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl text-white font-bold select-none shrink-0",
        bgColor,
        container,
        text
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
