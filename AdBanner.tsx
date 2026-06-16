"use client";

import Script from "next/script";

// ============================================================
// 📢 ADSTERRA AD BANNER — PUT YOUR REAL AD KEYS BELOW
// ============================================================
//
// HOW TO USE:
// 1. Go to your Adsterra dashboard and create ad units
// 2. Each ad unit gives you a "key" (like "a1b2c3d4e5f6...")
// 3. Replace the placeholder keys in the AD_CONFIG object below
// 4. Save the file and redeploy
//
// ============================================================

const AD_CONFIG: Record<string, { key: string; width: number; height: number }> = {
  // 🔻 REPLACE THESE PLACEHOLDER KEYS WITH YOUR REAL ADSTERRA KEYS 🔻

  "header-728x90": {
    key: "YOUR_HEADER_AD_KEY_HERE",       // ← Replace with real key
    width: 728,
    height: 90,
  },
  "footer-728x90": {
    key: "YOUR_FOOTER_AD_KEY_HERE",       // ← Replace with real key
    width: 728,
    height: 90,
  },
  "sidebar-300x250": {
    key: "YOUR_SIDEBAR_AD_KEY_HERE",      // ← Replace with real key
    width: 300,
    height: 250,
  },
  "in-feed-300x250": {
    key: "YOUR_INFEED_AD_KEY_HERE",       // ← Replace with real key
    width: 300,
    height: 250,
  },
  "mobile-sticky-320x50": {
    key: "YOUR_MOBILE_STICKY_KEY_HERE",   // ← Replace with real key
    width: 320,
    height: 50,
  },
};

interface AdBannerProps {
  placement: keyof typeof AD_CONFIG;
  className?: string;
}

export default function AdBanner({ placement, className = "" }: AdBannerProps) {
  const config = AD_CONFIG[placement];

  // If no config found or key is still placeholder, show placeholder
  if (!config || config.key.startsWith("YOUR_")) {
    return (
      <div
        className={`flex items-center justify-center bg-surface border border-border-dark rounded-lg overflow-hidden ${className}`}
        style={{ minWidth: config?.width || 300, minHeight: config?.height || 90, maxWidth: "100%" }}
      >
        <div className="text-text-muted text-xs flex items-center justify-center w-full h-full gap-2">
          <span className="opacity-50">📢</span>
          <span>Ad Space ({config?.width || 300}×{config?.height || 90})</span>
        </div>
      </div>
    );
  }

  // Real Adsterra ad
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ minWidth: config.width, minHeight: config.height, maxWidth: "100%" }}
    >
      <div id={`adsterra-${config.key}`}>
        <Script
          id={`ad-options-${config.key}`}
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key': '${config.key}',
                'format': 'iframe',
                'height': ${config.height},
                'width': ${config.width},
                'params': {}
              };
            `,
          }}
        />
        <Script
          src={`//www.highperformanceformat.com/${config.key}/invoke.js`}
          strategy="lazyOnload"
        />
      </div>
    </div>
  );
}
