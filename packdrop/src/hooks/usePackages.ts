import { useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { PackageManager, Package } from "../types";
import { usePackageStore } from "../store/usePackageStore";
import { toast } from "sonner";

function parsePythonPackages(raw: string): Package[] {
  // raw is JSON from Rust
  const parsed = JSON.parse(raw) as Array<{ name: string; version: string }>;
  return parsed
    .filter((p) => p && typeof p.name === "string")
    .map((p) => ({ name: p.name, version: p.version ?? "", selected: false }));
}

function parseNodePackages(raw: string): Package[] {
  const parsed = JSON.parse(raw) as any;
  const deps: Record<string, any> = parsed?.dependencies ?? {};

  return Object.entries(deps)
    .map(([name, info]) => ({
      name,
      version: typeof info?.version === "string" ? info.version : "",
      selected: false,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function parseBrewPackages(raw: string): Package[] {
  // Example: "openssl@1.1 1.1.1w" per line (brew list --formula --versions)
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, ...rest] = line.split(/\s+/);
      const version = rest.join(" ");
      return { name, version, selected: false };
    });
}

export function usePackages() {
  const activeTab = usePackageStore((s) => s.activeTab);
  const packages = usePackageStore((s) => s.packages);
  const setPackages = usePackageStore((s) => s.setPackages);
  const clearSelected = usePackageStore((s) => s.clearSelected);
  const toggleSelect = usePackageStore((s) => s.toggleSelect);

  const fetchPackages = useCallback(async (tab: PackageManager = activeTab) => {
    try {
      const output =
        tab === "python"
          ? await invoke<string>("list_python_packages")
          : tab === "node"
            ? await invoke<string>("list_node_packages")
            : await invoke<string>("list_brew_packages");

      const pkgs =
        tab === "python"
          ? parsePythonPackages(output)
          : tab === "node"
            ? parseNodePackages(output)
            : parseBrewPackages(output);

      setPackages(tab, pkgs);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to list packages");
    }
  }, [activeTab, setPackages]);

  const uninstallSelected = useCallback(async () => {
    const selected = (packages[activeTab] ?? []).filter((p) => p.selected);
    if (selected.length === 0) return;

    const names = selected.map((p) => p.name);

    try {
      const stderr =
        activeTab === "python"
          ? await invoke<string>("uninstall_python_packages", { packages: names })
          : activeTab === "node"
            ? await invoke<string>("uninstall_node_packages", { packages: names })
            : await invoke<string>("uninstall_brew_packages", { packages: names });

      // Backend returns stderr for uninstall. Treat any string as feedback.
      if (stderr && stderr.trim().length > 0) toast.message(stderr);

      clearSelected(activeTab);
      await fetchPackages(activeTab);
      toast.success("Uninstall complete");
    } catch (e: any) {
      toast.error(e?.message ?? "Uninstall failed");
    }
  }, [activeTab, clearSelected, fetchPackages, packages]);

  return {
    activeTab,
    packagesForActiveTab: packages[activeTab] ?? [],
    toggleSelect,
    fetchPackages,
    uninstallSelected,
  };
}

