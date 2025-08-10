import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConsultationPage from "./pages/consultation";
import MusicPage from "./pages/MusicPage";
import DoodlePage from "./pages/DoodlePage";
import JournalPage from "./pages/JournalPage";
import ExercisePage from "./pages/ExercisePage";
import QuotesPage from "./pages/QuotesPage";
import StreaksPage from "./pages/StreaksPage";
import TeamPage from "./pages/TeamPage";

import LoadingPage from "./components/LoadingPage";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingPage onFinish={() => setLoading(false)} />;
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/** Import ConsultationPage directly for routing */}
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/doodle" element={<DoodlePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/exercises" element={<ExercisePage />} />
          <Route path="/write" element={<QuotesPage />} />
          <Route path="/tags" element={<StreaksPage />} />
          <Route path="/team" element={<TeamPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
