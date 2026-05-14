import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthCard from "@/components/authCard";
import { forgotPassword } from "@/services/authService";

import { validateEmail } from "@/utils/validation";

import keyImg from "@/assets/key.png";
import vectorImg from "@/assets/message.png";
import logo from "@/assets/crystallogo.png";
import img from "@/assets/frame.png";
import tickImg from "@/assets/tick.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/login.css";
import "@/styles/validation.scss"; // 👈 IMPORTANT

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const emailError = validateEmail(email);

  const isValid = email.length > 0 && !emailError;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || !email) {
      toast.error(emailError || "Email is required");
      return;
    }

    try {
      const data = await forgotPassword(email);

      toast.success(`OTP sent! Check console/email`, {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);

    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <ToastContainer />

      <div className="row h-100">

        <AuthCard
          title={
            <div className="d-flex align-items-center justify-content-center">
              <span className="me-2">Forgot Password?</span>
              <img src={keyImg} alt="key" style={{ width: 20 }} />
            </div>
          }
          subtitle="Enter your email"
          logo={logo}
        >
          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-floating mb-3 position-relative">

              <img
                src={vectorImg}
                className="position-absolute top-50 start-0 translate-middle-y ms-3"
                style={{ width: 20 }}
                alt="email icon"
              />

              <input
                type="email"
                className={`form-control ps-5 pe-5 rounded-3 ${
                  email.length === 0
                    ? ""
                    : isValid
                    ? "input-valid"
                    : "input-invalid"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <label className="ps-5">Email Address</label>

              {isValid && (
                <img
                  src={tickImg}
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ width: 18 }}
                  alt="valid"
                />
              )}
            </div>

            {/* ERROR TEXT */}
            {email.length > 0 && emailError && (
              <small className="text-danger">{emailError}</small>
            )}

            {/* BUTTON */}
            <button className="btn btn-primary w-100 rounded-3 mt-3">
              Send Reset Link
            </button>

            <p className="text-center mt-3">
              <Link to="/login">Back to Login</Link>
            </p>

          </form>
        </AuthCard>

        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img src={img} className="right-img" alt="forgot" />
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;