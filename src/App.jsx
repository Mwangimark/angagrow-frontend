import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashboardPages/Dashboardfinance";
import CropAnalysis from "./pages/CropAnalysis";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboardfarmer from "./pages/DashboardPages/Dashboardfarmer";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboardfinance" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboardfarmer />} />
          <Route path="/crop-analysis" element={<CropAnalysis />} />
          {/* Add other pages here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
