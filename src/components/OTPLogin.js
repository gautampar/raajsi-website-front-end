"use client";

import React, { useState } from "react";
// import { auth } from "@/lib/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/lib/api/firebaseConfig";

export default function OTPLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  // Initialize Recaptcha only once
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
    return window.recaptchaVerifier;
  };

  const sendOTP = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    try {
      const appVerifier = setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      alert("OTP sent ✅");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to send OTP");
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult) {
      alert("Request OTP first");
      return;
    }

    try {
      const userCredential = await confirmationResult.confirm(otp);
      console.log("User logged in:", userCredential.user);
      alert("Login successful ✅");
    } catch (error) {
      console.error(error);
      alert(error.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4  text-white p-4">
      <h1 className="text-2xl font-semibold mb-4">Login with OTP</h1>

      {!otpSent ? (
        <>
          <input
            type="tel"
            placeholder="+91 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-2 rounded text-black w-full max-w-xs"
          />
          <button
            onClick={sendOTP}
            className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="px-4 py-2 rounded text-black w-full max-w-xs"
          />
          <button
            onClick={verifyOTP}
            className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}
