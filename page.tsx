"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Film, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useVideoStore } from "@/lib/store";
import HeroSection from "@/components/home/HeroSection";
import VideoGrid from "@/components/home/VideoGrid";
import CategoryFilter from "@/components/home/CategoryFilter";

export default function HomePage() {
  const { videos, getByLeague } = useVideoStore();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredVideos = useMemo(() => {
    if (!activeCategory) return videos;
    return getByLeague(activeCategory);
  }, [activeCategory, videos, getByLeague]);

  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      {videos.length > 0 && <HeroSection />}

      {/* Category Filter — only show when videos exist */}
      {videos.length > 0 && (
        <CategoryFilter activeCategory={activeCategory} onSelect={setActiveCategory} />
      )}

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        {videos.length === 0 ? (
          /* Beautiful Empty State */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-24 px-4 text-center"
          >
            {/* Animated football icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-surface-raised/50 border border-border-dark flex items-center justify-center mb-6"
            >
              <Film className="w-10 h-10 text-accent-green" />
            </motion.div>

            <h2 className="font-display text-4xl sm:text-5xl text-text-primary mb-3">
              No Highlights Yet
            </h2>
            <p className="text-text-muted text-lg max-w-md mb-8">
              Start adding football highlights through the admin panel. Your latest matches will appear here.
            </p>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-accent-green text-pitch font-display text-lg tracking-wide px-8 py-3 rounded-xl hover:bg-accent-green/90 transition-colors shadow-lg shadow-accent-green/20"
            >
              <PlusCircle className="w-5 h-5" />
              Go to Admin Panel
            </Link>

            {/* Decorative elements */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-sm opacity-20">
              <div className="h-1 bg-accent-green rounded-full" />
              <div className="h-1 bg-accent-green rounded-full" />
              <div className="h-1 bg-accent-green rounded-full" />
            </div>
          </motion.div>
        ) : filteredVideos.length === 0 ? (
          /* No results for active filter */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-surface-raised flex items-center justify-center mb-4">
              <Film className="w-7 h-7 text-text-muted" />
            </div>
            <h3 className="font-display text-3xl text-text-primary mb-2">
              No Matches Found
            </h3>
            <p className="text-text-muted text-sm max-w-md">
              No highlights available for this category yet. Try a different league or check back later.
            </p>
            <button
              onClick={() => setActiveCategory(null)}
              className="mt-4 text-accent-green text-sm hover:underline"
            >
              Show all highlights
            </button>
          </motion.div>
        ) : (
          <VideoGrid videos={filteredVideos} showAds={true} />
        )}
      </div>
    </div>
  );
}
