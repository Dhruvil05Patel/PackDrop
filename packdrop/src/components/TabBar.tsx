import { memo, useEffect } from "react";
import type { PackageManager } from "../types";
import { Code2, Layers, Package2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePackageStore } from "../store/usePackageStore";
import { usePackages } from "../hooks/usePackages";


const tabMeta: Record<PackageManager, { label: string; accentKey: "python" | "node" | "brew"; Icon: any }> = {
  python: { label: "python", accentKey: "python", Icon: Code2 },
  node: { label: "node", accentKey: "node", Icon: Layers },
  brew: { label: "brew", accentKey: "brew", Icon: Package2 },
};

type TabBarProps = {
  activeTab: PackageManager;
  onTabChange: (tab: PackageManager) => void;
};

function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const setActiveTab = usePackageStore((s) => s.setActiveTab);
  const { fetchPackages } = usePackages();
  const packages = usePackageStore((s) => s.packages);
  const reduced = useReducedMotion();

  useEffect(() => {
    // initial load if active tab empty
    if ((packages[activeTab] ?? []).length === 0) fetchPackages(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        borderRadius: 12,
        padding: 5,
        display: "flex",
        gap: 5,
      }}
    >
      {(Object.keys(tabMeta) as PackageManager[]).map((tab) => {
        const isActive = tab === activeTab;
        const { label, Icon } = tabMeta[tab];
        const count = (packages[tab] ?? []).length;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab);
              onTabChange(tab);
              if ((packages[tab] ?? []).length === 0) fetchPackages(tab);
            }}
            style={{
              flex: 1,
              borderRadius: 8,
              border: isActive ? `0.5px solid var(--border-strong)` : "0.5px solid transparent",
              background: isActive ? "var(--bg-elevated)" : "transparent",
              cursor: "pointer",
              padding: "10px 10px",
              color: "var(--text-secondary)",
            }}
            aria-label={`Switch to ${label}`}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon size={13} style={{ opacity: isActive ? 1 : 0.65 }} />
              <span style={{ fontSize: 12, fontFamily: "var(--font-data)", textTransform: "lowercase" }}>{label}</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={reduced ? false : { scale: 0.9, opacity: 0 }}
                    animate={reduced ? undefined : { scale: 1, opacity: 1 }}
                    exit={reduced ? undefined : { scale: 0.9, opacity: 0 }}
                    style={{
                      fontSize: 10,
                      borderRadius: 999,
                      padding: "2px 8px",
                      background: "var(--bg-overlay)",
                      border: "0.5px solid var(--border-dim)",
                      color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                      fontWeight: 600,
                    }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default memo(TabBar);

