"use client";

import { Video } from "@/lib/types";
import LeagueBadge from "@/components/ui/LeagueBadge";
import { formatDate } from "@/lib/utils";
import { Calendar, Eye, Users } from "lucide-react";

interface VideoMetaProps {
  video: Video;
}

export default function VideoMeta({ video }: VideoMetaProps) {
  return (
    <div className="mt-4 space-y-3">
      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-tight">
        {video.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
        <LeagueBadge league={video.league} />
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(video.date)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>{video.teams}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Eye className="w-4 h-4" />
          <span>{video.views.toLocaleString()} views</span>
        </div>
      </div>

      <p className="text-text-muted text-sm leading-relaxed">
        {video.description}
      </p>

      {video.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent-dim/20 text-accent-green border border-accent-dim/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
