import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/pages/login";
import ForgotPassword from "@/pages/forgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Dashboard from "@/pages/dashboard";
import "@/styles/validation.scss";

import ProtectedRoute from "@/components/protectRoute"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;