import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CropAnalysis from "./pages/CropAnalysis";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";
import Profile from "./pages/Profile";
import SpraysPage from './pages/Sprays';

function App() {
  const checkAuth = () => isAuthenticated();

  return (
    <Router basename={process.env.REACT_APP_BASENAME || "/"}>
      <Routes>
        {/* ✅ Root route - redirect to external landing page */}
        <Route 
          path="/" 
          element={<Navigate to={process.env.REACT_APP_LANDING_URL || "https://angagrow.com"} replace />} 
        />
        
        <Route
          path="/login"
          element={checkAuth() ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={checkAuth() ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crop-analysis" element={<CropAnalysis />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sprays" element={<SpraysPage />} />
        </Route>

        <Route
          path="*"
          element={checkAuth() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;