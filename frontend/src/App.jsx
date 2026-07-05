import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ComplaintHistory from "./pages/ComplaintHistory";
import Home from "./pages/Home";
import ReportComplaint from "./pages/ReportComplaint";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import OfficerDashboard from "./pages/OfficerDashboard";
import OfficerLogin from "./pages/OfficerLogin";
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/report" element={<ReportComplaint />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/about" element={<About />} />

        <Route path="/history" element={<ComplaintHistory />} />
        <Route path="/officer" element={<OfficerDashboard />} />
        <Route path="/officer-login" element={<OfficerLogin />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;