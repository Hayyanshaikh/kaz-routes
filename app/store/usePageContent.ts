import { create } from "zustand";

interface PageContent {
  id?: string;
  title: string;
  slug?: string;
  content: string;
}

interface PageContentStore {
  pageContent: PageContent[] | null;
  setPageContent: (data: PageContent[]) => void;
}

// ✅ Zustand store create karo
const usePageContentStore = create<PageContentStore>((set) => ({
  pageContent: null,
  setPageContent: (data) => set({ pageContent: data?.data }),
}));

export default usePageContentStore;
