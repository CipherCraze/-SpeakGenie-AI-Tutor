import { Route, Routes, useRoutes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import TestPage from "./pages/test";
import { UserSync } from "./components/user-sync";
import { ProtectedRoute } from "./components/protected-route";

function App() {
  // Conditionally load tempo routes - disabled for now since tempo-routes package doesn't exist
  let TempoRoutes = null;
  // if (import.meta.env.VITE_TEMPO) {
  //   try {
  //     // Use dynamic import instead of require for ES modules
  //     import("tempo-routes").then((module) => {
  //       const routes = module.default;
  //       TempoRoutes = useRoutes(routes);
  //     }).catch((error) => {
  //       console.warn("Tempo routes not available:", error);
  //     });
  //   } catch (error) {
  //     console.warn("Tempo routes not available:", error);
  //   }
  // }

  return (
    <>
      {/* User sync component - automatically creates/updates users in database */}
      <UserSync />
      
      {/* Tempo routes */}
      {TempoRoutes}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        {/* Tempo route fallback */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </>
  );
}

export default App;
