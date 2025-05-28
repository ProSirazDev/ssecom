import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../globalstate/authcontext';

const OtpVerify = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const navigate = useNavigate();
  const { setUser} = useAuth();

  const confirmationResult = window.confirmationResult;
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otp.join('');

    if (!/^\d{6}$/.test(fullOtp)) {
      setMessage('Please enter a valid 6-digit OTP');
      return;
    }

    if (!confirmationResult) {
      setMessage('OTP session expired. Please request again.');
      return;
    }

    setLoading(true);
    try {
      const result = await confirmationResult.confirm(fullOtp);
      const token = await result.user.getIdToken();

      const response = await fetch('http://localhost:5000/api/auth/firebase-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // setUser(data);
        setMessage('Phone verified. Logging in...');
        setTimeout(() => {
         
          navigate('/dashboard');
        }, 1000);
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      setMessage('Invalid OTP or login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const mobile = sessionStorage.getItem('mobile');
    if (!mobile) {
      setMessage('No mobile number found. Please re-enter.');
      setModalStep('signin');
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const fullPhone = '+91' + mobile;
      const confirmation = await window.signInWithPhoneNumber(auth, fullPhone, appVerifier);
      window.confirmationResult = confirmation;
      setMessage('OTP resent successfully');
      setResendCooldown(30);
    } catch (err) {
      console.error('Failed to resend OTP:', err);
      setMessage('Failed to resend OTP. Try again later.');
    }
  };

  return (
    <div className="max-w-4xl grid grid-cols-2 min-h-screen mx-auto mt-10  border border-gray-300 rounded-lg shadow">
       <div className=" h-64 md:h-auto">
        <img
          src="https://img.freepik.com/free-vector/abstract-secure-technology-background_23-2148357087.jpg?semt=ais_hybrid&w=740" // Replace with your image
          alt="Login Visual"
          className="object-cover w-full h-full"
        />
      </div>
     <div className='flex flex-col justify-center items-center p-3'> <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>

      <div className="flex justify-between mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none"
          />
        ))}
      </div>

      <button
        onClick={handleVerifyOtp}
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      <div className="mt-4 flex justify-between items-center gap-x-5">
        <span className="text-sm text-gray-600">Didn't get the code?</span>
        <button
          onClick={handleResendOtp}
          disabled={resendCooldown > 0}
          className={`text-blue-600 text-sm hover:underline ${
            resendCooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Resend OTP {resendCooldown > 0 ? `in ${resendCooldown}s` : ''}
        </button>
      </div>

      {message && (
        <p className="mt-4 text-sm text-center text-red-600">{message}</p>
      )}</div>
    </div>
  );
};

export default OtpVerify;
