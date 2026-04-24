import React from "react";

type Props = {
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
  logo: string;
};

const AuthCard: React.FC<Props> = ({ title, subtitle, children, logo }) => {
  return (
    <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
      <div className="bg-white p-4 rounded-4 text-center shadow login-card">

        <div className="mb-3">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        <h4 className="mb-2">{title}</h4>
        <p className="text-muted small mb-3">{subtitle}</p>

        {children}

      </div>
    </div>
  );
};

export default AuthCard;