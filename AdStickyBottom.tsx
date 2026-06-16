"use client";

import { useState } from "react";
import { X } from "lucide-react";
import AdBanner from "./AdBanner";

export default function AdStickyBottom() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface border-t border-border-dark">
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1 right-1 z-50 w-6 h-6 flex items-center justify-center rounded-full bg-surface-raised text-text-muted hover:text-text-primary transition-colors"
        aria-label="Close ad"
      >
        <X className="w-3 h-3" />
      </button>
      <div className="flex justify-center py-1">
        <AdBanner placement="mobile-sticky-320x50" />
      </div>
    </div>
  );
}
