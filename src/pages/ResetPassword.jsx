import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "@/components/AuthCard";
import { resetPassword } from "@/services/authService";

import keyImg from "@/assets/key.png";
import logo from "@/assets/crystallogo.png";
import img from "@/assets/resetpassword.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Login.css";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return alert("Login again");
    if (password !== confirmPassword) return alert("Passwords mismatch");

    try {
      const data = await resetPassword(email, oldPassword, password);

      alert(data.message);

      if (data.message === "Password updated successfully") {
        navigate("/");
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

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-2"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="btn btn-primary w-100">
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