import React, { useState, useEffect } from "react";
import AuthCard from "@/components/AuthCard";
import { Link, useNavigate } from "react-router-dom";

import keyImg from "@/assets/key.png";
import "@/styles/Login.css";
import logo from "@/assets/crystallogo.png";
import img from "@/assets/resetpassword.png";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  useEffect(() => {
    console.log("EMAIL FROM STORAGE:", email);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Email not found. Please login again.");
      return;
    }

    if (!oldPassword) {
      alert("Please enter old password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, 
          oldPassword,
          newPassword: password,
        }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.message === "Password updated successfully") {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        <AuthCard
          title={
            <div className="d-flex align-items-center gap-2">
              <span>Reset Password?</span>
              <img src={keyImg} alt="key icon" className="key-icon-img" />
            </div>
          }
          subtitle={email ? `for ${email}` : "for user"}
          logo={logo}
        >
          <form onSubmit={handleSubmit}>

            <div className="mb-3 text-start">
              <label className="mb-2">Old Password</label>
              <input
                type="password"
                className="form-control rounded-3"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="mb-2">New Password</label>
              <input
                type="password"
                className="form-control rounded-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="mb-2">Confirm Password</label>
              <input
                type="password"
                className="form-control rounded-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100 rounded-3 py-2 mt-2">
              Update Password
            </button>

            <p className="text-center mt-3 mb-0">
              <Link to="/" className="text-muted text-decoration-none">
                ← Back to Sign In
              </Link>
            </p>

          </form>
        </AuthCard>

        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
          <img src={img} alt="reset-password" className="right-img" />
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;