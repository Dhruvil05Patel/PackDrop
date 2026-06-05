import { memo } from "react";
import { Trash2 } from "lucide-react";


type DeleteDropZoneProps = {
  selectedCount: number;
  onRequestConfirm: () => void;
};

function DeleteDropZone({ selectedCount, onRequestConfirm }: DeleteDropZoneProps) {
  return (
    <div
      style={{
        border: `1.5px dashed ${selectedCount > 0 ? "var(--danger)" : "var(--border-mid)"}`,
        borderRadius: 12,
        padding: 16,
        minHeight: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        color: selectedCount > 0 ? "#fca5a5" : "var(--text-muted)",
        background: selectedCount > 0 ? "var(--danger-glow)" : "transparent",
      }}
      onClick={() => {
        if (selectedCount > 0) onRequestConfirm();
      }}
      role="button"
      aria-label="Delete selected packages"
      tabIndex={0}
    >
      <Trash2 size={22} />
      <div style={{ fontFamily: "var(--font-data)", fontSize: 12, textAlign: "center" }}>
        drag packages here to delete
      </div>
    </div>
  );
}

export default memo(DeleteDropZone);

