import BackgroundShader from "./components/BackgroundShader";
import Toast from "./components/Toast";
import StatsBar from "./components/StatsBar";
import TabBar from "./components/TabBar";
import PackageList from "./components/PackageList";
import DeleteDropZone from "./components/DeleteDropZone";
import ConfirmModal from "./components/ConfirmModal";

import { useMemo, useState } from "react";
import { usePackages } from "./hooks/usePackages";

export default function App() {
  const { activeTab, packagesForActiveTab, fetchPackages, uninstallSelected, toggleSelect } = usePackages();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const selectedCount = useMemo(() => packagesForActiveTab.filter((p) => p.selected).length, [packagesForActiveTab]);
  const totalCount = packagesForActiveTab.length;

  return (
    <div>
      <BackgroundShader />
      <Toast />

      <main
        className="mx-auto"
        style={{
          maxWidth: 860,
          padding: "28px 20px",
          position: "relative",
          zIndex: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TabBar
            activeTab={activeTab}
            onTabChange={(tab: typeof activeTab) => {
              fetchPackages(tab);
            }}
          />

          <StatsBar totalCount={totalCount} selectedCount={selectedCount} activeTabLabel={activeTab} />

          <PackageList packages={packagesForActiveTab} onToggleSelect={toggleSelect} />

          <DeleteDropZone
            selectedCount={selectedCount}
            onRequestConfirm={() => setConfirmOpen(true)}
          />

          <ConfirmModal
            open={confirmOpen}
            packages={packagesForActiveTab.filter((p) => p.selected)}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={async () => {
              await uninstallSelected();
              setConfirmOpen(false);
            }}
          />
        </div>
      </main>
    </div>
  );
}

