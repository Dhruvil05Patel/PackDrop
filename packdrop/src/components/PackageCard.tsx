import { memo } from "react";
import { GripVertical } from "lucide-react";
import type { Package } from "../types";

type PackageCardProps = {
  package: Package;
  onToggle: () => void;
};

function PackageCard({ package: pkg, onToggle }: PackageCardProps) {
  const selected = pkg.selected;

  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        borderRadius: 8,
        border: `0.5px solid ${selected ? "var(--danger-border)" : "var(--border-dim)"}`,
        background: selected ? "var(--danger-glow)" : "var(--bg-surface)",
        overflow: "hidden",
      }}
    >
      <div style={{ width: 2, height: "100%", background: selected ? "var(--danger)" : "transparent" }} />

      <button
        type="button"
        onClick={onToggle}
        style={{
          width: 16,
          height: 16,
          marginLeft: 12,
          borderRadius: 4,
          border: selected ? "none" : "1px solid var(--border-mid)",
          background: selected ? "var(--danger)" : "transparent",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
        }}
        aria-label={selected ? `Deselect ${pkg.name}` : `Select ${pkg.name}`}
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5.5L4.5 9L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 12, flex: 1, paddingRight: 12 }}>
        <div style={{ fontSize: 13, fontFamily: "var(--font-data)", color: "var(--text-body)", overflow: "hidden", textOverflow: "ellipsis" }}>
          {pkg.name}
        </div>
        <div
          style={{
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 4,
            background: "var(--bg-overlay)",
            color: "var(--text-muted)",
            border: "0.5px solid var(--border-dim)",
            whiteSpace: "nowrap",
          }}
        >
          {pkg.version}
        </div>

        <div style={{ marginLeft: "auto", opacity: selected ? 1 : 0.3, display: "flex", alignItems: "center" }}>
          <GripVertical size={14} />
        </div>
      </div>
    </div>
  );
}

export default memo(PackageCard);

