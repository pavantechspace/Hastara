import { create } from 'zustand';
import type { ReadingStore, Reading } from '@hastara/core/types';

export const useReadingStore = create<ReadingStore>((set) => ({
  currentReading: null,
  streamingText: '',
  isGenerating: false,
  progress: 0,
  setCurrentReading: (currentReading: Reading | null) => set({ currentReading }),
  appendStreamingText: (chunk: string) =>
    set((state) => ({ streamingText: state.streamingText + chunk })),
  clearStreamingText: () => set({ streamingText: '' }),
  setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
  setProgress: (progress: number) => set({ progress }),
}));
