import React, { useState } from "react";
import AuthCard from "@/components/AuthCard";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Login.css";

import { validateEmail, validatePassword } from "@/utils/validation";
import { Link, useNavigate } from "react-router-dom";

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

  const isEmailValid = email && email.includes("@") && email.includes(".");

  const handleSubmit = async (e: React.FormEvent) => {
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
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setEmailError(data.message || "Login failed");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
      }

      alert("Login Successful");
      navigate("/");

    } catch (err) {
      console.error(err);
      setEmailError("Server error. Please try again.");
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

            <div className="form-floating mb-3 position-relative">

              <img
                src={vectorImg}
                alt="email icon"
                className="position-absolute top-50 start-0 translate-middle-y ms-3"
                style={{ width: "20px", height: "20px" }}
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
                  style={{ width: "18px", height: "18px" }}
                />
              )}
            </div>

            {emailError && (
              <small className="text-danger d-block mb-2">
                {emailError}
              </small>
            )}

            <div className="mb-1 text-start">
              <label className="mb-2">Password</label>

              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control rounded-3 pe-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>

            {passwordError && (
              <small className="text-danger d-block mb-2">
                {passwordError}
              </small>
            )}

            <button className="btn btn-primary w-100 rounded-3">
              Continue
            </button>

            <p className="text-center mt-3 mb-0">
              <Link
                to="/forgot-password"
                className="text-muted text-decoration-none"
              >
                Forgot Password?
              </Link>
            </p>

            <p className="login-description">
  Join the millions of smart investors who trust us to manage their finances.
  Log in to access your personalized dashboard, track your portfolio performance,
  and make informed investment decisions.
</p>
          </form>
        </AuthCard>

        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center vh-100 right-side p-0">
          <img src={img} alt="login" className="right-img" />
        </div>

      </div>
    </div>
  );
};

export default Login;