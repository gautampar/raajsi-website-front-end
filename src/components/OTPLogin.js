"use client";

import { login } from "@/lib/api/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
// import { auth } from "@/lib/firebaseConfig";

export default function OTPLogin({ setLoginOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      // console.log("Login Success:", res);

      if (res?.status === "success") {
        localStorage.setItem("token", res?.data?.user?.token);
        toast.success("Login successful 🎉");
        setLoginOpen(false);
      } else {
        toast.warning(res?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Login Failed:", err);
      toast.error(err?.message || "Login failed ❌");
    }
  };


  return (
    <div>
      <button className="auth-close-btn" onClick={() => setLoginOpen(false)} aria-label="Close login">&times;</button>
      <div id="authModalTitle" className="auth-title">LOGIN</div>


      <div className="auth-subtitle">Sign-Up For Our Exclusive Launch Now and Get a 0% Discount on Products</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(); // yaha function call karna zaroori hai
        }}
        className="auth-form"
      >
        <label className="form-label small fw-semibold mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control auth-input"
          placeholder="Email Address"
        />

        <label className="form-label small fw-semibold mb-1 mt-3">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control auth-input"
        />

        {/* Agar phone number bhi lena ho to niche wala uncomment karna */}
        {/* 
  <label className="form-label small fw-semibold mb-1 mt-3">Phone</label>
  <div className="d-flex align-items-stretch auth-phone-group">
    <select className="form-select auth-country-select" defaultValue="IN">
      <option value="IN">🇮🇳 +91</option>
      <option value="US">🇺🇸 +1</option>
      <option value="GB">🇬🇧 +44</option>
    </select>
    <input
      type="tel"
      className="form-control auth-input flex-grow-1"
      placeholder="Enter Your Number"
    />
  </div> 
  */}

        <div className="text-center mt-4">
          <button type="submit" className="btn auth-submit-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
