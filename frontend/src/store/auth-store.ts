"use client";

import { create } from "zustand";

type AuthState = {
  token: string | null;
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (user) => set({ token: "paper-token", user }),
  logout: () => set({ token: null, user: null })
}));
