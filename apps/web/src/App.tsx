import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AboutPage } from "@/pages/AboutPage";
import { HubPage } from "@/pages/HubPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { TermsPage } from "@/pages/TermsPage";
import { ThemeGamePage } from "@/pages/ThemeGamePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/:themeId" element={<ThemeGamePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
