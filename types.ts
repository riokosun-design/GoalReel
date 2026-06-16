export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  league: string;
  teams: string;
  date: string;
  tags: string[];
  featured: boolean;
  views: number;
  createdAt: string;
}

export interface AdminState {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export interface VideoStore {
  videos: Video[];
  addVideo: (video: Omit<Video, "id" | "createdAt" | "views">) => void;
  updateVideo: (id: string, updates: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  getVideoById: (id: string) => Video | undefined;
  searchVideos: (query: string) => Video[];
  getByLeague: (league: string) => Video[];
  incrementViews: (id: string) => void;
  getFeatured: () => Video[];
}
