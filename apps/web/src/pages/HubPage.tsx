import { useState } from "react";
import { Hub } from "@/components/Hub";
import { Shell } from "@/components/Shell";
import { SettingsOverlay } from "@/components/Overlays";
import { loadSave, saveSave } from "@/game/storage";
import type { AppSave } from "@/game/types";
import { usePageMeta } from "@/hooks/usePageMeta";
import { HUB_META } from "@/seo/pageMeta";

export function HubPage() {
  const [save, setSave] = useState<AppSave>(() => loadSave());
  const [settingsOpen, setSettingsOpen] = useState(false);

  usePageMeta(HUB_META);

  const persist = (next: AppSave) => {
    setSave(next);
    saveSave(next);
  };

  return (
    <Shell subtitle="Pick a pack">
      <Hub save={save} onSettings={() => setSettingsOpen(true)} />
      {settingsOpen && (
        <SettingsOverlay
          sound={save.sound}
          colorblind={save.colorblind}
          onSound={(sound) => persist({ ...save, sound })}
          onColorblind={(colorblind) => persist({ ...save, colorblind })}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </Shell>
  );
}
