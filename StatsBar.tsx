"use client";

import { useVideoStore } from "@/lib/store";
import { Video, Star, Eye, Trophy } from "lucide-react";

export default function StatsBar() {
  const { videos } = useVideoStore();

  const totalVideos = videos.length;
  const uniqueLeagues = new Set(videos.map((v) => v.league)).size;
  const featuredCount = videos.filter((v) => v.featured).length;
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);

  const formatNum = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  const stats = [
    {
      label: "Total Videos",
      value: totalVideos,
      icon: Video,
      gradient: "from-accent-green/20 to-transparent",
      iconBg: "bg-accent-green/15",
    },
    {
      label: "Total Leagues",
      value: uniqueLeagues,
      icon: Trophy,
      gradient: "from-blue-500/20 to-transparent",
      iconBg: "bg-blue-500/15",
    },
    {
      label: "Featured",
      value: featuredCount,
      icon: Star,
      gradient: "from-yellow-500/20 to-transparent",
      iconBg: "bg-yellow-500/15",
    },
    {
      label: "Total Views",
      value: formatNum(totalViews),
      icon: Eye,
      gradient: "from-purple-500/20 to-transparent",
      iconBg: "bg-purple-500/15",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.gradient} bg-surface border border-border-dark rounded-2xl p-5 flex flex-col gap-3 hover:border-accent-green/20 transition-colors`}
          >
            <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-accent-green" />
            </div>
            <div>
              <span className="font-display text-3xl text-text-primary">{stat.value}</span>
            </div>
            <span className="text-sm text-text-muted">{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}
