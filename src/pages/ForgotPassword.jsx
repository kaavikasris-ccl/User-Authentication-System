import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "@/components/AuthCard";
import { forgotPassword } from "@/services/authService";

import keyImg from "@/assets/key.png";
import vectorImg from "@/assets/message.png";
import logo from "@/assets/crystallogo.png";
import img from "@/assets/frame.png";
import tickImg from "@/assets/tick.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isEmailValid = email && email.includes("@");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await forgotPassword(email);

      alert(data.message);

      if (data.message === "OTP sent") {
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        <AuthCard
          title={
            <div className="d-flex align-items-center justify-content-center">
              <span className="me-2">Forgot Password?</span>
              <img
                src={keyImg}
                alt="key icon"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          }
          subtitle="Enter your email"
          logo={logo}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3 position-relative">
              <img
                src={vectorImg}
                className="position-absolute top-50 start-0 translate-middle-y ms-3"
                style={{ width: 20 }}
                alt="email icon"
              />

              <input
                type="email"
                className="form-control ps-5 pe-5 rounded-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <label className="ps-5">Email Address</label>

              {isEmailValid && (
                <img
                  src={tickImg}
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ width: 18 }}
                  alt="valid"
                />
              )}
            </div>

            <button className="btn btn-primary w-100 rounded-3">
              Send Reset Link
            </button>

            <p className="text-center mt-3">
              <Link to="/">Back to Login</Link>
            </p>
          </form>aaaaaaaaaaaaaaaaaaaa
        </AuthCard>

        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img src={img} className="right-img" alt="forgot-password" />
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;