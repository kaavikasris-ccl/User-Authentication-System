import React from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/dashboard.scss";

const Dashboard = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      <div className="back-arrow" onClick={() => navigate("/login")}>
        ←
      </div>

      <div className="dashboard-card">
        <h1>Welcome to Dashboard</h1>
        <p>Login Successful</p>
      </div>

    </div>
  );
};

export default Dashboard;