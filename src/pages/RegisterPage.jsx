import React, { useState } from "react";
import { Video, AlertCircle, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useRegistrationHook } from "@hooks/auth/Register.hook";

export const RegisterPage = () => {
  const {
    errorMessage,
    handleChangeInput,
    handleOnSubmit,
    isLoading,
    registerData,
  } = useRegistrationHook();

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Video className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Create your account
          </h2>
        </div>

        <div className="mt-8 space-y-6" onSubmit={handleOnSubmit}>
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
                name="email"
                // required
                value={registerData?.email}
                onChange={(e) => handleChangeInput(e)}
                className="mt-1 block w-full bg-[#1f1f1f] border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-white">{errorMessage?.email}</span>
              {/* {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-md flex items-start">
                  <AlertCircle className="h-4 w-5 mr-3 m-0.5 flex-shrink-0" />
                </div>
              )} */}
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
                name="password"
                // required
                value={registerData?.password}
                onChange={(e) => handleChangeInput(e)}
                className="mt-1 block w-full bg-[#1f1f1f] border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-white">
                {errorMessage?.password}
              </span>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                // required
                name="confirmPassword"
                value={registerData?.confirmPassword}
                onChange={(e) => handleChangeInput(e)}
                className="mt-1 block w-full bg-[#1f1f1f] border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-white">
                {errorMessage?.confirmPassword}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={() => handleOnSubmit()}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

