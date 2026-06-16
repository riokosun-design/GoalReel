"use client";

import AdBanner from "./AdBanner";

export default function AdInFeed() {
  return (
    <div className="rounded-xl overflow-hidden border border-border-dark bg-surface">
      <div className="p-3">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-[10px] uppercase tracking-wider text-text-muted">Sponsored</span>
        </div>
        <AdBanner placement="in-feed-300x250" className="w-full" />
      </div>
    </div>
  );
}
