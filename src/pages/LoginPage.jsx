import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async ({ email, password }) => {
    setError("");
    const success = await login(email, password);
    if (success) {
      navigate("/posts");
    } else {
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 px-4 py-2 text-center font-medium">
            {error}
          </div>
        )}

        <AuthForm type="login" onSubmit={handleSubmit} className="space-y-4" />

        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/auth/register")}
            className="text-blue-600 font-medium hover:underline cursor-pointer transition"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
