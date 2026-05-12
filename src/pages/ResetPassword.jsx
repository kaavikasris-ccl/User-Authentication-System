import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthCard from "@/components/AuthCard";

import { verifyOtp } from "@/services/authService";

import keyImg from "@/assets/key.png";
import logo from "@/assets/crystallogo.png";
import img from "@/assets/resetpassword.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Login.css";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Session expired. Please try again.", {
        position: "top-right",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
      });
      return;
    }

    try {
      const data = await resetPassword({
        email,
        otp,
        newPassword,
      });

      toast.success("Password updated successfully!", {
        position: "top-right",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="container-fluid vh-100">
      <ToastContainer />

      <div className="row h-100">

        <AuthCard
          title={
            <div className="d-flex align-items-center justify-content-center">
              <span className="me-2">Reset Password</span>
              <img
                src={keyImg}
                alt="key icon"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          }
          subtitle={`for ${email}`}
          logo={logo}
        >
          <form onSubmit={handleSubmit}>

            {/* OTP FIELD */}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />

            {/* NEW PASSWORD */}
            <input
              type="password"
              className="form-control mb-2"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-primary w-100"
              disabled={otp.length !== 6}
            >
              Update Password
            </button>

            <p className="text-center mt-3">
              <Link to="/">Back to Login</Link>
            </p>

          </form>
        </AuthCard>

        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img src={img} className="right-img" alt="reset-password" />
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;