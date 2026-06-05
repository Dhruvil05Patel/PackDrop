import { memo, useMemo } from "react";
import type { Package } from "../types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type ConfirmModalProps = {
  open: boolean;
  packages: Package[];
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
};

function ConfirmModal({ open, packages, onCancel, onConfirm }: ConfirmModalProps) {
  const reduced = useReducedMotion();
  const title = useMemo(() => {
    if (packages.length === 1) return "Confirm delete";
    return `Confirm delete (${packages.length})`;
  }, [packages.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onCancel();
          }}
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            initial={reduced ? false : { scale: 0.92, opacity: 0 }}
            animate={reduced ? undefined : { scale: 1, opacity: 1 }}
            exit={reduced ? undefined : { scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: "100%",
              maxWidth: 440,
              background: "var(--bg-overlay)",
              border: "0.5px solid var(--border-mid)",
              borderRadius: 16,
              padding: 32,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{title}</div>

            <div
              style={{
                maxHeight: 140,
                overflow: "auto",
                paddingRight: 8,
                borderTop: "0.5px solid var(--border-dim)",
                borderBottom: "0.5px solid var(--border-dim)",
                padding: "10px 0",
                marginBottom: 20,
              }}
            >
              {packages.map((p) => (
                <div
                  key={p.name}
                  style={{
                    fontFamily: "var(--font-data)",
                    fontSize: 12,
                    color: "#fca5a5",
                    display: "flex",
                    gap: 10,
                    padding: "6px 0",
                  }}
                >
                  <span>×</span>
                  <span>
                    {p.name} <span style={{ color: "var(--text-muted)" }}>{p.version}</span>
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={onCancel}
                style={{
                  borderRadius: 8,
                  border: "0.5px solid var(--border-mid)",
                  background: "transparent",
                  padding: "10px 14px",
                  fontFamily: "var(--font-data)",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={onConfirm}
                style={{
                  borderRadius: 8,
                  border: "0.5px solid var(--danger-border)",
                  background: "var(--danger)",
                  padding: "10px 14px",
                  fontFamily: "var(--font-data)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Confirm Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(ConfirmModal);

