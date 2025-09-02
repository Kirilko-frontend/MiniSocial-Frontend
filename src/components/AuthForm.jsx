import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AuthForm = ({ type = "login" }) => {
  const isRegister = type === "register";
  const { register, login } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (isRegister) {
        const fd = new FormData();
        fd.append("username", formData.username);
        fd.append("email", formData.email);
        fd.append("password", formData.password);
        if (file) fd.append("image", file);
        const ok = await register(fd);
        if (!ok) throw new Error("Registration failed");
        navigate("/auth/login");
      } else {
        const ok = await login(formData.email, formData.password);
        if (!ok) throw new Error("Login failed");
        navigate("/posts");
      }
    } catch (err) {
      setError(
        isRegister
          ? "Unable to register. Please check your details."
          : "Incorrect email or password."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />

          {isRegister && (
            <div className="flex flex-col items-center space-y-3">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-28 w-28 rounded-full object-cover mb-2 transition-all duration-300"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">
                    Click to select an avatar
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {file && (
                <div className="text-sm text-gray-500 text-center">
                  Selected: <span className="font-medium">{file.name}</span>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-600 text-white rounded-xl py-3 font-semibold hover:bg-purple-700 transition-all duration-300 disabled:opacity-60"
          >
            {submitting
              ? isRegister
                ? "Creating account..."
                : "Logging in..."
              : isRegister
              ? "Sign Up"
              : "Log In"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-purple-600 font-medium hover:underline"
              >
                Log In
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-purple-600 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
