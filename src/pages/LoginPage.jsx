import React, { useState } from "react";
import { Video, AlertCircle } from "lucide-react";
import { useLoginHook } from "@hooks/auth";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { authData, handleChange, isLoading, errorMessage, handleLoginClick } =
    useLoginHook();

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Video className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Sign in to YourTube
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                name="email"
                value={authData?.password || ""}
                className="mt-1 block w-full bg-[#1f1f1f] border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(e)}
              />
              {errorMessage && (
                <span className="text-white">{errorMessage.email}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                name="password"
                value={authData?.password || ""}
                className="mt-1 block w-full bg-[#1f1f1f] border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(e)}
              />
              {errorMessage?.password && (
                <span className="text-white">{errorMessage.password}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            // disabled={isLoading}
            onClick={() => handleLoginClick()}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Sign in" : "Signing in..."}
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
