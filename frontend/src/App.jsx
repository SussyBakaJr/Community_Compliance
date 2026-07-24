import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ComplaintHistory from "./pages/ComplaintHistory";
import Home from "./pages/Home";
import ReportComplaint from "./pages/ReportComplaint";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import OfficerDashboard from "./pages/OfficerDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/report"
    element={
        <ProtectedRoute>
            <ReportComplaint />
        </ProtectedRoute>
    }
/>

<Route
    path="/history"
    element={
        <ProtectedRoute>
            <ComplaintHistory />
        </ProtectedRoute>
    }
/>
        <Route path="/about" element={<About />} />
        <Route
    path="/officer"
    element={
        <ProtectedRoute>
            <OfficerDashboard />
        </ProtectedRoute>
    }
/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;