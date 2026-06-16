"use client";

import { useVideoStore } from "@/lib/store";
import VideoCard from "@/components/home/VideoCard";

interface RelatedVideosProps {
  currentVideoId: string;
  league: string;
}

export default function RelatedVideos({ currentVideoId, league }: RelatedVideosProps) {
  const { getByLeague } = useVideoStore();
  const related = getByLeague(league).filter((v) => v.id !== currentVideoId).slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-display text-xl text-text-primary">Related Videos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
        {related.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
