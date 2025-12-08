import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CropAnalysis from "./pages/CropAnalysis";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";
import Profile from "./pages/Profile";
import DroneSpray from "./pages/DroneSprays";

function App() {
  // Helper function to check auth
  const checkAuth = () => {
    return isAuthenticated();
  };

  return (
    <Router>
      <Routes>
        {/* Default route - redirect based on auth status */}
        <Route 
          path="/" 
          element={
            checkAuth() ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
          } 
        />

        {/* Public routes - only accessible when NOT logged in */}
        <Route 
          path="/login" 
          element={
            checkAuth() ? 
              <Navigate to="/dashboard" replace /> : 
              <Login />
          } 
        />
        <Route 
          path="/register" 
          element={
            checkAuth() ? 
              <Navigate to="/dashboard" replace /> : 
              <Register />
          } 
        />
        
        {/* Protected routes */}
        <Route 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crop-analysis" element={<CropAnalysis />} />
          <Route path="/profile" element={<Profile />} />
          {/* Add other protected routes here */}
        </Route>

        {/* Catch-all route - redirect based on auth */}
        <Route 
          path="*" 
          element={
            checkAuth() ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;