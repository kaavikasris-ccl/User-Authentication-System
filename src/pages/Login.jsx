import React, { useState } from "react";
import AuthCard from "@/components/AuthCard";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Login.css";

import { validateEmail, validatePassword } from "@/utils/validation";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "@/services/authService";

import tickImg from "@/assets/tick.png";
import vectorImg from "@/assets/message.png";
import logo from "@/assets/logo.png";
import img from "@/assets/circle.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const isEmailValid =
    email && email.includes("@") && email.includes(".");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (emailErr || passwordErr) {
      setEmailError(emailErr);
      setPasswordError(passwordErr);
      return;
    }

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
      }

      alert("Login Successful");
      navigate("dashboard.jsx");
    } catch (err) {
      if (err instanceof Error) {
        setEmailError(err.message);
      } else {
        setEmailError("Server error");
      }
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100 g-0">

        <AuthCard
          title="Welcome Back"
          subtitle="Please enter your details"
          logo={logo}
        >
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="form-floating mb-3 position-relative">
              <img
                src={vectorImg}
                alt="email icon"
                className="position-absolute top-50 start-0 translate-middle-y ms-3"
                style={{ width: 20 }}
              />

              <input
                type="email"
                className="form-control ps-5 pe-5 rounded-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="ps-5">Email Address</label>

              {isEmailValid && (
                <img
                  src={tickImg}
                  alt="valid"
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ width: 18 }}
                />
              )}
            </div>

            {emailError && (
              <small className="text-danger">{emailError}</small>
            )}

            {/* Password */}
            <div className="mb-2 mt-3">
              <label>Password</label>

              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control pe-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <i
                  role="button"
                  className={`fa ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } position-absolute top-50 end-0 translate-middle-y me-3`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>

            {passwordError && (
              <small className="text-danger">{passwordError}</small>
            )}

            {/* Submit */}
            <button className="btn btn-primary w-100 mt-3">
              Continue
            </button>

            {/* Forgot Password */}
            <p className="text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </form>
        </AuthCard>

        {/* Right Image */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img src={img} alt="login visual" className="right-img" />
        </div>

      </div>
    </div>
  );
};

export default Login;