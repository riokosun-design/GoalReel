"use client";

import { LEAGUE_COLORS } from "@/lib/constants";

interface LeagueBadgeProps {
  league: string;
  className?: string;
}

export default function LeagueBadge({ league, className = "" }: LeagueBadgeProps) {
  const bgColor = LEAGUE_COLORS[league] || LEAGUE_COLORS["Other"];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {league}
    </span>
  );
}
