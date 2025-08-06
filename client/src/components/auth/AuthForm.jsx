import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

export default function AuthForm({ mode = "login" }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //   const { login, signup, error } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //   useEffect(() => {
  //     if (error) setMessage(error);
  //   }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    // try {
    //   if (isLogin) {
    //     await login(formData.email, formData.password);
    //     setMessage("Login successful ✅");
    //   } else {
    //     await signup(formData);
    //     await login(formData.email, formData.password);
    //     setMessage("Signup successful ✅ Redirecting...");
    //   }

    //   setTimeout(() => navigate("/editor"), 800);
    // } catch (err) {
    //   console.error(err);
    //   setMessage(err.message || "Something went wrong.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google/callback";
  };

  return (
    <div
      className="max-w-md w-full mx-4 p-8 rounded-lg shadow-2xl"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Logo & Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1F2938" }}>
              Resume<span style={{ color: "#3b82f6" }}>Rush</span>
            </h1>
            <p className="text-sm opacity-70" style={{ color: "#1F2938" }}>
              Professional Resume Builder
            </p>
          </div>
        </div>
      </div>

      <h2
        className="text-2xl font-semibold text-center mb-8"
        style={{ color: "#1F2938" }}
      >
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div>
            <label
              className="block mb-2 font-semibold"
              style={{ color: "#1F2938" }}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-1 focus:outline-none transition-all duration-200"
              style={{
                borderColor: "#1F2938",
                backgroundColor: "#FFFFFF",
                color: "#1F2938",
              }}
            />
          </div>
        )}

        <div>
          <label
            className="block mb-2 font-semibold"
            style={{ color: "#1F2938" }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-1 focus:outline-none transition-all duration-200"
            style={{
              borderColor: "#1F2938",
              backgroundColor: "#FFFFFF",
              color: "#1F2938",
            }}
          />
        </div>

        <div>
          <label
            className="block mb-2 font-semibold"
            style={{ color: "#1F2938" }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-1 focus:outline-none transition-all duration-200"
            style={{
              borderColor: "#1F2938",
              backgroundColor: "#FFFFFF",
              color: "#1F2938",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg font-semibold text-lg transition-all duration-200"
          style={{
            backgroundColor: isLoading ? "#0f53c2" : "#3b82f6",
            color: "#FFFFFF",
          }}
        >
          {isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* Google Login Button */}
      <div className="mt-6">
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg flex items-center justify-center border-1 font-semibold transition-all duration-200"
          style={{
            borderColor: "#1F2938",
            color: "#1F2938",
            backgroundColor: "#F9FAFB",
          }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>

      <p className="mt-6 text-sm text-center" style={{ color: "#1F2938" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="ml-1 font-semibold underline"
          style={{ color: "#0f53c2" }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>

      {message && (
        <div
          className={`mt-6 p-4 rounded-lg text-center font-semibold ${
            message.toLowerCase().includes("success")
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
          style={{
            color: message.toLowerCase().includes("success")
              ? "#01A63F"
              : "#DC2626",
          }}
        >
          {message}
        </div>
      )}

      <div
        className="mt-6 pt-4 border-t text-center"
        style={{ borderColor: "#E5E7EB" }}
      >
        <p className="text-xs opacity-60" style={{ color: "#1F2938" }}>
          Powered by{" "}
          <span className="font-semibold" style={{ color: "#0f53c2" }}>
            ResumeRush
          </span>
        </p>
      </div>
    </div>
  );
}
