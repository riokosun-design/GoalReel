"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronDown, Home, Shield } from "lucide-react";
import { useVideoStore } from "@/lib/store";
import { LEAGUES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import LeagueBadge from "@/components/ui/LeagueBadge";

export default function Navbar() {
  const router = useRouter();
  const { videos, searchVideos } = useVideoStore();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leaguesOpen, setLeaguesOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Debounce the search query
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  // Compute suggestions from debounced query
  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchVideos(debouncedQuery).slice(0, 5);
  }, [debouncedQuery, searchVideos]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchOpen(false);
        setSearchQuery("");
        setDebouncedQuery("");
      }
    },
    [searchQuery, router]
  );

  const handleSuggestionClick = useCallback(
    (id: string) => {
      router.push(`/watch/${id}`);
      setSearchOpen(false);
      setSearchQuery("");
      setDebouncedQuery("");
    },
    [router]
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-pitch/90 backdrop-blur-lg border-b border-border-dark"
          : "bg-pitch border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">⚽</span>
          <span className="font-display text-2xl sm:text-3xl text-accent-green tracking-wide">
            GoalReel
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div ref={searchRef} className="hidden md:flex relative flex-1 max-w-lg mx-4">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search highlights..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => debouncedQuery.trim() && setSearchOpen(true)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-raised border border-border-dark text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green transition-all"
            />
          </form>
          <AnimatePresence>
            {searchOpen && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border-dark rounded-lg shadow-xl overflow-hidden z-50"
              >
                {suggestions.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleSuggestionClick(video.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-surface-raised transition-colors text-left"
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-16 h-9 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary truncate">{video.title}</p>
                      <LeagueBadge league={video.league} />
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-surface-raised transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>

          <div className="relative">
            <button
              onClick={() => setLeaguesOpen(!leaguesOpen)}
              onBlur={() => setTimeout(() => setLeaguesOpen(false), 200)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-surface-raised transition-colors"
            >
              Leagues
              <ChevronDown
                className={`w-4 h-4 transition-transform ${leaguesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {leaguesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-1 w-56 bg-surface border border-border-dark rounded-lg shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
                >
                  {LEAGUES.map((league) => (
                    <Link
                      key={league}
                      href={`/category/${slugify(league)}`}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-surface-raised transition-colors text-sm text-text-primary"
                      onClick={() => setLeaguesOpen(false)}
                    >
                      <LeagueBadge league={league} />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-muted hover:text-accent-green hover:bg-surface-raised transition-colors"
          >
            <Shield className="w-4 h-4" />
            Admin
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-text-primary hover:bg-surface-raised transition-colors"
            aria-label="Search"
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-text-primary hover:bg-surface-raised transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border-dark overflow-hidden"
          >
            <div className="px-4 py-3" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search highlights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-raised border border-border-dark text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green transition-all"
                  autoFocus
                />
              </form>
              {suggestions.length > 0 && (
                <div className="mt-2 bg-surface border border-border-dark rounded-lg overflow-hidden">
                  {suggestions.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => handleSuggestionClick(video.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-surface-raised transition-colors text-left"
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-16 h-9 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary truncate">{video.title}</p>
                        <LeagueBadge league={video.league} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border-dark overflow-hidden bg-pitch/95 backdrop-blur-lg"
          >
            <div className="px-4 py-3 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-text-primary hover:bg-surface-raised transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <div className="py-1">
                <p className="px-3 text-xs uppercase tracking-wider text-text-muted mb-1">
                  Leagues
                </p>
                <div className="max-h-48 overflow-y-auto space-y-0.5">
                  {LEAGUES.map((league) => (
                    <Link
                      key={league}
                      href={`/category/${slugify(league)}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-raised transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LeagueBadge league={league} />
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-text-muted hover:text-accent-green hover:bg-surface-raised transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
