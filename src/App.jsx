import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CropAnalysis from "./pages/CropAnalysis";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crop-analysis" element={<CropAnalysis />} />
          {/* Add other pages here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
