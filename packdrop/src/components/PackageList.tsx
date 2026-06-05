import { memo } from "react";
import type { Package, PackageManager } from "../types";
import PackageCard from "./PackageCard";

type PackageListProps = {
  packages: Package[];
  onToggleSelect: (tab: PackageManager, name: string) => void;
};

function PackageList({ packages, onToggleSelect }: PackageListProps) {
  // Tab is implicit via selected handler; the card uses the name only. We'll rely on onToggleSelect closure.
  return (
    <div
      role="list"
      style={{
        background: "var(--bg-surface)",
        borderRadius: 12,
        border: "0.5px solid var(--border-dim)",
        padding: 12,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {packages.map((p) => (
          <div key={p.name} role="listitem">
            <PackageCard package={p} onToggle={() => onToggleSelect("python", p.name)} />
          </div>
        ))}

        {packages.length === 0 && (
          <div
            style={{
              padding: 24,
              color: "var(--text-muted)",
              fontSize: 13,
              fontFamily: "var(--font-data)",
            }}
          >
            No packages found.
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(PackageList);

