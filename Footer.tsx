"use client";

import Link from "next/link";
import { Mail, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚽</span>
              <span className="font-display text-2xl text-accent-green tracking-wide">
                GoalReel
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Free football highlights from top leagues worldwide. Watch the latest goals, saves, and match-winning moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-text-primary mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                Home
              </Link>
              <Link
                href="/search?q="
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                Search
              </Link>
              <Link
                href="/admin"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                Admin Panel
              </Link>
            </nav>
          </div>

          {/* Leagues */}
          <div>
            <h4 className="font-display text-lg text-text-primary mb-3">Top Leagues</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/category/premier-league"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                Premier League
              </Link>
              <Link
                href="/category/la-liga"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                La Liga
              </Link>
              <Link
                href="/category/serie-a"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                Serie A
              </Link>
              <Link
                href="/category/uefa-champions-league"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                Champions League
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg text-text-primary mb-3">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-text-muted hover:text-accent-green transition-colors"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-dark py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © 2025 GoalReel. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-surface-raised flex items-center justify-center text-text-muted hover:text-accent-green hover:bg-accent-green/10 transition-colors"
              aria-label="Website"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-surface-raised flex items-center justify-center text-text-muted hover:text-accent-green hover:bg-accent-green/10 transition-colors"
              aria-label="GitHub"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-surface-raised flex items-center justify-center text-text-muted hover:text-accent-green hover:bg-accent-green/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
