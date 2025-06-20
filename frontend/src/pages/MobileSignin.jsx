import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { AuthContext } from "../globalstate/authcontext";

const MobileSignin = () => {
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure recaptcha is initialized only once
    if (
      !window.recaptchaVerifier &&
      document.getElementById("recaptcha-container")
    ) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {
            console.log("Recaptcha solved");
          },
          "expired-callback": () => {
            console.warn("Recaptcha expired");
          },
        }
      );
      window.recaptchaVerifier.render().catch(console.error);
    }
  }, [auth]);

  const handleRequestOtp = async () => {
    if (!mobile.match(/^\d{10}$/)) {
      setMessage("**Enter a valid 10-digit mobile number");
      return;
    }

    const fullPhone = "+91" + mobile;

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhone,
        appVerifier
      );
      window.confirmationResult = confirmationResult; // Do NOT JSON.stringify this
      sessionStorage.setItem("mobile", mobile);
      navigate("/otp-verify");
    } catch (error) {
      console.error("Error during signInWithPhoneNumber:", error);
      setMessage(error.message || "Failed to send OTP");
    }
  };

  return (
    <div className="max-w-4xl grid grid-cols-2 min-h-screen mx-auto mt-5  border border-gray-300 rounded-lg shadow">
      <div className=" h-64 md:h-auto">
        <img
          src="https://img.freepik.com/free-vector/abstract-secure-technology-background_23-2148357087.jpg?semt=ais_hybrid&w=740" // Replace with your image
          alt="Login Visual"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex  flex-col justify-center p-3">
      
        <h2 className="text-xl font-medium mb-4 text-orange-500">Login Or Signup</h2>
        <p className="text-sm font-medium mb-4 text-orange-800">Demo Mobile : 9876543210 OTP : 123456</p>
        <input
          type="tel"
          placeholder="9xxxxxxxxx"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-1 border border-gray-300 placeholder-gray-400 outline-none rounded mb-4"
        />
        <div id="recaptcha-container"></div>
       <div className="flex ">
       {/* <input
          type="checkbox"
          className="mr-2"
          required/> */}
        <p className="text-sm font-sm text-gray-500">By continuing, you agree to  Terms of Use and Privacy Policy.</p></div>
        <button
          onClick={handleRequestOtp}
          className="w-full bg-teal-600 text-white py-2 mt-5 rounded hover:bg-blue-700"
        >
          Send OTP
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-orange-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default MobileSignin;
