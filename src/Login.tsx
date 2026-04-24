import React, { useState } from "react";
import AuthCard from "./AuthCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import img from "./assets/Group1.png";

const Login = () => {
  const [email, setEmail] = useState("cclemployee@zohomail.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
        setError(data.message || "Login failed");
        return;
      }

      console.log("Login success:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        console.warn("Token not received from backend");
      }

      alert("Login Successful");
      navigate("/");

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        <AuthCard
          title="Welcome Back"
          subtitle="Please enter your details"
          logo={logo}
        >
          <form onSubmit={handleSubmit}>
            
            {error && (
              <div className="alert alert-danger py-2">{error}</div>
            )}

            <div className="form-floating mb-3 position-relative">
              <i className="fa fa-envelope position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>

              <input
                type="email"
                className="form-control ps-5 pe-5 rounded-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="ps-5">Email Address</label>
            </div>

            <div className="mb-3 text-start">
              <label className="mb-2">Password</label>

              <div className="position-relative">
                <input
                  type="password"
                  className="form-control rounded-3 pe-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="fa fa-eye position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
              </div>
            </div>

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
          </form>
        </AuthCard>

        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
          <img
            src={img}
            alt="login"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;