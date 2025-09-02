import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async ({ username, email, password, file }) => {
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (file) formData.append("image", file);

      const success = await register(formData);

      if (success) {
        navigate("/auth/login");
      } else {
        setError("Registration failed. Email or username may already exist.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create your account
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 px-4 py-2 text-center font-medium">
            {error}
          </div>
        )}

        <AuthForm
          type="register"
          onSubmit={handleSubmit}
          className="space-y-4"
        />

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-blue-600 font-medium hover:underline cursor-pointer transition"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
