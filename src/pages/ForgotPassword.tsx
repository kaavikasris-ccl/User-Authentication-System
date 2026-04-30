import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "@/components/AuthCard";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Login.css";

import keyImg from "@/assets/key.png";
import vectorImg from "@/assets/message.png";
import logo from "@/assets/crystallogo.png";
import img from "@/assets/frame.png";
import tickImg from "@/assets/tick.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isEmailValid = email && email.includes("@") && email.includes(".");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      alert(data.message);

      if (data.message === "OTP sent") {
        navigate("/reset-password", { state: { email } });
      }

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row h-100 g-0">

        <div className="col-md-5 d-flex justify-content-center align-items-center left-side">

          <AuthCard
            title={
              <div className="d-flex align-items-center gap-2">
                <span>Forgot Password?</span>
                <img src={keyImg} alt="key icon" className="key-icon-img" />
              </div>
            }
            subtitle="Don’t worry, we will send you a password reset link"
            logo={logo}
          >

            <form onSubmit={handleSubmit}>

              <div className="form-floating mb-4 position-relative">

                <img
                  src={vectorImg}
                  alt="icon"
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

              <button className="btn btn-primary w-100 rounded-3">
                Send password Reset Link
              </button>

              <p className="text-center mt-3 mb-0">
                <Link to="/" className="text-muted text-decoration-none">
                  Back to Sign In
                </Link>
              </p>

            </form>

          </AuthCard>
        </div>

        <div className="col-md-7 d-none d-md-flex justify-content-center align-items-center right-side">
          <img src={img} alt="forgot-password" className="right-img" />
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;