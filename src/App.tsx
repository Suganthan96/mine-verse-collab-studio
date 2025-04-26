
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Artists from "./pages/Artists";
import CreateNFT from "./pages/CreateNFT";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isConnected = localStorage.getItem("walletConnected") === "true";
  
  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if wallet is connected on mount
    const walletStatus = localStorage.getItem("walletConnected") === "true";
    setIsConnected(walletStatus);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Default route - always redirect to login first if not connected */}
            <Route 
              path="/" 
              element={<Navigate to="/login" replace />} 
            />

            {/* Login route - redirect to dashboard if connected */}
            <Route 
              path="/login" 
              element={
                isConnected ? <Navigate to="/dashboard" replace /> : <Login />
              } 
            />

            {/* Protected routes that require authentication */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/artists" element={<ProtectedRoute><Artists /></ProtectedRoute>} />
            <Route path="/create-nft" element={<ProtectedRoute><CreateNFT /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
