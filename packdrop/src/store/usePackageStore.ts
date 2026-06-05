import { create } from "zustand";
import type { Package, PackageStore } from "../types";

const createEmptyTab = (): Package[] => [];

export const usePackageStore = create<PackageStore>((set) => ({
  activeTab: "python",
  packages: {
    python: createEmptyTab(),
    node: createEmptyTab(),
    brew: createEmptyTab(),
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleSelect: (tab, name) =>
    set((state) => ({
      packages: {
        ...state.packages,
        [tab]: state.packages[tab].map((p) =>
          p.name === name ? { ...p, selected: !p.selected } : p,
        ),
      },
    })),

  setPackages: (tab, pkgs) =>
    set((state) => ({
      packages: {
        ...state.packages,
        [tab]: pkgs,
      },
    })),

  clearSelected: (tab) =>
    set((state) => ({
      packages: {
        ...state.packages,
        [tab]: state.packages[tab].map((p) => ({ ...p, selected: false })),
      },
    })),
}));

