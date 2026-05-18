import { create } from 'zustand';
import type { AuthStore, User } from '@hastara/core/types';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isOnboarded: false,
  setUser: (user: User | null) => set({ user }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setOnboarded: (isOnboarded: boolean) => set({ isOnboarded }),
  reset: () => set({ user: null, isLoading: false, isOnboarded: false }),
}));
