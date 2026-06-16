"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { LEAGUES, LEAGUE_COLORS } from "@/lib/constants";

interface CategoryFilterProps {
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ activeCategory, onSelect }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [null, ...LEAGUES];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px flex-1 bg-gradient-to-r from-border-dark to-transparent" />
        <span className="text-xs uppercase tracking-widest text-text-muted font-medium">Browse by League</span>
        <div className="h-px flex-1 bg-gradient-to-l from-border-dark to-transparent" />
      </div>

      <div
        ref={scrollRef}
        className="category-scroll flex gap-2 overflow-x-auto pb-2"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const color = category ? LEAGUE_COLORS[category] : undefined;

          return (
            <motion.button
              key={category ?? "all"}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -1 }}
              onClick={() => onSelect(category)}
              className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-accent-green text-pitch shadow-lg shadow-accent-green/25"
                  : "bg-surface-raised text-text-muted hover:text-text-primary border border-border-dark hover:border-accent-green/20"
              }`}
            >
              {category ? (
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color || "#444" }}
                  />
                  {category}
                </span>
              ) : (
                "All"
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
