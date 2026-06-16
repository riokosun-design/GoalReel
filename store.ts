"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Video, VideoStore, AdminState } from "./types";
import { searchVideos as searchVideosUtil } from "./utils";

export const useVideoStore = create<VideoStore>()(
  persist(
    (set, get) => ({
      videos: [],

      addVideo: (video) =>
        set((state) => ({
          videos: [
            ...state.videos,
            {
              ...video,
              id: crypto.randomUUID(),
              views: 0,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateVideo: (id, updates) =>
        set((state) => ({
          videos: state.videos.map((v) => (v.id === id ? { ...v, ...updates } : v)),
        })),

      deleteVideo: (id) =>
        set((state) => ({
          videos: state.videos.filter((v) => v.id !== id),
        })),

      getVideoById: (id) => get().videos.find((v) => v.id === id),

      searchVideos: (query) => searchVideosUtil(get().videos, query),

      getByLeague: (league) =>
        get().videos.filter((v) => v.league === league),

      incrementViews: (id) =>
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === id ? { ...v, views: v.views + 1 } : v
          ),
        })),

      getFeatured: () => get().videos.filter((v) => v.featured),
    }),
    { name: "goalreel-videos" }
  )
);

export const useAdminStore = create<AdminState>()((set) => ({
  isAuthenticated: false,
  login: (password: string) => {
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "NLtJFatES0UwCEknv707";
    const correct = password === envPassword;
    if (correct) set({ isAuthenticated: true });
    return correct;
  },
  logout: () => set({ isAuthenticated: false }),
}));
