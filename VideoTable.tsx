"use client";

import { useState, useMemo } from "react";
import { useVideoStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import LeagueBadge from "@/components/ui/LeagueBadge";
import { formatDate, formatViews } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Star, Search as SearchIcon, ChevronLeft, ChevronRight } from "lucide-react";
import VideoForm from "./VideoForm";
import { Video } from "@/lib/types";

const PAGE_SIZE = 10;

export default function VideoTable() {
  const { videos, deleteVideo, updateVideo } = useVideoStore();
  const { toast } = useToast();
  const [searchFilter, setSearchFilter] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Video | null>(null);
  const [editTarget, setEditTarget] = useState<Video | null | undefined>(undefined);

  const filtered = useMemo(() => {
    const sorted = [...videos].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (!searchFilter.trim()) return sorted;
    const q = searchFilter.toLowerCase();
    return sorted.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.league.toLowerCase().includes(q) ||
        v.teams.toLowerCase().includes(q)
    );
  }, [videos, searchFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = () => {
    if (deleteTarget) {
      deleteVideo(deleteTarget.id);
      toast({
        title: "Video Deleted",
        description: `"${deleteTarget.title}" has been deleted.`,
        variant: "destructive",
      });
      setDeleteTarget(null);
    }
  };

  const toggleFeatured = (video: Video) => {
    updateVideo(video.id, { featured: !video.featured });
    toast({
      title: video.featured ? "Removed from Featured" : "Added to Featured",
      description: `"${video.title}" ${video.featured ? "removed from" : "added to"} featured.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Edit modal */}
      {editTarget !== undefined && (
        <VideoForm video={editTarget} onClose={() => setEditTarget(undefined)} />
      )}

      {/* Search bar */}
      <div className="relative max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <Input
          value={searchFilter}
          onChange={(e) => {
            setSearchFilter(e.target.value);
            setPage(1);
          }}
          placeholder="Filter videos..."
          className="pl-10 bg-surface-raised border-border-dark text-text-primary placeholder:text-text-muted"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border-dark overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border-dark hover:bg-transparent">
                <TableHead className="text-text-muted w-16">Thumb</TableHead>
                <TableHead className="text-text-muted">Title</TableHead>
                <TableHead className="text-text-muted">League</TableHead>
                <TableHead className="text-text-muted">Date</TableHead>
                <TableHead className="text-text-muted">Views</TableHead>
                <TableHead className="text-text-muted">Featured</TableHead>
                <TableHead className="text-text-muted text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-text-muted py-8">
                    No videos found
                  </TableCell>
                </TableRow>
              ) : (
                paged.map((video) => (
                  <TableRow key={video.id} className="border-border-dark hover:bg-surface-raised/50">
                    <TableCell>
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-12 h-7 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="text-text-primary text-sm max-w-[200px] truncate">
                      {video.title}
                    </TableCell>
                    <TableCell>
                      <LeagueBadge league={video.league} />
                    </TableCell>
                    <TableCell className="text-text-muted text-sm">
                      {formatDate(video.date)}
                    </TableCell>
                    <TableCell className="text-text-muted text-sm">
                      {formatViews(video.views)}
                    </TableCell>
                    <TableCell>
                      <button onClick={() => toggleFeatured(video)} className="transition-colors">
                        <Star
                          className={`w-4 h-4 ${
                            video.featured
                              ? "text-accent-green fill-accent-green"
                              : "text-text-muted"
                          }`}
                        />
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditTarget(video)}
                          className="text-text-muted hover:text-accent-green h-8 w-8"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(video)}
                          className="text-text-muted hover:text-danger h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="text-text-muted hover:text-text-primary h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-text-muted">
              {page} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="text-text-muted hover:text-text-primary h-8 w-8"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="bg-surface border-border-dark">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-text-primary font-display text-xl">
              Delete Video
            </AlertDialogTitle>
            <AlertDialogDescription className="text-text-muted">
              Are you sure you want to delete &quot;{deleteTarget?.title}&quot;? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-surface-raised border-border-dark text-text-muted hover:text-text-primary">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-danger text-white hover:bg-danger/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
