"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Eye, Calendar } from "lucide-react";
import { Video } from "@/lib/types";
import LeagueBadge from "@/components/ui/LeagueBadge";
import { formatDate, formatViews } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="video-card group"
    >
      <Link
        href={`/watch/${video.id}`}
        className="block rounded-2xl overflow-hidden bg-surface border border-border-dark hover:border-accent-green/30 transition-colors duration-300"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* League Badge */}
          <div className="absolute top-3 left-3">
            <LeagueBadge league={video.league} />
          </div>

          {/* Featured star */}
          {video.featured && (
            <div className="absolute top-3 right-3">
              <div className="w-7 h-7 rounded-full bg-accent-green/20 backdrop-blur-sm border border-accent-green/40 flex items-center justify-center">
                <span className="text-xs">⭐</span>
              </div>
            </div>
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-accent-green/90 flex items-center justify-center shadow-xl shadow-accent-green/40 backdrop-blur-sm group-hover:scale-100 scale-75 transition-transform duration-300">
              <Play className="w-6 h-6 text-pitch fill-pitch ml-0.5" />
            </div>
          </div>

          {/* Scan Line */}
          <div className="video-card-scan-line" />

          {/* Team Names */}
          <div className="absolute bottom-3 left-3 right-3">
            <p className="font-display text-lg sm:text-xl text-white truncate drop-shadow-lg leading-tight">
              {video.teams}
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="text-sm text-text-primary line-clamp-2 leading-snug font-medium mb-3 group-hover:text-accent-green transition-colors duration-200">
            {video.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(video.date)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(video.views)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
