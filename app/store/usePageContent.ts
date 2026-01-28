import { create } from "zustand";

interface PageContent {
  heading?: string;
  content?: string;
  [key: string]: any;
}

interface PageContentStore {
  pageContent: Record<string, PageContent> | null;
  setPageContent: (data: any) => void;
}

// ✅ Zustand store create karo
const usePageContentStore = create<PageContentStore>((set) => ({
  pageContent: null,
  setPageContent: (data) => set({ pageContent: data }),
}));

export default usePageContentStore;
