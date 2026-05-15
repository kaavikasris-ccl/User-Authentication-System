import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import AuthCard from "@/components/authCard";
import { verifyOtp } from "@/services/authService";
import { validatePassword } from "@/utils/validation";

import keyImg from "@/assets/key.png";
import logo from "@/assets/crystallogo.png";
import img from "@/assets/resetpassword.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/login.css";
import "@/styles/validation.scss";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // VALIDATIONS
  const passwordError = validatePassword(newPassword);

  const otpValid = otp.length === 6;
  const passwordValid = newPassword.length > 0 && !passwordError;
  const confirmValid =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  const confirmError =
    confirmPassword && newPassword !== confirmPassword
      ? "Passwords do not match"
      : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    // SESSION CHECK
    if (!email) {
      toast.error("Session expired. Please try again");
      return;
    }

    // OTP CHECK
    if (!otpValid) {
      toast.error("OTP must be exactly 6 digits");
      return;
    }

    // PASSWORD CHECK
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    // CONFIRM PASSWORD CHECK
    if (confirmError) {
      toast.error(confirmError);
      return;
    }

    try {
      await verifyOtp(email, otp, newPassword);

      toast.success("Password updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

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
              <span className="me-2">Reset Password</span>
              <img src={keyImg} alt="key" style={{ width: 20 }} />
            </div>
          }
          subtitle={`for ${email}`}
          logo={logo}
        >
          <form onSubmit={handleSubmit}>

            {/* OTP */}
            <input
              type="text"
              className={`form-control mb-2 ${
                touched ? (otpValid ? "input-valid" : "input-invalid") : ""
              }`}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              onBlur={() => setTouched(true)}
            />

            {touched && !otpValid && (
              <small className="text-danger d-block mb-2">
                OTP must be 6 digits
              </small>
            )}

            {/* NEW PASSWORD */}
            <input
              type="password"
              className={`form-control mb-2 ${
                touched
                  ? passwordValid
                    ? "input-valid"
                    : "input-invalid"
                  : ""
              }`}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={() => setTouched(true)}
            />

            {touched && passwordError && (
              <small className="text-danger d-block mb-2">
                {passwordError}
              </small>
            )}

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              className={`form-control mb-3 ${
                touched
                  ? confirmValid
                    ? "input-valid"
                    : "input-invalid"
                  : ""
              }`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setTouched(true)}
            />

            {touched && confirmError && (
              <small className="text-danger d-block mb-2">
                {confirmError}
              </small>
            )}

            {/* BUTTON */}
            <button className="btn btn-primary w-100">
              Update Password
            </button>

            <p className="text-center mt-3">
              <Link to="/login">Back to Login</Link>
            </p>

          </form>
        </AuthCard>

        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img src={img} className="right-img" alt="reset" />
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;