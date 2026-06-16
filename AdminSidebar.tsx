"use client";

import { motion } from "framer-motion";
import { BarChart3, Plus, List, Search } from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "add-video", label: "Add Video", icon: Plus },
  { id: "videos", label: "Videos", icon: List },
  { id: "search", label: "Search", icon: Search },
];

export default function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <aside className="w-full lg:w-60 shrink-0">
      <nav className="bg-surface border border-border-dark rounded-2xl overflow-hidden p-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                isActive
                  ? "bg-accent-green/15 text-accent-green"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-raised"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-green rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
