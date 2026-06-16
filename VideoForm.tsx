"use client";

import { useState, useMemo } from "react";
import { Video } from "@/lib/types";
import { LEAGUES } from "@/lib/constants";
import { useVideoStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, ImageIcon } from "lucide-react";

interface VideoFormProps {
  video: Video | null;
  onClose: () => void;
}

interface FormErrors {
  title?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  league?: string;
  date?: string;
}

export default function VideoForm({ video, onClose }: VideoFormProps) {
  const { addVideo, updateVideo } = useVideoStore();
  const { toast } = useToast();
  const isEdit = !!video;

  const [title, setTitle] = useState(video?.title ?? "");
  const [teams, setTeams] = useState(video?.teams ?? "");
  const [league, setLeague] = useState(video?.league ?? "");
  const [date, setDate] = useState(video?.date ?? "");
  const [videoUrl, setVideoUrl] = useState(video?.videoUrl ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(video?.thumbnailUrl ?? "");
  const [description, setDescription] = useState(video?.description ?? "");
  const [tagsInput, setTagsInput] = useState(video?.tags?.join(", ") ?? "");
  const [featured, setFeatured] = useState(video?.featured ?? false);
  const [submitErrors, setSubmitErrors] = useState<FormErrors>({});

  // Live inline validation (computed, not in effect)
  const inlineErrors = useMemo<FormErrors>(() => {
    const errs: FormErrors = {};
    if (title && title.length < 5) errs.title = "Title must be at least 5 characters";
    if (videoUrl && !videoUrl.startsWith("https://")) errs.videoUrl = "Must start with https://";
    if (thumbnailUrl && !thumbnailUrl.startsWith("https://")) errs.thumbnailUrl = "Must start with https://";
    return errs;
  }, [title, videoUrl, thumbnailUrl]);

  const errors = { ...inlineErrors, ...submitErrors };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title || title.length < 5) newErrors.title = "Title is required (min 5 characters)";
    if (!videoUrl || !videoUrl.startsWith("https://")) newErrors.videoUrl = "Valid video URL is required (must start with https://)";
    if (!thumbnailUrl || !thumbnailUrl.startsWith("https://")) newErrors.thumbnailUrl = "Valid thumbnail URL is required (must start with https://)";
    if (!league) newErrors.league = "League is required";
    if (!date) newErrors.date = "Date is required";
    setSubmitErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErrors({});
    if (!validate()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const videoData = {
      title,
      teams,
      league,
      date,
      videoUrl,
      thumbnailUrl,
      description,
      tags,
      featured,
    };

    if (isEdit && video) {
      updateVideo(video.id, videoData);
      toast({
        title: "Video Updated",
        description: `"${title}" has been updated successfully.`,
      });
    } else {
      addVideo(videoData);
      toast({
        title: "Video Added",
        description: `"${title}" has been added successfully.`,
      });
    }
    onClose();
  };

  return (
    <div className="bg-surface border border-border-dark rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-text-primary">
          {isEdit ? "Edit Video" : "Add New Video"}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-text-muted hover:text-text-primary"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-text-primary">
            Title <span className="text-danger">*</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Manchester City vs Arsenal — All Goals"
            className="bg-surface-raised border-border-dark text-text-primary placeholder:text-text-muted"
          />
          {errors.title && <p className="text-danger text-xs">{errors.title}</p>}
        </div>

        {/* Teams */}
        <div className="space-y-1.5">
          <Label htmlFor="teams" className="text-text-primary">
            Teams
          </Label>
          <Input
            id="teams"
            value={teams}
            onChange={(e) => setTeams(e.target.value)}
            placeholder="e.g. Manchester City vs Arsenal"
            className="bg-surface-raised border-border-dark text-text-primary placeholder:text-text-muted"
          />
        </div>

        {/* League + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-text-primary">
              League <span className="text-danger">*</span>
            </Label>
            <Select value={league} onValueChange={setLeague}>
              <SelectTrigger className="bg-surface-raised border-border-dark text-text-primary">
                <SelectValue placeholder="Select league" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-border-dark">
                {LEAGUES.map((l) => (
                  <SelectItem key={l} value={l} className="text-text-primary focus:bg-surface-raised focus:text-accent-green">
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.league && <p className="text-danger text-xs">{errors.league}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="date" className="text-text-primary">
              Date <span className="text-danger">*</span>
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-surface-raised border-border-dark text-text-primary"
            />
            {errors.date && <p className="text-danger text-xs">{errors.date}</p>}
          </div>
        </div>

        {/* Video URL */}
        <div className="space-y-1.5">
          <Label htmlFor="videoUrl" className="text-text-primary">
            Video URL <span className="text-danger">*</span>
          </Label>
          <Input
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
            className="bg-surface-raised border-border-dark text-text-primary placeholder:text-text-muted"
          />
          {errors.videoUrl && <p className="text-danger text-xs">{errors.videoUrl}</p>}
        </div>

        {/* Thumbnail URL */}
        <div className="space-y-1.5">
          <Label htmlFor="thumbnailUrl" className="text-text-primary">
            Thumbnail URL <span className="text-danger">*</span>
          </Label>
          <Input
            id="thumbnailUrl"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="https://example.com/thumbnail.jpg"
            className="bg-surface-raised border-border-dark text-text-primary placeholder:text-text-muted"
          />
          {errors.thumbnailUrl && <p className="text-danger text-xs">{errors.thumbnailUrl}</p>}
          {/* Live preview */}
          {thumbnailUrl && thumbnailUrl.startsWith("https://") && (
            <div className="mt-2 relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-border-dark">
              <img
                src={thumbnailUrl}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <ImageIcon className="w-8 h-8 text-text-muted/50" />
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description" className="text-text-primary">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the match highlights..."
            rows={3}
            className="bg-surface-raised border-border-dark text-text-primary placeholder:text-text-muted resize-none"
          />
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <Label htmlFor="tags" className="text-text-primary">
            Tags <span className="text-text-muted text-xs">(comma-separated)</span>
          </Label>
          <Input
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. haaland, premier league, goals"
            className="bg-surface-raised border-border-dark text-text-primary placeholder:text-text-muted"
          />
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center gap-3">
          <Switch
            checked={featured}
            onCheckedChange={setFeatured}
            className="data-[state=checked]:bg-accent-green"
          />
          <Label className="text-text-primary">Featured Video</Label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            className="bg-accent-green text-pitch hover:bg-accent-green/90 font-display text-base tracking-wide"
          >
            {isEdit ? "Update Video" : "Add Video"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
