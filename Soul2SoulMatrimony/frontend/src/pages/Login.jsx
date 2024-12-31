import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import s2smLogo from "../assets/s2smLogo.png";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import axiosInstance from "../utils/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { updateUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("auth/login", { email, password });

     
      if (response.status === 200) {
        updateUser(response.data.user);
        login(response.data.user.role, response.data.token);
      }
      
    } catch (error) {
      console.log(error);
      if (error.status === 403){
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Login Card */}
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <img
            src={s2smLogo}
            alt="Soul2Soul Matrimony Logo"
            className="w-auto h-auto" // Increased logo width
          />
          {/* <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Soul2Soul Matrimony
          </h2> */}
        </div>
        {/* Title */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700">Welcome Back</h3>
          <p className="text-sm text-gray-500">Sign in to access your account</p>
        </div>
        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-red-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" // Changed to red
          >
            Sign In
          </button>
        </form>
        {/* Footer */}
        <p className="text-xs text-center text-gray-400">
          © 2024 Soul2Soul Matrimony. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
