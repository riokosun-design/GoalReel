"use client";

import { motion } from "framer-motion";
import { Video } from "@/lib/types";
import VideoCard from "./VideoCard";
import AdInFeed from "@/components/ads/AdInFeed";

interface VideoGridProps {
  videos: Video[];
  showAds?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function VideoGrid({ videos, showAds = true }: VideoGridProps) {
  if (videos.length === 0) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
    >
      {videos.map((video, index) => (
        <motion.div key={video.id} variants={itemVariants}>
          <VideoCard video={video} />
          {/* Insert ad after every 6th card */}
          {showAds && (index + 1) % 6 === 0 && (
            <div className="mt-5">
              <AdInFeed />
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
