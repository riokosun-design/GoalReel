"use client";

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const embedUrl = url.includes("youtube.com/watch")
    ? url.replace("watch?v=", "embed/")
    : url.includes("youtu.be/")
    ? url.replace("youtu.be/", "www.youtube.com/embed/")
    : url;

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-black border border-border-dark" style={{ paddingBottom: "56.25%" }}>
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Video player"
      />
    </div>
  );
}
