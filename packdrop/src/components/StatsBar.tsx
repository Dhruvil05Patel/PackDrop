import { memo } from "react";

export type StatsBarProps = {
  totalCount: number;
  selectedCount: number;
  activeTabLabel: string;
};

function StatsCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: string | number;
  variant?: "danger";
}) {
  return (
    <div
      className="rounded-md"
      style={{
        background: "var(--bg-surface)",
        borderRadius: 8,
        border: "0.5px solid var(--border-dim)",
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: variant === "danger" ? "var(--danger)" : "var(--text-primary)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function StatsBar({ totalCount, selectedCount, activeTabLabel }: StatsBarProps) {
  const selectedVariant = selectedCount > 0 ? "danger" : undefined;

  return (
    <div
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 12,
      }}
    >
      <StatsCard label="Total Packages" value={totalCount} />
      <StatsCard label="Selected" value={selectedCount} variant={selectedVariant} />
      <StatsCard label="Active Tab" value={activeTabLabel} />
    </div>
  );
}

export default memo(StatsBar);

