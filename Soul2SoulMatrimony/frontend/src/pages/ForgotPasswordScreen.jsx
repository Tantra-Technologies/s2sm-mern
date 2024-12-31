import React, { useState } from "react";
import axiosInstance from "../utils/axiosConfig";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosInstance.post("/notifications/request-password-update", {
        email,
      });
  
      if (response.status === 200) {
        setIsRequestSent(true);
      } else {
        alert(response.data.message || "Error submitting request. Try again.");
      }
    } catch (error) {
      console.error("Error requesting password update:", error);
      alert(
        error.response?.data?.message ||
        "An error occurred. Ensure the email is registered and try again."
      );
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Forgot Password Card */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500">
            Request admin to update your password.
          </p>
        </div>
        {isRequestSent ? (
          <div className="text-center">
            <p className="text-sm text-green-600">
              Your request has been sent to the admin. Please wait for further communication.
            </p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleForgotPassword}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Request Password Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
