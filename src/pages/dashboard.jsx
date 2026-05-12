import React from "react";

const Dashboard = () => {
  const email = localStorage.getItem("email");

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">

        <h1>Dashboard </h1>

        <p className="mt-3">
          Login Successful
        </p>

        <h5>
          Welcome: {email}
        </h5>

      </div>
    </div>
  );
};

export default Dashboard;