import React from "react";

const AuthCard = ({ title, subtitle, children, logo }) => {
  return (
    <div className="col-md-6 d-flex justify-content-center align-items-center vh-100 bg-light p-0">
      <div className="d-flex flex-column justify-content-center align-items-center w-100">

        <div className="mb-3 text-center">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        <h4 className="mb-2 text-center">{title}</h4>
        <p className="text-muted small mb-4 text-center">{subtitle}</p>

        <div style={{ width: "100%", maxWidth: "350px" }}>
          {children}
        </div>

      </div>
    </div>
  );
};

export default AuthCard;