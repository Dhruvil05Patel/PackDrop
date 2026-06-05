import { Toaster } from "sonner";

export default function Toast() {
  return (
    <Toaster
      position="bottom-right"
      theme="dark"
      toastOptions={{
        style: {
          background: "var(--bg-overlay)",
          border: "0.5px solid var(--border-mid)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: "var(--text-primary)",
        },
      }}
    />
  );
}

