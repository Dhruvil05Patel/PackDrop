export type PackageManager = "python" | "node" | "brew";

export interface Package {
  name: string;
  version: string;
  selected: boolean;
}

export interface PackageStore {
  activeTab: PackageManager;
  packages: Record<PackageManager, Package[]>;
  setActiveTab: (tab: PackageManager) => void;
  toggleSelect: (tab: PackageManager, name: string) => void;
  setPackages: (tab: PackageManager, pkgs: Package[]) => void;
  clearSelected: (tab: PackageManager) => void;
}