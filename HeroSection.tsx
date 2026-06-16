"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Calendar, Eye, TrendingUp } from "lucide-react";
import { useVideoStore } from "@/lib/store";
import LeagueBadge from "@/components/ui/LeagueBadge";
import { formatDate, formatViews } from "@/lib/utils";

export default function HeroSection() {
  const { getFeatured, videos } = useVideoStore();
  const featured = getFeatured();
  const heroVideo = featured.length > 0 ? featured[0] : videos[0];

  if (!heroVideo) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-6"
    >
      <Link href={`/watch/${heroVideo.id}`} className="block group">
        <div className="relative rounded-2xl overflow-hidden bg-surface border border-border-dark hover:border-accent-green/20 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Thumbnail */}
            <div className="relative lg:w-3/5 aspect-video lg:aspect-auto lg:min-h-[360px] overflow-hidden">
              <img
                src={heroVideo.thumbnailUrl}
                alt={heroVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full bg-accent-green/90 flex items-center justify-center shadow-2xl shadow-accent-green/40 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300"
                >
                  <Play className="w-8 h-8 text-pitch fill-pitch ml-1" />
                </motion.div>
              </div>

              {/* Featured badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-accent-green/20 backdrop-blur-md text-accent-green text-xs font-semibold px-3 py-1.5 rounded-full border border-accent-green/30">
                  <TrendingUp className="w-3 h-3" />
                  FEATURED
                </span>
                <LeagueBadge league={heroVideo.league} />
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:w-2/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-surface relative">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-[1.1] mb-4">
                {heroVideo.title}
              </h1>
              <p className="text-text-muted text-sm sm:text-base line-clamp-3 mb-5 leading-relaxed">
                {heroVideo.description}
              </p>

              <div className="flex items-center flex-wrap gap-3 text-sm text-text-muted mb-6">
                <span className="font-display text-xl text-text-primary">
                  {heroVideo.teams}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(heroVideo.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {formatViews(heroVideo.views)} views
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-accent-green text-pitch font-display text-lg tracking-wide px-8 py-3 rounded-xl hover:bg-accent-green/90 transition-colors shadow-lg shadow-accent-green/20">
                  <Play className="w-5 h-5 fill-pitch" />
                  Watch Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}
